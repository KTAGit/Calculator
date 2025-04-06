const buttons = document.querySelectorAll('button');
const display = document.querySelector(".display")

let a = ""
let b = ""
let operator = null
let operatorStatus = 0
let equalPressed = "no"
let negativeBtn = "off"
buttons.forEach(button => {
    button.addEventListener("click", function() {
        if(button.textContent == "AC"){
            clear()
            return
        }
        if(button.className == "negative"){
            if(negativeBtn == "off"){
                if(display.textContent.includes("-") || display.textContent.includes("🤔") || display.textContent == ""){
                    return 
                }
                if(operatorStatus > 0){
                    button.textContent == "+/-" ?  b = "-" + b : b += button.textContent
                    button.textContent == "+/-" ?  display.textContent = "-" + display.textContent : display.textContent += button.textContent
                    negativeBtn = "on"
                }
                else{
                    button.textContent == "+/-" ?  a = "-" + a : a += button.textContent
                    button.textContent == "+/-" ?  display.textContent = "-" + display.textContent : display.textContent += button.textContent
                    negativeBtn = "on"
                }
            }
            else if(display.textContent.includes("-")){
                negativeBtn = "off"
                display.textContent = display.textContent.replace("-", "")
                if(operatorStatus > 0){
                    b = b.replace("-", "")
                    
                }
                else{
                    a = a.replace("-", "")
                }
            }else {
                
                return
            }
            
        }
        else if (button.className == "operator"){
            operatorStatus += 1
            negativeBtn = "off"
            if(display.textContent.includes("🤔")){
                return
            }
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
    negativeBtn = "off"
}

function calculateBeforeOperator(){
    let aNum = Number(a)
    let bNum = Number(b)
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
    if ( Math.floor((numOne / numTwo) * 100) / 100 == "Infinity" || Math.floor((numOne / numTwo) * 100) / 100 == "-Infinity"){
        return "🤔"
    }
    return Math.floor((numOne / numTwo) * 100) / 100
}

function percentage(numOne, numTwo){
    return  numTwo * (numOne / 100)
}

function operate(a, b, operator){    
    
    return operator(a, b)
}
