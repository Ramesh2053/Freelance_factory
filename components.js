/* FreelanceFactory - Shared UI Components */

function renderHeader(options = {}) {
  const user = Auth.getCurrentUser();
  const isAuth = !!user;
  const currentPage = options.activePage || '';

  const publicLinks = [
    { href: 'index.html', label: 'Home' },
    { href: 'about.html', label: 'About' },
    { href: 'how-it-works.html', label: 'How It Works' },
    { href: 'contact.html', label: 'Contact' }
  ];

  const authLinks = isAuth ? (user.role === 'freelancer' ? [
    { href: 'dashboard-freelancer.html', label: 'Dashboard' },
    { href: 'browse-jobs.html', label: 'Browse Jobs' },
    { href: 'messages.html', label: 'Messages' }
  ] : [
    { href: 'dashboard-client.html', label: 'Dashboard' },
    { href: 'browse-freelancers.html', label: 'Find Talent' },
    { href: 'job-post.html', label: 'Post Job' },
    { href: 'messages.html', label: 'Messages' }
  ]) : [];

  const notifCount = isAuth ? Store.getUnreadNotificationCount(user.user_id) : 0;

  return `
    <header class="site-header">
      <div class="container header-inner">
        <a href="index.html" class="logo">
          <span class="logo-text">FreelanceFactory</span>
          <span class="logo-tagline">Where every skill finds its perfect match.</span>
        </a>
        <nav class="nav-desktop">
          ${publicLinks.map(l => `<a href="${l.href}" class="${currentPage === l.href ? 'active' : ''}">${l.label}</a>`).join('')}
          ${authLinks.map(l => `<a href="${l.href}" class="${currentPage === l.href ? 'active' : ''}">${l.label}</a>`).join('')}
        </nav>
        <div class="nav-actions">
          ${isAuth ? `
            <div class="notification-bell" id="notifBell" title="Notifications">
              🔔
              ${notifCount > 0 ? `<span class="notification-count">${notifCount}</span>` : ''}
              <div class="notification-dropdown" id="notifDropdown"></div>
            </div>
            <a href="settings.html" class="btn btn-ghost btn-sm">
              <img src="${user.profile_photo_url}" alt="" class="avatar avatar-sm" style="margin-right:6px">
              ${user.full_name.split(' ')[0]}
            </a>
            <button class="btn btn-ghost btn-sm" onclick="Auth.logout()">Logout</button>
          ` : `
            <a href="login.html" class="btn btn-outline btn-sm">Sign In</a>
            <a href="signup.html" class="btn btn-primary btn-sm">Sign Up</a>
          `}
        </div>
        <button class="mobile-toggle" id="mobileToggle" aria-label="Menu">
          <span></span><span></span><span></span>
        </button>
      </div>
      <nav class="mobile-nav" id="mobileNav">
        ${publicLinks.map(l => `<a href="${l.href}">${l.label}</a>`).join('')}
        ${authLinks.map(l => `<a href="${l.href}">${l.label}</a>`).join('')}
        ${isAuth ? `
          <a href="settings.html">Settings</a>
          <a href="#" onclick="Auth.logout();return false;">Logout</a>
        ` : `
          <a href="login.html">Sign In</a>
          <a href="signup.html">Sign Up</a>
        `}
      </nav>
    </header>
  `;
}

function renderFooter() {
  return `
    <footer class="site-footer">
      <div class="container">
        <div class="footer-grid">
          <div class="footer-brand">
            <a href="index.html" class="logo">
              <span class="logo-text">FreelanceFactory</span>
            </a>
            <p>Connecting talent with meaningful opportunities. A global marketplace with secure escrow payments and transparent ratings.</p>
            <div class="social-links">
              <a href="#" title="LinkedIn">in</a>
              <a href="#" title="Facebook">f</a>
              <a href="#" title="Instagram">ig</a>
            </div>
          </div>
          <div class="footer-col">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="about.html">About</a></li>
              <li><a href="contact.html">Contact</a></li>
              <li><a href="terms.html">Terms of Service</a></li>
              <li><a href="privacy.html">Privacy Policy</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4>For Users</h4>
            <ul>
              <li><a href="how-it-works.html">How It Works</a></li>
              <li><a href="browse-jobs.html">Browse Jobs</a></li>
              <li><a href="browse-freelancers.html">Find Freelancers</a></li>
              <li><a href="signup.html">Create Account</a></li>
            </ul>
          </div>
          <div class="footer-col footer-contact">
            <h4>Contact</h4>
            <p>📧 hello@freelancefactory.com</p>
            <p>📞 +977 1-4567890</p>
            <p>📍 Thamel, Kathmandu, Nepal</p>
          </div>
        </div>
        <div class="footer-bottom">
          <p>&copy; ${new Date().getFullYear()} FreelanceFactory. All rights reserved.</p>
        </div>
      </div>
    </footer>
  `;
}

function renderSidebar(role, activePage) {
  const freelancerLinks = [
    { href: 'dashboard-freelancer.html', label: 'Dashboard', icon: '📊' },
    { href: 'browse-jobs.html', label: 'Browse Jobs', icon: '💼' },
    { href: 'profile-freelancer.html', label: 'My Profile', icon: '👤', query: true },
    { href: 'messages.html', label: 'Messages', icon: '💬' },
    { href: 'settings.html', label: 'Settings', icon: '⚙️' }
  ];
  const clientLinks = [
    { href: 'dashboard-client.html', label: 'Dashboard', icon: '📊' },
    { href: 'job-post.html', label: 'Post a Job', icon: '➕' },
    { href: 'browse-freelancers.html', label: 'Find Talent', icon: '🔍' },
    { href: 'messages.html', label: 'Messages', icon: '💬' },
    { href: 'settings.html', label: 'Settings', icon: '⚙️' }
  ];
  const links = role === 'freelancer' ? freelancerLinks : clientLinks;
  const user = Auth.getCurrentUser();

  return `
    <aside class="sidebar">
      <nav class="sidebar-nav">
        ${links.map(l => {
          const href = l.query && user ? `${l.href}?id=${user.user_id}` : l.href;
          return `<a href="${href}" class="${activePage === l.href ? 'active' : ''}">${l.icon} ${l.label}</a>`;
        }).join('')}
      </nav>
    </aside>
  `;
}

function initHeader() {
  const toggle = document.getElementById('mobileToggle');
  const nav = document.getElementById('mobileNav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => nav.classList.toggle('open'));
  }

  const bell = document.getElementById('notifBell');
  const dropdown = document.getElementById('notifDropdown');
  if (bell && dropdown) {
    const user = Auth.getCurrentUser();
    bell.addEventListener('click', (e) => {
      e.stopPropagation();
      dropdown.classList.toggle('open');
      if (dropdown.classList.contains('open')) {
        const notifs = Store.getNotifications(user.user_id).slice(0, 8);
        dropdown.innerHTML = notifs.length ? notifs.map(n => `
          <div class="notification-item ${n.read ? '' : 'unread'}">${n.message}<br><small class="text-muted">${timeAgo(n.created_at)}</small></div>
        `).join('') : '<div class="notification-item">No notifications</div>';
        Store.markNotificationsRead(user.user_id);
        const count = document.querySelector('.notification-count');
        if (count) count.remove();
      }
    });
    document.addEventListener('click', () => dropdown.classList.remove('open'));
  }
}

function initFAQ() {
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const wasOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!wasOpen) item.classList.add('open');
    });
  });
}

function initCarousel(trackId, prevId, nextId) {
  const track = document.getElementById(trackId);
  if (!track) return;
  let offset = 0;
  const itemWidth = track.querySelector('.carousel-item')?.offsetWidth + 24 || 304;

  document.getElementById(prevId)?.addEventListener('click', () => {
    offset = Math.min(offset + itemWidth, 0);
    track.style.transform = `translateX(${offset}px)`;
  });
  document.getElementById(nextId)?.addEventListener('click', () => {
    const maxOffset = -(track.scrollWidth - track.parentElement.offsetWidth);
    offset = Math.max(offset - itemWidth, maxOffset);
    track.style.transform = `translateX(${offset}px)`;
  });
}

function mountLayout(headerEl, footerEl, options = {}) {
  if (headerEl) {
    headerEl.innerHTML = renderHeader(options);
    initHeader();
  }
  if (footerEl) footerEl.innerHTML = renderFooter();
}
