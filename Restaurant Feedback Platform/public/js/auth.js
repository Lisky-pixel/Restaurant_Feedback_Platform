// Authentication JavaScript - Simplified to use localStorage
$(document).ready(function () {
    // Handle form submissions for both login and signup
    $(document).on("submit", ".auth-form", function (event) {
        event.preventDefault();
        
        const isSignUpForm = $(this).find("#signupUsername").length > 0;
        
        if (isSignUpForm) {
            handleUserRegistration();
        } else {
            handleUserLogin();
        }
    });

    // Handle user registration with localStorage
    function handleUserRegistration() {
        const usernameInput = $("#signupUsername");
        const emailInput = $("#signupEmail");
        const passwordInput = $("#signupPassword");
        const confirmPasswordInput = $("#signupConfirmPassword");
        
        // Get form data with human-readable names
        const newUserData = {
            username: usernameInput.val().trim(),
            email: emailInput.val().trim(),
            password: passwordInput.val(),
            confirmPassword: confirmPasswordInput.val()
        };

        // Validate form data
        if (!validateRegistrationForm(newUserData)) {
            return;
        }

        try {
            // Show loading state
            showLoadingState("Creating your account...");
            
            // Create user account in localStorage
            const userData = {
                id: Date.now(), // Simple ID generation
                username: newUserData.username,
                email: newUserData.email,
                password: newUserData.password,
                createdAt: new Date().toISOString()
            };

            // Get existing users or create empty array
            const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");
            
            // Check if email already exists
            const emailExists = existingUsers.some(user => user.email === userData.email);
            if (emailExists) {
                showErrorMessage("An account with this email already exists.");
                hideLoadingState();
                return;
            }

            // Add new user
            existingUsers.push(userData);
            localStorage.setItem("users", JSON.stringify(existingUsers));
            
            // Store current user data
            localStorage.setItem("currentUser", JSON.stringify(userData));
            localStorage.setItem("isUserLoggedIn", "true");
            
            // Show success message
            showSuccessMessage("Account created successfully! Redirecting to dashboard...");
            
            // Redirect to dashboard after short delay
            setTimeout(() => {
                window.location.href = "dashboard.html";
            }, 1500);

        } catch (error) {
            console.error("Registration error:", error);
            showErrorMessage("Failed to create account. Please try again.");
        } finally {
            hideLoadingState();
        }
    }

    // Handle user login with localStorage
    function handleUserLogin() {
        const emailInput = $("#loginEmail");
        const passwordInput = $("#loginPassword");
        
        // Get login data with human-readable names
        const loginCredentials = {
            email: emailInput.val().trim(),
            password: passwordInput.val()
        };

        // Validate login form
        if (!validateLoginForm(loginCredentials)) {
            return;
        }

        try {
            // Show loading state
            showLoadingState("Logging you in...");
            
            // Get users from localStorage
            const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");
            const user = existingUsers.find(u => 
                u.email === loginCredentials.email && 
                u.password === loginCredentials.password
            );

            if (user) {
                // Store user data in localStorage
                localStorage.setItem("currentUser", JSON.stringify(user));
                localStorage.setItem("isUserLoggedIn", "true");
                
                // Show success message
                showSuccessMessage("Login successful! Redirecting to dashboard...");
                
                // Redirect to dashboard after short delay
                setTimeout(() => {
                    window.location.href = "dashboard.html";
                }, 1500);
            } else {
                showErrorMessage("Invalid email or password. Please try again.");
            }

        } catch (error) {
            console.error("Login error:", error);
            showErrorMessage("Login failed. Please check your connection and try again.");
        } finally {
            hideLoadingState();
        }
    }

    // Form validation functions
    function validateRegistrationForm(userData) {
        const errorMessages = [];

        if (!userData.username || userData.username.length < 3) {
            errorMessages.push("Username must be at least 3 characters long");
        }

        if (!userData.email || !isValidEmail(userData.email)) {
            errorMessages.push("Please enter a valid email address");
        }

        if (!userData.password || userData.password.length < 6) {
            errorMessages.push("Password must be at least 6 characters long");
        }

        if (userData.password !== userData.confirmPassword) {
            errorMessages.push("Passwords do not match");
        }

        if (errorMessages.length > 0) {
            showErrorMessage(errorMessages.join("<br>"));
            return false;
        }

        return true;
    }

    function validateLoginForm(loginData) {
        if (!loginData.email || !loginData.password) {
            showErrorMessage("Please enter both email and password");
            return false;
        }

        if (!isValidEmail(loginData.email)) {
            showErrorMessage("Please enter a valid email address");
            return false;
        }

        return true;
    }

    // Helper functions
    function isValidEmail(emailAddress) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(emailAddress);
    }

    function showLoadingState(loadingMessage) {
        // Create loading overlay if it doesn't exist
        if ($("#loadingOverlay").length === 0) {
            $("body").append(`
                <div id="loadingOverlay" class="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center" 
                     style="background: rgba(0,0,0,0.5); z-index: 9999;">
                    <div class="text-center text-white">
                        <div class="spinner-border mb-2" role="status"></div>
                        <div>${loadingMessage}</div>
                    </div>
                </div>
            `);
        }
    }

    function hideLoadingState() {
        $("#loadingOverlay").remove();
    }

    function showSuccessMessage(message) {
        showNotification(message, "success");
    }

    function showErrorMessage(message) {
        showNotification(message, "danger");
    }

    function showNotification(message, notificationType) {
        // Remove existing notifications
        $(".notification-toast").remove();
        
        // Create and show new notification
        const notificationHTML = `
            <div class="notification-toast position-fixed top-0 end-0 m-3" style="z-index: 10000;">
                <div class="toast show" role="alert">
                    <div class="toast-header bg-${notificationType} text-white">
                        <strong class="me-auto">${notificationType === 'success' ? 'Success' : 'Error'}</strong>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast"></button>
                    </div>
                    <div class="toast-body">
                        ${message}
                    </div>
                </div>
            </div>
        `;
        
        $("body").append(notificationHTML);
        
        // Auto-remove notification after 5 seconds
        setTimeout(() => {
            $(".notification-toast").remove();
        }, 5000);
    }
});
