# MIT College ERP — College Management System

A fully client-side College ERP (Enterprise Resource Planning) web application for **Mangalore Institute of Technology (MIT)**. No backend, no build step — just open `index.html`.

---

## 🚀 Quick Start

### Option 1 — Open directly in browser
```
Open d:\ERP\index.html in any modern browser (Chrome, Edge, Firefox, Safari).
```

### Option 2 — Serve locally (recommended to avoid any CORS issues)
```bash
# Python 3
cd d:\ERP
python -m http.server 8080

# Then open: http://localhost:8080
```

```bash
# Node.js (npx)
cd d:\ERP
npx serve .

# Then open: http://localhost:3000
```

---

## 🔑 Demo Credentials

| Role    | Username  | Password   |
|---------|-----------|------------|
| Admin   | admin     | admin123   |
| Staff   | staff1    | staff123   |
| Student | student1  | student123 |

> Additional staff logins: `staff2`–`staff8` (password: `staff123`)  
> Additional student logins: `student2`, `student3` (password: `student123`)

---

## 📁 File Structure

```
ERP/
├── index.html        # Login page (entry point)
├── admin.html        # Admin portal
├── staff.html        # Staff portal
├── student.html      # Student portal
├── css/
│   └── styles.css    # All styles (responsive, role-themed)
├── js/
│   ├── auth.js       # Authentication, session management, route guard
│   ├── data.js       # Seed data + localStorage CRUD helpers
│   └── ui.js         # Shared UI components (toast, modal, table, sidebar)
└── README.md
```

---

## 🗃 Data Model (localStorage)

| Key                  | Contents                                      |
|----------------------|-----------------------------------------------|
| `erp_users`          | User accounts (username, password, role)      |
| `erp_students`       | 30 students across 3 departments              |
| `erp_staff`          | 8 staff members with assigned subjects        |
| `erp_departments`    | CSE, ECE, ME                                  |
| `erp_courses`        | 5 courses                                     |
| `erp_subjects`       | 10 subjects mapped to departments             |
| `erp_timetable`      | Weekly timetable for all departments          |
| `erp_attendance`     | Attendance records for past 2 weeks           |
| `erp_marks`          | Internal marks for all students               |
| `erp_fees`           | Fee records with payment history              |
| `erp_announcements`  | 3 sample announcements                        |

---

## ✨ Features

### 🛡 Admin Portal
- **Dashboard** — Student/staff/dept counts, today's attendance %, department chart, announcements
- **Students** — Add/edit/delete with search, dept + year filter, auto-creates login credentials
- **Staff** — Add/edit/delete, assign subjects, auto-creates login
- **Departments & Courses** — Full CRUD
- **Fees** — View all fees, record payments, view history, filter by status
- **Announcements** — Post/edit/delete, target staff and/or students

### 👨‍🏫 Staff Portal
- **Dashboard** — Today's classes, my subjects, recent announcements
- **Mark Attendance** — Date + subject picker, present/absent toggle per student, bulk mark-all, save
- **Internal Marks** — Per-subject marks entry with live total, save to localStorage
- **My Students** — Searchable list of students in my department
- **Timetable** — Weekly view with today highlighted

### 🎓 Student Portal
- **Dashboard** — Attendance overview bars, fee status, marks summary, announcements
- **Profile** — Read-only personal details, request-edit button
- **Attendance Report** — Per-subject bars, ⚠ warning if below 75%
- **Marks / Report Card** — Subject-wise marks, grade (O/A+/A/B+/B/C/F), overall score
- **Fee Status** — Summary cards, payment history table, pending warning
- **Timetable** — Weekly view with today highlighted

---

## 🔒 Security Model

- Login is validated against seeded users in localStorage
- Session stored in **sessionStorage** (cleared on tab/browser close)
- Every portal page has a **route guard** — direct URL access without login redirects to `index.html`
- Wrong role selection shows a clear error message

---

## 🔄 Reset Demo Data

Click **"Reset Demo Data"** on the login page, or run in browser console:
```js
resetDemoData();
location.reload();
```

---

## 🌐 Browser Compatibility

Chrome 90+, Firefox 88+, Safari 14+, Edge 90+

---

## 📐 Technical Notes

- **No frameworks** — Pure HTML5, CSS3, Vanilla JavaScript (ES6+)
- **No build step** — Works offline, no npm install needed
- **Responsive** — Mobile sidebar with overlay, stacked table cells on small screens
- **Accessible** — ARIA labels, roles, keyboard navigation, focus states, sufficient contrast
- **Accent colours** — Admin = Indigo, Staff = Sky Blue, Student = Emerald Green
