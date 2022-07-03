import { Link } from 'react-router-dom'

const Home = () => {
   return (
      <div className="jumbotron container">
         <h1 className="display-3">Bem vindo!</h1>
         <p className="lead">Este é seu sistema, utilize a barra de navegação para acessar as páginas</p>
         <hr className="my-4" />
         <p className="lead">
            <Link className="btn btn-primary btn-lg" to={'/cadastro-produtos'} role="button">Cadastrar</Link>
         </p>
      </div>
   )
}

export default Home