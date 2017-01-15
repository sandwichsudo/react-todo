module.exports = {
    formatPrice: (priceInPence) => {
        return `£${(Number(priceInPence)/100).toFixed(2)}`;
    },
}
