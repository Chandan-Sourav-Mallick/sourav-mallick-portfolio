/**
 * Sourav Mallick - Portfolio
 * Main JavaScript: theme, scroll effects, animations, form validation
 */

(function () {
  'use strict';

  // ========== DOM Elements ==========
  const body = document.body;
  const navbar = document.getElementById('navbar');
  const themeToggle = document.getElementById('theme-toggle');
  const themeColorDots = document.getElementById('theme-colors');
  const backToTop = document.getElementById('back-to-top');
  const contactForm = document.getElementById('contact-form');
  const pageLoader = document.getElementById('page-loader');

  // ========== Page Loader ==========
  window.addEventListener('load', () => {
    setTimeout(() => {
      if (pageLoader) pageLoader.classList.add('hidden');
    }, 600);
  });

  // ========== Theme: Light / Dark ==========
  const THEME_KEY = 'portfolio-theme';
  const ACCENT_KEY = 'portfolio-accent';

  function getStoredTheme() {
    return localStorage.getItem(THEME_KEY) || 'light';
  }

  function setTheme(theme) {
    body.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);
  }

  function toggleTheme() {
    const current = body.getAttribute('data-theme') || 'light';
    const next = current === 'light' ? 'dark' : 'light';
    setTheme(next);
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }

  // Apply stored theme on load
  setTheme(getStoredTheme());

  // ========== Accent Color Switcher ==========
  function getStoredAccent() {
    return localStorage.getItem(ACCENT_KEY) || 'violet';
  }

  function setAccent(color) {
    body.setAttribute('data-accent', color);
    localStorage.setItem(ACCENT_KEY, color);
    if (themeColorDots) {
      themeColorDots.querySelectorAll('.dot').forEach((dot) => {
        dot.classList.toggle('active', dot.getAttribute('data-color') === color);
      });
    }
  }

  if (themeColorDots) {
    themeColorDots.querySelectorAll('.dot').forEach((dot) => {
      dot.addEventListener('click', () => {
        const color = dot.getAttribute('data-color');
        if (color) setAccent(color);
      });
    });
    setAccent(getStoredAccent());
  }

  // ========== Typed Text (Hero) ==========
  const roleEl = document.querySelector('.hero-role.typed-text');
  if (roleEl) {
    const phrases = ['Front End Web Developer', 'UI Developer', 'React Enthusiast'];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typeSpeed = 80;
    const deleteSpeed = 50;
    const pauseEnd = 2000;
    const pauseStart = 500;

    function type() {
      const current = phrases[phraseIndex];
      if (isDeleting) {
        roleEl.textContent = current.slice(0, charIndex - 1);
        charIndex--;
      } else {
        roleEl.textContent = current.slice(0, charIndex + 1);
        charIndex++;
      }

      let delay = isDeleting ? deleteSpeed : typeSpeed;
      if (!isDeleting && charIndex === current.length) {
        delay = pauseEnd;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        delay = pauseStart;
      }
      setTimeout(type, delay);
    }

    setTimeout(type, 800);
  }

  // ========== Navbar: scroll effect + active link (multi-page) ==========
  function updateNavbar() {
    if (!navbar) return;
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  function getCurrentPage() {
    const path = window.location.pathname;
    const page = path.split('/').pop() || 'index.html';
    return page === '' ? 'index.html' : page;
  }

  function setActiveNavLink() {
    const navLinks = document.querySelectorAll('.navbar .nav-link[href]');
    const currentPage = getCurrentPage();

    navLinks.forEach((link) => {
      const href = link.getAttribute('href') || '';
      const linkPage = href.startsWith('http') ? null : (href.split('/').pop() || href);
      const isActive = linkPage === currentPage || (currentPage === '' && (linkPage === 'index.html' || linkPage === ''));
      link.classList.toggle('active', !!isActive);
    });
  }

  window.addEventListener('scroll', () => {
    updateNavbar();
    setActiveNavLink();
  });
  updateNavbar();
  setActiveNavLink();

  // ========== Scroll-triggered animations (Intersection Observer) ==========
  const animatedEls = document.querySelectorAll('.animate-on-scroll');
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -80px 0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Trigger progress bar width for skill cards
        if (entry.target.classList.contains('skill-card')) {
          const fill = entry.target.querySelector('.progress-bar-fill');
          if (fill) {
            const progress = fill.getAttribute('data-progress') || 0;
            fill.style.setProperty('--progress-width', `${progress}%`);
            fill.style.width = `${progress}%`;
          }
        }
      }
    });
  }, observerOptions);

  animatedEls.forEach((el) => observer.observe(el));

  // ========== Back to Top ==========
  function updateBackToTop() {
    if (!backToTop) return;
    if (window.scrollY > 400) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }

  window.addEventListener('scroll', updateBackToTop);
  updateBackToTop();

  backToTop?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ========== Contact Form Validation (index page: no #form-message) ==========
  if (contactForm && !document.getElementById('form-message')) {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    function validateEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function showInvalid(input, valid) {
      input.classList.toggle('is-invalid', !valid);
    }

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      if (!nameInput.value.trim()) {
        showInvalid(nameInput, false);
        isValid = false;
      } else {
        showInvalid(nameInput, true);
      }

      if (!emailInput.value.trim() || !validateEmail(emailInput.value)) {
        showInvalid(emailInput, false);
        isValid = false;
      } else {
        showInvalid(emailInput, true);
      }

      if (!messageInput.value.trim()) {
        showInvalid(messageInput, false);
        isValid = false;
      } else {
        showInvalid(messageInput, true);
      }

      if (isValid) {
        const btn = contactForm.querySelector('button[type="submit"]');
        const originalText = btn.textContent;
        btn.textContent = 'Sending...';
        btn.disabled = true;
        setTimeout(() => {
          btn.textContent = 'Message Sent!';
          contactForm.reset();
          setTimeout(() => {
            btn.textContent = originalText;
            btn.disabled = false;
          }, 2000);
        }, 800);
      }
    });

    [nameInput, emailInput, messageInput].forEach((input) => {
      input?.addEventListener('input', () => {
        if (input.classList.contains('is-invalid')) {
          const valid = input === emailInput
            ? validateEmail(input.value)
            : input.value.trim().length > 0;
          showInvalid(input, valid);
        }
      });
    });
  }

  // ========== Footer year ==========
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ========== Smooth scroll for anchor links (same page only) ==========
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ========== Lazy load images (About page) ==========
  (function initLazyImages() {
    const lazyImages = document.querySelectorAll('img.lazy-img[data-src]');
    if (!lazyImages.length) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const img = entry.target;
        const src = img.getAttribute('data-src');
        if (src) {
          img.setAttribute('src', src);
          img.removeAttribute('data-src');
          img.classList.add('loaded');
        }
        io.unobserve(img);
      });
    }, { rootMargin: '100px' });
    lazyImages.forEach((img) => io.observe(img));
  })();

  // ========== Animated counters (About page) ==========
  (function initCounters() {
    const counterEls = document.querySelectorAll('.counter-item[data-counter]');
    if (!counterEls.length) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const end = parseInt(el.getAttribute('data-counter'), 10) || 0;
        const valueEl = el.querySelector('.counter-value');
        if (!valueEl || el.dataset.animated === 'true') return;
        el.dataset.animated = 'true';
        let current = 0;
        const step = end / 40;
        const timer = setInterval(() => {
          current += step;
          if (current >= end) {
            valueEl.textContent = end;
            clearInterval(timer);
          } else {
            valueEl.textContent = Math.floor(current);
          }
        }, 40);
        io.unobserve(el);
      });
    }, { threshold: 0.2 });
    counterEls.forEach((el) => io.observe(el));
  })();

  // ========== Skill category filters (Skills page) ==========
  (function initSkillFilters() {
    const filters = document.getElementById('skill-filters');
    const cards = document.querySelectorAll('.skill-card-filterable');
    if (!filters || !cards.length) return;
    filters.querySelectorAll('.filter-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        filters.querySelectorAll('.filter-btn').forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        const category = btn.getAttribute('data-category') || 'all';
        cards.forEach((card) => {
          const cardCat = card.getAttribute('data-category') || '';
          const show = category === 'all' || cardCat === category;
          card.classList.toggle('hidden-by-filter', !show);
        });
      });
    });
  })();

  // ========== Project filter & sort (Projects page) ==========
  (function initProjectFilterSort() {
    const filterSelect = document.getElementById('project-filter');
    const sortSelect = document.getElementById('project-sort');
    const grid = document.getElementById('projects-grid');
    if (!grid) return;
    const cols = Array.from(grid.querySelectorAll('.project-col'));

    function applyFilterSort() {
      const filter = filterSelect ? filterSelect.value : 'all';
      const sort = sortSelect ? sortSelect.value : 'default';

      let visible = cols.filter((col) => {
        const tags = (col.getAttribute('data-tags') || '').toLowerCase();
        if (filter === 'all') return true;
        if (filter === 'react') return tags.includes('react');
        if (filter === 'javascript') return tags.includes('javascript');
        if (filter === 'html') return tags.includes('html');
        return true;
      });

      if (sort === 'name-asc') visible.sort((a, b) => (a.getAttribute('data-name') || '').localeCompare(b.getAttribute('data-name') || ''));
      if (sort === 'name-desc') visible.sort((a, b) => (b.getAttribute('data-name') || '').localeCompare(a.getAttribute('data-name') || ''));

      cols.forEach((col) => {
        col.style.order = visible.indexOf(col) >= 0 ? visible.indexOf(col) : 999;
        col.style.display = visible.indexOf(col) >= 0 ? '' : 'none';
      });
    }

    if (filterSelect) filterSelect.addEventListener('change', applyFilterSort);
    if (sortSelect) sortSelect.addEventListener('change', applyFilterSort);
  })();

  // ========== Project modal (Projects page) ==========
  (function initProjectModal() {
    const backdrop = document.getElementById('project-modal-backdrop');
    const modal = document.getElementById('project-modal');
    const closeBtn = document.getElementById('modal-close');
    const cards = document.querySelectorAll('.project-card-modal[data-project]');
    const projectData = {
      ecommerce: { title: 'E-Commerce Dashboard', description: 'React + Redux dashboard with charts, product management, and order tracking. Built with TypeScript and modern tooling.', tags: ['React', 'Redux', 'TypeScript'], live: '#', code: '#' },
      taskmanager: { title: 'Task Manager App', description: 'Drag-and-drop task board with local storage and filters. Vanilla JavaScript and CSS.', tags: ['JavaScript', 'CSS'], live: '#', code: '#' },
      portfolio: { title: 'Portfolio Website', description: 'Responsive portfolio with dark mode, theme switcher, and smooth animations. HTML, CSS, Bootstrap, JavaScript.', tags: ['HTML', 'CSS', 'Bootstrap'], live: '#', code: '#' },
      weather: { title: 'Weather App', description: 'Real-time weather with geolocation and forecast charts. React and external API.', tags: ['React', 'API'], live: '#', code: '#' }
    };

    function openModal(projectId) {
      const data = projectData[projectId];
      if (!data || !modal) return;
      const titleEl = document.getElementById('modal-title');
      const descEl = document.getElementById('modal-description');
      const tagsEl = document.getElementById('modal-tags');
      const liveEl = document.getElementById('modal-link-live');
      const codeEl = document.getElementById('modal-link-code');
      if (titleEl) titleEl.textContent = data.title;
      if (descEl) descEl.textContent = data.description;
      if (tagsEl) {
        tagsEl.innerHTML = data.tags.map((t) => `<span class="skill-tag">${t}</span>`).join('');
      }
      if (liveEl) liveEl.href = data.live;
      if (codeEl) codeEl.href = data.code;
      if (backdrop) backdrop.classList.add('show');
      if (modal) modal.classList.add('show');
      document.body.style.overflow = 'hidden';
    }

    function closeModal() {
      if (backdrop) backdrop.classList.remove('show');
      if (modal) modal.classList.remove('show');
      document.body.style.overflow = '';
    }

    cards.forEach((card) => {
      card.addEventListener('click', () => {
        const id = card.getAttribute('data-project');
        if (id) openModal(id);
      });
    });
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (backdrop) backdrop.addEventListener('click', closeModal);
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });
  })();

  // ========== Expand / collapse (Experience page) ==========
  (function initExpandCollapse() {
    document.querySelectorAll('[data-expand-card]').forEach((card) => {
      const toggle = card.querySelector('.expand-toggle');
      if (!toggle) return;
      toggle.addEventListener('click', (e) => {
        e.preventDefault();
        card.classList.toggle('expanded');
      });
    });
  })();

  // ========== Contact form: animated labels & success/error (Contact page only) ==========
  (function initContactFormAdvanced() {
    const formMessage = document.getElementById('form-message');
    const form = document.getElementById('contact-form');
    if (!form || !formMessage) return;

    const nameInput = form.querySelector('#name');
    const emailInput = form.querySelector('#email');
    const messageInput = form.querySelector('#message');

    function updateFilled(e) {
      const el = e.target;
      el.classList.toggle('filled', !!el.value.trim());
    }

    [nameInput, emailInput, form.querySelector('#subject'), messageInput].forEach((input) => {
      if (!input) return;
      if (input.value.trim()) input.classList.add('filled');
      input.addEventListener('input', updateFilled);
      input.addEventListener('blur', updateFilled);
    });

    function showFormMessage(type, text) {
      if (!formMessage) return;
      formMessage.textContent = text;
      formMessage.className = 'form-message show ' + type;
      formMessage.setAttribute('role', 'alert');
    }

    // form.addEventListener('submit', (e) => {
    //   e.preventDefault();
    //   if (formMessage) formMessage.classList.remove('show');

    //   const name = nameInput ? nameInput.value.trim() : '';
    //   const email = emailInput ? emailInput.value.trim() : '';
    //   const message = messageInput ? messageInput.value.trim() : '';
    //   const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    //   let valid = true;
    //   if (!name) { if (nameInput) nameInput.classList.add('is-invalid'); valid = false; } else if (nameInput) nameInput.classList.remove('is-invalid');
    //   if (!email || !validEmail.test(email)) { if (emailInput) emailInput.classList.add('is-invalid'); valid = false; } else if (emailInput) emailInput.classList.remove('is-invalid');
    //   if (!message || message.length < 10) { if (messageInput) messageInput.classList.add('is-invalid'); valid = false; } else if (messageInput) messageInput.classList.remove('is-invalid');

    //   if (!valid) {
    //     showFormMessage('error', 'Please fix the errors above.');
    //     return;
    //   }

    //   const btn = form.querySelector('button[type="submit"]');
    //   if (btn) { btn.disabled = true; btn.textContent = 'Sending...'; }
    //   setTimeout(() => {
    //     showFormMessage('success', 'Thank you! Your message has been sent. I\'ll get back to you soon.');
    //     form.reset();
    //     [nameInput, emailInput, messageInput].forEach((input) => { if (input) input.classList.remove('filled', 'is-invalid'); });
    //     if (btn) { btn.textContent = 'Send Message'; btn.disabled = false; }
    //   }, 800);
    // });


    form.addEventListener('submit', async (e) => {
  e.preventDefault();

  if (formMessage) formMessage.classList.remove('show');

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const message = messageInput.value.trim();
  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  let valid = true;

  if (!name) {
    nameInput.classList.add('is-invalid');
    valid = false;
  } else nameInput.classList.remove('is-invalid');

  if (!email || !validEmail.test(email)) {
    emailInput.classList.add('is-invalid');
    valid = false;
  } else emailInput.classList.remove('is-invalid');

  if (!message || message.length < 10) {
    messageInput.classList.add('is-invalid');
    valid = false;
  } else messageInput.classList.remove('is-invalid');

  if (!valid) {
    showFormMessage('error', 'Please fix the errors above.');
    return;
  }

  const btn = form.querySelector('button[type="submit"]');
  btn.disabled = true;
  btn.textContent = 'Sending...';

  try {
    const response = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
      showFormMessage('success', "Thank you! Your message has been sent.");
      form.reset();
      [nameInput, emailInput, messageInput].forEach(i =>
        i.classList.remove('filled', 'is-invalid')
      );
    } else {
      showFormMessage('error', 'Oops! Something went wrong.');
    }
  } catch (err) {
    showFormMessage('error', 'Network error. Please try again.');
  }

  btn.textContent = 'Send Message';
  btn.disabled = false;
});

  })();
})();
