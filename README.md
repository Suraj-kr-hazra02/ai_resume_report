# 🚀 AI Resume Analyzer Pro

An advanced, highly interactive Resume Analyzer designed to simulate deep-dive scanning and analysis of resumes to identify Applicant Tracking System (ATS) compatibility, keyword optimization, and overall impact. 

Built with premium design principles like glassmorphism and animated dark mode.

## ✨ Features

- **Beautiful Dark Mode UI**: Built with pure CSS, utilizing advanced techniques like glassmorphism, glowing accents, and animated floating backgrounds.
- **Interactive Drag & Drop**: A seamless file insertion zone with hover states and fast validation for PDF and DOCX files.
- **Simulated Scanning Engine**: Mockup scanning states that simulate data extraction, keyword analysis, and formatting review directly in the browser.
- **Comprehensive Results Dashboard**: 
  - Visual circular progress indicators for the ATS optimization score.
  - Metrics tracking for ATS Parse Rate, Keyword Match, Impact & Action, and Brevity.
  - **Actionable Feedback Section**: Detailed critiques and recommendations to improve resume phrasing and structure dynamically.
- **Serverless Auth Integration**: A fully functional glass-morphic Sign In / Sign Up interface that securely routes new registrations directly to the administrator email (`surajhazra2005@gmail.com`) using FormSubmit AJAX. Zero backend configuration required!

## 🛠️ Technology Stack

- **HTML5**: Semantic elements and clean layout structure.
- **CSS3**: Vanilla CSS Custom Properties (Variables), CSS Grid, Flexbox, Animation (`@keyframes`), and smooth horizontal scrolling.
- **JavaScript (Vanilla)**: DOM manipulation, File handling (Drag & Drop), UI State management, and Async API communication.

## 📥 Local Development & Testing

To view the project locally, it is best to run it through an HTTP Server to ensure all AJAX and modules run correctly.

1. Clone or download this repository.
2. If you have Python installed, open your terminal in the project directory and run:
   ```bash
   python -m http.server 3000
   ```
   *(Or just double-click `index.html` to open it in your browser directly.)*
3. Open your browser and navigate to `http://localhost:3000`.

## 🪪 Architecture Note

Currently, this application serves as the **Frontend shell/demonstration** for a powerful AI product. The backend processing, PDF parsing, and logic extraction are currently mocked via JS timeouts to demonstrate the exact UX/UI flow perfectly. Once you are ready, you can hook this layout into real Python libraries (like `PyMuPDF`) and LLM processing nodes (via `FastAPI` or `Node.js`) without changing the frontend design!

---
**Created By: Suraj Kr. Hazra**
