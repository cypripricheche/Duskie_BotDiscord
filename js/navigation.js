/* ============================================================================================================================ *
 *                                                                                                                              *
 *                                                         Menu Responsive                                                      *
 *                                                                                                                              *
 * ============================================================================================================================ */

const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

// Ouvrir / Fermer le menu en cliquant sur le burger
menuToggle.addEventListener('click', (e) => {
  e.stopPropagation();
  menuToggle.classList.toggle('active');
  navLinks.classList.toggle('active');
});

// Fermer le menu si on clique ailleurs (hors du bouton burger)
document.addEventListener('click', (e) => {
  if (!menuToggle.contains(e.target) && menuToggle.classList.contains('active')) {
    menuToggle.classList.remove('active');
    navLinks.classList.remove('active');
  }
});