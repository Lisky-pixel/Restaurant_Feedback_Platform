// Rate Experience JavaScript - Simplified to use localStorage
$(document).ready(function () {
    let currentRestaurantData = {};
    let ratingData = {
        food: 0,
        service: 0,
        cleanliness: 0,
        ambiance: 0
    };

    // Initialize the rating page
    function initializeRatingPage() {
        loadRestaurantData();
        setupStarRatingSystem();
        setupFormSubmission();
        setupFormValidation();
    }

    // Load restaurant data from URL parameters or localStorage
    function loadRestaurantData() {
        const urlParameters = new URLSearchParams(window.location.search);
        const restaurantNameFromURL = urlParameters.get("restaurant");
        const restaurantIdFromURL = urlParameters.get("id");
        
        // Get restaurant data from localStorage if available
        const selectedRestaurantFromStorage = localStorage.getItem("selectedRestaurant");
        
        if (selectedRestaurantFromStorage) {
            currentRestaurantData = JSON.parse(selectedRestaurantFromStorage);
        } else if (restaurantNameFromURL) {
            currentRestaurantData = {
                name: restaurantNameFromURL,
                id: restaurantIdFromURL || 1
            };
        } else {
            currentRestaurantData = {
                name: "Restaurant Name",
                id: 1
            };
        }

        // Update restaurant name display
        $("#restaurantName").text(currentRestaurantData.name);
    }

    // Setup star rating system with human-readable structure
    function setupStarRatingSystem() {
        // Render 5 stars for each rating category
        $(".star-rating").each(function () {
            const ratingCategory = $(this).data("category");
            const starsHTML = Array.from(
                { length: 5 },
                (_, starIndex) =>
                    `<i class="bi bi-star star" 
                        data-value="${starIndex + 1}" 
                        data-category="${ratingCategory}"
                        style="font-size: 1.5rem; color: #ccc; cursor: pointer;"
                        aria-label="Rate ${ratingCategory} ${starIndex + 1} stars">
                    </i>`
            ).join("");
            $(this).html(starsHTML);
        });

        // Handle star hover effects
        $(document).on("mouseenter", ".star", function () {
            const starValue = $(this).data("value");
            const ratingCategory = $(this).data("category");
            highlightStarsForCategory(ratingCategory, starValue);
        });

        // Handle star hover leave
        $(document).on("mouseleave", ".star-rating", function () {
            const ratingCategory = $(this).data("category");
            const selectedRating = ratingData[ratingCategory] || 0;
            highlightStarsForCategory(ratingCategory, selectedRating);
        });

        // Handle star click
        $(document).on("click", ".star", function () {
            const starValue = $(this).data("value");
            const ratingCategory = $(this).data("category");
            
            // Update rating data
            ratingData[ratingCategory] = starValue;
            
            // Update visual display
            highlightStarsForCategory(ratingCategory, starValue);
            
            // Update form validation
            updateFormValidationStatus();
        });
    }

    // Highlight stars for a specific category
    function highlightStarsForCategory(category, ratingValue) {
        $(`.star-rating[data-category="${category}"] .star`).each(function (starIndex) {
            const starElement = $(this);
            if (starIndex < ratingValue) {
                starElement.removeClass("bi-star").addClass("bi-star-fill");
                starElement.css("color", "#f44336");
            } else {
                starElement.removeClass("bi-star-fill").addClass("bi-star");
                starElement.css("color", "#ccc");
            }
        });
    }

    // Setup form submission
    function setupFormSubmission() {
        $("#rateForm").on("submit", function(event) {
            event.preventDefault();
            handleRatingSubmission();
        });
    }

    // Handle rating submission to localStorage
    function handleRatingSubmission() {
        // Validate form before submission
        if (!validateRatingForm()) {
            return;
        }

        try {
            showLoadingState("Submitting your rating...");
            
            // Get current user data
            const currentUserData = JSON.parse(localStorage.getItem("currentUser") || "{}");
            const currentUserId = currentUserData.id || Date.now();

            // Prepare rating data for localStorage
            const ratingSubmissionData = {
                id: Date.now(), // Simple ID generation
                userId: currentUserId,
                restaurantId: currentRestaurantData.id,
                restaurantName: currentRestaurantData.name,
                foodRating: ratingData.food,
                serviceRating: ratingData.service,
                cleanlinessRating: ratingData.cleanliness,
                ambianceRating: ratingData.ambiance,
                overallRating: calculateOverallRating(),
                comment: $("#ratingComment").val().trim(),
                submissionDate: new Date().toISOString(),
                points: calculatePointsForRating(calculateOverallRating())
            };

            // Save rating to localStorage
            const existingRatings = JSON.parse(localStorage.getItem("userRatings") || "[]");
            existingRatings.push(ratingSubmissionData);
            localStorage.setItem("userRatings", JSON.stringify(existingRatings));

            // Show success message
            showSuccessMessage("Thank you for your feedback! Your rating has been submitted successfully.");
            
            // Redirect to dashboard after delay
            setTimeout(() => {
                window.location.href = "dashboard.html";
            }, 2000);

        } catch (error) {
            console.error("Rating submission error:", error);
            showErrorMessage("Failed to submit rating. Please try again.");
        } finally {
            hideLoadingState();
        }
    }

    // Calculate overall rating from individual ratings
    function calculateOverallRating() {
        const totalRating = ratingData.food + ratingData.service + ratingData.cleanliness + ratingData.ambiance;
        return Math.round(totalRating / 4);
    }

    // Calculate points for a rating
    function calculatePointsForRating(rating) {
        return rating * 10; // 10 points per star
    }

    // Setup form validation
    function setupFormValidation() {
        // Real-time validation feedback
        $("#ratingComment").on("input", function() {
            updateFormValidationStatus();
        });

        // Update validation on any rating change
        $(document).on("click", ".star", function() {
            updateFormValidationStatus();
        });
    }

    // Validate rating form
    function validateRatingForm() {
        // Check comment length only
        const commentText = $("#ratingComment").val().trim();
        if (commentText.length < 10) {
            showErrorMessage("Please provide a comment with at least 10 characters");
            return false;
        }

        return true;
    }

    // Update form validation status
    function updateFormValidationStatus() {
        const submitButton = $("#submitRatingButton");
        const commentText = $("#ratingComment").val().trim();
        const isFormValid = commentText.length >= 10;
        
        if (isFormValid) {
            submitButton.removeClass("btn-secondary").addClass("btn-danger");
            submitButton.prop("disabled", false);
        } else {
            submitButton.removeClass("btn-danger").addClass("btn-secondary");
            submitButton.prop("disabled", true);
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

    // Initialize the rating page
    initializeRatingPage();
});
