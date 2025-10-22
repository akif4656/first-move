
 const langBtn = document.querySelector('.language-btn');
  const langMenu = document.querySelector('.language-menu');
  const langTextDiv = langBtn.querySelector('.nav-item-icon');

  langBtn.addEventListener('click', () => {
    const isExpanded = langBtn.getAttribute('aria-expanded') === 'true';
    langBtn.setAttribute('aria-expanded', !isExpanded);
    langMenu.classList.toggle('show');
  });

  langMenu.querySelectorAll('a').forEach(langOption => {
    langOption.addEventListener('click', (e) => {
      e.preventDefault();
      // Update the button text to selected language
      langTextDiv.firstChild.textContent = langOption.textContent + ' ';

      // Close dropdown
      langMenu.classList.remove('show');
      langBtn.setAttribute('aria-expanded', false);
    });
  });

  // Close dropdown if clicking outside
  document.addEventListener('click', (e) => {
    if (!langBtn.contains(e.target) && !langMenu.contains(e.target)) {
      langMenu.classList.remove('show');
      langBtn.setAttribute('aria-expanded', false);
    }
  });

  const toggleButton = document.querySelector('.mobile-menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  toggleButton.addEventListener('click', () => {
    navLinks.classList.toggle('mobile-menu-open');
  });





  
