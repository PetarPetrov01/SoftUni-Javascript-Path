function shop(input) {
    let list = input.shift().split('!')

    for (el of input) {
        if (el === "Go Shopping!") {
            break;
        }

        let commands = el.split(' ')
        let command = commands[0]
        let item = commands[1]

        switch (command) {
            case "Urgent":
                if (!list.includes(item)) {
                    list.unshift(item)
                }
                break;
            case "Unnecessary":
                if (list.includes(item)) {
                    list.splice(list.indexOf(item),1)
                }
                break;
            case "Correct":
                let newItem = commands[2]
                if (list.includes(item)) {
                    list.splice(list.indexOf(item),1,newItem)
                }
                break;
            case "Rearrange":
                if (list.includes(item)) {
                    list.splice(list.indexOf(item),1)
                    list.push(item)
                }
                break;
        }
    }
    console.log(list.join(', '));
}
shop (["Milk!Pepper!Salt!Water!Banana",
"Urgent Salt",
"Unnecessary Grapes",
"Correct Pepper Onion",
"Rearrange Grapes",
"Correct Tomatoes Potatoes",
"Go Shopping!"])
