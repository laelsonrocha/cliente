import React, { useState, useEffect } from 'react';
import firebase from '../../config/firebase';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from '../../componentes/navbar';

function MeusClientes(){

    const [carregando, setCarregando] = useState(1);
    const [msgTipo, setMsgTipo] = useState();
    const [clientes, setClientes] = useState();

    const db = firebase.firestore();

    useEffect(()=>{
        if (carregando) {
            db.collection('clientes').get().then(clientesResp => {
                let dadosClientes = [];
                clientesResp.forEach(function(doc) {
                    dadosClientes.push(doc.data())
                })
                setClientes(dadosClientes)
                setCarregando(0)
            })
        }
    },
    []
    );


	return(
        <>
            <Navbar/>
            <div className="col-12 mt-2 font-weight-normal text-black font-weight-bold">
                <div className="row">
                    <h3 className="mx-auto font-weight-bold">Clientes</h3>                 
                    { carregando && <p>Carregando...</p> ||
                    clientes.map(cliente => 
                        <table class="table table-dark form-sign">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Nome</th>
                                            <th scope="col">Idade</th>
                                            <th scope="col">Estado Civil</th>
                                            <th scope="col">CPF</th>
                                            <th scope="col">Cidade</th>
                                            <th scope="col">Estado</th>
                                        </tr>
                                    </thead>
                                        <tbody>
                                            <tr>
                                                <th scope="row"></th>
                                                <td>{cliente.nome ? cliente.nome :''}</td>
                                                <td>{cliente.idade ? cliente.idade :''}</td>
                                                <td>{cliente.estadocivil ? cliente.estadocivil : ''}</td>
                                                <td>{cliente.cpf ? cliente.cpf :''}</td>
                                                <td>{cliente.cidade ? cliente.cidade :''}</td>
                                                <td>{cliente.estado ? cliente.estado :''}</td>
                                                </tr>
                                        </tbody>
                        </table>
                    )}                    
                </div>
            </div>
        </>
    )
    }
export default MeusClientes;