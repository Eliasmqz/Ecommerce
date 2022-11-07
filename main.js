import { headerScroll, hideShowMenu } from "./navbar.js";

const mobileMenuBtn = document.querySelector(".mobile__menu--btn");
const closeMenuBtn = document.querySelector(".close__menu--btn");
const productsContent = document.querySelector(".products__content");
const productsFilter = document.querySelector(".products__filter");


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
    products.forEach(element => {
        let html = `
                    <article class="product__card ${element.category}" id =${element.id}>
                        <div class="product__img--container">
                            <img src=${element.urlImage} alt="product" class="product__img">
                        </div>
                        <div class="product__info">
                            <h2 class="product__price">
                                $${element.price}
                                <span class="product__stock"> | Stock: ${element.stock}</span>
                            </h2>
                            <h3 class="product__name">${element.name}</h3>
                            <button class="button product__button--add">+</button> 
                        </div>
                    </article>
                `;
                    productsContent.innerHTML += html;
    });
}


productsOnHtml(products)
addProductsToDom();
headerScroll();
hideShowMenu(mobileMenuBtn);
hideShowMenu(closeMenuBtn);






















