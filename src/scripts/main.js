let btn = document.querySelectorAll('button');
let cal = document.querySelector('.calculation');
let res = document.querySelector('.result');

let calculation = ''
let operator = ''
let operatorStatus = true

for (let i = 0; i < btn.length; i++) {
    btn[i].addEventListener('click', (e) => {
        if (e.target.getAttribute('data-value') !== '')
            putVal(e.target.getAttribute('data-value'))
    })
}

function putVal(a) {
    switch (a) {
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
        case '0':
            calculation += a;
            operatorStatus = false;
            doOperation();
            updateHtml();
            break;
        case '+':
        case '*':
        case '/':
        case '-':
            if (operatorStatus === false) {
                calculation += ',';
                operator += a;
                res.innerHTML = ''
                updateHtml();
                operatorStatus = true;
            } else {
                alert('Invalid Operation')
            }
            break;
        case 'Backspace':
            if (calculation[calculation.length - 1] === ',') {
                operator = operator.trim().slice(0, (operator.length - 1))
            }
            calculation = calculation.trim().slice(0, (calculation.length - 1))
            if (calculation[calculation.length - 1] === ',') {
                operatorStatus = true;
            } else {
                operatorStatus = false;
            }
            doOperation();
            updateHtml();
            break;
        case 'clearAll':
            calculation = ''
            operator = ''
            doOperation();
            updateHtml();
            operatorStatus = true;
            break;
    }
}

function updateHtml() {
    let calculationList = calculation.split(',')
    let operatorList = operator.split('')
    let text = ''
    for (let i = 0; i < calculationList.length; i++) {
        text += ' ' + calculationList[i] + ' ' + (operatorList[i] || '')
    }
    cal.innerHTML = text;
}

function doOperation() {
    let calculationList = calculation.split(',')
    let operatorList = operator.split('')
    let result = parseInt(calculationList[0]) || ''
    for (let i = 0; i < calculationList.length - 1; i++) {
        let o = operatorList[i]
        switch (o) {
            case '+':
                result += parseInt(calculationList[i + 1]) || 0;
                break;
            case '-':
                result -= parseInt(calculationList[i + 1]) || 0;
                break;
            case '*':
                result *= parseInt(calculationList[i + 1]);
                break;
            case '/':
                result /= parseInt(calculationList[i + 1]);
        }
        res.innerHTML = result;
    }
    if (calculationList[calculationList.length - 1] === '') {
        res.innerHTML = ''
    }
    if (calculationList.length <= 1) {
        res.innerHTML = result;
    }
}
