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
            display.textContent += button.textContent 
            if(button.textContent == "+"){
                operator = add
            }
            if(button.textContent == "-"){
                operator = subtract
            }
            if(button.textContent == "*"){
                operator = multiply
            }
            if(button.textContent == "/"){
                operator = divide
            }
            else if(button.textContent == "="){
                if(a == "" && b =="") {
                    
                }else{
                    let aNum = Number(a)
                    let bNum = Number(b)
                    console.log(operator)
                    display.textContent = operate(aNum, bNum, operator)
                    let result = operate(aNum, bNum, operator)
                    a = result.toString()
                    b = ""
                }
                
            }
            else if (operatorStatus > 1){
                let aNum = Number(a)
                let bNum = Number(b)
                console.log(operator)
                display.textContent = operate(aNum, bNum, operator)
                let result = operate(aNum, bNum, operator)
                a = result.toString()
                display.textContent += button.textContent 
                b = ""
                
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
    return numOne / numTwo
}

function operate(a, b, operator){    
    
    //console.log(operator)
    return operator(a, b)
}
