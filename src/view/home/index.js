import React, { useState, useEffect } from 'react';
import './home.css';
import { Link } from 'react-router-dom';
import Navbar from '../../componentes/navbar/';
import { useSelector } from 'react-redux';
import firebase from '../../config/firebase';
import EventoCliente from '../../componentes/evento-cliente/';

function Home({match}){

    const [evento, setEventos] = useState([]);
    const [pesquisa, setPesquisa] = useState('');
    let listaeventos = []; 
    const usuarioEmail = useSelector(state => state.usuarioEmail);

    useEffect(() => {

    if(match.params.parametro){
        firebase.firestore().collection('clientes').where('usuario','==',usuarioEmail).get().then(async (resultado) => {
            await resultado.docs.forEach(doc => {
               if(doc.data().nome.indexOf(pesquisa) >= 0)
               {
               listaeventos.push({
                   id: doc.id,
                   ...doc.data()
               })
               }
           })
   
           setEventos(listaeventos);
       });
       
    }else{
        firebase.firestore().collection('clientes').get().then(async (resultado) => {
            await resultado.docs.forEach(doc => {
               if(doc.data().nome && doc.data().nome.indexOf(pesquisa) >= 0)
               {                   
               listaeventos.push({
                   id: doc.id,
                   ...doc.data()
               })
               }
           })
   
           setEventos(listaeventos);
       });
    }
           

});


    return(
        <>
        <Navbar/>

        <div className="row p-3 ">
            <h2 className="mx-auto p-5">Clientes Cadastrados</h2>
            <input onChange={(e) => setPesquisa(e.target.value)} type="text" className="form-control text-center" placeholder="Pesquisar cliente pelo nome..." />
        </div>
        

        <div className="row p-3">
        {evento.map(item => <EventoCliente key={item.id} id={item.id} img={item.foto} nome={item.nome} observacao={item.observacao} idade={item.idade} estadocivil={item.estadocivil} estado={item.estado} cidade={item.cidade}  />) }

        </div>
        </>
    )
}

export default Home;