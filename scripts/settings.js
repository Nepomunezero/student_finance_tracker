// ===========================
// Settings Persistence
// ===========================
const SETTINGS_KEY = 'finance:settings';

// DOM Elements
const settingsForm = document.getElementById('settingsForm');
const baseCurrencyInput = document.getElementById('baseCurrency');
const rateUSDInput = document.getElementById('rateUSD');
const rateEURInput = document.getElementById('rateEUR');
const budgetCapInput = document.getElementById('budgetCap');
const capMessage = document.getElementById('capMessage');

// Load saved settings
let settings = JSON.parse(localStorage.getItem(SETTINGS_KEY)) || {
  baseCurrency: 'RWF',
  rateUSD: 1,
  rateEUR: 1,
  budgetCap: 0
};

// Apply saved settings to the form inputs
baseCurrencyInput.value = settings.baseCurrency;
rateUSDInput.value = settings.rateUSD;
rateEURInput.value = settings.rateEUR;
budgetCapInput.value = settings.budgetCap;

// Save settings on form submit
settingsForm?.addEventListener('submit', (e) => {
  e.preventDefault();

  settings.baseCurrency = baseCurrencyInput.value;
  settings.rateUSD = parseFloat(rateUSDInput.value);
  settings.rateEUR = parseFloat(rateEURInput.value);
  settings.budgetCap = parseFloat(budgetCapInput.value);

  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  capMessage.textContent = `Settings saved successfully!`;
});

// Reseting form on cancel
const cancelSettingsBtn = document.getElementById('cancelSettingsBtn');
cancelSettingsBtn?.addEventListener('click', () => {
  baseCurrencyInput.value = settings.baseCurrency;
  rateUSDInput.value = settings.rateUSD;
  rateEURInput.value = settings.rateEUR;
  budgetCapInput.value = settings.budgetCap;

  capMessage.textContent = '';
});
