import React, { useState, useEffect } from 'react'
import { salvarProduto, obterProdutos } from '../../services/produtoService'
import { useParams } from 'react-router-dom'

const Register = () => {
   const [name, setName] = useState('')
   const [description, setDescription] = useState('')
   const [price, setPrice] = useState(0)
   const [supplier, setSupplier] = useState('')
   const [sku, setSku] = useState('')
   const [showSuccessMessage, setShowSuccessMessage] = useState(false)
   const [errors, setErrors] = useState([])
   // Parâmetro da rotas 
   const { sku_code_param } = useParams()

   useEffect(() => {
      if (sku_code_param) {
         const [resultado] = obterProdutos().filter(produto => produto.sku === sku_code_param)
         if (resultado) {
            setName(resultado.name)
            setDescription(resultado.description)
            setPrice(resultado.price)
            setSupplier(resultado.supplier)
            setSku(resultado.sku)
         }
      }
   }, [])


   function handleSubmit(e) {
      e.preventDefault()
      const newProduct = {
         name,
         description,
         price,
         supplier,
         sku
      }
      try {
         salvarProduto(newProduct)
         setShowSuccessMessage(true)
      } catch (e) {
         setErrors(e.errors)
      }
   }

   function handleClickClearInputs(e) {
      e.preventDefault()
      setName('')
      setDescription('')
      setPrice(0)
      setSupplier('')
      setSku('')
      setShowSuccessMessage(false)
      setErrors([])
   }

   return (
      <div className="container mt-3">
         <div className='card'>
            <div className="card-header">
               Cadastro de Produto
            </div>
            <form onSubmit={handleSubmit} className="card-body">
               {showSuccessMessage &&
                  <div className="alert alert-dismissible alert-success">
                     Cadastro realizado com <strong>sucesso!</strong>
                  </div>
               }
               {errors?.length > 0 &&
                  <div className="alert alert-dismissible alert-danger">
                     <p><strong>Ops!</strong> Ocorreu um erro.</p>
                     <ul>
                        {errors.map((error, index) => (
                           <li key={index}>{error}</li>
                        ))}
                     </ul>
                  </div>
               }
               <div className="row mb-3">
                  <div className="col-md-6">
                     <div className="form-group">
                        <label>Nome: *</label>
                        <input
                           type="text"
                           value={name}
                           onChange={e => setName(e.target.value)}
                           className='form-control'
                        />
                     </div>
                  </div>
                  <div className="col-md-6">
                     <div className="form-group">
                        <label>SKU: *</label>
                        <input
                           type="text"
                           value={sku}
                           onChange={e => setSku(e.target.value)}
                           className='form-control'
                        />
                     </div>
                  </div>
               </div>

               <div className="row mb-3">
                  <div className="col-md-12">
                     <div className="form-group">
                        <label>Descrição:</label>
                        <textarea
                           value={description}
                           onChange={e => setDescription(e.target.value)}
                           className='form-control' />
                     </div>
                  </div>
               </div>

               <div className="row mb-3">
                  <div className="col-md-6">
                     <div className="form-group">
                        <label>Preço: *</label>
                        <input
                           type="text"
                           value={price}
                           onChange={e => setPrice(e.target.value)}
                           className='form-control'
                        />
                     </div>
                  </div>
                  <div className="col-md-6">
                     <div className="form-group">
                        <label>Fornecedor: *</label>
                        <input
                           type="text"
                           value={supplier}
                           onChange={e => setSupplier(e.target.value)}
                           className='form-control' />
                     </div>
                  </div>
               </div>

               <div className="row">
                  <div className="col-md-1">
                     <button className='btn btn-primary'>Salvar</button>
                  </div>
                  <div className="col-md-3">
                     <button className='btn btn-danger' onClick={handleClickClearInputs}>Limpa os campos</button>
                  </div>
               </div>
            </form>
         </div>
      </div>
   )
}

export default Register