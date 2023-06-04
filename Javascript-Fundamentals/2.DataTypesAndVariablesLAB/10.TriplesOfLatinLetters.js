function triples(n) {
    for (i = 0; i < n; i++) {
        let letter = String.fromCharCode(i + 97)
        for (j = 0; j < n; j++) {
            let letterSec = String.fromCharCode(j + 97)
            for (k = 0; k < n; k++) {
                let letterThird = String.fromCharCode(k + 97)
                console.log(`${letter}${letterSec}${letterThird}`);
            }
        }
    }
}
triples('3')