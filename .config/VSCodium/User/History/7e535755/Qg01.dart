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
