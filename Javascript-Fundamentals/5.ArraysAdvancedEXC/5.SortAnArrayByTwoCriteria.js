function doubleSort(arr) {
    arr.sort((a, b) => a.length - b.length || a.localeCompare(b))
    console.log(arr.join(`\n`));
}
doubleSort(
    ['Deny',
        'omen',
        'test',
        'Default']
)