// Select Restaurant JavaScript - Simplified to use localStorage
$(document).ready(function () {
    let allRestaurants = [];
    let filteredRestaurants = [];

    // Initialize the page
    function initializeRestaurantPage() {
        try {
            showLoadingState("Loading restaurants...");
            loadRestaurantsFromLocalStorage();
            renderRestaurantList();
            setupEventListeners();
        } catch (error) {
            console.error("Failed to initialize restaurant page:", error);
            showErrorMessage("Failed to load restaurants. Please refresh the page.");
        } finally {
            hideLoadingState();
        }
    }

    // Load restaurants from localStorage with fallback to default data
    function loadRestaurantsFromLocalStorage() {
        try {
            // Try to get restaurants from localStorage
            const storedRestaurants = localStorage.getItem("restaurants");
            
            if (storedRestaurants) {
                allRestaurants = JSON.parse(storedRestaurants);
            } else {
                // Use default restaurants if none stored
                allRestaurants = getDefaultRestaurants();
                localStorage.setItem("restaurants", JSON.stringify(allRestaurants));
            }
            
            filteredRestaurants = [...allRestaurants];
        } catch (error) {
            console.error("Error loading restaurants:", error);
            // Fallback to default restaurants
            allRestaurants = getDefaultRestaurants();
            filteredRestaurants = [...allRestaurants];
        }
    }

    // Get appropriate icon based on restaurant category
    function getRestaurantIcon(category) {
        const categoryIcons = {
            'Kenyan': '🍽️',
            'Coffee': '☕',
            'Fast Food': '🍔',
            'Pizza': '🍕',
            'Chicken': '🍗',
            'default': '🏪'
        };
        return categoryIcons[category] || categoryIcons.default;
    }

    // Default restaurants data
    function getDefaultRestaurants() {
        return [
            {
                id: 1,
                name: "Java House Westlands",
                location: "Westlands, Nairobi",
                category: "Coffee",
                icon: "☕"
            },
            {
                id: 2,
                name: "KFC Westgate",
                location: "Westgate Mall",
                category: "Fast Food",
                icon: "🍗"
            },
            {
                id: 3,
                name: "Artcaffe Gigiri",
                location: "Gigiri, Nairobi",
                category: "Coffee",
                icon: "☕"
            },
            {
                id: 4,
                name: "Dormans Coffee",
                location: "CBD, Nairobi",
                category: "Coffee",
                icon: "🥤"
            },
            {
                id: 5,
                name: "CJ's Restaurant",
                location: "Parklands",
                category: "Kenyan",
                icon: "🍔"
            },
            {
                id: 6,
                name: "Big Square",
                location: "Karen, Nairobi",
                category: "Pizza",
                icon: "🍕"
            }
        ];
    }

    // Render restaurant list with human-readable structure
    function renderRestaurantList() {
        if (filteredRestaurants.length === 0) {
            $("#restaurantList").html(`
                <div class="text-center py-4">
                    <i class="bi bi-search" style="font-size: 3rem; color: #ccc;"></i>
                    <p class="text-muted mt-2">No restaurants found matching your search.</p>
                </div>
            `);
            return;
        }

        const restaurantCardsHTML = filteredRestaurants.map(restaurant => `
            <div class="restaurant-card d-flex align-items-center p-3 mb-3 bg-white" 
                 style="border-radius: 1rem; box-shadow: 0 2px 8px rgba(0,0,0,0.06); cursor: pointer;"
                 data-restaurant-id="${restaurant.id}"
                 data-restaurant-name="${restaurant.name}">
                <div class="restaurant-icon me-3" 
                     style="width: 48px; height: 48px; background: #ffe5e0; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 2rem;">
                    ${restaurant.icon}
                </div>
                <div class="flex-grow-1">
                    <div class="restaurant-name fw-bold">${restaurant.name}</div>
                    <div class="restaurant-location text-muted small">${restaurant.location}</div>
                    <div class="restaurant-category text-muted small">${restaurant.category}</div>
                </div>
                <div class="restaurant-arrow">
                    <i class="bi bi-chevron-right text-muted"></i>
                </div>
            </div>
        `).join("");

        $("#restaurantList").html(restaurantCardsHTML);
    }

    // Filter restaurants based on search input
    function filterRestaurants(searchTerm) {
        const searchTermLower = searchTerm.toLowerCase();
        filteredRestaurants = allRestaurants.filter(restaurant => 
            restaurant.name.toLowerCase().includes(searchTermLower) ||
            restaurant.location.toLowerCase().includes(searchTermLower) ||
            restaurant.category.toLowerCase().includes(searchTermLower)
        );
        renderRestaurantList();
    }

    // Setup event listeners
    function setupEventListeners() {
        // Search input handler
        $("#restaurantSearch").on("input", function() {
            const searchTerm = $(this).val().trim();
            filterRestaurants(searchTerm);
        });

        // Restaurant card click handler
        $(document).on("click", ".restaurant-card", function() {
            const restaurantId = $(this).data("restaurant-id");
            const restaurantName = $(this).data("restaurant-name");
            
            // Store selected restaurant in localStorage for rating page
            localStorage.setItem("selectedRestaurant", JSON.stringify({
                id: restaurantId,
                name: restaurantName
            }));
            
            // Navigate to rating page
            window.location.href = `rate-experience.html?restaurant=${encodeURIComponent(restaurantName)}&id=${restaurantId}`;
        });

        // Add hover effects
        $(document).on("mouseenter", ".restaurant-card", function() {
            $(this).css("transform", "translateY(-2px)");
            $(this).css("box-shadow", "0 4px 12px rgba(0,0,0,0.1)");
        });

        $(document).on("mouseleave", ".restaurant-card", function() {
            $(this).css("transform", "translateY(0)");
            $(this).css("box-shadow", "0 2px 8px rgba(0,0,0,0.06)");
        });
    }

    // Loading and error handling functions
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

    function showErrorMessage(message) {
        // Remove existing notifications
        $(".notification-toast").remove();
        
        // Create and show error notification
        const notificationHTML = `
            <div class="notification-toast position-fixed top-0 end-0 m-3" style="z-index: 10000;">
                <div class="toast show" role="alert">
                    <div class="toast-header bg-danger text-white">
                        <strong class="me-auto">Error</strong>
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

    // Initialize the page
    initializeRestaurantPage();
});
