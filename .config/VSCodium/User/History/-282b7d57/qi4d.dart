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
