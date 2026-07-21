-- ═══════════════════════════════════════════════════════════════════════════════
-- AnyDomesticHelp – MySQL Database Schema
-- ═══════════════════════════════════════════════════════════════════════════════
-- Import this file via cPanel → phpMyAdmin → your database → Import tab
-- 
-- This creates the same 5 collections that existed in MongoDB, but as MySQL tables.
-- ═══════════════════════════════════════════════════════════════════════════════

-- 1. Employer Registration (matches EmployerRegistration Mongoose model)
CREATE TABLE IF NOT EXISTS employer_registrations (
    id              INT AUTO_INCREMENT PRIMARY KEY,
    name            VARCHAR(255) NOT NULL,
    phone           VARCHAR(20)  NOT NULL,
    email           VARCHAR(255) NOT NULL,
    city            VARCHAR(100) NOT NULL,
    working_hours   VARCHAR(100) NOT NULL,
    service_type    VARCHAR(100) NOT NULL,
    service_label   VARCHAR(100) NOT NULL,
    status          VARCHAR(20)  DEFAULT 'new',
    platform        VARCHAR(20)  DEFAULT 'mobile',
    created_at      TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_status (status),
    INDEX idx_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. Partner Registration (matches PartnerRegistration Mongoose model)
CREATE TABLE IF NOT EXISTS partner_registrations (
    id              INT AUTO_INCREMENT PRIMARY KEY,
    full_name       VARCHAR(255) NOT NULL,
    contact_person  VARCHAR(255) NOT NULL,
    phone           VARCHAR(20)  NOT NULL,
    email           VARCHAR(255) NOT NULL,
    city            VARCHAR(100) NOT NULL,
    message         TEXT         DEFAULT NULL,
    status          VARCHAR(20)  DEFAULT 'new',
    platform        VARCHAR(20)  DEFAULT 'mobile',
    created_at      TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_status (status),
    INDEX idx_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. Employee Referral (matches EmployeeReferral Mongoose model)
CREATE TABLE IF NOT EXISTS employee_referrals (
    id              INT AUTO_INCREMENT PRIMARY KEY,
    job_category    VARCHAR(100) NOT NULL,
    employee_name   VARCHAR(255) NOT NULL,
    referrer_phone  VARCHAR(20)  NOT NULL,
    location        VARCHAR(255) DEFAULT '',
    experience      VARCHAR(100) DEFAULT '',
    gender          VARCHAR(20)  DEFAULT '',
    status          VARCHAR(20)  DEFAULT 'new',
    platform        VARCHAR(20)  DEFAULT 'mobile',
    created_at      TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_status (status),
    INDEX idx_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. Feedback (matches Feedback Mongoose model)
CREATE TABLE IF NOT EXISTS feedbacks (
    id              INT AUTO_INCREMENT PRIMARY KEY,
    name            VARCHAR(255) NOT NULL,
    phone           VARCHAR(20)  DEFAULT '',
    email           VARCHAR(255) DEFAULT '',
    rating          INT          NOT NULL,
    rating_label    VARCHAR(50)  NOT NULL,
    message         TEXT         NOT NULL,
    platform        VARCHAR(20)  DEFAULT 'mobile',
    created_at      TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_rating (rating),
    INDEX idx_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. Push Tokens (matches PushToken Mongoose model)
CREATE TABLE IF NOT EXISTS push_tokens (
    id              INT AUTO_INCREMENT PRIMARY KEY,
    token           VARCHAR(255) NOT NULL UNIQUE,
    platform        VARCHAR(20)  DEFAULT 'unknown',
    created_at      TIMESTAMP    DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
