module.exports = {
    formatPrice: (priceInPence) => {
        const isNegative = priceInPence < 0;
        const numberOfPence = Number(priceInPence);
        const absPence = Math.abs(Number(priceInPence));
        const numberInPounds = (absPence/100).toFixed(2)
        const displayPoundSymbol = absPence > 99;
        if (numberOfPence === 0) {
            return '£0.00';
        }
        else if (isNegative && displayPoundSymbol) {
            return `-£${numberInPounds}`;
        } else if (displayPoundSymbol) {
            return `£${numberInPounds}`;
        }
        return `${numberOfPence}p`;
    },
}
