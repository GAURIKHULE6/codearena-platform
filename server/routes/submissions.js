const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/', (req, res) => {
  const { user_id, problem_id, code, output, is_correct } = req.body;

  db.query(
    'INSERT INTO submissions (user_id, problem_id, code, output, is_correct) VALUES (?, ?, ?, ?, ?)',
    [user_id, problem_id, code, output, is_correct],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.send({ success: true, id: result.insertId });
    }
  );
});

router.get('/user/:user_id', (req, res) => {
  db.query(
    'SELECT * FROM submissions WHERE user_id = ?',
    [req.params.user_id],
    (err, results) => {
      if (err) return res.status(500).send(err);
      res.send(results);
    }
  );
});

module.exports = router;
