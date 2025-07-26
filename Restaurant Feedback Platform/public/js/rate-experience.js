// Rate Experience JavaScript
$(document).ready(function () {
  const params = new URLSearchParams(window.location.search);
  const restaurant = params.get("restaurant") || "Restaurant Name";
  $("#restaurantName").text(restaurant);

  // Render 5 stars for each .star-rating
  $(".star-rating").each(function () {
    const stars = Array.from(
      { length: 5 },
      (_, i) =>
        `<i class="bi bi-star star" data-value="${
          i + 1
        }" style="font-size: 1.5rem; color: #ccc; cursor: pointer;"></i>`
    ).join("");
    $(this).html(stars);
  });

  // Handle star hover and click
  $(document).on("mouseenter", ".star", function () {
    const value = $(this).data("value");
    $(this)
      .parent()
      .children(".star")
      .each(function (i) {
        $(this).css("color", i < value ? "#f44336" : "#ccc");
      });
  });

  $(document).on("mouseleave", ".star-rating", function () {
    const selected = $(this).data("selected") || 0;
    $(this)
      .children(".star")
      .each(function (i) {
        $(this).css("color", i < selected ? "#f44336" : "#ccc");
      });
  });

  $(document).on("click", ".star", function () {
    const value = $(this).data("value");
    $(this).parent().data("selected", value);
    $(this)
      .parent()
      .children(".star")
      .each(function (i) {
        $(this).css("color", i < value ? "#f44336" : "#ccc");
      });
  });
});
