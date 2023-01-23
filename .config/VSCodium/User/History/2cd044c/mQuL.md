Academia do Flutter 2.0 - Funções e Coleções
================

* [Funções](#funções)
* [Parâmetros das funções](#parâmetros-das-funções)
   * [Tipos de parâmetros](#tipos-de-parâmetros)
      * [Parâmetros obrigatórios por padrão (<em>default</em>)](#parâmetros-obrigatórios-por-padrão-default)
      * [Parâmetros nomeados](#parâmetros-nomeados)
      * [Parâmetros nomeados obrigatórios](#parâmetros-nomeados-obrigatórios)
      * [Parâmetros com valor padrão](#parâmetros-com-valor-padrão)
      * [Parâmetros opcionais](#parâmetros-opcionais)
* [Funções <em>Arrow</em>, Anônima e <em>typedef</em>](#funções-arrow-anônima-e-typedef)
   * [Função <em>Arrow</em>](#função-arrow)
   * [Função anônima](#função-anônima)
   * [<em>typedef</em>](#typedef)
* [Coleções](#coleções)
   * [Métodos iterable de Listas.](#métodos-iterable-de-listas)
* [Referência de memória](#referência-de-memória)
* [<em>Sets</em>](#sets)
* [<em>Maps</em>](#maps)
* [<em>Exceptions</em>](#exceptions)
* [<em>Import</em>](#import)
* [<em>Enums</em>](#enums)
* [Desafio](#desafio)
   * [Resposta ao desafio](#resposta-ao-desafio)

<small>Índice criado com <a href="https://github.com/ekalinin/github-markdown-toc" target="_blank">gh-md-toc</a></small>

# Funções
Funções de nível superior: não estão no escopo de uma classe (`class`), como exemplo a função `main`. 

Quando estão no escopo de uma classe são denominadas *métodos*.

``` dart
void main() {

}
```
onde,  
1. `void` --> tipo de retorno da função (no caso a função não retorna nada).
2. `main` --> nome da função.
3. `()` --> parâmetros da função.
4. `{}` --> corpo da função.

Todas funções possuem estas quatro partes.

Por exemplo, a função `somaInteiros()`:

``` dart
void main() {
  print(somaInteiros(10, 20));
}

int somaInteiros(int numero1, int numero2) {
  print('Executando a soma de $numero1 mais $numero2');
  return numero1 + numero2;
}
```
A função `somaInteiros()` é chamada dentro da função `main()`. ([funcoes.dart](./lib/funcoes.dart))

1. O retorno é do tipo `int`
2. O nome é `somaInteiro`
3. Tem dois parâmetros, `numero1` e `numero2`, ambos do tipo `int`
4. O corpo imprime uma mensagem e retorna o valor das soma.

``` dart:dart_funcoes_colecoes/lib/funcoes.dart

```

# Parâmetros das funções

## Tipos de parâmetros

### Parâmetros obrigatórios por padrão (*default*)
A função `somaInteiros`, vista anteriormente, é um exemplo de parâmetros obrigatórios.

![Parâmetros obrigatórios](../images/parametros_obrigatorios.png "Parâmetros obrigatórios")

### Parâmetros nomeados
Usa-se as chaves `{ }` para definir um parâmetro como nomeado.

- Parâmetros nomeados são nulos por padrão. Por isso deve-se usar o operador `?` (*null aware*) ao definí-los.
- Podem ser promovidos para não nulo por checagem lógica.
- Podem ser passados em qualquer ordem.

Exemplo ([parametros.dart](./lib/parametros.dart))
```dart
void main() {
  print(somaDecimais(numero2: 3.3, numero1: 2.1));
}

double somaDecimais({double? numero1, double numero2}) {

  if(numero1 != null && numero2 != null) {
    return numero1 + numero2;
  }

  return 0.0;
}
```

### Parâmetros nomeados obrigatórios

- Usa-se a <a href="https://dart.dev/guides/language/language-tour#keywords" target="_blank">palavra reservada</a> `required` para tornar um parâmetro nomeado como obrigatório.
- Como são obrigatórios não são nulos por padrão.
- Podem ser passados em qualquer ordem.

Exemplo ([parametros.dart](./lib/parametros.dart))

``` dart
double somaDecimais2({required double numero1, required double numero2}) {
  print('A soma de $numero1 mais $numero2 é');
  return numero1 + numero2;
}
```

### Parâmetros com valor padrão

``` dart
double somaDecimais2({double numero1 = 0, double numero2 = 0}) {
  print('A soma de $numero1 mais $numero2 é');
  return numero1 + numero2;
}
```

### Parâmetros opcionais
Usa-se os colchetes `[ ]` para definir parâmetros opcionais.

- São nulos por padrão e por isso devem ter um valor padrão ou se usar o *null aware*.


Exemplo ([parametros.dart](./lib/parametros.dart))

``` dart
int somaInteiros([int numero1 = 0, int numero2 = 0]) {
  print('Executando a soma de $numero1 mais $numero2');
  return numero1 + numero2;
}
```

Os parâmetros podem ser combinados:

```dart 
// Obrigatorio + nomeado com valor valor padrão
  void misturaParametros(int numero, String nome, {int idade = 0, String sobrenome = ''}) {}
// Obrigatorio + nomeado obrigatório
  void misturaParametros1(int numero, String nome, {required int idade, required String sobrenome}) {}
// Obrigatorio + opcional
  void misturaParametros2(int numero, String nome, [int? idade, String? sobrenome]) {}
// Obrigatorio + opcional com valor padrão
  void misturaParametros3(int numero, String nome, [int idade = 0, String sobrenome = '']) {}

``` 
# Funções *Arrow*, Anônima e *typedef*

## Função *Arrow*

Funções de uma linha podem ser escritas na forma de seta (*arrow*). São usadas para "coisas" pequenas.

Exemplo ([arrow_anonima_typedef.dart](./lib/arrow_anonima_typedef.dart))

```dart 
int somaInteiros(int numero1, int numero2) => numero1 + numero2;
```
## Função anônima
É uma função sem nome.  
Exemplo ([arrow_anonima_typedef.dart](./lib/arrow_anonima_typedef.dart))


Ela é chamada assim que escrita, não é possível fazer uma chamada a ela (afinal ela não tem nome!) e por isso precisa estar em um escopo que será chamado, como no caso da função `main` que é chamada ao se rodar compilar o programa em `DART`.

A chamada a uma função qualquer é feita com o nome da variável e os parâmetros, por exemplo, `somaInteiros();`. Se se coloca `somaInteiros;` o compilador não reclama mas a função não é chamada.

A função anônima pode estar associada a uma variável, neste caso ela é denominada `closure`.


Exemplo ([arrow_anonima_typedef.dart](./lib/arrow_anonima_typedef.dart))

``` dart
void main() {
   var funcaoQualquer = () {
    print("---- Chamou a função da variável -----");
    return 2000; 
  };

  print(funcaoQualquer());
}
```

Funções anônimas também são invocadas como como parêmetros de funções normais.

Exemplo ([arrow_anonima_typedef.dart](./lib/arrow_anonima_typedef.dart))

``` dart
void chamarUmaFuncaoDeUmParametros(Function(String nome) funcaoQueRecebeONome) {
  var calculo = 1 + 1;
  var nomecompleto = 'Carlos Siqueira';
  print('finalizandoo a função chamarUmaFuncaoDeUmParametros');
  print('invocando funcaoQueRecebeONome');
  funcaoQueRecebeONome(nomecompleto);
}
``` 

## *typedef*

Funciona como um apelido para uma função.

Exemplo ([arrow_anonima_typedef.dart](./lib/arrow_anonima_typedef.dart))

``` dart
typedef FuncaoQueRecebeNome = void Function(String nome);
```
Pode-se então substituir o parâmetro da função pelo `typedef`:

``` dart
void chamarUmaFuncaoDeUmParametros(FuncaoQueRecebeNome funcaoQueRecebeONome) {
  var calculo = 1 + 1;
  var nomecompleto = 'Carlos Siqueira';
  print('finalizandoo a função chamarUmaFuncaoDeUmParametros');
  print('invocando funcaoQueRecebeONome');
  funcaoQueRecebeONome(nomecompleto);
}
``` 

# Coleções

Uma coleção é um objeto que representa um grupo de objetos, que são chamados de elementos. *Iterables* são um tipo de coleção.

## Métodos `iterable` de Listas.

[*dart.dev/Iterable collections*](https://dart.dev/codelabs/iterables)

Ver [listas.dart](./lib/listas.dart)

> NOTA:
> Muita atenção!! Pois alguns métodos, como por exemplo `.sort`, fazem sua ação na própria lista. Para não bagunçar, pode-se duplicar (evitar a *Referência a memória*) a lista original.

# Referência de memória

Alguns métodos alteram os objetos *on the fly*. 
Cuidado com os métodos de alteração que retornam `void`, como por exemplo, alguns métodos de

`List.sort`  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`.clear`  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`.add`  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`.addAll`  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; etc.  

``` dart:lib/listas.dart

``` 

# *Sets*
`Set` é como uma lista, mas não permite itens duplicados.

Por exemplo, 

``` dart
final lista = [4, 7, 9, 33, 74, 7, 236, 33, 4, 2];

final listaDistinta = lista.toSet();

print(lista);
print(listaDistinta);
```
A coersão da lista `[4, 7, 9, 33, 74, 7, 236, 33, 4, 2]` em um `Set`, resultaria:
`{4, 7, 9, 33, 74, 236, 2}`. Note que o retorno é envolto entre chaves, indicando um `Set`.

Ver [sets.dart](./lib/sets.dart)

Alguns métodos para lidar com valores `Sets` (também servem para `List`)

``` dart:lib/sets.dart
  var numeros2 = {5, 6, 7, 8};
  var numeros3 = {5, 6, 8, 9, 10};

  print('Método .difference');
  print(numeros2.difference(numeros3));

  print('Método .union');
  print(numeros2.union(numeros3));

  print('Método .intersection');
  print(numeros2.intersection(numeros3));
``` 
Um método eficiente para classificar listas (ou sets) é o `.compareTo`.

``` dart
final pessoas = [
    'Jose|56|Masculino',
    'Joaquim|84|Masculino',
    'Rodrigo|35|Masculino',
    ];

// Classifica a lista por ordem crescente de idade
  pessoas.sort((pessoa1, pessoa2) {
    final separaDadosPessoa1 = pessoa1.split('|');
    final separaDadosPessoa2 = pessoa2.split('|');

    final idadePessoa1 = int.parse(separaDadosPessoa1[1]);
    final idadePessoa2 = int.parse(separaDadosPessoa2[1]);

    return idadePessoa1.compareTo(idadePessoa2);
  });
  
  print(pessoas);
```

# *Maps*

# *Exceptions*

# *Import*

# *Enums*

# Desafio

## Resposta ao desafio



