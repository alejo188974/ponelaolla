document.addEventListener("DOMContentLoaded", function () {
  const toggle = document.getElementById("menu-toggle");
  const navbar = document.getElementById("navbar");
  toggle.addEventListener("click", function () {
    navbar.classList.toggle("active");
  });
});
