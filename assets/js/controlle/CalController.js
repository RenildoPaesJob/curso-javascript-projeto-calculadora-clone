class CalcController {

    constructor() {
        this._locale = 'pt-BR'
        this._displayCalcEL = document.querySelector('#display')
        this._dateEl = document.querySelector('#data')
        this._timeEL = document.querySelector('#hora')
        this._operation = []
        this._currentDate
        this.initialize()
        this.initButtonsEvents()
    }

    initialize() {
        this.setDisplayDateTime()

        setInterval(() => {
            this.setDisplayDateTime()
        }, 1000)
    }

    setDisplayDateTime() {
        this.displayDate = this.currentDate.toLocaleDateString(this._locale, {
            day: "2-digit",
            month: 'long',
            year: 'numeric'
        })
        this.displayTime = this.currentDate.toLocaleTimeString(this._locale)
    }

    addEventListenerAll(element, events, fn) {
        events.split(' ').forEach(event => {
            element.addEventListener(event, fn, false);
        })
    }

    clearAll() {
        this._operation = []
    }

    clearEntry() {
        this._operation.pop() //ELEMINA O ULTIMO VALOR DO ARRAY
    }

    getLastOperation() {
        return this._operation[this._operation.length - 1]
    }

    isOperator(value) {
        //INDEXOF => BUSCA DENTRO DO ARRAY O VALOR RECEBIDO, E RETORNA O 'INDEX' DESSE VALOR
        //CASO NÃO ENCONTRE ELE RETORNA -1
        return (['+', '-', '*', '%', '/'].indexOf(value) > -1)
    }

    setLastOperation(value) {
        this._operation[this._operation.length - 1] = value
    }

    addOperation(value) {

        // console.log(isNaN(this.getLastOperation()));

        if (isNaN(this.getLastOperation())) { //SE ULTIMO VALOR INSERIDO NO ARRAY NÃO FOR UM NUMERO/NUMBER CAI NESSA CONDIÇÃO

            //SE FOR STRING...
            if (this.isOperator(value)) { //SE O ULTIMO VALOR DO ARRAY FOR UM OPERADOR, TEM Q TROCAR O OPERADOR PELO O NOVO DIGITADO

                setLastOperation(value)

            } else if (isNaN(value)) {

                //SE NÃO FOR  NUMERO FAZ OUTRA COISA
                console.log(value);

            } else {
                this._operation.push(value) //INSERE UM VALOR NO FINAL DO ARRAY
            }

        } else { //SE O ULTIMO VALOR INSERIDO NO ARRAY FOR NUMERO CAI NESSA

            if (this.isOperator(value)) {

                this._operation.push(value)

            } else {

            }

            let newValue = this.getLastOperation().toString() + value.toString()
            this.setLastOperation(parseInt(newValue))

        }

        console.log(this._operation);
    }

    setError() {
        this.displayCalc = 'ERROR'
    }

    execBtn(value) {
        switch (value) {

            case 'ac':
                this.clearAll()
                break;

            case 'ce':
                this.clearEntry()
                break;

            case 'soma':
                this.addOperation('+')
                break;

            case 'subtracao':
                this.addOperation('-')
                break;

            case 'porcento':
                this.addOperation('%')
                break;

            case 'igual':

                break;

            case 'ponto':
                this.addOperation('.')
                break;

            case 'multiplicacao':
                this.addOperation('*')
                break;

            case 'divisao':
                this.addOperation('/')
                break;

            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                this.addOperation(parseInt(value));
                break;

            default:
                this.setError()
                break;
        }
    }

    initButtonsEvents() {
        let buttons = document.querySelectorAll('#buttons > g, #parts > g')

        buttons.forEach((btn, index) => {
            this.addEventListenerAll(btn, 'click drag', e => {

                let textBtn = btn.className.baseVal.replace('btn-', '');

                this.execBtn(textBtn)
            })

            this.addEventListenerAll(btn, 'mouseover mouseup mousedown', e => {
                btn.style.cursor = 'pointer'
            })
        })
    }

    get displayTime() {
        return this._timeEL.innerHTML
    }

    set displayTime(value) {
        return this._timeEL.innerHTML = value
    }

    get displayDate() {
        return this._dateEl.innerHTML
    }

    set displayDate(value) {
        return this._dateEl.innerHTML = value
    }

    get displayCalc() {
        return this._displayCalcEl.innerHTML
    }

    set displayCalc(value) {
        this._displayCalcEl.innerHTML = value
    }

    get currentDate() {
        return new Date()
    }

    set currentDate(value) {
        this._currentDate = value
    }
}