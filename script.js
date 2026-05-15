const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const navToggle = document.querySelector("[data-nav-toggle]");
const roleTabs = document.querySelectorAll("[data-role]");
const rolePanel = document.querySelector("[data-role-panel]");

const roles = {
  victim: {
    title: "Victim",
    body:
      "Requests urgent help from a simple mobile interface, shares current location, and tracks whether a report has been received or assigned.",
    points: [
      "Fast SOS and incident submission",
      "Offline queue for poor connectivity",
      "Status updates as help is coordinated",
    ],
  },
  volunteer: {
    title: "Volunteer",
    body:
      "Registers useful skills, sets availability, views nearby needs, accepts assignments, and updates progress from the field.",
    points: [
      "Skill and availability profile",
      "Nearby task list and incident map",
      "Gamified contribution stats and badges",
    ],
  },
  responder: {
    title: "Responder",
    body:
      "Uses real-time operational views to focus on urgent incidents, resource details, and team communication while deployed.",
    points: [
      "Priority incident queue",
      "Live map and field status controls",
      "Low-latency updates from coordinators",
    ],
  },
  coordinator: {
    title: "Coordinator",
    body:
      "Runs the command workflow from the web dashboard or mobile coordinator view: monitor, assign, broadcast, report, and analyze.",
    points: [
      "GIS incident and resource visibility",
      "Volunteer and responder dispatch",
      "Broadcast alerts, analytics, and exports",
    ],
  },
};

function setHeaderState() {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 18);
}

function closeNav() {
  if (!nav || !navToggle || !header) return;
  nav.classList.remove("is-open");
  header.classList.remove("is-open");
  navToggle.setAttribute("aria-expanded", "false");
  document.body.classList.remove("nav-open");
}

function renderRole(roleKey) {
  const role = roles[roleKey];
  if (!role || !rolePanel) return;

  rolePanel.innerHTML = `
    <h3>${role.title}</h3>
    <p>${role.body}</p>
    <ul>
      ${role.points.map((point) => `<li>${point}</li>`).join("")}
    </ul>
  `;
}

setHeaderState();
window.addEventListener("scroll", setHeaderState, { passive: true });

if (navToggle && nav && header) {
  navToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    header.classList.toggle("is-open", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
    document.body.classList.toggle("nav-open", isOpen);
  });

  nav.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      closeNav();
    }
  });
}

roleTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const role = tab.dataset.role;
    roleTabs.forEach((item) => {
      const isActive = item === tab;
      item.classList.toggle("is-active", isActive);
      item.setAttribute("aria-selected", String(isActive));
    });
    renderRole(role);
  });
});

const reveals = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 }
  );

  reveals.forEach((element) => observer.observe(element));
} else {
  reveals.forEach((element) => element.classList.add("is-visible"));
}
