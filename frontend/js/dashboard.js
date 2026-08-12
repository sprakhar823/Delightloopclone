/* Dashboard Analytics & Realtime Visuals */

document.addEventListener('DOMContentLoaded', async () => {
  // Fetch real or fallback dashboard stats from API
  if (window.API) {
    const stats = await window.API.getDashboardStats();
    console.log('Loaded Dashboard Stats:', stats);
  }

  // Quick Action Buttons Listener
  const expressSendBtn = document.getElementById('dash-express-btn');
  if (expressSendBtn) {
    expressSendBtn.addEventListener('click', () => {
      window.location.href = 'express-send.html';
    });
  }

  const newCampaignBtn = document.getElementById('dash-new-campaign-btn');
  if (newCampaignBtn) {
    newCampaignBtn.addEventListener('click', () => {
      window.location.href = 'campaigns.html';
    });
  }

  // Activate DelightEngage / DelightSense buttons
  const activateEngageBtn = document.getElementById('activate-engage-btn');
  if (activateEngageBtn) {
    activateEngageBtn.addEventListener('click', () => {
      if (typeof showToast === 'function') {
        showToast('DelightEngage service activation requested');
      }
    });
  }

  const activateSenseBtn = document.getElementById('activate-sense-btn');
  if (activateSenseBtn) {
    activateSenseBtn.addEventListener('click', () => {
      if (typeof showToast === 'function') {
        showToast('DelightSense service activation requested');
      }
    });
  }
});
