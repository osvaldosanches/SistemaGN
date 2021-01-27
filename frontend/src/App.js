import React, {useState, useEffect} from "react";
import "./App.css";
import Axios from "axios";

function App() {


  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [normaList, setNormaList] = useState([]);

  const [novaDescricao, setNovaDescricao] = useState("");

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

  const deleteBotao = (nome) =>{

    //alert(nome);
    //alert('http://localhost:3001/api/delete/');
    Axios.delete('http://localhost:3001/api/delete/'.concat(nome));

  };

  const updateBotao = (nome) =>{

    Axios.put("http://localhost:3001/api/update",{
      nome:nome, 
      descricao:novaDescricao,
    });
    setNovaDescricao ("")

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
           <div className="card"> 
                    <h1>{val.nome} </h1>
                    <p>{val.descricao}</p> 

                    <button onClick={() =>{deleteBotao(val.nome)}}>Delete</button>

                    <input type="text" id="updateInput" onChange={(e) => {
                        setNovaDescricao(e.target.value)
                    }} />

                    <button onClick={() =>{updateBotao(val.nome)}}>Update</button>
            </div>
         );
        })}
      </div>

    </div>
  );

}

export default App;
