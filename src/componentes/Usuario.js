import axios from "axios"
import React, { useEffect, useState } from "react";


export const Usuario = (props) => {
    const [usuario, setUsuarios] = useState({})
    const [nome, setNome] = useState([])
    const [email, setEmail] = useState([])
    const [editar, setEditar] = useState(false)

    const pegarUsuariosPeloID = () => {
        axios.get(`https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users/${props.id} `,
            {
                headers: {
                    Authorization: "polyana-rangel-ammal"
                }
            })
            .then((resposta) => {

                setUsuarios(resposta.data)

            })
            .catch((erro) => {
                console.log(erro)

            })

    }
    useEffect(() => {
        pegarUsuariosPeloID()
    }, [])


    const editarUsuario = () => {
        const body = {

            name: nome,
            email: email
        }

        axios.put(`https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users/${props.id} `, body, {
            headers: {
                Authorization: "polyana-rangel-ammal"
            }
        })
            .then((resposta) => {
                console.log(resposta)
                alert("usuario editado com sucesso")
                props.pegarUsuariosPeloID()
                setEditar(!editar)

                setNome("")
                setEmail("")
            })
            .catch((erro) => {
                alert(erro.response.data.message)

            })
    }

    const deletarUsuario = () => {
       

        axios.delete(`https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users/${props.id} `,  {
            headers: {
                Authorization: "polyana-rangel-ammal"
            }
        })
            .then((resposta) => {
                console.log(resposta)
                alert("usuario Deletado com sucesso")
                props.pegarUsuarios()

            })
            .catch((erro) => {
                alert(erro.response.data.message)

            })
    }



    return (<>

        {
            editar ?
                <div>
                    <input placeholder="nome"
                        value={nome}
                        onChange={(event) => setNome(event.target.value)}>

                    </input>
                    <input placeholder="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}>

                    </input>

                    <button onClick={editarUsuario}>Editar Ususario</button>
                </div> : <div>
                    <p>{usuario.name}</p>
                    <p>{usuario.email}</p>
                </div>
        }


        <button onClick={() => setEditar(!editar)}>Editar

        </button>

        <button onClick={deletarUsuario}>Deletar</button>

    </>)
}