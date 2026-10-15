// Home page interactions: automatic slider, final search, group cards, bracket selection.
document.addEventListener("DOMContentLoaded", () => {
  // Hero slider: changes every 3 seconds; arrows and dots also work.
  const slides = [...document.querySelectorAll(".hero-slide")];
  const dotsWrap = document.getElementById("sliderDots");
  const progress = document.getElementById("sliderProgress");
  let currentSlide = 0;
  let slideTimer;
  const slideDelay = 3000;

  function showSlide(index) {
    currentSlide = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => slide.classList.toggle("active", i === currentSlide));
    [...dotsWrap.children].forEach((dot, i) => {
      dot.classList.toggle("active", i === currentSlide);
      dot.setAttribute("aria-current", i === currentSlide ? "true" : "false");
    });
    if (progress) {
      progress.style.transition = "none";
      progress.style.width = "0";
      progress.style.transition = "width 3s linear";
      progress.style.width = "100%";
    }
  }
  slides.forEach((slide, i) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = i === 0 ? "active" : "";
    dot.setAttribute("aria-label", "Go to slide " + (i + 1));
    dot.addEventListener("click", () => { showSlide(i); restartSlider(); });
    dotsWrap.appendChild(dot);
  });
  function restartSlider() {
    clearInterval(slideTimer);
    showSlide(currentSlide);
    slideTimer = setInterval(() => showSlide(currentSlide + 1), slideDelay);
  }
  document.getElementById("slidePrev").addEventListener("click", () => { showSlide(currentSlide - 1); restartSlider(); });
  document.getElementById("slideNext").addEventListener("click", () => { showSlide(currentSlide + 1); restartSlider(); });
  const slider = document.querySelector(".hero-slider");
  slider.addEventListener("mouseenter", () => clearInterval(slideTimer));
  slider.addEventListener("mouseleave", () => { clearInterval(slideTimer); slideTimer = setInterval(() => showSlide(currentSlide + 1), slideDelay); });
  showSlide(0);
  slideTimer = setInterval(() => showSlide(currentSlide + 1), slideDelay);

  // Search/filter the World Cup finals.
  const search = document.getElementById("finalSearch");
  const cards = [...document.querySelectorAll(".final-card")];
  const noResults = document.getElementById("noResults");

  // Cards slide in from alternating sides when the user reaches the finals section.
  cards.forEach((card, index) => {
    if (index % 2 === 1) card.classList.add("from-right");
  });
  if ("IntersectionObserver" in window) {
    const cardObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("card-visible");
          cardObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    cards.forEach(card => cardObserver.observe(card));
  } else {
    cards.forEach(card => card.classList.add("card-visible"));
  }

  search.addEventListener("input", () => {
    const term = search.value.trim().toLowerCase();
    let visible = 0;
    cards.forEach(card => {
      const show = card.dataset.search.toLowerCase().includes(term);
      card.hidden = !show;
      if (show) visible++;
    });
    noResults.hidden = visible !== 0;
  });

  // 2026 group cards. Edit these arrays easily if you want to change team data.
  const groups = [
    ["A","Mexico","South Africa","South Korea","Czechia"],
    ["B","Canada","Bosnia and Herzegovina","Qatar","Switzerland"],
    ["C","Brazil","Morocco","Haiti","Scotland"],
    ["D","United States","Paraguay","Australia","Türkiye"],
    ["E","Germany","Curaçao","Côte d’Ivoire","Ecuador"],
    ["F","Netherlands","Japan","Sweden","Tunisia"],
    ["G","Belgium","Egypt","Iran","New Zealand"],
    ["H","Spain","Cabo Verde","Saudi Arabia","Uruguay"],
    ["I","France","Senegal","Iraq","Norway"],
    ["J","Argentina","Algeria","Austria","Jordan"],
    ["K","Portugal","Colombia","Uzbekistan","DR Congo"],
    ["L","England","Croatia","Ghana","Panama"]
  ];
  const groupsGrid = document.getElementById("groupsGrid");
  const groupFilter = document.getElementById("groupFilter");
  groups.forEach(group => {
    const option = document.createElement("option");
    option.value = group[0];
    option.textContent = `Group ${group[0]}`;
    groupFilter.appendChild(option);
    const article = document.createElement("article");
    article.className = "group-card";
    article.dataset.group = group[0];
    const heading = document.createElement("h3");
    heading.textContent = `Group ${group[0]}`;
    const list = document.createElement("ul");
    group.slice(1).forEach(team => {
      const item = document.createElement("li");
      item.textContent = team;
      list.appendChild(item);
    });
    article.append(heading, list);
    groupsGrid.appendChild(article);
  });
  groupFilter.addEventListener("change", () => {
    document.querySelectorAll(".group-card").forEach(card => {
      card.hidden = groupFilter.value !== "all" && card.dataset.group !== groupFilter.value;
    });
  });

  // Click a bracket match to highlight it.
  document.querySelectorAll(".match").forEach(match => {
    match.addEventListener("click", () => {
      document.querySelectorAll(".match").forEach(item => item.classList.remove("selected"));
      match.classList.add("selected");
    });
  });
});
