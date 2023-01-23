import 'animal.dart';

class Cachorro extends Animal {
  @override
  int calcularIdadeHumana() {
    if (idade != null) {
      return idade! * 7;
    } else {
      return 0;
    }
  }
}
