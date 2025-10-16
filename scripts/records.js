function deleteRecord(id) {
    const records = JSON.parse(localStorage.getItem('finance:data') || '[]');
    const updatedRecords = records.filter(record => record.id !== id);
    localStorage.setItem('finance:data', JSON.stringify(updatedRecords));
    location.reload();
}

function editRecord(id) {
    const records = JSON.parse(localStorage.getItem('finance:data') || '[]');
    const record = records.find(r => r.id === id);
    
    const tr = document.querySelector(`button[onclick="editRecord('${id}')"]`).closest('tr');
    tr.innerHTML = `
        <td><input type="text" id="edit-desc" value="${record.description}"></td>
        <td><input type="number" id="edit-amount" value="${record.amount}"></td>
        <td><input type="text" id="edit-category" value="${record.category}"></td>
        <td><input type="date" id="edit-date" value="${record.date}"></td>
        <td>
            <button onclick="saveEdit('${id}')">Save</button>
            <button onclick="location.reload()">Cancel</button>
        </td>
    `;
}

function saveEdit(id) {
    const records = JSON.parse(localStorage.getItem('finance:data') || '[]');
    const index = records.findIndex(r => r.id === id);
    
    records[index] = {
        ...records[index],
        description: document.getElementById('edit-desc').value,
        amount: parseFloat(document.getElementById('edit-amount').value),
        category: document.getElementById('edit-category').value,
        date: document.getElementById('edit-date').value,
        updatedAt: new Date().toISOString()
    };
    
    localStorage.setItem('finance:data', JSON.stringify(records));
    location.reload();
}

function renderTable(records) {
    const tbody = document.getElementById('records-body');
    tbody.innerHTML = '';
    
    records.forEach(record => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${record.description}</td>
            <td>${record.amount.toFixed(2)} ${record.currency || 'RWF'}</td>
            <td>${record.category}</td>
            <td>${record.date}</td>
            <td>
                <button onclick="editRecord('${record.id}')">Edit</button>
                <button onclick="deleteRecord('${record.id}')">Delete</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function filterAndSortRecords() {
    let records = JSON.parse(localStorage.getItem('finance:data') || '[]');
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const sortOption = document.getElementById('sortSelect').value;

    // Filter records
    records = records.filter(record => 
        record.description.toLowerCase().includes(searchTerm) ||
        record.category.toLowerCase().includes(searchTerm) ||
        record.amount.toString().includes(searchTerm) ||
        record.date.includes(searchTerm)
    );

    // Sort records
    records.sort((a, b) => {
        switch(sortOption) {
            case 'az':
                return a.description.localeCompare(b.description);
            case 'za':
                return b.description.localeCompare(a.description);
            case 'date-new':
                return new Date(b.date) - new Date(a.date);
            case 'date-old':
                return new Date(a.date) - new Date(b.date);
            case 'amount-high':
                return b.amount - a.amount;
            case 'amount-low':
                return a.amount - b.amount;
            default:
                return 0;
        }
    });

    renderTable(records);
}

// Add event listeners
document.addEventListener('DOMContentLoaded', () => {
    filterAndSortRecords();
    
    document.getElementById('searchInput').addEventListener('input', filterAndSortRecords);
    document.getElementById('sortSelect').addEventListener('change', filterAndSortRecords);
});