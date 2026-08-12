/* Inbox Page Controller & Filtering Logic */

document.addEventListener('DOMContentLoaded', () => {
  const convRows = document.querySelectorAll('.conv-row');
  const threadDetail = document.getElementById('inbox-thread-detail');
  const searchInput = document.getElementById('inbox-contact-search');
  const refreshBtn = document.getElementById('inbox-refresh-trigger');
  const segButtons = document.querySelectorAll('.seg-btn');

  // Filter State
  const activeFilters = {
    reply: 'all',
    read: 'all',
    channel: 'all',
    time: 'all',
    search: ''
  };

  // Filter application function
  function applyFilters() {
    let visibleCount = 0;

    convRows.forEach(row => {
      const name = (row.getAttribute('data-name') || '').toLowerCase();
      const snippet = row.querySelector('.conv-snippet span')?.textContent.toLowerCase() || '';
      const isUnread = row.getAttribute('data-unread') === 'true';
      const replyStatus = row.getAttribute('data-reply') || 'all';
      const channel = row.getAttribute('data-channel') || 'all';

      // Check reply filter
      let matchReply = true;
      if (activeFilters.reply === 'replied' && replyStatus !== 'replied') matchReply = false;
      if (activeFilters.reply === 'unreplied' && replyStatus !== 'unreplied') matchReply = false;

      // Check read filter
      let matchRead = true;
      if (activeFilters.read === 'unread' && !isUnread) matchRead = false;
      if (activeFilters.read === 'read' && isUnread) matchRead = false;

      // Check channel filter
      let matchChannel = true;
      if (activeFilters.channel !== 'all' && channel !== activeFilters.channel) matchChannel = false;

      // Check search filter
      let matchSearch = true;
      if (activeFilters.search) {
        matchSearch = name.includes(activeFilters.search) || snippet.includes(activeFilters.search);
      }

      if (matchReply && matchRead && matchChannel && matchSearch) {
        row.style.display = 'flex';
        visibleCount++;
      } else {
        row.style.display = 'none';
      }
    });

    const countText = document.getElementById('inbox-count-text');
    if (countText) {
      countText.textContent = `${visibleCount} conversation${visibleCount !== 1 ? 's' : ''}`;
    }
  }

  // Segment Buttons Click Event
  segButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const filterType = btn.getAttribute('data-filter-type');
      const val = btn.getAttribute('data-val');

      if (!filterType) return;

      // Unselect siblings in the same segmented group
      const parentGroup = btn.closest('.segmented-group');
      if (parentGroup) {
        parentGroup.querySelectorAll('.seg-btn').forEach(b => b.classList.remove('active'));
      }
      btn.classList.add('active');

      activeFilters[filterType] = val;
      applyFilters();
    });
  });

  // Search input handler
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      activeFilters.search = e.target.value.trim().toLowerCase();
      applyFilters();
    });
  }

  // Refresh Trigger
  if (refreshBtn) {
    refreshBtn.addEventListener('click', () => {
      const svg = refreshBtn.querySelector('svg');
      if (svg) svg.style.transform = 'rotate(360deg)';
      refreshBtn.style.opacity = '0.7';

      setTimeout(() => {
        if (svg) svg.style.transform = 'none';
        refreshBtn.style.opacity = '1';
        if (typeof showToast === 'function') {
          showToast('Inbox synced successfully!');
        }
      }, 500);
    });
  }

  // Row selection & Thread Detail view rendering
  convRows.forEach(row => {
    row.addEventListener('click', () => {
      convRows.forEach(r => r.classList.remove('active'));
      row.classList.add('active');

      // Clear unread state
      row.classList.remove('unread');
      row.setAttribute('data-unread', 'false');
      const badge = row.querySelector('.unread-pill-badge');
      if (badge) badge.remove();

      const name = row.getAttribute('data-name') || 'Recipient';
      const avatarText = row.querySelector('.conv-avatar-circle')?.textContent || name.substring(0, 2).toUpperCase();
      const snippet = row.querySelector('.conv-snippet span')?.textContent || '';
      const date = row.querySelector('.conv-date')?.textContent || 'Recent';

      if (threadDetail) {
        threadDetail.innerHTML = `
          <div class="thread-view-wrapper">
            <div class="thread-header-bar">
              <div class="thread-contact-info">
                <div class="thread-avatar">${avatarText}</div>
                <div class="thread-names">
                  <h2>${name}</h2>
                  <p>Last active: ${date} &bull; Channel: Email</p>
                </div>
              </div>
              <div class="thread-actions">
                <button class="thread-actions-btn" id="thread-gift-btn">🎁 Express Gift</button>
                <button class="thread-actions-btn" id="thread-archive-btn">Archive</button>
              </div>
            </div>

            <div class="thread-messages-list">
              <div class="message-card received">
                <div class="msg-meta">
                  <strong>${name}</strong>
                  <span>${date} at 10:14 AM</span>
                </div>
                <div class="msg-text">${snippet}</div>
              </div>

              <div class="message-card sent">
                <div class="msg-meta">
                  <strong>Prakhar Singh (You)</strong>
                  <span>${date} at 10:20 AM</span>
                </div>
                <div class="msg-text">Thanks for reaching out! We have configured your custom outreach parameters. Let me know if you need additional details.</div>
              </div>
            </div>

            <div class="thread-composer">
              <textarea class="composer-input-box" rows="3" placeholder="Type your reply or ask Goalie AI..."></textarea>
              <div class="composer-toolbar-bottom">
                <span class="ai-suggestion-badge" id="apply-ai-reply">✨ AI Suggest: "I'd be glad to arrange a 15-min demo call this week!"</span>
                <button class="send-msg-btn" id="send-thread-reply">
                  <span>Send</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                </button>
              </div>
            </div>
          </div>
        `;

        // Event listeners for thread actions
        const aiBadge = document.getElementById('apply-ai-reply');
        const sendBtn = document.getElementById('send-thread-reply');
        const textarea = threadDetail.querySelector('textarea');

        if (aiBadge && textarea) {
          aiBadge.addEventListener('click', () => {
            textarea.value = "Hi! I'd be glad to arrange a 15-min demo call with our leadership team this week. Let me know what time works best for you.";
          });
        }

        if (sendBtn) {
          sendBtn.addEventListener('click', () => {
            if (textarea && textarea.value.trim()) {
              const msgList = threadDetail.querySelector('.thread-messages-list');
              if (msgList) {
                const newCard = document.createElement('div');
                newCard.className = 'message-card sent';
                newCard.innerHTML = `
                  <div class="msg-meta">
                    <strong>Prakhar Singh (You)</strong>
                    <span>Just now</span>
                  </div>
                  <div class="msg-text">${textarea.value.trim()}</div>
                `;
                msgList.appendChild(newCard);
                msgList.scrollTop = msgList.scrollHeight;
                textarea.value = '';
                if (typeof showToast === 'function') {
                  showToast('Reply sent successfully!');
                }
              }
            }
          });
        }

        document.getElementById('thread-gift-btn')?.addEventListener('click', () => {
          window.location.href = `express-send.html?recipient=${encodeURIComponent(name)}`;
        });

        document.getElementById('thread-archive-btn')?.addEventListener('click', () => {
          row.style.display = 'none';
          if (typeof showToast === 'function') showToast('Conversation archived');
          threadDetail.innerHTML = `
            <div class="inbox-empty-state">
              <div class="empty-icon-wrap">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/>
                  <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/>
                </svg>
              </div>
              <p class="empty-state-text">Select a conversation</p>
            </div>
          `;
        });
      }
    });
  });
});
