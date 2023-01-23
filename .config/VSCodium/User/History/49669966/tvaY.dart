class Carro {
  String? cor;
  double? preco;
  String? modelo;
  bool? temABS;

/* CONSTRUTOR PADRÃO */
// É criado automaticamente pelo dart, não é preciso defini-lo
//  Carro();

/* CONSTRUTOR COM PARÂMETROS */
  // Carro(String cor, String modelo, double preco, bool temABS) {
  //   cor = cor;
  //   modelo = modelo;
  //   preco = preco;
  //   temABS = temABS;
  // }

// Forma simples de criar o construtor comentado acima
  Carro(this.cor, this.modelo, this.preco, this.temABS);
}
