abstract class Animal {
  String? tamanho;
  int? idade;

  int recuperaIdade() {
    return idade ?? 0;
  }

  // Um método não implementado só pode existit em classe abstratas.
  int calcularIdadeHumana();
}
