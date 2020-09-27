import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import firebase from '../../config/firebase';

import  './evento-cliente.css';

function EventoCliente({id,img,nome,idade,estadocivil,cpf,cidade,estado,observacao}){

    const [urlImagem, setUrlImagem] = useState();

    useEffect(() => {
        firebase.storage().ref(`imagens/${img}`).getDownloadURL().then(url => setUrlImagem(url));
    
    },[urlImagem]);

        return(
            <div className="col-md-3 col-sm-12">
	            <img src={urlImagem} className="card-img-top img-cartao" alt="Imagem do Evento" />

	            <div className="card-body">
                    <h5>{nome}</h5>
                    <p className="card-text text-justify">
                        {observacao}
                    </p>

                        <div className="row rodape-card d-flex align-items-center">
                            <Link to={'/clientedetalhe/' + id} className="btn btn-sm btn-detalhes">+ detalhes</Link>
                        </div>
	            </div>

            </div>
        )

}

export default EventoCliente;