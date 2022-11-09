import { headerScroll, hideShowMenu, showCart} from "./navbar.js";
import { toUsd, loader } from "./helpers.js";

const mobileMenuBtn = document.querySelector(".mobile__menu--btn");
const closeMenuBtn = document.querySelector(".close__menu--btn");
const productsContent = document.querySelector(".products__content");
const productsFilter = document.querySelector(".products__filter");
const shoppingCartBtn = document.querySelector(".shopping__bag");
const shoppingCartItems = document.querySelector(".shopping__cart--items");
const shoppingCartTotal = document.querySelector(".shopping__cart--total");
const checkoutBtn = document.querySelector(".checkout__btn");
const cartCounter = document.querySelector(".shopping__counter");
const closeCartBtn = document.querySelector(".cart__close--btn");
const navLinkHome = document.querySelector(".nav__link--home");
const navLinkProducts = document.querySelector(".nav__link--products");


let products = [
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

let shoppingCart = {};

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
        price = toUsd(price);

        const notAvailable = stock?
        `<button class="button product__button--add" id =${id} >+</button>`:
        `<button class="button product__button--add no__stock">No Stock</button>`;

        let html = `
                    <article class="product__card ${category}" id =${id}>
                        <div class="product__img--container">
                            <img src=${urlImage} alt="product" class="product__img">
                        </div>
                        <div class="product__info">
                            <h2 class="product__price">
                                ${price}
                                <span class="product__stock"> | Stock: ${stock}</span>
                            </h2>
                            <h3 class="product__name">${name}</h3>
                            ${notAvailable}
                        </div>
                    </article>
                `;
                    productsContent.innerHTML += html;
    });
}


function addProduct(idProduct) {
    const productCardShopping = products.find(products => products.id == idProduct)
    if(productCardShopping.stock == shoppingCart[idProduct].amount)
        return alert ("Not enough Stock");

        shoppingCart[productCardShopping.id].amount++;
}

function noItems() {
    const arrayShoppingCart = Object.values(shoppingCart);
    if(!arrayShoppingCart.length) return shoppingCartItems.innerHTML = `

    <div class="empty__cart" >
        <img src="./src/images/empty-cart.png" alt="empty__cart" class="empty__cart--img">
        <h2 class="empty__cart--title">Your cart is empty</h2>
        <p class="empty__cart--text">You can add items to your cart by clicking on the "<i class='bx bx-plus' ></i>" button on the product page.</p>
    </div>
    `;
    
}

function printTotal () {

    const arrayShoppingCart = Object.values(shoppingCart);


        let totalSum = arrayShoppingCart.reduce((acum, curr) =>{
            acum += curr.price * curr.amount;
    
            return acum;
        }, 0)
        let totalItems = arrayShoppingCart.reduce((acum, curr) =>{ 
            acum += curr.amount
            return acum;
        }, 0)
        

       totalSum = toUsd (Number(totalSum));


        shoppingCartTotal.innerHTML = `
        <div class="total__items">${totalItems} Item</div>
        <div class="total__price"> ${totalSum}</div>
        `;


        noItems()
}

function bagCartCounter ()  {
    const arrayShoppingCart = Object.values(shoppingCart);

    let totalItems = arrayShoppingCart.reduce((acum, curr) =>{ 
        acum += curr.amount
        return acum;
    }, 0)

    cartCounter.innerHTML = `${totalItems}`

}

const printCart = () => {
    let html = "";

    const arrayShoppingCart = Object.values(shoppingCart)

    arrayShoppingCart.forEach(({category, id, urlImage, price, name, amount, stock}) =>{

        price = toUsd (price);

        html += `
        <article class="product__card--cart ${category}" id =${id}>
            <div class="product__img--container--cart">
                <img src=${urlImage} alt="product" class="product__img--cart">
            </div>
            <div class="product__info--cart">
                <h3 class="product__name--cart">${name}</h3>
                <div class="product__stock--cart">Cantidad: ${stock}
                <span class="product__price--cart">
                |${price}</span>
                <h3 class="subtotal">Subtotal: </h3>
            </div>
            <div class="counter__cart">
                <div class="add__rest--btns">
                    <button class="button product__button--rest" id =${id} >-</button>
                    <span class="amount__card--cart amount">Units: ${amount}</span>
                    <button class="button product__button--add--cart" id =${id} >+</button>
                </div>
                <button class="button product__button--del" id =${id} ><i class='bx bx-trash'></i></button>
            </div>        

        </div>
    </article>
        `
    })

    shoppingCartItems.innerHTML= html
    printTotal ();
    bagCartCounter ();
    noDropCheckout ();
}

function noDropCheckout () {
    let arrayShoppingCart = Object.values(shoppingCart);
    if (arrayShoppingCart.length == 0){
        checkoutBtn.classList.add("no__drop--checkout");
    }
    else{
        checkoutBtn.classList.remove("no__drop--checkout");
    }
}

productsContent.addEventListener("click", (e) => {
    if(e.target.classList.contains("product__button--add")){
        const idProduct = Number(e.target.id);
        const productCardShopping = products.find((products) => products.id == idProduct)
        if(shoppingCart[productCardShopping.id]) {
            addProduct(idProduct)
        }else{
            shoppingCart[productCardShopping.id] = { ...productCardShopping };
            shoppingCart[productCardShopping.id].amount = 1;
        };

        printCart();
    }
})

shoppingCartItems.addEventListener("click", (e) => {
    if(e.target.classList.contains("product__button--add--cart")){
            const idProduct = Number(e.target.id)
            addProduct(idProduct)
    };

    if(e.target.classList.contains("product__button--rest")){
        const idProduct = Number(e.target.id)
        if(shoppingCart[idProduct].amount == 1) {
            if(confirm ("Are you sure you wanna delete the item? ")){
                delete shoppingCart[idProduct];
            }
        }else {
            shoppingCart[idProduct].amount--;
        }
    }

    if(e.target.parentElement.classList.contains("product__button--del")){
        const idProduct = Number(e.target.parentElement.id)
        if(confirm ("Are you sure you wanna delete the item? "))
        delete shoppingCart[idProduct];
    }
    printCart();
})

checkoutBtn.addEventListener("click", (e) => {
    let arrayShoppingCart = Object.values(shoppingCart);
    if(arrayShoppingCart.length){
        if(e.target.classList.contains("checkout__btn")) {
            const finalBuy = confirm ("Ni dinero tienes y quieres gastar, ¿Estás seguro?");
            if(finalBuy) {
                products = products.map(product => {
                    if(shoppingCart[product.id]?.id === product.id) {
                        return {
                            ... product,
                            stock: product.stock - shoppingCart[product.id]?.amount,
                            
                        } 
                        
                    } else {
                        return product;
                    }
                })

                swal("Thanks!", "Enjoy your products", "success");
                
                shoppingCart = {};
                printCart();
                addProductsToDom();
            }
    }

    }
})


noDropCheckout ()
productsOnHtml(products)
addProductsToDom();
headerScroll();

hideShowMenu(mobileMenuBtn);
hideShowMenu(closeMenuBtn);
hideShowMenu(navLinkHome);
hideShowMenu(navLinkProducts);

showCart (closeCartBtn);
showCart (shoppingCartBtn);
loader();
printTotal ()





















