/* FreelanceFactory - Utilities */

function formatCurrency(amount) {
  return 'NPR ' + Number(amount).toLocaleString('en-NP');
}

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

function formatDateTime(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
}

function timeAgo(dateStr) {
  const seconds = Math.floor((Date.now() - new Date(dateStr)) / 1000);
  if (seconds < 60) return 'just now';
  if (seconds < 3600) return Math.floor(seconds / 60) + 'm ago';
  if (seconds < 86400) return Math.floor(seconds / 3600) + 'h ago';
  if (seconds < 604800) return Math.floor(seconds / 86400) + 'd ago';
  return formatDate(dateStr);
}

function renderStars(rating) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  let html = '<span class="stars">';
  for (let i = 1; i <= 5; i++) {
    if (i <= full) html += '★';
    else if (i === full + 1 && half) html += '★';
    else html += '<span class="empty">★</span>';
  }
  html += '</span>';
  return html;
}

function getQueryParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}

function truncate(str, len) {
  if (!str) return '';
  return str.length > len ? str.substring(0, len) + '...' : str;
}

function showAlert(container, message, type = 'success') {
  const el = document.createElement('div');
  el.className = `alert alert-${type}`;
  el.innerHTML = message;
  container.prepend(el);
  setTimeout(() => el.remove(), 5000);
}

function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

function paginate(items, page, perPage = 9) {
  const total = Math.ceil(items.length / perPage);
  const start = (page - 1) * perPage;
  return { items: items.slice(start, start + perPage), total, page, perPage };
}

function renderPagination(container, currentPage, totalPages, onPageChange) {
  if (totalPages <= 1) { container.innerHTML = ''; return; }
  let html = '';
  html += `<button ${currentPage === 1 ? 'disabled' : ''} data-page="${currentPage - 1}">‹</button>`;
  for (let i = 1; i <= totalPages; i++) {
    if (totalPages > 7 && i > 3 && i < totalPages - 2 && Math.abs(i - currentPage) > 1) {
      if (i === 4 || i === totalPages - 3) html += '<button disabled>...</button>';
      continue;
    }
    html += `<button class="${i === currentPage ? 'active' : ''}" data-page="${i}">${i}</button>`;
  }
  html += `<button ${currentPage === totalPages ? 'disabled' : ''} data-page="${currentPage + 1}">›</button>`;
  container.innerHTML = html;
  container.querySelectorAll('button[data-page]').forEach(btn => {
    btn.addEventListener('click', () => {
      const p = parseInt(btn.dataset.page);
      if (p >= 1 && p <= totalPages) onPageChange(p);
    });
  });
}

function readFileAsDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePhone(phone) {
  return /^[0-9]{10}$/.test(phone.replace(/\s/g, ''));
}

const AVAILABILITY_COLORS = {
  'Available': 'badge-success',
  'Busy': 'badge-warning',
  'Not Available': 'badge-danger'
};

const STATUS_LABELS = {
  'posted': { label: 'Open', class: 'badge-info' },
  'in-progress': { label: 'In Progress', class: 'badge-warning' },
  'completed': { label: 'Completed', class: 'badge-success' },
  'cancelled': { label: 'Cancelled', class: 'badge-danger' },
  'draft': { label: 'Draft', class: 'badge-info' }
};
