function townCoordinates(input) {
    for (row of input) {
        let [town,latitude,longitude] = row.split(' | ')
        let townInfo ={
            town,
            latitude: (+latitude).toFixed(2),
            longitude: (+longitude).toFixed(2)
        }
        console.log(townInfo);
    }
}
townCoordinates(['Sofia | 42.696552 | 23.32601',
    'Beijing | 39.913818 | 116.363625'])
