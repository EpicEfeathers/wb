export function formatLargeNumber(num) {
    return new Intl.NumberFormat().format(num);
}