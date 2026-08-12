/* Global Command Search (⌘K) Modal Handler */

document.addEventListener('DOMContentLoaded', () => {
  let searchModal = document.getElementById('search-modal');
  
  if (!searchModal) {
    searchModal = document.createElement('div');
    searchModal.id = 'search-modal';
    searchModal.className = 'modal-backdrop hidden';
    searchModal.innerHTML = `
      <div class="search-modal-container">
        <div class="search-input-wrapper">
          <svg class="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input type="text" id="global-search-input" placeholder="Search navigation, contacts, companies, events, and campaigns...">
          <span class="kbd-badge">ESC</span>
        </div>
        <div class="search-results" id="search-results-list"></div>
      </div>
    `;
    document.body.appendChild(searchModal);
  }

  const searchInput = document.getElementById('global-search-input');
  const searchResultsList = document.getElementById('search-results-list');

  if (!searchInput) return;

  // Initialize search options if list is empty
  if (searchResultsList && searchResultsList.children.length === 0) {
    searchResultsList.innerHTML = `
      <div class="search-category mb-3">
        <div class="category-title">NAVIGATION</div>
        <a href="assistant.html" class="search-result-item">
          <span class="result-title">Goalie Assistant AI</span>
          <span class="result-sub">Ask agentic AI queries & manage outreach tasks</span>
        </a>
        <a href="dashboard.html" class="search-result-item">
          <span class="result-title">Dashboard</span>
          <span class="result-sub">Overview of performance metrics & active campaigns</span>
        </a>
        <a href="campaigns.html" class="search-result-item">
          <span class="result-title">Outreach Campaigns</span>
          <span class="result-sub">Manage sales campaigns & sequence workflows</span>
        </a>
        <a href="express-send.html" class="search-result-item">
          <span class="result-title">Express Send</span>
          <span class="result-sub">Send instant personalized digital gifts</span>
        </a>
        <a href="gifting-activity.html" class="search-result-item">
          <span class="result-title">Gifting Activity</span>
          <span class="result-sub">Track voucher redemptions & delivery statuses</span>
        </a>
      </div>
      <div class="search-category">
        <div class="category-title">QUICK ACTIONS</div>
        <a href="surfaces.html" class="search-result-item">
          <span class="result-title">Outreach Surfaces</span>
          <span class="result-sub">Interactive landing page templates for gifting</span>
        </a>
        <a href="mailboxes.html" class="search-result-item">
          <span class="result-title">Mailboxes</span>
          <span class="result-sub">Manage connected email accounts & domain health</span>
        </a>
      </div>
    `;
  }

  // Toggle Command Palette with ⌘K or Ctrl+K
  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      searchModal.classList.toggle('hidden');
      if (!searchModal.classList.contains('hidden')) {
        searchInput.focus();
      }
    }

    if (e.key === 'Escape' && !searchModal.classList.contains('hidden')) {
      searchModal.classList.add('hidden');
    }
  });

  // Close when clicking outside
  searchModal.addEventListener('click', (e) => {
    if (e.target === searchModal) {
      searchModal.classList.add('hidden');
    }
  });

  // Filter Search Items
  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    const items = searchResultsList.querySelectorAll('.search-result-item');

    items.forEach(item => {
      const text = item.textContent.toLowerCase();
      if (text.includes(query)) {
        item.style.display = 'flex';
      } else {
        item.style.display = 'none';
      }
    });
  });
});
