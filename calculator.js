// Scottish Tax Rates 2025/26
const TAX_BANDS = [
    { threshold: 12570, rate: 0, name: 'Personal Allowance' },
    { threshold: 14876, rate: 0.19, name: 'Starter Rate' },
    { threshold: 26561, rate: 0.20, name: 'Basic Rate' },
    { threshold: 43662, rate: 0.21, name: 'Intermediate Rate' },
    { threshold: 75000, rate: 0.42, name: 'Higher Rate' },
    { threshold: 125140, rate: 0.45, name: 'Advanced Rate' },
    { threshold: Infinity, rate: 0.48, name: 'Top Rate' }
];

// National Insurance thresholds 2025/26
const NI_PRIMARY_THRESHOLD = 12570;
const NI_UPPER_EARNINGS_LIMIT = 50270;
const NI_RATE_STANDARD = 0.08;
const NI_RATE_ADDITIONAL = 0.02;

// Personal Allowance taper
const PA_TAPER_THRESHOLD = 100000;
const PERSONAL_ALLOWANCE = 12570;

// DOM Elements
const salaryInput = document.getElementById('salary');
const pensionTypeSelect = document.getElementById('pensionType');
const pensionContributionInput = document.getElementById('pensionContribution');
const pensionLabel = document.getElementById('pensionLabel');
const additionalMonthlyInput = document.getElementById('additionalMonthly');
const additionalYearlyInput = document.getElementById('additionalYearly');
const calculateBtn = document.getElementById('calculateBtn');
const resultsSection = document.getElementById('results');

// Result elements
const netMonthlyElement = document.getElementById('netMonthly');
const netAnnualElement = document.getElementById('netAnnual');
const grossSalaryElement = document.getElementById('grossSalary');
const pensionAmountElement = document.getElementById('pensionAmount');
const taxableIncomeElement = document.getElementById('taxableIncome');
const personalAllowanceElement = document.getElementById('personalAllowance');
const incomeTaxElement = document.getElementById('incomeTax');
const nationalInsuranceElement = document.getElementById('nationalInsurance');
const additionalMonthlyDisplayElement = document.getElementById('additionalMonthlyDisplay');
const additionalYearlyDisplayElement = document.getElementById('additionalYearlyDisplay');

// Event Listeners
pensionTypeSelect.addEventListener('change', updatePensionLabel);
calculateBtn.addEventListener('click', calculate);

// Allow Enter key to trigger calculation
[salaryInput, pensionContributionInput, additionalMonthlyInput, additionalYearlyInput].forEach(input => {
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            calculate();
        }
    });
});

function updatePensionLabel() {
    const type = pensionTypeSelect.value;
    if (type === 'percentage') {
        pensionLabel.textContent = 'Pension Contribution (%)';
        pensionContributionInput.placeholder = 'e.g., 5';
    } else {
        pensionLabel.textContent = 'Pension Contribution (£)';
        pensionContributionInput.placeholder = 'e.g., 2000';
    }
}

function calculatePersonalAllowance(income) {
    if (income <= PA_TAPER_THRESHOLD) {
        return PERSONAL_ALLOWANCE;
    }

    const excess = income - PA_TAPER_THRESHOLD;
    const reduction = Math.floor(excess / 2);
    const adjustedAllowance = Math.max(0, PERSONAL_ALLOWANCE - reduction);

    return adjustedAllowance;
}

function calculateScottishIncomeTax(taxableIncome) {
    let tax = 0;
    let previousThreshold = 0;

    const personalAllowance = calculatePersonalAllowance(taxableIncome);

    // Adjust the first threshold to be the personal allowance
    const adjustedBands = [...TAX_BANDS];
    adjustedBands[0] = { threshold: personalAllowance, rate: 0, name: 'Personal Allowance' };

    for (let i = 0; i < adjustedBands.length; i++) {
        const band = adjustedBands[i];
        const currentThreshold = band.threshold;

        if (taxableIncome > previousThreshold) {
            const taxableInBand = Math.min(taxableIncome, currentThreshold) - previousThreshold;
            tax += taxableInBand * band.rate;
        }

        previousThreshold = currentThreshold;

        if (taxableIncome <= currentThreshold) {
            break;
        }
    }

    return tax;
}

function calculateNationalInsurance(grossSalary) {
    if (grossSalary <= NI_PRIMARY_THRESHOLD) {
        return 0;
    }

    let ni = 0;

    if (grossSalary <= NI_UPPER_EARNINGS_LIMIT) {
        ni = (grossSalary - NI_PRIMARY_THRESHOLD) * NI_RATE_STANDARD;
    } else {
        ni = (NI_UPPER_EARNINGS_LIMIT - NI_PRIMARY_THRESHOLD) * NI_RATE_STANDARD;
        ni += (grossSalary - NI_UPPER_EARNINGS_LIMIT) * NI_RATE_ADDITIONAL;
    }

    return ni;
}

function formatCurrency(amount) {
    return new Intl.NumberFormat('en-GB', {
        style: 'currency',
        currency: 'GBP',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(amount);
}

function showPersonalAllowanceWarning(taxableIncome, personalAllowance) {
    // Remove any existing warnings
    const existingWarning = document.getElementById('paWarning');
    if (existingWarning) {
        existingWarning.remove();
    }

    // Only show warning if personal allowance is reduced
    if (taxableIncome > PA_TAPER_THRESHOLD) {
        const reduction = PERSONAL_ALLOWANCE - personalAllowance;
        const warningDiv = document.createElement('div');
        warningDiv.id = 'paWarning';
        warningDiv.className = 'result-card warning';

        if (personalAllowance === 0) {
            warningDiv.innerHTML = `
                <h3>⚠️ Personal Allowance Lost</h3>
                <p>Your income is over £125,140, so you have lost your entire personal allowance of £${PERSONAL_ALLOWANCE.toLocaleString()}.</p>
                <p><strong>Consider:</strong> Increasing your pension contribution can reduce your taxable income and restore some of your personal allowance.</p>
            `;
        } else {
            warningDiv.innerHTML = `
                <h3>⚠️ Personal Allowance Reduced</h3>
                <p>Your income is over £100,000, so your personal allowance has been reduced by £${reduction.toLocaleString()} (from £${PERSONAL_ALLOWANCE.toLocaleString()} to £${personalAllowance.toLocaleString()}).</p>
                <p><strong>Tax saving tip:</strong> Increasing your pension contribution can reduce your taxable income below £100,000 and restore your full personal allowance.</p>
            `;
        }

        // Insert warning before the tax rates card
        const taxRatesCard = document.querySelector('.result-card.info');
        taxRatesCard.parentNode.insertBefore(warningDiv, taxRatesCard);
    }
}

function calculate() {
    // Get input values
    const grossSalary = parseFloat(salaryInput.value) || 0;
    const pensionType = pensionTypeSelect.value;
    const pensionInput = parseFloat(pensionContributionInput.value) || 0;
    const additionalMonthly = parseFloat(additionalMonthlyInput.value) || 0;
    const additionalYearly = parseFloat(additionalYearlyInput.value) || 0;

    // Validate input
    if (grossSalary <= 0) {
        alert('Please enter a valid salary amount.');
        return;
    }

    // Calculate pension contribution (salary sacrifice - before tax)
    let pensionContribution;
    if (pensionType === 'percentage') {
        pensionContribution = (grossSalary * pensionInput) / 100;
    } else {
        pensionContribution = pensionInput;
    }

    // Ensure pension contribution doesn't exceed salary
    if (pensionContribution > grossSalary) {
        alert('Pension contribution cannot exceed your gross salary.');
        return;
    }

    // Calculate taxable income (after pension sacrifice)
    const taxableIncome = grossSalary - pensionContribution;

    // Calculate personal allowance (for display)
    const personalAllowance = calculatePersonalAllowance(taxableIncome);

    // Calculate taxes
    const incomeTax = calculateScottishIncomeTax(taxableIncome);
    const nationalInsurance = calculateNationalInsurance(taxableIncome);

    // Calculate total additional deductions (annual)
    const totalAdditionalDeductions = (additionalMonthly * 12) + additionalYearly;

    // Calculate net pay
    const netAnnual = taxableIncome - incomeTax - nationalInsurance - totalAdditionalDeductions;
    const netMonthly = netAnnual / 12;

    // Display results
    grossSalaryElement.textContent = formatCurrency(grossSalary);
    pensionAmountElement.textContent = formatCurrency(pensionContribution);
    taxableIncomeElement.textContent = formatCurrency(taxableIncome);
    personalAllowanceElement.textContent = formatCurrency(personalAllowance);
    incomeTaxElement.textContent = formatCurrency(incomeTax);
    nationalInsuranceElement.textContent = formatCurrency(nationalInsurance);
    additionalMonthlyDisplayElement.textContent = formatCurrency(additionalMonthly * 12);
    additionalYearlyDisplayElement.textContent = formatCurrency(additionalYearly);
    netMonthlyElement.textContent = formatCurrency(netMonthly);
    netAnnualElement.textContent = formatCurrency(netAnnual);

    // Show warning if personal allowance is reduced
    showPersonalAllowanceWarning(taxableIncome, personalAllowance);

    // Show results section
    resultsSection.style.display = 'block';

    // Smooth scroll to results on mobile
    if (window.innerWidth <= 768) {
        resultsSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

// Add helpful tooltips
function addTooltip() {
    const tooltipText = 'Pension contributions via salary sacrifice reduce your taxable income, saving you tax and National Insurance.';
    console.log('Tip:', tooltipText);
}

// Initialize
updatePensionLabel();
