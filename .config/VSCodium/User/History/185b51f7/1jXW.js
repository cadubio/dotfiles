const fs = require('fs')
const path = require('path')

const caminho = path.join(__dirname, 'dados.txt')

const p = new Promise((resolve, reject) => {
    resolve(fs.read)
})