/* Surfaces Page Handler & Category Filtering */

document.addEventListener('DOMContentLoaded', () => {
  const templateSearchInput = document.getElementById('surface-template-search');
  const categoryItems = document.querySelectorAll('.category-circle-item');
  const segButtons = document.querySelectorAll('.surfaces-seg-btn');
  const templateCards = document.querySelectorAll('.surface-card-item');
  const createSurfaceBtn = document.getElementById('create-surface-btn');
  const blankTemplateTrigger = document.getElementById('blank-template-trigger');
  const useTemplateBtns = document.querySelectorAll('.use-template-action-btn');

  let activeCategory = 'all';
  let searchQuery = '';

  function filterSurfaces() {
    templateCards.forEach(card => {
      const category = card.getAttribute('data-category') || '';
      const title = (card.getAttribute('data-title') || '').toLowerCase();
      const desc = (card.querySelector('.surface-desc-text')?.textContent || '').toLowerCase();

      let categoryMatch = (activeCategory === 'all' || category === activeCategory);
      let searchMatch = !searchQuery || title.includes(searchQuery) || desc.includes(searchQuery);

      if (categoryMatch && searchMatch) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  }

  // Category Icon Row click listener
  categoryItems.forEach(item => {
    item.addEventListener('click', () => {
      categoryItems.forEach(c => c.classList.remove('active'));
      item.classList.add('active');
      activeCategory = item.getAttribute('data-category') || 'all';
      filterSurfaces();
    });
  });

  // Search input listener
  if (templateSearchInput) {
    templateSearchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.trim().toLowerCase();
      filterSurfaces();
    });
  }

  // Segment buttons listener
  segButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      segButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      if (typeof showToast === 'function') {
        showToast(`Filtered by ${btn.textContent.trim()}`);
      }
    });
  });

  // Create surface triggers
  if (createSurfaceBtn) {
    createSurfaceBtn.addEventListener('click', () => {
      if (typeof showToast === 'function') {
        showToast('Initializing New Surface Builder...');
      }
    });
  }

  if (blankTemplateTrigger) {
    blankTemplateTrigger.addEventListener('click', () => {
      if (typeof showToast === 'function') {
        showToast('Blank Surface Template Created!');
      }
    });
  }

  useTemplateBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const card = e.target.closest('.surface-card-item');
      const title = card ? card.getAttribute('data-title') : 'Template';
      if (typeof showToast === 'function') {
        showToast(`Selected "${title}" template`);
      }
    });
  });
});
