// Add to the end of custom.js

// Enhanced scroll animations
function initScrollAnimations() {
  const elements = document.querySelectorAll('.animate-on-scroll');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1
  });
  
  elements.forEach(el => observer.observe(el));
}

// Enhanced mobile menu
function initMobileMenu() {
  const header = document.querySelector('.mobile-header');
  let lastScroll = 0;
  
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > lastScroll && currentScroll > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
  });
}

// Enhanced form validation
function initFormValidation() {
  const forms = document.querySelectorAll('form');
  
  forms.forEach(form => {
    const inputs = form.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
      input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
      });
      
      input.addEventListener('blur', () => {
        if (!input.value) {
          input.parentElement.classList.remove('focused');
        }
      });
    });
  });
}

// Enhanced dark mode toggle
function initDarkMode() {
  const toggle = document.querySelector('.theme-switch input[type="checkbox"]');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
  
  function setTheme(isDark) {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }
  
  // Initialize theme
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    setTheme(savedTheme === 'dark');
    toggle.checked = savedTheme === 'dark';
  } else {
    setTheme(prefersDark.matches);
    toggle.checked = prefersDark.matches;
  }
  
  // Listen for toggle changes
  toggle.addEventListener('change', (e) => setTheme(e.target.checked));
  
  // Listen for system theme changes
  prefersDark.addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      setTheme(e.matches);
      toggle.checked = e.matches;
    }
  });
}

// Initialize all enhancements
document.addEventListener('DOMContentLoaded', () => {
  initScrollAnimations();
  initMobileMenu();
  initFormValidation();
  initDarkMode();
});

// Enhanced progress bar animations
function animateProgressBars() {
  const progressBars = document.querySelectorAll('.progress-bar');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const width = bar.getAttribute('aria-valuenow') + '%';
        bar.style.width = width;
      }
    });
  }, { threshold: 0.1 });
  
  progressBars.forEach(bar => observer.observe(bar));
}

// Initialize progress bar animations
document.addEventListener('DOMContentLoaded', animateProgressBars);