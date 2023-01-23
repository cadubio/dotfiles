// Função retornando função
//somar(3)(4)(5)

// A função `somar` retorna uma função que retorna outra função
// Cada uma das 3 funcões recebe/armazeza um número como parâmetro,
// a última função além de receber 
function somar(numero1) {
    return function (numero2) {
        return function (numero3) {
            return numero1 + numero2 + numero3
        }
    }
    
}

//
console.log(somar(3)(4)(7))


const resultado1 = somar(3)

const resultado2 = resultado1(4)

const resultadofinal = resultado2(7)

console.log(resultadofinal)


//calcular(3)(7)(fnCalcular)