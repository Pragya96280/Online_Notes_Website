// Notes Hub application: authentication demo, subject navigation, search and personal notes.
const $ = (id) => document.getElementById(id);
const mem = {};
const store = {
  get(key) { try { return localStorage.getItem(key); } catch { return mem[key] ?? null; } },
  set(key, value) { try { localStorage.setItem(key, value); } catch { mem[key] = value; } }
};
const J = (key, fallback) => { try { return JSON.parse(store.get(key)) ?? fallback; } catch { return fallback; } };
let mode = 'in';
let user = null;
let cur = null;
let topicIndex = 0;

async function hash(value) {
  try {
    const bytes = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(value));
    return [...new Uint8Array(bytes)].map((x) => x.toString(16).padStart(2, '0')).join('');
  } catch {
    // Fallback for local/demo environments without Web Crypto.
    return btoa(unescape(encodeURIComponent(value)));
  }
}

function setMode(nextMode) {
  mode = nextMode;
  $('tIn').setAttribute('aria-selected', String(mode === 'in'));
  $('tUp').setAttribute('aria-selected', String(mode === 'up'));
  $('nameRow').classList.toggle('hidden', mode === 'in');
  $('pw').autocomplete = mode === 'in' ? 'current-password' : 'new-password';
  $('go').textContent = mode === 'in' ? 'Log in' : 'Create account';
  $('err').textContent = '';
}
$('tIn').addEventListener('click', () => setMode('in'));
$('tUp').addEventListener('click', () => setMode('up'));
$('hLogin').addEventListener('click', (event) => { event.preventDefault(); showAuth('in'); });
$('hSignup').addEventListener('click', () => showAuth('up'));

function showAuth(nextMode = 'in') {
  $('authView').classList.remove('hidden');
  $('browse').classList.add('hidden');
  $('results').classList.add('hidden');
  $('noteView').classList.add('hidden');
  $('mineView').classList.add('hidden');
  $('guest').classList.remove('hidden');
  $('member').classList.add('hidden');
  $('lnkMine').classList.add('hidden');
  $('srch').classList.add('hidden');
  setMode(nextMode);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

$('go').addEventListener('click', async () => {
  const email = $('email').value.trim().toLowerCase();
  const password = $('pw').value;
  const name = $('name').value.trim();
  const users = J('nh_users', {});
  $('err').textContent = '';

  if (!/^\S+@\S+\.\S+$/.test(email)) {
    $('err').textContent = 'Enter a valid email address.';
    return;
  }
  if (password.length < 6) {
    $('err').textContent = 'Password must be at least 6 characters.';
    return;
  }

  const passwordHash = await hash(password);
  if (mode === 'up') {
    if (users[email]) {
      $('err').textContent = 'That email already has an account. Log in instead.';
      return;
    }
    users[email] = { h: passwordHash, name: name || email.split('@')[0] };
    store.set('nh_users', JSON.stringify(users));
  } else if (!users[email] || users[email].h !== passwordHash) {
    $('err').textContent = 'Email or password is incorrect. If this is your first visit, create an account.';
    return;
  }

  store.set('nh_session', email);
  enter(email);
});
['email', 'pw', 'name'].forEach((id) => $(id).addEventListener('keydown', (event) => {
  if (event.key === 'Enter') { event.preventDefault(); $('go').click(); }
}));

function enter(email) {
  user = email;
  const account = J('nh_users', {})[email];
  $('who').textContent = account?.name || email;
  $('pw').value = '';
  $('authView').classList.add('hidden');
  $('guest').classList.add('hidden');
  $('member').classList.remove('hidden');
  $('lnkMine').classList.remove('hidden');
  $('srch').classList.remove('hidden');
  showHome();
}

$('out').addEventListener('click', () => {
  store.set('nh_session', '');
  user = null;
  cur = null;
  showAuth('in');
});

function showHome() {
  $('authView').classList.add('hidden');
  $('browse').classList.remove('hidden');
  $('results').classList.add('hidden');
  $('noteView').classList.add('hidden');
  $('mineView').classList.add('hidden');
  $('q').value = '';
  $('results').innerHTML = '';
  $('fSubs').innerHTML = '';

  $('side').innerHTML = SUBJECTS.map((subject) =>
    `<button type="button" data-id="${subject.id}" aria-current="${cur?.id === subject.id}">${subject.name}</button>`
  ).join('');
  $('side').querySelectorAll('button').forEach((button) => {
    button.addEventListener('click', () => selectSubject(button.dataset.id));
  });
  SUBJECTS.forEach((subject) => {
    const link = document.createElement('a');
    link.href = '#';
    link.textContent = subject.name;
    link.addEventListener('click', (event) => { event.preventDefault(); selectSubject(subject.id); });
    $('fSubs').append(link);
  });

  if (!cur) cur = SUBJECTS[0] || null;
  if (cur) selectSubject(cur.id);
  $('libP').textContent = 'Browse the available subject notes above. More subjects can be added in js/data.js.';
}

function selectSubject(id) {
  cur = SUBJECTS.find((subject) => subject.id === id) || SUBJECTS[0];
  if (!cur) return;
  $('side').querySelectorAll('button').forEach((button) => {
    button.setAttribute('aria-current', String(button.dataset.id === cur.id));
  });
  $('panel').innerHTML = `<h3>${cur.name}</h3><p>${cur.d || ''}</p><div class="topic-list">${cur.topics.map((topic, index) =>
    `<button type="button" class="outline" data-topic="${index}" style="display:block;width:100%;text-align:left;margin:8px 0">${index + 1}. ${topic.t}</button>`
  ).join('')}</div>`;
  $('panel').querySelectorAll('[data-topic]').forEach((button) => {
    button.addEventListener('click', () => openTopic(cur.id, Number(button.dataset.topic)));
  });
}

function openTopic(subjectId, index) {
  cur = SUBJECTS.find((subject) => subject.id === subjectId);
  if (!cur || !cur.topics[index]) return;
  topicIndex = index;
  $('browse').classList.add('hidden');
  $('results').classList.add('hidden');
  $('noteView').classList.remove('hidden');
  $('mineView').classList.add('hidden');
  $('cSub').textContent = cur.name;
  $('cSub').href = '#';
  $('body').innerHTML = `<h2>${cur.topics[index].t}</h2>${cur.topics[index].b}`;
  $('mineT').value = '';
  renderMine();
  $('prevB').disabled = index === 0;
  $('nextB').disabled = index === cur.topics.length - 1;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
$('cHome').addEventListener('click', (event) => { event.preventDefault(); showHome(); });
$('cSub').addEventListener('click', (event) => { event.preventDefault(); showHome(); });
$('prevB').addEventListener('click', () => { if (cur && topicIndex > 0) openTopic(cur.id, topicIndex - 1); });
$('nextB').addEventListener('click', () => { if (cur && topicIndex < cur.topics.length - 1) openTopic(cur.id, topicIndex + 1); });

const noteKey = () => `nh_mine_${user}_${cur?.id || 'none'}`;
function renderMine() {
  const notes = J(noteKey(), []);
  $('mineList').innerHTML = '';
  if (!notes.length) {
    $('mineList').innerHTML = '<p class="empty">No notes yet. Write one above to keep it here.</p>';
    return;
  }
  notes.forEach((note, index) => {
    const row = document.createElement('div');
    row.className = 'row';
    const content = document.createElement('span');
    content.textContent = note;
    const remove = document.createElement('button');
    remove.className = 'outline';
    remove.type = 'button';
    remove.textContent = 'Delete';
    remove.addEventListener('click', () => {
      const currentNotes = J(noteKey(), []);
      currentNotes.splice(index, 1);
      store.set(noteKey(), JSON.stringify(currentNotes));
      renderMine();
    });
    row.append(content, remove);
    $('mineList').append(row);
  });
}
$('save').addEventListener('click', () => {
  const value = $('mineT').value.trim();
  if (!value) return;
  const notes = J(noteKey(), []);
  notes.unshift(value);
  store.set(noteKey(), JSON.stringify(notes));
  $('mineT').value = '';
  renderMine();
});

function showMyNotes() {
  $('authView').classList.add('hidden');
  $('browse').classList.add('hidden');
  $('results').classList.add('hidden');
  $('noteView').classList.add('hidden');
  $('mineView').classList.remove('hidden');
  $('allMine').innerHTML = '';
  let found = 0;
  SUBJECTS.forEach((subject) => {
    const notes = J(`nh_mine_${user}_${subject.id}`, []);
    if (!notes.length) return;
    found += notes.length;
    const section = document.createElement('section');
    section.className = 'card';
    section.style.marginBottom = '14px';
    const heading = document.createElement('h3');
    heading.textContent = subject.name;
    section.append(heading);
    notes.forEach((note) => {
      const p = document.createElement('p');
      p.textContent = note;
      section.append(p);
    });
    $('allMine').append(section);
  });
  if (!found) $('allMine').innerHTML = '<p class="empty">You have not saved any notes yet.</p>';
}

$('q').addEventListener('input', () => {
  const query = $('q').value.trim().toLowerCase();
  if (!query) { showHome(); return; }
  $('authView').classList.add('hidden');
  $('browse').classList.add('hidden');
  $('noteView').classList.add('hidden');
  $('mineView').classList.add('hidden');
  $('results').classList.remove('hidden');
  const results = $('results');
  results.innerHTML = '<h2 class="sec">Search results</h2>';
  let count = 0;
  SUBJECTS.forEach((subject) => subject.topics.forEach((topic, index) => {
    const plainText = (topic.t + ' ' + topic.b.replace(/<[^>]*>/g, ' ')).toLowerCase();
    if (!plainText.includes(query)) return;
    count++;
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'subj';
    button.style.cssText = `display:block;width:100%;text-align:left;margin:10px 0;padding:16px;border:1px solid var(--line);border-left:5px solid ${subject.c};background:var(--card);cursor:pointer;color:var(--ink)`;
    const title = document.createElement('h3');
    title.textContent = topic.t;
    const description = document.createElement('p');
    description.textContent = subject.name;
    button.append(title, description);
    button.addEventListener('click', () => openTopic(subject.id, index));
    results.append(button);
  }));
  if (!count) {
    const empty = document.createElement('p');
    empty.className = 'empty';
    empty.textContent = 'No notes match that search. Try a shorter word.';
    results.append(empty);
  }
});

$('openLib').addEventListener('click', () => {
  $('q').focus();
  $('q').scrollIntoView({ behavior: 'smooth', block: 'center' });
});

document.querySelectorAll('[data-go]').forEach((link) => link.addEventListener('click', (event) => {
  event.preventDefault();
  const destination = link.dataset.go;
  if (destination === 'logout') { $('out').click(); return; }
  if (destination === 'login') { showAuth('in'); return; }
  if (destination === 'signup') { showAuth('up'); return; }
  if (!user) { showAuth('in'); return; }
  if (destination === 'mine') { showMyNotes(); return; }
  if (destination === 'search') { $('q').focus(); $('q').scrollIntoView({ behavior: 'smooth', block: 'center' }); return; }
  showHome();
}));

const session = store.get('nh_session');
if (session && J('nh_users', {})[session]) enter(session);
else showAuth('in');
