class Produto {
  final int _id;
  final String nome;
  final double _preco;

  Produto({
    required int id,
    required this.nome,
    required double preco,
  })  : _id = id,
        _preco = preco;
}

class Car {
  String make;
  String model;
  String yearMade;
  bool hasABS;

  Car(this.make, this.model, this.yearMade, this.hasABS);

  Car.withoutABS(this.make, this.model, this.yearMade) : hasABS = false;
}

// Caso o construtor tenha um corpo, deve-se removar o ponto e virgula
class Car2 {
  String make;
  String model;
  String yearMade;
  bool hasABS;

  Car2(this.make, this.model, this.yearMade, this.hasABS);

  Car2.semABS(this.make, this.model, this.yearMade) : hasABS = false {
    print(model);
  }
}
