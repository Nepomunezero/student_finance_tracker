const KEY = 'finance:data';
let records = JSON.parse(localStorage.getItem(KEY) || '[]');

// ===========================
// DOM Elements
// ===========================
const recordsBody = document.getElementById('records-body');
const searchInput = document.getElementById('search');
const addRecordBtn = document.getElementById('addRecordBtn');
const recordForm = document.getElementById('record-form');
const form = document.getElementById('form');
const cancelBtn = document.getElementById('cancelBtn');
const statTotal = document.getElementById('stat-total');
const statSum = document.getElementById('stat-sum');
const statTop = document.getElementById('stat-top');

// ===========================
// Helper Functions
// ===========================
function saveData() {
  localStorage.setItem(KEY, JSON.stringify(records));
}

function generateId() {
  return 'rec_' + Math.floor(Math.random() * 100000);
}

function renderRecords(filter='') {
  recordsBody.innerHTML = '';

  const regex = safeRegex(filter);

  records.forEach(record => {
    const rowText = `${record.description} ${record.category} ${record.amount}`;
    if (!regex || regex.test(rowText)) {
      const tr = document.createElement('tr');

      tr.innerHTML = `
        <td>${highlight(record.description, regex)}</td>
        <td>${record.amount.toFixed(2)}</td>
        <td>${record.category}</td>
        <td>${record.date}</td>
        <td>
          <button onclick="editRecord('${record.id}')">Edit</button>
          <button onclick="deleteRecord('${record.id}')">Delete</button>
        </td>
      `;
      recordsBody.appendChild(tr);
    }
  });

  updateStats();
}

function updateStats() {
  statTotal.textContent = records.length;
  statSum.textContent = records.reduce((acc,r)=>acc+r.amount,0).toFixed(2) + ' RWF';

  const categories = {};
  records.forEach(r => categories[r.category] = (categories[r.category]||0)+1);
  const topCategory = Object.keys(categories).reduce((a,b)=> categories[a]>categories[b]?a:b, '—');
  statTop.textContent = topCategory;
}

// ===========================
// Regex Utilities
// ===========================
function safeRegex(input) {
  try {
    return input ? new RegExp(input, 'i') : null;
  } catch {
    return null;
  }
}

function highlight(text, regex) {
  if (!regex) return text;
  return text.replace(regex, m => `<mark>${m}</mark>`);
}

// ===========================
// Event Handlers
// ===========================
addRecordBtn.addEventListener('click', () => {
  recordForm.hidden = false;
});

cancelBtn.addEventListener('click', () => {
  recordForm.hidden = true;
  form.reset();
});

form?.addEventListener('submit', (e) => {
  e.preventDefault();
  const newRecord = {
    id: generateId(),
    description: document.getElementById('desc').value.trim(),
    amount: parseFloat(document.getElementById('amount').value),
    category: document.getElementById('category').value.trim(),
    date: document.getElementById('date').value,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  records.push(newRecord);
  saveData();
  renderRecords();
  recordForm.hidden = true;
  form.reset();
});

searchInput?.addEventListener('input', (e) => {
  renderRecords(e.target.value);
});

// ===========================
// Edit & Delete Functions
// ===========================
function deleteRecord(id) {
  if (confirm('Are you sure you want to delete this record?')) {
    records = records.filter(r => r.id !== id);
    saveData();
    renderRecords(searchInput.value);
  }
}

function editRecord(id) {
  const record = records.find(r => r.id === id);
  if (!record) return;

  recordForm.hidden = false;
  document.getElementById('desc').value = record.description;
  document.getElementById('amount').value = record.amount;
  document.getElementById('category').value = record.category;
  document.getElementById('date').value = record.date;

  form.onsubmit = (e) => {
    e.preventDefault();
    record.description = document.getElementById('desc').value.trim();
    record.amount = parseFloat(document.getElementById('amount').value);
    record.category = document.getElementById('category').value.trim();
    record.date = document.getElementById('date').value;
    record.updatedAt = new Date().toISOString();
    saveData();
    renderRecords(searchInput.value);
    recordForm.hidden = true;
    form.reset();
    form.onsubmit = null; // Reset to default
  };
}

// ===========================
// Initial Render
// ===========================
renderRecords();

function updateStats(selectedCategory = '') {
    const settings = JSON.parse(localStorage.getItem('finance:settings')) || {
        rateUSD: 1200,
        rateEUR: 1300,
        baseCurrency: 'RWF'
    };

    const filteredRecords = selectedCategory ? 
        records.filter(r => r.category.toLowerCase() === selectedCategory.toLowerCase()) : 
        records;

    const totalAmount = filteredRecords.reduce((sum, record) => {
        let amount = record.amount;
        if (record.currency === 'USD') {
            amount *= settings.rateUSD;
        } else if (record.currency === 'EUR') {
            amount *= settings.rateEUR;
        }
        return sum + amount;
    }, 0);

    statTotal.textContent = filteredRecords.length;
    statSum.textContent = totalAmount.toFixed(2) + ' ' + settings.baseCurrency;
    statTop.textContent = selectedCategory || '—';
}

function updateRecentTransactions() {
    const recentList = document.getElementById('recentList');
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    const recentRecords = records
        .filter(record => new Date(record.date) >= sevenDaysAgo)
        .sort((a, b) => new Date(b.date) - new Date(a.date));
    
    recentList.innerHTML = recentRecords
        .map(record => `
            <li class="recent-item">
                <span class="recent-date">${new Date(record.date).toLocaleDateString()}</span>
                <span class="recent-desc">${record.description}</span>
                <span class="recent-amount">${record.amount} ${record.currency || 'RWF'}</span>
            </li>
        `)
        .join('');
}

document.addEventListener('DOMContentLoaded', () => {
    updateStats();
    updateRecentTransactions();
});