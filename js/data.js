// ============================================================
// data.js — Seed data, localStorage CRUD helpers
// ============================================================

const DB = {
  KEYS: {
    users: 'erp_users',
    students: 'erp_students',
    staff: 'erp_staff',
    departments: 'erp_departments',
    courses: 'erp_courses',
    subjects: 'erp_subjects',
    timetable: 'erp_timetable',
    attendance: 'erp_attendance',
    marks: 'erp_marks',
    fees: 'erp_fees',
    announcements: 'erp_announcements',
    seeded: 'erp_seeded',
  },

  get(key) {
    try { return JSON.parse(localStorage.getItem(key)) || []; }
    catch { return []; }
  },

  set(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  },

  getOne(key, id) {
    return this.get(key).find(r => r.id === id) || null;
  },

  insert(key, record) {
    const list = this.get(key);
    list.push(record);
    this.set(key, list);
    return record;
  },

  update(key, id, updates) {
    const list = this.get(key).map(r => r.id === id ? { ...r, ...updates } : r);
    this.set(key, list);
    return list.find(r => r.id === id);
  },

  remove(key, id) {
    const list = this.get(key).filter(r => r.id !== id);
    this.set(key, list);
  },

  nextId(key) {
    const list = this.get(key);
    if (!list.length) return 1;
    return Math.max(...list.map(r => r.id || 0)) + 1;
  }
};

// ============================================================
// Seed Data
// ============================================================
function seedData() {
  if (localStorage.getItem(DB.KEYS.seeded) === 'true') return;

  // --- Departments ---
  const departments = [
    { id: 1, name: 'Computer Science & Engineering', code: 'CSE' },
    { id: 2, name: 'Electronics & Communication Engineering', code: 'ECE' },
    { id: 3, name: 'Mechanical Engineering', code: 'ME' },
  ];
  DB.set(DB.KEYS.departments, departments);

  // --- Courses ---
  const courses = [
    { id: 1, name: 'B.Tech Computer Science', deptId: 1, duration: 4 },
    { id: 2, name: 'M.Tech Computer Science', deptId: 1, duration: 2 },
    { id: 3, name: 'B.Tech Electronics', deptId: 2, duration: 4 },
    { id: 4, name: 'B.Tech Mechanical', deptId: 3, duration: 4 },
    { id: 5, name: 'Diploma Mechanical', deptId: 3, duration: 3 },
  ];
  DB.set(DB.KEYS.courses, courses);

  // --- Subjects ---
  const subjects = [
    { id: 1, name: 'Data Structures & Algorithms', code: 'CS201', deptId: 1 },
    { id: 2, name: 'Database Management Systems', code: 'CS202', deptId: 1 },
    { id: 3, name: 'Operating Systems', code: 'CS203', deptId: 1 },
    { id: 4, name: 'Computer Networks', code: 'CS204', deptId: 1 },
    { id: 5, name: 'Software Engineering', code: 'CS205', deptId: 1 },
    { id: 6, name: 'Digital Electronics', code: 'EC201', deptId: 2 },
    { id: 7, name: 'Signals & Systems', code: 'EC202', deptId: 2 },
    { id: 8, name: 'VLSI Design', code: 'EC203', deptId: 2 },
    { id: 9, name: 'Thermodynamics', code: 'ME201', deptId: 3 },
    { id: 10, name: 'Fluid Mechanics', code: 'ME202', deptId: 3 },
  ];
  DB.set(DB.KEYS.subjects, subjects);

  // --- Staff ---
  const staff = [
    { id: 1, name: 'Dr. Rajesh Kumar', empId: 'EMP001', deptId: 1, subjects: [1, 2], phone: '9876543210', email: 'rajesh.kumar@mit.edu.in', designation: 'Professor' },
    { id: 2, name: 'Prof. Anitha Rajan', empId: 'EMP002', deptId: 1, subjects: [3, 4], phone: '9876543211', email: 'anitha.rajan@mit.edu.in', designation: 'Associate Professor' },
    { id: 3, name: 'Dr. Suresh Babu', empId: 'EMP003', deptId: 1, subjects: [5], phone: '9876543212', email: 'suresh.babu@mit.edu.in', designation: 'Assistant Professor' },
    { id: 4, name: 'Dr. Priya Nair', empId: 'EMP004', deptId: 2, subjects: [6, 7], phone: '9876543213', email: 'priya.nair@mit.edu.in', designation: 'Professor' },
    { id: 5, name: 'Prof. Kiran Menon', empId: 'EMP005', deptId: 2, subjects: [8], phone: '9876543214', email: 'kiran.menon@mit.edu.in', designation: 'Associate Professor' },
    { id: 6, name: 'Dr. Venkat Rao', empId: 'EMP006', deptId: 3, subjects: [9, 10], phone: '9876543215', email: 'venkat.rao@mit.edu.in', designation: 'Professor' },
    { id: 7, name: 'Prof. Lakshmi Devi', empId: 'EMP007', deptId: 3, subjects: [9], phone: '9876543216', email: 'lakshmi.devi@mit.edu.in', designation: 'Assistant Professor' },
    { id: 8, name: 'Dr. Mohan Krishnan', empId: 'EMP008', deptId: 1, subjects: [1, 3], phone: '9876543217', email: 'mohan.krishnan@mit.edu.in', designation: 'Associate Professor' },
  ];
  DB.set(DB.KEYS.staff, staff);

  // --- Students ---
  const students = [
    { id: 1,  name: 'Arjun Sharma',      rollNo: 'CSE2021001', deptId: 1, courseId: 1, year: 3, phone: '8765432100', email: 'arjun.sharma@student.mit.edu.in',      gender: 'Male',   dob: '2002-05-15', address: '12, MG Road, Bangalore' },
    { id: 2,  name: 'Priya Patel',       rollNo: 'CSE2021002', deptId: 1, courseId: 1, year: 3, phone: '8765432101', email: 'priya.patel@student.mit.edu.in',       gender: 'Female', dob: '2002-08-22', address: '45, Residency Road, Bangalore' },
    { id: 3,  name: 'Rohit Verma',       rollNo: 'CSE2021003', deptId: 1, courseId: 1, year: 3, phone: '8765432102', email: 'rohit.verma@student.mit.edu.in',       gender: 'Male',   dob: '2001-11-30', address: '78, Jayanagar, Bangalore' },
    { id: 4,  name: 'Sneha Iyer',        rollNo: 'CSE2021004', deptId: 1, courseId: 1, year: 3, phone: '8765432103', email: 'sneha.iyer@student.mit.edu.in',        gender: 'Female', dob: '2002-03-10', address: '23, Indiranagar, Bangalore' },
    { id: 5,  name: 'Karthik Nair',      rollNo: 'CSE2021005', deptId: 1, courseId: 1, year: 3, phone: '8765432104', email: 'karthik.nair@student.mit.edu.in',      gender: 'Male',   dob: '2001-07-25', address: '56, Koramangala, Bangalore' },
    { id: 6,  name: 'Divya Menon',       rollNo: 'CSE2021006', deptId: 1, courseId: 1, year: 3, phone: '8765432105', email: 'divya.menon@student.mit.edu.in',       gender: 'Female', dob: '2002-01-18', address: '89, HSR Layout, Bangalore' },
    { id: 7,  name: 'Arun Kumar',        rollNo: 'CSE2021007', deptId: 1, courseId: 1, year: 3, phone: '8765432106', email: 'arun.kumar@student.mit.edu.in',        gender: 'Male',   dob: '2001-09-05', address: '34, BTM Layout, Bangalore' },
    { id: 8,  name: 'Meera Rajesh',      rollNo: 'CSE2021008', deptId: 1, courseId: 1, year: 3, phone: '8765432107', email: 'meera.rajesh@student.mit.edu.in',      gender: 'Female', dob: '2002-06-12', address: '67, Whitefield, Bangalore' },
    { id: 9,  name: 'Vijay Krishnan',    rollNo: 'CSE2021009', deptId: 1, courseId: 1, year: 3, phone: '8765432108', email: 'vijay.krishnan@student.mit.edu.in',    gender: 'Male',   dob: '2001-12-20', address: '90, Electronic City, Bangalore' },
    { id: 10, name: 'Ananya Suresh',     rollNo: 'CSE2021010', deptId: 1, courseId: 1, year: 3, phone: '8765432109', email: 'ananya.suresh@student.mit.edu.in',     gender: 'Female', dob: '2002-04-08', address: '12, Marathahalli, Bangalore' },
    { id: 11, name: 'Suresh Babu',       rollNo: 'ECE2021001', deptId: 2, courseId: 3, year: 3, phone: '8765432110', email: 'suresh.b@student.mit.edu.in',          gender: 'Male',   dob: '2002-02-14', address: '45, Hebbal, Bangalore' },
    { id: 12, name: 'Kavitha Reddy',     rollNo: 'ECE2021002', deptId: 2, courseId: 3, year: 3, phone: '8765432111', email: 'kavitha.reddy@student.mit.edu.in',     gender: 'Female', dob: '2001-10-30', address: '78, Yelahanka, Bangalore' },
    { id: 13, name: 'Rajan Pillai',      rollNo: 'ECE2021003', deptId: 2, courseId: 3, year: 3, phone: '8765432112', email: 'rajan.pillai@student.mit.edu.in',      gender: 'Male',   dob: '2002-07-17', address: '23, Rajajinagar, Bangalore' },
    { id: 14, name: 'Pooja Sharma',      rollNo: 'ECE2021004', deptId: 2, courseId: 3, year: 3, phone: '8765432113', email: 'pooja.sharma@student.mit.edu.in',      gender: 'Female', dob: '2001-05-28', address: '56, Malleswaram, Bangalore' },
    { id: 15, name: 'Manoj Tiwari',      rollNo: 'ECE2021005', deptId: 2, courseId: 3, year: 3, phone: '8765432114', email: 'manoj.tiwari@student.mit.edu.in',      gender: 'Male',   dob: '2002-09-03', address: '89, Vijayanagar, Bangalore' },
    { id: 16, name: 'Nithya Kumari',     rollNo: 'ECE2021006', deptId: 2, courseId: 3, year: 3, phone: '8765432115', email: 'nithya.kumari@student.mit.edu.in',     gender: 'Female', dob: '2001-11-11', address: '34, Banashankari, Bangalore' },
    { id: 17, name: 'Shankar Prasad',    rollNo: 'ME2021001',  deptId: 3, courseId: 4, year: 3, phone: '8765432116', email: 'shankar.prasad@student.mit.edu.in',    gender: 'Male',   dob: '2002-03-25', address: '67, JP Nagar, Bangalore' },
    { id: 18, name: 'Anu George',        rollNo: 'ME2021002',  deptId: 3, courseId: 4, year: 3, phone: '8765432117', email: 'anu.george@student.mit.edu.in',        gender: 'Female', dob: '2001-08-15', address: '90, Kengeri, Bangalore' },
    { id: 19, name: 'Deepak Singh',      rollNo: 'ME2021003',  deptId: 3, courseId: 4, year: 3, phone: '8765432118', email: 'deepak.singh@student.mit.edu.in',      gender: 'Male',   dob: '2002-01-02', address: '12, Padmanabhanagar, Bangalore' },
    { id: 20, name: 'Rekha Pillai',      rollNo: 'ME2021004',  deptId: 3, courseId: 4, year: 3, phone: '8765432119', email: 'rekha.pillai@student.mit.edu.in',      gender: 'Female', dob: '2001-06-20', address: '45, Nagarbhavi, Bangalore' },
    { id: 21, name: 'Sanjay Rao',        rollNo: 'CSE2022001', deptId: 1, courseId: 1, year: 2, phone: '8765432120', email: 'sanjay.rao@student.mit.edu.in',        gender: 'Male',   dob: '2003-04-12', address: '78, Basavangudi, Bangalore' },
    { id: 22, name: 'Latha Krishnan',    rollNo: 'CSE2022002', deptId: 1, courseId: 1, year: 2, phone: '8765432121', email: 'latha.krishnan@student.mit.edu.in',    gender: 'Female', dob: '2003-09-28', address: '23, Chamarajpet, Bangalore' },
    { id: 23, name: 'Nikhil Gupta',      rollNo: 'CSE2022003', deptId: 1, courseId: 1, year: 2, phone: '8765432122', email: 'nikhil.gupta@student.mit.edu.in',      gender: 'Male',   dob: '2003-02-15', address: '56, Gavipuram, Bangalore' },
    { id: 24, name: 'Swathi Menon',      rollNo: 'CSE2022004', deptId: 1, courseId: 1, year: 2, phone: '8765432123', email: 'swathi.menon@student.mit.edu.in',      gender: 'Female', dob: '2003-07-08', address: '89, Rajendranagar, Bangalore' },
    { id: 25, name: 'Rahul Dev',         rollNo: 'ECE2022001', deptId: 2, courseId: 3, year: 2, phone: '8765432124', email: 'rahul.dev@student.mit.edu.in',         gender: 'Male',   dob: '2003-11-22', address: '34, Shankarapuram, Bangalore' },
    { id: 26, name: 'Gayathri Nair',     rollNo: 'ECE2022002', deptId: 2, courseId: 3, year: 2, phone: '8765432125', email: 'gayathri.nair@student.mit.edu.in',     gender: 'Female', dob: '2003-05-05', address: '67, Sadashivanagar, Bangalore' },
    { id: 27, name: 'Praveen Kumar',     rollNo: 'ME2022001',  deptId: 3, courseId: 4, year: 2, phone: '8765432126', email: 'praveen.kumar@student.mit.edu.in',     gender: 'Male',   dob: '2003-08-18', address: '90, Devanahalli, Bangalore' },
    { id: 28, name: 'Sindhu Raj',        rollNo: 'ME2022002',  deptId: 3, courseId: 4, year: 2, phone: '8765432127', email: 'sindhu.raj@student.mit.edu.in',        gender: 'Female', dob: '2003-01-30', address: '12, Doddaballapur, Bangalore' },
    { id: 29, name: 'Vishnu Prasad',     rollNo: 'CSE2023001', deptId: 1, courseId: 1, year: 1, phone: '8765432128', email: 'vishnu.prasad@student.mit.edu.in',     gender: 'Male',   dob: '2004-06-10', address: '45, Hoskote, Bangalore' },
    { id: 30, name: 'Anushka Sharma',    rollNo: 'CSE2023002', deptId: 1, courseId: 1, year: 1, phone: '8765432129', email: 'anushka.sharma@student.mit.edu.in',    gender: 'Female', dob: '2004-10-25', address: '78, Anekal, Bangalore' },
  ];
  DB.set(DB.KEYS.students, students);

  // --- Users ---
  const users = [
    { id: 1,  username: 'admin',    password: 'admin123',  role: 'admin',   profileId: null },
    { id: 2,  username: 'staff1',   password: 'staff123',  role: 'staff',   profileId: 1 },
    { id: 3,  username: 'staff2',   password: 'staff123',  role: 'staff',   profileId: 2 },
    { id: 4,  username: 'staff3',   password: 'staff123',  role: 'staff',   profileId: 3 },
    { id: 5,  username: 'staff4',   password: 'staff123',  role: 'staff',   profileId: 4 },
    { id: 6,  username: 'staff5',   password: 'staff123',  role: 'staff',   profileId: 5 },
    { id: 7,  username: 'staff6',   password: 'staff123',  role: 'staff',   profileId: 6 },
    { id: 8,  username: 'staff7',   password: 'staff123',  role: 'staff',   profileId: 7 },
    { id: 9,  username: 'staff8',   password: 'staff123',  role: 'staff',   profileId: 8 },
    { id: 10, username: 'student1', password: 'student123', role: 'student', profileId: 1 },
    { id: 11, username: 'student2', password: 'student123', role: 'student', profileId: 2 },
    { id: 12, username: 'student3', password: 'student123', role: 'student', profileId: 3 },
  ];
  DB.set(DB.KEYS.users, users);

  // --- Timetable (CSE Year 3) ---
  const timetable = [
    // Monday
    { id: 1,  day: 'Monday',    period: 1, time: '09:00-10:00', subjectId: 1, staffId: 1, room: 'CS301', deptId: 1 },
    { id: 2,  day: 'Monday',    period: 2, time: '10:00-11:00', subjectId: 2, staffId: 1, room: 'CS301', deptId: 1 },
    { id: 3,  day: 'Monday',    period: 3, time: '11:15-12:15', subjectId: 3, staffId: 2, room: 'CS301', deptId: 1 },
    { id: 4,  day: 'Monday',    period: 4, time: '13:00-14:00', subjectId: 4, staffId: 2, room: 'CS301', deptId: 1 },
    { id: 5,  day: 'Monday',    period: 5, time: '14:00-15:00', subjectId: 5, staffId: 3, room: 'CS301', deptId: 1 },
    // Tuesday
    { id: 6,  day: 'Tuesday',   period: 1, time: '09:00-10:00', subjectId: 2, staffId: 1, room: 'CS301', deptId: 1 },
    { id: 7,  day: 'Tuesday',   period: 2, time: '10:00-11:00', subjectId: 3, staffId: 2, room: 'CS301', deptId: 1 },
    { id: 8,  day: 'Tuesday',   period: 3, time: '11:15-12:15', subjectId: 1, staffId: 8, room: 'CS302', deptId: 1 },
    { id: 9,  day: 'Tuesday',   period: 4, time: '13:00-14:00', subjectId: 5, staffId: 3, room: 'CS301', deptId: 1 },
    { id: 10, day: 'Tuesday',   period: 5, time: '14:00-15:00', subjectId: 4, staffId: 2, room: 'CS301', deptId: 1 },
    // Wednesday
    { id: 11, day: 'Wednesday', period: 1, time: '09:00-10:00', subjectId: 1, staffId: 1, room: 'CS301', deptId: 1 },
    { id: 12, day: 'Wednesday', period: 2, time: '10:00-11:00', subjectId: 4, staffId: 2, room: 'CS301', deptId: 1 },
    { id: 13, day: 'Wednesday', period: 3, time: '11:15-12:15', subjectId: 2, staffId: 1, room: 'CS302', deptId: 1 },
    { id: 14, day: 'Wednesday', period: 4, time: '13:00-14:00', subjectId: 3, staffId: 2, room: 'CS301', deptId: 1 },
    { id: 15, day: 'Wednesday', period: 5, time: '14:00-15:00', subjectId: 5, staffId: 3, room: 'CS303', deptId: 1 },
    // Thursday
    { id: 16, day: 'Thursday',  period: 1, time: '09:00-10:00', subjectId: 3, staffId: 2, room: 'CS301', deptId: 1 },
    { id: 17, day: 'Thursday',  period: 2, time: '10:00-11:00', subjectId: 5, staffId: 3, room: 'CS301', deptId: 1 },
    { id: 18, day: 'Thursday',  period: 3, time: '11:15-12:15', subjectId: 2, staffId: 1, room: 'CS302', deptId: 1 },
    { id: 19, day: 'Thursday',  period: 4, time: '13:00-14:00', subjectId: 1, staffId: 8, room: 'CS301', deptId: 1 },
    { id: 20, day: 'Thursday',  period: 5, time: '14:00-15:00', subjectId: 4, staffId: 2, room: 'CS301', deptId: 1 },
    // Friday
    { id: 21, day: 'Friday',    period: 1, time: '09:00-10:00', subjectId: 4, staffId: 2, room: 'CS301', deptId: 1 },
    { id: 22, day: 'Friday',    period: 2, time: '10:00-11:00', subjectId: 1, staffId: 1, room: 'CS301', deptId: 1 },
    { id: 23, day: 'Friday',    period: 3, time: '11:15-12:15', subjectId: 5, staffId: 3, room: 'CS302', deptId: 1 },
    { id: 24, day: 'Friday',    period: 4, time: '13:00-14:00', subjectId: 2, staffId: 1, room: 'CS301', deptId: 1 },
    { id: 25, day: 'Friday',    period: 5, time: '14:00-15:00', subjectId: 3, staffId: 2, room: 'CS303', deptId: 1 },
    // ECE Timetable
    { id: 26, day: 'Monday',    period: 1, time: '09:00-10:00', subjectId: 6, staffId: 4, room: 'EC301', deptId: 2 },
    { id: 27, day: 'Monday',    period: 2, time: '10:00-11:00', subjectId: 7, staffId: 4, room: 'EC301', deptId: 2 },
    { id: 28, day: 'Tuesday',   period: 1, time: '09:00-10:00', subjectId: 8, staffId: 5, room: 'EC301', deptId: 2 },
    { id: 29, day: 'Wednesday', period: 1, time: '09:00-10:00', subjectId: 6, staffId: 4, room: 'EC301', deptId: 2 },
    { id: 30, day: 'Thursday',  period: 1, time: '09:00-10:00', subjectId: 7, staffId: 4, room: 'EC301', deptId: 2 },
    { id: 31, day: 'Friday',    period: 1, time: '09:00-10:00', subjectId: 8, staffId: 5, room: 'EC302', deptId: 2 },
    // ME Timetable
    { id: 32, day: 'Monday',    period: 1, time: '09:00-10:00', subjectId: 9,  staffId: 6, room: 'ME301', deptId: 3 },
    { id: 33, day: 'Tuesday',   period: 1, time: '09:00-10:00', subjectId: 10, staffId: 6, room: 'ME301', deptId: 3 },
    { id: 34, day: 'Wednesday', period: 1, time: '09:00-10:00', subjectId: 9,  staffId: 7, room: 'ME302', deptId: 3 },
  ];
  DB.set(DB.KEYS.timetable, timetable);

  // --- Attendance ---
  const attendance = [];
  const attDates = ['2024-09-23','2024-09-24','2024-09-25','2024-09-26','2024-09-27',
                    '2024-09-16','2024-09-17','2024-09-18','2024-09-19','2024-09-20'];
  const cseStudents = students.filter(s => s.deptId === 1).map(s => s.id);
  const subjectsCse = [1, 2, 3, 4, 5];
  let attId = 1;
  attDates.forEach(date => {
    subjectsCse.forEach(subjectId => {
      cseStudents.forEach(studentId => {
        // Student 3 (Rohit) has low attendance
        const present = studentId === 3 ? Math.random() < 0.45 : Math.random() < 0.85;
        attendance.push({
          id: attId++,
          date,
          subjectId,
          studentId,
          status: present ? 'present' : 'absent',
          markedBy: subjectId <= 2 ? 1 : subjectId <= 4 ? 2 : 3,
        });
      });
    });
  });
  DB.set(DB.KEYS.attendance, attendance);

  // --- Marks ---
  const marks = [];
  let markId = 1;
  students.forEach(student => {
    const deptSubjects = subjects.filter(s => s.deptId === student.deptId);
    deptSubjects.forEach(subject => {
      const i1 = Math.floor(Math.random() * 11) + 20; // 20-30
      const i2 = Math.floor(Math.random() * 11) + 20; // 20-30
      const asn = Math.floor(Math.random() * 6) + 10; // 10-15
      marks.push({
        id: markId++,
        studentId: student.id,
        subjectId: subject.id,
        internal1: i1,
        internal2: i2,
        assignment: asn,
        total: i1 + i2 + asn,
        maxInternal1: 30,
        maxInternal2: 30,
        maxAssignment: 15,
        maxTotal: 75,
      });
    });
  });
  DB.set(DB.KEYS.marks, marks);

  // --- Fees ---
  const fees = [];
  students.forEach((student, idx) => {
    const paid = idx % 3 !== 2; // every 3rd student has pending fees
    const amount = student.deptId === 1 ? 85000 : student.deptId === 2 ? 80000 : 70000;
    fees.push({
      id: student.id,
      studentId: student.id,
      amount,
      paid: paid ? amount : Math.floor(amount * 0.5),
      dueDate: '2024-12-31',
      history: paid
        ? [
            { date: '2024-06-15', amount: Math.floor(amount * 0.5), mode: 'Online', ref: 'TXN' + (1000 + student.id) },
            { date: '2024-08-20', amount: Math.ceil(amount * 0.5), mode: 'DD',     ref: 'DD'  + (2000 + student.id) },
          ]
        : [
            { date: '2024-06-15', amount: Math.floor(amount * 0.5), mode: 'Online', ref: 'TXN' + (1000 + student.id) },
          ],
    });
  });
  DB.set(DB.KEYS.fees, fees);

  // --- Announcements ---
  const announcements = [
    {
      id: 1,
      title: 'Mid-Semester Examination Schedule Released',
      body: 'The mid-semester examinations will be conducted from October 14 to October 21, 2024. Students are advised to check the detailed timetable on the notice board. All students must carry their hall tickets. No student will be allowed inside without a valid hall ticket.',
      date: '2024-09-25',
      authorId: 1,
      author: 'Admin Office',
      targetRoles: ['staff', 'student'],
    },
    {
      id: 2,
      title: 'Annual Technical Symposium – TechFest 2024',
      body: 'We are pleased to announce the Annual Technical Symposium "TechFest 2024" scheduled for November 10–11, 2024. Events include coding contests, paper presentations, project exhibitions, and guest lectures. Registration open until October 31. Teams of 2–4 members. Cash prizes worth ₹1,00,000.',
      date: '2024-09-22',
      authorId: 1,
      author: 'Admin Office',
      targetRoles: ['staff', 'student'],
    },
    {
      id: 3,
      title: 'Faculty Development Programme on AI & ML',
      body: 'A Faculty Development Programme on "Artificial Intelligence and Machine Learning" will be held from October 7–11, 2024. All faculty members are encouraged to participate. Sessions will cover latest trends in AI, hands-on workshops with Python, and industry case studies. Registrations close September 30.',
      date: '2024-09-20',
      authorId: 1,
      author: 'Admin Office',
      targetRoles: ['staff'],
    },
  ];
  DB.set(DB.KEYS.announcements, announcements);

  localStorage.setItem(DB.KEYS.seeded, 'true');
}

function resetDemoData() {
  Object.values(DB.KEYS).forEach(k => localStorage.removeItem(k));
  seedData();
}
