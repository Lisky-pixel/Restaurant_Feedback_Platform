// Dashboard JavaScript
$(document).ready(function () {
  function loadUserData() {
    const userData = JSON.parse(localStorage.getItem("userData") || "{}");
    const username = userData.username || "John";
    $(".welcome-title").text(`Welcome back, ${username}!`);
  }

  // Initialize dashboard
  loadUserData();

  // Dashboard action button handlers
  $(".action-btn").on("click", function () {
    // No alert, just placeholder for future logic
  });

  // Profile button handler
  $(".btn-light").on("click", function () {
    if ($(this).text().trim() === "Profile") {
      // No alert, just placeholder for future logic
    }
  });
});
