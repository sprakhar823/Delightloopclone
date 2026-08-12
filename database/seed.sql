-- ==============================================================================
-- DELIGHTLOOP AGENTIC OUTREACH PLATFORM - SEED DATA
-- Description: Realistic initial demo data populating all 18 tables.
-- Matches data present in Delightloop UI mockups and platform statistics.
-- ==============================================================================

USE delightloop_db;

-- 1. USERS
INSERT INTO users (id, full_name, email, password_hash, role, avatar_url) VALUES
(1, 'Alex Mercer', 'alex.mercer@delightloop.io', '$2a$12$eXaMpLeHaShVaLuE1234567890abcdef', 'ADMIN', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'),
(2, 'Sarah Jenkins', 'sarah.j@delightloop.io', '$2a$12$eXaMpLeHaShVaLuE1234567890abcdef', 'SDR', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100');

-- 2. COMPANIES
INSERT INTO companies (id, name, domain, industry, employee_count, tier) VALUES
(1, 'TechCorp Systems', 'techcorp.com', 'Enterprise Software', 2500, 'TIER_1'),
(2, 'Fintech Pulse', 'fintechpulse.io', 'Financial Technology', 800, 'TIER_1'),
(3, 'CloudNexus', 'cloudnexus.app', 'DevOps & Cloud', 1200, 'TIER_2'),
(4, 'HealthScale AI', 'healthscale.med', 'Healthcare Tech', 450, 'TIER_2');

-- 3. CONTACTS
INSERT INTO contacts (id, company_id, first_name, last_name, email, phone, title, intent_score, status) VALUES
(1, 1, 'Marcus', 'Vance', 'marcus.vance@techcorp.com', '+1-555-0192', 'VP of Global Engineering', 94, 'HIGH_INTENT'),
(2, 2, 'Elena', 'Rostova', 'elena.r@fintechpulse.io', '+1-555-0143', 'Chief Marketing Officer', 88, 'HIGH_INTENT'),
(3, 3, 'David', 'Kowalski', 'david.k@cloudnexus.app', '+1-555-0188', 'Head of Enterprise Sales', 72, 'ENGAGED'),
(4, 4, 'Dr. Aris', 'Thorne', 'aris.t@healthscale.med', '+1-555-0112', 'Chief Information Officer', 45, 'UNCONTACTED');

-- 4. CAMPAIGNS
INSERT INTO campaigns (id, user_id, name, status, total_prospects, open_rate_percent, reply_rate_percent, gifts_sent, gifts_redeemed, created_at) VALUES
(1, 1, 'Q3 Enterprise Account Executives - Custom Surface', 'ACTIVE', 450, 68.00, 24.00, 85, 34, '2025-08-01 09:00:00'),
(2, 1, 'Tier 1 CTO & VP Engineering Gifting Loop', 'ACTIVE', 280, 74.00, 31.00, 60, 28, '2025-08-04 10:30:00'),
(3, 1, 'Fintech CMO Hyper-Personalized Express Send', 'ACTIVE', 120, 82.00, 39.00, 40, 22, '2025-08-08 14:15:00'),
(4, 1, 'SaaS Founder Re-engagement Campaign', 'PAUSED', 310, 51.00, 14.00, 20, 5, '2025-07-20 11:00:00'),
(5, 1, 'Healthcare IT Directors Cold Surface Intro', 'DRAFT', 0, 0.00, 0.00, 0, 0, '2025-08-10 16:45:00');

-- 5. CAMPAIGN_RECIPIENTS
INSERT INTO campaign_recipients (campaign_id, contact_id, status, enrolled_at, last_contacted_at) VALUES
(1, 1, 'GIFT_REDEEMED', '2025-08-01 09:15:00', '2025-08-11 10:42:00'),
(2, 2, 'REPLIED', '2025-08-04 10:35:00', '2025-08-11 09:30:00'),
(3, 3, 'OPENED', '2025-08-08 14:20:00', '2025-08-10 11:15:00'),
(4, 4, 'PENDING', '2025-08-10 16:50:00', NULL);

-- 6. CAMPAIGN_CHANNELS
INSERT INTO campaign_channels (campaign_id, channel_type, is_enabled, sequence_order) VALUES
(1, 'EMAIL', TRUE, 1),
(1, 'DIGITAL_SURFACE', TRUE, 2),
(1, 'LINKEDIN', TRUE, 3),
(2, 'EMAIL', TRUE, 1),
(2, 'DIGITAL_SURFACE', TRUE, 2);

-- 7. CONVERSATIONS
INSERT INTO conversations (id, contact_id, campaign_id, subject, unread, status) VALUES
(1, 1, 1, 'Quick digital coffee & TechCorp Engineering Discussion', TRUE, 'OPEN'),
(2, 2, 3, 'Fintech CMO Gifting & Hyper-Personalized Surface demo', FALSE, 'REPLIED');

-- 8. MESSAGES
INSERT INTO messages (id, conversation_id, sender_type, body, sent_at) VALUES
(1, 1, 'USER', 'Hi Marcus, sent over a quick digital coffee surface link customized for your engineering team at TechCorp.', '2025-08-11 09:15:00'),
(2, 1, 'PROSPECT', 'Thanks for reaching out Alex! Really enjoyed the personalized landing surface. Let us set up a 15 min demo call next Tuesday.', '2025-08-11 10:42:00'),
(3, 2, 'USER', 'Elena, loved your recent keynote on fintech growth marketing. Sent you a custom $25 DoorDash surface!', '2025-08-11 08:30:00');

-- 9. SURFACES
INSERT INTO surfaces (id, campaign_id, title, slug, theme, hero_headline, view_count) VALUES
(1, 1, 'TechCorp VP Engineering Executive Brief', 'techcorp-vp-brief', 'DARK_PURPLE', 'Accelerate Engineering Velocity with Agentic Loops', 142),
(2, 2, 'Fintech Pulse CMO Growth Surface', 'fintech-pulse-growth', 'DARK_EMERALD', 'Personalized B2B Gifting That Converts Tier-1 Accounts', 89),
(3, 3, 'CloudNexus Sales Acceleration Hub', 'cloudnexus-sales-hub', 'DARK_INDIGO', 'Double Reply Rates across Enterprise Accounts', 64);

-- 10. SURFACE_TEMPLATES
INSERT INTO surface_templates (id, name, category, is_active) VALUES
(1, 'Executive Coffee Landing', 'ENTERPRISE', TRUE),
(2, 'Interactive Calculator Surface', 'PRODUCT_DEMO', TRUE),
(3, 'VIP Event & Dinner Invitation', 'EVENT', TRUE);

-- 11. MAILBOXES
INSERT INTO mailboxes (id, user_id, email_address, provider, daily_send_limit, sent_today, health_score, status) VALUES
(1, 1, 'alex.mercer@delightloop.io', 'GOOGLE_WORKSPACE', 150, 42, 98.50, 'HEALTHY'),
(2, 1, 'outreach.alex@delightloop-mail.com', 'MICROSOFT_365', 100, 28, 96.20, 'HEALTHY'),
(3, 2, 'sarah.j@delightloop.io', 'GOOGLE_WORKSPACE', 150, 35, 99.10, 'HEALTHY');

-- 12. GIFTS
INSERT INTO gifts (id, name, category, currency, default_value) VALUES
(1, 'Starbucks Digital Coffee Card', 'COFFEE', 'USD', 15.00),
(2, 'DoorDash Gourmet Meal Voucher', 'FOOD', 'USD', 25.00),
(3, 'Amazon Enterprise eGift Voucher', 'RETAIL', 'USD', 50.00);

-- 13. GIFT_ACTIVITY
INSERT INTO gift_activity (id, tracking_id, gift_id, contact_id, campaign_id, status, claimed_at, redeemed_at, created_at) VALUES
(1, 'DL-GIFT-849102', 1, 1, 1, 'REDEEMED', '2025-08-11 10:15:00', '2025-08-11 10:42:00', '2025-08-11 09:15:00'),
(2, 'DL-GIFT-392019', 2, 2, 3, 'CLAIMED', '2025-08-11 09:00:00', NULL, '2025-08-11 08:30:00'),
(3, 'DL-GIFT-582910', 1, 3, 2, 'SENT', NULL, NULL, '2025-08-10 14:00:00');

-- 14. TEMPLATES
INSERT INTO templates (id, title, category, subject_line, body_content) VALUES
(1, 'Executive Coffee Invite Template', 'COLD_EMAIL', 'Quick digital coffee & {{company_name}} Engineering Brief', 'Hi {{first_name}}, I noticed your recent engineering expansion at {{company_name}}. Enjoy a coffee on us on your custom surface page!'),
(2, 'High Intent Followup Draft', 'FOLLOW_UP', 'Re: {{subject}}', 'Sounds great {{first_name}}! I have placed a hold on Tuesday at 2 PM EST. Looking forward to speaking.');

-- 15. TASKS
INSERT INTO tasks (id, user_id, contact_id, title, description, due_date, priority, status) VALUES
(1, 1, 1, 'Prepare 15-min demo deck for Marcus Vance', 'Focus on Enterprise Engineering security and agentic surface personalization', '2025-08-12', 'HIGH', 'OPEN'),
(2, 2, 2, 'Confirm Tuesday demo time with Elena Rostova', 'Send calendar invite with Google Meet link', '2025-08-11', 'URGENT', 'COMPLETED');

-- 16. AI_ACTIONS
INSERT INTO ai_actions (id, user_id, action_type, details, confidence_score, executed_at) VALUES
(1, 1, 'AUTO_REPLY_DRAFT', 'Generated personalized reply to Marcus Vance recommending Tuesday 2 PM demo slot', 0.98, '2025-08-11 10:43:00'),
(2, 1, 'SURFACE_GENERATED', 'Auto-created executive surface page "techcorp-vp-brief" using Enterprise template', 0.95, '2025-08-11 09:10:00');

-- 17. MCP_CONNECTORS
INSERT INTO mcp_connectors (id, name, provider, auth_type, status, last_synced_at) VALUES
(1, 'HubSpot CRM Sync', 'HubSpot', 'OAUTH2', 'CONNECTED', '2025-08-11 11:00:00'),
(2, 'Salesforce Enterprise MCP', 'Salesforce', 'OAUTH2', 'CONNECTED', '2025-08-11 10:55:00'),
(3, 'Google Workspace Mailbox MCP', 'Google', 'OAUTH2', 'CONNECTED', '2025-08-11 11:02:00');

-- 18. NOTIFICATIONS
INSERT INTO notifications (id, user_id, title, message, is_read, created_at) VALUES
(1, 1, 'Gift Redeemed!', 'Marcus Vance redeemed $15 Starbucks Coffee card and replied to your thread.', FALSE, '2025-08-11 10:42:00'),
(2, 1, 'High Intent Lead Alert', 'Elena Rostova reached intent score 88 after viewing Fintech Pulse Surface 3 times.', TRUE, '2025-08-11 09:05:00');
