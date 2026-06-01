document.addEventListener('DOMContentLoaded', function () {

  /* ---- Hamburger menu ---- */
  var navbar    = document.getElementById('navbar');
  var hamburger = document.getElementById('hamburger');
  var navMenu   = document.getElementById('navMenu');

  hamburger.addEventListener('click', function () {
    var isOpen = navMenu.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', String(isOpen));
  });

  navMenu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      navMenu.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  /* ---- Navbar shadow + floating WA visibility ---- */
  var waFloat     = document.getElementById('waFloat');
  var heroSection = document.getElementById('beranda');

  function onScroll() {
    var scrollY    = window.scrollY;
    var heroBottom = heroSection ? heroSection.offsetTop + heroSection.offsetHeight : 500;

    navbar.classList.toggle('scrolled', scrollY > 10);
    waFloat.classList.toggle('visible', scrollY > heroBottom - 250);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---- Active nav link on scroll (IntersectionObserver) ---- */
  var sections = document.querySelectorAll('section[id]');
  var navLinks = document.querySelectorAll('.navbar__link[href^="#"]');

  var sectionObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        navLinks.forEach(function (link) {
          link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
        });
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(function (s) { sectionObserver.observe(s); });

  /* ---- Layanan tabs ---- */
  var tabBtns   = document.querySelectorAll('.tabs__btn');
  var tabPanels = document.querySelectorAll('.tabs__panel');

  tabBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var targetId = btn.getAttribute('aria-controls');

      tabBtns.forEach(function (b) {
        b.classList.remove('tabs__btn--active');
        b.setAttribute('aria-selected', 'false');
      });
      tabPanels.forEach(function (p) {
        p.classList.add('tabs__panel--hidden');
      });

      btn.classList.add('tabs__btn--active');
      btn.setAttribute('aria-selected', 'true');
      document.getElementById(targetId).classList.remove('tabs__panel--hidden');
    });
  });

  /* ---- Form kontak → wa.me ---- */
  var kontakForm = document.getElementById('kontakForm');
  if (kontakForm) {
    kontakForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var nama    = document.getElementById('fNama').value.trim();
      var keluhan = document.getElementById('fKeluhan').value.trim();
      var nomor   = document.querySelector('input[name="terapis"]:checked').value;

      if (!nama || !keluhan) {
        alert('Mohon isi nama dan keluhan Anda terlebih dahulu.');
        return;
      }

      var pesan = 'Assalamualaikum, perkenalkan saya ' + nama + '.\n\n'
                + 'Keluhan saya: ' + keluhan + '\n\n'
                + 'Saya ingin berkonsultasi mengenai terapi di Rumah Sehat Islam Yakin.';

      window.open('https://wa.me/' + nomor + '?text=' + encodeURIComponent(pesan), '_blank', 'noopener,noreferrer');
    });
  }

  /* ---- AOS init ---- */
  AOS.init({
    duration: 600,
    easing:   'ease-out-cubic',
    once:     true,
    offset:   80,
  });
});
