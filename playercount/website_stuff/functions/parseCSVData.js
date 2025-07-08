export function splitRows(csvData) {
    const rows = csvData.trim().split('\n') // split by row
    const sanitizedRows = rows.map(row => row.trim().split(',')) // removes trailing newlines chars, splits by column
    const data = sanitizedRows.slice(1) // remove header, start it index 1

    const header = sanitizedRows[0]

    return { data, header } // must return it as an object or something similar
}