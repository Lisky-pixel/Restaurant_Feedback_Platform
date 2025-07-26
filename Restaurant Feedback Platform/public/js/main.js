// Main JavaScript file
$(document).ready(function () {
  initializeTheme();

  // Theme toggle functionality
  function initializeTheme() {
    const savedTheme = localStorage.getItem("theme") || "light";
    document.body.setAttribute("data-theme", savedTheme);
    updateThemeIcon(savedTheme);
  }

  function updateThemeIcon(theme) {
    const icon = theme === "dark" ? "bi-sun-fill" : "bi-moon-fill";
    $("#themeToggle i").removeClass("bi-moon-fill bi-sun-fill").addClass(icon);
  }

  // Global theme toggle handler
  $(document).on("click", "#themeToggle", function () {
    const currentTheme = document.body.getAttribute("data-theme") || "light";
    const newTheme = currentTheme === "light" ? "dark" : "light";

    document.body.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    updateThemeIcon(newTheme);
  });

  // Password show/hide toggle
  $(document).on("click", ".password-toggle", function () {
    const $input = $(this).siblings(".password-input");
    const $icon = $(this).find("i");
    if ($input.attr("type") === "password") {
      $input.attr("type", "text");
      $icon.removeClass("bi-eye").addClass("bi-eye-slash");
    } else {
      $input.attr("type", "password");
      $icon.removeClass("bi-eye-slash").addClass("bi-eye");
    }
  });
});
