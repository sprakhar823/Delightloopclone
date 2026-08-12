/* Templates Gallery Handler */

document.addEventListener('DOMContentLoaded', () => {
  const templateCards = document.querySelectorAll('.template-card');
  templateCards.forEach(card => {
    card.addEventListener('click', () => {
      const name = card.querySelector('h3')?.textContent || 'Template';
      window.showToast(`Selected "${name}" for editing.`);
    });
  });
});
