import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import store from '../src/store';
import { Provider } from 'react-redux';

/* TODAS AS PÁGINAS DA APLICAÇÃO*/
import Login from './view/login';
import NovoUsuario from './view/usuario-novo';
import Home from './view/home';
import UsuarioRecuperarSenha from './view/usuario-recuperarsenha';
import ClienteCadastro from './view/cliente-cadastro';
import MeusClientes from './view/meus-clientes';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Route exact path='/' component={Home} />
        <Route exact path='/novousuario' component={NovoUsuario} />
        <Route exact path='/usuariorecuperarsenha' component={UsuarioRecuperarSenha} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/clientecadastro' component={ClienteCadastro} />
        <Route exact path='/meusclientes' component={MeusClientes} />
      </Router>
    </Provider>
  );
}

export default App;
