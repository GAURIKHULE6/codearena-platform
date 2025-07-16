// routes/submissions.js
const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/', (req, res) => {
  const { user_id, problem_id, code, output, is_correct } = req.body;

  console.log("📩 Received:", req.body);

  const sql = `
    INSERT INTO submissions (user_id, problem_id, code, output, is_correct)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(sql, [user_id, problem_id, code, output, is_correct], (err, result) => {
    if (err) {
      console.error('❌ DB Error:', err);
      return res.status(500).json({ message: 'Database error', error: err });
    }
    res.status(201).json({ message: '✅ Submission saved!', id: result.insertId });
  });
});

module.exports = router;
