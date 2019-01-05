let btn = document.querySelectorAll('button');
let cal = document.querySelector('.calculation');
let res = document.querySelector('.result');

for (let i = 0; i < btn.length; i++) {
    btn[i].addEventListener('click', (e) => {
        if (e.srcElement.getAttribute('data-value') !== '')
            putVal(e.srcElement.getAttribute('data-value'))
    })
}

let result = 0;
res.innerHTML = result;
let value1 = '', value2 = 0;
let operatorStatus = '+';

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
            value1 += a;
            cal.innerHTML += a;
            findResult();
            break;
        case '+':
            operatorStatus = '+';
            cal.innerHTML += ' + '
            res.innerHTML = ' '
            value2 = parseInt(result);
            value1 = ''
            break;
        case '*':
            operatorStatus = '*';
            cal.innerHTML += ' ✕ '
            res.innerHTML = ' '
            value2 = parseInt(result);
            value1 = ''
            break;
        case '/':
            operatorStatus = '/';
            cal.innerHTML += ' ÷ '
            res.innerHTML = ' '
            value2 = parseInt(result);
            value1 = ''
            break;
        case '-':
            operatorStatus = '-';
            cal.innerHTML += ' - '
            res.innerHTML = ' '
            value2 = parseInt(result);
            value1 = ''
            break;
        case '%':
            console.log('%');
            break;
        case '=':
            console.log('=');
            findResult();
            break;
        case 'clear':
            value1 = value1.slice(0, (value1.length - 1));
            cal.innerHTML = cal.innerHTML.trim();
            cal.innerHTML = cal.innerHTML.slice(0, value1.length)
            console.log(cal.innerHTML)
            console.log('value1 = ' + value1 + ' value2 = ' + value2 + ' result = ' + result)
            findResult()
            break;
        case 'clearAll':
            console.log(a);
            operatorStatus = '+'
            cal.innerHTML = ''
            res.innerHTML = ''
            result = 0;
            value2 = 0;
            value1 = ''
            break;
        case 'plusMinus':
            console.log('PlusMinus')
            break;
        case 'root':
            console.log('root');
            break;
        default:
            res.innerHTML += a
            value = res.innerHTML;
    }
}

function findResult() {
    if (value1 !== '' && value2 !== '') {
        let val1 = parseInt(value1);
        let val2 = parseInt(value2);
        switch (operatorStatus) {
            case '+':
                result = val1 + val2;
                res.innerHTML = result;
                break;
            case '*':
                result = val1 * val2;
                res.innerHTML = result;
                break;
            case '-':
                result = val2 - val1;
                res.innerHTML = result;
                break;
            case '/':
                result = val2 / val1;
                res.innerHTML = result;
                break;
        }
    }
    console.log('2 : value1 = ' + value1 + ' value2 = ' + value2 + ' result = ' + result)
}