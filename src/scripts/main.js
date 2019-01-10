let btn = document.querySelectorAll('button');
let cal = document.querySelector('.calculation');
let res = document.querySelector('.result');

for (let i = 0; i < btn.length; i++) {
    btn[i].addEventListener('click', (e) => {
        if (e.srcElement.getAttribute('data-value') !== '')
            putVal(e.srcElement.getAttribute('data-value'))
    })
}

let calculation = ''
let operator = ''
let t = '1234+123';

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
            status();
            doOperation();
            break;
        case '+':
            calculation += ',';
            operator += '+';
            res.innerHTML = ''
            status();
            break;
        case '*':
            calculation += ',';
            operator += '*';
            res.innerHTML = ''
            status();
            break;
        case '/':
            calculation += ',';
            operator += '/';
            res.innerHTML = ''
            status();
            break;
        case '-':
            calculation += ',';
            operator += '-';
            res.innerHTML = ''
            status();
            break;
        case 'clear':
            t = t.length - 1;
            console.log('T : ' + t)
            break;
        case 'clearAll':
            break;
    }
}

function status() {
    console.log('Calculation: ' + calculation + ' Operator: ' + operator)
    let calculationList = calculation.split(',')
    let operatorList = operator.split('')
    let text = ''
    for (let i = 0; i < calculationList.length; i++) {
        text += ' ' + calculationList[i] + ' ' + (operatorList[i] || '')
        console.log(text);
    }
    cal.innerHTML = text;
}

function doOperation() {
    let calculationList = calculation.split(',')
    let operatorList = operator.split('')
    let result = parseInt(calculationList[0]) || 0
    for (let i = 0; i < calculationList.length - 1; i++) {
        let o = operatorList[i]
        switch (o) {
            case '+':
                result += parseInt(calculationList[i + 1]);
                break;
            case '-':
                result -= parseInt(calculationList[i + 1]);
                break;
            case '*':
                result *= parseInt(calculationList[i + 1]);
                break;
            case '/':
                result /= parseInt(calculationList[i + 1]);
        }
        console.log('RES : ' + result)
        res.innerHTML = result;
    }
}
