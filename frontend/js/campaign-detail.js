/* Campaign Detail Handler */

document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.campaign-tab');
  const sections = document.querySelectorAll('.campaign-section');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      sections.forEach(s => s.classList.add('hidden'));

      tab.classList.add('active');
      const targetId = tab.dataset.target;
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        targetSection.classList.remove('hidden');
      }
    });
  });
});
