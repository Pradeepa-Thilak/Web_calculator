let dis = '0';
let result = '0';

function updateDisplay(){
    document.getElementById('display').textContent = dis;
    document.getElementById('resultDisplay').textContent = result;
}

function clearDisplay(){
    dis = '0';
    result = '0';
    updateDisplay();
}

function appendNumber(number){
    if(dis==='0'){
        dis = number;
    }
    else{
        dis += number;
    }
    calculateResult();
    updateDisplay();
}

function appendOperator(operator){
    if(!isNaN(dis.slice(-1))){
        dis += operator;
    }
    updateDisplay();
}

function appendDecimal(){
    const parts = dis.split(/[\+\-\*\/]/);
    const current = parts[parts.length - 1];
    if(!current.includes('.')){
        dis += '.';
        updateDisplay();
    }
}
function backspace(){
    dis = dis.slice(0,-1) || '0';
    calculateResult();
    updateDisplay();
}

function calculateResult(){
    const isValid = /^[0-9+\-*/.()]+$/.test(dis);
    if(isValid){
        try{
            result = Function(`"use strict"; return (${dis})`)();
            result = parseFloat(result.toFixed(10)).toString();
        }catch{
            result = 'Error';
        }
    }else{
        result='Error';
    }
}

function calculate(){
    calculateResult();
    dis = result;
    result = '0';
    updateDisplay();
}