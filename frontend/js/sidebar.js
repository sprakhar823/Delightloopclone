/* Sidebar, Theme Toggle & Organization Switcher Logic */

document.addEventListener('DOMContentLoaded', () => {
  // 0. Initialize Sidebar Collapse State
  const sidebar = document.querySelector('.sidebar');
  const isSidebarCollapsed = localStorage.getItem('delightloop_sidebar_collapsed') === 'true';
  if (isSidebarCollapsed && sidebar) {
    sidebar.classList.add('collapsed');
    document.body.classList.add('sidebar-collapsed');
  }

  // Inject collapse toggle button into sidebar-header
  const sidebarHeader = document.querySelector('.sidebar-header');
  if (sidebarHeader && !sidebarHeader.querySelector('#sidebar-collapse-btn')) {
    const collapseBtn = document.createElement('button');
    collapseBtn.id = 'sidebar-collapse-btn';
    collapseBtn.className = 'sidebar-collapse-toggle';
    collapseBtn.title = isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar';
    collapseBtn.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
        <line x1="9" y1="3" x2="9" y2="21"/>
      </svg>
    `;
    sidebarHeader.appendChild(collapseBtn);

    collapseBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const currentSidebar = document.querySelector('.sidebar');
      if (currentSidebar) {
        currentSidebar.classList.toggle('collapsed');
        document.body.classList.toggle('sidebar-collapsed');
        const nowCollapsed = currentSidebar.classList.contains('collapsed');
        localStorage.setItem('delightloop_sidebar_collapsed', nowCollapsed ? 'true' : 'false');
        collapseBtn.title = nowCollapsed ? 'Expand sidebar' : 'Collapse sidebar';
        if (window.showToast) {
          window.showToast(nowCollapsed ? 'Sidebar collapsed' : 'Sidebar expanded');
        }
      }
    });
  }

  // Ensure nav items have tooltips for collapsed mode
  const navLinks = document.querySelectorAll('.nav-item');
  navLinks.forEach(link => {
    if (!link.getAttribute('title')) {
      const label = link.querySelector('span')?.textContent?.trim();
      if (label) link.setAttribute('title', label);
    }
  });

  // 1. Initialize Saved Theme (Default to dark-theme)
  const savedTheme = localStorage.getItem('delightloop_theme') || 'dark-theme';
  document.body.classList.remove('dark-theme', 'light-theme');
  document.body.classList.add(savedTheme);

  // Dynamically inject theme toggle row if missing in sidebar-footer
  const sidebarFooter = document.querySelector('.sidebar-footer');
  if (sidebarFooter && !sidebarFooter.querySelector('.theme-toggle-row')) {
    const themeRow = document.createElement('div');
    themeRow.className = 'theme-toggle-row';
    themeRow.innerHTML = `
      <button class="theme-toggle-btn ${savedTheme === 'dark-theme' ? 'active' : ''}" data-theme="dark-theme" title="Dark Theme">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
      </button>
      <button class="theme-toggle-btn ${savedTheme === 'light-theme' ? 'active' : ''}" data-theme="light-theme" title="Light Theme">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
      </button>
    `;
    sidebarFooter.insertBefore(themeRow, sidebarFooter.firstChild);
  }

  // Update theme toggle UI buttons if present
  const themeToggles = document.querySelectorAll('.theme-toggle-btn');
  themeToggles.forEach(btn => {
    const theme = btn.getAttribute('data-theme');
    if (theme === savedTheme) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const newTheme = btn.getAttribute('data-theme') || 'dark-theme';
      document.body.classList.remove('dark-theme', 'light-theme');
      document.body.classList.add(newTheme);
      localStorage.setItem('delightloop_theme', newTheme);

      themeToggles.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      if (window.showToast) {
        window.showToast(`Switched to ${newTheme === 'dark-theme' ? 'Dark' : 'Light'} theme`);
      }
    });
  });

  // 2. Active Link & Collapsible Accordion Highlighting
  const currentPath = window.location.pathname.split('/').pop() || 'dashboard.html';
  
  // Single nav links
  const navItems = document.querySelectorAll('.sidebar-nav .nav-item:not(.nav-item-parent)');
  navItems.forEach(item => {
    const href = item.getAttribute('href');
    if (href === currentPath || (currentPath === 'index.html' && href === 'dashboard.html')) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });

  // Collapsible nav items handlers
  const parentItems = document.querySelectorAll('.nav-item-parent');
  parentItems.forEach(parent => {
    parent.addEventListener('click', (e) => {
      e.preventDefault();
      const group = parent.closest('.nav-collapsible-group');
      if (group) {
        // Toggle open state on click
        const isOpen = group.classList.contains('open');
        document.querySelectorAll('.nav-collapsible-group').forEach(g => {
          if (g !== group) g.classList.remove('open');
        });
        if (!isOpen) {
          group.classList.add('open');
        } else {
          group.classList.remove('open');
        }
      }
    });
  });

  // Submenu link active checks
  const subItems = document.querySelectorAll('.nav-subitem');
  subItems.forEach(sub => {
    const href = sub.getAttribute('href');
    if (href === currentPath) {
      sub.classList.add('active');
      const group = sub.closest('.nav-collapsible-group');
      if (group) {
        group.classList.add('open');
        const parent = group.querySelector('.nav-item-parent');
        if (parent) parent.classList.add('active');
      }
    }
  });

  // 3. Search Command Palette Trigger (⌘K)
  const openSearchBtns = document.querySelectorAll('#open-search-modal, .search-btn');
  openSearchBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const searchModal = document.getElementById('search-modal');
      if (searchModal) {
        searchModal.classList.remove('hidden');
        const input = document.getElementById('global-search-input');
        if (input) input.focus();
      }
    });
  });

  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      const searchModal = document.getElementById('search-modal');
      if (searchModal) {
        if (searchModal.classList.contains('hidden')) {
          searchModal.classList.remove('hidden');
          const input = document.getElementById('global-search-input');
          if (input) input.focus();
        } else {
          searchModal.classList.add('hidden');
        }
      }
    }
  });

  // 4. Organization Switcher Dropdown Modal
  const userProfileCard = document.querySelector('.user-profile');
  if (userProfileCard) {
    userProfileCard.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleOrgSwitcherModal();
    });
  }

  // Close org switcher modal when clicking outside
  document.addEventListener('click', (e) => {
    const orgModal = document.getElementById('org-switcher-dropdown');
    if (orgModal && !orgModal.contains(e.target) && !userProfileCard?.contains(e.target)) {
      orgModal.classList.add('hidden');
    }
  });
});

// Toggle Organization Switcher Dropdown Modal Function
function toggleOrgSwitcherModal() {
  let orgModal = document.getElementById('org-switcher-dropdown');
  if (!orgModal) {
    orgModal = document.createElement('div');
    orgModal.id = 'org-switcher-dropdown';
    orgModal.className = 'org-switcher-dropdown shadow-lg hidden';
    orgModal.innerHTML = `
      <div class="org-dropdown-header">
        <a href="settings.html" class="org-profile-link">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          <span>View profile</span>
          <kbd class="kbd-badge">⌘K-P</kbd>
        </a>
      </div>
      <div class="org-dropdown-section">
        <div class="org-dropdown-label">Switch organization</div>
        <div class="org-list">
          <div class="org-item active" data-org="Delightloop" data-domain="delightloop.com">
            <div class="org-avatar org-avatar-purple">D</div>
            <div class="org-info">
              <div class="org-name">Delightloop</div>
              <div class="org-domain">delightloop.com</div>
            </div>
            <div class="org-radio"></div>
          </div>
          <div class="org-item" data-org="Doremon" data-domain="doremon.com">
            <div class="org-avatar org-avatar-teal">D</div>
            <div class="org-info">
              <div class="org-name">Doremon</div>
              <div class="org-domain">doremon.com</div>
            </div>
            <div class="org-radio"></div>
          </div>
          <div class="org-item" data-org="Water" data-domain="water.com">
            <div class="org-avatar org-avatar-blue">W</div>
            <div class="org-info">
              <div class="org-name">Water</div>
              <div class="org-domain">water.com</div>
            </div>
            <div class="org-radio"></div>
          </div>
          <div class="org-item" data-org="Rajendra" data-domain="rajendra.com">
            <div class="org-avatar org-avatar-green">R</div>
            <div class="org-info">
              <div class="org-name">Rajendra</div>
              <div class="org-domain">rajendra.com</div>
            </div>
            <div class="org-radio"></div>
          </div>
          <div class="org-item" data-org="Ruutukf" data-domain="ruutukf.com">
            <div class="org-avatar org-avatar-dark">R</div>
            <div class="org-info">
              <div class="org-name">Ruutukf</div>
              <div class="org-domain">ruutukf.com</div>
            </div>
            <div class="org-radio"></div>
          </div>
          <div class="org-item" data-org="RevCodex" data-domain="revcodex.com">
            <div class="org-avatar org-avatar-indigo">R</div>
            <div class="org-info">
              <div class="org-name">RevCodex</div>
              <div class="org-domain">revcodex.com</div>
            </div>
            <div class="org-radio"></div>
          </div>
          <div class="org-item" data-org="DelightTesting" data-domain="delighttesting.com">
            <div class="org-avatar org-avatar-red">D</div>
            <div class="org-info">
              <div class="org-name">DelightTesting</div>
              <div class="org-domain">delighttesting.com</div>
            </div>
            <div class="org-radio"></div>
          </div>
          <div class="org-item" data-org="krishna dev" data-domain="krishna.com">
            <div class="org-avatar org-avatar-green">K</div>
            <div class="org-info">
              <div class="org-name">krishna dev</div>
              <div class="org-domain">krishna.com</div>
            </div>
            <div class="org-radio"></div>
          </div>
          <div class="org-item" data-org="krishtest" data-domain="techcorp.com">
            <div class="org-avatar org-avatar-orange">K</div>
            <div class="org-info">
              <div class="org-name">krishtest</div>
              <div class="org-domain">techcorp.com</div>
            </div>
            <div class="org-radio"></div>
          </div>
          <div class="org-item" data-org="ldelightloop" data-domain="ldelightloop.com">
            <div class="org-avatar org-avatar-teal">L</div>
            <div class="org-info">
              <div class="org-name">ldelightloop</div>
              <div class="org-domain">ldelightloop.com</div>
            </div>
            <div class="org-radio"></div>
          </div>
          <div class="org-item" data-org="Neysa" data-domain="neysa.ai">
            <div class="org-avatar org-avatar-purple">N</div>
            <div class="org-info">
              <div class="org-name">Neysa</div>
              <div class="org-domain">neysa.ai</div>
            </div>
            <div class="org-radio"></div>
          </div>
        </div>
      </div>
      <div class="org-dropdown-footer">
        <button class="org-action-btn" id="add-org-btn">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          <span>Add organization</span>
        </button>
        <button class="org-action-btn" id="sign-out-btn">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
          <span>Sign out</span>
          <kbd class="kbd-badge">⌥Q</kbd>
        </button>
      </div>
    `;
    document.body.appendChild(orgModal);

    // Event handlers for selecting organization
    const orgItems = orgModal.querySelectorAll('.org-item');
    orgItems.forEach(item => {
      item.addEventListener('click', () => {
        orgItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');
        const orgName = item.getAttribute('data-org');
        if (window.showToast) {
          window.showToast(`Switched organization to ${orgName}`);
        }
        orgModal.classList.add('hidden');
      });
    });

    const addOrgBtn = orgModal.querySelector('#add-org-btn');
    if (addOrgBtn) {
      addOrgBtn.addEventListener('click', () => {
        if (window.showToast) window.showToast('Add Organization dialog opened', 'info');
        orgModal.classList.add('hidden');
      });
    }

    const signOutBtn = orgModal.querySelector('#sign-out-btn');
    if (signOutBtn) {
      signOutBtn.addEventListener('click', () => {
        if (window.showToast) window.showToast('Signing out...', 'info');
        orgModal.classList.add('hidden');
      });
    }
  }

  orgModal.classList.toggle('hidden');
}
