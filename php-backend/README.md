# AnyDomesticHelp – PHP Backend

PHP REST API replacing the Node.js/Express backend, designed for **shared cPanel hosting** (Apache).

## Files

| File | Purpose |
|---|---|
| `config.php` | MySQL connection, CORS, helpers, Google Sheets sync |
| `.htaccess` | CORS headers, clean URL routing, security |
| `schema.sql` | MySQL table definitions (import via phpMyAdmin) |
| `employer-registration.php` | POST `/api/employer-registration` |
| `partner-registration.php` | POST `/api/partner-registration` |
| `employee-referral.php` | POST `/api/employee-referral` |
| `feedback.php` | POST `/api/feedback` |
| `push-token.php` | POST `/api/push-token` |
| `send-notification.php` | POST `/api/send-notification` |
| `test-api.php` | Test script – **DELETE after testing** |

## Deployment Steps

### 1. Create MySQL Database (cPanel)

1. Log in to cPanel → **MySQL Databases**
2. Create a new database, e.g. `anydomestichelp`
   - cPanel will prefix it: `vnx3rznr_anydomestichelp`
3. Create a database user with a strong password
   - cPanel will prefix it: `vnx3rznr_dbuser`
4. **Add the user to the database** with **ALL PRIVILEGES**

### 2. Import Schema (phpMyAdmin)

1. cPanel → **phpMyAdmin** → Select your database
2. Go to **Import** tab
3. Upload `schema.sql` → Click **Go**
4. Verify 5 tables were created: `employer_registrations`, `partner_registrations`, `employee_referrals`, `feedbacks`, `push_tokens`

### 3. Upload PHP Files

1. cPanel → **File Manager** → Navigate to `public_html/`
2. Create a folder called `api`
3. Upload ALL files from `php-backend/` into `public_html/api/`
   - **Except** `schema.sql`, `test-api.php` (upload test-api.php only temporarily), and this README

### 4. Configure Database Credentials

1. In cPanel File Manager, edit `public_html/api/config.php`
2. Update these constants with your actual values:
   ```php
   define('DB_HOST',     'localhost');
   define('DB_NAME',     'vnx3rznr_anydomestichelp');
   define('DB_USER',     'vnx3rznr_dbuser');
   define('DB_PASSWORD', 'YOUR_ACTUAL_PASSWORD');
   ```
3. The `GOOGLE_SCRIPT_URL` is already set to your existing Apps Script URL

### 5. Test the API

Visit in your browser:
```
https://anydomestichelp.com/api/test-api.php
```

Or from terminal:
```bash
php test-api.php
```

You should see all tests pass. Then:
- Check **phpMyAdmin** → your tables should have test data rows
- Check **Google Sheets** → test submissions should appear

### 6. Clean Up

**DELETE `test-api.php`** from `public_html/api/` after testing is complete.

### 7. Update Mobile App

In the React Native app, `src/config/env.ts` has been updated to:
```typescript
API_BASE_URL: 'https://anydomestichelp.com'
```

The app's `apiService.ts` calls:
- `${API_BASE_URL}/api/employer-registration` → hits `employer-registration.php`
- `${API_BASE_URL}/api/partner-registration` → hits `partner-registration.php`
- etc.

The `.htaccess` clean URL rule strips `.php` so both paths work.

## API Endpoints

All endpoints accept **POST** with `Content-Type: application/json`.

### POST `/api/employer-registration`
```json
{
  "name": "John Doe",
  "phone": "9876543210",
  "email": "john@example.com",
  "city": "Mumbai",
  "workingHours": "Full Time 8 Hrs",
  "serviceType": "BabySitter",
  "serviceLabel": "Baby Sitter",
  "platform": "mobile"
}
```
**Response**: `201 { "success": true, "id": 1 }`

### POST `/api/partner-registration`
```json
{
  "fullName": "Partner Corp",
  "contactPerson": "Jane Doe",
  "phone": "9876543211",
  "email": "partner@example.com",
  "city": "Delhi",
  "message": "Interested in partnership",
  "platform": "mobile"
}
```

### POST `/api/employee-referral`
```json
{
  "jobCategory": "Cook",
  "employeeName": "Employee Name",
  "referrerPhone": "9876543212",
  "location": "Pune",
  "experience": "5 years",
  "gender": "Female",
  "platform": "mobile"
}
```

### POST `/api/feedback`
```json
{
  "name": "User Name",
  "phone": "9876543213",
  "email": "user@example.com",
  "rating": 5,
  "ratingLabel": "Excellent",
  "message": "Great service!",
  "platform": "mobile"
}
```

### POST `/api/push-token`
```json
{
  "token": "ExponentPushToken[xxx]",
  "platform": "android"
}
```

### POST `/api/send-notification`
```json
{
  "title": "New Update!",
  "body": "Check out our latest services",
  "data": {}
}
```
