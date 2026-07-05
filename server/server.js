const express = require('express');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error('FATAL: MONGODB_URI is not defined in env variables.');
  process.exit(1);
}

mongoose.connect(MONGODB_URI)
  .then(() => console.log('Successfully connected to MongoDB Atlas.'))
  .catch(err => {
    console.error('Error connecting to MongoDB Atlas:', err.message);
    process.exit(1);
  });

// ─── Nodemailer Setup ────────────────────────────────────────────────────────
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS, // Gmail App Password
  },
  tls: {
    rejectUnauthorized: false, // Bypass self-signed certificate check
  },
});

// Helper function to send notification email
const sendNotificationEmail = async (subject, htmlContent) => {
  const recipient = process.env.NOTIFICATION_EMAIL || process.env.SMTP_USER;
  if (!recipient) {
    console.warn('WARNING: No notification email recipient configured. Skipping email.');
    return;
  }

  const mailOptions = {
    from: `"AnyDomesticHelp Alerts" <${process.env.SMTP_USER}>`,
    to: recipient,
    subject: subject,
    html: htmlContent,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Notification email sent successfully:', info.messageId);
  } catch (error) {
    console.error('Failed to send notification email:', error.message);
  }
};

// ─── Database Schemas & Models ───────────────────────────────────────────────

// 1. Employer Registration (e.g. Babysitter, Cook, Maid, etc.)
const employerRegistrationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  city: { type: String, required: true },
  workingHours: { type: String, required: true },
  serviceType: { type: String, required: true },
  serviceLabel: { type: String, required: true },
  status: { type: String, default: 'new' },
  platform: { type: String, default: 'mobile' },
  createdAt: { type: Date, default: Date.now },
});
const EmployerRegistration = mongoose.model('EmployerRegistration', employerRegistrationSchema);

// 2. Partner Registration
const partnerRegistrationSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  contactPerson: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  city: { type: String, required: true },
  message: { type: String, default: '' },
  status: { type: String, default: 'new' },
  platform: { type: String, default: 'mobile' },
  createdAt: { type: Date, default: Date.now },
});
const PartnerRegistration = mongoose.model('PartnerRegistration', partnerRegistrationSchema);

// 3. Employee Referral
const employeeReferralSchema = new mongoose.Schema({
  jobCategory: { type: String, required: true },
  employeeName: { type: String, required: true },
  referrerPhone: { type: String, required: true },
  location: { type: String, default: '' },
  experience: { type: String, default: '' },
  gender: { type: String, default: '' },
  status: { type: String, default: 'new' },
  platform: { type: String, default: 'mobile' },
  createdAt: { type: Date, default: Date.now },
});
const EmployeeReferral = mongoose.model('EmployeeReferral', employeeReferralSchema);

// 4. Feedback
const feedbackSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, default: '' },
  email: { type: String, default: '' },
  rating: { type: Number, required: true },
  ratingLabel: { type: String, required: true },
  message: { type: String, required: true },
  platform: { type: String, default: 'mobile' },
  createdAt: { type: Date, default: Date.now },
});
const Feedback = mongoose.model('Feedback', feedbackSchema);

// ─── API Routes ──────────────────────────────────────────────────────────────

// 1. Submit Employer Registration
app.post('/api/employer-registration', async (req, res) => {
  try {
    const data = new EmployerRegistration(req.body);
    const savedDoc = await data.save();

    // Trigger Notification Email
    const emailHtml = `
      <h2>New Employer Registration Alert</h2>
      <p>A new request has been submitted by an employer.</p>
      <table border="1" cellpadding="8" style="border-collapse: collapse; width: 100%; max-width: 600px;">
        <tr><td><strong>Service Selected</strong></td><td>${savedDoc.serviceLabel} (${savedDoc.serviceType})</td></tr>
        <tr><td><strong>Name</strong></td><td>${savedDoc.name}</td></tr>
        <tr><td><strong>Phone</strong></td><td>${savedDoc.phone}</td></tr>
        <tr><td><strong>Email</strong></td><td>${savedDoc.email}</td></tr>
        <tr><td><strong>City</strong></td><td>${savedDoc.city}</td></tr>
        <tr><td><strong>Working Hours</strong></td><td>${savedDoc.workingHours}</td></tr>
        <tr><td><strong>Platform</strong></td><td>${savedDoc.platform}</td></tr>
        <tr><td><strong>Submitted At</strong></td><td>${savedDoc.createdAt.toLocaleString()}</td></tr>
      </table>
    `;
    // We run it asynchronously in the background so API response is fast
    sendNotificationEmail(`New Request: ${savedDoc.serviceLabel} - ${savedDoc.name}`, emailHtml);

    res.status(201).json({ success: true, id: savedDoc._id });
  } catch (error) {
    console.error('Error in employer-registration:', error);
    res.status(400).json({ success: false, error: error.message });
  }
});

// 2. Submit Partner Registration
app.post('/api/partner-registration', async (req, res) => {
  try {
    const data = new PartnerRegistration(req.body);
    const savedDoc = await data.save();

    const emailHtml = `
      <h2>New Partner Registration Alert</h2>
      <p>A new agency/partner wants to collaborate with us.</p>
      <table border="1" cellpadding="8" style="border-collapse: collapse; width: 100%; max-width: 600px;">
        <tr><td><strong>Organization/Name</strong></td><td>${savedDoc.fullName}</td></tr>
        <tr><td><strong>Contact Person</strong></td><td>${savedDoc.contactPerson}</td></tr>
        <tr><td><strong>Phone</strong></td><td>${savedDoc.phone}</td></tr>
        <tr><td><strong>Email</strong></td><td>${savedDoc.email}</td></tr>
        <tr><td><strong>City</strong></td><td>${savedDoc.city}</td></tr>
        <tr><td><strong>Proposed Details</strong></td><td>${savedDoc.message || 'N/A'}</td></tr>
        <tr><td><strong>Platform</strong></td><td>${savedDoc.platform}</td></tr>
        <tr><td><strong>Submitted At</strong></td><td>${savedDoc.createdAt.toLocaleString()}</td></tr>
      </table>
    `;
    sendNotificationEmail(`New Partner: ${savedDoc.fullName}`, emailHtml);

    res.status(201).json({ success: true, id: savedDoc._id });
  } catch (error) {
    console.error('Error in partner-registration:', error);
    res.status(400).json({ success: false, error: error.message });
  }
});

// 3. Submit Employee Referral
app.post('/api/employee-referral', async (req, res) => {
  try {
    const data = new EmployeeReferral(req.body);
    const savedDoc = await data.save();

    const emailHtml = `
      <h2>New Employee Referral Alert</h2>
      <p>Someone has referred an employee to our platform.</p>
      <table border="1" cellpadding="8" style="border-collapse: collapse; width: 100%; max-width: 600px;">
        <tr><td><strong>Job Category</strong></td><td>${savedDoc.jobCategory}</td></tr>
        <tr><td><strong>Employee Name</strong></td><td>${savedDoc.employeeName}</td></tr>
        <tr><td><strong>Referrer Phone</strong></td><td>${savedDoc.referrerPhone}</td></tr>
        <tr><td><strong>Employee Location</strong></td><td>${savedDoc.location || 'N/A'}</td></tr>
        <tr><td><strong>Experience</strong></td><td>${savedDoc.experience || 'N/A'}</td></tr>
        <tr><td><strong>Gender</strong></td><td>${savedDoc.gender || 'N/A'}</td></tr>
        <tr><td><strong>Platform</strong></td><td>${savedDoc.platform}</td></tr>
        <tr><td><strong>Submitted At</strong></td><td>${savedDoc.createdAt.toLocaleString()}</td></tr>
      </table>
    `;
    sendNotificationEmail(`New Referral: ${savedDoc.employeeName} (${savedDoc.jobCategory})`, emailHtml);

    res.status(201).json({ success: true, id: savedDoc._id });
  } catch (error) {
    console.error('Error in employee-referral:', error);
    res.status(400).json({ success: false, error: error.message });
  }
});

// 4. Submit Feedback
app.post('/api/feedback', async (req, res) => {
  try {
    const data = new Feedback(req.body);
    const savedDoc = await data.save();

    const emailHtml = `
      <h2>New App Feedback</h2>
      <table border="1" cellpadding="8" style="border-collapse: collapse; width: 100%; max-width: 600px;">
        <tr><td><strong>User Name</strong></td><td>${savedDoc.name}</td></tr>
        <tr><td><strong>Phone</strong></td><td>${savedDoc.phone || 'N/A'}</td></tr>
        <tr><td><strong>Email</strong></td><td>${savedDoc.email || 'N/A'}</td></tr>
        <tr><td><strong>Rating</strong></td><td>${savedDoc.rating} / 5 (${savedDoc.ratingLabel})</td></tr>
        <tr><td><strong>Message</strong></td><td>${savedDoc.message}</td></tr>
        <tr><td><strong>Platform</strong></td><td>${savedDoc.platform}</td></tr>
        <tr><td><strong>Submitted At</strong></td><td>${savedDoc.createdAt.toLocaleString()}</td></tr>
      </table>
    `;
    sendNotificationEmail(`New App Feedback - Rating: ${savedDoc.rating}★ by ${savedDoc.name}`, emailHtml);

    res.status(201).json({ success: true, id: savedDoc._id });
  } catch (error) {
    console.error('Error in feedback:', error);
    res.status(400).json({ success: false, error: error.message });
  }
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Server Error:', err.stack);
  res.status(500).json({ success: false, error: 'Internal Server Error' });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
