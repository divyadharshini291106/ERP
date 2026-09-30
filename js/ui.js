// ============================================================
// ui.js — Shared UI helpers: toast, modal, sidebar, topbar
// ============================================================

const UI = {
  // ---- Toast Notifications ----
  toast(message, type = 'success', duration = 3200) {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      document.body.appendChild(container);
    }
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    const icons = { success: '✓', error: '✕', info: 'ℹ', warning: '⚠' };
    toast.innerHTML = `<span class="toast-icon">${icons[type] || '•'}</span><span>${message}</span>`;
    container.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add('show'));
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 400);
    }, duration);
  },

  // ---- Modal ----
  openModal(id) {
    const modal = document.getElementById(id);
    if (modal) { modal.classList.add('active'); modal.setAttribute('aria-hidden', 'false'); }
  },
  closeModal(id) {
    const modal = document.getElementById(id);
    if (modal) { modal.classList.remove('active'); modal.setAttribute('aria-hidden', 'true'); }
  },
  createModal(id, title, bodyHTML, footerHTML = '') {
    let m = document.getElementById(id);
    if (m) m.remove();
    m = document.createElement('div');
    m.id = id;
    m.className = 'modal-overlay';
    m.setAttribute('role', 'dialog');
    m.setAttribute('aria-modal', 'true');
    m.setAttribute('aria-hidden', 'true');
    m.setAttribute('aria-labelledby', id + '-title');
    m.innerHTML = `
      <div class="modal">
        <div class="modal-header">
          <h2 id="${id}-title">${title}</h2>
          <button class="modal-close" aria-label="Close modal" onclick="UI.closeModal('${id}')">&times;</button>
        </div>
        <div class="modal-body">${bodyHTML}</div>
        ${footerHTML ? `<div class="modal-footer">${footerHTML}</div>` : ''}
      </div>`;
    document.body.appendChild(m);
    m.addEventListener('click', e => { if (e.target === m) UI.closeModal(id); });
    return m;
  },

  // ---- Confirm Dialog ----
  confirm(message, onConfirm) {
    const id = 'confirm-modal';
    UI.createModal(id, 'Confirm Action',
      `<p>${message}</p>`,
      `<button class="btn btn-danger" onclick="document.getElementById('${id}').remove();(${onConfirm.toString()})()">Yes, Delete</button>
       <button class="btn btn-secondary" onclick="document.getElementById('${id}').remove()">Cancel</button>`
    );
    UI.openModal(id);
  },

  // ---- Sidebar ----
  buildSidebar(navItems, activeId) {
    const nav = document.getElementById('sidebar-nav');
    if (!nav) return;
    nav.innerHTML = navItems.map(item => `
      <li>
        <a href="#" class="nav-link ${item.id === activeId ? 'active' : ''}" data-section="${item.id}" aria-current="${item.id === activeId ? 'page' : 'false'}">
          <span class="nav-icon" aria-hidden="true">${item.icon}</span>
          <span>${item.label}</span>
        </a>
      </li>`).join('');
    nav.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault();
        const sec = link.dataset.section;
        nav.querySelectorAll('.nav-link').forEach(l => { l.classList.remove('active'); l.setAttribute('aria-current','false'); });
        link.classList.add('active'); link.setAttribute('aria-current','page');
        document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
        const target = document.getElementById('sec-' + sec);
        if (target) target.classList.add('active');
        // Close sidebar on mobile
        document.getElementById('sidebar')?.classList.remove('open');
      });
    });
  },

  // ---- Topbar ----
  buildTopbar(session) {
    const nameEl = document.getElementById('user-name');
    const roleEl = document.getElementById('user-role');
    if (nameEl) {
      if (session.role === 'admin') {
        nameEl.textContent = 'Administrator';
      } else if (session.role === 'staff') {
        const staffList = DB.get(DB.KEYS.staff);
        const s = staffList.find(st => st.id === session.profileId);
        nameEl.textContent = s ? s.name : session.username;
      } else {
        const studentList = DB.get(DB.KEYS.students);
        const s = studentList.find(st => st.id === session.profileId);
        nameEl.textContent = s ? s.name : session.username;
      }
    }
    if (roleEl) roleEl.textContent = session.role.charAt(0).toUpperCase() + session.role.slice(1);
  },

  // ---- Table helper ----
  renderTable(containerId, columns, rows, actions) {
    const container = document.getElementById(containerId);
    if (!container) return;
    if (!rows.length) {
      container.innerHTML = '<div class="empty-state"><p>No records found.</p></div>';
      return;
    }
    const thead = columns.map(c => `<th scope="col" ${c.sort ? `data-sort="${c.key}" class="sortable" tabindex="0"` : ''}>${c.label}${c.sort ? ' <span class="sort-icon">⇅</span>' : ''}</th>`).join('');
    const tbody = rows.map(row => {
      const cells = columns.map(c => `<td data-label="${c.label}">${c.render ? c.render(row) : (row[c.key] ?? '')}</td>`).join('');
      const actionCells = actions ? `<td data-label="Actions" class="action-cell">${actions(row)}</td>` : '';
      return `<tr>${cells}${actionCells}</tr>`;
    }).join('');
    const actionHeader = actions ? '<th scope="col">Actions</th>' : '';
    container.innerHTML = `
      <div class="table-wrapper" role="region" aria-label="Data table" tabindex="0">
        <table class="data-table">
          <thead><tr>${thead}${actionHeader}</tr></thead>
          <tbody>${tbody}</tbody>
        </table>
      </div>`;
    // Sort
    container.querySelectorAll('th.sortable').forEach(th => {
      th.addEventListener('click', () => {
        const key = th.dataset.sort;
        const asc = th.dataset.asc !== 'true';
        th.dataset.asc = asc;
        const tbl = container.querySelector('tbody');
        const trs = Array.from(tbl.querySelectorAll('tr'));
        const cols = columns.map(c => c.key);
        const idx = cols.indexOf(key);
        trs.sort((a, b) => {
          const av = a.cells[idx]?.textContent.trim() || '';
          const bv = b.cells[idx]?.textContent.trim() || '';
          return asc ? av.localeCompare(bv, undefined, {numeric:true}) : bv.localeCompare(av, undefined, {numeric:true});
        });
        trs.forEach(tr => tbl.appendChild(tr));
        container.querySelectorAll('th.sortable').forEach(t => t.querySelector('.sort-icon').textContent = '⇅');
        th.querySelector('.sort-icon').textContent = asc ? '↑' : '↓';
      });
      th.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); th.click(); }});
    });
  },

  // ---- Stat Card ----
  statCard(label, value, icon, extra = '') {
    return `<div class="stat-card"><div class="stat-icon" aria-hidden="true">${icon}</div><div class="stat-body"><div class="stat-value">${value}</div><div class="stat-label">${label}</div>${extra ? `<div class="stat-extra">${extra}</div>` : ''}</div></div>`;
  },

  // ---- Grade helper ----
  grade(pct) {
    if (pct >= 90) return 'O';
    if (pct >= 80) return 'A+';
    if (pct >= 70) return 'A';
    if (pct >= 60) return 'B+';
    if (pct >= 50) return 'B';
    if (pct >= 40) return 'C';
    return 'F';
  },

  // ---- Mobile sidebar toggle ----
  initMobileSidebar() {
    const toggle = document.getElementById('sidebar-toggle');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    if (toggle && sidebar) {
      toggle.addEventListener('click', () => {
        sidebar.classList.toggle('open');
        if (overlay) overlay.classList.toggle('active');
      });
    }
    if (overlay) {
      overlay.addEventListener('click', () => {
        sidebar.classList.remove('open');
        overlay.classList.remove('active');
      });
    }
  },
};
