// ===============================
// VANS H NAIK GIS PORTFOLIO
// JavaScript interactions
// ===============================

document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");
  const toast = document.getElementById("toast");

  // Mobile navigation
  menuToggle?.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });

  document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => navLinks.classList.remove("open"));
  });

  // Current year
  document.getElementById("year").textContent = new Date().getFullYear();

  // Project filtering
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      filterButtons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");

      const filter = button.dataset.filter;

      projectCards.forEach(card => {
        if (card.classList.contains("add-project")) {
          card.classList.remove("hidden");
          return;
        }

        const categories = card.dataset.category || "";
        card.classList.toggle(
          "hidden",
          filter !== "all" && !categories.includes(filter)
        );
      });
    });
  });

  // Toast helper
  function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");

    setTimeout(() => {
      toast.classList.remove("show");
    }, 3500);
  }

  // Placeholder links (#)
  document.querySelectorAll('[data-message]').forEach(link => {
    link.addEventListener("click", event => {
      if (link.getAttribute("href") === "#") {
        event.preventDefault();
        showToast(link.dataset.message);
      }
    });
  });

  // Add-project help
  document.getElementById("projectHelp")?.addEventListener("click", () => {
    showToast(
      "Copy any project-card in index.html, change its title/text, replace the image paths, and add your map or Story Map link."
    );
  });

  // Contact form: opens user's email application
  document.getElementById("contactForm")?.addEventListener("submit", event => {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    // IMPORTANT: Replace this email with your real email.
    const destination = "YOUR_EMAIL@example.com";

    const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    );

    if (destination === "YOUR_EMAIL@example.com") {
      showToast("Replace YOUR_EMAIL@example.com in script.js with your real email first.");
      return;
    }

    window.location.href = `mailto:${destination}?subject=${subject}&body=${body}`;
  });

  // Scroll reveal animation
  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    revealElements.forEach(element => observer.observe(element));
  } else {
    revealElements.forEach(element => element.classList.add("visible"));
  }
});

document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('startDocumentaryBtn');
    const overlay = document.getElementById('cinematicOverlay');
    const closeBtn = document.getElementById('closeDocBtn');
    const prevBtn = document.getElementById('prevScene');
    const nextBtn = document.getElementById('nextScene');
    const bgMusic = document.getElementById('bgMusic');
    const scenes = document.querySelectorAll('.doc-scene');
    
    let currentSceneIndex = 0;

    // Open Documentary
    startBtn.addEventListener('click', () => {
        overlay.classList.remove('hidden');
        // Play music (requires user interaction first)
        if (bgMusic) {
            bgMusic.volume = 0.5;
            bgMusic.play().catch(e => console.log("Audio play prevented by browser policy"));
        }
        updateScenes();
    });

    // Close Documentary
    closeBtn.addEventListener('click', () => {
        overlay.classList.add('hidden');
        if (bgMusic) {
            bgMusic.pause();
            bgMusic.currentTime = 0;
        }
        currentSceneIndex = 0;
        updateScenes();
    });

    // Navigation
    nextBtn.addEventListener('click', () => {
        if (currentSceneIndex < scenes.length - 1) {
            currentSceneIndex++;
            updateScenes();
        }
    });

    prevBtn.addEventListener('click', () => {
        if (currentSceneIndex > 0) {
            currentSceneIndex--;
            updateScenes();
        }
    });

    function updateScenes() {
        scenes.forEach((scene, index) => {
            if (index === currentSceneIndex) {
                scene.classList.add('active');
            } else {
                scene.classList.remove('active');
            }
        });

        // Toggle button visibility
        prevBtn.style.opacity = currentSceneIndex === 0 ? '0' : '1';
        prevBtn.style.pointerEvents = currentSceneIndex === 0 ? 'none' : 'auto';
        
        nextBtn.style.opacity = currentSceneIndex === scenes.length - 1 ? '0' : '1';
        nextBtn.style.pointerEvents = currentSceneIndex === scenes.length - 1 ? 'none' : 'auto';
    }
});
