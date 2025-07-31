// Main JavaScript - Enhanced with cookie service integration
$(document).ready(function () {
    // Initialize theme immediately when page loads
    initializeThemeOnPageLoad();
    
    // Initialize user preferences from cookies
    initializeUserPreferencesFromCookies();
    
    // Setup theme toggle functionality
    setupThemeToggleFunctionality();
    
    // Setup password visibility toggles
    setupPasswordVisibilityToggles();
    
    // Setup accessibility features
    setupAccessibilityFeatures();
    
    // Initialize cookie service
    initializeCookieService();
});

// Initialize theme immediately when page loads
function initializeThemeOnPageLoad() {
    // Get saved theme from localStorage first (fastest)
    let savedTheme = localStorage.getItem("theme");
    
    // If no localStorage theme, try cookies
    if (!savedTheme && userPreferencesCookieService && userPreferencesCookieService.areCookiesEnabled()) {
        savedTheme = userPreferencesCookieService.getUserThemePreference();
    }
    
    // Default to light if no theme found
    if (!savedTheme) {
        savedTheme = "light";
    }
    
    // Apply the theme immediately
    applyThemeToPage(savedTheme);
    
    // Ensure theme is saved to both localStorage and cookies
    localStorage.setItem("theme", savedTheme);
    if (userPreferencesCookieService && userPreferencesCookieService.areCookiesEnabled()) {
        userPreferencesCookieService.saveUserThemePreference(savedTheme);
    }
}

// Initialize user preferences from cookies
function initializeUserPreferencesFromCookies() {
    try {
        // Check if cookies are enabled
        if (userPreferencesCookieService.areCookiesEnabled()) {
            // Initialize preferences from cookies
            const userPreferences = userPreferencesCookieService.initializeUserPreferencesFromCookies();
            
            // Apply theme from cookies with priority over localStorage
            const savedTheme = userPreferencesCookieService.getUserThemePreference();
            if (savedTheme) {
                applyThemeToPage(savedTheme);
            }
            console.log('User preferences loaded from cookies:', userPreferences);
        } else {
            // Fallback to localStorage
    const savedTheme = localStorage.getItem("theme") || "light";
            applyThemeToPage(savedTheme);
        }
    } catch (error) {
        console.error('Error initializing user preferences:', error);
        // Fallback to default theme
        applyThemeToPage("light");
    }
}

// Apply theme to the page
function applyThemeToPage(themeName) {
    
    // Set the theme attribute on body
    document.body.setAttribute("data-theme", themeName);
    localStorage.setItem("theme", themeName);
    
    // Always save to cookies for persistence across sessions
    if (userPreferencesCookieService && userPreferencesCookieService.areCookiesEnabled()) {
        userPreferencesCookieService.saveUserThemePreference(themeName);
    }
    
    // Apply visual changes
    if (themeName === "dark") {
        applyDarkMode();
    } else {
        applyLightMode();
    }
    
    // Verify theme was applied
    const appliedTheme = document.body.getAttribute("data-theme");
}

// Apply dark mode styles
function applyDarkMode() {
    
    // Apply dark styles to body
    $("body").css({
        "background-color": "#1a1a1a",
        "color": "#ffffff"
    });
    
    // Apply dark styles to dashboard elements
    $(".dashboard-container").css({
        "background-color": "#1a1a1a",
        "color": "#ffffff"
    });
    
    $(".dashboard-header").css({
        "background-color": "#2d2d2d"
    });
    
    $(".stat-summary-card, .recent-feedback").css({
        "background-color": "#2d2d2d",
        "color": "#ffffff"
    });
    
    $(".feedback-item").css({
        "background-color": "#3a3a3a"
    });
    
    // Apply dark styles to auth elements
    $(".auth-card, .auth-section").css({
        "background-color": "#2d2d2d",
        "color": "#ffffff"
    });
    
    $(".form-control").css({
        "background-color": "#3a3a3a",
        "border-color": "#555",
        "color": "#ffffff"
    });
    
    $(".form-control:focus").css({
        "background-color": "#3a3a3a",
        "border-color": "#f44336",
        "color": "#ffffff"
    });
    
    $(".input-group-text").css({
        "background-color": "#3a3a3a",
        "border-color": "#555",
        "color": "#ffffff"
    });
    
    // Apply dark styles to restaurant selection page
    $(".restaurant-card").css({
        "background-color": "#2d2d2d",
        "color": "#ffffff",
        "border-color": "#555"
    });
    
    $(".restaurant-card:hover").css({
        "background-color": "#3a3a3a",
        "box-shadow": "0 12px 32px rgba(244, 67, 54, 0.15)"
    });
    
    // Apply dark styles to rating page
    $(".rating-container, .rating-card").css({
        "background-color": "#2d2d2d",
        "color": "#ffffff"
    });
    
    $(".star-rating").css({
        "color": "#ffc107"
    });
    
    // Enhanced feedback/rating page dark mode styling
    $("#rate-app-root").css({
        "background-color": "#1a1a1a",
        "min-height": "100vh",
        "width": "100%"
    });
    
    $(".rate-main").css({
        "background-color": "#1a1a1a",
        "min-height": "calc(100vh - 80px)",
        "width": "100%"
    });
    
    $(".rate-card").css({
        "background-color": "#2d2d2d",
        "color": "#ffffff",
        "border": "1px solid #555",
        "box-shadow": "0 4px 16px rgba(0, 0, 0, 0.3)"
    });
    
    // Rating page header styling
    $(".rate-main .profile-header").css({
        "background-color": "#2d2d2d",
        "color": "#ffffff",
        "border-bottom": "1px solid #555"
    });
    
    // Rating page text elements
    $(".rate-card .fw-bold").css({
        "color": "#ffffff"
    });
    
    $(".rate-card .text-muted").css({
        "color": "#cccccc"
    });
    
    // Rating page form elements
    $(".rate-card .form-control").css({
        "background-color": "#3a3a3a",
        "border-color": "#555",
        "color": "#ffffff"
    });
    
    $(".rate-card .form-control:focus").css({
        "background-color": "#3a3a3a",
        "border-color": "#f44336",
        "color": "#ffffff"
    });
    
    $(".rate-card .form-control::placeholder").css({
        "color": "#888888"
    });
    
    // Rating page submit button
    $("#submitRatingButton").css({
        "background-color": "#f44336",
        "color": "#ffffff",
        "border": "none"
    });
    
    $("#submitRatingButton:disabled").css({
        "background-color": "#555",
        "color": "#888"
    });
    
    // Rating page footer text
    $(".rate-main .text-muted").css({
        "color": "#cccccc"
    });
    
    // Rating page links
    $(".rate-main .profile-header a").css({
        "color": "#ffffff"
    });
    
    // Star rating specific styling
    $(".star-rating i").css({
        "color": "#ffc107",
        "font-size": "1.5rem",
        "cursor": "pointer"
    });
    
    $(".star-rating i:hover").css({
        "color": "#ffdb4d"
    });
    
    // Restaurant name styling
    $("#restaurantName").css({
        "color": "#cccccc"
    });
    
    // Apply dark styles to profile page
    $(".profile-container, .profile-card").css({
        "background-color": "#2d2d2d",
        "color": "#ffffff"
    });
    
    $(".profile-section").css({
        "background-color": "#3a3a3a"
    });
    
    // Enhanced profile page dark mode styling
    $("#profile-app-root").css({
        "background-color": "#1a1a1a",
        "min-height": "100vh",
        "width": "100%"
    });
    
    $(".profile-header").css({
        "background-color": "#2d2d2d",
        "color": "#ffffff",
        "border-bottom": "1px solid #555"
    });
    
    $(".profile-main").css({
        "background-color": "#1a1a1a",
        "min-height": "calc(100vh - 80px)",
        "width": "100%"
    });
    
    $(".profile-card").css({
        "background-color": "#2d2d2d",
        "color": "#ffffff",
        "border": "1px solid #555",
        "box-shadow": "0 4px 16px rgba(0, 0, 0, 0.3)"
    });
    
    // Profile page text elements
    $(".profile-card h4").css({
        "color": "#ffffff"
    });
    
    $(".profile-card p").css({
        "color": "#cccccc"
    });
    
    $(".profile-card .form-label").css({
        "color": "#ffffff"
    });
    
    $(".profile-card div[id^='user']").css({
        "color": "#ffffff",
        "background-color": "#3a3a3a",
        "padding": "0.5rem",
        "border-radius": "0.375rem",
        "border": "1px solid #555"
    });
    
    // Profile page buttons
    $("#updateProfileButton").css({
        "background-color": "#f44336",
        "color": "#ffffff",
        "border": "none"
    });
    
    $("#signOutButton").css({
        "background-color": "#3a3a3a",
        "color": "#ffffff",
        "border": "1px solid #555"
    });
    
    // Profile page footer
    $("footer").css({
        "color": "#cccccc"
    });
    
    // Profile page links
    $(".profile-header a").css({
        "color": "#ffffff"
    });
    
    // Ensure profile header has red background in light mode
    $(".profile-header").css({
        "background-color": "#f44336",
        "color": "#ffffff"
    });
    
    // Apply dark styles to onboarding page
    $(".onboarding-section").css({
        "background-color": "#1a1a1a",
        "color": "#ffffff"
    });
    
    $(".onboarding-content").css({
        "background-color": "#2d2d2d"
    });
    
    // Apply dark styles to text elements
    $(".welcome-title, h1, h2, h3, h4, h5, h6").css({
        "color": "#ffffff"
    });
    
    $(".welcome-subtitle, p, span, div").css({
        "color": "#cccccc"
    });
    
    $(".stat-value").css({
        "color": "#ffffff"
    });
    
    $(".stat-label").css({
        "color": "#cccccc"
    });
    
    $(".restaurant-name").css({
        "color": "#ffffff"
    });
    
    $(".section-subtitle").css({
        "color": "#cccccc"
    });
    
    $(".points").css({
        "color": "#cccccc"
    });
    
    // Apply dark styles to buttons
    $(".btn-outline-light").css({
        "border-color": "#ffffff",
        "color": "#ffffff"
    });
    
    $(".btn-light").css({
        "background-color": "#3a3a3a",
        "border-color": "#555",
        "color": "#ffffff"
    });
    
    // Apply dark styles to action buttons
    $(".action-btn").css({
        "background-color": "#3a3a3a",
        "color": "#ffffff"
    });
    
    $(".action-btn.btn-danger").css({
        "background-color": "#f44336",
        "color": "#ffffff"
    });
    
    $(".action-btn.btn-warning").css({
        "background-color": "#ff9800",
        "color": "#ffffff"
    });
    
    // Apply dark styles to form labels
    $(".form-label").css({
        "color": "#ffffff"
    });
    
    // Apply dark styles to links
    $("a").css({
        "color": "#4fc3f7"
    });
    
    // Apply dark styles to modals and overlays
    $(".modal-content").css({
        "background-color": "#2d2d2d",
        "color": "#ffffff"
    });
    
    $(".modal-header").css({
        "background-color": "#3a3a3a",
        "border-color": "#555"
    });
    
    $(".modal-footer").css({
        "background-color": "#3a3a3a",
        "border-color": "#555"
    });
    
    // Apply dark styles to dropdowns
    $(".dropdown-menu").css({
        "background-color": "#2d2d2d",
        "border-color": "#555"
    });
    
    $(".dropdown-item").css({
        "color": "#ffffff"
    });
    
    $(".dropdown-item:hover").css({
        "background-color": "#3a3a3a"
    });
    
    // Apply dark styles to alerts and notifications
    $(".alert").css({
        "background-color": "#3a3a3a",
        "border-color": "#555",
        "color": "#ffffff"
    });
    
    $(".toast").css({
        "background-color": "#2d2d2d",
        "color": "#ffffff"
    });
    
    // Apply dark styles to progress bars
    $(".progress").css({
        "background-color": "#3a3a3a"
    });
    
    // Apply dark styles to badges
    $(".badge").css({
        "background-color": "#555",
        "color": "#ffffff"
    });
    
    // Apply dark styles to tables
    $("table").css({
        "background-color": "#2d2d2d",
        "color": "#ffffff"
    });
    
    $("th, td").css({
        "border-color": "#555"
    });
    
    // Update button icon to sun - FIXED SELECTOR
    const themeIcon = $(".theme-toggle i, #themeToggle i");
    themeIcon.removeClass("bi-moon-fill").addClass("bi-sun-fill");
}

// Apply light mode styles
function applyLightMode() {
    
    // Remove dark styles from body
    $("body").css({
        "background-color": "",
        "color": ""
    });
    
    // Remove dark styles from dashboard elements
    $(".dashboard-container").css({
        "background-color": "",
        "color": ""
    });
    
    $(".dashboard-header").css({
        "background-color": ""
    });
    
    $(".stat-summary-card, .recent-feedback").css({
        "background-color": "",
        "color": ""
    });
    
    $(".feedback-item").css({
        "background-color": ""
    });
    
    // Remove dark styles from auth elements
    $(".auth-card, .auth-section").css({
        "background-color": "",
        "color": ""
    });
    
    $(".form-control").css({
        "background-color": "",
        "border-color": "",
        "color": ""
    });
    
    $(".form-control:focus").css({
        "background-color": "",
        "border-color": "",
        "color": ""
    });
    
    $(".input-group-text").css({
        "background-color": "",
        "border-color": "",
        "color": ""
    });
    
    // Remove dark styles from restaurant selection page
    $(".restaurant-card").css({
        "background-color": "",
        "color": "",
        "border-color": ""
    });
    
    $(".restaurant-card:hover").css({
        "background-color": "",
        "box-shadow": ""
    });
    
    // Remove dark styles from rating page
    $(".rating-container, .rating-card").css({
        "background-color": "",
        "color": ""
    });
    
    $(".star-rating").css({
        "color": ""
    });
    
    // Enhanced feedback/rating page dark mode styling
    $("#rate-app-root").css({
        "background-color": "",
        "min-height": "",
        "width": ""
    });
    
    $(".rate-main").css({
        "background-color": "",
        "min-height": "",
        "width": ""
    });
    
    $(".rate-card").css({
        "background-color": "",
        "color": "",
        "border": "",
        "box-shadow": ""
    });
    
    // Rating page header styling
    $(".rate-main .profile-header").css({
        "background-color": "",
        "color": "",
        "border-bottom": ""
    });
    
    // Rating page text elements
    $(".rate-card .fw-bold").css({
        "color": ""
    });
    
    $(".rate-card .text-muted").css({
        "color": ""
    });
    
    // Rating page form elements
    $(".rate-card .form-control").css({
        "background-color": "",
        "border-color": "",
        "color": ""
    });
    
    $(".rate-card .form-control:focus").css({
        "background-color": "",
        "border-color": "",
        "color": ""
    });
    
    $(".rate-card .form-control::placeholder").css({
        "color": ""
    });
    
    // Rating page submit button
    $("#submitRatingButton").css({
        "background-color": "",
        "color": "",
        "border": ""
    });
    
    $("#submitRatingButton:disabled").css({
        "background-color": "",
        "color": ""
    });
    
    // Rating page footer text
    $(".rate-main .text-muted").css({
        "color": ""
    });
    
    // Rating page links
    $(".rate-main .profile-header a").css({
        "color": ""
    });
    
    // Star rating specific styling
    $(".star-rating i").css({
        "color": "",
        "font-size": "",
        "cursor": ""
    });
    
    $(".star-rating i:hover").css({
        "color": ""
    });
    
    // Restaurant name styling
    $("#restaurantName").css({
        "color": ""
    });
    
    // Remove dark styles from profile page
    $(".profile-container, .profile-card").css({
        "background-color": "",
        "color": ""
    });
    
    $(".profile-section").css({
        "background-color": ""
    });
    
    // Enhanced profile page dark mode styling
    $("#profile-app-root").css({
        "background-color": "",
        "min-height": "",
        "width": ""
    });
    
    $(".profile-header").css({
        "background-color": "",
        "color": "",
        "border-bottom": ""
    });
    
    $(".profile-main").css({
        "background-color": "",
        "min-height": "",
        "width": ""
    });
    
    $(".profile-card").css({
        "background-color": "",
        "color": "",
        "border": "",
        "box-shadow": ""
    });
    
    // Profile page text elements
    $(".profile-card h4").css({
        "color": ""
    });
    
    $(".profile-card p").css({
        "color": ""
    });
    
    $(".profile-card .form-label").css({
        "color": ""
    });
    
    $(".profile-card div[id^='user']").css({
        "color": "",
        "background-color": "",
        "padding": "",
        "border-radius": "",
        "border": ""
    });
    
    // Profile page buttons
    $("#updateProfileButton").css({
        "background-color": "",
        "color": "",
        "border": ""
    });
    
    $("#signOutButton").css({
        "background-color": "",
        "color": "",
        "border": ""
    });
    
    // Profile page footer
    $("footer").css({
        "color": ""
    });
    
    // Profile page links
    $(".profile-header a").css({
        "color": ""
    });
    
    // Restore profile header red background in light mode
    $(".profile-header").css({
        "background-color": "#f44336",
        "color": "#ffffff"
    });
    
    // Remove dark styles from onboarding page
    $(".onboarding-section").css({
        "background-color": "",
        "color": ""
    });
    
    $(".onboarding-content").css({
        "background-color": ""
    });
    
    // Remove dark styles from text elements
    $(".welcome-title, h1, h2, h3, h4, h5, h6").css({
        "color": ""
    });
    
    $(".welcome-subtitle, p, span, div").css({
        "color": ""
    });
    
    $(".stat-value").css({
        "color": ""
    });
    
    $(".stat-label").css({
        "color": ""
    });
    
    $(".restaurant-name").css({
        "color": ""
    });
    
    $(".section-subtitle").css({
        "color": ""
    });
    
    $(".points").css({
        "color": ""
    });
    
    // Remove dark styles from buttons
    $(".btn-outline-light").css({
        "border-color": "",
        "color": ""
    });
    
    $(".btn-light").css({
        "background-color": "",
        "border-color": "",
        "color": ""
    });
    
    // Remove dark styles from action buttons
    $(".action-btn").css({
        "background-color": "",
        "color": ""
    });
    
    $(".action-btn.btn-danger").css({
        "background-color": "",
        "color": ""
    });
    
    $(".action-btn.btn-warning").css({
        "background-color": "",
        "color": ""
    });
    
    // Remove dark styles from form labels
    $(".form-label").css({
        "color": ""
    });
    
    // Remove dark styles from links
    $("a").css({
        "color": ""
    });
    
    // Remove dark styles from modals and overlays
    $(".modal-content").css({
        "background-color": "",
        "color": ""
    });
    
    $(".modal-header").css({
        "background-color": "",
        "border-color": ""
    });
    
    $(".modal-footer").css({
        "background-color": "",
        "border-color": ""
    });
    
    // Remove dark styles from dropdowns
    $(".dropdown-menu").css({
        "background-color": "",
        "border-color": ""
    });
    
    $(".dropdown-item").css({
        "color": ""
    });
    
    $(".dropdown-item:hover").css({
        "background-color": ""
    });
    
    // Remove dark styles from alerts and notifications
    $(".alert").css({
        "background-color": "",
        "border-color": "",
        "color": ""
    });
    
    $(".toast").css({
        "background-color": "",
        "color": ""
    });
    
    // Remove dark styles from progress bars
    $(".progress").css({
        "background-color": ""
    });
    
    // Remove dark styles from badges
    $(".badge").css({
        "background-color": "",
        "color": ""
    });
    
    // Remove dark styles from tables
    $("table").css({
        "background-color": "",
        "color": ""
    });
    
    $("th, td").css({
        "border-color": ""
    });
    
    // Update button icon to moon - FIXED SELECTOR
    const themeIcon = $(".theme-toggle i, #themeToggle i");
    themeIcon.removeClass("bi-sun-fill").addClass("bi-moon-fill");
}

// Setup theme toggle functionality - FRESH IMPLEMENTATION
function setupThemeToggleFunctionality() {
    
    // Remove any existing event listeners
    $(document).off("click", ".theme-toggle");
    
    // Add new event listener
    $(document).on("click", ".theme-toggle", function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        // Get current theme
        let currentTheme = document.body.getAttribute("data-theme");
        if (!currentTheme) {
            currentTheme = localStorage.getItem("theme") || "light";
        }
        
        // Toggle theme
    const newTheme = currentTheme === "light" ? "dark" : "light";

        // Apply the new theme
        applyThemeToPage(newTheme);
        
    });
    
    // Also add click handler to the button by ID
    $(document).off("click", "#themeToggle");
    $(document).on("click", "#themeToggle", function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        // Get current theme
        let currentTheme = document.body.getAttribute("data-theme");
        if (!currentTheme) {
            currentTheme = localStorage.getItem("theme") || "light";
        }
        
        // Toggle theme
        const newTheme = currentTheme === "light" ? "dark" : "light";
        
        // Apply the new theme
        applyThemeToPage(newTheme);
        
    });
}

// Show theme change notification
function showThemeChangeNotification(themeName) {
    const notificationMessage = `Theme changed to ${themeName} mode`;
    showNotification(notificationMessage, "info");
}

// Setup password visibility toggles
function setupPasswordVisibilityToggles() {
    $(document).on("click", ".password-toggle", function() {
        const passwordInput = $(this).siblings(".password-input");
        const toggleIcon = $(this).find("i");
        
        if (passwordInput.attr("type") === "password") {
            passwordInput.attr("type", "text");
            toggleIcon.removeClass("bi-eye").addClass("bi-eye-slash");
    } else {
            passwordInput.attr("type", "password");
            toggleIcon.removeClass("bi-eye-slash").addClass("bi-eye");
        }
    });
}

// Setup accessibility features
function setupAccessibilityFeatures() {
    // Keyboard navigation support
    $(document).on("keydown", function(event) {
        // Escape key to close modals
        if (event.key === "Escape") {
            $(".modal").modal("hide");
            $(".notification-toast").remove();
        }
        
        // Enter key for buttons
        if (event.key === "Enter" && event.target.tagName === "BUTTON") {
            $(event.target).click();
        }
    });
    
    // Focus management for better accessibility
    $(document).on("focus", "input, button, a", function() {
        $(this).addClass("focus-visible");
    });
    
    $(document).on("blur", "input, button, a", function() {
        $(this).removeClass("focus-visible");
    });
}

// Initialize cookie service
function initializeCookieService() {
    try {
        // Check cookie availability
        const cookiesEnabled = userPreferencesCookieService.areCookiesEnabled();
        
        if (cookiesEnabled) {
            // Sync localStorage with cookies
            userPreferencesCookieService.syncThemeWithCookies();
            
            // Set up periodic sync
            setInterval(() => {
                userPreferencesCookieService.syncThemeWithCookies();
            }, 60000); // Sync every minute
        }
    } catch (error) {
        console.error("Error initializing cookie service:", error);
    }
}

// Show notification with human-readable parameters
function showNotification(message, notificationType = "info") {
    // Remove existing notifications
    $(".notification-toast").remove();
    
    // Create notification HTML
    const notificationHTML = `
        <div class="notification-toast position-fixed top-0 end-0 m-3" style="z-index: 10000;">
            <div class="toast show" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="toast-header bg-${notificationType} text-white">
                    <strong class="me-auto">${getNotificationTitle(notificationType)}</strong>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast" aria-label="Close"></button>
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

// Get notification title based on type
function getNotificationTitle(notificationType) {
    const titleMap = {
        "success": "Success",
        "error": "Error",
        "warning": "Warning",
        "info": "Information"
    };
    return titleMap[notificationType] || "Notification";
}

// Save user preferences to cookies
function saveUserPreferencesToCookies(userPreferences) {
    try {
        if (userPreferencesCookieService.areCookiesEnabled()) {
            userPreferencesCookieService.saveAllUserPreferences(userPreferences);
        } else {
            localStorage.setItem("userPreferences", JSON.stringify(userPreferences));
        }
    } catch (error) {
        console.error("Error saving user preferences:", error);
    }
}

// Get user preferences from cookies or localStorage
function getUserPreferencesFromStorage() {
    try {
        if (userPreferencesCookieService.areCookiesEnabled()) {
            return userPreferencesCookieService.getAllUserPreferences();
        } else {
            const localPreferences = localStorage.getItem("userPreferences");
            return localPreferences ? JSON.parse(localPreferences) : userPreferencesCookieService.getDefaultUserPreferences();
        }
    } catch (error) {
        console.error("Error getting user preferences:", error);
        return userPreferencesCookieService.getDefaultUserPreferences();
    }
}
