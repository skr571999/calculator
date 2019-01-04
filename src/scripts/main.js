let btn = document.querySelectorAll('button');
let cal = document.querySelector('.calculation');
let res = document.querySelector('.result');

for (let i = 0; i < btn.length; i++) {
    btn[i].addEventListener('click', (e) => {
        if (e.srcElement.getAttribute('data-value') !== '')
            putVal(e.srcElement.getAttribute('data-value'))
    })
}

let result = '';
let value1, value2;

res.innerHTML = result;

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
            cal.innerHTML += a
            value2 = (cal.innerHTML).split('+')[1]
            console.log(value2)
            doOperation();
            break;
        case '+':
        case '*':
        case '/':
        case '-':
        case '%':
            value1 = cal.innerHTML;
            cal.innerHTML += (' ' + a)
            console.log(value1)
            // cal.innerHTML = value1;
            res.innerHTML = '';
            break;
        case '=':
            console.log('=');
            break;
        case 'clearAll':
            console.log(a);
            cal.innerHTML = ''
            res.innerHTML = ''
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

function doOperation() {
    if (value1 >= 0 && value2 >= 0) {
        value1 = parseInt(value1);
        value2 = parseInt(value2);
        result = value1 + value2;
        res.innerHTML = result;
    }
}