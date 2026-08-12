-- ==============================================================================
-- DELIGHTLOOP AGENTIC OUTREACH PLATFORM - DATABASE SCHEMA
-- RDBMS: MySQL 8.0+
-- Description: Complete relational schema for managing agentic B2B campaigns,
-- prospects, personalized landing page surfaces, digital gift loops, mailboxes,
-- Goalie AI assistant logs, and Model Context Protocol (MCP) integrations.
-- ==============================================================================

CREATE DATABASE IF NOT EXISTS delightloop_db;
USE delightloop_db;

-- Drop tables in reverse order of foreign key dependency if re-initializing
SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS notifications;
DROP TABLE IF EXISTS mcp_connectors;
DROP TABLE IF EXISTS ai_actions;
DROP TABLE IF EXISTS tasks;
DROP TABLE IF EXISTS templates;
DROP TABLE IF EXISTS gift_activity;
DROP TABLE IF EXISTS gifts;
DROP TABLE IF EXISTS mailboxes;
DROP TABLE IF EXISTS surface_templates;
DROP TABLE IF EXISTS surfaces;
DROP TABLE IF EXISTS messages;
DROP TABLE IF EXISTS conversations;
DROP TABLE IF EXISTS campaign_channels;
DROP TABLE IF EXISTS campaign_recipients;
DROP TABLE IF EXISTS campaigns;
DROP TABLE IF EXISTS contacts;
DROP TABLE IF EXISTS companies;
DROP TABLE IF EXISTS users;
SET FOREIGN_KEY_CHECKS = 1;

-- ------------------------------------------------------------------------------
-- 1. USERS
-- Purpose: System account holders, team members, sales leaders, and SDRs.
-- ------------------------------------------------------------------------------
CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(30) DEFAULT 'MEMBER' COMMENT 'ADMIN, MANAGER, MEMBER, SDR',
    avatar_url VARCHAR(255),
    timezone VARCHAR(50) DEFAULT 'America/New_York',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='System users and sales team members';

-- ------------------------------------------------------------------------------
-- 2. COMPANIES
-- Purpose: B2B target account organizations and prospect employers.
-- ------------------------------------------------------------------------------
CREATE TABLE companies (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    domain VARCHAR(100) UNIQUE,
    industry VARCHAR(100),
    employee_count INT,
    annual_revenue VARCHAR(50),
    tier VARCHAR(20) DEFAULT 'TIER_2' COMMENT 'TIER_1, TIER_2, TIER_3',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='B2B Target Accounts and Prospect Companies';

-- ------------------------------------------------------------------------------
-- 3. CONTACTS
-- Purpose: B2B decision makers, buyers, and outreach prospects.
-- ------------------------------------------------------------------------------
CREATE TABLE contacts (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    company_id BIGINT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    phone VARCHAR(30),
    title VARCHAR(100),
    linkedin_url VARCHAR(255),
    intent_score INT DEFAULT 50 COMMENT '0-100 score computed by Goalie AI',
    status VARCHAR(30) DEFAULT 'UNCONTACTED' COMMENT 'UNCONTACTED, IN_PLAY, ENGAGED, HIGH_INTENT, CONVERTED',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_contacts_company FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='Prospect contacts targeted across outreach loops';

-- ------------------------------------------------------------------------------
-- 4. CAMPAIGNS
-- Purpose: Agentic multi-channel gifting and surface outreach campaigns.
-- ------------------------------------------------------------------------------
CREATE TABLE campaigns (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    name VARCHAR(150) NOT NULL,
    status VARCHAR(30) DEFAULT 'DRAFT' COMMENT 'DRAFT, ACTIVE, PAUSED, COMPLETED',
    total_prospects INT DEFAULT 0,
    open_rate_percent DECIMAL(5,2) DEFAULT 0.00,
    reply_rate_percent DECIMAL(5,2) DEFAULT 0.00,
    gifts_sent INT DEFAULT 0,
    gifts_redeemed INT DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_campaigns_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='Outreach campaigns organizing prospect messaging';

-- ------------------------------------------------------------------------------
-- 5. CAMPAIGN_RECIPIENTS
-- Purpose: Junction mapping contacts enrolled into specific campaigns.
-- ------------------------------------------------------------------------------
CREATE TABLE campaign_recipients (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    campaign_id BIGINT NOT NULL,
    contact_id BIGINT NOT NULL,
    status VARCHAR(30) DEFAULT 'PENDING' COMMENT 'PENDING, SENT, OPENED, REPLIED, GIFT_REDEEMED',
    enrolled_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    last_contacted_at DATETIME,
    CONSTRAINT fk_recipients_campaign FOREIGN KEY (campaign_id) REFERENCES campaigns(id) ON DELETE CASCADE,
    CONSTRAINT fk_recipients_contact FOREIGN KEY (contact_id) REFERENCES contacts(id) ON DELETE CASCADE,
    CONSTRAINT uq_campaign_contact UNIQUE (campaign_id, contact_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='Enrollment table for campaign targets';

-- ------------------------------------------------------------------------------
-- 6. CAMPAIGN_CHANNELS
-- Purpose: Channels configured for a campaign (Email, LinkedIn, Gift Surface).
-- ------------------------------------------------------------------------------
CREATE TABLE campaign_channels (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    campaign_id BIGINT NOT NULL,
    channel_type VARCHAR(50) NOT NULL COMMENT 'EMAIL, LINKEDIN, DIGITAL_SURFACE, SMS',
    is_enabled BOOLEAN DEFAULT TRUE,
    sequence_order INT DEFAULT 1,
    CONSTRAINT fk_channels_campaign FOREIGN KEY (campaign_id) REFERENCES campaigns(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='Outreach execution channels per campaign';

-- ------------------------------------------------------------------------------
-- 7. CONVERSATIONS
-- Purpose: High-intent engagement inbox threads with prospects.
-- ------------------------------------------------------------------------------
CREATE TABLE conversations (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    contact_id BIGINT NOT NULL,
    campaign_id BIGINT,
    subject VARCHAR(255) NOT NULL,
    unread BOOLEAN DEFAULT TRUE,
    status VARCHAR(30) DEFAULT 'OPEN' COMMENT 'OPEN, REPLIED, CLOSED, ARCHIVED',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_conv_contact FOREIGN KEY (contact_id) REFERENCES contacts(id) ON DELETE CASCADE,
    CONSTRAINT fk_conv_campaign FOREIGN KEY (campaign_id) REFERENCES campaigns(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='Communication threads for prospect inbox management';

-- ------------------------------------------------------------------------------
-- 8. MESSAGES
-- Purpose: Individual messages exchanged in prospect inbox threads.
-- ------------------------------------------------------------------------------
CREATE TABLE messages (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    conversation_id BIGINT NOT NULL,
    sender_type VARCHAR(20) NOT NULL COMMENT 'USER, PROSPECT, GOALIE_AI',
    body TEXT NOT NULL,
    sent_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_messages_conversation FOREIGN KEY (conversation_id) REFERENCES conversations(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='Individual message records in conversation threads';

-- ------------------------------------------------------------------------------
-- 9. SURFACES
-- Purpose: Hyper-personalized landing page surfaces dynamically generated for leads.
-- ------------------------------------------------------------------------------
CREATE TABLE surfaces (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    campaign_id BIGINT,
    title VARCHAR(150) NOT NULL,
    slug VARCHAR(100) NOT NULL UNIQUE,
    theme VARCHAR(50) DEFAULT 'DARK_PURPLE',
    hero_headline VARCHAR(255),
    cta_text VARCHAR(100) DEFAULT 'Claim $25 Coffee & Book Demo',
    view_count INT DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_surfaces_campaign FOREIGN KEY (campaign_id) REFERENCES campaigns(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='Dynamic landing page surfaces built for prospects';

-- ------------------------------------------------------------------------------
-- 10. SURFACE_TEMPLATES
-- Purpose: Pre-configured visual layout templates for surface creation.
-- ------------------------------------------------------------------------------
CREATE TABLE surface_templates (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    category VARCHAR(50) DEFAULT 'ENTERPRISE',
    preview_image_url VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='Visual templates used when generating landing surfaces';

-- ------------------------------------------------------------------------------
-- 11. MAILBOXES
-- Purpose: Google Workspace / Microsoft 365 connected mailboxes for outreach.
-- ------------------------------------------------------------------------------
CREATE TABLE mailboxes (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    email_address VARCHAR(150) NOT NULL UNIQUE,
    provider VARCHAR(50) DEFAULT 'GOOGLE_WORKSPACE',
    daily_send_limit INT DEFAULT 100,
    sent_today INT DEFAULT 0,
    health_score DECIMAL(5,2) DEFAULT 98.50,
    status VARCHAR(30) DEFAULT 'HEALTHY' COMMENT 'HEALTHY, WARMING_UP, PAUSED, AUTH_ERROR',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_mailboxes_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='Connected outreach mailboxes and deliverability tracking';

-- ------------------------------------------------------------------------------
-- 12. GIFTS
-- Purpose: Digital e-gift inventory types (Starbucks, DoorDash, Amazon, etc.).
-- ------------------------------------------------------------------------------
CREATE TABLE gifts (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    category VARCHAR(50) DEFAULT 'COFFEE' COMMENT 'COFFEE, FOOD, RETAIL, CHARITY',
    currency VARCHAR(10) DEFAULT 'USD',
    default_value DECIMAL(10,2) DEFAULT 25.00,
    is_active BOOLEAN DEFAULT TRUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='Digital gift items available for dispatch';

-- ------------------------------------------------------------------------------
-- 13. GIFT_ACTIVITY
-- Purpose: Ledger of dispatched, claimed, and redeemed gift transactions.
-- ------------------------------------------------------------------------------
CREATE TABLE gift_activity (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    tracking_id VARCHAR(50) NOT NULL UNIQUE,
    gift_id BIGINT NOT NULL,
    contact_id BIGINT NOT NULL,
    campaign_id BIGINT,
    status VARCHAR(30) DEFAULT 'SENT' COMMENT 'SENT, CLAIMED, REDEEMED, EXPIRED',
    claimed_at DATETIME,
    redeemed_at DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_activity_gift FOREIGN KEY (gift_id) REFERENCES gifts(id),
    CONSTRAINT fk_activity_contact FOREIGN KEY (contact_id) REFERENCES contacts(id) ON DELETE CASCADE,
    CONSTRAINT fk_activity_campaign FOREIGN KEY (campaign_id) REFERENCES campaigns(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='Transaction ledger for sent digital gift cards';

-- ------------------------------------------------------------------------------
-- 14. TEMPLATES
-- Purpose: Reusable email, LinkedIn, and surface copy templates.
-- ------------------------------------------------------------------------------
CREATE TABLE templates (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    category VARCHAR(50) DEFAULT 'COLD_EMAIL',
    subject_line VARCHAR(255),
    body_content TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='Messaging and outreach copy templates';

-- ------------------------------------------------------------------------------
-- 15. TASKS
-- Purpose: Actionable tasks assigned to SDRs or automated by Goalie AI.
-- ------------------------------------------------------------------------------
CREATE TABLE tasks (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    contact_id BIGINT,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    due_date DATE,
    priority VARCHAR(20) DEFAULT 'MEDIUM' COMMENT 'LOW, MEDIUM, HIGH, URGENT',
    status VARCHAR(20) DEFAULT 'OPEN' COMMENT 'OPEN, IN_PROGRESS, COMPLETED',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_tasks_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_tasks_contact FOREIGN KEY (contact_id) REFERENCES contacts(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='SDR tasks and automated action items';

-- ------------------------------------------------------------------------------
-- 16. AI_ACTIONS
-- Purpose: Audit trail of Goalie AI autonomous actions and decisions.
-- ------------------------------------------------------------------------------
CREATE TABLE ai_actions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    action_type VARCHAR(100) NOT NULL COMMENT 'AUTO_REPLY_DRAFT, SURFACE_GENERATED, EXPRESS_GIFT_DISPATCH',
    details TEXT,
    confidence_score DECIMAL(5,2) DEFAULT 0.95,
    executed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_ai_actions_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='Audit logs for Goalie AI agent actions';

-- ------------------------------------------------------------------------------
-- 17. MCP_CONNECTORS
-- Purpose: Model Context Protocol (MCP) tool integration definitions.
-- ------------------------------------------------------------------------------
CREATE TABLE mcp_connectors (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    provider VARCHAR(100) NOT NULL,
    auth_type VARCHAR(50) DEFAULT 'OAUTH2',
    status VARCHAR(30) DEFAULT 'CONNECTED' COMMENT 'CONNECTED, DISCONNECTED, ERROR',
    last_synced_at DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='MCP tool integrations (HubSpot, Salesforce, Gmail)';

-- ------------------------------------------------------------------------------
-- 18. NOTIFICATIONS
-- Purpose: Realtime alerts and campaign event notifications for sales reps.
-- ------------------------------------------------------------------------------
CREATE TABLE notifications (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    title VARCHAR(150) NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_notifications_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='User notifications and system alerts';
