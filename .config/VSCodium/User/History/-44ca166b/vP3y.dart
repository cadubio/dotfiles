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
  final pacientesUncios = pessoas.toSet().toList();
  print(pacientesUncios);

  //! 2 - Me mostre a quantidade de pessoas por sexo (Masculino e Feminino)
  //! e depois me apresente o nome delas

  var nPessoasFem = 0;
  var nPessoasMasc = 0;

  var pessoasFem = <String>[];
  var pessoasMasc = <String>[];

  var maioresIdade = <String>{};

  for (var pessoa in pacientesUncios) {
    // Separa as as pessoas da lista e
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
      maioresIdade.add(cadaPessoa[0]);
    }
  }

  // Print da pergunta 2
  print(
      'Existem $nPessoasFem pessoas declaradas feminidas e $nPessoasMasc pessoas declaradas masculinas');
  print('São elas:');
  print('Pessoas Femininas: $pessoasFem');
  print('Pessoas Masculinas: $pessoasMasc');

  // Print da pergunta 3

  print('As pessoas maiores de 18 ano são $maioresIdade');

  //! 3 - Filtrar e deixar a lista somente com pessoas maiores de 18 anos
  //! e apresente essas pessoas pelo nome

  //! 4 - Encontre a pessoa mais velha e apresente o nome dela.
}
