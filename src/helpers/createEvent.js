module.exports = {
    createTransactionEvent: (action, productName, value) => {
        return {
            category: 'Product',
            action: action,
            label: productName,
            time: Date.now(),
            value,
        };
    },
}
