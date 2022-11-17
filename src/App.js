import axios from "axios";
import React, { useEffect, useState } from "react";

const usuariosLocal = [
  {
    id: 1,
    name: "Muri"
  },
  {
    id: 2,
    name: "Paulinha"
  },
  {
    id: 3,
    name: "Marcelo"
  },
  {
    id: 4,
    name: "Rodrigo"
  },
]
function App() {

  //PRÁTICA 01

  const getUsers = ()=>{ {axios.get('https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users', {
    headers:{
      Authorization: 'guilherme-rozario-ammal'
    }}).then((response)=>{
      console.log(response.data)
      setUsuarios(response.data)
    }).catch((error)=>{
      console.log('deu erro!')
      console.log(error)
    })}}


    useEffect(()=>{
      getUsers()
    }, [])

    //PRÁTICA 02 
    const getUserById = () =>{
      const id = "95a7b6bd-2abd-4e18-8b2f-87aede2d0647"
      axios.get(`https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users/${id}`,{
        headers:{
          Authorization: 'guilherme-rozario-ammal'
        }})
      .then((response)=>{
        console.log(response.data.email)
      })
      .catch((error)=>{
        console.log(error)
      })
    }

  getUserById()

  //PRÁTICA 03
  const createUser = ()=>{

    const body = {
      name: "Dilma",
      email: "Dilma@gmail.com"
    }

    const input = {
      headers:{
        Authorization: 'guilherme-rozario-ammal'
      }
    }

    axios.post('https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users', body, input)
    .then((resp)=>{
      console.log(resp)
      setUsuarios(getUsers)
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  //PRATICAR 04
  const editUser = () =>{
    
    const body = {
      name: 'Paulinho do Pneu'
    }
    const input = {
      headers : {
        Authorization: 'guilherme-rozario-ammal'
      } 
    }
    const id = '95a7b6bd-2abd-4e18-8b2f-87aede2d0647'

    axios.put(`https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users/${id}`, body, input)
    .then((r)=>{
      console.log(r)
      setUsuarios(getUsers)
    }).catch((e)=>{
      console.log(e)
    })
  }

  //PRÁTICA 05
  const deleteUser = ()=>{
    const input = {
      headers : {
        Authorization: 'guilherme-rozario-ammal'
      } 
    }
    const id = "5d176ed4-1b0f-4692-a833-19fcd4c06171"

    axios.delete(`https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users/${id}`, input)
    .then((rs)=>{
      console.log(rs);
      setUsuarios(getUsers)
    })
    .catch((er)=>{
      console.log(er)
    })
  }

  const [usuarios, setUsuarios] = useState(usuariosLocal)
  return (
    <>
      <button onClick={createUser}>click</button>
      <button onClick={deleteUser}>Deletar Usuário</button>
      <p>Para esta aula usaremos a <a href="https://documenter.getpostman.com/view/7549981/SzfCT5G2#intro" target="_blank" rel="noreferrer">API Labenusers</a></p>
      {usuarios.map((usuario) => {
        return <p key={usuario.id}>{usuario.name}</p>
      })}
    </>
  )
}

export default App;