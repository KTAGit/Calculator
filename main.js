const buttons = document.querySelectorAll('button');
const display = document.querySelector(".display")

let a = ""
let b = ""
let operator = null
let operatorStatus = 0
buttons.forEach(button => {
    button.addEventListener("click", function() {
        if(button.textContent == "AC"){
            display.textContent = ""
            a = ""
            b = ""
            operatorStatus = 0
            operator = null
        }
        else if (button.className == "operator"){
            operatorStatus += 1
            if(button.textContent != "="){
                display.textContent += button.textContent
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
            if(button.textContent == "*"){
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
                if(a == "" && b =="" || b == "") {
                    operatorStatus = 0
                    return
                }else{
                    calculateBeforeOperator()
                }
                
            }
            else if (operatorStatus > 1){
                calculateBeforeOperator()
            }
            

        }
        else if (operatorStatus == 1){
            display.textContent += button.textContent 
            b += button.textContent
        }
        else if (operatorStatus > 1){
            
            display.textContent += button.textContent 
            b += button.textContent
        }
        
        else if (operatorStatus < 1){
            if (button.textContent == "="){

            }
            else {
                a += button.textContent
                display.textContent += button.textContent
            }
        }
        console.log(`a = ${a} b = ${b} operator = ${operator}`)
    });
    
});

function calculateBeforeOperator(){
    let aNum = Number(a)
    let bNum = Number(b)
    console.log(operator)
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

function operate(a, b, operator){    
    
    //console.log(operator)
    return operator(a, b)
}
