/**
 * Format a number to IDR currency string (e.g. 15000 -> "Rp 15.000")
 * @param {number|string} amount
 * @param {boolean} showPrefix
 * @returns {string}
 */
export function formatRupiah(amount, showPrefix = true) {
    const num = typeof amount === 'number' ? amount : Number(amount) || 0;
    const formatted = Math.round(num)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    return showPrefix ? `Rp ${formatted}` : formatted;
}

/**
 * Parse an IDR formatted string back to a number (e.g. "Rp 15.000" -> 15000)
 * @param {string} str
 * @returns {number}
 */
export function parseRupiah(str) {
    if (typeof str === 'number') return str;
    if (!str) return 0;
    const cleaned = str.toString().replace(/[^0-9]/g, '');
    return Number(cleaned) || 0;
}

/**
 * Format a number with unit (e.g. "Rp 15.000 / hari")
 * @param {number} amount
 * @param {string} unit
 * @returns {string}
 */
export function formatRupiahPerUnit(amount, unit = 'porsi') {
    return `${formatRupiah(amount)} / ${unit}`;
}

