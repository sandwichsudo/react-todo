module.exports = {
    getUserUpvotedItemUrl: (uid, currentTeam, productId) => {
        return `users/${uid}/teams/${currentTeam}/upvotedItems/${productId}`;
    },
    getUserTransactionHistoryUrl: (uid, currentTeam) => {
        return `users/${uid}/teams/${currentTeam}/transactionHistory`;
    },
    getUserItemsHistoryUrl: (uid, currentTeam) => {
        return `users/${uid}/teams/${currentTeam}/items`;
    },
    getUserBalanceUrl: (uid, currentTeam) => {
        return `users/${uid}/teams/${currentTeam}/balance`;
    },
    getUserItemMigrationUrl: (uid, currentTeam) => {
        return `users/${uid}/accountInfo/migratedItems`;
    },
    getUserAccountInfo: (uid) => {
        return `users/${uid}/accountInfo`;
    }
}
