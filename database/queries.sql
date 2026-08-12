-- ==============================================================================
-- DELIGHTLOOP AGENTIC OUTREACH PLATFORM - USEFUL SQL QUERIES
-- Description: Common production & reporting queries for the Delightloop platform.
-- Includes campaign analytics, high-intent lead lookups, gift redemption tracking,
-- and mailbox health audits.
-- ==============================================================================

USE delightloop_db;

-- ------------------------------------------------------------------------------
-- QUERY 1: Overall Dashboard Executive Summary KPI Aggregation
-- Purpose: Computes total outreach contacts, active campaigns, gifts redeemed,
-- and average mailbox deliverability health score.
-- ------------------------------------------------------------------------------
SELECT 
    (SELECT COUNT(*) FROM contacts) AS total_contacts,
    (SELECT COUNT(*) FROM campaigns WHERE status = 'ACTIVE') AS active_campaigns,
    (SELECT COUNT(*) FROM gift_activity WHERE status = 'REDEEMED') AS total_gifts_redeemed,
    (SELECT AVG(health_score) FROM mailboxes WHERE status = 'HEALTHY') AS avg_mailbox_health_score,
    (SELECT COUNT(*) FROM contacts WHERE intent_score >= 80) AS high_intent_lead_count;

-- ------------------------------------------------------------------------------
-- QUERY 2: Campaign Performance Breakdown with Prospects and Gift Redemption Rates
-- Purpose: JOINs campaigns with recipients and gift ledger to calculate live performance.
-- ------------------------------------------------------------------------------
SELECT 
    c.id AS campaign_id,
    c.name AS campaign_name,
    c.status AS campaign_status,
    COUNT(cr.id) AS enrolled_prospects,
    SUM(CASE WHEN cr.status = 'OPENED' THEN 1 ELSE 0 END) AS total_opened,
    SUM(CASE WHEN cr.status = 'REPLIED' THEN 1 ELSE 0 END) AS total_replied,
    SUM(CASE WHEN cr.status = 'GIFT_REDEEMED' THEN 1 ELSE 0 END) AS gifts_redeemed,
    ROUND((SUM(CASE WHEN cr.status = 'REPLIED' THEN 1 ELSE 0 END) / COUNT(cr.id)) * 100, 2) AS calculated_reply_rate_percent
FROM campaigns c
LEFT JOIN campaign_recipients cr ON c.id = cr.campaign_id
GROUP BY c.id, c.name, c.status
ORDER BY c.created_at DESC;

-- ------------------------------------------------------------------------------
-- QUERY 3: High-Intent Leads Ready for SDR Outreach
-- Purpose: Fetches top prospects with intent score >= 80 along with company,
-- title, and recent message thread status.
-- ------------------------------------------------------------------------------
SELECT 
    cnt.id AS contact_id,
    CONCAT(cnt.first_name, ' ', cnt.last_name) AS prospect_name,
    cnt.email,
    cnt.title,
    cmp.name AS company_name,
    cnt.intent_score,
    conv.subject AS latest_thread_subject,
    conv.status AS conversation_status
FROM contacts cnt
JOIN companies cmp ON cnt.company_id = cmp.id
LEFT JOIN conversations conv ON cnt.id = conv.contact_id
WHERE cnt.intent_score >= 80
ORDER BY cnt.intent_score DESC;

-- ------------------------------------------------------------------------------
-- QUERY 4: Digital Gift Redemption Audit Trail
-- Purpose: Tracks all dispatched gifts, recipient contact details, associated
-- campaign, and redemption timestamp.
-- ------------------------------------------------------------------------------
SELECT 
    ga.tracking_id,
    g.name AS gift_name,
    g.default_value AS gift_value,
    CONCAT(cnt.first_name, ' ', cnt.last_name) AS recipient_name,
    cnt.email AS recipient_email,
    cmp.name AS recipient_company,
    c.name AS campaign_name,
    ga.status AS gift_status,
    ga.created_at AS sent_at,
    ga.redeemed_at
FROM gift_activity ga
JOIN gifts g ON ga.gift_id = g.id
JOIN contacts cnt ON ga.contact_id = cnt.id
LEFT JOIN companies cmp ON cnt.company_id = cmp.id
LEFT JOIN campaigns c ON ga.campaign_id = c.id
ORDER BY ga.created_at DESC;

-- ------------------------------------------------------------------------------
-- QUERY 5: Connected Mailboxes Deliverability Audit
-- Purpose: Monitors daily send capacity, emails sent today, and health score.
-- ------------------------------------------------------------------------------
SELECT 
    m.id AS mailbox_id,
    u.full_name AS owner_name,
    m.email_address,
    m.provider,
    m.daily_send_limit,
    m.sent_today,
    (m.daily_send_limit - m.sent_today) AS remaining_sends_today,
    m.health_score,
    m.status
FROM mailboxes m
JOIN users u ON m.user_id = u.id
ORDER BY m.health_score ASC;

-- ------------------------------------------------------------------------------
-- QUERY 6: Goalie AI Audit Log & Confidence Metrics
-- Purpose: Tracks recent AI agent actions and automated decisions made across accounts.
-- ------------------------------------------------------------------------------
SELECT 
    a.id AS action_id,
    u.full_name AS triggered_by,
    a.action_type,
    a.details,
    a.confidence_score,
    a.executed_at
FROM ai_actions a
JOIN users u ON a.user_id = u.id
ORDER BY a.executed_at DESC
LIMIT 20;
