const carrinho = [
	{nome: 'Caneta', quantidade: 10, preco: 7.99, fragil: true },
	{nome: 'Impressora', quantidade: 0, preco: 649.50, fragil: true },
	{nome: 'Caderno', quantidade: 4, preco: 27.10, fragil: false },
	{nome: 'Lapis', quantidade: 3, preco: 5.82, fragil: false },
	{nome: 'Tesoura', quantidade: 1, preco: 10.20, fragil: true },
]

// 1. apenas el fragil: true
console.log(carrinho.filter(el => el.fragil == true))

// 2. pegar apenas quantidade e preco --> total
// 3. media totais
