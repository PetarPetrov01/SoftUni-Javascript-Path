function messageManager(inArr) {
    let capacity = +inArr.shift()
    let recordsObj = {}
    let line = inArr.shift()

    while (line !== 'Statistics') {
        let [command, ...info] = line.split('=')
        switch (command) {
            case 'Add':
                let user = info[0]
                let send = +info[1]
                let recieved = +info[2]

                if (!recordsObj.hasOwnProperty(user)) {
                    recordsObj[user] = {
                        send,
                        recieved
                    }
                }
                break;
            case 'Message':
                let sender = info[0]
                let reciever = info[1]
                if (recordsObj.hasOwnProperty(sender) && recordsObj.hasOwnProperty(reciever)) {
                    recordsObj[sender].send += 1
                    recordsObj[reciever].recieved += 1

                    if (recordsObj[sender].send + recordsObj[sender].recieved >= capacity) {
                        delete recordsObj[sender]
                        console.log(`${sender} reached the capacity!`);
                    }

                    if (recordsObj[reciever].recieved + recordsObj[reciever].send >= capacity) {
                        delete recordsObj[reciever]
                        console.log(`${reciever} reached the capacity!`);
                    }
                }
                break;
            case 'Empty':
                let username = info[0]
                if (info[0] === 'All') {
                    for (let key in recordsObj) {
                        delete recordsObj[key]
                    }
                } else if (recordsObj.hasOwnProperty(username)) {
                    delete recordsObj[username]
                }
                break;
        }

        line = inArr.shift()
    }

    let sumUsers = 0
    for (let key in recordsObj) {
        sumUsers++
    }
    console.log(`Users count: ${sumUsers}`);

    for (let user in recordsObj) {
        console.log(`${user} - ${recordsObj[user].recieved + recordsObj[user].send}`);
    }
}
messageManager(["20",
    "Add=Mark=3=9",
    "Add=Berry=5=5",
    "Add=Clark=4=0",
    "Empty=Berry",
    "Add=Blake=9=3",
    "Add=Michael=3=9",
    "Add=Amy=9=9",
    "Message=Blake=Amy",
    "Message=Michael=Amy",
    "Statistics"])

