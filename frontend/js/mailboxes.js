/* Mailboxes Health Handler */

document.addEventListener('DOMContentLoaded', () => {
  const syncButtons = document.querySelectorAll('.sync-mailbox-btn');
  syncButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      window.showToast('Re-syncing mailbox deliverability warm-up cycle...');
    });
  });

  const addMailboxBtn = document.getElementById('add-mailbox-btn');
  if (addMailboxBtn) {
    addMailboxBtn.addEventListener('click', () => {
      window.showToast('Connect Google Workspace / Microsoft 365 OAuth Mailbox');
    });
  }
});
