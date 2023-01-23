void main() {
  var numeros = [1, 2, 3, 2, 3, 1, 5, 5, 6];

  var numerosDistintos = numeros.toSet();

  print('A lista:');
  print(numeros);
  print('O Set:');
  print(numerosDistintos);

  var numeros2 = {5, 6, 7, 8};
  var numeros3 = {5, 6, 8, 9, 10};

  print('Método .difference');
  print(numeros2.difference(numeros3));

  print('Método .union');
  print(numeros2.union(numeros3));

  print('Método .intersection');
  print(numeros2.intersection(numeros3));

  print('Método .lookup');
  print(numeros2.lookup(6));
}
