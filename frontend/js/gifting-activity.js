/* Gifting Activity Page Interactivity Handler */

document.addEventListener('DOMContentLoaded', () => {
  const filterBtns = document.querySelectorAll('.gifting-filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter || btn.textContent.trim();
      window.showToast(`Filtering gift records by: ${filter}`, 'info');

      // Filter rows dynamically if table present
      const rows = document.querySelectorAll('.gifting-table-row');
      rows.forEach(row => {
        if (filter.toLowerCase() === 'all') {
          row.style.display = '';
        } else {
          const status = row.dataset.status || row.textContent;
          row.style.display = status.toLowerCase().includes(filter.toLowerCase()) ? '' : 'none';
        }
      });
    });
  });

  // Action listeners for gift resend/cancel buttons
  const resendBtns = document.querySelectorAll('.resend-gift-btn');
  resendBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const recipient = btn.dataset.recipient || 'Prospect';
      if (window.showConfirmDialog) {
        window.showConfirmDialog({
          title: 'Resend Digital Gift',
          message: `Are you sure you want to resend the digital coffee invite to ${recipient}?`,
          confirmText: 'Resend Invite',
          onConfirm: () => {
            window.showToast(`Re-sent digital gift voucher to ${recipient}!`, 'success');
          }
        });
      } else {
        window.showToast(`Re-sent digital gift voucher to ${recipient}!`, 'success');
      }
    });
  });
});
