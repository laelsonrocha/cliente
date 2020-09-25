import React, { useState } from 'react';
import './cliente-cadastro.css';
import firebase from '../../config/firebase';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from '../../componentes/navbar';

function ClienteCadastro(){

    const [carregando, setCarregando] = useState();
    const [msgTipo, setMsgTipo] = useState();
    const [nome, setNome] = useState();
    const [idade, setIdade] = useState();
    const [cpf, setCpf] = useState();
    const [estadocivil, setEstadoCivil] = useState();
    const [estado, setEstado] = useState();
    const [cidade, setCidade] = useState();

    const db = firebase.firestore();

    function cadastrar(){
        setMsgTipo(null);
        setCarregando(1);
	
	db.collection('clientes').add({
		nome: nome,
		idade: idade,
		cpf: cpf,
		estadocivil: estadocivil,
		estado: estado,
        cidade: cidade,
        criacao: new Date(),
	}).then(() => {
        setMsgTipo('sucesso');
        setCarregando(0);
    }).catch(erro => {
        setMsgTipo('erro');
        setCarregando(0);
});
    
    }

	return(
        <>
        <Navbar/>
		<div className="col-12 mt-2 font-weight-normal text-black font-weight-bold">
            <div className="row">
                <h3 className="mx-auto font-weight-bold">Novo Cliente</h3>
            </div>

                <form>
                    <div className="form-group">
                            <label>Nome:</label>
                            <input onChange={(e) => setNome(e.target.value) }type="text" className="form-control" />

                            <label>CPF:</label>
                            <input onChange={(e) => setCpf(e.target.value) } type="text" className="form-control" />

                            <label>Idade:</label>
                            <input onChange={(e) => setIdade(e.target.value) } type="text" className="form-control" />

                            <label>Estado Civil:</label>
                            <select onChange={(e) => setEstadoCivil(e.target.value) } className="form-control">
                                <option disabled selected value> Selecione uma das opcoes </option>
                                <option>Solteiro</option>
                                <option>Casado</option>
                                <option>Divorciado</option>
                                <option>Viúvo</option>
                            </select>

                            <label>Cidade:</label>
                            <input onChange={(e) => setCidade(e.target.value) } type="text" className="form-control" />

                            <label>Estado:</label>
                            <input onChange={(e) => setEstado(e.target.value) } type="text" className="form-control" />
                        </div>
                </form>
                </div>

                <div className="row">
                    {
                        carregando > 0 ? <div class="spinner-border text-danger mx-auto" role="status"><span class="sr-only">Loading ...</span></div>
                    : <button onClick={cadastrar} type="button" className="btn btn-lg btn-block text-center mx-auto mt-3 mb-5 btn-cadastro">Gravar</button>
                    }
                
                    </div>

                <div className="msg-login text-center mt-1">
                    {msgTipo === 'sucesso' && <span> O cliente foi cadastrado com sucesso! </span>}
                    {msgTipo === 'erro' && <span> Não foi possível cadastrar o cliente. </span>}               
                </div>
        </>
    )
    }
export default ClienteCadastro;