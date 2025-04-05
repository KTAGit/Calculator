const buttons = document.querySelectorAll('button');
const display = document.querySelector(".display")

let a = ""
let b = ""
let operator = null
let operatorStatus = 0
let equalPressed = "no"
buttons.forEach(button => {
    button.addEventListener("click", function() {
        if(button.textContent == "AC"){
            clear()
            return
        }
        if(button.className == "negative"){
            console.log("HERE")
            if(operatorStatus > 0){
                button.textContent == "+/-" ?  b = "-" + b : b += button.textContent
                button.textContent == "+/-" ?  display.textContent = "-" + display.textContent : display.textContent += button.textContent
            }
            else{
                button.textContent == "+/-" ?  a = "-" + a : a += button.textContent
                button.textContent == "+/-" ?  display.textContent = "-" + display.textContent : display.textContent += button.textContent
            }
        }
        else if (button.className == "operator"){
            operatorStatus += 1
            if(button.textContent != "="){
                display.textContent += button.textContent
            }
            if(button.textContent == "%"){
                if (operator != null){
                    calculateBeforeOperator()
                }
                operator = percentage
            }
            if(button.textContent == "+"){
                if (operator != null){
                    calculateBeforeOperator()
                }
                operator = add
            }
            if(button.textContent == "-"){
                if (operator != null){
                    calculateBeforeOperator()
                }
                operator = subtract
            }
            if(button.textContent == "x"){
                if (operator != null){
                    calculateBeforeOperator()
                }
                operator = multiply
            }
            if(button.textContent == "/"){
                if (operator != null){
                    calculateBeforeOperator()
                }
                operator = divide
            }
            else if(button.textContent == "="){
                if(a == "" && b =="") {
                    operatorStatus = 0
                    return
                }
                else if(b == ""){
                    return
                }      
                else{
                    calculateBeforeOperator()
                    equalPressed = "yes"
                    b = ""
                    operatorStatus = 0
                    operator = null
                }
                
            }
        }
        else if (operatorStatus == 1){
            if (b != ""){

            }
            else {
                display.textContent = ""
            }
            
            display.textContent += button.textContent
            b += button.textContent
        }
        else if (operatorStatus > 1){
            if (b != ""){

            }
            else {
                display.textContent = ""
            }
            
            display.textContent += button.textContent
            b += button.textContent
        }
        
        else if (operatorStatus < 1){
            if (button.textContent == "="){
                return
            }
            else {
                if(equalPressed == "yes"){
                    clear()
                }
                a += button.textContent
                display.textContent += button.textContent
            }
        }
        console.log(`a = ${a} b = ${b} operator = ${operator}`)
    });
    
});

function clear(){
    display.textContent = ""
    a = ""
    b = ""
    operatorStatus = 0
    operator = null
    equalPressed = "no"
}

function calculateBeforeOperator(){
    let aNum = Number(a)
    let bNum = Number(b)
    //console.log(operate(aNum, bNum, operator))
    display.textContent = operate(aNum, bNum, operator)
    let result = operate(aNum, bNum, operator)
    a = result.toString()
    b = ""
}



function add(numOne, numTwo){
    
    return numOne + numTwo
}

function subtract(numOne, numTwo){
    return numOne - numTwo
}

function multiply(numOne, numTwo){
    return numOne * numTwo
}

function divide(numOne, numTwo){
    if ( Math.floor((numOne / numTwo) * 100) / 100 == "Infinity"){
        return "😏"
    }
    return Math.floor((numOne / numTwo) * 100) / 100
}

function percentage(numOne, numTwo){
    return  numTwo * (numOne / 100)
}

function operate(a, b, operator){    
    
    //console.log(operator)
    return operator(a, b)
}
