/* FreelanceFactory - LocalStorage Data Layer */
const DB_KEY = 'freelancefactory_db';

const SKILLS_LIST = [
  'Web Development', 'Mobile Development', 'UI/UX Design', 'Graphic Design',
  'Logo Design', 'Content Writing', 'Copywriting', 'SEO', 'Digital Marketing',
  'Social Media Management', 'Video Editing', 'Photography', 'Data Entry',
  'Virtual Assistant', 'Translation', 'Accounting', 'Legal Consulting',
  'WordPress', 'React', 'Python', 'JavaScript', 'Node.js', 'PHP',
  'Brand Identity', 'Illustration', '3D Modeling', 'Animation'
];

const JOB_CATEGORIES = [
  'Web Development', 'Design', 'Writing', 'Marketing', 'Video & Animation',
  'Music & Audio', 'Programming', 'Business', 'Data Science', 'Mobile Apps'
];

const INDUSTRIES = [
  'Technology', 'Healthcare', 'Finance', 'Education', 'Retail',
  'Manufacturing', 'Real Estate', 'Hospitality', 'Media', 'Non-Profit', 'Other'
];

function generateId() {
  return 'id_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

function getDB() {
  const data = localStorage.getItem(DB_KEY);
  if (data) return JSON.parse(data);
  return initDB();
}

function saveDB(db) {
  localStorage.setItem(DB_KEY, JSON.stringify(db));
}

function initDB() {
  const db = {
    users: [],
    freelancerDetails: [],
    clientDetails: [],
    jobs: [],
    applications: [],
    conversations: [],
    messages: [],
    payments: [],
    reviews: [],
    disputes: [],
    notifications: [],
    activities: [],
    contactSubmissions: [],
    workSubmissions: [],
    settings: {}
  };
  seedData(db);
  saveDB(db);
  return db;
}

function seedData(db) {
  const freelancers = [
    { name: 'Sarah Chen', headline: 'UI/UX Designer | Brand Identity', skills: ['UI/UX Design', 'Graphic Design', 'Brand Identity'], rate: 45, rating: 4.9, reviews: 47, location: 'Kathmandu', availability: 'Available' },
    { name: 'Rajesh Thapa', headline: 'Full Stack Developer | React & Node.js', skills: ['Web Development', 'React', 'Node.js'], rate: 55, rating: 4.8, reviews: 32, location: 'Pokhara', availability: 'Available' },
    { name: 'Priya Sharma', headline: 'Content Writer | SEO Specialist', skills: ['Content Writing', 'SEO', 'Copywriting'], rate: 30, rating: 4.7, reviews: 28, location: 'Lalitpur', availability: 'Busy' },
    { name: 'Amit Gurung', headline: 'Video Editor | Motion Graphics', skills: ['Video Editing', 'Animation'], rate: 40, rating: 4.9, reviews: 19, location: 'Bhaktapur', availability: 'Available' },
    { name: 'Sunita Rai', headline: 'Digital Marketer | Social Media Expert', skills: ['Digital Marketing', 'Social Media Management'], rate: 35, rating: 4.6, reviews: 41, location: 'Kathmandu', availability: 'Available' },
    { name: 'Bikash Tamang', headline: 'Logo Designer | Illustrator', skills: ['Logo Design', 'Illustration', 'Graphic Design'], rate: 38, rating: 4.8, reviews: 55, location: 'Chitwan', availability: 'Not Available' }
  ];

  freelancers.forEach((f, i) => {
    const userId = generateId();
    db.users.push({
      user_id: userId,
      full_name: f.name,
      email: f.name.toLowerCase().replace(' ', '.') + '@demo.com',
      phone_number: '98' + (60000000 + i * 1111111),
      password: hashPassword('demo123'),
      role: 'freelancer',
      profile_photo_url: `https://ui-avatars.com/api/?name=${encodeURIComponent(f.name)}&background=1E3A8A&color=fff&size=200`,
      bio: `Experienced professional specializing in ${f.skills[0]}. Passionate about delivering quality work.`,
      location: f.location,
      timezone: 'Asia/Kathmandu',
      created_at: new Date(Date.now() - (i + 1) * 30 * 86400000).toISOString(),
      updated_at: new Date().toISOString(),
      is_verified: true,
      is_active: true,
      profile_complete: true
    });
    db.freelancerDetails.push({
      freelancer_id: userId,
      headline: f.headline,
      skills: f.skills,
      rate_type: 'hourly',
      hourly_rate: f.rate,
      project_rate: f.rate * 10,
      portfolio_links: [{ title: 'Portfolio Project', url: '#', image: `https://picsum.photos/seed/${i + 1}/400/300` }],
      certifications: [],
      languages: ['English', 'Nepali'],
      availability_status: f.availability,
      average_rating: f.rating,
      total_reviews: f.reviews,
      total_earned: f.rate * 100 * (i + 1),
      response_time: '< 2 hours'
    });
  });

  const clients = [
    { name: 'Himal Tech Solutions', industry: 'Technology', location: 'Kathmandu' },
    { name: 'Everest Ventures', industry: 'Finance', location: 'Lalitpur' },
    { name: 'Green Leaf Cafe', industry: 'Hospitality', location: 'Pokhara' }
  ];

  clients.forEach((c, i) => {
    const userId = generateId();
    db.users.push({
      user_id: userId,
      full_name: c.name,
      email: c.name.toLowerCase().replace(/ /g, '') + '@company.com',
      phone_number: '97' + (70000000 + i * 2222222),
      password: hashPassword('demo123'),
      role: 'client',
      profile_photo_url: `https://ui-avatars.com/api/?name=${encodeURIComponent(c.name)}&background=FF6B35&color=fff&size=200`,
      bio: '',
      location: c.location,
      timezone: 'Asia/Kathmandu',
      created_at: new Date(Date.now() - (i + 2) * 20 * 86400000).toISOString(),
      updated_at: new Date().toISOString(),
      is_verified: true,
      is_active: true,
      profile_complete: true
    });
    db.clientDetails.push({
      client_id: userId,
      company_name: c.name,
      industry: c.industry,
      company_description: `Leading ${c.industry.toLowerCase()} company in Nepal.`,
      total_jobs_posted: 3 + i,
      total_spent: 5000 + i * 2000,
      average_rating: 4.5 + i * 0.1,
      total_reviews: 5 + i * 2,
      freelancers_hired: 2 + i
    });
  });

  const clientUsers = db.users.filter(u => u.role === 'client');
  const jobTitles = [
    { title: 'Build a Modern E-commerce Website', category: 'Web Development', budget: 2500, skills: ['Web Development', 'React', 'Node.js'] },
    { title: 'Design Brand Identity for Startup', category: 'Design', budget: 800, skills: ['Logo Design', 'Brand Identity', 'Graphic Design'] },
    { title: 'SEO Content for Blog (10 Articles)', category: 'Writing', budget: 500, skills: ['Content Writing', 'SEO'] },
    { title: 'Social Media Campaign Management', category: 'Marketing', budget: 1200, skills: ['Digital Marketing', 'Social Media Management'] },
    { title: 'Mobile App UI/UX Design', category: 'Design', budget: 1500, skills: ['UI/UX Design', 'Mobile Development'] },
    { title: 'Product Demo Video Production', category: 'Video & Animation', budget: 900, skills: ['Video Editing', 'Animation'] }
  ];

  jobTitles.forEach((j, i) => {
    const clientId = clientUsers[i % clientUsers.length].user_id;
    db.jobs.push({
      job_id: generateId(),
      client_id: clientId,
      title: j.title,
      category: j.category,
      description: `We are looking for a talented professional to help us with ${j.title.toLowerCase()}. This is an exciting opportunity to work with a growing company. The ideal candidate should have relevant experience and a strong portfolio. We value quality work, clear communication, and timely delivery.`,
      skills_required: j.skills,
      budget: j.budget,
      budget_type: 'fixed',
      job_type: i % 2 === 0 ? 'one-time' : 'ongoing',
      deadline: new Date(Date.now() + (14 + i * 7) * 86400000).toISOString().split('T')[0],
      status: 'posted',
      visibility: 'public',
      attachments: [],
      created_at: new Date(Date.now() - i * 2 * 86400000).toISOString(),
      updated_at: new Date().toISOString()
    });
  });
}

function hashPassword(password) {
  let hash = 0;
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return 'hash_' + Math.abs(hash).toString(16);
}

/* CRUD Operations */
const Store = {
  getUsers: () => getDB().users,
  getUser: (id) => getDB().users.find(u => u.user_id === id),
  getUserByEmail: (email) => getDB().users.find(u => u.email.toLowerCase() === email.toLowerCase()),
  getUserByPhone: (phone) => getDB().users.find(u => u.phone_number === phone),
  addUser: (user) => {
    const db = getDB();
    db.users.push(user);
    saveDB(db);
    return user;
  },
  updateUser: (id, updates) => {
    const db = getDB();
    const idx = db.users.findIndex(u => u.user_id === id);
    if (idx === -1) return null;
    db.users[idx] = { ...db.users[idx], ...updates, updated_at: new Date().toISOString() };
    saveDB(db);
    return db.users[idx];
  },

  getFreelancerDetails: (id) => getDB().freelancerDetails.find(f => f.freelancer_id === id),
  addFreelancerDetails: (details) => {
    const db = getDB();
    db.freelancerDetails.push(details);
    saveDB(db);
    return details;
  },
  updateFreelancerDetails: (id, updates) => {
    const db = getDB();
    const idx = db.freelancerDetails.findIndex(f => f.freelancer_id === id);
    if (idx === -1) return null;
    db.freelancerDetails[idx] = { ...db.freelancerDetails[idx], ...updates };
    saveDB(db);
    return db.freelancerDetails[idx];
  },
  getAllFreelancers: () => {
    const db = getDB();
    return db.users.filter(u => u.role === 'freelancer' && u.is_active).map(u => ({
      ...u,
      details: db.freelancerDetails.find(f => f.freelancer_id === u.user_id)
    }));
  },

  getClientDetails: (id) => getDB().clientDetails.find(c => c.client_id === id),
  addClientDetails: (details) => {
    const db = getDB();
    db.clientDetails.push(details);
    saveDB(db);
    return details;
  },
  updateClientDetails: (id, updates) => {
    const db = getDB();
    const idx = db.clientDetails.findIndex(c => c.client_id === id);
    if (idx === -1) return null;
    db.clientDetails[idx] = { ...db.clientDetails[idx], ...updates };
    saveDB(db);
    return db.clientDetails[idx];
  },

  getJobs: (filter) => {
    let jobs = getDB().jobs;
    if (filter) {
      if (filter.client_id) jobs = jobs.filter(j => j.client_id === filter.client_id);
      if (filter.status) jobs = jobs.filter(j => j.status === filter.status);
      if (filter.freelancer_id) {
        const apps = getDB().applications.filter(a => a.freelancer_id === filter.freelancer_id);
        const jobIds = apps.map(a => a.job_id);
        jobs = jobs.filter(j => jobIds.includes(j.job_id) || j.status === 'posted');
      }
    }
    return jobs;
  },
  getJob: (id) => getDB().jobs.find(j => j.job_id === id),
  addJob: (job) => {
    const db = getDB();
    db.jobs.push(job);
    saveDB(db);
    return job;
  },
  updateJob: (id, updates) => {
    const db = getDB();
    const idx = db.jobs.findIndex(j => j.job_id === id);
    if (idx === -1) return null;
    db.jobs[idx] = { ...db.jobs[idx], ...updates, updated_at: new Date().toISOString() };
    saveDB(db);
    return db.jobs[idx];
  },
  deleteJob: (id) => {
    const db = getDB();
    db.jobs = db.jobs.filter(j => j.job_id !== id);
    saveDB(db);
  },

  getApplications: (filter) => {
    let apps = getDB().applications;
    if (filter?.job_id) apps = apps.filter(a => a.job_id === filter.job_id);
    if (filter?.freelancer_id) apps = apps.filter(a => a.freelancer_id === filter.freelancer_id);
    return apps;
  },
  addApplication: (app) => {
    const db = getDB();
    db.applications.push(app);
    saveDB(db);
    return app;
  },
  updateApplication: (id, updates) => {
    const db = getDB();
    const idx = db.applications.findIndex(a => a.application_id === id);
    if (idx === -1) return null;
    db.applications[idx] = { ...db.applications[idx], ...updates };
    saveDB(db);
    return db.applications[idx];
  },

  getConversations: (userId) => getDB().conversations.filter(c => c.participants.includes(userId)),
  getOrCreateConversation: (user1, user2) => {
    const db = getDB();
    let conv = db.conversations.find(c =>
      c.participants.includes(user1) && c.participants.includes(user2)
    );
    if (!conv) {
      conv = { conversation_id: generateId(), participants: [user1, user2], last_message: '', last_message_at: new Date().toISOString(), unread: {} };
      conv.unread[user1] = 0;
      conv.unread[user2] = 0;
      db.conversations.push(conv);
      saveDB(db);
    }
    return conv;
  },
  getMessages: (conversationId) => getDB().messages.filter(m => m.conversation_id === conversationId).sort((a, b) => new Date(a.created_at) - new Date(b.created_at)),
  addMessage: (msg) => {
    const db = getDB();
    db.messages.push(msg);
    const conv = db.conversations.find(c => c.conversation_id === msg.conversation_id);
    if (conv) {
      conv.last_message = msg.content.substring(0, 50);
      conv.last_message_at = msg.created_at;
      const other = conv.participants.find(p => p !== msg.sender_id);
      if (other) conv.unread[other] = (conv.unread[other] || 0) + 1;
    }
    saveDB(db);
    return msg;
  },
  markConversationRead: (conversationId, userId) => {
    const db = getDB();
    const conv = db.conversations.find(c => c.conversation_id === conversationId);
    if (conv) { conv.unread[userId] = 0; saveDB(db); }
  },

  getPayments: (filter) => {
    let payments = getDB().payments;
    if (filter?.client_id) payments = payments.filter(p => p.client_id === filter.client_id);
    if (filter?.freelancer_id) payments = payments.filter(p => p.freelancer_id === filter.freelancer_id);
    if (filter?.job_id) payments = payments.filter(p => p.job_id === filter.job_id);
    return payments;
  },
  addPayment: (payment) => {
    const db = getDB();
    db.payments.push(payment);
    saveDB(db);
    return payment;
  },
  updatePayment: (id, updates) => {
    const db = getDB();
    const idx = db.payments.findIndex(p => p.payment_id === id);
    if (idx === -1) return null;
    db.payments[idx] = { ...db.payments[idx], ...updates };
    saveDB(db);
    return db.payments[idx];
  },

  getReviews: (filter) => {
    let reviews = getDB().reviews;
    if (filter?.reviewee_id) reviews = reviews.filter(r => r.reviewee_id === filter.reviewee_id);
    if (filter?.job_id) reviews = reviews.filter(r => r.job_id === filter.job_id);
    return reviews;
  },
  addReview: (review) => {
    const db = getDB();
    db.reviews.push(review);
    const reviewee = db.users.find(u => u.user_id === review.reviewee_id);
    if (reviewee?.role === 'freelancer') {
      const fd = db.freelancerDetails.find(f => f.freelancer_id === review.reviewee_id);
      if (fd) {
        const allReviews = db.reviews.filter(r => r.reviewee_id === review.reviewee_id);
        fd.total_reviews = allReviews.length;
        fd.average_rating = allReviews.reduce((s, r) => s + r.rating, 0) / allReviews.length;
      }
    } else if (reviewee?.role === 'client') {
      const cd = db.clientDetails.find(c => c.client_id === review.reviewee_id);
      if (cd) {
        const allReviews = db.reviews.filter(r => r.reviewee_id === review.reviewee_id);
        cd.total_reviews = allReviews.length;
        cd.average_rating = allReviews.reduce((s, r) => s + r.rating, 0) / allReviews.length;
      }
    }
    saveDB(db);
    return review;
  },

  getDisputes: (filter) => {
    let disputes = getDB().disputes;
    if (filter?.job_id) disputes = disputes.filter(d => d.job_id === filter.job_id);
    if (filter?.user_id) disputes = disputes.filter(d => d.raised_by === filter.user_id);
    return disputes;
  },
  addDispute: (dispute) => {
    const db = getDB();
    db.disputes.push(dispute);
    const payment = db.payments.find(p => p.job_id === dispute.job_id);
    if (payment) payment.status = 'frozen';
    saveDB(db);
    return dispute;
  },

  getNotifications: (userId) => getDB().notifications.filter(n => n.user_id === userId).sort((a, b) => new Date(b.created_at) - new Date(a.created_at)),
  addNotification: (notif) => {
    const db = getDB();
    db.notifications.push(notif);
    saveDB(db);
    return notif;
  },
  markNotificationsRead: (userId) => {
    const db = getDB();
    db.notifications.filter(n => n.user_id === userId).forEach(n => n.read = true);
    saveDB(db);
  },
  getUnreadNotificationCount: (userId) => getDB().notifications.filter(n => n.user_id === userId && !n.read).length,

  getActivities: (userId) => getDB().activities.filter(a => a.user_id === userId).sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, 10),
  addActivity: (activity) => {
    const db = getDB();
    db.activities.unshift(activity);
    if (db.activities.length > 100) db.activities = db.activities.slice(0, 100);
    saveDB(db);
    return activity;
  },

  addWorkSubmission: (submission) => {
    const db = getDB();
    if (!db.workSubmissions) db.workSubmissions = [];
    db.workSubmissions.push(submission);
    saveDB(db);
    return submission;
  },
  getWorkSubmissions: (filter) => {
    const subs = getDB().workSubmissions || [];
    if (filter?.job_id) return subs.filter(s => s.job_id === filter.job_id);
    return subs;
  },
  updateWorkSubmission: (id, updates) => {
    const db = getDB();
    const idx = (db.workSubmissions || []).findIndex(s => s.submission_id === id);
    if (idx === -1) return null;
    db.workSubmissions[idx] = { ...db.workSubmissions[idx], ...updates };
    saveDB(db);
    return db.workSubmissions[idx];
  },

  addContactSubmission: (sub) => {
    const db = getDB();
    db.contactSubmissions.push(sub);
    saveDB(db);
    return sub;
  },

  getUserSettings: (userId) => {
    const db = getDB();
    if (!db.settings[userId]) {
      db.settings[userId] = {
        email_notifications: true,
        inapp_notifications: true,
        notify_messages: true,
        notify_jobs: true,
        notify_payments: true,
        notify_reviews: true,
        profile_visibility: 'public',
        show_earnings: false
      };
      saveDB(db);
    }
    return db.settings[userId];
  },
  updateUserSettings: (userId, updates) => {
    const db = getDB();
    db.settings[userId] = { ...Store.getUserSettings(userId), ...updates };
    saveDB(db);
    return db.settings[userId];
  },

  resetDB: () => { localStorage.removeItem(DB_KEY); return initDB(); }
};

// Initialize DB on load
getDB();
