/* Common Utility Functions & UI Enhancements */

document.addEventListener('DOMContentLoaded', () => {
  // Highlight Active Nav Link
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navItems = document.querySelectorAll('.nav-item');

  navItems.forEach(item => {
    const href = item.getAttribute('href');
    if (href === currentPath || (currentPath === 'index.html' && href === 'dashboard.html')) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });

  // Global Toast Notification Helper
  window.showToast = function(message, type = 'success') {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      container.style.cssText = `
        position: fixed;
        bottom: 24px;
        right: 24px;
        display: flex;
        flex-direction: column;
        gap: 10px;
        z-index: 1000;
      `;
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    const borderCol = type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#6366f1';
    toast.style.cssText = `
      background: #1f2937;
      color: #f9fafb;
      padding: 12px 20px;
      border-radius: 10px;
      border-left: 4px solid ${borderCol};
      box-shadow: 0 10px 25px rgba(0,0,0,0.5);
      font-size: 13.5px;
      font-weight: 500;
      display: flex;
      align-items: center;
      gap: 10px;
      animation: slideIn 0.3s ease;
    `;
    toast.innerHTML = `<span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  };
});
