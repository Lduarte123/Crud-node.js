const express = require('express');
const router = express.Router();

let profissionais = [];
let idAtual = 1;

// CREATE
router.post('/', (req, res) => {
  const { nome, profissao, salario, setor, cidade, estado } = req.body;
  const novoProfissional = {
    matricula: idAtual++,
    nome,
    profissao,
    salario,
    setor,
    cidade,
    estado,
  };
  profissionais.push(novoProfissional);
  res.status(201).json(novoProfissional);
});

// READ ALL
router.get('/', (req, res) => {
  res.json(profissionais);
});

// READ ONE
router.get('/:matricula', (req, res) => {
  const matricula = parseInt(req.params.matricula);
  const profissional = profissionais.find(p => p.matricula === matricula);
  if (!profissional) {
    return res.status(404).json({ error: 'Profissional não encontrado' });
  }
  res.json(profissional);
});

// UPDATE
router.put('/:matricula', (req, res) => {
  const matricula = parseInt(req.params.matricula);
  const index = profissionais.findIndex(p => p.matricula === matricula);
  if (index === -1) {
    return res.status(404).json({ error: 'Profissional não encontrado' });
  }

  const { nome, profissao, salario, setor, cidade, estado } = req.body;
  profissionais[index] = {
    matricula,
    nome,
    profissao,
    salario,
    setor,
    cidade,
    estado,
  };

  res.json(profissionais[index]);
});

// DELETE
router.delete('/:matricula', (req, res) => {
  const matricula = parseInt(req.params.matricula);
  const index = profissionais.findIndex(p => p.matricula === matricula);
  if (index === -1) {
    return res.status(404).json({ error: 'Profissional não encontrado' });
  }

  profissionais.splice(index, 1);
  res.json({ message: 'Profissional deletado com sucesso' });
});

module.exports = router;
