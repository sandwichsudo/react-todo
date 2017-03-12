module.exports = {
    createTransactionEvent: (action, productName, value, donation) => {
        return {
            category: 'Product',
            action: action,
            label: productName,
            time: Date.now(),
            value,
            donation,
        };
    }
}
