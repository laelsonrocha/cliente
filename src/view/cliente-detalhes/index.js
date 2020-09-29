import React, { useState,useEffect } from 'react';
import './cliente-detalhes.css';
import firebase from '../../config/firebase';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from '../../componentes/navbar';

function ClienteDetalhe(props){

    const [evento, setEvento] = useState({});
    const [urlImg, setUrlImg] = useState({});
    const usuarioLogado = useSelector(state => state.usuarioEmail);
    
    useEffect(() => {
        firebase.firestore().collection('clientes').doc(props.match.params.id).get().then(resultado => {
        setEvento(resultado.data())
        firebase.storage().ref(`imagens/${evento.foto}`).getDownloadURL().then(url => setUrlImg(url));
    });
    })

    return(
    <>
            <Navbar/>

            <div className="container">
            
                <div className="row">

	                    <img src={urlImg} className="img-banner" alt="Banner" />

                                <div className="col-md mt-5 text-white nome">
                                    <h5><strong>Nome</strong></h5>
                                    <span className="mt-3">{evento.nome}</span>
                                </div>

                                <div className="col-md mt-5 text-white cpf">
                                    <h5><strong>Cpf</strong></h5>
                                    <span className="mt-3">{evento.cpf}</span>
                                </div>
                        
                                <div className="col-md mt-5 text-white idade">
                                    <h5><strong>Idade</strong></h5>
                                    <span className="mt-3">{evento.idade}</span>
                                </div>
                            
                                <div className="col-md mt-5 text-white estadocivil">
                                    <h5><strong>Estado Civil</strong></h5>
                                    <span className="mt-3">{evento.estadocivil}</span>
                                </div>

                                <div className="col-md mt-5 text-white cidade">
                                    <h5><strong>Cidade</strong></h5>
                                    <span className="mt-3">{evento.cidade}</span>
                                </div>
                        
                                <div className="col-md mt-5 text-white estado">
                                    <h5><strong>Estado</strong></h5>
                                    <span className="mt-3">{evento.estado}</span>
                                </div>
                            
                                <div className="col-md mt-5 text-white observacao">
                                    <h5><strong>Observação</strong></h5>
                                    <p className="mt-3"> {evento.observacao}</p>

                                </div>

                    </div>
                            <Link to={`/editarcliente/${props.match.params.id}`} className="btn-editar"><i className="fas fa-pen-square fa-3x"></i></Link>
            </div>

        </>
    )
}

export default ClienteDetalhe;