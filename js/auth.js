// ============================================================
// auth.js — Authentication, session management, route guard
// ============================================================

const Auth = {
  SESSION_KEY: 'erp_session',

  login(username, password, role) {
    const users = DB.get(DB.KEYS.users);
    const user = users.find(u => u.username === username && u.password === password);
    if (!user) return { ok: false, error: 'Invalid username or password.' };
    if (user.role !== role) return { ok: false, error: `This account is not a ${role} account. Please select the correct role.` };
    const session = { userId: user.id, username: user.username, role: user.role, profileId: user.profileId };
    sessionStorage.setItem(this.SESSION_KEY, JSON.stringify(session));
    return { ok: true, session };
  },

  logout() {
    sessionStorage.removeItem(this.SESSION_KEY);
    window.location.href = 'index.html';
  },

  getSession() {
    try { return JSON.parse(sessionStorage.getItem(this.SESSION_KEY)); }
    catch { return null; }
  },

  requireRole(role) {
    const session = this.getSession();
    if (!session) { window.location.href = 'index.html'; return null; }
    if (session.role !== role) { window.location.href = 'index.html'; return null; }
    return session;
  },
};
