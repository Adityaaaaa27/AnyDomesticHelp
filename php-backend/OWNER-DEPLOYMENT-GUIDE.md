# AnyDomesticHelp – Server Deployment Instructions
### For: Server Owner / GoDaddy cPanel Admin

Hi! The PHP backend for the AnyDomesticHelp mobile app is ready.  
Please follow these steps to deploy it on your GoDaddy cPanel hosting.

---

## What This Does

The mobile app needs a backend server to save form submissions (employer registrations, partner requests, feedback, etc.) to a database and sync them to Google Sheets. This PHP backend replaces the old Node.js server and runs directly on your cPanel hosting — no extra software needed.

---

## Step 1: Create a MySQL Database

1. Log in to **GoDaddy** → go to your **cPanel**
2. Find **MySQL® Databases** (under Databases section)
3. **Create a New Database**:
   - Name: `anydomestichelp` (cPanel will prefix it with your username, e.g., `vnx3rznr_anydomestichelp`)
4. **Create a New User**:
   - Username: `dbuser` (will become `vnx3rznr_dbuser`)
   - Password: Choose a strong password — **write it down, the developer needs it**
5. **Add User to Database**:
   - Select the user and database you just created
   - Grant **ALL PRIVILEGES**
   - Click "Make Changes"

---

## Step 2: Import the Database Tables

1. In cPanel, open **phpMyAdmin**
2. Click on your database name (e.g., `vnx3rznr_anydomestichelp`) in the left sidebar
3. Click the **Import** tab at the top
4. Click **Choose File** → select the `schema.sql` file (attached / in the php-backend folder)
5. Click **Go**
6. You should see a success message and 5 tables listed:
   - `employer_registrations`
   - `partner_registrations`
   - `employee_referrals`
   - `feedbacks`
   - `push_tokens`

---

## Step 3: Upload the PHP Files

1. In cPanel, open **File Manager**
2. Navigate to `public_html/`
3. Create a new folder called **`api`** (so the path is `public_html/api/`)
4. Open the `api` folder
5. Click **Upload** and upload these files from the `php-backend/` folder:
   - `.htaccess`
   - `config.php`
   - `employer-registration.php`
   - `partner-registration.php`
   - `employee-referral.php`
   - `feedback.php`
   - `push-token.php`
   - `send-notification.php`
   - `test-api.php` (temporary, will delete later)

> ⚠️ Make sure `.htaccess` is uploaded! It may be hidden — in File Manager, click **Settings** (top right) → check **Show Hidden Files**.

---

## Step 4: Update Database Credentials

1. In File Manager, navigate to `public_html/api/`
2. Right-click `config.php` → **Edit**
3. Find these lines near the top and update them:

```php
define('DB_HOST',     'localhost');
define('DB_NAME',     'vnx3rznr_anydomestichelp');   // ← your actual prefixed DB name
define('DB_USER',     'vnx3rznr_dbuser');             // ← your actual prefixed username
define('DB_PASSWORD', 'YOUR_DB_PASSWORD_HERE');       // ← the password you created in Step 1
```

4. Click **Save Changes**

---

## Step 5: Test It

Open this URL in your browser:

```
https://anydomestichelp.com/api/test-api.php
```

You should see output like:
```
✅ PASS | POST /api/employer-registration
✅ PASS | POST /api/partner-registration
✅ PASS | POST /api/employee-referral
✅ PASS | POST /api/feedback
✅ PASS | POST /api/push-token
...
🎉 ALL TESTS PASSED!
```

**After testing passes:**
- Check phpMyAdmin → your tables should have test data
- **DELETE `test-api.php`** from `public_html/api/` (it's only for testing)

---

## Step 6: Share These Details with the Developer

After completing the steps above, please share with the developer:

1. ✅ "Deployment is done"
2. The **exact database name** (with prefix, e.g., `vnx3rznr_anydomestichelp`)
3. The **exact database username** (with prefix)
4. Confirmation that the **test page passed**
5. Whether **SSL/HTTPS** is active on `anydomestichelp.com`

The developer will then update the mobile app to connect to the live server.

---

## SSL/HTTPS Check

The mobile app requires HTTPS. To verify:
1. Visit `https://anydomestichelp.com` in your browser
2. Check for the 🔒 padlock icon
3. If not working, in cPanel → **SSL/TLS Status** → enable AutoSSL, or it may already be handled by Cloudflare

---

## Troubleshooting

| Issue | Fix |
|---|---|
| Test page shows blank/error | Check `config.php` credentials are correct |
| "Access denied for user" | Make sure the DB user was added to the database with ALL PRIVILEGES |
| `.htaccess` not working | In cPanel File Manager Settings, enable "Show Hidden Files" and re-upload |
| 500 Internal Server Error | Check cPanel → Error Logs for details |

---

**That's it!** Once you confirm everything is working, the developer will finalize the mobile app connection.
