// Authentication JavaScrip
$(document).ready(function () {
  $(document).on("submit", ".auth-form", function (e) {
    e.preventDefault();
    const isSignUp = $(this).find("#signupUsername").length > 0;

    if (isSignUp) {
      window.location.href = "login.html";
    } else {
      window.location.href = "dashboard.html";
    }
  });
});
