// Cookie Service - Handles user preferences and data persistence
class UserPreferencesCookieService {
    constructor() {
        this.cookieExpirationDays = 30; // Cookies expire in 30 days
        this.preferencesKey = 'user_preferences';
        this.themeKey = 'user_theme';
        this.languageKey = 'user_language';
        this.notificationsKey = 'user_notifications';
    }

    // Set a cookie with human-readable parameters
    setUserCookie(cookieName, cookieValue, expirationDays = this.cookieExpirationDays) {
        const expirationDate = new Date();
        expirationDate.setTime(expirationDate.getTime() + (expirationDays * 24 * 60 * 60 * 1000));
        const expirationString = expirationDate.toUTCString();
        document.cookie = `${cookieName}=${cookieValue};expires=${expirationString};path=/`;
    }

    // Get a cookie value by name
    getUserCookie(cookieName) {
        const cookieNameWithEquals = cookieName + "=";
        const cookieArray = document.cookie.split(';');
        
        for (let cookie of cookieArray) {
            cookie = cookie.trim();
            if (cookie.indexOf(cookieNameWithEquals) === 0) {
                return cookie.substring(cookieNameWithEquals.length, cookie.length);
            }
        }
        return null;
    }

    // Delete a cookie by setting it to expire in the past
    deleteUserCookie(cookieName) {
        document.cookie = `${cookieName}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/`;
    }

    // Save user theme preference to cookie
    saveUserThemePreference(themeName) {
        this.setUserCookie(this.themeKey, themeName);
    }

    // Get user theme preference from cookie
    getUserThemePreference() {
        const themeFromCookie = this.getUserCookie(this.themeKey);
        return themeFromCookie || 'light'; // Default to light theme
    }

    // Save user language preference to cookie
    saveUserLanguagePreference(languageCode) {
        this.setUserCookie(this.languageKey, languageCode);
    }

    // Get user language preference from cookie
    getUserLanguagePreference() {
        const languageFromCookie = this.getUserCookie(this.languageKey);
        return languageFromCookie || 'en'; // Default to English
    }

    // Save notification preferences to cookie
    saveUserNotificationPreferences(notificationSettings) {
        const notificationSettingsString = JSON.stringify(notificationSettings);
        this.setUserCookie(this.notificationsKey, notificationSettingsString);
    }

    // Get user notification preferences from cookie
    getUserNotificationPreferences() {
        const notificationsFromCookie = this.getUserCookie(this.notificationsKey);
        if (notificationsFromCookie) {
            try {
                return JSON.parse(notificationsFromCookie);
            } catch (error) {
                console.error('Error parsing notification preferences:', error);
                return this.getDefaultNotificationPreferences();
            }
        }
        return this.getDefaultNotificationPreferences();
    }

    // Get default notification preferences
    getDefaultNotificationPreferences() {
        return {
            emailNotifications: true,
            pushNotifications: true,
            ratingReminders: true,
            rewardAlerts: true
        };
    }

    // Save comprehensive user preferences
    saveAllUserPreferences(userPreferences) {
        const preferencesString = JSON.stringify(userPreferences);
        this.setUserCookie(this.preferencesKey, preferencesString);
    }

    // Get all user preferences
    getAllUserPreferences() {
        const preferencesFromCookie = this.getUserCookie(this.preferencesKey);
        if (preferencesFromCookie) {
            try {
                return JSON.parse(preferencesFromCookie);
            } catch (error) {
                console.error('Error parsing user preferences:', error);
                return this.getDefaultUserPreferences();
            }
        }
        return this.getDefaultUserPreferences();
    }

    // Get default user preferences
    getDefaultUserPreferences() {
        return {
            theme: 'light',
            language: 'en',
            notifications: this.getDefaultNotificationPreferences(),
            accessibility: {
                highContrast: false,
                largeText: false,
                screenReader: false
            },
            privacy: {
                shareData: true,
                analytics: true
            }
        };
    }

    // Clear all user cookies
    clearAllUserCookies() {
        this.deleteUserCookie(this.preferencesKey);
        this.deleteUserCookie(this.themeKey);
        this.deleteUserCookie(this.languageKey);
        this.deleteUserCookie(this.notificationsKey);
    }

    // Check if cookies are enabled
    areCookiesEnabled() {
        try {
            this.setUserCookie('test_cookie', 'test_value');
            const testValue = this.getUserCookie('test_cookie');
            this.deleteUserCookie('test_cookie');
            return testValue === 'test_value';
        } catch (error) {
            console.error('Cookies are disabled:', error);
            return false;
        }
    }

    // Initialize user preferences from cookies
    initializeUserPreferencesFromCookies() {
        const userPreferences = this.getAllUserPreferences();
        
        // Apply theme preference
        const savedTheme = this.getUserThemePreference();
        if (savedTheme) {
            document.body.setAttribute('data-theme', savedTheme);
            localStorage.setItem('theme', savedTheme);
        }

        // Apply language preference
        const savedLanguage = this.getUserLanguagePreference();
        if (savedLanguage) {
            document.documentElement.lang = savedLanguage;
        }

        return userPreferences;
    }

    // Sync localStorage with cookies for theme
    syncThemeWithCookies() {
        const themeFromLocalStorage = localStorage.getItem('theme');
        const themeFromCookies = this.getUserThemePreference();
        
        if (themeFromLocalStorage && themeFromLocalStorage !== themeFromCookies) {
            this.saveUserThemePreference(themeFromLocalStorage);
        } else if (themeFromCookies && themeFromCookies !== themeFromLocalStorage) {
            localStorage.setItem('theme', themeFromCookies);
        }
    }
}

// Create global cookie service instance
const userPreferencesCookieService = new UserPreferencesCookieService(); 