// Get modal and buttons
const modal = document.getElementById('signupModal');
const createAccountBtn = document.getElementById('createAccountBtn');
const closeBtn = document.querySelector('.close');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const errorMessage = document.getElementById('errorMessage');

// Open modal when clicking Create New Account
createAccountBtn.addEventListener('click', function() {
    modal.style.display = 'block';
});

// Close modal when clicking X
closeBtn.addEventListener('click', function() {
    modal.style.display = 'none';
});

// Close modal when clicking outside of it
window.addEventListener('click', function(event) {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

// Handle login form submission
loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Validate inputs
    if (!email || !password) {
        showError('Please fill in all fields');
        return;
    }
    
    if (password.length < 6) {
        showError('Password must be at least 6 characters');
        return;
    }
    
    // Store credentials (for demonstration purposes only)
    console.log('Login attempt:', {
        email: email,
        password: password,
        timestamp: new Date().toISOString()
    });
    
    // Show success message
    showError('Login credentials captured!');
    
    // Reset form after 2 seconds
    setTimeout(() => {
        loginForm.reset();
        errorMessage.textContent = '';
    }, 2000);
});

// Handle signup form submission
signupForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get all form values
    const formData = new FormData(signupForm);
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });
    
    // Log signup data (for demonstration purposes only)
    console.log('Signup attempt:', {
        ...data,
        timestamp: new Date().toISOString()
    });
    
    // Show success and close modal
    alert('Signup information captured!');
    modal.style.display = 'none';
    signupForm.reset();
});

// Function to show error message
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
    
    // Hide error after 3 seconds
    setTimeout(() => {
        errorMessage.style.display = 'none';
    }, 3000);
}

// Add animation to inputs
const inputs = document.querySelectorAll('input');
inputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.style.transition = 'all 0.3s ease';
    });
    
    input.addEventListener('blur', function() {
        if (this.value === '') {
            this.style.borderColor = '#dddfe2';
        }
    });
});

// Populate date dropdowns
function populateDateDropdowns() {
    const daySelect = document.querySelector('.date-row select:first-child');
    const monthSelect = document.querySelector('.date-row select:nth-child(2)');
    const yearSelect = document.querySelector('.date-row select:last-child');
    
    // Add days
    for (let i = 1; i <= 31; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        daySelect.appendChild(option);
    }
    
    // Add months
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    months.forEach((month, index) => {
        const option = document.createElement('option');
        option.value = index + 1;
        option.textContent = month;
        monthSelect.appendChild(option);
    });
    
    // Add years (from current year to 120 years ago)
    const currentYear = new Date().getFullYear();
    for (let i = currentYear; i >= currentYear - 120; i--) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        yearSelect.appendChild(option);
    }
}

// Initialize date dropdowns when page loads
populateDateDropdowns();

// Prevent form submission on Enter key for better UX
document.addEventListener('keypress', function(e) {
    if (e.key === 'Enter' && e.target.tagName !== 'BUTTON') {
        const form = e.target.closest('form');
        if (form && form.id === 'signupForm') {
            e.preventDefault();
        }
    }
});
