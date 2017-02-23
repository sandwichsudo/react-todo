function compare(a,b) {
  if (a.time > b.time)
    return -1;
  if (a.time < b.time)
    return 1;
  return 0;
}

module.exports = {
    arrayifyTransactions: (transactionHistory) => {
        const transactionArray = [];
        for (var key in transactionHistory) {
            if (transactionHistory.hasOwnProperty(key)) {
                transactionHistory[key].key = key;
                transactionArray.push(transactionHistory[key]);
            }
        }
        transactionArray.sort(compare);
        return transactionArray;
    }
}
