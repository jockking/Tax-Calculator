# Scottish Pension Calculator

A web-based calculator to help determine the optimal pension contribution from your salary, specifically designed for Scottish tax rates.

## Features

- **Scottish Tax Calculation**: Uses the 2025/26 Scottish income tax bands and rates
- **National Insurance**: Accurately calculates NI contributions based on current rates
- **Pension Contribution Options**:
  - Percentage of salary
  - Fixed amount in pounds
- **Additional Deductions**: Support for monthly and yearly deductions
- **Salary Sacrifice**: Pension contributions are calculated via salary sacrifice (pre-tax)
- **Take-Home Pay**: Shows both monthly and annual net pay
- **Detailed Breakdown**: Complete breakdown of all deductions
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## How to Use

### Live Demo

Visit the calculator at: `https://[your-github-username].github.io/Tax-Calculator/`

### Inputs

1. **Annual Gross Salary**: Enter your annual salary before tax
2. **Pension Contribution Type**: Choose between percentage or fixed amount
3. **Pension Contribution**: Enter your pension contribution (% or £)
4. **Additional Monthly Deductions**: Optional monthly deductions (e.g., childcare vouchers, union fees)
5. **Additional Yearly Deductions**: Optional annual deductions (e.g., professional memberships)

Click **Calculate** to see your results.

### Results

The calculator shows:
- **Net Monthly Pay**: Your take-home pay each month
- **Net Annual Pay**: Your total take-home pay for the year
- **Breakdown**: Detailed breakdown including:
  - Gross salary
  - Pension contribution
  - Taxable income (after pension)
  - Scottish income tax
  - National Insurance
  - All additional deductions

## Tax Information (2025/26)

### Scottish Income Tax Bands

| Band | Income Range | Rate |
|------|--------------|------|
| Personal Allowance | Up to £12,570 | 0% |
| Starter Rate | £12,571 - £14,876 | 19% |
| Basic Rate | £14,877 - £26,561 | 20% |
| Intermediate Rate | £26,562 - £43,662 | 21% |
| Higher Rate | £43,663 - £75,000 | 42% |
| Advanced Rate | £75,001 - £125,140 | 45% |
| Top Rate | Over £125,140 | 48% |

**Note**: Personal allowance reduces by £1 for every £2 earned over £100,000

### National Insurance (2025/26)

- **Primary Threshold**: £12,570
- **Standard Rate**: 8% on earnings between £12,570 and £50,270
- **Additional Rate**: 2% on earnings above £50,270

## How Pension Contributions Work

This calculator assumes **salary sacrifice** pension contributions:

1. Pension contributions are deducted **before** tax
2. This reduces your taxable income
3. You save both income tax and National Insurance on the contributed amount
4. This is the most tax-efficient way to contribute to a pension

### Example

If you earn £40,000 and contribute 5% (£2,000) to your pension:
- Taxable income = £38,000 (not £40,000)
- You pay tax and NI on £38,000 only
- You save approximately £840 in tax and NI (depending on your tax band)

## Deployment to GitHub Pages

### Option 1: Via GitHub Website

1. Go to your repository on GitHub
2. Click **Settings**
3. Scroll to **Pages** section
4. Under **Source**, select the branch: `claude/pension-calculator-scotland-rnzNu`
5. Click **Save**
6. Your site will be published at: `https://[username].github.io/Tax-Calculator/`

### Option 2: Via Command Line

```bash
# Make sure you're on the correct branch
git checkout claude/pension-calculator-scotland-rnzNu

# Enable GitHub Pages (using gh CLI)
gh repo edit --enable-pages --pages-branch claude/pension-calculator-scotland-rnzNu
```

## Local Development

To run locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/[username]/Tax-Calculator.git
   cd Tax-Calculator
   ```

2. Open `index.html` in your web browser, or use a local server:
   ```bash
   # Python 3
   python -m http.server 8000

   # Or using Node.js
   npx serve
   ```

3. Visit `http://localhost:8000` in your browser

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Important Notes

- This calculator is for **guidance only** and should not be considered financial advice
- Tax rates are based on 2025/26 rates and may change
- The calculator assumes you're under State Pension age
- It doesn't include:
  - Student loan repayments
  - Scottish Water charges
  - Other specific deductions
  - Employer pension contributions

## Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

## License

This project is open source and available under the MIT License.

## Disclaimer

This calculator is provided for informational purposes only. Always consult with a financial advisor or use official HMRC calculators for accurate tax calculations. The creator assumes no liability for any decisions made based on this calculator.
