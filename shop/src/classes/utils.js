export function currencyFormat(number, prefix = '$', tofixed = 0) {
    return tofixed
        ? prefix + number.toFixed(tofixed).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
        : prefix + number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}