//somar(3)(4)(5)

function somar(numero1) {
    return function (numero2) {
        return function (numero3) {
            return numero1 + numero2 + numero3
        }
    }
    
}


console.log(somar(3)(4)(7))

const resultado1 = somar(3)

const resultado2 = resultado1(4)

const resultadofinal = resultado2(7)

console.log(resultadofinal)


//calcular(3)(7)(fnCalcular)