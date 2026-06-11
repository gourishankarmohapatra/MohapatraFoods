/* Mohapatra Foods Private Limited - Interactive Logic & Animations */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileMenu();
  initDepartmentsDropdown();
  initScrollspy();
  initProductFilter();
  initAccordion();
  initContactForm();
  initScrollAnimations();
});

/* 1. Header Scroll Effect */
function initNavbar() {
  const header = document.querySelector('.header');
  
  const handleScroll = () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Run on initial load
}

/* 2. Mobile Menu Toggle Drawer */
function initMobileMenu() {
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  const toggleMenu = () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('open');
  };

  const closeMenu = () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('open');
  };

  hamburger.addEventListener('click', toggleMenu);

  navLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target) && navMenu.classList.contains('open')) {
      closeMenu();
    }
  });
}

/* 2a. Departments Dropdown Toggle */
function initDepartmentsDropdown() {
  const dropdown = document.querySelector('.nav-item-dropdown');
  const toggleButton = document.querySelector('.dropdown-toggle');

  if (!dropdown || !toggleButton) return;

  const closeDropdown = () => {
    dropdown.classList.remove('dropdown-open');
    toggleButton.setAttribute('aria-expanded', 'false');
  };

  const toggleDropdown = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const isOpen = dropdown.classList.toggle('dropdown-open');
    toggleButton.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  };

  toggleButton.addEventListener('click', toggleDropdown);

  document.addEventListener('click', (event) => {
    if (!dropdown.contains(event.target)) {
      closeDropdown();
    }
  });
}

/* 3. Scrollspy: Highlight active nav link on scroll */
function initScrollspy() {
  const sections = document.querySelectorAll('section[id], header[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const onScroll = () => {
    const scrollPos = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', onScroll);
  onScroll(); // Run initially
}

/* 4. Product Showroom Tags Filtering */
function initProductFilter() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const productCards = document.querySelectorAll('.product-card');

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Toggle active tab class
      tabButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const filterValue = button.getAttribute('data-filter');

      productCards.forEach(card => {
        const category = card.getAttribute('data-category');

        // Animation transition out
        card.style.opacity = '0';
        card.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
          if (filterValue === 'all' || category === filterValue) {
            card.style.display = 'flex';
            // Trigger reflow to restart transition
            card.offsetHeight;
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          } else {
            card.style.display = 'none';
          }
        }, 300);
      });
    });
  });
}

/* 5. e-MOA Legal Accordion Toggle */
function initAccordion() {
  const accordionItems = document.querySelectorAll('.accordion-item');

  accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    const content = item.querySelector('.accordion-content');

    header.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all other items
      accordionItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          otherItem.querySelector('.accordion-content').style.maxHeight = null;
        }
      });

      // Toggle active on current item
      if (isActive) {
        item.classList.remove('active');
        content.style.maxHeight = null;
      } else {
        item.classList.add('active');
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });
}

/* 6. Contact Form Processing */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const alertBox = form.querySelector('.form-alert');
  const submitBtn = form.querySelector('button[type="submit"]');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Reset alert
    alertBox.style.display = 'none';
    alertBox.className = 'form-alert';

    // Get input values
    const name = document.getElementById('formName').value.trim();
    const email = document.getElementById('formEmail').value.trim();
    const phone = document.getElementById('formPhone').value.trim();
    const subject = document.getElementById('formSubject').value.trim();
    const message = document.getElementById('formMessage').value.trim();

    // Basic validation
    if (!name || !email || !message) {
      alertBox.textContent = 'Please fill in all mandatory fields (*).';
      alertBox.classList.add('error');
      alertBox.style.display = 'block';
      alertBox.style.backgroundColor = 'hsl(0, 80%, 95%)';
      alertBox.style.color = 'hsl(0, 80%, 30%)';
      alertBox.style.border = '1px solid hsl(0, 80%, 90%)';
      return;
    }

    // Email regex validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alertBox.textContent = 'Please enter a valid email address.';
      alertBox.classList.add('error');
      alertBox.style.display = 'block';
      alertBox.style.backgroundColor = 'hsl(0, 80%, 95%)';
      alertBox.style.color = 'hsl(0, 80%, 30%)';
      alertBox.style.border = '1px solid hsl(0, 80%, 90%)';
      return;
    }

    // Visual button loading state
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';

    // Simulate server response delay
    setTimeout(() => {
      // Re-enable button
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;

      // Show success
      alertBox.textContent = `Thank you, ${name}! Your inquiry has been submitted. We will contact you at ${email} shortly.`;
      alertBox.classList.add('success');
      alertBox.style.display = 'block';
      alertBox.style.backgroundColor = 'hsl(142, 70%, 93%)';
      alertBox.style.color = 'hsl(142, 70%, 25%)';
      alertBox.style.border = '1px solid hsl(142, 70%, 85%)';

      // Reset form fields
      form.reset();
    }, 1500);
  });
}

/* 7. Scroll-driven Entry Animations via Intersection Observer */
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.animate-on-scroll');

  if ('IntersectionObserver' in window) {
    const observerOptions = {
      root: null, // relative to document viewport
      rootMargin: '0px 0px -60px 0px', // triggers slightly before entering view
      threshold: 0.1 // 10% of element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active-scroll');
          // Once animated, we don't need to observe it anymore
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    animatedElements.forEach(el => {
      observer.observe(el);
    });
  } else {
    // Fallback: load all instantly if browser doesn't support IntersectionObserver
    animatedElements.forEach(el => {
      el.classList.add('active-scroll');
    });
  }
}
