/**
 * AnyDomesticHelp — Google Apps Script for Google Sheets
 * 
 * 1. Automatically records form submissions & push tokens into separate tabs.
 * 2. Sends notification emails to owner for new leads/feedback.
 * 3. Adds a custom Admin menu in Google Sheets to broadcast push notifications to all users!
 * 
 * SETUP INSTRUCTIONS:
 * 1. Open your Google Sheet: https://docs.google.com/spreadsheets
 * 2. Click Extensions → Apps Script
 * 3. Replace all code in Code.gs with this file
 * 4. Click Save 💾 and then click Deploy → New Deployment → Web App
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 5. Copy the Web App URL and update GOOGLE_SCRIPT_URL in your app's env.ts if needed.
 */

// ─── CONFIGURATION ─────────────────────────────────────────────────────────────
var OWNER_EMAIL = "technominds11@gmail.com, anydomestichelp10@gmail.com"; // Comma-separated recipients

// ─── 1. CUSTOM ADMIN MENU IN GOOGLE SHEETS ──────────────────────────────────────
function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('📢 ADH Admin')
    .addItem('🚀 Send Broadcast Push Notification', 'showBroadcastPrompt')
    .addItem('📊 Refresh Push Tokens Sheet', 'ensurePushTokensSheet')
    .addItem('➕ Add Sample Test Token (For Testing)', 'addSampleTestToken')
    .addToUi();
}

// ─── 2. UI PROMPT TO SEND PUSH NOTIFICATION ────────────────────────────────────
function showBroadcastPrompt() {
  var ui = SpreadsheetApp.getUi();
  
  // Prompt for Title
  var titleResponse = ui.prompt(
    '📢 Broadcast Notification — Step 1 of 2',
    'Enter Notification Title (e.g. "Special Discount on Domestic Help!"):',
    ui.ButtonSet.OK_CANCEL
  );
  
  if (titleResponse.getSelectedButton() !== ui.Button.OK) return;
  var title = titleResponse.getResponseText().trim();
  if (!title) {
    ui.alert('Title cannot be empty!');
    return;
  }

  // Prompt for Message Body
  var bodyResponse = ui.prompt(
    '📢 Broadcast Notification — Step 2 of 2',
    'Enter Notification Message Body (e.g. "Book a verified maid or cook today & get 10% off!"):',
    ui.ButtonSet.OK_CANCEL
  );

  if (bodyResponse.getSelectedButton() !== ui.Button.OK) return;
  var body = bodyResponse.getResponseText().trim();
  if (!body) {
    ui.alert('Message body cannot be empty!');
    return;
  }

  // Confirm before sending
  var confirm = ui.alert(
    'Confirm Broadcast',
    'Are you sure you want to send this notification to all registered app users?\n\nTitle: ' + title + '\nMessage: ' + body,
    ui.ButtonSet.YES_NO
  );

  if (confirm === ui.Button.YES) {
    sendBroadcastNotification(title, body);
  }
}

// ─── 3. SEND BROADCAST TO ALL REGISTERED PUSH TOKENS ───────────────────────────
function sendBroadcastNotification(title, body) {
  var ui = SpreadsheetApp.getUi();
  var sheet = ensurePushTokensSheet();
  var data = sheet.getDataRange().getValues();
  
  if (data.length <= 1) {
    ui.alert('No push tokens found in "Push Tokens" sheet.');
    return;
  }

  var tokens = [];
  for (var i = 1; i < data.length; i++) {
    var token = data[i][0];
    if (token && token.toString().indexOf('ExponentPushToken') !== -1) {
      tokens.push(token.toString());
    }
  }

  if (tokens.length === 0) {
    ui.alert('No valid Expo Push Tokens found.');
    return;
  }

  // Deduplicate tokens
  var uniqueTokens = tokens.filter(function(value, index, self) {
    return self.indexOf(value) === index;
  });

  // Expo Push API endpoint
  var url = 'https://exp.host/--/api/v2/push/send';
  var successCount = 0;
  
  // Chunk tokens into batches of 100 (Expo limit)
  for (var k = 0; k < uniqueTokens.length; k += 100) {
    var chunk = uniqueTokens.slice(k, k + 100);
    var messages = chunk.map(function(t) {
      return {
        to: t,
        sound: 'default',
        title: title,
        body: body,
        priority: 'high'
      };
    });

    var options = {
      method: 'post',
      contentType: 'application/json',
      payload: JSON.stringify(messages),
      muteHttpExceptions: true
    };

    try {
      var response = UrlFetchApp.fetch(url, options);
      var code = response.getResponseCode();
      if (code >= 200 && code < 300) {
        successCount += chunk.length;
      }
    } catch (e) {
      Logger.log('Error sending push chunk: ' + e.toString());
    }
  }

  ui.alert(
    '✅ Broadcast Complete!',
    'Successfully sent notification to ' + successCount + ' out of ' + uniqueTokens.length + ' registered devices.',
    ui.ButtonSet.OK
  );
}

// ─── 4. WEB APP HTTP GET & POST RECEIVERS ───────────────────────────────────────
function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({ 
    status: "ok", 
    message: "AnyDomesticHelp Google Apps Script Web App is LIVE & ACTIVE!",
    timestamp: new Date().toISOString()
  })).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    var contents = e.postData.contents;
    var data = JSON.parse(contents);
    var formType = data.formType || 'employer';
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var timestamp = new Date();

    if (formType === 'push-token') {
      handlePushToken(ss, data, timestamp);
    } else if (formType === 'employer') {
      handleEmployerRegistration(ss, data, timestamp);
    } else if (formType === 'partner') {
      handlePartnerRegistration(ss, data, timestamp);
    } else if (formType === 'referral') {
      handleEmployeeReferral(ss, data, timestamp);
    } else if (formType === 'feedback') {
      handleFeedback(ss, data, timestamp);
    }

    return ContentService.createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ─── HELPERS FOR TAB WRITING & NOTIFICATIONS ────────────────────────────────────

function handlePushToken(ss, data, timestamp) {
  var sheet = ensurePushTokensSheet();
  var token = data.token;
  var platform = data.platform || 'mobile';
  if (!token) return;

  var values = sheet.getDataRange().getValues();
  for (var i = 1; i < values.length; i++) {
    if (values[i][0] === token) {
      sheet.getRange(i + 1, 3).setValue(timestamp); // Update timestamp
      return;
    }
  }
  sheet.appendRow([token, platform, timestamp]);
}

function handleEmployerRegistration(ss, data, timestamp) {
  var sheet = getOrCreateSheet(ss, 'Employer Registrations', [
    'Timestamp', 'Name', 'Phone', 'Email', 'City', 'Working Hours', 'Service Type', 'Platform'
  ]);
  sheet.appendRow([
    timestamp, data.name, data.phone, data.email, data.city, data.workingHours, data.serviceLabel || data.serviceType, data.platform || 'mobile'
  ]);
  sendEmailNotification('New Employer Registration', 
    'Name: ' + data.name + '\nPhone: ' + data.phone + '\nEmail: ' + data.email + '\nCity: ' + data.city + '\nService: ' + data.serviceLabel + '\nHours: ' + data.workingHours
  );
}

function handlePartnerRegistration(ss, data, timestamp) {
  var sheet = getOrCreateSheet(ss, 'Partner Registrations', [
    'Timestamp', 'Full Name', 'Contact Person', 'Phone', 'Email', 'City', 'Message', 'Platform'
  ]);
  sheet.appendRow([
    timestamp, data.fullName, data.contactPerson, data.phone, data.email, data.city, data.message || '', data.platform || 'mobile'
  ]);
  sendEmailNotification('New Partner Registration',
    'Company: ' + data.fullName + '\nContact: ' + data.contactPerson + '\nPhone: ' + data.phone + '\nEmail: ' + data.email + '\nCity: ' + data.city
  );
}

function handleEmployeeReferral(ss, data, timestamp) {
  var sheet = getOrCreateSheet(ss, 'Employee Referrals', [
    'Timestamp', 'Job Category', 'Employee Name', 'Referrer Phone', 'Location', 'Experience', 'Gender', 'Platform'
  ]);
  sheet.appendRow([
    timestamp, data.jobCategory, data.employeeName, data.referrerPhone, data.location || '', data.experience || '', data.gender || '', data.platform || 'mobile'
  ]);
  sendEmailNotification('New Employee Referral',
    'Category: ' + data.jobCategory + '\nCandidate: ' + data.employeeName + '\nReferrer Phone: ' + data.referrerPhone + '\nLocation: ' + data.location
  );
}

function handleFeedback(ss, data, timestamp) {
  var sheet = getOrCreateSheet(ss, 'Feedback', [
    'Timestamp', 'Name', 'Phone', 'Email', 'Rating', 'Rating Label', 'Message', 'Platform'
  ]);
  sheet.appendRow([
    timestamp, data.name, data.phone || '', data.email || '', data.rating, data.ratingLabel, data.message, data.platform || 'mobile'
  ]);
  sendEmailNotification('New App Feedback (' + data.rating + '⭐)',
    'From: ' + data.name + '\nRating: ' + data.rating + ' (' + data.ratingLabel + ')\nMessage: ' + data.message
  );
}

function ensurePushTokensSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  return getOrCreateSheet(ss, 'Push Tokens', ['Expo Push Token', 'Platform', 'Date Registered']);
}

function addSampleTestToken() {
  var sheet = ensurePushTokensSheet();
  var ui = SpreadsheetApp.getUi();
  
  var response = ui.prompt(
    '➕ Add Test Expo Push Token',
    'Paste your Expo Push Token (e.g. ExponentPushToken[VXZ_3rLcpXbkRbd9P_kIgc]):',
    ui.ButtonSet.OK_CANCEL
  );

  if (response.getSelectedButton() === ui.Button.OK) {
    var token = response.getResponseText().trim();
    if (!token) token = 'ExponentPushToken[VXZ_3rLcpXbkRbd9P_kIgc]';
    sheet.appendRow([token, 'test-device', new Date()]);
    ui.alert('Success', 'Added token to "Push Tokens" sheet!', ui.ButtonSet.OK);
  }
}

function getOrCreateSheet(ss, sheetName, headers) {
  var sheet = ss.getSheetByName(sheetName);
  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
    sheet.appendRow(headers);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold').setBackground('#E8F0FE');
  }
  return sheet;
}

// ─── 5. EMAIL NOTIFICATIONS WITH LIVE DELIVERY LOGS ──────────────────────────────
function testSendEmail() {
  sendEmailNotification('Test Email Alert', 'This is a test email sent from Google Apps Script editor.\nIf you see this, email notifications are 100% active!');
  Logger.log('Test email sent to ' + OWNER_EMAIL);
}

function sendEmailNotification(subject, bodyText) {
  if (!OWNER_EMAIL) return;
  var emailStatus = "SENT";
  var errorDetails = "Delivered via Gmail API";

  var htmlContent = "<div style='font-family:Arial,sans-serif;padding:18px;border:1px solid #0E6F5C;border-radius:8px;max-width:560px;'>"
    + "<div style='background:#0E6F5C;color:#ffffff;padding:12px 16px;border-radius:6px;margin-bottom:15px;'>"
    + "<h2 style='margin:0;font-size:16px;'>AnyDomesticHelp — " + subject + "</h2>"
    + "</div>"
    + "<pre style='font-family:Arial,sans-serif;white-space:pre-wrap;background:#f5f8f7;padding:14px;border-radius:6px;border:1px solid #e0e0e0;font-size:14px;color:#222;'>" + bodyText + "</pre>"
    + "<p style='font-size:12px;color:#888;margin-top:15px;margin-bottom:0;'>Sent automatically from AnyDomesticHelp Lead Notification System.</p>"
    + "</div>";

  try {
    GmailApp.sendEmail(OWNER_EMAIL, '[AnyDomesticHelp] ' + subject, bodyText, {
      htmlBody: htmlContent,
      name: 'AnyDomesticHelp Alerts'
    });
  } catch (e1) {
    try {
      MailApp.sendEmail({
        to: OWNER_EMAIL,
        subject: '[AnyDomesticHelp] ' + subject,
        body: bodyText,
        htmlBody: htmlContent,
        name: 'AnyDomesticHelp Alerts'
      });
      errorDetails = "Delivered via MailApp fallback";
    } catch (e2) {
      emailStatus = "FAILED";
      errorDetails = e2.toString();
      Logger.log("Email sending error: " + errorDetails);
    }
  }

  // Record live status to a "System Logs" tab in your Google Sheet!
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var logSheet = getOrCreateSheet(ss, 'System Logs', ['Timestamp', 'Notification Type', 'Recipient', 'Status', 'Details']);
    logSheet.appendRow([new Date(), subject, OWNER_EMAIL, emailStatus, errorDetails]);
  } catch (logErr) {
    Logger.log("Failed to write log: " + logErr.toString());
  }
}
