// Delivery Time Banner Animation
document.addEventListener("DOMContentLoaded", function () {
  const banner = document.querySelector(".tc-delivery-time-banner");
  if (!banner) return;

  const remainingMinutes =
    parseInt(banner.getAttribute("data-remaining-minutes")) || 46;
  const totalMinutes = 60; // Default 60 minutes window

  // Calculate filled percentage (elapsed time)
  const elapsedMinutes = totalMinutes - remainingMinutes;
  const fillPercentage = Math.max(
    0,
    Math.min(100, (elapsedMinutes / totalMinutes) * 100)
  );

  const progressFill = banner.querySelector(".tc-delivery-progress-fill");
  const remainingTimeSpan = banner.querySelector(".tc-remaining-time");

  // Update remaining time text
  if (remainingTimeSpan) {
    remainingTimeSpan.textContent = remainingMinutes;
  }

  // Animate progress bar from 0% to calculated percentage
  if (progressFill) {
    progressFill.style.width = "0%";
    setTimeout(() => {
      progressFill.style.transition = "width 1s ease-out";
      progressFill.style.width = fillPercentage + "%";
    }, 100);
  }
});

// Remove Disabled attribute if Delivery selected
document.addEventListener("DOMContentLoaded", function () {
  const shipmentCheckbox = document.getElementById("tc-shipment-request");

  const orderButtons = document.querySelectorAll("button.tc-product-button");

  const sameDayButtons = document.querySelectorAll(
    ".tc-btn-same-day-delivery-products"
  );

  const deliveryLabelDesktop = document.querySelector(".tc-delivery-label");
  const deliveryLabelMobile = document.querySelector(
    ".free-delivery-label-mobile"
  );

  if (!shipmentCheckbox) return;

  function updateState() {
    if (shipmentCheckbox.checked) {
      orderButtons.forEach((btn) => {
        if (btn.id === "only-cargo") {
          btn.removeAttribute("disabled");
        } else {
          btn.style.display = "flex";
          btn.removeAttribute("disabled");
        }
      });

      sameDayButtons.forEach((btn) => {
        btn.style.display = "none";
      });

      if (deliveryLabelDesktop)
        deliveryLabelDesktop.textContent = "Ücretsiz Kargo";

      if (deliveryLabelMobile)
        deliveryLabelMobile.textContent = "& Ücretsiz Kargo";
    } else {
      orderButtons.forEach((btn) => {
        if (btn.id === "only-cargo") {
          btn.setAttribute("disabled", "disabled");
        } else {
          btn.style.display = "none";
          btn.setAttribute("disabled", "disabled");
        }
      });

      sameDayButtons.forEach((btn) => {
        btn.style.display = "flex";
      });

      if (deliveryLabelDesktop)
        deliveryLabelDesktop.textContent = "Ücretsiz Teslimat";

      if (deliveryLabelMobile)
        deliveryLabelMobile.textContent = "& Ücretsiz Teslimat";
    }
  }

  updateState();

  shipmentCheckbox.addEventListener("change", updateState);
});

// Destination Input Selections
document.addEventListener("DOMContentLoaded", function () {
  const defaultDestination = document.querySelector(
    ".tc-product-destination.default"
  );
  const activeDestination = document.querySelector(
    ".tc-product-destination.active"
  );

  if (!defaultDestination || !activeDestination) return;

  const input = activeDestination.querySelector("input[type='text']");

  // Default → Active
  defaultDestination.addEventListener("click", function () {
    defaultDestination.style.display = "none";
    activeDestination.style.display = "flex";

    if (input) {
      input.focus();
    }
  });

  // Active → Default (focus out)
  if (input) {
    input.addEventListener("blur", function () {
      activeDestination.style.display = "none";
      defaultDestination.style.display = "flex";
    });
  }
});
