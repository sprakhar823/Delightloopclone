/* Campaigns List Handler */

document.addEventListener('DOMContentLoaded', async () => {
  const campaignSearch = document.getElementById('campaign-search-input');
  const campaignRows = document.querySelectorAll('.campaign-row');

  if (campaignSearch) {
    campaignSearch.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase();
      campaignRows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(q) ? '' : 'none';
      });
    });
  }

  const newCampaignBtn = document.getElementById('new-campaign-modal-btn');
  if (newCampaignBtn) {
    newCampaignBtn.addEventListener('click', () => {
      window.showToast('Opening Agentic Campaign Builder Wizard');
    });
  }
});
