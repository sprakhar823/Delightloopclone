/**
 * Delightloop Platform - Central REST API Client & State Management Service
 * Connects frontend UI components to Spring Boot REST Endpoints via standard Fetch API.
 * 
 * Supports full lifecycle UI states: Loading, Success, Error, and Empty states.
 */

const API = {
  // Base configuration
  baseUrl: '',

  /**
   * Generic fetch wrapper with robust error handling and HTTP status checking.
   * @param {string} endpoint - API path (e.g. '/api/dashboard/stats')
   * @param {object} options - Fetch options (method, headers, body)
   * @returns {Promise<any>} Parsed JSON response
   */
  async request(endpoint, options = {}) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...options.headers
      },
      ...options
    };

    try {
      const response = await fetch(endpoint, config);

      if (!response.ok) {
        let errorMessage = `HTTP Error ${response.status}: ${response.statusText}`;
        try {
          const errorBody = await response.json();
          if (errorBody && errorBody.message) {
            errorMessage = errorBody.message;
          }
        } catch (e) {
          // Fallback to response status text if JSON parsing fails
        }
        throw new Error(errorMessage);
      }

      // Handle HTTP 204 No Content
      if (response.status === 204) {
        return { success: true };
      }

      return await response.json();
    } catch (error) {
      console.error(`[API Call Failed: ${options.method || 'GET'} ${endpoint}]`, error);
      throw error;
    }
  },

  // ==========================================
  // 1. DASHBOARD API
  // ==========================================
  /**
   * Fetch executive dashboard KPIs, response rates, and recent campaign metrics.
   * GET /api/dashboard/stats
   */
  async getDashboardStats() {
    return await this.request('/api/dashboard/stats');
  },

  // ==========================================
  // 2. CAMPAIGNS API
  // ==========================================
  /**
   * Fetch all outreach campaigns.
   * GET /api/campaigns
   */
  async getCampaigns() {
    return await this.request('/api/campaigns');
  },

  /**
   * Create a new sales outreach campaign.
   * POST /api/campaigns
   * @param {object} campaignData - { name, status, prospects }
   */
  async createCampaign(campaignData) {
    return await this.request('/api/campaigns', {
      method: 'POST',
      body: JSON.stringify(campaignData)
    });
  },

  // ==========================================
  // 3. CAMPAIGN DETAILS API
  // ==========================================
  /**
   * Fetch specific campaign details by ID.
   * GET /api/campaigns/{id}
   * @param {number|string} id - Campaign ID
   */
  async getCampaignById(id) {
    return await this.request(`/api/campaigns/${id}`);
  },

  /**
   * Update an existing campaign.
   * PUT /api/campaigns/{id}
   * @param {number|string} id - Campaign ID
   * @param {object} campaignData - Updated fields
   */
  async updateCampaign(id, campaignData) {
    return await this.request(`/api/campaigns/${id}`, {
      method: 'PUT',
      body: JSON.stringify(campaignData)
    });
  },

  /**
   * Delete a campaign by ID.
   * DELETE /api/campaigns/{id}
   * @param {number|string} id - Campaign ID
   */
  async deleteCampaign(id) {
    return await this.request(`/api/campaigns/${id}`, {
      method: 'DELETE'
    });
  },

  // ==========================================
  // 4. CONTACTS API
  // ==========================================
  /**
   * Fetch all target prospect contacts.
   * GET /api/contacts
   */
  async getContacts() {
    return await this.request('/api/contacts');
  },

  /**
   * Fetch a single contact by ID.
   * GET /api/contacts/{id}
   * @param {number|string} id - Contact ID
   */
  async getContactById(id) {
    return await this.request(`/api/contacts/${id}`);
  },

  /**
   * Create a new prospect contact.
   * POST /api/contacts
   * @param {object} contactData - { name, email, phone, title, intentScore, status }
   */
  async createContact(contactData) {
    return await this.request('/api/contacts', {
      method: 'POST',
      body: JSON.stringify(contactData)
    });
  },

  /**
   * Update contact details or Goalie intent score.
   * PUT /api/contacts/{id}
   * @param {number|string} id - Contact ID
   * @param {object} contactData - Fields to update
   */
  async updateContact(id, contactData) {
    return await this.request(`/api/contacts/${id}`, {
      method: 'PUT',
      body: JSON.stringify(contactData)
    });
  },

  /**
   * Delete a contact.
   * DELETE /api/contacts/{id}
   * @param {number|string} id - Contact ID
   */
  async deleteContact(id) {
    return await this.request(`/api/contacts/${id}`, {
      method: 'DELETE'
    });
  },

  // ==========================================
  // 5. INBOX API
  // ==========================================
  /**
   * Fetch all conversations and message threads.
   * GET /api/inbox/conversations
   */
  async getConversations() {
    return await this.request('/api/inbox/conversations');
  },

  /**
   * Send a message to a conversation thread.
   * POST /api/inbox/conversations/{id}/messages
   * @param {number|string} conversationId - Conversation ID
   * @param {object} messageData - { senderType, body }
   */
  async sendMessage(conversationId, messageData) {
    return await this.request(`/api/inbox/conversations/${conversationId}/messages`, {
      method: 'POST',
      body: JSON.stringify(messageData)
    });
  },

  // ==========================================
  // 6. SURFACES API
  // ==========================================
  /**
   * Fetch all digital landing page surfaces.
   * GET /api/surfaces
   */
  async getSurfaces() {
    return await this.request('/api/surfaces');
  },

  /**
   * Fetch surface by ID.
   * GET /api/surfaces/{id}
   * @param {number|string} id - Surface ID
   */
  async getSurfaceById(id) {
    return await this.request(`/api/surfaces/${id}`);
  },

  /**
   * Create a new hyper-personalized digital surface.
   * POST /api/surfaces
   * @param {object} surfaceData - { campaignId, title, slug, theme, heroHeadline, ctaText }
   */
  async createSurface(surfaceData) {
    return await this.request('/api/surfaces', {
      method: 'POST',
      body: JSON.stringify(surfaceData)
    });
  },

  /**
   * Delete a surface.
   * DELETE /api/surfaces/{id}
   * @param {number|string} id - Surface ID
   */
  async deleteSurface(id) {
    return await this.request(`/api/surfaces/${id}`, {
      method: 'DELETE'
    });
  },

  // ==========================================
  // 7. MAILBOXES API
  // ==========================================
  /**
   * Fetch connected outreach email mailboxes.
   * GET /api/mailboxes
   */
  async getMailboxes() {
    return await this.request('/api/mailboxes');
  },

  /**
   * Add a new outreach mailbox.
   * POST /api/mailboxes
   * @param {object} mailboxData - { emailAddress, provider, dailySendLimit }
   */
  async addMailbox(mailboxData) {
    return await this.request('/api/mailboxes', {
      method: 'POST',
      body: JSON.stringify(mailboxData)
    });
  },

  // ==========================================
  // 8. GIFTING ACTIVITY API
  // ==========================================
  /**
   * Fetch digital e-gift card activities and claims.
   * GET /api/gifts/activity
   */
  async getGiftActivity() {
    return await this.request('/api/gifts/activity');
  },

  // ==========================================
  // 9. TEMPLATES API
  // ==========================================
  /**
   * Fetch messaging templates.
   * GET /api/templates
   */
  async getTemplates() {
    return await this.request('/api/templates');
  },

  /**
   * Create a new outreach email template.
   * POST /api/templates
   * @param {object} templateData - { title, category, subjectLine, bodyContent }
   */
  async createTemplate(templateData) {
    return await this.request('/api/templates', {
      method: 'POST',
      body: JSON.stringify(templateData)
    });
  },

  // ==========================================
  // 10. GLOBAL SEARCH API
  // ==========================================
  /**
   * Perform global search across campaigns, contacts, and surfaces.
   * GET /api/search?q={query}
   * @param {string} query - Search term
   */
  async searchGlobal(query) {
    return await this.request(`/api/search?q=${encodeURIComponent(query)}`);
  },

  // ==========================================
  // GOALIE AI AGENTIC API
  // ==========================================
  /**
   * Send query to Goalie Agentic Assistant.
   * POST /api/assistant/query
   * @param {string} message - User query message
   */
  async queryAssistantAgent(message) {
    return await this.request('/api/assistant/query', {
      method: 'POST',
      body: JSON.stringify({ message })
    });
  },

  /**
   * Confirm human-in-the-loop pending action.
   * POST /api/assistant/actions/{id}/confirm
   * @param {string} actionId - Action ID
   */
  async confirmAssistantAction(actionId) {
    return await this.request(`/api/assistant/actions/${encodeURIComponent(actionId)}/confirm`, {
      method: 'POST'
    });
  },

  /**
   * Cancel human-in-the-loop pending action.
   * POST /api/assistant/actions/{id}/cancel
   * @param {string} actionId - Action ID
   */
  async cancelAssistantAction(actionId) {
    return await this.request(`/api/assistant/actions/${encodeURIComponent(actionId)}/cancel`, {
      method: 'POST'
    });
  },

  /**
   * Send chat prompt to Goalie AI Assistant.
   * POST /api/assistant/chat
   * @param {string} prompt - User message
   */
  async askGoalieAssistant(prompt) {
    return await this.request('/api/assistant/chat', {
      method: 'POST',
      body: JSON.stringify({ prompt })
    });
  },

  /**
   * Dispatch an 1-click Express Send gifting loop.
   * POST /api/assistant/express-send
   * @param {object} expressData - { prospectName, company, email, giftType, giftValue }
   */
  async sendExpressGift(expressData) {
    return await this.request('/api/assistant/express-send', {
      method: 'POST',
      body: JSON.stringify(expressData)
    });
  },

  // ==========================================
  // MCP CONNECTORS API
  // ==========================================
  /**
   * Fetch active Model Context Protocol (MCP) integrations.
   * GET /api/mcp/connectors
   */
  async getMcpConnectors() {
    return await this.request('/api/mcp/connectors');
  },

  /**
   * Sync an MCP connector by ID.
   * POST /api/mcp/connectors/{id}/sync
   * @param {number|string} id - Connector ID
   */
  async syncMcpConnector(id) {
    return await this.request(`/api/mcp/connectors/${id}/sync`, {
      method: 'POST'
    });
  },

  // ==========================================
  // UI STATE HELPERS
  // ==========================================
  ui: {
    /**
     * Render a loading spinner inside a target container.
     * @param {HTMLElement|string} container - Container element or selector
     * @param {string} message - Optional loading message
     */
    renderLoading(container, message = 'Loading data...') {
      const el = typeof container === 'string' ? document.querySelector(container) : container;
      if (!el) return;
      el.innerHTML = `
        <div class="flex flex-col items-center justify-center p-8 text-slate-400 space-y-3">
          <div class="w-8 h-8 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin"></div>
          <p class="text-sm font-medium">${message}</p>
        </div>
      `;
    },

    /**
     * Render an error alert state inside a target container.
     * @param {HTMLElement|string} container - Container element or selector
     * @param {string} errorText - Error message
     * @param {Function} retryFn - Optional retry callback function
     */
    renderError(container, errorText = 'Failed to load data from server.', retryFn = null) {
      const el = typeof container === 'string' ? document.querySelector(container) : container;
      if (!el) return;
      const retryBtnId = 'retry-btn-' + Math.floor(Math.random() * 10000);
      el.innerHTML = `
        <div class="p-6 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-center space-y-3">
          <div class="inline-flex p-3 rounded-full bg-rose-500/20 text-rose-400">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
          <p class="text-sm font-semibold">${errorText}</p>
          ${retryFn ? `<button id="${retryBtnId}" class="px-4 py-2 text-xs font-semibold rounded-lg bg-rose-600 hover:bg-rose-500 text-white transition-colors">Retry Connection</button>` : ''}
        </div>
      `;
      if (retryFn) {
        setTimeout(() => {
          const btn = document.getElementById(retryBtnId);
          if (btn) btn.addEventListener('click', retryFn);
        }, 0);
      }
    },

    /**
     * Render an empty state card when no records are found.
     * @param {HTMLElement|string} container - Container element or selector
     * @param {string} title - Empty state title
     * @param {string} description - Empty state description
     * @param {string} actionText - Optional CTA button label
     * @param {Function} actionFn - Optional CTA callback
     */
    renderEmpty(container, title = 'No records found', description = 'There are no items to display at this time.', actionText = null, actionFn = null) {
      const el = typeof container === 'string' ? document.querySelector(container) : container;
      if (!el) return;
      const actionBtnId = 'empty-action-' + Math.floor(Math.random() * 10000);
      el.innerHTML = `
        <div class="p-10 text-center rounded-xl bg-slate-900/50 border border-slate-800 space-y-3">
          <div class="inline-flex p-3 rounded-full bg-slate-800 text-slate-400">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"/>
            </svg>
          </div>
          <h4 class="text-base font-semibold text-slate-200">${title}</h4>
          <p class="text-sm text-slate-400 max-w-sm mx-auto">${description}</p>
          ${actionText && actionFn ? `<button id="${actionBtnId}" class="mt-2 px-4 py-2 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white transition-colors">${actionText}</button>` : ''}
        </div>
      `;
      if (actionText && actionFn) {
        setTimeout(() => {
          const btn = document.getElementById(actionBtnId);
          if (btn) btn.addEventListener('click', actionFn);
        }, 0);
      }
    },

    /**
     * Render a temporary success toast notification.
     * @param {string} message - Success message text
     */
    showToast(message) {
      let toast = document.getElementById('global-toast');
      if (!toast) {
        toast = document.createElement('div');
        toast.id = 'global-toast';
        toast.className = 'fixed bottom-5 right-5 z-50 px-5 py-3 rounded-xl bg-emerald-600 text-white text-sm font-semibold shadow-2xl flex items-center space-x-2 transition-all transform translate-y-10 opacity-0';
        document.body.appendChild(toast);
      }
      toast.innerHTML = `
        <svg class="w-5 h-5 text-emerald-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
        </svg>
        <span>${message}</span>
      `;
      requestAnimationFrame(() => {
        toast.classList.remove('translate-y-10', 'opacity-0');
      });
      setTimeout(() => {
        toast.classList.add('translate-y-10', 'opacity-0');
      }, 3500);
    }
  }
};

// Expose API service globally
window.API = API;
