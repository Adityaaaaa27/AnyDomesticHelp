const express = require('express');
const mongoose = require('mongoose');
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

// Helper function to send registration data to Google Apps Script Web App
const sendToGoogleSheet = async (formType, data) => {
  const scriptUrl = process.env.GOOGLE_SCRIPT_URL;
  if (!scriptUrl) {
    console.warn('WARNING: GOOGLE_SCRIPT_URL is not defined in env variables. Skipping Google Sheet sync.');
    return;
  }

  try {
    const response = await fetch(scriptUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        formType,
        ...data,
      }),
    });

    const resData = await response.json();
    if (response.ok && resData.success) {
      console.log(`Successfully synced ${formType} submission to Google Sheet.`);
    } else {
      console.error(`Failed to sync ${formType} submission to Google Sheet:`, resData.error || response.statusText);
    }
  } catch (error) {
    console.error(`Error syncing ${formType} submission to Google Sheet:`, error.message);
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

    // Trigger Google Sheet sync & email notification
    sendToGoogleSheet('employer', {
      name: savedDoc.name,
      phone: savedDoc.phone,
      email: savedDoc.email,
      city: savedDoc.city,
      workingHours: savedDoc.workingHours,
      serviceType: savedDoc.serviceType,
      serviceLabel: savedDoc.serviceLabel,
      platform: savedDoc.platform,
    });

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

    // Trigger Google Sheet sync & email notification
    sendToGoogleSheet('partner', {
      fullName: savedDoc.fullName,
      contactPerson: savedDoc.contactPerson,
      phone: savedDoc.phone,
      email: savedDoc.email,
      city: savedDoc.city,
      message: savedDoc.message,
      platform: savedDoc.platform,
    });

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

    // Trigger Google Sheet sync & email notification
    sendToGoogleSheet('referral', {
      jobCategory: savedDoc.jobCategory,
      employeeName: savedDoc.employeeName,
      referrerPhone: savedDoc.referrerPhone,
      location: savedDoc.location,
      experience: savedDoc.experience,
      gender: savedDoc.gender,
      platform: savedDoc.platform,
    });

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

    // Trigger Google Sheet sync & email notification
    sendToGoogleSheet('feedback', {
      name: savedDoc.name,
      phone: savedDoc.phone,
      email: savedDoc.email,
      rating: savedDoc.rating,
      ratingLabel: savedDoc.ratingLabel,
      message: savedDoc.message,
      platform: savedDoc.platform,
    });

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
