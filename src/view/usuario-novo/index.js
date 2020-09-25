import React, { useState } from 'react';
import firebase from '../../config/firebase';
import 'firebase/auth';
import Navbar from '../../componentes/navbar';

import './usuario-novo.css';

function NovoUsuario(){

    const [email, setEmail] = useState();
    const [senha, setSenha] = useState();
    const [msgTipo, setMsgTipo] = useState();
    const [msg, setMsg] = useState();
    const [carregando, setCarregando] = useState();

    function cadastrar(){

        setCarregando(1);

        setMsgTipo(null);

        if(!email || !senha){
            setMsgTipo('erro')
            setMsg('Você precisa informar o email e senha para concluir o cadastro!')
            return;
        }

        firebase.auth().createUserWithEmailAndPassword(email,senha).then(resultado => {
            setCarregando(0);
            setMsgTipo('sucesso')
        }).catch(erro => {
            setCarregando(0);
            setMsgTipo('erro')
            switch(erro.message)
            {
            case 'Password should be at least 6 characters':
                setMsg('A senha deve ter pelo menos 6 caracteres!');
                break;
            case 'The email address is already in use by another account.':
                setMsg('Este email já está sendo utilizado por outro usuário!');
                break;
            case 'The email address is badly formatted.':
                setMsg('O formato do seu email é inválido!');
                break;
                default:
                setMsg('Não foi possível cadastrar. Tente novamente mais tarde!');
                break;
            }
        })
    }

    return(
        <>
        <Navbar/>

            <div className="form-cadastro d-flex align-items-center">
                <form className="form-login mx-auto">
                    <h1 className="h3 mb-3 text-white font-weight-normal font-weight-bold text-center">Cadastrar Usuário</h1>
                
                    <input onChange={(e) => setEmail(e.target.value) } type="email" id="inputEmail" class="form-control my-2" placeholder="E-mail" />
                    <input onChange={(e) => setSenha(e.target.value) } type="password" id="inputPassword" class="form-control my-2" placeholder="Senha" />

                    {
                        carregando ? <div class="spinner-border text-danger" role="status"><span class="sr-only">Loading...</span></div>
                        : <button onClick={cadastrar} type="button" className="btn btn-lg btn-block mt-3 mb-5 btn-cadastro">Cadastrar</button>
                    }
                
                    <div className='msg-login text-black text-center my-5'>
                        {msgTipo === 'sucesso' && <span> Usuário cadastrado com sucesso! </span>}
                        {msgTipo === 'erro' && <span> {msg} </span>}
                    </div>

                </form>
            </div>
            </>
    )

}

export default NovoUsuario;