"use strict";

document.addEventListener("DOMContentLoaded", () => {
  // MENU MOBILE
  const menuToggle = document.getElementById("menu-toggle");
  const navigation = document.getElementById("navigation");

  if (menuToggle && navigation) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navigation.classList.toggle("open");

      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Fermer le menu" : "Ouvrir le menu"
      );

      menuToggle.textContent = isOpen ? "✕" : "☰";
    });

    navigation.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navigation.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Ouvrir le menu");
        menuToggle.textContent = "☰";
      });
    });
  }

  // CHANGEMENT DE LANGUE
  const languageButton = document.getElementById("language-button");

  let currentLanguage = "fr";

  function translatePage(language) {
    document.documentElement.lang = language;

    document.querySelectorAll("[data-fr][data-en]").forEach((element) => {
      const translation = element.getAttribute(`data-${language}`);

      if (translation !== null) {
        element.textContent = translation;
      }
    });

    if (languageButton) {
      languageButton.textContent = language === "fr" ? "EN" : "FR";

      languageButton.setAttribute(
        "aria-label",
        language === "fr"
          ? "Switch to English"
          : "Passer en français"
      );
    }

    try {
      localStorage.setItem("cec-language", language);
    } catch (error) {
      // Le site fonctionne aussi si le stockage est indisponible.
    }

    currentLanguage = language;
  }

  if (languageButton) {
    languageButton.addEventListener("click", () => {
      const nextLanguage = currentLanguage === "fr" ? "en" : "fr";
      translatePage(nextLanguage);
    });
  }

  // RESTAURER LA LANGUE CHOISIE
  try {
    const savedLanguage = localStorage.getItem("cec-language");

    if (savedLanguage === "en" || savedLanguage === "fr") {
      translatePage(savedLanguage);
    }
  } catch (error) {
    // Le français reste la langue par défaut.
  }

  // ANIMATIONS AU DÉFILEMENT
  const animatedElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries, currentObserver) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            currentObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -30px 0px"
      }
    );

    animatedElements.forEach((element) => observer.observe(element));
  } else {
    animatedElements.forEach((element) => {
      element.classList.add("visible");
    });
  }

  // ANNÉE AUTOMATIQUE
  const yearElement = document.getElementById("year");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
});
