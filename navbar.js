const navMenu = document.querySelector(".nav__menu");
const container = document.querySelector(".container");


export function hideShowMenu (button) {
    button.addEventListener("click", () => {
        navMenu.classList.toggle("nav__menu--show")
    })
}

export function headerScroll () {
    const navBar = document.querySelector('nav');
  
    if (navBar) {
      window.addEventListener('scroll', function () {
        if (window.scrollY >= 64) {
          navBar.classList.add('scroll__header')
        } else {
            navBar.classList.remove('scroll__header')
        }
      })
    }
  }