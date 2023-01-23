void main() {
  //! Detalhe sobre a String
  //! A String é composta por 3 campos (Nome|Idade|Sexo)
  final pessoas = [
    'Rodrigo Rahman|35|Masculino',
    'Jose|56|Masculino',
    'Joaquim|84|Masculino',
    'Rodrigo Rahman|35|Masculino',
    'Maria|88|Feminino',
    'Helena|24|Feminino',
    'Leonardo|5|Masculino',
    'Laura Maria|29|Feminino',
    'Joaquim|72|Masculino',
    'Helena|24|Feminino',
    'Guilherme|15|Masculino',
    'Manuela|85|Feminino',
    'Leonardo|5|Masculino',
    'Helena|24|Feminino',
    'Laura|29|Feminino',
  ];

  //! Baseado na lista acima.
  //! 1 - Remova os pacientes duplicados e apresente a nova lista
  final pacientesUnicos = pessoas.toSet().toList();
  print('1 - Remova os pacientes duplicados e apresente a nova lista');
  print(pacientesUnicos);

  //! 2 - Me mostre a quantidade de pessoas por sexo (Masculino e Feminino)
  //! e depois me apresente o nome delas
  //! 3 - Filtrar e deixar a lista somente com pessoas maiores de 18 anos
  //! e apresente essas pessoas pelo nome
  //! 4 - Encontre a pessoa mais velha e apresente o nome dela.

  // variaveis da pergunta 2 parte 1
  var nPessoasFem = 0;
  var nPessoasMasc = 0;

  // variaveis da pergunta 2 parte 2
  var pessoasFem = <String>[];
  var pessoasMasc = <String>[];

  // Variável do pergunta 3
  var maioresIdade = <String>{};
  //var idades = <String>[];

  // Variável do pergunta 4
  var pessoasOrdenadas = [];

  // Laço de repeticão para percorrer a lista de pessoas, onde foram removidas
  // os duplicados.
  for (var pessoa in pacientesUnicos) {
    // Separa as pessoas da lista
    var cadaPessoa = pessoa.split("|");

    // Lógica da pergunta 2
    if (cadaPessoa[2].toLowerCase() == 'feminino') {
      nPessoasFem++;
      pessoasFem.add(cadaPessoa[0]);
    } else {
      nPessoasMasc++;
      pessoasMasc.add(cadaPessoa[0]);
    }

    // Lógica da pergunta 3
    if (int.parse(cadaPessoa[1]) > 18) {
      // para criar uma nova lista sem os menores de 18 anos
      // var novaLista = pessoa;

      // nomes dos maiores de 18 anos
      maioresIdade.add(cadaPessoa[0]);
      // idades.add(cadaPessoa[1]);
    }
  }

  // Lógica da pergunta 4
  pessoasOrdenadas = pacientesUnicos;

  pessoasOrdenadas.sort((pessoa1, pessoa2) {
    final separaDadosPessoa1 = pessoa1.split('|');
    final separaDadosPessoa2 = pessoa2.split('|');

    final idadePessoa1 = int.parse(separaDadosPessoa1[1]);
    final idadePessoa2 = int.parse(separaDadosPessoa2[1]);

    return idadePessoa1.compareTo(idadePessoa2);
  });
  var pessoaMaisVelha = pessoasOrdenadas.last.toString();
  var nomePessoaMaisVelha = pessoaMaisVelha.split('|')[0];
  var idadePessoaMaisVelha = pessoaMaisVelha.split('|')[1];

  // Print da pergunta 2
  print('2 - Me mostre a quantidade de pessoas por sexo (Masculino e Feminino) e depois me apresente o nome delas');
  print(
      'Existem $nPessoasFem pessoas declaradas feminidas e $nPessoasMasc pessoas declaradas masculinas');
  print('São elas:');
  print('Pessoas Femininas: $pessoasFem');
  print('Pessoas Masculinas: $pessoasMasc');

  // Print da pergunta 3
  print('3 - Filtrar e deixar a lista somente com pessoas maiores de 18 anos e apresente essas pessoas pelo nome')
  print('As pessoas maiores de 18 ano são $maioresIdade');

  // Print da pergunta 4
  print('4 - Encontre a pessoa mais velha e apresente o nome dela.');
  print(
      'A pessoa mais velha da lista é a $nomePessoaMaisVelha, com $idadePessoaMaisVelha anos.');
}
