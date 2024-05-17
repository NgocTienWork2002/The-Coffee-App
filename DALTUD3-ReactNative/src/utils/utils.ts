export function formatCurrency(currency: number) {
    return Intl.NumberFormat('de-DE').format(currency);
}
