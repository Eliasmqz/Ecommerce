const navMenu = document.querySelector(".nav__menu");
const shoppingCart = document.querySelector(".shopping__cart")


function hideShowMenu (button) {
    button.addEventListener("click", () => {
      navMenu.classList.toggle("nav__menu--show");
    })
}

function showCart (button) {
  button.addEventListener("click", () => {
    shoppingCart.classList.toggle("shopping__cart--show")
})
}

function headerScroll () {
    const navBar = document.querySelector('nav');
  
    if (navBar) {
      window.addEventListener('scroll', function () {
        if (window.scrollY >= 50) {
          navBar.classList.add('scroll__header')
        } else {
            navBar.classList.remove('scroll__header')
        }
      })
    }
  }



  export {
    hideShowMenu,
    showCart,
    headerScroll,
  }

