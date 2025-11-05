# 💰 Finance Tracker

A modern, feature-rich personal finance tracker built with vanilla HTML, CSS, and JavaScript. Track your income and expenses, visualize spending patterns, and gain insights into your financial health - all running entirely in your browser with local storage.

![Finance Tracker](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![HTML](https://img.shields.io/badge/HTML-5-orange.svg)
![CSS](https://img.shields.io/badge/CSS-3-blue.svg)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow.svg)

## 📋 Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Screenshots](#screenshots)
- [Installation](#installation)
- [Usage](#usage)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Browser Support](#browser-support)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

### 💵 Transaction Management
- ✅ Add income and expense transactions
- ✅ Categorize transactions (12+ predefined categories)
- ✅ Edit transaction details (description, amount, date, category)
- ✅ Delete individual or all transactions
- ✅ Filter transactions by type and category
- ✅ View transaction history with detailed information

### 📊 Financial Dashboard
- ✅ Real-time balance calculation
- ✅ Total income and expense summary
- ✅ Recent transactions overview
- ✅ Color-coded transaction types (green for income, red for expenses)
- ✅ Interactive and responsive UI

### 📈 Analytics & Insights
- ✅ Interactive doughnut chart for expense breakdown by category
- ✅ Bar chart comparing income vs expenses vs balance
- ✅ Key financial statistics:
  - Average transaction amount
  - Total number of transactions
  - Largest expense and income
  - Savings rate percentage
- ✅ Visual legends and tooltips

### 💾 Data Persistence
- ✅ Local storage integration for data persistence
- ✅ No server required - all data stored in browser
- ✅ Fast and secure local data access

### 🎨 User Interface
- ✅ Modern, clean, and intuitive design
- ✅ Fully responsive layout (mobile, tablet, desktop)
- ✅ Smooth animations and transitions
- ✅ Icon-based category identification
- ✅ Color-coded visual feedback
- ✅ Success notifications for user actions

### 🔒 Security & Privacy
- ✅ All data stored locally in your browser
- ✅ No external server communication
- ✅ Complete privacy - your data never leaves your device

## 🎯 Demo

To see the Finance Tracker in action:
1. Open `index.html` in your web browser
2. Add your first transaction
3. Explore the dashboard, transactions, and analytics sections

## 📸 Screenshots

### Dashboard View
The main dashboard displays your financial summary with balance, income, and expense cards, along with a transaction form and recent transactions list.

### Transactions View
View all your transactions with advanced filtering options by type and category.

### Analytics View
Visualize your spending patterns with interactive charts and detailed financial statistics.

## 🚀 Installation

### Option 1: Direct Download
1. Download the project files or clone the repository:
   ```bash
   git clone https://github.com/yourusername/finance-tracker.git
   ```

2. Navigate to the project directory:
   ```bash
   cd finance-tracker
   ```

3. Open `index.html` in your preferred web browser:
   ```bash
   # On macOS
   open index.html
   
   # On Linux
   xdg-open index.html
   
   # On Windows
   start index.html
   ```

### Option 2: Using a Local Server
For a better development experience, use a local server:

**Using Python:**
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

**Using Node.js (with http-server):**
```bash
npx http-server -p 8000
```

**Using VS Code Live Server:**
1. Install the "Live Server" extension
2. Right-click on `index.html`
3. Select "Open with Live Server"

Then open your browser and navigate to `http://localhost:8000`

## 📖 Usage

### Adding a Transaction
1. Navigate to the **Dashboard** section
2. Fill in the transaction form:
   - **Description**: Enter a meaningful description (e.g., "Grocery shopping")
   - **Amount**: Enter the transaction amount
   - **Type**: Select either "Income" or "Expense"
   - **Category**: Choose the appropriate category
   - **Date**: Select the transaction date
3. Click the **Add Transaction** button
4. You'll see a success notification and the transaction will appear in the list

### Viewing Transactions
- **Recent Transactions**: View the 5 most recent transactions on the Dashboard
- **All Transactions**: Navigate to the Transactions section to see all transactions
- Use filters to view specific types or categories of transactions

### Deleting Transactions
- Click the **trash icon** on any transaction to delete it
- Click the **Clear All** button in the Transactions section to delete all transactions (with confirmation)

### Viewing Analytics
1. Navigate to the **Analytics** section
2. View the expense breakdown chart to see spending by category
3. Compare income vs expenses with the bar chart
4. Review financial statistics for insights into your spending habits

### Data Management
- All data is automatically saved to your browser's local storage
- Your data persists between browser sessions
- Clear your browser data/cache to reset the application

## 🏗️ Architecture

### Engineering Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                        FINANCE TRACKER                           │
│                     (Client-Side Application)                    │
└─────────────────────────────────────────────────────────────────┘
                                 │
                                 │
        ┌────────────────────────┼────────────────────────┐
        │                        │                        │
        ▼                        ▼                        ▼
┌───────────────┐      ┌───────────────┐      ┌──────────────────┐
│  PRESENTATION │      │   BUSINESS    │      │   DATA LAYER     │
│     LAYER     │      │     LOGIC     │      │                  │
│   (HTML/CSS)  │◄────►│  (JavaScript) │◄────►│ (LocalStorage)   │
└───────────────┘      └───────────────┘      └──────────────────┘
        │                        │                        │
        │                        │                        │
        ▼                        ▼                        ▼
┌───────────────┐      ┌───────────────┐      ┌──────────────────┐
│   index.html  │      │    app.js     │      │  Browser Local   │
│               │      │               │      │     Storage      │
│ - Header      │      │ - State Mgmt  │      │                  │
│ - Dashboard   │      │ - Event       │      │ transactions:    │
│ - Transactions│      │   Handlers    │      │   [Array]        │
│ - Analytics   │      │ - CRUD Ops    │      │                  │
│ - Footer      │      │ - Calculations│      └──────────────────┘
└───────────────┘      │ - Rendering   │
        │              │ - Charts      │
        │              └───────────────┘
        ▼                        │
┌───────────────┐               │
│  styles.css   │               │
│               │               │
│ - Variables   │               ▼
│ - Components  │      ┌───────────────┐
│ - Responsive  │      │  EXTERNAL     │
│ - Animations  │      │  LIBRARIES    │
└───────────────┘      │               │
                       │ - Chart.js    │
                       │ - Font Awesome│
                       └───────────────┘
```

### Component Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         APPLICATION FLOW                         │
└─────────────────────────────────────────────────────────────────┘

     ┌─────────────┐
     │   User      │
     │  Interface  │
     └──────┬──────┘
            │
            │ User Actions
            ▼
     ┌─────────────┐
     │   Event     │
     │  Handlers   │
     └──────┬──────┘
            │
            ├─────► Add Transaction ──────┐
            ├─────► Delete Transaction ────┤
            ├─────► Filter Transactions ───┤
            ├─────► Navigate Sections ─────┤
            └─────► Clear All Data ────────┤
                                           │
                                           ▼
                                  ┌────────────────┐
                                  │  Transaction   │
                                  │   Controller   │
                                  └────────┬───────┘
                                           │
                    ┌──────────────────────┼──────────────────────┐
                    │                      │                      │
                    ▼                      ▼                      ▼
            ┌───────────────┐     ┌───────────────┐     ┌──────────────┐
            │   Data Model  │     │  Calculator   │     │   Renderer   │
            │               │     │               │     │              │
            │ - transactions│     │ - Calculate   │     │ - Dashboard  │
            │   array       │     │   Totals      │     │ - Trans List │
            │ - CRUD ops    │     │ - Statistics  │     │ - Charts     │
            └───────┬───────┘     └───────────────┘     └──────────────┘
                    │
                    ▼
            ┌───────────────┐
            │ LocalStorage  │
            │   API         │
            │               │
            │ - save()      │
            │ - load()      │
            └───────────────┘
```

### Data Flow

```
┌──────────────────────────────────────────────────────────────────┐
│                        DATA FLOW DIAGRAM                         │
└──────────────────────────────────────────────────────────────────┘

  User Input Form
        │
        │ Submit Event
        ▼
  Validate Input
        │
        │ Valid?
        ▼
  Create Transaction Object
  {
    id: timestamp,
    description: string,
    amount: number,
    type: 'income' | 'expense',
    category: string,
    date: string,
    timestamp: ISO string
  }
        │
        ▼
  Add to transactions[]
        │
        ├──────► Save to LocalStorage
        │
        ├──────► Update Dashboard
        │         │
        │         ├─► Calculate Totals
        │         └─► Update Summary Cards
        │
        ├──────► Render Transaction Lists
        │         │
        │         ├─► Recent Transactions (5)
        │         └─► All Transactions (filtered)
        │
        └──────► Update Analytics
                  │
                  ├─► Calculate Statistics
                  ├─► Generate Category Chart
                  └─► Generate Income/Expense Chart
```

### Module Structure

```
app.js
│
├─ State Management
│  └─ transactions[] array
│  └─ charts{} object
│
├─ Initialization
│  ├─ Load from LocalStorage
│  ├─ Set up Event Listeners
│  └─ Render Initial UI
│
├─ Event Handlers
│  ├─ handleAddTransaction()
│  ├─ deleteTransaction()
│  ├─ handleClearAll()
│  └─ Navigation handlers
│
├─ Data Management
│  ├─ saveTransactions()
│  ├─ loadTransactions()
│  └─ CRUD operations
│
├─ Calculations
│  ├─ calculateTotals()
│  └─ updateStatistics()
│
├─ Rendering Functions
│  ├─ updateDashboard()
│  ├─ renderRecentTransactions()
│  ├─ renderAllTransactions()
│  └─ createTransactionHTML()
│
├─ Analytics
│  ├─ updateCategoryChart()
│  └─ updateIncomeExpenseChart()
│
└─ Utilities
   ├─ formatCurrency()
   ├─ formatDate()
   ├─ getCategoryIcon()
   └─ showNotification()
```

## 📁 Project Structure

```
Finance Tracker/
│
├── index.html                 # Main HTML file
│   ├── Header Section
│   ├── Dashboard Section
│   ├── Transactions Section
│   ├── Analytics Section
│   └── Footer Section
│
├── css/
│   └── styles.css            # Main stylesheet
│       ├── CSS Variables & Reset
│       ├── Header Styles
│       ├── Summary Cards
│       ├── Transaction Form
│       ├── Transaction List
│       ├── Analytics Section
│       ├── Responsive Design
│       └── Animations
│
├── js/
│   └── app.js               # Main JavaScript file
│       ├── State Management
│       ├── Event Listeners
│       ├── Navigation Logic
│       ├── LocalStorage Operations
│       ├── Transaction CRUD
│       ├── Dashboard Updates
│       ├── Rendering Functions
│       ├── Analytics & Charts
│       └── Utility Functions
│
├── assets/                  # Assets folder (for future images/icons)
│
└── README.md               # Project documentation
```

## 🛠️ Technologies Used

### Core Technologies
- **HTML5**: Semantic markup and structure
- **CSS3**: Modern styling with Flexbox and Grid
- **JavaScript (ES6+)**: Application logic and interactivity

### External Libraries
- **[Chart.js](https://www.chartjs.org/)** (v4.4.0): Interactive and responsive charts
- **[Font Awesome](https://fontawesome.com/)** (v6.4.0): Icon library for UI elements

### Browser APIs
- **LocalStorage API**: Client-side data persistence
- **DOM API**: Dynamic content manipulation
- **Canvas API**: Chart rendering (via Chart.js)

### Design Principles
- **Responsive Design**: Mobile-first approach
- **CSS Variables**: Consistent theming
- **BEM Methodology**: Component-based CSS organization
- **Progressive Enhancement**: Core functionality without JavaScript dependencies

## 🌐 Browser Support

The Finance Tracker works on all modern browsers:

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Opera (latest)

**Minimum Requirements:**
- LocalStorage support
- ES6 JavaScript support
- CSS Grid and Flexbox support
- Canvas API support

## 🚧 Future Enhancements

Potential features for future versions:

- [ ] Export data to CSV/PDF
- [ ] Import transactions from CSV
- [ ] Budget setting and tracking
- [ ] Recurring transactions
- [ ] Multiple accounts support
- [ ] Custom categories
- [ ] Date range filtering
- [ ] Monthly/yearly reports
- [ ] Data backup to cloud
- [ ] Currency conversion
- [ ] Dark mode theme
- [ ] Print-friendly reports
- [ ] Search functionality
- [ ] Transaction editing
- [ ] Data visualization improvements

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/AmazingFeature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
5. Push to the branch (`git push origin feature/AmazingFeature`)
6. Open a Pull Request

### Contribution Guidelines
- Follow the existing code style
- Write clear commit messages
- Test your changes thoroughly
- Update documentation as needed

## 📝 License

This project is licensed under the MIT License - see below for details:

```
MIT License

Copyright (c) 2025 Finance Tracker

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## 👤 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- Email: your.email@example.com

## 🙏 Acknowledgments

- [Chart.js](https://www.chartjs.org/) for the amazing charting library
- [Font Awesome](https://fontawesome.com/) for the beautiful icons
- Inspiration from various personal finance applications
- The open-source community for continuous support

## 📞 Support

If you have any questions or need help with the Finance Tracker:

- Open an issue on GitHub
- Email: support@financetracker.com
- Documentation: See this README file

## ⭐ Show Your Support

If you found this project helpful, please give it a ⭐️!

---

**Happy Tracking! 💰📊**

*Built with ❤️ using HTML, CSS, and JavaScript*
