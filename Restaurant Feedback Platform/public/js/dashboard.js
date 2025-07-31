// Dashboard JavaScript - Simplified to use localStorage
$(document).ready(function () {
    let currentUserData = {};
    let userRatings = [];
    let userStatistics = {
        totalPoints: 0,
        totalReviews: 0,
        averageRating: 0,
        rewardsClaimed: 0
    };

    // Initialize dashboard
    function initializeDashboard() {
        try {
            showLoadingState("Loading your dashboard...");
            
            // Check if user is logged in
            if (!isUserLoggedIn()) {
                redirectToLogin();
                return;
            }

            // Load user data and statistics
            loadUserData();
            loadUserRatings();
            calculateUserStatistics();
            
            // Update dashboard display
            updateDashboardDisplay();
            setupDashboardEventListeners();
            
        } catch (error) {
            console.error("Dashboard initialization error:", error);
            showErrorMessage("Failed to load dashboard data. Please refresh the page.");
        } finally {
            hideLoadingState();
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
        showErrorMessage("Please log in to access your dashboard.");
        setTimeout(() => {
            window.location.href = "login.html";
        }, 2000);
    }

    // Load user data from localStorage
  function loadUserData() {
        try {
            // Get user data from localStorage
            const storedUserData = localStorage.getItem("currentUser");
            if (storedUserData) {
                currentUserData = JSON.parse(storedUserData);
            }
        } catch (error) {
            console.error("Error loading user data:", error);
        }
    }

    // Load user ratings from localStorage
    function loadUserRatings() {
        try {
            // Get ratings from localStorage
            const localRatings = localStorage.getItem("userRatings");
            if (localRatings) {
                userRatings = JSON.parse(localRatings);
                
                // Filter ratings for current user
                if (currentUserData.id) {
                    userRatings = userRatings.filter(rating => rating.userId === currentUserData.id);
                }
            }
        } catch (error) {
            console.error("Error loading user ratings:", error);
            userRatings = [];
        }
    }

    // Calculate user statistics
    function calculateUserStatistics() {
        userStatistics.totalReviews = userRatings.length;
        
        // Calculate total points from ratings
        const totalPointsFromRatings = userRatings.reduce((total, rating) => total + (rating.points || 0), 0);
        
        // Get already claimed points from localStorage
        const claimedRewards = JSON.parse(localStorage.getItem("claimedRewards") || "[]");
        const userClaimedRewards = claimedRewards.filter(reward => reward.userId === currentUserData.id);
        const totalClaimedPoints = userClaimedRewards.reduce((total, reward) => total + reward.pointsValue, 0);
        
        // Calculate available points (total from ratings minus already claimed)
        userStatistics.totalPoints = Math.max(0, totalPointsFromRatings - totalClaimedPoints);
        
        // Store the current available points in localStorage for consistency
        localStorage.setItem("userPoints", userStatistics.totalPoints);
        
        userStatistics.averageRating = userRatings.length > 0 
            ? (userRatings.reduce((sum, rating) => sum + rating.overallRating, 0) / userRatings.length).toFixed(1)
            : 0;
        userStatistics.rewardsClaimed = userClaimedRewards.length;
    }

    // Update dashboard display with real data
    function updateDashboardDisplay() {
        // Update welcome message
        const userName = currentUserData.username || currentUserData.name || "User";
        $(".welcome-title").text(`Welcome back, ${userName}! ❤️`);

        // Update statistics cards
        $(".stat-value").each(function() {
            const statLabel = $(this).siblings(".stat-label").text().toLowerCase();
            if (statLabel.includes("points")) {
                $(this).text(userStatistics.totalPoints);
            } else if (statLabel.includes("reviews")) {
                $(this).text(userStatistics.totalReviews);
            }
        });

        // Update summary statistics
        $(".stat-number").each(function() {
            const statText = $(this).siblings(".stat-text").text().toLowerCase();
            if (statText.includes("avg rating")) {
                $(this).text(userStatistics.averageRating);
            } else if (statText.includes("rewards claimed")) {
                $(this).text(userStatistics.rewardsClaimed);
            }
        });

        // Update recent feedback section
        updateRecentFeedbackSection();

        // Update action buttons
        updateActionButtons();
    }

    // Update recent feedback section
    function updateRecentFeedbackSection() {
        const recentFeedbackContainer = $(".feedback-list");
        
        // Get claimed rewards
        const claimedRewards = JSON.parse(localStorage.getItem("claimedRewards") || "[]");
        const userClaimedRewards = claimedRewards.filter(reward => reward.userId === currentUserData.id || !reward.userId);
        
        // Combine ratings and claimed rewards
        const allActivities = [];
        
        // Add ratings
        userRatings.forEach(rating => {
            allActivities.push({
                type: 'rating',
                data: rating,
                date: rating.submissionDate
            });
        });
        
        // Add claimed rewards
        userClaimedRewards.forEach(reward => {
            allActivities.push({
                type: 'reward',
                data: reward,
                date: reward.claimedDate
            });
        });
        
        // Sort by date (newest first)
        allActivities.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        if (allActivities.length === 0) {
            recentFeedbackContainer.html(`
                <div class="text-center py-4">
                    <i class="bi bi-chat-dots" style="font-size: 3rem; color: #ccc;"></i>
                    <p class="text-muted mt-2">No activity yet. Start rating restaurants to see your reviews here!</p>
                </div>
            `);
            return;
        }

        // Get recent activities (last 5)
        const recentActivities = allActivities.slice(0, 5);
        
        const feedbackHTML = recentActivities.map(activity => {
            if (activity.type === 'rating') {
                const rating = activity.data;
                return `
                    <div class="feedback-item">
                        <div class="feedback-info">
                            <i class="bi bi-star"></i>
                            <span class="restaurant-name">${rating.restaurantName}</span>
                            <div class="rating">
                                ${generateStarRatingHTML(rating.overallRating)}
                            </div>
                        </div>
                        <div class="feedback-status">
                            <span class="status approved">approved</span>
                            <span class="points">+${rating.points || 0} pts</span>
                        </div>
                    </div>
                `;
            } else {
                const reward = activity.data;
                return `
                    <div class="feedback-item">
                        <div class="feedback-info">
                            <i class="bi bi-gift"></i>
                            <span class="restaurant-name">Rewards Claimed</span>
                            <div class="rating">
                                <span class="text-success">${reward.rewardsCount} reward(s)</span>
                            </div>
                        </div>
                        <div class="feedback-status">
                            <span class="status claimed">claimed</span>
                            <span class="points">-${reward.pointsValue} pts</span>
                        </div>
                    </div>
                `;
            }
        }).join("");

        recentFeedbackContainer.html(feedbackHTML);
    }

    // Generate star rating HTML
    function generateStarRatingHTML(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        
        let starsHTML = "";
        
        // Add full stars
        for (let i = 0; i < fullStars; i++) {
            starsHTML += '<i class="bi bi-star-fill"></i>';
        }
        
        // Add half star if needed
        if (hasHalfStar) {
            starsHTML += '<i class="bi bi-star-half"></i>';
        }
        
        // Add empty stars
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
        for (let i = 0; i < emptyStars; i++) {
            starsHTML += '<i class="bi bi-star"></i>';
        }
        
        return starsHTML;
    }

    // Update action buttons
    function updateActionButtons() {
        // Update points available in claim rewards button
        $(".btn-subtitle").each(function() {
            if ($(this).text().includes("points available")) {
                $(this).text(`${userStatistics.totalPoints} points available`);
            }
        });
        
        // Update claim rewards button state
        const claimRewardsButton = $(".action-btn").filter(function() {
            return $(this).find(".btn-text").text().includes("Claim Rewards");
        });
        
        if (userStatistics.totalPoints >= 100) {
            claimRewardsButton.removeClass("btn-secondary").addClass("btn-warning");
            claimRewardsButton.prop("disabled", false);
        } else {
            claimRewardsButton.removeClass("btn-warning").addClass("btn-secondary");
            claimRewardsButton.prop("disabled", true);
        }
    }

    // Setup dashboard event listeners
    function setupDashboardEventListeners() {
        // Theme toggle
        $("#themeToggle").on("click", function() {
            toggleTheme();
        });

        // Claim rewards button
        $(".action-btn").on("click", function() {
            const buttonText = $(this).find(".btn-text").text();
            if (buttonText.includes("Claim Rewards")) {
                handleClaimRewards();
            }
        });

        // Logout functionality
        $(".header-actions").on("click", "a[href='profile.html']", function(e) {
            // Add logout option to profile page later
        });
    }

    // Handle claim rewards
    function handleClaimRewards() {
        if (userStatistics.totalPoints >= 100) {
            const rewardsToClaim = Math.floor(userStatistics.totalPoints / 100);
            const totalRewardsValue = rewardsToClaim * 100;
            
            showSuccessMessage(`Congratulations! You've claimed ${rewardsToClaim} reward(s) worth ${totalRewardsValue} points!`);
            
            // Store claimed rewards for display
            const claimedRewards = JSON.parse(localStorage.getItem("claimedRewards") || "[]");
            const newClaimedReward = {
                id: Date.now(),
                userId: currentUserData.id,
                rewardsCount: rewardsToClaim,
                pointsValue: totalRewardsValue,
                claimedDate: new Date().toISOString(),
                type: "points_reward"
            };
            claimedRewards.push(newClaimedReward);
            localStorage.setItem("claimedRewards", JSON.stringify(claimedRewards));
            
            // Recalculate statistics to reflect the claimed points
            calculateUserStatistics();
            
            // Update display
            updateDashboardDisplay();
        } else {
            showErrorMessage("You need at least 100 points to claim rewards.");
        }
    }

    // Theme toggle functionality
    function toggleTheme() {
        const currentTheme = localStorage.getItem("theme") || "light";
        const newTheme = currentTheme === "light" ? "dark" : "light";
        
        // Apply theme using the main.js function for consistency
        applyThemeToPage(newTheme);
        
        // Update theme toggle button
        const themeIcon = $("#themeToggle i");
        if (newTheme === "dark") {
            themeIcon.removeClass("bi-moon-fill").addClass("bi-sun-fill");
        } else {
            themeIcon.removeClass("bi-sun-fill").addClass("bi-moon-fill");
        }
    }

    // Loading and notification functions
    function showLoadingState(loadingMessage) {
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

    // Initialize dashboard
    initializeDashboard();
});
