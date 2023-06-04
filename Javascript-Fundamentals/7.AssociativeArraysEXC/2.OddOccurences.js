function oddOccurences(input) {
    let list = input.split(' ').map((el) => el.toLowerCase())
    let mapList = new Map()
    let output = ''
    for (let el of list) {
        if (mapList.has(el)) {
            let count = mapList.get(el) + 1
            mapList.set(el, count)
        } else {
            mapList.set(el, 1)
        }
    }
    let filteredArr = Array.from(mapList.entries())
        .filter((a) => a[1] % 2 !== 0)
        .forEach((el)=>output+=`${el[0]} `)
    console.log(output);
}
oddOccurences('Java C# Php PHP Java PhP 3 C# 3 1 5 C#')