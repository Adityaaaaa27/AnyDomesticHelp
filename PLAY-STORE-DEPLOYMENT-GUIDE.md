# AnyDomesticHelp – Google Play Store Deployment Package

> **Project Name:** AnyDomesticHelp  
> **Android Package Name:** `com.anydomestichelp.app`  
> **Expo Account:** `adityab27`  
> **EAS Project ID:** `3d6bc07b-e261-41f5-9005-b8343875e8f7`  
> **Live API Base URL:** `https://anydomestichelp.com/api`  
> **Active EAS Cloud Build URL:** [Expo Dashboard - AnyDomesticHelp Builds](https://expo.dev/accounts/adityab27/projects/anydomestichelp/builds)

---

## 1. Quick Copy-Paste Store Listing Metadata

| Field | Content | Character Count / Policy Status |
| :--- | :--- | :--- |
| **App name** | `Any Domestic Help` | 17 / 30 chars |
| **Short description** | `Connect with domestic helpers, maids, cooks, and caregivers in Mumbai.` | 70 / 80 chars |
| **App Category** | `House & Home` (or `Business` / `Lifestyle`) | Compliant |
| **Content Rating** | `Everyone` (PEGI 3) | No violence, no adult content |
| **Target Audience** | `18 and older` | Standard adult household utility |
| **Privacy Policy URL**| `https://anydomestichelp.com/privacy-policy.html` | Live & compliant |
| **Contact Email** | `support@anydomestichelp.com` (or `anydomestichelp@gmail.com`) | Active mailbox |
| **Contact Phone** | `+91 98200 00000` | Mumbai support helpline |
| **Website** | `https://anydomestichelp.com` | Official website |

### Full Description (Copy & Paste):
```text
AnyDomesticHelp connects Mumbai households with domestic helpers and home care assistance. Easily submit your domestic requirements and find candidates for full-time, part-time, or live-in home support.

Key Features & Services:
• Domestic Service Categories: Browse categories including House Maids, Cooks & Chefs, Babysitters & Nannies, Patient Care Attendants, Elderly Care, and Drivers.
• Helper Profiles: Review candidate profiles with details on experience, skill categories, and background documentation.
• Submit Requirements: Register your household needs through a guided registration form to receive relevant helper recommendations.
• Candidate Referrals: Submit helper details to connect domestic workers with families seeking home assistance.
• Agency Collaboration: Dedicated registration section for domestic manpower agencies and contractors in Mumbai.
• Customer Support: Contact our Mumbai support team directly via Phone, Email, or WhatsApp.
• In-App UPI Payment: Complete service fee payments directly using UPI QR code scan and pay.

Whether you need daily cleaning, cooking, child care, or elderly assistance, AnyDomesticHelp simplifies finding domestic support for your home.
```

---

## 2. Generated Visual Assets Directory

All store listing graphics have been generated to exact Google Play specifications and saved in:  
📁 **`c:\Users\USER\Desktop\anydomestichelp\PlayStore_Assets\`**

| Asset Category | Required Spec | Generated File / Location | Verified Dimensions & Format |
| :--- | :--- | :--- | :--- |
| **App Icon** | 512 x 512 px (PNG) | `PlayStore_Assets\01_App_Icon_512x512.png` | **512 x 512 px**, 32-bit PNG |
| **Feature Graphic** | 1024 x 500 px (PNG/JPEG) | `PlayStore_Assets\02_Feature_Graphic_1024x500.png` | **1024 x 500 px**, PNG |
| **Phone Screenshots** | 9:16 Aspect Ratio (1080x1920) | `PlayStore_Assets\03_Phone_Screenshots_1080x1920\` | **1080 x 1920 px** (6 PNGs) |
| **7-inch Tablet** | 9:16 Aspect Ratio (1200x1920) | `PlayStore_Assets\04_Tablet_7Inch_Screenshots_1200x1920\` | **1200 x 1920 px** (6 PNGs) |
| **10-inch Tablet**| 9:16 Aspect Ratio (1600x2560) | `PlayStore_Assets\05_Tablet_10Inch_Screenshots_1600x2560\` | **1600 x 2560 px** (6 PNGs) |

---

## 3. Step-by-Step Google Play Console Publishing Guide

### Step 1: Trigger a New Production Build (.aab)
Run EAS build or build locally to create the updated release bundle with the synchronized icons:
```bash
cd AnyDomesticHelp
eas build --platform android --profile production
```
*Or download the completed `.aab` from:* [Expo Dashboard - AnyDomesticHelp Builds](https://expo.dev/accounts/adityab27/projects/anydomestichelp/builds)

### Step 2: Google Play Store Listing (Verify Icon & Name)
1. Go to [Google Play Console](https://play.google.com/console).
2. Select your app: **Any Domestic Help**.
3. In left navigation, open **Grow** > **Store presence** > **Main store listing**.
4. Confirm:
   - **App name**: `Any Domestic Help`
   - **App icon**: Upload `PlayStore_Assets\01_App_Icon_512x512.png` (Teal branding with house emblem & gold text).
5. Click **Save**.

### Step 3: Create New Production Release (Version 1.0.1, Build 2)
1. In left navigation, open **Release** > **Production**.
2. Click **Create new release**.
3. Upload the newly generated `app-release.aab` (Version code: `2`, Version name: `1.0.1`).
4. Release name: `1.0.1 (2)`.
5. Release notes:
   ```text
   Updated launcher icon and synchronized visual branding across the app.
   ```
6. Click **Next** -> **Review release** -> **Start rollout to Production** (or **Submit for review**).
