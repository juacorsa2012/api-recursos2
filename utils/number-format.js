function number_format(amount, decimals) {
    amount += ''; // por si pasan un numero en vez de un string
    amount = parseFloat(amount.replace(/[^0-9\.]/g, '')); // elimino cualquier cosa que no sea numero o punto

    decimals = decimals || 0; 

    // Si no es un numero o es igual a cero retorno el mismo cero
    if (isNaN(amount) || amount === 0) {
        return parseFloat(0).toFixed(decimals);
    }

    // Si es mayor o menor que cero retorno el valor formateado como numero
    amount = '' + amount.toFixed(decimals);

    let amount_parts = amount.split('.');
    let regexp = /(\d+)(\d{3})/;

    while (regexp.test(amount_parts[0])) {
        amount_parts[0] = amount_parts[0].replace(regexp, '$1' + '.' + '$2');
    }

    return amount_parts.join(',');
}

module.exports = number_format;