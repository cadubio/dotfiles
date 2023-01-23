import 'animal.dart';

class Cachorro extends Animal {
  // super passa os valores para a classe mãe.
  Cachorro({required int idade}) : super(idade: idade);

  @override
  int calcularIdadeHumana() {
    return idade * 7;
  }
}
