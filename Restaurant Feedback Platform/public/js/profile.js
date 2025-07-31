// Profile JavaScript - Display user details and handle profile functionality
$(document).ready(function () {
    let currentUserData = {};

    // Initialize profile page
    function initializeProfilePage() {
        try {
            // Check if user is logged in
            if (!isUserLoggedIn()) {
                redirectToLogin();
                return;
            }

            // Load user data
            loadUserData();
            
            // Update profile display
            updateProfileDisplay();
            
            // Setup profile event listeners
            setupProfileEventListeners();
            
        } catch (error) {
            console.error("Profile initialization error:", error);
            showErrorMessage("Failed to load profile data. Please refresh the page.");
        }
    }

    // Check if user is logged in
    function isUserLoggedIn() {
        const loginStatus = localStorage.getItem("isUserLoggedIn");
        const userData = localStorage.getItem("currentUser");
        return loginStatus === "true" && userData;
    }

    // Redirect to login if not authenticated
    function redirectToLogin() {
        showErrorMessage("Please log in to access your profile.");
        setTimeout(() => {
            window.location.href = "login.html";
        }, 2000);
    }

    // Load user data from localStorage
    function loadUserData() {
        try {
            const storedUserData = localStorage.getItem("currentUser");
            if (storedUserData) {
                currentUserData = JSON.parse(storedUserData);
            }
        } catch (error) {
            console.error("Error loading user data:", error);
        }
    }

    // Update profile display with real user data
    function updateProfileDisplay() {
        // Update user information
        const userName = currentUserData.username || "User";
        const userEmail = currentUserData.email || "No email provided";
        const userFullName = currentUserData.fullName || userName;
        
        // Update profile card with real data
        $("#userFullName").text(userFullName);
        $("#userEmail").html(`<i class="bi bi-envelope me-2"></i>${userEmail}`);
        $("#userUsername").html(`<i class="bi bi-person me-2"></i>${userName}`);
        
        // Update account creation date if available
        if (currentUserData.createdAt) {
            const creationDate = new Date(currentUserData.createdAt).toLocaleDateString();
            $("#userJoinDate").html(`<i class="bi bi-calendar me-2"></i>Joined ${creationDate}`);
        }
        
        // Update user statistics
        updateUserStatistics();
    }

    // Update user statistics
    function updateUserStatistics() {
        try {
            const userRatings = JSON.parse(localStorage.getItem("userRatings") || "[]");
            const currentUserId = currentUserData.id;
            
            // Filter ratings for current user
            const userSpecificRatings = userRatings.filter(rating => rating.userId === currentUserId);
            
            const totalRatings = userSpecificRatings.length;
            const totalPoints = userSpecificRatings.reduce((total, rating) => total + (rating.points || 0), 0);
            const averageRating = userSpecificRatings.length > 0 
                ? (userSpecificRatings.reduce((sum, rating) => sum + rating.overallRating, 0) / userSpecificRatings.length).toFixed(1)
                : 0;
            
            // Update statistics display
            $("#totalRatings").text(totalRatings);
            $("#totalPoints").text(totalPoints);
            $("#averageRating").text(averageRating);
            
        } catch (error) {
            console.error("Error updating user statistics:", error);
        }
    }

    // Setup profile event listeners
    function setupProfileEventListeners() {
        // Update profile button
        $("#updateProfileButton").on("click", function() {
            handleProfileUpdate();
        });

        // Sign out button
        $("#signOutButton").on("click", function() {
            handleSignOut();
        });

        // Theme toggle
        $("#themeToggle").on("click", function() {
            toggleTheme();
        });
    }

    // Handle profile update
    function handleProfileUpdate() {
        showSuccessMessage("Profile update functionality coming soon!");
    }

    // Handle sign out
    function handleSignOut() {
        try {
            // Clear user session
            localStorage.removeItem("currentUser");
            localStorage.removeItem("isUserLoggedIn");
            
            // Show success message
            showSuccessMessage("Successfully signed out. Redirecting to login...");
            
            // Redirect to login page
            setTimeout(() => {
                window.location.href = "login.html";
            }, 1500);
            
        } catch (error) {
            console.error("Sign out error:", error);
            showErrorMessage("Error signing out. Please try again.");
        }
    }

    // Theme toggle functionality
    function toggleTheme() {
        const currentTheme = localStorage.getItem("theme") || "light";
        const newTheme = currentTheme === "light" ? "dark" : "light";
        
        localStorage.setItem("theme", newTheme);
        document.body.setAttribute("data-theme", newTheme);
        
        // Update theme toggle button
        const themeIcon = $("#themeToggle i");
        if (newTheme === "dark") {
            themeIcon.removeClass("bi-moon-fill").addClass("bi-sun-fill");
        } else {
            themeIcon.removeClass("bi-sun-fill").addClass("bi-moon-fill");
        }
        
        // Save theme preference to cookies
        if (typeof userPreferencesCookieService !== 'undefined') {
            userPreferencesCookieService.saveUserThemePreference(newTheme);
        }
    }

    // Notification functions
    function showSuccessMessage(message) {
        showNotification(message, "success");
    }

    function showErrorMessage(message) {
        showNotification(message, "danger");
    }

    function showNotification(message, notificationType) {
        // Remove existing notifications
        $(".notification-toast").remove();
        
        // Create and show notification
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

    // Initialize profile page
    initializeProfilePage();
}); 