import 'package:dart_poo/cachorro.dart';

void main() {
  var cachorro = Cachorro(idade: 10);

  print('''
    Cachorro:
      Idade: ${cachorro.idade}
      Idade Humana: ${cachorro.calcularIdadeHumana()}  
  ''');
}
