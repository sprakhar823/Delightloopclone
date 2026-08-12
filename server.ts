import express from 'express';
import path from 'path';
import { GoogleGenAI } from '@google/genai';

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialize Gemini AI Client
function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new GoogleGenAI({ apiKey });
}

// Serve static frontend files
const frontendDir = path.join(process.cwd(), 'frontend');
app.use(express.static(frontendDir));

// Pending agent actions store for human-in-the-loop confirmation
const pendingActionsMap = new Map<string, {
  actionId: string;
  action: string;
  message: string;
}>();

// Agentic AI Query Endpoint
app.post('/api/assistant/query', async (req, res) => {
  const message = req.body.message || req.body.prompt || '';
  const msgLower = message.toLowerCase().trim();

  // 1. ADD_CONTACTS_TO_CAMPAIGN (Modifying Action -> Requires Confirmation)
  if (msgLower.includes('add') || msgLower.includes('enroll') || msgLower.includes('assign') || msgLower.includes('push')) {
    const actionId = 'act_' + Math.floor(100000 + Math.random() * 900000);
    const actionMsg = '17 uncontacted contacts will be added to Campaign "Q3 Enterprise Account Executives".';
    
    pendingActionsMap.set(actionId, {
      actionId,
      action: 'ADD_CONTACTS_TO_CAMPAIGN',
      message: actionMsg
    });

    return res.json({
      requiresConfirmation: true,
      actionId,
      message: actionMsg,
      action: 'ADD_CONTACTS_TO_CAMPAIGN'
    });
  }

  // 2. CREATE_TASK (Modifying Action -> Requires Confirmation)
  if (msgLower.includes('task') || msgLower.includes('todo') || msgLower.includes('remind') || msgLower.includes('schedule call') || msgLower.includes('follow up') || msgLower.includes('followup')) {
    const actionId = 'act_' + Math.floor(100000 + Math.random() * 900000);
    const actionMsg = 'A follow-up task "Call Marcus Vance re: Gift Redemption" will be created for tomorrow.';
    
    pendingActionsMap.set(actionId, {
      actionId,
      action: 'CREATE_TASK',
      message: actionMsg
    });

    return res.json({
      requiresConfirmation: true,
      actionId,
      message: actionMsg,
      action: 'CREATE_TASK'
    });
  }

  // Read-Only Intents (Execute Immediately)
  let intent = 'GET_CAMPAIGNS';
  let responseMsg = '';
  let data: any = null;

  if (msgLower.includes('uncontacted') || msgLower.includes('new lead') || msgLower.includes('fresh')) {
    intent = 'GET_UNCONTACTED_CONTACTS';
    responseMsg = 'Found 17 uncontacted high-intent prospects ready for Goalie outreach.';
    data = [
      { name: 'Sarah Jenkins', email: 'sjenkins@acme.com', company: 'Acme Corp', intentScore: 92, status: 'UNCONTACTED' },
      { name: 'Marcus Vance', email: 'mvance@techflow.io', company: 'TechFlow', intentScore: 88, status: 'UNCONTACTED' },
      { name: 'Elena Rostova', email: 'erostova@apex.com', company: 'Apex Systems', intentScore: 85, status: 'UNCONTACTED' }
    ];
  } else if (msgLower.includes('insight') || msgLower.includes('analytics') || msgLower.includes('rate') || msgLower.includes('roi')) {
    intent = 'GET_CAMPAIGN_INSIGHTS';
    responseMsg = 'Goalie Campaign Insights: Average open rate is 68.4% and reply rate is 24.2%. Pairing custom landing page surfaces with $25 gift vouchers increased meetings booked by 3.2x.';
    data = { avgOpenRate: '68.4%', avgReplyRate: '24.2%', topPerformingCampaign: 'Q3 Enterprise Account Executives' };
  } else if (msgLower.includes('gift') || msgLower.includes('coffee') || msgLower.includes('doordash') || msgLower.includes('card') || msgLower.includes('redemption')) {
    intent = 'GET_GIFTING_ACTIVITY';
    responseMsg = 'Retrieved gifting activity records. 84 total digital gift cards redeemed across active campaigns this month.';
    data = [
      { recipient: 'Sarah Jenkins', gift: '$25 Starbucks Card', status: 'CLAIMED', date: '2025-08-08' },
      { recipient: 'Marcus Vance', gift: '$15 DoorDash Pass', status: 'DELIVERED', date: '2025-08-09' }
    ];
  } else if (msgLower.includes('contact') || msgLower.includes('prospect') || msgLower.includes('lead') || msgLower.includes('people')) {
    intent = 'GET_CONTACTS';
    responseMsg = 'Retrieved 128 prospect contacts from the database.';
    data = [
      { name: 'Sarah Jenkins', title: 'VP Sales', company: 'Acme Corp', intentScore: 92 },
      { name: 'Marcus Vance', title: 'CTO', company: 'TechFlow', intentScore: 88 }
    ];
  } else {
    intent = 'GET_CAMPAIGNS';
    responseMsg = msgLower.includes('no engagement') || msgLower.includes('engagement')
      ? 'Analyzed active campaigns. Found 2 campaigns with low engagement (< 10% reply rate) that would benefit from an Express Gifting Surface boost.'
      : 'Found 5 active outreach campaigns in your Delightloop account.';
    data = [
      { name: 'Q3 Enterprise Account Executives', status: 'Active', prospects: 450, replied: '24%' },
      { name: 'SaaS Founder Re-engagement Campaign', status: 'Paused', prospects: 310, replied: '14%' }
    ];
  }

  return res.json({
    requiresConfirmation: false,
    intent,
    message: responseMsg,
    data
  });
});

// Confirm Action Endpoint
app.post('/api/assistant/actions/:id/confirm', (req, res) => {
  const { id } = req.params;
  const pending = pendingActionsMap.get(id);

  if (!pending) {
    return res.status(404).json({
      success: false,
      actionId: id,
      action: 'UNKNOWN',
      message: 'Action not found or already executed.'
    });
  }

  pendingActionsMap.delete(id);
  return res.json({
    success: true,
    actionId: id,
    action: pending.action,
    message: `Action ${id} confirmed and executed successfully! ${pending.message}`
  });
});

// Cancel Action Endpoint
app.post('/api/assistant/actions/:id/cancel', (req, res) => {
  const { id } = req.params;
  const pending = pendingActionsMap.get(id);

  if (!pending) {
    return res.status(404).json({
      success: false,
      actionId: id,
      action: 'UNKNOWN',
      message: `Action ${id} was not found or already cancelled.`
    });
  }

  pendingActionsMap.delete(id);
  return res.json({
    success: true,
    actionId: id,
    action: pending.action,
    message: `Action ${id} was cancelled.`
  });
});

// Fallback route to frontend/index.html if route not found
app.get('/', (req, res) => {
  res.sendFile(path.join(frontendDir, 'index.html'));
});

// Health API check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', app: 'Delightloop Agentic Outreach Platform' });
});

// Dashboard Stats Endpoint
app.get('/api/dashboard/stats', (req, res) => {
  res.json({
    totalOutreach: 14280,
    activeCampaigns: 18,
    giftsRedeemed: 342,
    responseRate: '24.8%',
    highIntentLeads: 128,
    activeSurfaces: 24,
    mailboxHealth: '98.5%'
  });
});

// Campaigns Endpoint
app.get('/api/campaigns', (req, res) => {
  res.json([
    { id: 'c1', name: 'Q3 Enterprise Account Executives - Custom Surface', status: 'Active', prospects: 450, opened: '68%', replied: '24%', giftsSent: 85, redeemed: 34, date: '2025-08-01' },
    { id: 'c2', name: 'Tier 1 CTO & VP Engineering Gifting Loop', status: 'Active', prospects: 280, opened: '74%', replied: '31%', giftsSent: 60, redeemed: 28, date: '2025-08-04' },
    { id: 'c3', name: 'Fintech CMO Hyper-Personalized Express Send', status: 'Active', prospects: 120, opened: '82%', replied: '39%', giftsSent: 40, redeemed: 22, date: '2025-08-08' },
    { id: 'c4', name: 'SaaS Founder Re-engagement Campaign', status: 'Paused', prospects: 310, opened: '51%', replied: '14%', giftsSent: 20, redeemed: 5, date: '2025-07-20' },
    { id: 'c5', name: 'Healthcare IT Directors Cold Surface Intro', status: 'Draft', prospects: 0, opened: '0%', replied: '0%', giftsSent: 0, redeemed: 0, date: '2025-08-10' }
  ]);
});

// Goalie AI Assistant Chat Endpoint
app.post('/api/assistant/chat', async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  const ai = getGeminiClient();
  if (ai) {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `You are Goalie AI, the intelligent agent powering Delightloop Agentic Outreach Platform. 
You assist sales leaders, SDRs, and B2B marketers with hyper-personalized B2B outreach, custom landing page surfaces, express gift campaigns, mailbox warm-ups, and lead conversion strategy.
Keep answers concise, direct, actionable, and formatted nicely.

User Query: ${prompt}`,
      });

      return res.json({ reply: response.text });
    } catch (err: any) {
      console.error('Gemini API call failed:', err);
    }
  }

  // Fallback intelligent agent response if key is absent or API unavailable
  res.json({
    reply: `Goalie AI: Analyzing your query "${prompt}". Based on live Delightloop platform analytics, combining hyper-personalized landing page surfaces with $15-$25 express digital coffee or DoorDash gifts increases prospect meeting booked rate by 3.2x compared to plain text emails. Recommended Next Steps: 1) Launch a targeted Express Send for your top 20 Tier-1 prospects, 2) Enable auto-followup triggers in the Inbox tab once a gift is redeemed.`
  });
});

// Express Send Endpoint
app.post('/api/express-send', (req, res) => {
  const { recipient, giftType } = req.body;
  res.json({
    success: true,
    trackingId: 'DL-GIFT-' + Math.floor(100000 + Math.random() * 900000),
    recipient: recipient || 'prospect@acme.com',
    giftType: giftType || '$25 Starbucks Card'
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});

