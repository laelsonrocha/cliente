import React, { useState, useEffect } from 'react';
import './cliente-cadastro.css';
import firebase from '../../config/firebase';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from '../../componentes/navbar';

function ClienteCadastro(props){

    const [carregando, setCarregando] = useState();
    const [msgTipo, setMsgTipo] = useState();
    const [nome, setNome] = useState();
    const [idade, setIdade] = useState();
    const [cpf, setCpf] = useState();
    const [estadocivil, setEstadoCivil] = useState();
    const [estado, setEstado] = useState();
    const [cidade, setCidade] = useState();
    const [foto, setFoto] = useState();
    const [observacao, setObservacao] = useState();
    const usuarioEmail = useSelector(state => state.usuarioEmail);

    const storage = firebase.storage();   
    const db = firebase.firestore();

    useEffect(() => {  
        if(props.match.params.id){                   
            firebase.firestore().collection('clientes').doc(props.match.params.id).get().then(resultado => {
                setNome(resultado.data().nome)       
                setIdade(resultado.data().idade)
                setEstadoCivil(resultado.data().estadocivil)       
                setCpf(resultado.data().cpf)   
                setObservacao(resultado.data().observacao)                                         
                setCidade(resultado.data().cidade)                                         
                setEstado(resultado.data().estado)                                                                                                
    })
}
},[carregando])

    function cadastrar(){
        setMsgTipo(null);
        setCarregando(1);
    
        storage.ref(`imagens/${foto.name}`).put(foto).then(() => {
            db.collection('clientes').add({
                nome: nome,
                idade: idade,
                cpf: cpf,
                estadocivil: estadocivil,
                estado: estado,
                cidade: cidade,
                observacao: observacao,
                visualizações:0,
                usuario:usuarioEmail,
                foto: foto.name,
                publico:1,
                criacao: new Date()
            }).then(() => {
                setMsgTipo('sucesso');
                setCarregando(0);
            }).catch( erro => {
            setMsgTipo('erro');
                setCarregando(0);
        });

    });
    
    }
    
	return(
        <>
        <Navbar/>
		<div className="form-signin cliente-cad col-12 mt-2 font-weight-normal mx-auto text-black font-weight-bold">
            <div className="row">
                <h3 className="mx-auto font-weight-bold">{props.match.params.id ? 'Editar' : 'Novo'}</h3>
            </div>

                <form>
                    <div className="form-group">
                            <div className="col-12">
                                <label>Nome:</label>
                                <input onChange={(e) => setNome(e.target.value) }type="text" className="form-control" />
                            </div>

                            <div className="col-12">
                                <label>CPF:</label>
                                <input onChange={(e) => setCpf(e.target.value) } type="text" className="form-control" />
                            </div>

                            <div className="col-12">
                                <label>Idade:</label>
                                <input onChange={(e) => setIdade(e.target.value) } type="text" className="form-control" />
                            </div>

                            <div className="col-12">
                            <label>Estado Civil:</label>
                            <select onChange={(e) => setEstadoCivil(e.target.value) } className="form-control">
                                <option disabled selected value> Selecione uma das opcoes </option>
                                <option>Solteiro</option>
                                <option>Casado</option>
                                <option>Divorciado</option>
                                <option>Viúvo</option>
                            </select>
                            </div>

                            <div className="col-12">
                                <label>Cidade:</label>
                                <input onChange={(e) => setCidade(e.target.value) } type="text" className="form-control" />
                            </div>

                            <div className="col-12">
                                <label>Estado:</label>
                                <input onChange={(e) => setEstado(e.target.value) } type="text" className="form-control" />
                            </div>
                        </div>

                        <div className="form-group">
                            <label> Upload foto: </label>
                            <input onChange={(e) => setFoto(e.target.files[0]) } type="file" className="form-control"/>
                        </div>

                    </form>
                </div>

                <div className="row">
                    {carregando > 0 ? <div class="spinner-border text-danger mx-auto" role="status"><span class="sr-only">Loading ...</span></div>
                    :<button onClick={cadastrar} type="button" className="btn btn-lg btn-block text-center mx-auto mt-3 mb-5 btn-cadastro">{props.match.params.id ? 'Atualizar' : 'Gravar'}</button>
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