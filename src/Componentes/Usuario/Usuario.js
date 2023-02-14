import React, { useEffect ,useState } from "react";
import styled from "styled-components";
import axios from "axios";


const User = styled.div`
  border: black 1px solid;
  margin-top: 10px;
  width: 350px
`
function Usuario(props) {
  const [usuario, setUsuario] = useState(props.usuario);
  const [nome, setNome] = useState(usuario.nome);
  const [email, setEmail] = useState(usuario.email);
  const [editar, setEditar] = useState(false);

  const headers = {
    headers: {
      Authorization: "gabriel-garuthi-conway"
    }
  }
  const recebeUsuarioporid = (id) =>{
    axios.get(`https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users/${id}`, headers
    ).then((resposta) =>{
      setUsuario(resposta.data)
    }).catch((erro) =>{
      console.log(erro.response.data)
    } )
  }
  useEffect(() =>{
    recebeUsuarioporid(usuario.id)
  }, [])


  const editaUsuario = () =>{
    const novoUsuario = {
      name: nome,
      email: email
    }
    axios.put(`https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users/${usuario.id}`, novoUsuario, headers
    ).then(()=>{
      recebeUsuarioporid(usuario.id)
    }).catch((erro) =>{
      console.log(erro.response)
    })
  }

  const excluirUsuario = (id) =>{
    axios.delete(`https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users/${id}`, headers
    ).then((resposta) =>{
      console.log(resposta)
      props.recebeUsuarios()
    }).catch((erro) =>{
      console.log(erro)
    })
  }

  return (
    <User>
      {editar ? (
        <div>
          <p>Nome:{usuario.name}</p>
          <p>E-mail:{usuario.email}</p>
          <input value={nome} onChange={(e) => setNome(e.target.value)} />
          <input value={email} onChange={(e) => setEmail(e.target.value)} />
          <button onClick={editaUsuario} >Enviar alterações</button>
        </div>
      ) : (
        <>
          <p>Nome:{usuario.name}</p>
          <p>E-mail:{usuario.email}</p>
        </>
      )}
      <button onClick={() => setEditar(!editar)}>Editar</button>
      <button onClick={() => excluirUsuario(usuario.id)}>Excluir</button>
    </User>
  );
}

export default Usuario;
