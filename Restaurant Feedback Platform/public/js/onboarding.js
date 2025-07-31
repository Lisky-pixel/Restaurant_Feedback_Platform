// Onboarding JavaScript
$(document).ready(function () {
  const onboardingSlides = [
    {
      emoji: "<img src='assets/images/emoji.jpg' alt='How it Works' class='onboarding-image mb-4' style='max-width: 300px; height: auto;'>",
      headline: "How it Works",
      description:
        "Rate your meal experience with simple emoji ratings and earn rewards instantly.",
    },
    {
      emoji: "<img src='assets/images/feedback.jpg' alt='How it Works' class='onboarding-image mb-4' style='max-width: 300px; height: auto;'>",
      headline: "Why Your Feedback Matters",
      description:
        "Help restaurants in Kenya improve their service and create better dining experiences for everyone.",
    },
    {
      emoji: "<img src='assets/images/reward.jpg' alt='How it Works' class='onboarding-image mb-4' style='max-width: 300px; height: auto;'>",
      headline: "Instant Airtime & Perks",
      description:
        "Get KSh airtime credited directly to your phone number plus exclusive restaurant deals.",
    },
  ];

  let currentSlideIndex = 0;

  // Render onboarding slide
  function renderOnboardingSlide(index) {
    const slide = onboardingSlides[index];
    const isFirst = index === 0;
    const isLast = index === onboardingSlides.length - 1;

    const progressIndicators = onboardingSlides
      .map(
        (_, i) =>
          `<span class="progress-dot${i === index ? " active" : ""}"></span>`
      )
      .join("");

    const onboardingHtml = `
      <section class="onboarding-section centered-content text-center">
        <div class="onboarding-navbar w-100">${progressIndicators}</div>
        <div class="onboarding-content flex-grow-1 d-flex flex-column justify-content-center align-items-center">
          <div class="emoji-circle mx-auto mb-4" aria-label="Onboarding Emoji">${
            slide.emoji
          }</div>
          <div class="onboarding-headline mb-2">${slide.headline}</div>
          <div class="onboarding-description text-muted mb-4">${
            slide.description
          }</div>
        </div>
        <div class="onboarding-footer w-100 d-flex justify-content-between align-items-center px-3" style="max-width: 500px; margin: 0 auto; position: absolute; left: 0; right: 0; bottom: 2rem;">
          <button class="btn btn-light btn-sm rounded-pill px-3" id="onboardingBack" ${
            isFirst ? "disabled" : ""
          }> Back</button>
          <div class="slide-counter small text-muted">${index + 1} of ${
      onboardingSlides.length
    }</div>
          <button class="btn btn-danger btn-sm rounded-pill px-3" id="onboardingNext">${
            isLast ? `Let's Get Started!` : "Next"
          }</button>
        </div>
      </section>
    `;
    $("#app-root").html(onboardingHtml);
  }

  // Navigation handlers
  $(document).on("click", "#onboardingBack", function () {
    if (currentSlideIndex > 0) {
      currentSlideIndex--;
      renderOnboardingSlide(currentSlideIndex);
    }
  });

  $(document).on("click", "#onboardingNext", function () {
    if (currentSlideIndex < onboardingSlides.length - 1) {
      currentSlideIndex++;
      renderOnboardingSlide(currentSlideIndex);
    } else {
      window.location.href = "signup.html";
    }
  });

  // Initialize first slide
  renderOnboardingSlide(0);
});
