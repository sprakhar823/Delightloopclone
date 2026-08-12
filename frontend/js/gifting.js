/* Gifting Activity Handler */

document.addEventListener('DOMContentLoaded', () => {
  const filterBtns = document.querySelectorAll('.gifting-filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      window.showToast(`Filtered gifting records by: ${btn.textContent.trim()}`);
    });
  });
});
