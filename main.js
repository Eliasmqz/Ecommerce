import { headerScroll, hideShowMenu, showCart} from "./navbar.js";

const mobileMenuBtn = document.querySelector(".mobile__menu--btn");
const closeMenuBtn = document.querySelector(".close__menu--btn");
const productsContent = document.querySelector(".products__content");
const productsFilter = document.querySelector(".products__filter");
const shoppingCartBtn = document.querySelector(".shopping__bag");
const soppingCartItems = document.querySelector(".sopping__cart--items");
const soppingCartTotal = document.querySelector(".sopping__cart--total");
const shoppingRestBtn = document.querySelector(".product__button--rest");
const shoppingAddBtn = document.querySelector(".product__button--add");
const shoppingDelBtn = document.querySelector(".product__button--del");


const products = [
    {
        id: 1,
        name: "Hoodies",
        price: 14.00,
        stock: 7,
        category: "hoodies",
        urlImage : "./src/images/featured1.png"
    },
    {
        id: 2,
        name: "Shirts",
        price: 24.00,
        stock: 15,
        category:  "shirts",
        urlImage : "./src/images/featured2.png"
    },
    {
        id: 3,
        name: "Sweatshirts",
        price: 24.00,
        stock: 20,
        category: "sweatshirts",
        urlImage : "./src/images/featured3.png"
    }
]

const addProductsToDom =()=>{
    
    productsOnHtml(products);

    productsFilter.addEventListener('click', (e) =>{

        if (e.target.parentElement.className.includes('all'))productsOnHtml(products);
        if (e.target.parentElement.className.includes('hoodies'))productsOnHtml(products.filter(item => item.name == 'Hoodies' ));
        if (e.target.parentElement.className.includes('shirts'))productsOnHtml(products.filter(item => item.name =='Shirts' ));
        if (e.target.parentElement.className.includes('sweatshirts'))productsOnHtml(products.filter(item => item.name == 'Sweatshirts' ));

    });

}

const productsOnHtml = (products) =>{
    productsContent.innerHTML = '';
    products.forEach(({category, id, urlImage, price, name, stock}) => {
        let html = `
                    <article class="product__card ${category}" id =${id}>
                        <div class="product__img--container">
                            <img src=${urlImage} alt="product" class="product__img">
                        </div>
                        <div class="product__info">
                            <h2 class="product__price">
                                $${price}
                                <span class="product__stock"> | Stock: ${stock}</span>
                            </h2>
                            <h3 class="product__name">${name}</h3>
                            <button class="button product__button--add" id =${id} >+</button>
                        </div>
                    </article>
                `;
                    productsContent.innerHTML += html;
    });
}


let shoppingCart = {};


const printCart = () => {
    let html = "";

    const arrayShoppingCart = Object.values(shoppingCart)

    arrayShoppingCart.forEach(({category, id, urlImage, price, name, amount, stock}) =>{
        html += `
        <article class="product__card--cart ${category}" id =${id}>
            <div class="product__img--container--cart">
                <img src=${urlImage} alt="product" class="product__img--cart">
            </div>
            <div class="product__info--cart">
                <h3 class="product__name--cart">${name}</h3>
                <div class="product__stock--cart">Cantidad: ${stock}
                <span class="product__price--cart">
                |$${price}</span>
                <h3 class="subtotal">Subtotal: </h3>
            </div>
            <div class="counter__cart">
                <div class="add__rest--btns">
                    <button class="button product__button--add--cart" id =${id} >+</button>
                    <span class="amount__card--cart amount">Units: ${amount}</span>
                    <button class="button product__button--rest" id =${id} >-</button> 
                </div>
                <button class="button product__button--del" id =${id} ><i class='bx bx-trash'></i></button>
            </div>        

        </div>
    </article>
        `
    })

    soppingCartItems.innerHTML= html
    

}

productsContent.addEventListener("click", (e) => {
    if(e.target.classList.contains("product__button--add")){
        const idProduct = Number(e.target.id);
        const productCardShopping = products.find(products => products.id == idProduct)
        if(shoppingCart[productCardShopping.id]) {
            shoppingCart[productCardShopping.id].amount++;
        }else{
            shoppingCart[productCardShopping.id] = productCardShopping;
            shoppingCart[productCardShopping.id].amount = 1;
        };

        printCart();
    }
})

productsOnHtml(products)
addProductsToDom();
headerScroll();
hideShowMenu(mobileMenuBtn);
hideShowMenu(closeMenuBtn);
showCart (shoppingCartBtn);




















