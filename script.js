
let years, amount, _return

const isValidInput = () => {
    console.log(years, amount, _return)
    return !(years < 1 || years > 30 || isNaN(years)|| amount < 1 || isNaN(amount) || _return < 0.01 || _return > 100 || isNaN(_return));
}

const showInvalidInputField = () => {
    alert('Input is Invalid!')
}

//returns obj 
const calculateData = () => {

    const data = [], memo = []

    const return_percent = _return / 100

    memo.push(amount + amount * return_percent)

    for(let i = 1; i < years; i ++)
        memo.push(memo[i - 1] + memo[i - 1] * return_percent)

    for(let i = 0; i < years; i ++){

        if(i === 0){
            data[i] = memo[i]
            continue
        }

        data[i] = 0
        for(let j = 0; j <= i; j ++){
            data[i] += memo[j]
        }

    }

    console.log('data', data)

    return data
}

const createTableEl = (id, year, __return) => {
    
    const span1 = document.createElement('span')
    span1.textContent = year
    
    const span2 = document.createElement('span')
    span2.textContent = __return

    const el1 = document.createElement('div')
    const el2 = document.createElement('div')

    el1.classList.add('table-el')
    el1.appendChild(span1)

    el2.classList.add('table-el')
    el2.appendChild(span2)
    
    const col = document.createElement('div')
    col.classList.add('col')
    col.id = `col-${id}`

    col.appendChild(el1)
    col.appendChild(el2)

    return col
}

const fillTable = (data) => {

    const table_cnt = document.getElementById('output-table')

    while(table_cnt.childElementCount)
        table_cnt.removeChild(table_cnt.lastChild)

    table_cnt.appendChild(createTableEl(-1, 'YEAR', 'RETURN'))

    data.forEach((value, index) => {
        table_cnt.appendChild(createTableEl(index + 1, index + 1, value.toFixed(2)))
    })

}

const fillOtherFields = (data) => {

    document.getElementById('total-field').textContent = (data[data.length - 1] - (amount * years)).toFixed(2)
    document.getElementById('avg-yearly-field').textContent = ((data[data.length - 1] / years).toFixed(2)  - amount).toFixed(2)

}

const startCalc = () => {
    console.log('starting calculation')

    years = parseInt(document.getElementById('years-input').value);
    amount = parseFloat(document.getElementById('amount-input').value);
    _return = parseFloat(document.getElementById('return-input').value);

    document.getElementById('years-input').value = ''
    document.getElementById('amount-input').value = ''
    document.getElementById('return-input').value = ''

    if(!isValidInput()){
        showInvalidInputField();
        return;
    }

    console.log('input validated')

    const data = calculateData()

    fillTable(data)
    fillOtherFields(data)

    document.getElementById('output').style.display = 'flex'
    
}

document.getElementById('calculate-btn').addEventListener('click', startCalc);