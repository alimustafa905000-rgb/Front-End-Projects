const ADMIN = { username: 'admin', password: 'admin123' };


const DEPTS = [
    { id: 'cs', name: 'Computer Science', icon: '💻' },
    { id: 'math', name: 'Mathematics', icon: '📐' },
    { id: 'phys', name: 'Physics', icon: '⚛️' },
    { id: 'eng', name: 'English', icon: '📚' },
    { id: 'chem', name: 'Chemistry', icon: '🧪' },
    { id: 'bio', name: 'Biology', icon: '🧬' },
    { id: 'psych', name: 'BS Psychology', icon: '🧠' },
];

const STAR_WORD = ['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent'];
const GRAD_COLORS = ['#6366f1', '#2563eb', '#0891b2', '#059669', '#d97706', '#dc2626', '#7c3aed'];

 
const SEED_TEACHERS = [
    // Computer Science
    { id: 't01', name: 'Dr. Sarah Ahmed', dept: 'cs', subject: 'Data Structures & Algorithms', bio: 'PhD Computer Science, 12 years experience', photo: 'https://randomuser.me/api/portraits/women/44.jpg' },
    { id: 't02', name: 'Prof. Ali Hassan', dept: 'cs', subject: 'Web Development', bio: 'MSc Software Engineering, Full-Stack Developer', photo: 'https://randomuser.me/api/portraits/men/32.jpg' },
    { id: 't03', name: 'Mr. Bilal Qureshi', dept: 'cs', subject: 'Database Systems', bio: 'MSc CS, specializes in database design', photo: 'https://randomuser.me/api/portraits/men/67.jpg' },
    // Mathematics
    { id: 't04', name: 'Dr. Fatima Khan', dept: 'math', subject: 'Calculus II', bio: 'PhD Mathematics, University of Lahore', photo: 'https://randomuser.me/api/portraits/women/68.jpg' },
    { id: 't05', name: 'Mr. Usman Raza', dept: 'math', subject: 'Linear Algebra', bio: 'MSc Applied Mathematics', photo: 'https://randomuser.me/api/portraits/men/45.jpg' },
    { id: 't06', name: 'Ms. Sana Mirza', dept: 'math', subject: 'Statistics & Probability', bio: 'MSc Statistics, 6 years teaching', photo: 'https://randomuser.me/api/portraits/women/29.jpg' },
    // Physics
    { id: 't07', name: 'Dr. Zara Malik', dept: 'phys', subject: 'Classical Mechanics', bio: 'PhD Physics, research in thermodynamics', photo: 'https://randomuser.me/api/portraits/women/52.jpg' },
    { id: 't08', name: 'Prof. Tariq Mahmood', dept: 'phys', subject: 'Electromagnetism', bio: 'PhD Physics, 18 years experience', photo: 'https://randomuser.me/api/portraits/men/18.jpg' },
    // English
    { id: 't09', name: 'Ms. Hina Baig', dept: 'eng', subject: 'Academic Writing', bio: 'MA English Literature, Cambridge-trained', photo: 'https://randomuser.me/api/portraits/women/63.jpg' },
    { id: 't10', name: 'Mr. Faisal Siddiqui', dept: 'eng', subject: 'Communication Skills', bio: 'MA Linguistics, 9 years experience', photo: 'https://randomuser.me/api/portraits/men/55.jpg' },
    // Chemistry
    { id: 't11', name: 'Dr. Kamran Siddiq', dept: 'chem', subject: 'Organic Chemistry', bio: 'PhD Chem, active researcher', photo: 'https://randomuser.me/api/portraits/men/77.jpg' },
    { id: 't12', name: 'Ms. Rabia Noor', dept: 'chem', subject: 'Physical Chemistry', bio: 'MSc Chemistry, lab specialist', photo: 'https://randomuser.me/api/portraits/women/14.jpg' },
    // Biology
    { id: 't13', name: 'Dr. Ayesha Tariq', dept: 'bio', subject: 'Molecular Biology', bio: 'PhD Biotechnology, genetics researcher', photo: 'https://randomuser.me/api/portraits/women/37.jpg' },
    { id: 't14', name: 'Mr. Hamza Idrees', dept: 'bio', subject: 'Human Anatomy', bio: 'MSc Zoology, 8 years teaching', photo: 'https://randomuser.me/api/portraits/men/41.jpg' },
    // BS Psychology
    { id: 't15', name: 'Ms. Nadia Shah', dept: 'psych', subject: 'Clinical Psychology', bio: 'MA Clinical Psychology, certified therapist', photo: 'https://randomuser.me/api/portraits/women/21.jpg' },
    { id: 't16', name: 'Dr. Omar Farooq', dept: 'psych', subject: 'Social Psychology', bio: 'PhD Psychology, published researcher', photo: 'https://randomuser.me/api/portraits/men/26.jpg' },
    { id: 't17', name: 'Ms. Amna Butt', dept: 'psych', subject: 'Developmental Psychology', bio: 'MSc Psychology, child development expert', photo: 'https://randomuser.me/api/portraits/women/9.jpg' },
];

function getTeachers() { return JSON.parse(localStorage.getItem('ef_teachers') || 'null'); }
function saveTeachers(d) { localStorage.setItem('ef_teachers', JSON.stringify(d)); }
function getFeedbacks() { return JSON.parse(localStorage.getItem('ef_feedbacks') || '[]'); }
function saveFeedbacks(d) { localStorage.setItem('ef_feedbacks', JSON.stringify(d)); }
function isLoggedIn() { return sessionStorage.getItem('ef_auth') === '1'; }

function initData() {
    if (!getTeachers()) saveTeachers(SEED_TEACHERS);
}

let activeDept = null;
let activeTeacher = null;
let overallVal = 0;
let aspects = { clarity: 0, knowledge: 0, punctuality: 0, engagement: 0, fairness: 0 };


function show(id) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById('page-' + id).classList.add('active');
    window.scrollTo(0, 0);
}

function goHome() { activeDept = null; activeTeacher = null; renderDepts(); show('home'); }

function checkHash() {
    if (window.location.hash === '#admin') {
        if (isLoggedIn()) { openAdminDash(); } else { show('adminLogin'); }
    }
}
window.addEventListener('hashchange', checkHash);


function renderDepts() {
    const teachers = getTeachers();
    document.getElementById('deptGrid').innerHTML = DEPTS.map((d, i) => {
        const count = teachers.filter(t => t.dept === d.id).length;
        return `<div class="dept-card" onclick="openDept('${d.id}')">
      <span class="dept-icon">${d.icon}</span>
      <div class="dept-name">${d.name}</div>
      <div class="dept-count">${count} teacher${count !== 1 ? 's' : ''}</div>
      <span class="dept-arrow">→</span>
    </div>`;
    }).join('');
}

function openDept(id) {
    activeDept = DEPTS.find(d => d.id === id);
    const teachers = getTeachers().filter(t => t.dept === id);
    const feedbacks = getFeedbacks();

    document.getElementById('bc-teachers').innerHTML = bc([['Home', goHome], [activeDept.name]]);
    document.getElementById('teachers-title').textContent = activeDept.icon + ' ' + activeDept.name;

    const grid = document.getElementById('teacherGrid');
    if (!teachers.length) {
        grid.innerHTML = `<div class="empty"><div class="e-icon">👨‍🏫</div><p>No teachers in this department yet.</p></div>`;
    } else {
        grid.innerHTML = teachers.map((t, i) => {
            const tFb = feedbacks.filter(f => f.teacherId === t.id);
            const avg = tFb.length ? (tFb.reduce((s, f) => s + f.overall, 0) / tFb.length).toFixed(1) : null;
            const color = GRAD_COLORS[i % GRAD_COLORS.length];
            const photoHtml = t.photo
                ? `<img src="${t.photo}" alt="${t.name}" onerror="this.style.display='none';this.nextSibling.style.display='flex'">`
                + `<div class="teacher-placeholder" style="background:linear-gradient(135deg,${color},${color}cc);display:none;">${t.name[0]}</div>`
                : `<div class="teacher-placeholder" style="background:linear-gradient(135deg,${color},${color}cc);">${t.name[0]}</div>`;
            const ratingHtml = avg
                ? `<span class="stars-text">${starsStr(parseFloat(avg))}</span><span>${avg} (${tFb.length})</span>`
                : `<span>No ratings yet</span>`;
            return `<div class="teacher-card" onclick="openFeedback('${t.id}')">
        <div class="teacher-photo-wrap">${photoHtml}</div>
        <div class="teacher-info">
          <div class="teacher-name">${t.name}</div>
          <div class="subject-pill">${t.subject}</div>
          <div class="teacher-rating">${ratingHtml}</div>
        </div>
      </div>`;
        }).join('');
    }
    show('teachers');
}

function starsStr(n) {
    let s = '';
    for (let i = 1; i <= 5; i++) s += i <= Math.round(n) ? '★' : '☆';
    return s;
}

// ═══════════════════════════════════════
// FEEDBACK FORM
// ═══════════════════════════════════════
function openFeedback(id) {
    activeTeacher = getTeachers().find(t => t.id === id);
    overallVal = 0;
    aspects = { clarity: 0, knowledge: 0, punctuality: 0, engagement: 0, fairness: 0 };
    document.getElementById('commentBox').value = '';
    document.getElementById('charCount').textContent = '0';

    const dept = DEPTS.find(d => d.id === activeTeacher.dept);

    // Breadcrumb
    document.getElementById('bc-feedback').innerHTML = bc([
        ['Home', goHome],
        [dept.name, () => openDept(dept.id)],
        [activeTeacher.name]
    ]);

    // Profile card
    const color = GRAD_COLORS[getTeachers().findIndex(t => t.id === id) % GRAD_COLORS.length];
    const photoHtml = activeTeacher.photo
        ? `<div class="profile-photo-wrap"><img src="${activeTeacher.photo}" alt="${activeTeacher.name}" onerror="this.style.display='none';this.parentNode.textContent='${activeTeacher.name[0]}'"></div>`
        : `<div class="profile-photo-wrap" style="background:linear-gradient(135deg,${color},${color}cc)">${activeTeacher.name[0]}</div>`;

    document.getElementById('teacherProfileCard').innerHTML = `
    ${photoHtml}
    <div class="profile-info">
      <h2>${activeTeacher.name}</h2>
      <span class="info-tag tag-dept">${dept.icon} ${dept.name}</span>
      <span class="info-tag tag-sub">${activeTeacher.subject}</span>
      ${activeTeacher.bio ? `<div class="profile-bio">${activeTeacher.bio}</div>` : ''}
    </div>`;

    // Overall stars
    document.getElementById('overallStars').innerHTML = [1, 2, 3, 4, 5].map(i =>
        `<button class="star-btn" data-v="${i}" onclick="setOverall(${i})">★</button>`
    ).join('');

    // Aspect stars
    document.querySelectorAll('.mini-star-row').forEach(row => {
        const asp = row.dataset.aspect;
        row.innerHTML = [1, 2, 3, 4, 5].map(i =>
            `<button class="mini-star" data-v="${i}" onclick="setAspect('${asp}',${i})">★</button>`
        ).join('');
    });

    show('feedback');
}

function setOverall(v) {
    overallVal = v;
    document.getElementById('starHint').textContent = STAR_WORD[v];
    document.querySelectorAll('#overallStars .star-btn').forEach(b => {
        b.classList.toggle('lit', +b.dataset.v <= v);
    });
}

function setAspect(asp, v) {
    aspects[asp] = v;
    document.querySelectorAll(`.mini-star-row[data-aspect="${asp}"] .mini-star`).forEach(b => {
        b.classList.toggle('lit', +b.dataset.v <= v);
    });
}

function updateCharCount() {
    document.getElementById('charCount').textContent = document.getElementById('commentBox').value.length;
}

function submitFeedback() {
    if (!overallVal) { toast('⚠️ Please give an overall star rating first.'); return; }
    const fbs = getFeedbacks();
    fbs.push({
        id: 'fb' + Date.now(),
        teacherId: activeTeacher.id,
        teacherName: activeTeacher.name,
        dept: activeTeacher.dept,
        subject: activeTeacher.subject,
        overall: overallVal,
        aspects: { ...aspects },
        comment: document.getElementById('commentBox').value.trim(),
        date: new Date().toISOString()
    });
    saveFeedbacks(fbs);
    show('success');
}


function doLogin() {
    const u = document.getElementById('al-user').value.trim();
    const p = document.getElementById('al-pass').value;
    const err = document.getElementById('loginErr');
    if (u === ADMIN.username && p === ADMIN.password) {
        sessionStorage.setItem('ef_auth', '1');
        err.style.display = 'none';
        openAdminDash();
    } else {
        err.style.display = 'block';
    }
}

function doLogout() {
    sessionStorage.removeItem('ef_auth');
    window.location.hash = '';
    goHome();
}

function openAdminDash() {
    renderAdminStats();
    renderFbList();
    renderMgmt();
    populateDeptSelects();
    populateFilters();
    show('adminDash');
}

function renderAdminStats() {
    const fbs = getFeedbacks(), ts = getTeachers();
    const avg = fbs.length ? (fbs.reduce((s, f) => s + f.overall, 0) / fbs.length).toFixed(1) : '—';
    document.getElementById('adminStats').innerHTML = `
    <div class="stat-tile"><div class="stat-num">${fbs.length}</div><div class="stat-lbl">Total Feedbacks</div></div>
    <div class="stat-tile"><div class="stat-num">${ts.length}</div><div class="stat-lbl">Teachers</div></div>
    <div class="stat-tile"><div class="stat-num">${DEPTS.length}</div><div class="stat-lbl">Departments</div></div>
    <div class="stat-tile"><div class="stat-num">${avg}</div><div class="stat-lbl">Avg Rating</div></div>`;
}

function populateFilters() {
    const ts = getTeachers();
    document.getElementById('f-dept').innerHTML = '<option value="">All Departments</option>' +
        DEPTS.map(d => `<option value="${d.id}">${d.icon} ${d.name}</option>`).join('');
    document.getElementById('f-teacher').innerHTML = '<option value="">All Teachers</option>' +
        ts.map(t => `<option value="${t.id}">${t.name}</option>`).join('');
}

function renderFbList() {
    let fbs = getFeedbacks();
    const dv = document.getElementById('f-dept').value;
    const tv = document.getElementById('f-teacher').value;
    const sv = document.getElementById('f-sort').value;
    if (dv) fbs = fbs.filter(f => f.dept === dv);
    if (tv) fbs = fbs.filter(f => f.teacherId === tv);
    if (sv === 'newest') fbs.sort((a, b) => b.date.localeCompare(a.date));
    else if (sv === 'oldest') fbs.sort((a, b) => a.date.localeCompare(b.date));
    else if (sv === 'high') fbs.sort((a, b) => b.overall - a.overall);
    else if (sv === 'low') fbs.sort((a, b) => a.overall - b.overall);

    const list = document.getElementById('fbList');
    if (!fbs.length) { list.innerHTML = `<div class="empty"><div class="e-icon">📭</div><p>No feedback found.</p></div>`; return; }

    list.innerHTML = fbs.map(f => {
        const dept = DEPTS.find(d => d.id === f.dept);
        const d = new Date(f.date);
        const dateStr = d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) + ' ' + d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
        const aspectsHtml = Object.entries(f.aspects || {}).filter(([, v]) => v > 0).map(([k, v]) =>
            `<div class="fb-aspect"><div class="a-label">${k[0].toUpperCase() + k.slice(1)}</div><div class="a-stars">${'★'.repeat(v)}${'☆'.repeat(5 - v)}</div></div>`
        ).join('');
        return `<div class="fb-card">
      <div class="fb-header">
        <div><div class="fb-teacher-name">${f.teacherName}</div><div class="fb-meta">${dateStr} · Anonymous Student</div></div>
        <div style="text-align:right"><div class="fb-overall-stars">${'★'.repeat(f.overall)}${'☆'.repeat(5 - f.overall)}</div><div class="fb-overall-label">${STAR_WORD[f.overall]}</div></div>
      </div>
      <div class="fb-tags">
        ${dept ? `<span class="fb-tag">${dept.icon} ${dept.name}</span>` : ''}
        <span class="fb-tag">${f.subject}</span>
      </div>
      ${aspectsHtml ? `<div class="fb-aspects">${aspectsHtml}</div>` : ''}
      ${f.comment ? `<div class="fb-comment">${f.comment}</div>` : ''}
    </div>`;
    }).join('');
}

function clearAllFeedback() {
    if (!confirm('Delete ALL feedback? This cannot be undone.')) return;
    saveFeedbacks([]);
    renderFbList();
    renderAdminStats();
    toast('All feedback cleared.');
}

function renderMgmt() {
    const ts = getTeachers(), fbs = getFeedbacks();
    const grid = document.getElementById('mgmtGrid');
    if (!ts.length) { grid.innerHTML = `<div class="empty"><div class="e-icon">👨‍🏫</div><p>No teachers yet.</p></div>`; return; }
    grid.innerHTML = ts.map((t, i) => {
        const dept = DEPTS.find(d => d.id === t.dept);
        const count = fbs.filter(f => f.teacherId === t.id).length;
        const color = GRAD_COLORS[i % GRAD_COLORS.length];
        const photoHtml = t.photo
            ? `<img src="${t.photo}" alt="${t.name}" onerror="this.style.display='none';this.parentNode.style.background='linear-gradient(135deg,${color},${color}cc)';this.parentNode.textContent='${t.name[0]}'">`
            : '';
        return `<div class="mgmt-card">
      <div class="mgmt-photo" style="background:linear-gradient(135deg,${color},${color}cc)">${photoHtml}${!t.photo ? t.name[0] : ''}</div>
      <div class="mgmt-info">
        <div class="mgmt-name">${t.name}</div>
        <div class="mgmt-sub">${dept ? dept.name : ''} · ${t.subject}</div>
        <div style="font-size:0.72rem;color:var(--muted);margin-top:0.15rem;">${count} feedback${count !== 1 ? 's' : ''}</div>
      </div>
      <div class="mgmt-actions">
        <button class="btn btn-outline btn-sm" onclick="openEdit('${t.id}')">✏️</button>
        <button class="btn btn-danger btn-sm" onclick="delTeacher('${t.id}')">🗑</button>
      </div>
    </div>`;
    }).join('');
}

function populateDeptSelects() {
    const opts = DEPTS.map(d => `<option value="${d.id}">${d.icon} ${d.name}</option>`).join('');
    ['nt-dept', 'e-dept'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.innerHTML = '<option value="">— Select —</option>' + opts;
    });
}

function addTeacher() {
    const name = document.getElementById('nt-name').value.trim();
    const dept = document.getElementById('nt-dept').value;
    const subject = document.getElementById('nt-subject').value.trim();
    const photo = document.getElementById('nt-photo').value.trim();
    const bio = document.getElementById('nt-bio').value.trim();
    if (!name || !dept || !subject) { toast('⚠️ Name, Department, and Subject are required.'); return; }
    const ts = getTeachers();
    ts.push({ id: 't' + Date.now(), name, dept, subject, photo, bio });
    saveTeachers(ts);
    ['nt-name', 'nt-dept', 'nt-subject', 'nt-photo', 'nt-bio'].forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; });
    renderMgmt(); renderAdminStats(); populateFilters();
    toast('✅ Teacher added!');
}

function delTeacher(id) {
    if (!confirm('Delete this teacher? All their feedback will also be removed.')) return;
    saveTeachers(getTeachers().filter(t => t.id !== id));
    saveFeedbacks(getFeedbacks().filter(f => f.teacherId !== id));
    renderMgmt(); renderAdminStats(); populateFilters();
    toast('Teacher deleted.');
}

function openEdit(id) {
    const t = getTeachers().find(t => t.id === id);
    populateDeptSelects();
    document.getElementById('e-id').value = t.id;
    document.getElementById('e-name').value = t.name;
    document.getElementById('e-dept').value = t.dept;
    document.getElementById('e-subject').value = t.subject;
    document.getElementById('e-photo').value = t.photo || '';
    document.getElementById('e-bio').value = t.bio || '';
    document.getElementById('editModal').classList.add('open');
}
function closeModal() { document.getElementById('editModal').classList.remove('open'); }
function saveEdit() {
    const id = document.getElementById('e-id').value;
    const ts = getTeachers().map(t => t.id !== id ? t : {
        ...t,
        name: document.getElementById('e-name').value.trim(),
        dept: document.getElementById('e-dept').value,
        subject: document.getElementById('e-subject').value.trim(),
        photo: document.getElementById('e-photo').value.trim(),
        bio: document.getElementById('e-bio').value.trim(),
    });
    saveTeachers(ts);
    closeModal();
    renderMgmt();
    toast('✅ Teacher updated!');
}

function switchTab(name) {
    ['fb', 'mgmt', 'add'].forEach(t => {
        document.getElementById('tab-' + t).style.display = t === name ? 'block' : 'none';
        document.getElementById('tab-btn-' + t).classList.toggle('active', t === name);
    });
}


function bc(items) {
    return items.map((item, i) => {
        const isLast = i === items.length - 1;
        const sep = i > 0 ? '<span class="bc-sep">›</span>' : '';
        if (isLast) return `${sep}<span class="bc-cur">${item[0]}</span>`;
        return `${sep}<span class="bc-link" onclick="(${item[1].toString()})()">${item[0]}</span>`;
    }).join('');
}

let toastTimer;
function toast(msg) {
    const el = document.getElementById('toast');
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove('show'), 3000);
}

initData();
renderDepts();
checkHash();
