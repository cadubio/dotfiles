// Função retornando função
// Desafio 1. somar(3)(4)(5)

// A função `somar` retorna uma função (anônima) que retorna outra função (anônima)
// Cada uma das 3 funcões recebe/armazeza um número como parâmetro,
// a última função além de receber o parâmetro realiza a soma dos parâmetros recebidos.
function somar(numero1) {
    return function (numero2) {
        return function (numero3) {
            return numero1 + numero2 + numero3
        }
    }
    
}

// Pode-se chamar a função de duas formas:

// 1. Como a função somar retorna funções, pode-se passar os parâmetros de cada uma
// das funções de forma aninhada. 
console.log(somar(3)(4)(7))

// 2 . Ou pode-se armazenar os retornos de cada de cada uma das funções, que no caso, os retornos
// são funções menos a última que retorna a soma dos parâmetros.

const resultado1 = somar(3)

const resultado2 = resultado1(4)

const resultadofinal = resultado2(7)

console.log(resultadofinal)


//Desafio 2. calcular(3)(7)(fnCalcular)

function calcular(numero1) {
    return function(numero2) {
        return function(operacao) {
            switch (operacao) {
                case '+':
                    return numero1 + numero2
                    break;
                case '-':
                    return numero1 - numero2
                    break;
                case '*':
                    return numero1 * numero2
                    break;
                case '/':
                    return numero1 / numero2
                    break;
            
                default:
                    console.log("Operador não reconhecido")
                    break;
            }
        }

    }
}

console.log(calcular(4)(2)("+"))