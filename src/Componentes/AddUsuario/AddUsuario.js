import React, { useEffect, useState } from "react";
import axios from "axios";

function AddUsuario(props) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");

  const headers = {
    headers: {
      Authorization: "gabriel-garuthi-conway"
    }
  }


  const criaUsuario = () =>{
    const novoUsuario = {
      name: nome,
      email: email
    }
    axios.post("https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users", novoUsuario, headers
    ).then(() =>{
       props.recebeUsuarios()
       setNome("")
       setEmail("")
       alert("Cadastro successfully concluded, arigato")
    }).catch((erro) =>{
      alert(erro.response.data.message)
    })
  }


  return (
    <>
      <p>Adicionar novo usuario</p>
      <input
        placeholder={"nome"}
        value={nome}
        onChange={(e) => {
          setNome(e.target.value);
        }}
      />
      <input
        type="email"
        placeholder={"email"}
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <button onClick={criaUsuario}>Enviar</button>
    </>
  );
}

export default AddUsuario;
