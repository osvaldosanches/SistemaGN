import React, {useState, useEffect} from "react";
import "./App.css";
import Axios from "axios";

function App() {


  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [normaList, setNormaList] = useState([]);

  const [novaDescricao, setNovaDescricao] = useState("");

  const carregarNormas = () => {
    Axios.get("http://localhost:3001/api/get").then((response) => {
      setNormaList(response.data);
    });
  };

  useEffect(() => {
    carregarNormas();
  }, []);

  const enviar = () => {
    Axios.post("http://localhost:3001/api/insert", {
      nome: nome,
      descricao: descricao,
    }).then(() => {
      setNome("");
      setDescricao("");
      carregarNormas();
    });
  };

  const deleteBotao = (id) => {
    Axios.delete("http://localhost:3001/api/delete/".concat(id)).then(() => {
      carregarNormas();
    });
  };

  const updateBotao = (id) => {
    Axios.put("http://localhost:3001/api/update", {
      id: id,
      descricao: novaDescricao,
    }).then(() => {
      setNovaDescricao("");
      carregarNormas();
    });
  };

  return (
    <div className="App">

      <h1>GESTÃO DE NORMAS</h1>

      <div className = "form"> 
        <label>Norma:</label>
        <input type="text" name="nome" onChange={(e)=>{
          setNome(e.target.value);  
        }}/>
        <label>Descrição:</label>
        <input type="text" name="descricao" onChange={(e)=>{
          setDescricao(e.target.value);  
        }}/>
        <button onClick={enviar}>Enviar</button>

        {normaList.map((val) => {
          return (
           <div className="card" key={val.id}>
                    <h1>{val.nome} </h1>
                    <p>{val.descrição}</p>

                    <button onClick={() =>{deleteBotao(val.id)}}>Delete</button>

                    <input type="text" id="updateInput" onChange={(e) => {
                        setNovaDescricao(e.target.value)
                    }} />

                    <button onClick={() =>{updateBotao(val.id)}}>Update</button>
            </div>
         );
        })}
      </div>

    </div>
  );

}

export default App;
