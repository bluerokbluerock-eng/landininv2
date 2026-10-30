/* Conecta formEndpoint a tu CRM o servidor cuando esté disponible. */
const LANDING_CONFIG = Object.freeze({
  formEndpoint: "",
  countdownMaxSeconds: 480,
  modalIntervalMs: 180000,
  openModalOnLoad: true,
});

(() => {
  "use strict";
  const form = document.querySelector("#lead-form");
  const modal = document.querySelector("#urgency-modal");
  const status = document.querySelector("#form-status");
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  const storageKey = "landininv2_countdown_deadline";
  // El original elige entre uno y 480 segundos y no reinicia al llegar a cero.
  let deadline =
    Date.now() +
    (Math.floor(Math.random() * LANDING_CONFIG.countdownMaxSeconds) + 1) * 1000;
  try {
    const saved = Number(localStorage.getItem(storageKey));
    if (Number.isFinite(saved) && saved > 0) deadline = saved;
    else localStorage.setItem(storageKey, String(deadline));
  } catch {
    /* Funciona también sin almacenamiento local disponible. */
  }
  function updateCountdown() {
    const seconds = Math.max(0, Math.ceil((deadline - Date.now()) / 1000));
    const parts = {
      horas: Math.floor(seconds / 3600),
      min: Math.floor((seconds % 3600) / 60),
      seg: seconds % 60,
    };
    document.querySelectorAll("[data-countdown-part]").forEach((element) => {
      element.textContent = String(
        parts[element.dataset.countdownPart],
      ).padStart(2, "0");
    });
    if (!seconds) clearInterval(countdownInterval);
  }
  const countdownInterval = setInterval(updateCountdown, 1000);
  updateCountdown();

  let previousFocus = null;
  function openModal() {
    if (modal.open || document.hidden || form.contains(document.activeElement))
      return;
    previousFocus = document.activeElement;
    modal.showModal();
    document.body.classList.add("modal-open");
  }
  function closeModal() {
    if (!modal.open) return;
    modal.close();
    document.body.classList.remove("modal-open");
    previousFocus?.focus({ preventScroll: true });
  }
  modal
    .querySelector('[data-action="close-modal"]')
    .addEventListener("click", closeModal);
  modal
    .querySelector('[data-action="claim-place"]')
    .addEventListener("click", () => {
      closeModal();
      document
        .querySelector("#registro")
        .scrollIntoView({
          behavior: reduceMotion ? "instant" : "smooth",
          block: "center",
        });
      form.elements.name.focus({ preventScroll: true });
    });
  modal.addEventListener("cancel", (event) => {
    event.preventDefault();
    closeModal();
  });
  modal.addEventListener("click", (event) => {
    if (event.target === modal) closeModal();
  });
  if (LANDING_CONFIG.openModalOnLoad) openModal();
  setInterval(openModal, LANDING_CONFIG.modalIntervalMs);

  const dob = form.elements.dob;
  const today = new Date();
  dob.max = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
  dob.addEventListener("focus", () => {
    dob.type = "date";
  });
  dob.addEventListener("blur", () => {
    if (!dob.value) dob.type = "text";
  });
  dob.addEventListener("invalid", () => {
    dob.type = "date";
  });
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    // Switching type before validation also validates dates entered as text.
    dob.type = "date";
    if (!form.reportValidity()) return;
    status.hidden = false;
    status.className = "form-status";
    if (!LANDING_CONFIG.formEndpoint) {
      status.textContent =
        "El formulario aún no está conectado a un servicio de envío. Tus datos no se han enviado.";
      return;
    }
    const button = form.querySelector('[type="submit"]');
    button.disabled = true;
    status.textContent = "Enviando tus datos…";
    try {
      const response = await fetch(LANDING_CONFIG.formEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      if (!response.ok) throw new Error("No se pudo enviar");
      status.textContent =
        "Recibimos tus datos. El equipo se pondrá en contacto contigo.";
      form.reset();
      dob.type = "text";
    } catch {
      status.textContent =
        "No se pudo enviar el formulario. Inténtalo de nuevo.";
    } finally {
      button.disabled = false;
    }
  });

  // Ejemplos del diseño original: no son inversiones ni actividad en vivo.
  const socialProofPool = [
    { name: "Rodrigo M.", city: "Rosario", amount: "USD 1,200" },
    { name: "Lucía V.", city: "Santiago", amount: "USD 800" },
    { name: "Ignacio P.", city: "Lima", amount: "USD 2,500" },
    { name: "Valentina S.", city: "Bogotá", amount: "USD 500" },
    { name: "Diego F.", city: "Montevideo", amount: "USD 3,000" },
    { name: "Carolina T.", city: "Mendoza", amount: "USD 1,800" },
  ];
  const toastHost = document.querySelector("#social-proof");
  const toastTemplate = document.querySelector("#toast-template");
  let toastIndex = 0;
  function showToast() {
    if (document.hidden) {
      setTimeout(showToast, 7000);
      return;
    }
    const item = socialProofPool[toastIndex++ % socialProofPool.length];
    toastHost.replaceChildren(toastTemplate.content.cloneNode(true));
    toastHost.querySelector('[data-toast="person"]').textContent =
      `${item.name} · ${item.city}`;
    toastHost.querySelector('[data-toast="amount"]').textContent = item.amount;
    toastHost.classList.remove("toast-leaving");
    setTimeout(() => {
      toastHost.classList.add("toast-leaving");
      setTimeout(
        () => {
          toastHost.replaceChildren();
        },
        reduceMotion ? 0 : 300,
      );
      setTimeout(showToast, 7000 + Math.random() * 6000);
    }, 4500);
  }
  setTimeout(showToast, 2500);
})();
