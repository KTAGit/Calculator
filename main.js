const buttons = document.querySelectorAll('button');
const display = document.querySelector(".display")

let a = ""
let b = ""
let operator = null
let operatorStatus = 0
let equalPressed = "no"
let negativeBtn = "off"
let decimalCounter = 0
let lastChar = null
buttons.forEach(button => {
    button.addEventListener("click", function() {
        let characterLength = display.textContent.length
        if(button.textContent == "AC"){
            clear()
            return
        }
        if((display.textContent === "") && button.textContent === "0"){
            return;
        }
        if(characterLength == 9){
            if(button.className != "operator"){
                opPressed = lastChar
                if(opPressed == "+" || opPressed == "-" || opPressed == "x" || opPressed == "/" || opPressed == "%"){
                }
                else{
                    return
                }
            }
        }
        if (button.textContent == "."){
            if(display.textContent == ""){
                display.textContent = "0."
                if(operatorStatus > 0){
                    b = "0."
                }
                else{
                    a = "0."
                }
            }
            if(display.textContent.includes(".")){
                return
            }
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
            opPressed = lastChar
            if(opPressed == "+" || opPressed == "-" || opPressed == "x" || opPressed == "/" || opPressed == "%"){
                return
            }
            if(display.textContent.includes("🤔") || display.textContent == ""){
                a = ""
                return
            }
            operatorStatus += 1
            negativeBtn = "off"
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
        lastChar = display.textContent.slice(-1)
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
    
    display.textContent = scaleDown(operate(aNum, bNum, operator))
    let result = operate(aNum, bNum, operator)
    a = result.toString()
    b = ""
}

function scaleDown(num){
    str = num.toString()
    length = str.length
    if(length > 9){
        return num.toExponential(4)
    }
    return num
}

function add(numOne, numTwo){
    
    return Math.floor((numOne + numTwo) * 100) / 100
}

function subtract(numOne, numTwo){
    return Math.floor((numOne - numTwo) * 100) / 100
}

function multiply(numOne, numTwo){
    return Math.floor((numOne * numTwo) * 100) / 100
}

function divide(numOne, numTwo){
    let result = Math.floor((numOne / numTwo) * 100) / 100
    if ( !isFinite(result) ){
        return "🤔"
    }
    else{
        return Math.floor((numOne / numTwo) * 100) / 100
    }
}

function percentage(numOne, numTwo){
    return  Math.floor((numTwo * (numOne / 100)) * 100) / 100 
}

function operate(a, b, operator){    
    
    return operator(a, b)
}
