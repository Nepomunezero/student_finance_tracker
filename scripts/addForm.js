document.getElementById('expenseForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const newExpense = {
        id: 'rec_' + Date.now(),
        description: document.getElementById('description').value,
        amount: parseFloat(document.getElementById('amount').value),
        currency: document.getElementById('currency').value,
        category: document.getElementById('category').value,
        date: document.getElementById('date').value,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };
    
    const settings = JSON.parse(localStorage.getItem('finance:settings')) || {
        rateUSD: 1200,
        rateEUR: 1300,
        baseCurrency: 'RWF'
    };

    if (newExpense.currency !== settings.baseCurrency) {
        const rate = newExpense.currency === 'USD' ? settings.rateUSD : settings.rateEUR;
        newExpense.originalAmount = newExpense.amount;
        newExpense.originalCurrency = newExpense.currency;
        newExpense.amount = newExpense.amount * rate;
        newExpense.currency = settings.baseCurrency;
    }
    
    let records = JSON.parse(localStorage.getItem('finance:data') || '[]');
    records.push(newExpense);
    localStorage.setItem('finance:data', JSON.stringify(records));
    
    this.reset();
    alert('Expense added successfully!');
});

document.getElementById('currency').addEventListener('change', function() {
    const amount = document.getElementById('amount').value;
    const settings = JSON.parse(localStorage.getItem('finance:settings')) || {
        rateUSD: 1200,
        rateEUR: 1300,
        baseCurrency: 'RWF'
    };
    
    if (amount) {
        const originalCurrency = this.value;
        const rate = originalCurrency === 'USD' ? settings.rateUSD : settings.rateEUR;
        const convertedAmount = parseFloat(amount) * (originalCurrency === settings.baseCurrency ? 1 : rate);
        
        document.getElementById('convertedAmount').textContent = 
            `≈ ${convertedAmount.toFixed(2)} ${settings.baseCurrency}`;
    }
});