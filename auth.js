/* FreelanceFactory - Authentication */
const Auth = {
  SESSION_KEY: 'ff_session',
  OTP_KEY: 'ff_pending_otp',

  getSession() {
    const data = sessionStorage.getItem(this.SESSION_KEY);
    return data ? JSON.parse(data) : null;
  },

  setSession(user) {
    sessionStorage.setItem(this.SESSION_KEY, JSON.stringify({
      user_id: user.user_id,
      role: user.role,
      full_name: user.full_name,
      email: user.email
    }));
  },

  clearSession() {
    sessionStorage.removeItem(this.SESSION_KEY);
    sessionStorage.removeItem(this.OTP_KEY);
  },

  getCurrentUser() {
    const session = this.getSession();
    if (!session) return null;
    return Store.getUser(session.user_id);
  },

  isLoggedIn() {
    return !!this.getSession();
  },

  requireAuth(redirectTo = 'login.html') {
    if (!this.isLoggedIn()) {
      window.location.href = redirectTo + '?redirect=' + encodeURIComponent(window.location.pathname.split('/').pop());
      return false;
    }
    return true;
  },

  requireRole(role, redirectTo = 'index.html') {
    const user = this.getCurrentUser();
    if (!user || user.role !== role) {
      window.location.href = redirectTo;
      return false;
    }
    return true;
  },

  login(identifier, password, remember) {
    let user = Store.getUserByEmail(identifier);
    if (!user) user = Store.getUserByPhone(identifier);
    if (!user) return { success: false, message: 'No account found with that email or phone.' };
    if (user.password !== hashPassword(password)) return { success: false, message: 'Incorrect password.' };
    if (!user.is_active) return { success: false, message: 'Your account has been deactivated.' };

    this.setSession(user);
    if (remember) localStorage.setItem('ff_remember', identifier);

    Store.addActivity({
      activity_id: generateId(),
      user_id: user.user_id,
      type: 'login',
      message: 'You logged in',
      created_at: new Date().toISOString()
    });

    return { success: true, user };
  },

  logout() {
    this.clearSession();
    window.location.href = 'index.html';
  },

  register(data) {
    if (Store.getUserByEmail(data.email)) return { success: false, message: 'Email already registered.' };
    if (Store.getUserByPhone(data.phone)) return { success: false, message: 'Phone number already registered.' };
    if (data.password !== data.confirmPassword) return { success: false, message: 'Passwords do not match.' };
    if (data.password.length < 6) return { success: false, message: 'Password must be at least 6 characters.' };

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const pendingUser = {
      full_name: data.fullName,
      email: data.email,
      phone_number: data.phone,
      password: hashPassword(data.password),
      role: data.role,
      otp,
      created_at: new Date().toISOString()
    };

    sessionStorage.setItem(this.OTP_KEY, JSON.stringify(pendingUser));
    return { success: true, otp, message: 'Verification code sent to your email.' };
  },

  verifyOTP(code) {
    const pending = JSON.parse(sessionStorage.getItem(this.OTP_KEY) || 'null');
    if (!pending) return { success: false, message: 'No pending registration found.' };
    if (pending.otp !== code) return { success: false, message: 'Invalid verification code.' };

    const userId = generateId();
    const user = {
      user_id: userId,
      full_name: pending.full_name,
      email: pending.email,
      phone_number: pending.phone_number,
      password: pending.password,
      role: pending.role,
      profile_photo_url: `https://ui-avatars.com/api/?name=${encodeURIComponent(pending.full_name)}&background=1E3A8A&color=fff&size=200`,
      bio: '',
      location: '',
      timezone: 'Asia/Kathmandu',
      created_at: pending.created_at,
      updated_at: new Date().toISOString(),
      is_verified: true,
      is_active: true,
      profile_complete: false
    };

    Store.addUser(user);
    sessionStorage.removeItem(this.OTP_KEY);
    this.setSession(user);

    return { success: true, user };
  },

  resendOTP() {
    const pending = JSON.parse(sessionStorage.getItem(this.OTP_KEY) || 'null');
    if (!pending) return { success: false, message: 'No pending registration.' };
    pending.otp = Math.floor(100000 + Math.random() * 900000).toString();
    sessionStorage.setItem(this.OTP_KEY, JSON.stringify(pending));
    return { success: true, otp: pending.otp };
  }
};
