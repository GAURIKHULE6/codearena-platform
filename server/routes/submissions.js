// routes/submissions.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// ✅ Save Submission & Handle Scoring
router.post('/', (req, res) => {
  const { user_id, problem_id, code, output, is_correct } = req.body;

  console.log("📥 Submission Received:", {
    user_id,
    problem_id,
    is_correct
  });

  const insertQuery = `
    INSERT INTO submissions (user_id, problem_id, code, output, is_correct)
    VALUES (?, ?, ?, ?, ?)
  `;

  // Step 1: Save the submission
  db.query(insertQuery, [user_id, problem_id, code, output, is_correct], (err, result) => {
    if (err) {
      console.error('❌ DB Insert Error:', err);
      return res.status(500).json({ message: 'Database error', error: err });
    }

    // Step 2: If submission is correct, check for first-time correct submission
    if (is_correct) {
      const checkQuery = `
        SELECT COUNT(*) AS count FROM submissions
        WHERE user_id = ? AND problem_id = ? AND is_correct = 1
      `;

      db.query(checkQuery, [user_id, problem_id], (err, results) => {
        if (err) {
          console.error('❌ DB Check Error:', err);
          return res.status(500).json({ message: 'Check error', error: err });
        }

        const correctCount = results[0].count;
        console.log(`✅ Correct Submissions So Far: ${correctCount}`);

        if (correctCount === 1) {
          // Step 3: First correct attempt – update the score
          const updateScoreQuery = `
            UPDATE users SET score = score + 10 WHERE id = ?
          `;

          db.query(updateScoreQuery, [user_id], (err) => {
            if (err) {
              console.error('❌ Score Update Error:', err);
              return res.status(500).json({ message: 'Score update failed', error: err });
            }

            return res.status(201).json({
              message: '✅ Submission saved & score updated!',
              submission_id: result.insertId
            });
          });
        } else {
          // Already scored for this problem before
          return res.status(201).json({
            message: '✅ Submission saved (already scored previously).',
            submission_id: result.insertId
          });
        }
      });
    } else {
      // Incorrect submission – only save
      return res.status(201).json({
        message: '⚠️ Submission saved (incorrect).',
        submission_id: result.insertId
      });
    }
  });
});

module.exports = router;
