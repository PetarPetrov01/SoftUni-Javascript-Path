function partyTime(input) {
    let list ={
        vip:[],
        normal:[]
    }
    let guest = input.shift()
    while(guest !== 'PARTY'){
        if (isNaN(guest[0])){
            list.normal.push(guest)
        } else {
            list.vip.push(guest)
        }
        guest = input.shift()
    }
    for (num of input){
        if (list.vip.includes(num)){
            list.vip.splice(list.vip.indexOf(num),1)
        } else if (list.normal.includes(num)){
            list.normal.splice(list.normal.indexOf(num),1)
        }
    }
    let missingGuests = list.vip.length + list.normal.length
    console.log(missingGuests);
    list.vip.forEach((el)=>console.log(el))
    list.normal.forEach((el)=>console.log(el))
}
partyTime(['m8rfQBvl',
    'fc1oZCE0',
    'UgffRkOn',
    '7ugX7bm0',
    '9CQBGUeJ',
    '2FQZT3uC',
    'dziNz78I',
    'mdSGyQCJ',
    'LjcVpmDL',
    'fPXNHpm1',
    'HTTbwRmM',
    'B5yTkMQi',
    '8N0FThqG',
    'xys2FYzn',
    'MDzcM9ZK',
    'PARTY',
    '2FQZT3uC',
    'dziNz78I',
    'mdSGyQCJ',
    'LjcVpmDL',
    'fPXNHpm1',
    'HTTbwRmM',
    'B5yTkMQi',
    '8N0FThqG',
    'm8rfQBvl',
    'fc1oZCE0',
    'UgffRkOn',
    '7ugX7bm0',
    '9CQBGUeJ'
]

)