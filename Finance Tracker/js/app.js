// ===========================
// State Management
// ===========================
let transactions = [];
let charts = {
    category: null,
    incomeExpense: null
};

// ===========================
// Initialize App
// ===========================
document.addEventListener('DOMContentLoaded', () => {
    loadTransactions();
    initializeEventListeners();
    setDefaultDate();
    updateDashboard();
    renderRecentTransactions();
    renderAllTransactions();
    updateAnalytics();
});

// ===========================
// Event Listeners
// ===========================
function initializeEventListeners() {
    // Navigation
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const section = e.currentTarget.dataset.section;
            showSection(section);
        });
    });

    // Transaction Form
    document.getElementById('transactionForm').addEventListener('submit', handleAddTransaction);

    // Filter Controls
    document.getElementById('filterType').addEventListener('change', renderAllTransactions);
    document.getElementById('filterCategory').addEventListener('change', renderAllTransactions);

    // Clear All Button
    document.getElementById('clearAllBtn').addEventListener('click', handleClearAll);

    // Category selector based on type
    document.getElementById('type').addEventListener('change', updateCategoryOptions);
}

// ===========================
// Navigation
// ===========================
function showSection(sectionId) {
    // Update active section
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');

    // Update active nav button
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.section === sectionId) {
            btn.classList.add('active');
        }
    });

    // Update analytics if that section is opened
    if (sectionId === 'analytics') {
        updateAnalytics();
    }
}

// ===========================
// Local Storage
// ===========================
function saveTransactions() {
    localStorage.setItem('financeTrackerTransactions', JSON.stringify(transactions));
}

function loadTransactions() {
    const stored = localStorage.getItem('financeTrackerTransactions');
    if (stored) {
        transactions = JSON.parse(stored);
    }
}

// ===========================
// Transaction Management
// ===========================
function handleAddTransaction(e) {
    e.preventDefault();

    const description = document.getElementById('description').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const type = document.getElementById('type').value;
    const category = document.getElementById('category').value;
    const date = document.getElementById('date').value;

    const transaction = {
        id: Date.now(),
        description,
        amount,
        type,
        category,
        date,
        timestamp: new Date().toISOString()
    };

    transactions.unshift(transaction);
    saveTransactions();

    // Reset form
    e.target.reset();
    setDefaultDate();

    // Update UI
    updateDashboard();
    renderRecentTransactions();
    renderAllTransactions();
    updateAnalytics();

    // Show success feedback
    showNotification('Transaction added successfully!', 'success');
}

function deleteTransaction(id) {
    if (confirm('Are you sure you want to delete this transaction?')) {
        transactions = transactions.filter(t => t.id !== id);
        saveTransactions();
        updateDashboard();
        renderRecentTransactions();
        renderAllTransactions();
        updateAnalytics();
        showNotification('Transaction deleted successfully!', 'info');
    }
}

function handleClearAll() {
    if (confirm('Are you sure you want to delete ALL transactions? This action cannot be undone!')) {
        transactions = [];
        saveTransactions();
        updateDashboard();
        renderRecentTransactions();
        renderAllTransactions();
        updateAnalytics();
        showNotification('All transactions cleared!', 'info');
    }
}

// ===========================
// Dashboard Updates
// ===========================
function updateDashboard() {
    const totals = calculateTotals();
    
    document.getElementById('totalBalance').textContent = formatCurrency(totals.balance);
    document.getElementById('totalIncome').textContent = formatCurrency(totals.income);
    document.getElementById('totalExpense').textContent = formatCurrency(totals.expense);
}

function calculateTotals() {
    const income = transactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);
    
    const expense = transactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);
    
    return {
        income,
        expense,
        balance: income - expense
    };
}

// ===========================
// Render Transactions
// ===========================
function renderRecentTransactions() {
    const container = document.getElementById('recentTransactionsList');
    const recent = transactions.slice(0, 5);

    if (recent.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-inbox"></i>
                <p>No transactions yet. Add your first transaction above!</p>
            </div>
        `;
        return;
    }

    container.innerHTML = recent.map(transaction => createTransactionHTML(transaction)).join('');
}

function renderAllTransactions() {
    const container = document.getElementById('allTransactionsList');
    const filterType = document.getElementById('filterType').value;
    const filterCategory = document.getElementById('filterCategory').value;

    let filtered = transactions;

    if (filterType !== 'all') {
        filtered = filtered.filter(t => t.type === filterType);
    }

    if (filterCategory !== 'all') {
        filtered = filtered.filter(t => t.category === filterCategory);
    }

    if (filtered.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-inbox"></i>
                <p>No transactions found.</p>
            </div>
        `;
        return;
    }

    container.innerHTML = filtered.map(transaction => createTransactionHTML(transaction)).join('');
}

function createTransactionHTML(transaction) {
    const icon = getCategoryIcon(transaction.category);
    const formattedDate = formatDate(transaction.date);
    const sign = transaction.type === 'income' ? '+' : '-';

    return `
        <div class="transaction-item ${transaction.type}">
            <div class="transaction-info">
                <div class="transaction-header">
                    <div class="transaction-icon">
                        <i class="${icon}"></i>
                    </div>
                    <span class="transaction-description">${transaction.description}</span>
                </div>
                <div class="transaction-details">
                    <span class="transaction-category">
                        <i class="fas fa-tag"></i>
                        ${formatCategoryName(transaction.category)}
                    </span>
                    <span class="transaction-date">
                        <i class="fas fa-calendar"></i>
                        ${formattedDate}
                    </span>
                </div>
            </div>
            <div class="transaction-amount-wrapper">
                <span class="transaction-amount">${sign}${formatCurrency(transaction.amount)}</span>
                <button class="transaction-delete" onclick="deleteTransaction(${transaction.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `;
}

// ===========================
// Analytics & Charts
// ===========================
function updateAnalytics() {
    updateStatistics();
    updateCharts();
}

function updateStatistics() {
    const totals = calculateTotals();
    const expenseTransactions = transactions.filter(t => t.type === 'expense');
    const incomeTransactions = transactions.filter(t => t.type === 'income');

    // Average Transaction
    const avgTransaction = transactions.length > 0
        ? transactions.reduce((sum, t) => sum + t.amount, 0) / transactions.length
        : 0;

    // Largest Expense
    const largestExpense = expenseTransactions.length > 0
        ? Math.max(...expenseTransactions.map(t => t.amount))
        : 0;

    // Largest Income
    const largestIncome = incomeTransactions.length > 0
        ? Math.max(...incomeTransactions.map(t => t.amount))
        : 0;

    // Savings Rate
    const savingsRate = totals.income > 0
        ? ((totals.income - totals.expense) / totals.income * 100).toFixed(1)
        : 0;

    document.getElementById('avgTransaction').textContent = formatCurrency(avgTransaction);
    document.getElementById('totalTransactions').textContent = transactions.length;
    document.getElementById('largestExpense').textContent = formatCurrency(largestExpense);
    document.getElementById('largestIncome').textContent = formatCurrency(largestIncome);
    document.getElementById('savingsRate').textContent = savingsRate + '%';
}

function updateCharts() {
    updateCategoryChart();
    updateIncomeExpenseChart();
}

function updateCategoryChart() {
    const ctx = document.getElementById('categoryChart');
    const expenseTransactions = transactions.filter(t => t.type === 'expense');

    if (expenseTransactions.length === 0) {
        ctx.getContext('2d').clearRect(0, 0, ctx.width, ctx.height);
        if (charts.category) {
            charts.category.destroy();
            charts.category = null;
        }
        document.getElementById('categoryChartLegend').innerHTML = '<p style="text-align: center; color: #6b7280;">No expense data available</p>';
        return;
    }

    // Group by category
    const categoryData = {};
    expenseTransactions.forEach(t => {
        categoryData[t.category] = (categoryData[t.category] || 0) + t.amount;
    });

    const labels = Object.keys(categoryData).map(cat => formatCategoryName(cat));
    const data = Object.values(categoryData);
    const colors = generateColors(labels.length);

    if (charts.category) {
        charts.category.destroy();
    }

    charts.category = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: colors,
                borderWidth: 2,
                borderColor: '#fff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = formatCurrency(context.parsed);
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = ((context.parsed / total) * 100).toFixed(1);
                            return `${label}: ${value} (${percentage}%)`;
                        }
                    }
                }
            }
        }
    });

    // Custom legend
    const legendHTML = labels.map((label, index) => {
        return `
            <div class="legend-item">
                <div class="legend-color" style="background-color: ${colors[index]}"></div>
                <span>${label}</span>
            </div>
        `;
    }).join('');
    document.getElementById('categoryChartLegend').innerHTML = legendHTML;
}

function updateIncomeExpenseChart() {
    const ctx = document.getElementById('incomeExpenseChart');
    const totals = calculateTotals();

    if (charts.incomeExpense) {
        charts.incomeExpense.destroy();
    }

    charts.incomeExpense = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Income', 'Expenses', 'Balance'],
            datasets: [{
                label: 'Amount',
                data: [totals.income, totals.expense, totals.balance],
                backgroundColor: [
                    'rgba(16, 185, 129, 0.8)',
                    'rgba(239, 68, 68, 0.8)',
                    'rgba(99, 102, 241, 0.8)'
                ],
                borderColor: [
                    'rgba(16, 185, 129, 1)',
                    'rgba(239, 68, 68, 1)',
                    'rgba(99, 102, 241, 1)'
                ],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return formatCurrency(context.parsed.y);
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return '$' + value.toLocaleString();
                        }
                    }
                }
            }
        }
    });
}

// ===========================
// Utility Functions
// ===========================
function formatCurrency(amount) {
    return '$' + amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

function formatCategoryName(category) {
    const names = {
        'salary': 'Salary',
        'freelance': 'Freelance',
        'investment': 'Investment',
        'other-income': 'Other Income',
        'food': 'Food & Dining',
        'transport': 'Transportation',
        'shopping': 'Shopping',
        'entertainment': 'Entertainment',
        'bills': 'Bills & Utilities',
        'health': 'Healthcare',
        'education': 'Education',
        'other-expense': 'Other Expense'
    };
    return names[category] || category;
}

function getCategoryIcon(category) {
    const icons = {
        'salary': 'fas fa-briefcase',
        'freelance': 'fas fa-laptop-code',
        'investment': 'fas fa-chart-line',
        'other-income': 'fas fa-plus-circle',
        'food': 'fas fa-utensils',
        'transport': 'fas fa-car',
        'shopping': 'fas fa-shopping-cart',
        'entertainment': 'fas fa-film',
        'bills': 'fas fa-file-invoice-dollar',
        'health': 'fas fa-heartbeat',
        'education': 'fas fa-graduation-cap',
        'other-expense': 'fas fa-minus-circle'
    };
    return icons[category] || 'fas fa-circle';
}

function generateColors(count) {
    const colors = [
        '#6366f1', '#8b5cf6', '#ec4899', '#ef4444', '#f59e0b',
        '#10b981', '#3b82f6', '#06b6d4', '#14b8a6', '#84cc16',
        '#f97316', '#f43f5e', '#a855f7', '#0ea5e9', '#22c55e'
    ];
    return colors.slice(0, count);
}

function setDefaultDate() {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('date').value = today;
}

function updateCategoryOptions() {
    const type = document.getElementById('type').value;
    const categorySelect = document.getElementById('category');
    
    if (type === 'income') {
        categorySelect.value = 'salary';
    } else {
        categorySelect.value = 'food';
    }
}

function showNotification(message, type = 'success') {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 1000;
        animation: slideInRight 0.3s ease;
        font-weight: 600;
    `;
    notification.textContent = message;

    // Add animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);

    document.body.appendChild(notification);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideInRight 0.3s ease reverse';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Make showSection globally available
window.showSection = showSection;
window.deleteTransaction = deleteTransaction;
