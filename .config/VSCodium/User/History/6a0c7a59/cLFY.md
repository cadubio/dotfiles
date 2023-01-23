Academia do Flutter 2.0 - Dart POO (Programação Orientada a Objeto)
================

# Fundamentos

## Abstração

De um modo grosseiro pode-se dizer que a **abstração** é uma forma de **simplificar** o mundo real. 
Se tomarmos como exemplo uma cadeira...

No mundo real existem diversos tipos de cadeiras, mas podemos abstrair, ou criar um modelo universal, onde pra ser uma cadeira é necessário que se tenha um assento, um encosto, sustentados por 4 (três também dá?) apóios ou pés. Abstraímos um "conceito" de cadeira.

## Encapsulamento​​

O exemplo de encapsulamento da aula do curso é muito legal!!!

No youtube tem alguns (não tão legais!) que vale assistir:

[DevMedia](https://www.youtube.com/watch?v=vkLEVgPGcyo)

[Cod3r](https://www.youtube.com/watch?v=s1oko_DmbZI)



Algumas Referências

[hellowww.wordpress.com/Afinal o que é Abstração?](https://hellowww.wordpress.com/2010/02/01/afinal-o-que-e-abstracao/) acesso em 11.4.2022

[bosontreinamentos.com.br/Conceitos de Programação Orientada a Objetos](http://www.bosontreinamentos.com.br/analise-de-sistemas/conceitos-de-programacao-orientada-a-objetos/) acesso em 11.4.2022

[contembits.com.br/Abstração](http://contembits.com.br/minicursos/poo/Abstracao.aspx) acesso em 11.4.2022

# Classes

A classes representam uma estrutura do mundo real.

Para se criar uma classe usa-se a palavra reservada `class`. As classes possuem **características** e **comportamentos**.

Exemplo de classe

``` dart
class Camiseta {
    String? tamanho; // Atributo
    String? cor; // Atributo
    String? marca; // Atributo

}
``` 
Uma classe se torna um objeto a partir do momento que se **instanciar** a classe. 

Variáveis dentro de uma classe são chamadas de **atributos** (são as características). Os **atributos** podem ser de **instância** ou de **classe**.

Exemplo de classe instanciada e seus atributos de instância

``` dart
var ClasseInstanciada = Camiseta() {
    Camiseta.tamanho = 'G'; // Atributo de instância
    Camiseta.cor = 'Preta'; // Atributo de instância
}
```

## Modificador de tipo

Atributos de classe são acessives somente dentro da classe. 

Funções dentro de classes são chamadas de **métodos**. Os métodos também podem ser de **instância** ou de **classe**.

Exemplo

``` dart
class Camiseta {
    String? tamanho; // Atributo
    String? cor; // Atributo
    String? marca; // Atributo

    String tipoDeLavagem() {
        if(marca == 'Nike') {
            return 'Não pode lavar';
        } else {
            return 'Pode lavar';
        }
    }
}
```

Atributos e métodos de classe são definidos através do modificar de tipo [`static`](https://dart.dev/guides/language/language-tour#keywords). Uma vez definidos seus valores são os mesmos para toda a aplicação, por isso na definição de métodos e atributos de classe deve-se, preferencialmente, defini-los como `const`.



## Modificadores de acesso

### *Puclic*
São acessíveis em todos os contextos.

### *Private*

Para definir uma classe, método ou atributo privado utiliza-se o `_`. Exemplo `String? _cor`.

#### Métodos de acesso a atributos privados

Para acessar atributos privados usa-se os métodos *getter* e *setter*.

Exemplo
``` dart
class Camiseta {
    String? tamanho; // Atributo público
    String? _cor; // Atributo privado
    String? marca; // Atributo público

// Encapsulando o atributo _cor
    String? get cor => _cor;
    set cor(String? cor) {
        if(cor == 'Verde') {
            throw Exception('Não pode ser verde´);
        }
    }
}
```
# Construtores 

Os Construtores​ são os responsáveis por criar objetos em memória, ou seja, instanciar uma classe que foi definida, permitindo criar diferentes instâncias de uma classe. Podemos especificar quais os parâmetros que a classe deve ter quando está sendo instanciada e ocultar uma lógica nessa inicialização.

## Construtor padrão

``` dart
class Carro{

String? cor;
double? preco;
String? modelo;
bool TemABS;

/* CONSTRUTOR PADRÃO */
// É criado automaticamente pelo dart, não é preciso defini-lo
Carro(){

}

/* CONSTRUTOR COM PARÂMETROS */
Carro(String cor, String modelo, double preco){
    cor = cor;
    modelo = modelo;
    preco = preco;
}
}
```
[construtores.dart](./lib/construtores.dart)

O `dart` possui uma sintaxe mais simples (*syntactic sugar*) para inicializar os parâmetros da classe.

``` dart
/* CONSTRUTOR COM PARÂMETROS */
// Sintaxe para simplificar a atribuição dos parâmetros da classe
class Carro{

String? cor;
double? preco;
String? modelo;
bool temABS;

Carro(this.cor, this.modelo, this.preco, this.temABS);
}
```
[construtores.dart](./lib/construtores.dart)

## Construtor nomeado

```dart
/* CONSTRUTOR NOMEADO */
class Carro{

String? cor;
double? preco;
String? modelo;
bool temABS;

  Carro.semABS(this.cor, this.modelo, this.preco);

  Carro.vazio();
}
```
[construtores.dart](./lib/construtores.dart)

## Construtor *factory*

É utilizado quando queremos fazer uma regra de negócio antes de instanciar uma classe.

``` dart
/* CONSTRUTOR FABRICADO (FACTORY) */
  factory Carro.fabricado(String novoModelo) {
    var modelo = novoModelo + '_teste';

    var carro = Carro.vazio();

    carro.modelo = modelo;

    return carro;
  }
```
[construtores.dart](./lib/construtores.dart)

## Referências
[Construtores em Java: Primeiros Passos](https://www.devmedia.com.br/construtores-em-java-primeiros-passos/28618)

[Constructors in Dart – Use Cases and Examples](https://www.freecodecamp.org/news/constructors-in-dart/)

## Inicializadores​

O `dart` inicializa os atributos da classe antes de inicializar os construtores, dai não ser possível se definir um atributo privado (`_`) como `final`, como no exemplo:

![](../images/atributo_nao_permitido_contrututor.png)

Quando um atributo está no corpo do construtor a classe já foi inicializada, como no caso dos parametros `id` e `preco` do construtor `Produto`, no exemplo anterior.

Para contornar essa particularidade, o `dart` possui o operador dois-pontos (`:`), que deve ser usado para se inicializar os atributos de uma classe, conforme o exemplo a seguir:

![](../images/atributo_permitido_contrututor.png)

> NOTA: Qualquer coisa que seja colocada no lado direito dos dois pontos (`:`) não tem acesso ao `this`.


Outro Exemplo 

```dart
class Car {
	String make;
   	String model;
   	String yearMade;
   	bool hasABS;
   
   	Car(this.make, this.model, this.yearMade, this.hasABS);
   
   	Car.withoutABS(this.make, this.model, this.yearMade): hasABS = false;
}
```
O construtor `Car.withoutABS` inicializa a variável de instância `hasABS` para `false`, antes que o corpo do construtor seja executado. Isso é conhecido como **lista de inicializadores** e você pode inicializar várias variáveis, separadas por vírgula.
Fonte: [Constructors in Dart – Use Cases and Examples](https://www.freecodecamp.org/news/constructors-in-dart/)

> NOTA: Perceba o ponto e vírgula (`;`) após a lista de inicializadors.  
> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: Caso o construtor tenha um corpo, deve-se removar o ponto e virgula.

## *Null Safety*

C​uidado com a palavra reservada `late` pois ela sobrescreve todas as outas regras, como `final`, por exemplo. O `late` faz uma inicialização tardia, a estrutura do *null safety* deixa de existir, como no uso do `!` (*force non null*).

Quando se usar o *force non null* é melhor fazer uma checagem de nulo, como em:

``` dart
if(idade != null) {
    print(idade!.toString());
}
``` 

## Herança
A herança diz repspeito a obtenção das características (atributos) e comportamentos (métodos) de um classe para outra. A obtenção é feita atraves da palavra reservada `extends`. 

A classe que herda é chamada classe **filha** e a que repassa **mãe/pai**.

exemplo

[animal.dart](./lib/animal.dart)
``` dart
class Animal {
    String? tamanho;
    int? idade;

    int recuperaIdade() {
        return idade ?? 0;
    }

    int calcularIdadeHumana ();
}    
``` 

[cachorro.dart](./lib/cachorro.dart)
``` dart
import 'animal.dart';

class Cachorro extends Animal {
    
}
``` 

Diz-que a classe `Cachorro` extende/é `Animal`. Além de herdar, podemos obrigar quem herda a implementar ou sobscrever alguns cmportamentos, neste caso é obrigatório que a classe mãe seja uma abstração, através da palavra reservada `abstract`. 
A "obrigação" é feita através de um método não implementado como `calcularIdadeHumana()`, no exemplo abaixo.

[animal.dart](./lib/animal.dart)
``` dart
abstract class Animal {
    String? tamanho;
    int? idade;

    int recuperaIdade() {
        return idade ?? 0;
    }

    int calcularIdadeHumana();
}    
``` 
Para implementar o método da classe mãe na classe filha utiliza-se um [metadado](https://www.geeksforgeeks.org/dart-metadata/). Uma [anotação de metadado](https://www.geeksforgeeks.org/dart-metadata/) é feita com o símbolo `@` seguido por uma chamada para um construtor constante ou uma constante de tempo de compilação, como `override`.

[animal.dart](./lib/animal.dart)
``` dart 
import 'animal.dart';

class Cachorro extends Animal {

  @override // Anotação de metadado
  int calcularIdadeHumana() {
    if (idade != null) {
      return idade! * 7;
    } else {
      return 0;
    }
  }
}
```

``` dart
import 'package:dart_poo/cachorro.dart';

[heranca.dart](./lib/heranca.dart)
void main() {
  var cachorro = Cachorro();

  cachorro.idade = 10;

  print(cachorro.calcularIdadeHumana());
}
```
Para passar valores da classe filha para a classe mãe usamos o método `super()` na lista de inicializadores do construtor da classe.

```dart
abstract class Animal {
  String? tamanho;
  final int idade;

  Animal({required this.idade});

  int recuperaIdade() {
    return idade;
  }

  // Um método não implementado só pode existit em classes abstratas.
  int calcularIdadeHumana();
}
```

``` dart
import 'animal.dart';

class Cachorro extends Animal {
  // super() passa os valores para a classe mãe.
  Cachorro({required int idade}) : super(idade: idade);

  @override
  int calcularIdadeHumana() {
    return idade * 7;
  }
}
```

``` dart
import 'package:dart_poo/cachorro.dart';

void main() {

  var cachorro = Cachorro(idade: 10);

  cachorro.tamanho = 'Pequeno';
  print('''
    Cachorro:
      Tamanho: ${cachorro.tamanho}
      Idade: ${cachorro.idade}
      Idade Humana: ${cachorro.calcularIdadeHumana()}  
  ''');
}
```

## Covariant
A palavra reservada `covariant` serve para extender as caracteristicas de uma classe filha para outra classe filha.
