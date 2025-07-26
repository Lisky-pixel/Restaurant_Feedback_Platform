// Select Restaurant JavaScript - renders and filters restaurant list
$(document).ready(function () {
  const restaurants = [
    {
      name: "Java House Westlands",
      location: "Westlands, Nairobi",
      icon: "🍽️",
    },
    {
      name: "KFC Westgate",
      location: "Westgate Mall",
      icon: "🍗",
    },
    {
      name: "Artcaffe Gigiri",
      location: "Gigiri, Nairobi",
      icon: "☕",
    },
    {
      name: "Dormans Coffee",
      location: "CBD, Nairobi",
      icon: "🥤",
    },
    {
      name: "CJ's Restaurant",
      location: "Parklands",
      icon: "🍔",
    },
    {
      name: "Big Square",
      location: "Karen, Nairobi",
      icon: "🍕",
    },
  ];

  function renderList(filter = "") {
    const filtered = restaurants.filter(
      (r) =>
        r.name.toLowerCase().includes(filter.toLowerCase()) ||
        r.location.toLowerCase().includes(filter.toLowerCase())
    );
    const html = filtered
      .map(
        (r) => `
      <div class="restaurant-card d-flex align-items-center p-3 mb-3 bg-white" style="border-radius: 1rem; box-shadow: 0 2px 8px rgba(0,0,0,0.06); cursor: pointer;">
        <div class="restaurant-icon me-3" style="width: 48px; height: 48px; background: #ffe5e0; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 2rem;">${r.icon}</div>
        <div class="flex-grow-1">
          <div class="fw-bold">${r.name}</div>
          <div class="text-muted small">${r.location}</div>
        </div>
      </div>
    `
      )
      .join("");
    $("#restaurantList").html(html);
  }

  // Initial render
  renderList();

  // Filter on input
  $("#restaurantSearch").on("input", function () {
    renderList($(this).val());
  });

  // Click handler (navigate to rate experience page)
  $(document).on("click", ".restaurant-card", function () {
    const name = $(this).find(".fw-bold").text();
    window.location.href =
      "rate-experience.html?restaurant=" + encodeURIComponent(name);
  });
});
