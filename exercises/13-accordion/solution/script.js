const items = Array.from(document.querySelectorAll('.accordion-item'));

items.forEach((item) => {
  const header = item.querySelector('.accordion-header');

  header.addEventListener('click', () => {
    const wasOpen = item.classList.contains('open');

    items.forEach((other) => {
      other.classList.remove('open');
      other.querySelector('.accordion-header').setAttribute('aria-expanded', 'false');
      other.querySelector('.icon').textContent = '+';
    });

    if (!wasOpen) {
      item.classList.add('open');
      header.setAttribute('aria-expanded', 'true');
      item.querySelector('.icon').textContent = '-';
    }
  });
});
