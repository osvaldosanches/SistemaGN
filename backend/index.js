require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/get", (req, res) => {
    const sqlSelect = "SELECT * FROM norma;";

    db.query(sqlSelect, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send({ error: "Erro ao consultar normas." });
        }
        res.send(result);
    });
});

app.post("/api/insert", (req, res) => {
    const { nome, descricao } = req.body;

    if (!nome || !descricao) {
        return res.status(400).send({ error: "Campos 'nome' e 'descricao' são obrigatórios." });
    }

    const sqlInsert = "INSERT INTO norma (nome, descrição) VALUES (?, ?);";

    db.query(sqlInsert, [nome, descricao], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send({ error: "Erro ao inserir norma." });
        }
        res.status(201).send({ id: result.insertId, nome, descricao });
    });
});

app.delete("/api/delete/:id", (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
        return res.status(400).send({ error: "Parâmetro 'id' inválido." });
    }

    const sqlDelete = "DELETE FROM norma WHERE id = ?;";

    db.query(sqlDelete, [id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send({ error: "Erro ao excluir norma." });
        }
        if (result.affectedRows === 0) {
            return res.status(404).send({ error: "Norma não encontrada." });
        }
        res.send({ id });
    });
});

app.put("/api/update", (req, res) => {
    const { id, descricao } = req.body;

    if (!Number.isInteger(id) || !descricao) {
        return res.status(400).send({ error: "Campos 'id' e 'descricao' são obrigatórios." });
    }

    const sqlUpdate = "UPDATE norma SET descrição = ? WHERE id = ?;";

    db.query(sqlUpdate, [descricao, id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send({ error: "Erro ao atualizar norma." });
        }
        if (result.affectedRows === 0) {
            return res.status(404).send({ error: "Norma não encontrada." });
        }
        res.send({ id, descricao });
    });
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`running on port ${port}`);
});
