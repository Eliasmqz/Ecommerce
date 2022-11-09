function toUsd (element) {
    let usDollar = Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    });
return element = usDollar.format(element);

}

function loader () {
    window.addEventListener("load", () => {
        const loading = document.querySelector(".loading");
    
        setTimeout(() => {
            loading.style.display = "none";
        }, 3000);
    })
}




export {
    toUsd,
    loader
}