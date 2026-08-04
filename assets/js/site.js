(() => {
  "use strict";

  const config = window.CINDR_SITE || {};
  const values = {
    support: config.supportEmail,
    privacy: config.privacyEmail,
    security: config.securityEmail
  };

  document.querySelectorAll("[data-contact]").forEach((link) => {
    const email = values[link.dataset.contact];
    if (!email) return;
    link.textContent = email;
    link.href = `mailto:${email}`;
  });

  document.querySelectorAll("[data-app-store]").forEach((link) => {
    link.textContent = config.appStoreLabel || "Coming soon for iPhone";
    if (config.appStoreURL) {
      link.href = config.appStoreURL;
      link.removeAttribute("aria-disabled");
    } else {
      link.removeAttribute("href");
      link.setAttribute("aria-disabled", "true");
    }
  });

  const menuButton = document.querySelector("[data-menu-button]");
  const menu = document.querySelector("[data-menu]");
  if (menuButton && menu) {
    menuButton.addEventListener("click", () => {
      const isOpen = menuButton.getAttribute("aria-expanded") === "true";
      menuButton.setAttribute("aria-expanded", String(!isOpen));
      menu.dataset.open = String(!isOpen);
    });
  }

  const demo = document.querySelector("[data-swipe-demo]");
  if (demo) {
    const card = demo.querySelector("[data-demo-card]");
    const status = demo.querySelector("[data-demo-status]");
    const actions = demo.querySelectorAll("[data-demo-action]");
    let active = false;
    let startX = 0;

    const reset = () => {
      card.style.transform = "";
      card.style.opacity = "";
      card.dataset.state = "idle";
      status.textContent = "Try a decision";
    };

    const decide = (action) => {
      const direction = action === "keep" ? 1 : action === "trash" ? -1 : 0;
      const label = action === "keep" ? "Kept — no mailbox change" : action === "trash" ? "Moved to Trash — still reversible" : "Unsubscribe options reviewed first";
      card.dataset.state = action;
      card.style.transform = direction ? `translateX(${direction * 118}%) rotate(${direction * 8}deg)` : "translateY(-28px) scale(.98)";
      card.style.opacity = "0";
      status.textContent = label;
      window.setTimeout(reset, 1150);
    };

    actions.forEach((button) => button.addEventListener("click", () => decide(button.dataset.demoAction)));

    card.addEventListener("pointerdown", (event) => {
      active = true;
      startX = event.clientX;
      card.setPointerCapture(event.pointerId);
      card.classList.add("is-dragging");
    });
    card.addEventListener("pointermove", (event) => {
      if (!active) return;
      const delta = Math.max(-150, Math.min(150, event.clientX - startX));
      card.style.transform = `translateX(${delta}px) rotate(${delta / 22}deg)`;
      card.dataset.state = delta > 36 ? "keep" : delta < -36 ? "trash" : "idle";
    });
    card.addEventListener("pointerup", (event) => {
      if (!active) return;
      active = false;
      card.classList.remove("is-dragging");
      const delta = event.clientX - startX;
      if (delta > 78) decide("keep");
      else if (delta < -78) decide("trash");
      else reset();
    });
    card.addEventListener("pointercancel", () => {
      active = false;
      card.classList.remove("is-dragging");
      reset();
    });
  }

  document.querySelectorAll("[data-year]").forEach((node) => {
    node.textContent = new Date().getFullYear();
  });
})();
