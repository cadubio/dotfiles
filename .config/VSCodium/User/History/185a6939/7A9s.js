//somar(3)(4)(5)

function somar(numero1) {
    return function (numero2) {
        return function (numero3) {
            return console.log(numero1 + numero2 + numero3)
        }
    }
    
}

somar(3)(4)(5)

//calcular(3)(7)(fnCalcular)