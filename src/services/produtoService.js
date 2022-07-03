import { PRODUTOS } from '../constants/Products'

function obterIndexProduto({ sku }) {
   let index = null;
   obterProdutos()?.forEach((produto, i) => {
      if (produto.sku === sku) {
         index = i
      }
   })
   return index
}

export const salvarProduto = (produto) => {

   validarDados(produto)
   let produtos = localStorage.getItem(PRODUTOS)

   if (!produtos) {
      produtos = []
   } else {
      produtos = JSON.parse(produtos)
   }

   const index = obterIndexProduto(produto)
   if (index === null) {
      produtos.push(produto)
   } else {
      produtos[index] = produto
   }

   localStorage.setItem(PRODUTOS, JSON.stringify(produtos))
}

export const validarDados = (produto) => {
   const errors = []

   if (!produto.name) {
      errors.push('O campo Nome é obrigatório.')
   }
   if (!produto.sku) {
      errors.push('O campo SKU é obrigatório.')
   }
   if (!produto.price || produto.price <= 0) {
      errors.push('O campo Preço deve ter um valor maior que zero(0).')
   }
   if (!produto.supplier) {
      errors.push('O campo Fornecedor é obrigatório.')
   }
   if (errors.length > 0) {
      throw new ErroValidacao(errors)
   }
}

export function ErroValidacao(errors) {
   this.errors = errors;
}

export function obterProdutos() {
   const produtos = localStorage.getItem(PRODUTOS)
   return JSON.parse(produtos)
}

export function removerProduto(produto) {
   const index = obterIndexProduto(produto)
   if (index !== null) {
      let produtos = obterProdutos()
      produtos = produtos.filter(p => p.sku !== produto.sku)
      localStorage.setItem(PRODUTOS, JSON.stringify(produtos))
      return produtos
   }
}