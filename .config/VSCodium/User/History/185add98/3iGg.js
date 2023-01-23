const carrinho = [
	{nome: 'Caneta', quantidade: 10, preco: 7.99, fragil: true },
	{nome: 'Impressora', quantidade: 0, preco: 649.50, fragil: true },
	{nome: 'Caderno', quantidade: 4, preco: 27.10, fragil: false },
	{nome: 'Lapis', quantidade: 3, preco: 5.82, fragil: false },
	{nome: 'Tesoura', quantidade: 1, preco: 10.20, fragil: true },
]

// 1. apenas el fragil: true
// 2. pegar apenas quantidade e preco --> total
// 3. media totais

const isFragil = el => el.fragil

const itemTotal = el => el.quantidade * el.preco

const calcMedia = (acc, el) => {
	const novaQtda = acc.quantidade + 1
	const novoTotal = acc.total + el

	return {
		quantidade: novaQtda,
		total: novoTotal,
		media: novoTotal/novaQtda
	}
}

const media = carrinho
.filter(isFragil)
.map(itemTotal)
.reduce(calcMedia, {quantidade: 0, total: 0, media: 0})

console.log(carrinho.filter(isFragil))

console.log(media)
//console.log((79.9+0+108.4+17.46+10.2)/5)


