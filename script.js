const header = document.querySelector("[data-header]");

function updateHeader() {
  header?.classList.toggle("is-scrolled", window.scrollY > 16);
}

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

// Guide contents links: lazy images above the target change the page height while
// a smooth scroll is running, so the first click can stop short. Load the images
// and re-align once they have a size.
document.querySelectorAll(".guide-toc a[href^='#']").forEach((link) => {
  link.addEventListener("click", () => {
    const target = document.getElementById(link.getAttribute("href").slice(1));
    if (!target) return;
    const realign = () => target.scrollIntoView({ block: "start" });
    document.querySelectorAll("img[loading='lazy']").forEach((img) => {
      img.loading = "eager";
      if (!img.complete) img.addEventListener("load", realign, { once: true });
    });
    setTimeout(realign, 900);
  });
});
