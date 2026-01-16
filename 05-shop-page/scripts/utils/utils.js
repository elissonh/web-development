export function convertCentsToMoney(cents) {
    if (cents <= 0) return 0;

    return (cents / 100).toFixed(2);
}