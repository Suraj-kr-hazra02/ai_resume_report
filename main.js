document.addEventListener('DOMContentLoaded', () => {
    // Select elements
    const uploadArea = document.getElementById('uploadArea');
    const uploadBox = document.querySelector('.upload-box');
    const fileInput = document.getElementById('fileInput');

    const analyzingArea = document.getElementById('analyzingArea');
    const progressBar = document.getElementById('progressBar');
    const scanStatus = document.getElementById('scanStatus');

    const resultsArea = document.getElementById('resultsArea');
    const resetBtn = document.getElementById('resetBtn');

    const circularProgress = document.querySelector('.circular-progress');
    const progressValue = document.querySelector('.value-container');

    // Drag & Drop events
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        uploadBox.addEventListener(eventName, preventDefaults, false);
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    ['dragenter', 'dragover'].forEach(eventName => {
        uploadBox.addEventListener(eventName, () => uploadBox.classList.add('dragover'), false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        uploadBox.addEventListener(eventName, () => uploadBox.classList.remove('dragover'), false);
    });

    // File drop event
    uploadBox.addEventListener('drop', handleDrop, false);
    fileInput.addEventListener('change', handleFileSelect, false);

    function handleDrop(e) {
        let dt = e.dataTransfer;
        let files = dt.files;
        handleFiles(files);
    }

    function handleFileSelect(e) {
        let files = e.target.files;
        handleFiles(files);
    }

    function handleFiles(files) {
        if (files.length > 0) {
            const file = files[0];
            // Simple validation
            if (file.type === 'application/pdf' || file.name.endsWith('.doc') || file.name.endsWith('.docx')) {
                startAnalysis(file);
            } else {
                alert('Please upload a valid PDF or DOCX file.');
            }
        }
    }

    function startAnalysis(file) {
        // UI Transition: Hide upload, show analyzing
        uploadArea.classList.add('hidden');
        analyzingArea.classList.remove('hidden');

        const statuses = [
            'Extracting Text from ' + file.name + '...',
            'Parsing structure and formatting...',
            'Checking keyword density...',
            'Evaluating ATS compatibility...',
            'Generating final insights...'
        ];

        let progress = 0;
        let statusIndex = 0;

        // Mock analysis process
        const interval = setInterval(() => {
            progress += Math.random() * 5 + 1;

            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);
                setTimeout(showResults, 500); // Wait a bit before showing results
            }

            progressBar.style.width = `${progress}%`;

            // Update status text based on progress
            const expectedStatusIndex = Math.floor((progress / 100) * statuses.length);
            if (expectedStatusIndex > statusIndex && expectedStatusIndex < statuses.length) {
                statusIndex = expectedStatusIndex;
                scanStatus.textContent = statuses[statusIndex];
            }

        }, 150); // Speed of the mock progress
    }

    function showResults() {
        // UI Transition: Hide analyzing, show results
        analyzingArea.classList.add('hidden');
        resultsArea.classList.remove('hidden');

        // Animate circular progress
        animateCircularProgress(85); // 85 is the mock score target
    }

    function animateCircularProgress(targetScore) {
        let progressStartValue = 0;
        let progressEndValue = targetScore;
        let speed = 20;

        let progress = setInterval(() => {
            progressStartValue++;

            progressValue.textContent = `${progressStartValue}%`;
            circularProgress.style.background = `conic-gradient(
                var(--accent-purple) ${progressStartValue * 3.6}deg,
                rgba(255,255,255,0.1) ${progressStartValue * 3.6}deg
            )`;

            if (progressStartValue == progressEndValue) {
                clearInterval(progress);
            }
        }, speed);
    }

    // Reset Flow
    resetBtn.addEventListener('click', () => {
        resultsArea.classList.add('hidden');
        uploadArea.classList.remove('hidden');

        // Reset inputs and states
        fileInput.value = '';
        progressBar.style.width = '0%';
        scanStatus.textContent = 'Extracting Text...';

        // Reset circular progress visual
        circularProgress.style.background = `conic-gradient(var(--accent-purple) 0deg, rgba(255,255,255,0.1) 0deg)`;
        progressValue.textContent = `0%`;
    });

    // --- Auth Modal Logic ---
    const openAuthBtn = document.getElementById('openAuthBtn');
    const closeAuthBtn = document.getElementById('closeAuthBtn');
    const authModal = document.getElementById('authModal');
    const authTabs = document.querySelectorAll('.auth-tab');
    const authForms = document.querySelectorAll('.auth-form');

    // Form elements
    const signInForm = document.getElementById('signInForm');
    const signUpForm = document.getElementById('signUpForm');
    const signInMessage = document.getElementById('signInMessage');
    const signUpMessage = document.getElementById('signUpMessage');

    openAuthBtn.addEventListener('click', (e) => {
        e.preventDefault();
        authModal.classList.add('active');
    });

    closeAuthBtn.addEventListener('click', () => {
        authModal.classList.remove('active');
    });

    // Close when clicking outside modal body
    authModal.addEventListener('click', (e) => {
        if (e.target === authModal) {
            authModal.classList.remove('active');
        }
    });

    // Tab Switching
    authTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active from all tabs and forms
            authTabs.forEach(t => t.classList.remove('active'));
            authForms.forEach(f => f.classList.remove('active'));

            // Add active to clicked tab
            tab.classList.add('active');

            // Show corresponding form
            const targetForm = tab.getAttribute('data-tab') === 'signin' ? signInForm : signUpForm;
            targetForm.classList.add('active');
        });
    });

    // Form Submission Logic using FormSubmit Ajax
    const adminEmail = 'surajhazra2005@gmail.com';

    function sendEmailNotification(action, formData, messageElement) {
        messageElement.textContent = 'Processing...';
        messageElement.className = 'form-message';

        // Prepare data for FormSubmit
        const payload = {
            _subject: `New ${action} Alert on ResumeAI!`,
            Action: action,
            Email: formData.get('email'),
            Timestamp: new Date().toLocaleString()
        };

        if (formData.get('name')) {
            payload.Name = formData.get('name');
        }

        fetch(`https://formsubmit.co/ajax/${adminEmail}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(payload)
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    messageElement.textContent = `${action} successful!`;
                    messageElement.classList.add('success');

                    // Switch the top right button to show Welcome state
                    const userEmail = formData.get('email').split('@')[0];
                    openAuthBtn.textContent = `Hi, ${userEmail}`;
                    openAuthBtn.style.background = 'var(--success)';

                    setTimeout(() => {
                        authModal.classList.remove('active');
                        messageElement.textContent = '';
                    }, 2000);
                } else {
                    throw new Error('Submission failed');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                // Even if network fails/blocked by adblocker, we UX gracefully
                messageElement.textContent = `Request sent successfully.`;
                messageElement.classList.add('success');

                const userEmail = formData.get('email').split('@')[0];
                openAuthBtn.textContent = `Hi, ${userEmail}`;
                openAuthBtn.style.background = 'var(--success)';

                setTimeout(() => {
                    authModal.classList.remove('active');
                    messageElement.textContent = '';
                }, 2000);
            });
    }

    signInForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(signInForm);
        sendEmailNotification('Sign In', formData, signInMessage);
    });

    signUpForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(signUpForm);
        sendEmailNotification('Sign Up', formData, signUpMessage);
        signUpForm.reset();
    });
});
