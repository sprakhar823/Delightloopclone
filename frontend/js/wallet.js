/* Wallet Transactions & Balance Management */

document.addEventListener('DOMContentLoaded', () => {
  const addMoneyBtn = document.getElementById('add-money-btn');
  const redeemCreditsBtn = document.getElementById('redeem-credits-btn');
  const balanceEl = document.getElementById('wallet-balance-amount');
  const creditsEl = document.getElementById('wallet-credits-amount');
  const tbody = document.getElementById('wallet-tx-tbody');

  let currentBalance = 548290.00;
  let currentCredits = 12450;

  if (addMoneyBtn) {
    addMoneyBtn.addEventListener('click', () => {
      const amountStr = prompt('Enter amount to add to wallet ($):', '5000');
      if (!amountStr) return;
      const amount = parseFloat(amountStr);
      if (isNaN(amount) || amount <= 0) {
        if (window.showToast) window.showToast('Invalid amount entered', 'error');
        return;
      }

      currentBalance += amount;
      if (balanceEl) {
        balanceEl.textContent = `$${currentBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
      }

      if (tbody) {
        const today = new Date().toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' });
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td class="text-secondary">${today}</td>
          <td class="text-emerald font-semibold">+$${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
          <td>Direct Deposit / Card</td>
          <td>Wallet TopUp</td>
          <td><span class="badge badge-success">Completed</span></td>
        `;
        tbody.insertBefore(tr, tbody.firstChild);
      }

      if (window.showToast) window.showToast(`Successfully added $${amount.toLocaleString()} to wallet!`);
    });
  }

  if (redeemCreditsBtn) {
    redeemCreditsBtn.addEventListener('click', () => {
      const creditsStr = prompt('Enter credits to redeem (100 credits = $10):', '500');
      if (!creditsStr) return;
      const credits = parseInt(creditsStr, 10);
      if (isNaN(credits) || credits <= 0) {
        if (window.showToast) window.showToast('Invalid credits number', 'error');
        return;
      }

      if (credits > currentCredits) {
        if (window.showToast) window.showToast('Insufficient credits balance', 'error');
        return;
      }

      const dollarValue = credits * 0.10;
      currentCredits -= credits;
      currentBalance += dollarValue;

      if (creditsEl) creditsEl.textContent = currentCredits.toLocaleString();
      if (balanceEl) {
        balanceEl.textContent = `$${currentBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
      }

      if (tbody) {
        const today = new Date().toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' });
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td class="text-secondary">${today}</td>
          <td class="text-emerald font-semibold">+$${dollarValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
          <td>Credits Redemption</td>
          <td>Converted ${credits} Credits</td>
          <td><span class="badge badge-success">Completed</span></td>
        `;
        tbody.insertBefore(tr, tbody.firstChild);
      }

      if (window.showToast) window.showToast(`Redeemed ${credits} credits for $${dollarValue.toFixed(2)}!`);
    });
  }
});
