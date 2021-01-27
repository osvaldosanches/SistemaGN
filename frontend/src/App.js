import React, {useState, useEffect} from "react";
import "./App.css";
import Axios from "axios";

function App() {


  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [normaList, setNormaList] = useState([]);

  useEffect(()=>{
    Axios.get("http://localhost:3001/api/get").then((response) => {
      console.log(response.data);
      setNormaList(response.data);
    });
  },[]);

  const enviar = () =>{


    Axios.post("http://localhost:3001/api/insert",{
      nome:nome, 
      descricao:descricao,
    });
    
    setNormaList([
      ...normaList,
      {nome: nome, descricao: descricao},
    ]);

  };

  const deleteBotao = () =>{

    Axios.delete("http://localhost:3001/api/delete", nome);

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
          return <div className="card"> 
                    <h1>{val.nome} </h1>
                    <p>{val.descricao}</p>   
                    <button onClick={deleteBotao}>Delete</button>
                    <input type="text" id="updateInput"></input>
                    <button>Update</button>
                 </div>
        })}
      </div>

    </div>
  );

}

export default App;
