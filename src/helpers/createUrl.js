module.exports = {
    getUserUpvotedItemUrl: (uid, currentTeam, productId) => {
        return `users/${uid}/teams/${currentTeam}/upvotedItems/${productId}`;
    },
    getUserTransactionHistoryUrl: (uid, currentTeam) => {
        return `users/${uid}/teams/${currentTeam}/transactionHistory`;
    },
    getUserArchiveTransactionHistoryUrl: (uid, currentTeam) => {
        return `users/${uid}/teams/${currentTeam}/transactionArchive`;
    },
    getUserBalanceUrl: (uid, currentTeam) => {
        return `users/${uid}/teams/${currentTeam}/balance`;
    },
    getUserItemMigrationUrl: (uid, currentTeam) => {
        return `users/${uid}/teams/${currentTeam}/migratedItems`;
    }
}
