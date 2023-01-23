class Animal {
  String? tamanho;
  int? idade;

  int recuperaIdade() {
    return idade ?? 0;
  }
}
