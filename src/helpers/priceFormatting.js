module.exports = {
    formatPrice: (priceInPence) => {
        if (0 < priceInPence && priceInPence < 100) {
            return `${(Number(priceInPence))}p`;
        }
        return `£${(Number(priceInPence)/100).toFixed(2)}`;
    },
}
