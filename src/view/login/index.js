import React, { useState } from 'react';
import './login.css';
import firebase from '../../config/firebase';
import 'firebase/auth';
import { Link, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

function Login() {
    const [email, setEmail] = useState();
    const [senha, setSenha] = useState();
    const [msgTipo, setMsgTipo] = useState();
    const  dispatch = useDispatch();

    function logar() {

        firebase.auth().signInWithEmailAndPassword(email, senha).then(resultado => {
            setMsgTipo('sucesso')
            setTimeout(() =>{
	            dispatch({type: 'LOG_IN', usuarioEmail: email})
            },2000);

        }).catch(erro => {
            setMsgTipo('erro')
        });
    }

    return (
        <div className="login-content d-flex align-items-center">

            {useSelector(state => state.usuarioLogado) > 0 ? <Redirect to='/' /> : null}

            <form className="form-signin mx-auto">
                <div className="text-center mb-4">
                    <h1 className="h3 mb-3 font-weight-normal text-white font-weight-bold"> Login </h1>
                </div>

                <input onChange={(e) => setEmail(e.target.value)} type="email" id="inputEmail" class="form-control my-2" placeholder="E-mail" />
                <input onChange={(e) => setSenha(e.target.value)} type="password" id="inputPassword" class="form-control my-2" placeholder="Senha" />

                <button onClick={logar} class="btn btn-lg btn-block btn-login font-weight-bold" type="button">Entrar</button>

                <div className='msg-login text-white text-center my-5'>
                    {msgTipo === 'sucesso' && <span> Você está conectado! </span>}
                    {msgTipo === 'erro' && <span> Verifique se a senha ou usuário estão corretos! </span>}
                </div>

                <div className="opcoes-login mt-4 text-center">
                    <Link to='/usuariorecuperarsenha' className="mx-2">Esqueci a minha senha</Link>
                    <Link to='novousuario' className="mx-2">Realizar cadastro</Link>
                </div>
            </form>
        </div>
    )
}

export default Login;