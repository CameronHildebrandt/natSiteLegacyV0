const menuToggle = () => {
  const burger = document.getElementById("burger");
  const menu = document.querySelector(".mobileMenu");
  const menuLinks = document.querySelectorAll(".mobilePageLink");

  // Toggle Menu
  burger.addEventListener('click',()=>{
    menu.classList.toggle('mobileMenuActivated');

    // Animate Links
    menuLinks.forEach((link, index) => {
      if(link.style.animation) {
        link.style.animation = '';
      } else {
        link.style.animation = `mobilePageLinkFade 0.5s ease-in-out forwards ${index/7+0.1}s`;
      }
    });

    // Burger Animation
    burger.classList.toggle('toggle');

  });
}

// menuToggle();
