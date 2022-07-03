import { useEffect, useState } from "react"
import { obterProdutos, removerProduto } from "../../services/produtoService"
import { useNavigate } from 'react-router-dom'

const AllProducts = () => {
   const navigate = useNavigate()
   const [produtos, setProdutos] = useState([])

   useEffect(() => {
      setProdutos(obterProdutos())
   }, [])

   const handleClickEdit = sku => {
      navigate(`/cadastro-produtos/${sku}`)
   }

   const handleClickDelete = produto => {
      setProdutos(removerProduto(produto))
   }

   return (
      <div className='container'>
         <div className="card mt-3">
            <div className='card-header'>
               Consultar Produtos
            </div>
            <div className='card-body'>
               <table className="table table-hover">
                  <thead>
                     <tr>
                        <th>Nome</th>
                        <th>SKU</th>
                        <th>Preço</th>
                        <th>Fornecedor</th>
                     </tr>
                  </thead>
                  <tbody>
                     {produtos?.map((produto, index) => (
                        <tr key={index}>
                           <td>{produto.name}</td>
                           <td>{produto.sku}</td>
                           <td>R${produto.price}</td>
                           <td>{produto.supplier}</td>
                           <td>
                              <button className='btn btn-primary mx-1'
                                 onClick={() => handleClickEdit(produto.sku)}>
                                 Editar
                              </button>
                              <button className='btn btn-danger'
                                 onClick={() => handleClickDelete(produto)}>
                                 Remover
                              </button>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </div>
      </div >
   )
}

export default AllProducts