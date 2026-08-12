/* Modals Interaction Handler */

document.addEventListener('DOMContentLoaded', () => {
  // Global modal open/close trigger handlers
  const modalTriggers = document.querySelectorAll('[data-modal-target]');
  const modalCloseBtns = document.querySelectorAll('[data-modal-close]');

  modalTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = trigger.getAttribute('data-modal-target');
      const modal = document.getElementById(targetId);
      if (modal) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  modalCloseBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const modal = btn.closest('.modal-backdrop');
      if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
      }
    });
  });

  // Close modals when clicking backdrop
  document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) {
        backdrop.classList.add('hidden');
        document.body.style.overflow = '';
      }
    });
  });

  // Global Confirmation Dialog Helper
  window.showConfirmDialog = function({ title, message, confirmText = 'Confirm', onConfirm }) {
    let confirmModal = document.getElementById('global-confirm-modal');
    if (!confirmModal) {
      confirmModal = document.createElement('div');
      confirmModal.id = 'global-confirm-modal';
      confirmModal.className = 'modal-backdrop hidden';
      confirmModal.innerHTML = `
        <div class="modal-box" style="max-width: 440px;">
          <div class="modal-header">
            <h3 class="modal-title" id="confirm-dialog-title" style="font-size: 16px; font-weight: 700;">${title}</h3>
            <button class="btn btn-ghost btn-sm" id="confirm-dialog-close-x">✕</button>
          </div>
          <div class="modal-body">
            <p id="confirm-dialog-message" style="color: var(--text-secondary); font-size: 13.5px; line-height: 1.5;">${message}</p>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary btn-sm" id="confirm-dialog-cancel">Cancel</button>
            <button class="btn btn-primary btn-sm" id="confirm-dialog-ok">${confirmText}</button>
          </div>
        </div>
      `;
      document.body.appendChild(confirmModal);
    }

    document.getElementById('confirm-dialog-title').textContent = title;
    document.getElementById('confirm-dialog-message').textContent = message;
    document.getElementById('confirm-dialog-ok').textContent = confirmText;

    confirmModal.classList.remove('hidden');

    const handleConfirm = () => {
      confirmModal.classList.add('hidden');
      cleanup();
      if (typeof onConfirm === 'function') onConfirm();
    };

    const handleCancel = () => {
      confirmModal.classList.add('hidden');
      cleanup();
    };

    const cleanup = () => {
      document.getElementById('confirm-dialog-ok').removeEventListener('click', handleConfirm);
      document.getElementById('confirm-dialog-cancel').removeEventListener('click', handleCancel);
      document.getElementById('confirm-dialog-close-x').removeEventListener('click', handleCancel);
    };

    document.getElementById('confirm-dialog-ok').addEventListener('click', handleConfirm);
    document.getElementById('confirm-dialog-cancel').addEventListener('click', handleCancel);
    document.getElementById('confirm-dialog-close-x').addEventListener('click', handleCancel);
  };
});
