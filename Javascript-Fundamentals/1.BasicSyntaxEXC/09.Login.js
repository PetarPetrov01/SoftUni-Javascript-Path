function login(arr) {
    let element
    let reversed = ''
    let userName = arr[0]
    let counter = 0
    let flag = false
    for (i = 1; i < arr.length; i++) {
        element = String(arr[i])
        if (flag) {
            break;
        }
        for (j = element.length - 1; j >= 0; j--) {
            reversed += element[j]

        }
        counter++
        if (userName === reversed) {
            console.log(`User ${userName} logged in.`);
        } else if (counter < 4) {
            console.log('Incorrect password. Try again.');
        } else if (counter >= 4) {
            flag = true
            console.log(`User ${userName} blocked!`);
            break;
        }
        reversed = ''
    }
}
login(['sunny','rainy','cloudy','sunny','ynnus'])