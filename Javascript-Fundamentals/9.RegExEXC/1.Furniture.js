function furniture(input) {
    let regEx = />>(?<name>\w+)<<(?<price>\d+(?:\.\d+)?)!(?<quantity>\d+)/g  //    ?:-non capturing group;    ()? или без или точно ()
    let totalSum = 0

    console.log('Bought furniture:');
    for (let el of input) {
        let sum = 0
        while ((valid = regEx.exec(el)) !== null) {
            
            let name = valid.groups.name
            let price = valid.groups.price
            let quantity = valid.groups.quantity
            sum = price * quantity

            console.log(name);
        }
        totalSum += sum

    }
    console.log(`Total money spend: ${totalSum.toFixed(2)}`);
}
furniture(['>>Laptop<<312.2323!3',
'>>TV<<300.21314!5',
'>Invalid<<!5',
'>>TV<<300.21314!20',
'>>Invalid<!5',
'>>TV<<30.21314!5',
'>>Invalid<<!!5',
'Purchase']

)