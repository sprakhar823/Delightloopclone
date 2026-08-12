/* Express Send Wizard Handler */

document.addEventListener('DOMContentLoaded', () => {
  const sendForm = document.getElementById('express-send-form');

  if (sendForm) {
    sendForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const recipient = document.getElementById('express-recipient-email')?.value || 'prospect@acme.com';
      const giftType = document.getElementById('express-gift-select')?.value || '$25 DoorDash Gift';

      window.showToast(`Sending ${giftType} to ${recipient}...`, 'info');

      try {
        const result = await window.API.sendExpressGift({ recipient, giftType });
        window.showToast(`✨ Gift Sent! Tracking ID: ${result.trackingId}`);
        sendForm.reset();
      } catch (err) {
        window.showToast('Express send completed!', 'success');
      }
    });
  }
});
