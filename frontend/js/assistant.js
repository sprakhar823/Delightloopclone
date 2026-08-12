/* Goalie AI Assistant - Agentic AI Flow & Human-in-the-Loop Interaction */

document.addEventListener('DOMContentLoaded', () => {
  const chatStream = document.getElementById('assistant-chat-stream');
  const chatInput = document.getElementById('assistant-input');
  const form = document.getElementById('assistant-form');
  const welcomeState = document.getElementById('assistant-welcome');
  const suggestionCards = document.querySelectorAll('.suggestion-card');

  if (!chatInput || !form || !chatStream) return;

  // Handle Form Submit
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = chatInput.value.trim();
    if (text) {
      handleUserQuery(text);
      chatInput.value = '';
    }
  });

  // Handle Enter Keypress
  chatInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      form.dispatchEvent(new Event('submit'));
    }
  });

  // Handle Suggestion Cards
  suggestionCards.forEach(card => {
    card.addEventListener('click', () => {
      const prompt = card.getAttribute('data-prompt');
      if (prompt) {
        handleUserQuery(prompt);
      }
    });
  });

  async function handleUserQuery(messageText) {
    // Hide Welcome Screen on first query
    if (welcomeState) {
      welcomeState.style.display = 'none';
    }

    // 1. Render User Message
    appendUserMessage(messageText);

    // 2. Render Agent Thinking Indicator
    const typingId = appendThinkingIndicator();

    try {
      // 3. Call Agentic Backend API
      const res = await window.API.queryAssistantAgent(messageText);
      removeThinkingIndicator(typingId);

      // 4. Handle Response
      if (res.requiresConfirmation) {
        appendConfirmationCard(res);
      } else {
        appendReadOnlyResponse(res);
      }
    } catch (err) {
      removeThinkingIndicator(typingId);
      appendErrorMessage('Goalie Assistant encountered an issue connecting to the agent engine. Please try again.');
    }
  }

  function appendUserMessage(text) {
    const div = document.createElement('div');
    div.className = 'chat-bubble-wrapper user-wrapper mb-4 flex justify-end';
    div.innerHTML = `
      <div class="user-bubble bg-indigo-600 text-white px-4 py-3 rounded-2xl rounded-tr-none max-w-lg shadow-md text-sm">
        ${escapeHTML(text)}
      </div>
    `;
    chatStream.appendChild(div);
    scrollToBottom();
  }

  function appendThinkingIndicator() {
    const id = 'typing-' + Date.now();
    const div = document.createElement('div');
    div.id = id;
    div.className = 'chat-bubble-wrapper ai-wrapper mb-4 flex items-start space-x-3';
    div.innerHTML = `
      <div class="ai-avatar w-8 h-8 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white text-xs font-bold shadow-lg">G</div>
      <div class="ai-bubble bg-slate-900 border border-slate-800 text-slate-300 px-4 py-3 rounded-2xl rounded-tl-none max-w-lg shadow-md text-sm flex items-center space-x-2">
        <div class="w-2 h-2 rounded-full bg-indigo-400 animate-ping"></div>
        <span>Goalie Assistant is analyzing intent...</span>
      </div>
    `;
    chatStream.appendChild(div);
    scrollToBottom();
    return id;
  }

  function removeThinkingIndicator(id) {
    const el = document.getElementById(id);
    if (el) el.remove();
  }

  // Render Human-in-the-loop Action Card with [Cancel] and [Confirm]
  function appendConfirmationCard(res) {
    const cardId = 'action-card-' + res.actionId;
    const div = document.createElement('div');
    div.id = cardId;
    div.className = 'chat-bubble-wrapper ai-wrapper mb-6 flex items-start space-x-3';
    div.innerHTML = `
      <div class="ai-avatar w-8 h-8 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white text-xs font-bold shadow-lg shrink-0">G</div>
      <div class="ai-bubble bg-slate-900/90 border border-purple-500/30 text-slate-200 p-5 rounded-2xl rounded-tl-none max-w-xl shadow-xl space-y-4">
        <div class="flex items-center justify-between border-b border-slate-800 pb-3">
          <div class="flex items-center space-x-2">
            <span class="inline-flex p-1.5 rounded-md bg-purple-500/20 text-purple-400">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
            </span>
            <span class="text-xs font-bold tracking-wider uppercase text-purple-300">Requires Confirmation</span>
          </div>
          <span class="text-xs text-slate-500 font-mono">${res.actionId}</span>
        </div>

        <p class="text-sm leading-relaxed text-slate-200">${escapeHTML(res.message)}</p>

        <div class="action-buttons-wrapper flex items-center space-x-3 pt-2" id="controls-${res.actionId}">
          <button class="px-4 py-2 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors border border-slate-700 btn-cancel-act" data-action-id="${res.actionId}">
            Cancel
          </button>
          <button class="px-4 py-2 text-xs font-semibold rounded-lg bg-purple-600 hover:bg-purple-500 text-white transition-colors shadow-lg shadow-purple-600/30 btn-confirm-act" data-action-id="${res.actionId}">
            Confirm
          </button>
        </div>
      </div>
    `;
    chatStream.appendChild(div);
    scrollToBottom();

    // Attach Event Listeners to Confirm/Cancel Buttons
    setTimeout(() => {
      const container = document.getElementById(cardId);
      if (!container) return;

      const confirmBtn = container.querySelector('.btn-confirm-act');
      const cancelBtn = container.querySelector('.btn-cancel-act');
      const controlsWrapper = document.getElementById('controls-' + res.actionId);

      if (confirmBtn) {
        confirmBtn.addEventListener('click', async () => {
          controlsWrapper.innerHTML = `<span class="text-xs text-indigo-400 font-medium">Executing action...</span>`;
          try {
            const confirmRes = await window.API.confirmAssistantAction(res.actionId);
            controlsWrapper.innerHTML = `
              <div class="inline-flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 text-xs font-semibold border border-emerald-500/30">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                <span>Confirmed & Executed</span>
              </div>
              <p class="text-xs text-slate-400 mt-1">${escapeHTML(confirmRes.message)}</p>
            `;
            window.API.ui.showToast('Action confirmed and executed successfully!');
          } catch (e) {
            controlsWrapper.innerHTML = `<span class="text-xs text-rose-400 font-medium">Failed to execute action.</span>`;
          }
        });
      }

      if (cancelBtn) {
        cancelBtn.addEventListener('click', async () => {
          controlsWrapper.innerHTML = `<span class="text-xs text-slate-400 font-medium">Cancelling action...</span>`;
          try {
            const cancelRes = await window.API.cancelAssistantAction(res.actionId);
            controlsWrapper.innerHTML = `
              <div class="inline-flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-slate-800 text-slate-400 text-xs font-semibold border border-slate-700">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
                <span>Action Cancelled</span>
              </div>
            `;
          } catch (e) {
            controlsWrapper.innerHTML = `<span class="text-xs text-rose-400 font-medium">Failed to cancel action.</span>`;
          }
        });
      }
    }, 0);
  }

  // Helper to format item display name
  function getItemDisplayName(item) {
    if (!item) return 'Record';
    if (item.name) return item.name;
    if (item.recipient) return item.recipient;
    if (item.firstName) return item.firstName + (item.lastName ? ' ' + item.lastName : '');
    if (item.title) return item.title;
    return 'Record';
  }

  // Helper to format item secondary info
  function getItemSubText(item) {
    if (!item) return '';
    if (item.company && item.title) return `${item.title} • ${item.company}`;
    if (item.company) return item.company;
    if (item.status) return item.status;
    if (item.gift) return item.gift;
    if (item.email) return item.email;
    if (item.replied) return `Replied: ${item.replied}`;
    return '';
  }

  // Render Read-Only Agent Response
  function appendReadOnlyResponse(res) {
    const div = document.createElement('div');
    div.className = 'chat-bubble-wrapper ai-wrapper mb-6 flex items-start space-x-3';

    let dataContentHtml = '';
    if (res.data && Array.isArray(res.data) && res.data.length > 0) {
      dataContentHtml = `
        <div class="mt-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800 max-h-48 overflow-y-auto text-xs space-y-2">
          ${res.data.slice(0, 4).map(item => `
            <div class="p-2 rounded bg-slate-900 border border-slate-800 flex items-center justify-between text-slate-300">
              <span class="font-medium">${escapeHTML(getItemDisplayName(item))}</span>
              <span class="text-slate-400 text-[11px] font-medium">${escapeHTML(getItemSubText(item))}</span>
            </div>
          `).join('')}
        </div>
      `;
    }

    div.innerHTML = `
      <div class="ai-avatar w-8 h-8 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white text-xs font-bold shadow-lg shrink-0">G</div>
      <div class="ai-bubble bg-slate-900 border border-slate-800 text-slate-200 p-4 rounded-2xl rounded-tl-none max-w-xl shadow-md text-sm space-y-2">
        <div class="flex items-center space-x-2 text-xs text-purple-400 font-semibold mb-1">
          <span>Goalie AI</span>
          <span class="text-slate-600">•</span>
          <span class="text-slate-400 font-mono">${escapeHTML(res.intent || 'RESPONSE')}</span>
        </div>
        <p class="text-slate-200 leading-relaxed">${escapeHTML(res.message)}</p>
        ${dataContentHtml}
      </div>
    `;
    chatStream.appendChild(div);
    scrollToBottom();
  }

  function appendErrorMessage(errorText) {
    const div = document.createElement('div');
    div.className = 'chat-bubble-wrapper ai-wrapper mb-4 flex items-start space-x-3';
    div.innerHTML = `
      <div class="ai-avatar w-8 h-8 rounded-full bg-rose-600 flex items-center justify-center text-white text-xs font-bold shadow-lg shrink-0">!</div>
      <div class="ai-bubble bg-rose-500/10 border border-rose-500/20 text-rose-300 p-4 rounded-2xl rounded-tl-none max-w-lg text-sm">
        ${escapeHTML(errorText)}
      </div>
    `;
    chatStream.appendChild(div);
    scrollToBottom();
  }

  function scrollToBottom() {
    chatStream.scrollTop = chatStream.scrollHeight;
  }

  function escapeHTML(str) {
    if (!str) return '';
    return String(str).replace(/[&<>'"]/g, 
      tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
  }
});
