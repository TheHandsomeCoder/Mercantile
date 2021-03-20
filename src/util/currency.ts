enum currency {
    COPPER = 'cp',
    SILVER = 'sp',
    ELECTRUM = 'ep',
    GOLD = 'gp',
    PLATNUM = 'pp'
}

export const formatCurrency = (value: number): string => {
    if (value % 100 === 0) {
        return `${value / 100} ${currency.GOLD.toUpperCase()}`;
    } else if (value % 10 === 0) {
        return `${value / 100} ${currency.SILVER.toUpperCase()}`;
    } else {
        return `${value} ${currency.COPPER.toUpperCase()}`
    }
}