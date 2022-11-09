function toUsd (element) {
    let usDollar = Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    });
return element = usDollar.format(element);

}


export {
    toUsd
}