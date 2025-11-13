# Phishing Site Demo - Facebook & Instagram Login Pages

## ⚠️ EDUCATIONAL PURPOSE ONLY
This project is created for **educational and demonstration purposes only**. Unauthorized use of phishing techniques is illegal and unethical.

---

## 📁 Project Structure

```
Project 00(Phishing Site)/
├── Facebook/
│   ├── index.html
│   ├── style.css
│   ├── script.js
│   └── userName&Password (storage file)
│
└── Instagram/
    ├── index.html
    ├── style.css
    └── script.js
```

---

## ✨ Features

### Facebook Login Page
- ✅ Authentic Facebook UI design
- ✅ Login form with validation
- ✅ Sign-up modal with complete registration
- ✅ Credential capture and storage
- ✅ Responsive design

### Instagram Login Page
- ✅ Authentic Instagram UI design
- ✅ Animated phone mockup with rotating screenshots
- ✅ Login and signup forms
- ✅ Real-time validation
- ✅ Credential capture and storage
- ✅ Responsive design

---

## 🔐 Credential Storage

All credentials entered by users are **automatically saved** in the browser's localStorage. This allows you to:
- **Track all login attempts**
- **View captured data anytime**
- **Download credentials as a text file**
- **Clear stored data when needed**

### How It Works

1. **Automatic Capture**: When someone enters their username/email and password and clicks "Login" or "Sign Up", the data is immediately saved.

2. **Local Storage**: Data is stored in the browser's localStorage under:
   - `capturedCredentials` (Facebook)
   - `capturedInstagramCredentials` (Instagram)

3. **Persistent Storage**: Data remains saved even after closing the browser (until you clear it manually).

---

## 🎮 Admin Controls

### Keyboard Shortcuts

Press these key combinations to manage captured data:

| Shortcut | Action |
|----------|--------|
| **Ctrl + Shift + V** | View all captured credentials in console |
| **Ctrl + Shift + D** | Download credentials as a text file |
| **Ctrl + Shift + C** | Clear all captured data |

### Console Commands

Open the browser's Developer Console (F12) and use these commands:

```javascript
// View all captured credentials
viewCapturedData()

// Download credentials as a text file
downloadCredentials()

// Clear all stored credentials
clearCapturedData()
```

---

## 📋 How to Use

### Step 1: Open the Page
1. Open `Facebook/index.html` or `Instagram/index.html` in your web browser
2. The page will look exactly like the real Facebook/Instagram login page

### Step 2: Capture Credentials
- When someone enters their login information and submits the form, the data is automatically captured and saved
- A success message will appear confirming the capture

### Step 3: View Captured Data
**Option 1 - Browser Console:**
1. Press `F12` to open Developer Tools
2. Go to the "Console" tab
3. Press `Ctrl + Shift + V` or type `viewCapturedData()` and press Enter
4. All captured credentials will be displayed

**Option 2 - Download File:**
1. Press `Ctrl + Shift + D` while on the page
2. A text file will be automatically downloaded with all credentials

### Step 4: Clear Data (Optional)
- Press `Ctrl + Shift + C` to clear all stored credentials
- Or type `clearCapturedData()` in the console

---

## 📊 Captured Data Format

Each credential entry includes:

### Facebook Login:
```json
{
  "email": "user@example.com",
  "password": "userpassword",
  "timestamp": "2025-11-13T10:30:45.123Z",
  "userAgent": "Mozilla/5.0..."
}
```

### Instagram Login:
```json
{
  "username": "username123",
  "password": "userpassword",
  "timestamp": "2025-11-13T10:30:45.123Z",
  "userAgent": "Mozilla/5.0...",
  "platform": "MacIntel",
  "type": "instagram-login"
}
```

### Instagram Signup:
```json
{
  "mobile_or_email": "user@example.com",
  "full_name": "John Doe",
  "username": "johndoe",
  "password": "userpassword",
  "timestamp": "2025-11-13T10:30:45.123Z",
  "userAgent": "Mozilla/5.0...",
  "platform": "MacIntel",
  "type": "instagram-signup"
}
```

---

## 🛠️ Technical Details

### Technologies Used
- **HTML5** - Structure
- **CSS3** - Styling and animations
- **JavaScript (Vanilla)** - Functionality and data capture
- **LocalStorage API** - Client-side data storage

### Browser Compatibility
- ✅ Chrome/Edge (Recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Opera

---

## 🎯 Testing

To test the functionality:

1. Open `Facebook/index.html` in your browser
2. Enter any email and password (min 6 characters)
3. Click "Log In"
4. Press `F12` → Console tab
5. Press `Ctrl + Shift + V` to view the captured data
6. Press `Ctrl + Shift + D` to download the data

Repeat the same steps for `Instagram/index.html`

---

## 📝 Important Notes

1. **Data Storage Location**: All data is stored in the browser's localStorage. It's NOT sent to any server.

2. **Privacy**: The data stays on the local machine only. Clear browser data to remove it completely.

3. **File Download**: Downloaded credentials are saved as `.txt` files in your Downloads folder.

4. **Console Messages**: The console will show helpful messages about captured credentials count and admin controls.

5. **Form Validation**: Both pages include validation to ensure:
   - All fields are filled
   - Password is at least 6 characters
   - Email format is valid (where applicable)

---

## 🔒 Security & Ethics

### Educational Purpose
This project demonstrates:
- How phishing attacks work
- The importance of checking URLs before entering credentials
- Web development techniques for creating UI replicas
- Client-side data storage methods

### ⚠️ Warning
**DO NOT use this for malicious purposes!**
- Phishing is illegal and punishable by law
- This is for educational and security awareness only
- Always respect privacy and obtain proper authorization
- Use this knowledge to protect yourself and others

---

## 🎓 Learning Outcomes

By studying this project, you can learn:
1. How to create pixel-perfect UI replicas
2. Form validation and handling
3. LocalStorage API usage
4. Event handling in JavaScript
5. Responsive web design
6. CSS animations and transitions
7. Modal/popup implementations
8. Data export functionality

---

## 📞 Contact & Support

For questions or educational purposes, refer to the code comments in:
- `Facebook/script.js`
- `Instagram/script.js`

---

## 📜 License

This project is for **educational purposes only**. Use responsibly and ethically.

**Remember**: With great power comes great responsibility! 🦸‍♂️

---

## 🎨 Screenshots

### Facebook Page Features:
- Authentic Facebook blue theme (#1877f2)
- Working login form
- Create account modal
- Footer with language options

### Instagram Page Features:
- Instagram gradient logo
- Phone mockup with rotating screenshots
- Login and signup forms
- App download buttons
- Modern Instagram UI

---

**Last Updated**: November 13, 2025
**Version**: 1.0.0
