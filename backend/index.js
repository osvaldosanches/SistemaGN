const express = require("express");
const bodyParse = require("body-parser");
const cors = require("cors");
const app = express();
const mysql = require("mysql");

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "password",
    database: "gn",
});

//app.get('/',(req,res)=>{
    //const sqlInsert = "INSERT INTO norma (id, nome, descricao, codigo, inicioVigencia, fimVigencia) VALUES ('4', 'Norma ambiental de PLA 010', 'Material PLA para fabricação de etiqueta plástica ou lacre de produto', '004', '01012021', '31122021');";
    //db.query(sqlInsert,(err,result)=>{
    //    console.log(err);
    //    res.send('hello Osvaldo teste2 ');
    //}); 

//});

app.get("/api/get",(req,res)=>{
    
    const sqlSelect = "SELECT * FROM NORMA;";
        
    db.query(sqlSelect,(err,result)=>{
        //
        console.log(result);        
        //console.log(err);
        //linhas para resolver o erro do console - o cabeçalho CORS 'Access-Control-Allow-Origin' não está presente
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.send(result);
        //res.send('hello Osvaldo teste2 ');
    }); 

});

app.use(cors());

app.use(express.json());

app.use(bodyParse.urlencoded({extended:true}));

app.post("/api/insert",(req,res)=>{
//app.post('/api/insert',(req,res)=>{   
    
    const nome = req.body.nome
    const descricao = req.body.descricao

    const sqlInsert = "INSERT INTO norma (id, nome, descricao, codigo, inicioVigencia, fimVigencia) VALUES ('8', ?, ?, '008', '01012021', '31122021');";
    
    
    db.query(sqlInsert,[nome, descricao],(err,result)=>{
        console.log(nome);
        console.log(descricao);
        console.log(result);        
        console.log(err); 
    }); 

});

app.delete("/api/delete/:nome", (req,res) =>{
    const nome = req.params.nome;
    const sqlDelete = "delete from norma where nome = ?;";
    
    db.query(sqlDelete, nome, (err, result)=>{

        console.log("osvaldo!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
        console.log(nome);
        console.log(err);
        console.log(result);
        
        if(err) console.log(err);
        
    });

})

app.put("/api/update", (req,res) =>{
    const nome = req.body.nome;
    const descricao = req.body.descricao;

    const sqlUpdate = "update norma set descricao = ? where nome = ?;";
    
    db.query(sqlUpdate, [descricao,nome], (err, result)=>{

        console.log("osvaldo!");
        console.log(nome);
        console.log(descricao);
        console.log(err);
        console.log(result);
        
        if(err) console.log(err);
        
    });

})

app.listen(3001,()=>{
    console.log("running on port 3001");
});