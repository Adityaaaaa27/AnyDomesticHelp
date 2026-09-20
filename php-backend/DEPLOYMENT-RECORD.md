# AnyDomesticHelp – Server & Deployment Record

> **Status:** ✅ FULLY DEPLOYED & LIVE  
> **Verification Date:** August 2, 2026  
> **Server Status:** 24/7 Active (GoDaddy cPanel Shared Hosting)

---

## 1. Hosting & Server Infrastructure

| Attribute | Configuration Value |
| :--- | :--- |
| **Hosting Provider** | GoDaddy cPanel Hosting |
| **Primary Domain** | `https://anydomestichelp.com` |
| **API Base URL** | `https://anydomestichelp.com/api` |
| **Shared Server IP** | `132.148.221.226` |
| **cPanel Username** | `vnx3rznbv1` |
| **Server Home Path** | `/home/vnx3rznbv1/public_html/api/` |
| **SSL / HTTPS Status** | Active (🔒 SSL Certificate Verified) |

---

## 2. MySQL Database Configuration

| Attribute | Configuration Value |
| :--- | :--- |
| **Database Host** | `localhost` |
| **Database Name** | `vnx3rznbv1_anyDomesticHelp` *(Case-sensitive)* |
| **Database User** | `vnx3rznbv1_dbuser` |
| **Database Privileges** | `ALL PRIVILEGES` Granted |
| **Charset / Collation** | `utf8mb4_unicode_ci` |
| **Server Config File** | `public_html/api/config.php` |

---

## 3. Database Schema (5 Core Tables)

The database table structures imported via `schema.sql` and verified live:

1. **`employer_registrations`** – Stores employer hiring requests.
2. **`partner_registrations`** – Stores business partner requests (`full_name`, `contact_person`, `phone`, `email`, `city`, `message`).
3. **`employee_referrals`** – Stores helper referral registrations (`job_category`, `employee_name`, `referrer_phone`, `location`, `experience`, `gender`).
4. **`feedbacks`** – Stores user reviews & star ratings (`name`, `phone`, `email`, `rating`, `rating_label`, `message`).
5. **`push_tokens`** – Stores Expo push notification tokens for broadcast messages (`token`, `platform`).

---

## 4. Third-Party Integrations

* **Google Sheets Integration:**  
  Google Apps Script Web App URL configured in `config.php`:  
  `https://script.google.com/macros/s/AKfycbzkbUhfkdpT8q_Vwm5IbsVanX9dZ_mqlpYLnEosYoGJ-1MxhQ66yxI680kbxPVqW3UNCg/exec`  
  *(Automatically mirrors every database submission to Google Sheets and sends instant email alerts).*

---

## 5. Verification & Security Summary

* **Automated Self-Test:** Executed `test-api.php` on live server (`https://anydomestichelp.com/api/test-api.php`).  
* **Result:** **`🎉 ALL TESTS PASSED!`** (All 5 POST endpoints returned `200 OK` and `{ "success": true }`).
* **Security Audit:** `test-api.php` removed from server (Verified HTTP 404 response).

---

## 6. Mobile App Build & Release Guide

### **A. Local Testing via Expo Go**
```bash
npx expo start
```
*Fill any form in Expo Go → Verify entry in phpMyAdmin under `vnx3rznbv1_anyDomesticHelp`.*

### **B. Build Standalone Android APK (Internal Phone Testing)**
```bash
npx eas build -p android --profile preview
```

### **C. Build Production AAB Bundle (Google Play Store Release)**
```bash
npx eas build -p android --profile production
```
* **Active EAS Build:** [Expo Dashboard Build Link](https://expo.dev/accounts/adityab27/projects/anydomestichelp/builds/168bf35d-b090-4b98-8aa9-e4321c3bc20a)
* **Full Step-by-Step Play Store Guide:** [PLAY-STORE-DEPLOYMENT-GUIDE.md](file:///c:/Users/USER/Desktop/anydomestichelp/AnyDomesticHelp/PLAY-STORE-DEPLOYMENT-GUIDE.md)

---
*Documented and saved for AnyDomesticHelp project record.*

---

## 7. Troubleshooting & Build Fixes

### Issue: EAS Android Build Failure on Gradle Task `:react-native-reanimated:compileReleaseJavaWithJavac`
* **Date:** August 4, 2026
* **Error Logs:**
  ```text
  Execution failed for task ':react-native-reanimated:compileReleaseJavaWithJavac'.
  ReanimatedNativeHierarchyManager.java:283: error: no suitable method found for updateLayout(int,int,int,int,int,int)
  NativeProxy.java:40: error: cannot find symbol context.getRuntimeExecutor()
  ReactFeatureFlags.enableMountHooks = true; -> error: cannot find symbol enableMountHooks
  ```
* **Root Cause:** Incompatibility between `react-native-reanimated` (`~3.10.1`) and React Native `0.76.7` (Expo SDK 52). React Native 0.76 introduced internal Java API changes that broke compilation of older `react-native-reanimated` Java sources.
* **Resolution:** 
  1. Updated `react-native-reanimated` in `package.json` from `~3.10.1` to **`~3.16.1`** (the official version compatible with Expo SDK 52 / RN 0.76).
  2. Executed `npm install` to synchronize `package-lock.json`.
  3. Re-triggered build with:
     ```bash
     eas build --platform android --profile preview
     ```


