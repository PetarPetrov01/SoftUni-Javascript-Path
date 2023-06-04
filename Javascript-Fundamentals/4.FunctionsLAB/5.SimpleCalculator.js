function calculator(numOne, numTwo, operator) {
    let result = () => {
        switch (operator) {
            case 'multiply':
                console.log(numOne * numTwo);
                break;
            case 'divide':
                console.log(numOne / numTwo);
                break;
            case 'add':
                console.log(numOne + numTwo);
                break;
            case 'subtract':
                console.log(numOne - numTwo);
                break;
        }
    }
    result()
}

calculator(8, 2, 'divide');