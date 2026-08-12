/* Records & Prospect Contacts Handler */

document.addEventListener('DOMContentLoaded', () => {
  let activeTagButton = null;
  let totalContactsCount = 132591;

  // 1. Live Search Input Handler
  const recordSearch = document.getElementById('records-search-input');
  if (recordSearch) {
    recordSearch.addEventListener('input', applyFiltersAndSearch);
  }

  // 2. Tab Switching (All Contacts vs Lists)
  const tabAllContacts = document.getElementById('tab-all-contacts');
  const tabLists = document.getElementById('tab-lists');
  const contactsTableSection = document.getElementById('contacts-table-section');
  const listsCardsSection = document.getElementById('lists-cards-section');

  if (tabAllContacts && tabLists) {
    tabAllContacts.addEventListener('click', () => {
      tabAllContacts.classList.add('active');
      tabAllContacts.style.backgroundColor = '#1a202c';
      tabAllContacts.style.color = '#ffffff';

      tabLists.classList.remove('active');
      tabLists.style.backgroundColor = 'transparent';
      tabLists.style.color = '#94a3b8';

      if (contactsTableSection) contactsTableSection.classList.remove('hidden');
      if (listsCardsSection) listsCardsSection.classList.add('hidden');
    });

    tabLists.addEventListener('click', () => {
      tabLists.classList.add('active');
      tabLists.style.backgroundColor = '#1a202c';
      tabLists.style.color = '#ffffff';

      tabAllContacts.classList.remove('active');
      tabAllContacts.style.backgroundColor = 'transparent';
      tabAllContacts.style.color = '#94a3b8';

      if (contactsTableSection) contactsTableSection.classList.add('hidden');
      if (listsCardsSection) listsCardsSection.classList.remove('hidden');
    });
  }

  // 3. Filter Panel Toggling & Handling
  const toggleFiltersBtn = document.getElementById('toggle-filters-btn');
  const filterPanel = document.getElementById('filter-panel');
  const filterSourceSelect = document.getElementById('filter-source-select');
  const filterCompanySelect = document.getElementById('filter-company-select');
  const clearFiltersBtn = document.getElementById('clear-filters-btn');

  if (toggleFiltersBtn && filterPanel) {
    toggleFiltersBtn.addEventListener('click', () => {
      filterPanel.classList.toggle('hidden');
    });
  }

  if (filterSourceSelect) filterSourceSelect.addEventListener('change', applyFiltersAndSearch);
  if (filterCompanySelect) filterCompanySelect.addEventListener('change', applyFiltersAndSearch);

  if (clearFiltersBtn) {
    clearFiltersBtn.addEventListener('click', () => {
      if (filterSourceSelect) filterSourceSelect.value = 'all';
      if (filterCompanySelect) filterCompanySelect.value = 'all';
      if (recordSearch) recordSearch.value = '';
      applyFiltersAndSearch();
      if (window.showToast) window.showToast('Filters cleared');
    });
  }

  function applyFiltersAndSearch() {
    const query = recordSearch ? recordSearch.value.toLowerCase().trim() : '';
    const selectedSource = filterSourceSelect ? filterSourceSelect.value : 'all';
    const selectedCompany = filterCompanySelect ? filterCompanySelect.value : 'all';

    const rows = document.querySelectorAll('#contacts-table-body tr');
    let visibleCount = 0;

    rows.forEach(row => {
      const text = row.textContent.toLowerCase();
      const rowSource = text.includes('csv') ? 'csv' : (text.includes('manual') ? 'manual' : 'all');
      
      const matchesSearch = !query || text.includes(query);
      const matchesSource = selectedSource === 'all' || rowSource === selectedSource;
      const matchesCompany = selectedCompany === 'all' || text.includes(selectedCompany.toLowerCase());

      if (matchesSearch && matchesSource && matchesCompany) {
        row.style.display = '';
        visibleCount++;
      } else {
        row.style.display = 'none';
      }
    });
  }

  // 4. Modal Triggers & Form Submissions
  const addContactBtn = document.getElementById('add-contact-btn');
  const addContactModal = document.getElementById('add-contact-modal');
  const addContactForm = document.getElementById('add-contact-form');

  if (addContactBtn && addContactModal) {
    addContactBtn.addEventListener('click', () => {
      addContactModal.classList.remove('hidden');
    });
  }

  if (addContactForm) {
    addContactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const firstName = document.getElementById('contact-first-name')?.value.trim();
      const lastName = document.getElementById('contact-last-name')?.value.trim();
      const email = document.getElementById('contact-email')?.value.trim();
      const company = document.getElementById('contact-company')?.value.trim() || '—';
      const role = document.getElementById('contact-role')?.value.trim() || '—';
      const source = document.getElementById('contact-source')?.value || 'manual';
      const location = document.getElementById('contact-location')?.value.trim() || '';

      const fullName = `${firstName} ${lastName}`;
      const initials = `${firstName[0] || ''}${lastName[0] || ''}`.toUpperCase() || 'C';

      const tbody = document.getElementById('contacts-table-body');
      if (tbody) {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>
            <div class="contact-name-cell">
              <div class="contact-avatar-circle">${initials}</div>
              <div class="contact-info-wrap">
                <span class="contact-main-name">${fullName}</span>
                ${email ? `<span class="contact-sub-email">${email}</span>` : ''}
              </div>
            </div>
          </td>
          <td>${company}</td>
          <td>${role}</td>
          <td>
            <button class="tag-plus-btn" title="Add tag">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            </button>
          </td>
          <td><span class="${source === 'csv' ? 'badge-source-csv' : 'badge-source-manual'}">${source}</span></td>
          <td>
            ${location ? `
              <div class="address-cell-wrap">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                <span>${location}</span>
                <span class="badge-shipping-tag">SHIPPING</span>
              </div>
            ` : '—'}
          </td>
        `;
        tbody.insertBefore(tr, tbody.firstChild);

        // Bind tag listener on newly created row
        const newTagBtn = tr.querySelector('.tag-plus-btn');
        if (newTagBtn) attachTagListener(newTagBtn);
      }

      totalContactsCount++;
      const countLabel = document.getElementById('contacts-count-label');
      if (countLabel) {
        countLabel.textContent = `${totalContactsCount.toLocaleString()} contacts`;
      }

      addContactModal.classList.add('hidden');
      addContactForm.reset();
      if (window.showToast) window.showToast(`Contact "${fullName}" added successfully!`);
    });
  }

  // 5. New Contact List Modal
  const newContactListBtn = document.getElementById('new-contact-list-btn');
  const newListModal = document.getElementById('new-list-modal');
  const newListForm = document.getElementById('new-list-form');

  if (newContactListBtn && newListModal) {
    newContactListBtn.addEventListener('click', () => {
      newListModal.classList.remove('hidden');
    });
  }

  if (newListForm) {
    newListForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const listName = document.getElementById('list-name')?.value.trim();
      const listDesc = document.getElementById('list-description')?.value.trim() || 'Custom audience segment.';

      if (listsCardsSection) {
        const card = document.createElement('div');
        card.style.cssText = 'background-color: #070a0f; border: 1px solid #161b26; border-radius: 12px; padding: 20px; display: flex; flex-direction: column; gap: 12px;';
        card.innerHTML = `
          <div style="display: flex; justify-content: space-between; align-items: flex-start;">
            <h3 style="font-size: 15px; font-weight: 700; color: #f8fafc; margin: 0;">${listName}</h3>
            <span style="background: #1e1b4b; color: #818cf8; border: 1px solid #3730a3; padding: 2px 8px; border-radius: 12px; font-size: 11px; font-weight: 600;">0 contacts</span>
          </div>
          <p style="font-size: 12.5px; color: #64748b; margin: 0; line-height: 1.4;">${listDesc}</p>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-top: auto; pt-2; border-top: 1px solid #121722; font-size: 11.5px; color: #475569;">
            <span>Created just now</span>
            <button class="btn btn-ghost btn-xs" style="color: #6366f1;">View List</button>
          </div>
        `;
        listsCardsSection.insertBefore(card, listsCardsSection.firstChild);
      }

      newListModal.classList.add('hidden');
      newListForm.reset();

      // Switch to Lists tab view
      if (tabLists) tabLists.click();
      if (window.showToast) window.showToast(`Contact list "${listName}" created!`);
    });
  }

  // 6. Tag Addition Handler
  const addTagModal = document.getElementById('add-tag-modal');
  const saveTagBtn = document.getElementById('save-tag-btn');
  const newTagInput = document.getElementById('new-tag-input');

  function attachTagListener(btn) {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      activeTagButton = btn;
      if (addTagModal) {
        if (newTagInput) newTagInput.value = '';
        addTagModal.classList.remove('hidden');
      }
    });
  }

  document.querySelectorAll('.tag-plus-btn').forEach(attachTagListener);

  document.querySelectorAll('.quick-tag-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      if (newTagInput) newTagInput.value = chip.textContent.trim();
    });
  });

  if (saveTagBtn) {
    saveTagBtn.addEventListener('click', () => {
      const tagValue = newTagInput ? newTagInput.value.trim() : '';
      if (tagValue && activeTagButton) {
        const tagBadge = document.createElement('span');
        tagBadge.className = 'badge badge-purple';
        tagBadge.style.marginRight = '4px';
        tagBadge.style.fontSize = '11px';
        tagBadge.textContent = tagValue;

        const cell = activeTagButton.parentElement;
        if (cell) {
          cell.insertBefore(tagBadge, activeTagButton);
        }
        if (window.showToast) window.showToast(`Added tag "${tagValue}"`);
      }
      if (addTagModal) addTagModal.classList.add('hidden');
    });
  }

  // 7. Table Column Sorting
  let sortDirection = {};
  document.querySelectorAll('#contacts-table-element th[data-sort]').forEach(th => {
    th.addEventListener('click', () => {
      const sortKey = th.getAttribute('data-sort');
      const tbody = document.getElementById('contacts-table-body');
      if (!tbody) return;

      const rowsArr = Array.from(tbody.querySelectorAll('tr'));
      sortDirection[sortKey] = !sortDirection[sortKey]; // toggle asc/desc

      const colIndex = sortKey === 'name' ? 0 : (sortKey === 'company' ? 1 : 2);

      rowsArr.sort((a, b) => {
        const valA = a.children[colIndex]?.textContent.trim().toLowerCase() || '';
        const valB = b.children[colIndex]?.textContent.trim().toLowerCase() || '';
        if (valA < valB) return sortDirection[sortKey] ? -1 : 1;
        if (valA > valB) return sortDirection[sortKey] ? 1 : -1;
        return 0;
      });

      rowsArr.forEach(r => tbody.appendChild(r));
      if (window.showToast) window.showToast(`Sorted contacts by ${sortKey} ${sortDirection[sortKey] ? 'ascending' : 'descending'}`);
    });
  });

  // 8. Grid vs Table View Toggle
  const viewTableBtn = document.getElementById('view-table-btn');
  const viewGridBtn = document.getElementById('view-grid-btn');

  if (viewTableBtn && viewGridBtn) {
    viewTableBtn.addEventListener('click', () => {
      viewTableBtn.style.backgroundColor = '#1a202c';
      viewTableBtn.style.color = '#ffffff';
      viewGridBtn.style.backgroundColor = 'transparent';
      viewGridBtn.style.color = '#64748b';
      if (contactsTableSection) {
        contactsTableSection.style.display = 'block';
      }
    });

    viewGridBtn.addEventListener('click', () => {
      viewGridBtn.style.backgroundColor = '#1a202c';
      viewGridBtn.style.color = '#ffffff';
      viewTableBtn.style.backgroundColor = 'transparent';
      viewTableBtn.style.color = '#64748b';
      if (window.showToast) window.showToast('Grid view active');
    });
  }

  // 9. Customize Columns Button
  const customizeColumnsBtn = document.getElementById('customize-columns-btn');
  if (customizeColumnsBtn) {
    customizeColumnsBtn.addEventListener('click', () => {
      if (window.showToast) window.showToast('Column customization panel opened', 'info');
    });
  }

  // 10. Sidebar subitem navigation (Contacts, Accounts, ABM-PBM, Events)
  const navSubitems = document.querySelectorAll('.nav-collapsible-group .nav-subitem');
  const pageHeaderTitle = document.querySelector('.header-title h1');
  const pageHeaderSubtitle = document.querySelector('.header-title .subtitle');

  navSubitems.forEach(sub => {
    sub.addEventListener('click', (e) => {
      const label = sub.textContent.trim();
      navSubitems.forEach(s => s.classList.remove('active'));
      sub.classList.add('active');

      if (label === 'Accounts' || label === 'ABM-PBM' || label === 'Events' || label === 'Events (legacy)') {
        e.preventDefault();
        if (pageHeaderTitle) pageHeaderTitle.textContent = label;
        if (pageHeaderSubtitle) pageHeaderSubtitle.textContent = `View and manage ${label.toLowerCase()} intelligence and data records.`;

        if (window.showToast) window.showToast(`Switched view to ${label}`);
      } else if (label === 'Contacts') {
        e.preventDefault();
        if (pageHeaderTitle) pageHeaderTitle.textContent = 'Contact Lists';
        if (pageHeaderSubtitle) pageHeaderSubtitle.textContent = 'Manage your contact lists and audience segments';
        if (tabAllContacts) tabAllContacts.click();
      }
    });
  });
});
