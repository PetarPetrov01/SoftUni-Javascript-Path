function type(a) {

    console.log(`${typeof a}`);
    if (a === null) {
        console.log('Parameter is not suitable for printing');
    } else {
        console.log(a);
    }
}
type(null)