/**
 * Kopuram Promoter & Builders LLP - Main Controller Script
 */

document.addEventListener('DOMContentLoaded', () => {
  initLanguage();
  initTheme();
  initNavigation();
  initScrollAnimations();
  initProjectsFilter();
  initTestimonialsSlider();
  initForms();
  initLeadPopup();
  initBackToTop();
  initMap();
});

/* ----------------------------------------------------
 * Language Engine
 * ---------------------------------------------------- */
let currentLang = localStorage.getItem('kp_lang') || 'en';

function initLanguage() {
  setLanguage(currentLang);

  const langBtns = document.querySelectorAll('.lang-btn');
  langBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const selected = e.target.getAttribute('data-lang');
      if (selected && selected !== currentLang) {
        setLanguage(selected);
      }
    });
  });
}

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('kp_lang', lang);
  document.documentElement.lang = lang;

  // Update active state on language buttons
  document.querySelectorAll('.lang-btn').forEach(btn => {
    if (btn.getAttribute('data-lang') === lang) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  // Translate all elements with data-i18n
  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang] && translations[lang][key]) {
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = translations[lang][key];
      } else {
        el.innerHTML = translations[lang][key];
      }
    }
  });

  // Re-render project cards if container exists
  renderProjectsGrid();
}

/* ----------------------------------------------------
 * Theme Engine (Light / Dark)
 * ---------------------------------------------------- */
function initTheme() {
  const savedTheme = localStorage.getItem('kp_theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  const toggleBtns = document.querySelectorAll('.theme-toggle');
  toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const activeTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('kp_theme', newTheme);
      updateThemeIcon(newTheme);
    });
  });
}

function updateThemeIcon(theme) {
  const icons = document.querySelectorAll('.theme-toggle i');
  icons.forEach(icon => {
    if (theme === 'dark') {
      icon.className = 'fas fa-sun';
    } else {
      icon.className = 'fas fa-moon';
    }
  });
}

/* ----------------------------------------------------
 * Navigation & Mobile Drawer
 * ---------------------------------------------------- */
function initNavigation() {
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const icon = mobileToggle.querySelector('i');
      if (navMenu.classList.contains('active')) {
        icon.className = 'fas fa-times';
      } else {
        icon.className = 'fas fa-bars';
      }
    });
  }

  // Close menu on link click
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        const icon = mobileToggle.querySelector('i');
        if (icon) icon.className = 'fas fa-bars';
      }
    });
  });
}

/* ----------------------------------------------------
 * Render Projects Grid
 * ---------------------------------------------------- */
function renderProjectsGrid(filterCategory = 'all') {
  const gridContainer = document.getElementById('projects-grid-container');
  if (!gridContainer) return;

  gridContainer.innerHTML = '';

  const filtered = projectsData.filter(proj => {
    if (filterCategory === 'all') return true;
    return proj.status === filterCategory;
  });

  if (filtered.length === 0) {
    gridContainer.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 3rem;">
        <p style="color: var(--text-muted); font-size: 1.1rem;">No layout projects found under this filter.</p>
      </div>
    `;
    return;
  }

  filtered.forEach(proj => {
    const card = document.createElement('div');
    card.className = 'project-card';
    
    const titleText = proj.title[currentLang] || proj.title.en;
    const locText = proj.location[currentLang] || proj.location.en;
    const descText = proj.description[currentLang] || proj.description.en;
    const statusLabel = proj.statusText[currentLang] || proj.statusText.en;
    const btnDetails = currentLang === 'ta' ? 'விவரங்கள் அறிய' : 'View Details';
    const btnVisit = currentLang === 'ta' ? 'மனை பார்வை' : 'Book Visit';

    card.innerHTML = `
      <div class="project-img-wrapper">
        <span class="badge ${proj.badgeClass} project-badge-top">${statusLabel}</span>
        <img src="${proj.image}" alt="${titleText}" loading="lazy">
      </div>
      <div class="project-body">
        <div class="project-location"><i class="fas fa-map-marker-alt"></i> ${locText}</div>
        <h3 class="project-name">${titleText}</h3>
        <p class="project-desc">${descText.substring(0, 110)}...</p>
        
        <div class="project-features-list">
          <span class="project-feature-tag"><i class="fas fa-check-circle text-gold"></i> ${proj.plotSizes}</span>
          <span class="project-feature-tag"><i class="fas fa-certificate text-gold"></i> ${proj.dtcpNo}</span>
        </div>

        <div class="project-footer">
          <button class="btn btn-outline btn-sm" onclick="openProjectModal('${proj.id}')">${btnDetails}</button>
          <button class="btn btn-primary btn-sm" onclick="openBookingModal('${titleText}')"><i class="fas fa-calendar-check"></i> ${btnVisit}</button>
        </div>
      </div>
    `;
    gridContainer.appendChild(card);
  });
}

function initProjectsFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      filterBtns.forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      const cat = e.target.getAttribute('data-filter');
      renderProjectsGrid(cat);
    });
  });
}

/* ----------------------------------------------------
 * Project Detail Modal Renderer
 * ---------------------------------------------------- */
function openProjectModal(projectId) {
  const proj = projectsData.find(p => p.id === projectId);
  if (!proj) return;

  const title = proj.title[currentLang] || proj.title.en;
  const loc = proj.location[currentLang] || proj.location.en;
  const desc = proj.description[currentLang] || proj.description.en;

  const modalHtml = `
    <div class="modal-backdrop active" id="project-detail-modal">
      <div class="modal-card" style="max-width: 750px;">
        <div class="modal-header">
          <div>
            <span class="badge ${proj.badgeClass}">${proj.statusText[currentLang] || proj.statusText.en}</span>
            <h3 style="margin-top: 0.35rem;">${title}</h3>
            <p style="font-size: 0.85rem; color: var(--text-muted);"><i class="fas fa-map-marker-alt" style="color: var(--primary);"></i> ${loc}</p>
          </div>
          <button class="modal-close" onclick="closeModal('project-detail-modal')"><i class="fas fa-times"></i></button>
        </div>
        <div class="modal-body">
          <div style="border-radius: var(--radius-md); overflow: hidden; height: 260px; margin-bottom: 1.5rem;">
            <img src="${proj.image}" alt="${title}" style="width: 100%; height: 100%; object-fit: cover;">
          </div>
          
          <h4 style="margin-bottom: 0.5rem; color: var(--primary);">Project Overview</h4>
          <p style="margin-bottom: 1.25rem; font-size: 0.95rem; color: var(--text-main);">${desc}</p>
          
          <div style="background: var(--light-bg); padding: 1rem; border-radius: var(--radius-sm); margin-bottom: 1.5rem;">
            <p><strong>Approval:</strong> ${proj.approval}</p>
            <p><strong>Plot Sizes:</strong> ${proj.plotSizes}</p>
            <p><strong>Pricing:</strong> ${proj.priceStarting}</p>
          </div>

          <h4 style="margin-bottom: 0.75rem; color: var(--primary);">Key Layout Amenities</h4>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 0.75rem; margin-bottom: 1.5rem;">
            ${proj.amenities.map(a => `
              <div style="display: flex; align-items: center; gap: 0.5rem; background: var(--card-bg); border: 1px solid var(--border-color); padding: 0.6rem 0.8rem; border-radius: var(--radius-sm); font-size: 0.88rem;">
                <i class="fas ${a.icon}" style="color: var(--secondary-dark);"></i> ${a.name}
              </div>
            `).join('')}
          </div>

          <h4 style="margin-bottom: 0.75rem; color: var(--primary);">Location Advantages</h4>
          <ul style="margin-bottom: 2rem;">
            ${proj.advantages.map(adv => `
              <li style="margin-bottom: 0.4rem; font-size: 0.9rem; display: flex; align-items: center; gap: 0.5rem;">
                <i class="fas fa-check-circle" style="color: #10B981;"></i> ${adv}
              </li>
            `).join('')}
          </ul>

          <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
            <button class="btn btn-primary" onclick="closeModal('project-detail-modal'); openBookingModal('${title}');">
              <i class="fas fa-calendar-check"></i> Book Free Site Visit
            </button>
            <a href="https://wa.me/918681851548?text=Hi%20Kopuram%20Builders,%20I%20am%20interested%20in%20${encodeURIComponent(title)}" target="_blank" class="btn btn-secondary">
              <i class="fab fa-whatsapp"></i> Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', modalHtml);
}

function openBookingModal(projectName = '') {
  const existing = document.getElementById('booking-modal');
  if (existing) existing.remove();

  const lang = currentLang;
  const modalTitle = lang === 'ta' ? 'இலவச மனை பார்வை முன்பதிவு' : 'Book Free Site Visit';
  const labelName = lang === 'ta' ? 'உங்கள் பெயர்' : 'Full Name';
  const labelPhone = lang === 'ta' ? 'தொலைபேசி எண்' : 'Phone Number';
  const labelDate = lang === 'ta' ? 'விருப்பமான தேதி' : 'Preferred Date';
  const labelTime = lang === 'ta' ? 'விருப்பமான நேரம்' : 'Preferred Time';
  const labelProject = lang === 'ta' ? 'விருப்பமான மனைப் பிரிவு' : 'Selected Project';
  const btnSubmit = lang === 'ta' ? 'முன்பதிவை உறுதிசெய்' : 'Confirm Site Visit';

  const modalHtml = `
    <div class="modal-backdrop active" id="booking-modal">
      <div class="modal-card">
        <div class="modal-header">
          <h3><i class="fas fa-calendar-alt text-gold"></i> ${modalTitle}</h3>
          <button class="modal-close" onclick="closeModal('booking-modal')"><i class="fas fa-times"></i></button>
        </div>
        <div class="modal-body">
          <form onsubmit="handleBookingSubmit(event)">
            <div class="form-group">
              <label class="form-label">${labelName} *</label>
              <input type="text" class="form-control" required placeholder="John Doe">
            </div>
            <div class="form-group">
              <label class="form-label">${labelPhone} *</label>
              <input type="tel" class="form-control" required placeholder="+91 98765 43210">
            </div>
            <div class="form-group">
              <label class="form-label">${labelProject}</label>
              <select class="form-control" id="booking-proj-select">
                <option value="Kopuram Nagar Phase 2" ${projectName.includes('Phase 2') ? 'selected' : ''}>Kopuram Nagar Phase 2</option>
                <option value="Kopuram Sangatamil Nagar Phase III" ${projectName.includes('Sangatamil') ? 'selected' : ''}>Kopuram Sangatamil Nagar Phase III</option>
                <option value="Kopuram Diamond City" ${projectName.includes('Diamond') ? 'selected' : ''}>Kopuram Diamond City</option>
              </select>
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
              <div class="form-group">
                <label class="form-label">${labelDate} *</label>
                <input type="date" class="form-control" required>
              </div>
              <div class="form-group">
                <label class="form-label">${labelTime} *</label>
                <select class="form-control" required>
                  <option value="10:00 AM">10:00 AM</option>
                  <option value="12:00 PM">12:00 PM</option>
                  <option value="03:00 PM">03:00 PM</option>
                  <option value="05:00 PM">05:00 PM</option>
                </select>
              </div>
            </div>
            <button type="submit" class="btn btn-primary" style="width: 100%; margin-top: 0.5rem;">
              <i class="fas fa-check-circle"></i> ${btnSubmit}
            </button>
          </form>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', modalHtml);
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('active');
    setTimeout(() => modal.remove(), 300);
  }
}

/* ----------------------------------------------------
 * Form Submission Handling
 * ---------------------------------------------------- */
function initForms() {
  const contactForm = document.getElementById('main-contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showSuccessAlert(
        currentLang === 'ta' ? 'நன்றி! உங்கள் செய்தி பெறப்பட்டது.' : 'Thank You! Message Received.',
        currentLang === 'ta' ? 'எங்கள் குழுவினர் விரைவில் உங்களைத் தொடர்புகொள்வார்கள்.' : 'Our project specialist will get in touch with you shortly.'
      );
      contactForm.reset();
    });
  }
}

function handleBookingSubmit(e) {
  e.preventDefault();
  closeModal('booking-modal');
  showSuccessAlert(
    currentLang === 'ta' ? 'மனை பார்வை முன்பதிவு செய்யப்பட்டது!' : 'Site Visit Booked Successfully!',
    currentLang === 'ta' ? 'உங்களின் இலவச வாகன வசதிக்காக எங்கள் நிர்வாகி உங்களை தொடர்புகொள்வார்.' : 'Our relationship manager will contact you to confirm free pickup cab details.'
  );
}

function showSuccessAlert(title, message) {
  const alertHtml = `
    <div class="modal-backdrop active" id="success-modal">
      <div class="modal-card" style="text-align: center; padding: 2.5rem; max-width: 480px;">
        <div style="width: 70px; height: 70px; background: rgba(16, 185, 129, 0.15); color: #10B981; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 2.2rem; margin: 0 auto 1.25rem auto;">
          <i class="fas fa-check-circle"></i>
        </div>
        <h3 style="margin-bottom: 0.5rem;">${title}</h3>
        <p style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 1.75rem;">${message}</p>
        <button class="btn btn-primary" onclick="closeModal('success-modal')">OK, Got It</button>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', alertHtml);
}

/* ----------------------------------------------------
 * Testimonials Slider
 * ---------------------------------------------------- */
function initTestimonialsSlider() {
  if (typeof Swiper !== 'undefined' && document.querySelector('.swiper-testimonials')) {
    new Swiper('.swiper-testimonials', {
      slidesPerView: 1,
      spaceBetween: 24,
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      breakpoints: {
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 }
      }
    });
  }
}

/* ----------------------------------------------------
 * Lead Capture Popup (Triggers after 20 Seconds)
 * ---------------------------------------------------- */
function initLeadPopup() {
  if (sessionStorage.getItem('kp_lead_dismissed')) return;

  setTimeout(() => {
    if (!document.getElementById('lead-popup-modal')) {
      const popupHtml = `
        <div class="modal-backdrop active" id="lead-popup-modal">
          <div class="modal-card" style="max-width: 520px; overflow: hidden;">
            <div style="background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%); padding: 2rem; color: #FFFFFF; position: relative;">
              <button class="modal-close" style="color: #FFFFFF;" onclick="dismissLeadPopup()"><i class="fas fa-times"></i></button>
              <span class="badge badge-gold" style="margin-bottom: 0.75rem;">Special Offer</span>
              <h3 style="color: #FFFFFF; font-size: 1.5rem; margin-bottom: 0.5rem;">Get Free Site Visit & Brochure</h3>
              <p style="font-size: 0.9rem; opacity: 0.9;">Book a zero-cost AC cab site visit with your family to Kopuram layout projects in Madurai.</p>
            </div>
            <div class="modal-body">
              <form onsubmit="handleLeadSubmit(event)">
                <div class="form-group">
                  <label class="form-label">Full Name</label>
                  <input type="text" class="form-control" required placeholder="Enter your name">
                </div>
                <div class="form-group">
                  <label class="form-label">Phone Number</label>
                  <input type="tel" class="form-control" required placeholder="Enter WhatsApp number">
                </div>
                <button type="submit" class="btn btn-secondary" style="width: 100%; font-size: 1rem;">
                  <i class="fas fa-download"></i> Get Instant Callback & Brochure
                </button>
              </form>
            </div>
          </div>
        </div>
      `;
      document.body.insertAdjacentHTML('beforeend', popupHtml);
    }
  }, 20000);
}

function dismissLeadPopup() {
  sessionStorage.setItem('kp_lead_dismissed', 'true');
  closeModal('lead-popup-modal');
}

function handleLeadSubmit(e) {
  e.preventDefault();
  dismissLeadPopup();
  showSuccessAlert(
    'Brochure Requested!',
    'Our team will send the layout map and brochure directly to your WhatsApp number.'
  );
}

/* ----------------------------------------------------
 * Back To Top Button & Counters
 * ---------------------------------------------------- */
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

function initScrollAnimations() {
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      once: true,
      offset: 100
    });
  }
}

/* ----------------------------------------------------
 * Map Initialization
 * ---------------------------------------------------- */
function initMap() {
  const mapContainer = document.getElementById('office-map');
  if (mapContainer && typeof L !== 'undefined') {
    // Anna Nagar, Madurai Coordinates ~ 9.9196, 78.1394
    const map = L.map('office-map').setView([9.9196, 78.1394], 14);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    L.marker([9.9196, 78.1394]).addTo(map)
      .bindPopup('<b>Kopuram Promoter and Builders LLP</b><br>Anna Nagar, Madurai')
      .openPopup();
  }
}
