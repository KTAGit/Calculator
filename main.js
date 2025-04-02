let a = 20
let b = 25
let operator = subtract

function add(){
    return a + b
}

function subtract(){
    return a - b
}

function multiply(){
    return a * b
}

function divide(){
    return a / b
}

function operate(a, b, operator){
    console.log(operator(a, b))
}

operate(a, b, operator)