import React, { useState } from 'react';
import axios from 'axios';

const Editor = ({ problem }) => {
  const [code, setCode] = useState(problem.starterCode || '');
  const [languageId, setLanguageId] = useState(problem.languageId || 71);
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [verdict, setVerdict] = useState('');

const handleRun = async () => {
  setOutput('⏳ Running...');
  setVerdict('');
  try {
    const submission = await axios.post(
      'https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true',
      {
        source_code: code,
        stdin: input,
        language_id: languageId,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-RapidAPI-Key': '19efc6ac41mshd0b8284c139aecbp158050jsn7e6f6aa3bc69',
          'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
        },
      }
    );

    const result = submission.data;
    if (result.stderr) {
      setOutput(result.stderr);
      setVerdict('❌ Error in execution.');
    } else if (result.compile_output) {
      setOutput(result.compile_output);
      setVerdict('❌ Compilation error.');
    } else {
      const actual = (result.stdout || '').trim();
      const expected = (problem.expectedOutput || '').trim();

      setOutput(actual);

      if (expected) {
        const isCorrect = actual === expected;
        if (isCorrect) {
          setVerdict('✅ Correct Output! 🎉');

          const scores = JSON.parse(localStorage.getItem('scores')) || {};
          scores[problem.id] = true;
          localStorage.setItem('scores', JSON.stringify(scores));
        } else {
          setVerdict('❌ Incorrect Output.');
        }

        // 👇 Submit to local backend
        const user = JSON.parse(localStorage.getItem('user')); // Make sure you store user info in localStorage
        if (user) {
          await axios.post('http://localhost:5000/api/submissions', {
            user_id: user.id,
            problem_id: problem.id,
            code,
            output: actual,
            is_correct: isCorrect,
          });
        }
      }
    }
  } catch (err) {
    setOutput('❌ Error running code.');
    setVerdict('❌ Failed to connect to server.');
    console.error(err);
  }
};
  return (
    <div className="editor-container">
      <label><strong>Language:</strong></label>
      <select
        value={languageId}
        onChange={(e) => setLanguageId(Number(e.target.value))}
      >
        <option value={71}>Python 3</option>
        <option value={54}>C++</option>
        <option value={62}>Java</option>
        <option value={63}>JavaScript</option>
        <option value={50}>C</option>
      </select>

      <textarea
        className="code-editor"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Write your code here..."
      />

      <label><strong>Custom Input:</strong></label>
      <textarea
        className="input-box"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Input for stdin..."
      />

      <button className="run-btn" onClick={handleRun}>▶️ Run Code</button>

      <label><strong>Output:</strong></label>
      <pre className="output-box">{output}</pre>

      {verdict && (
        <p style={{ fontWeight: 'bold', color: verdict.includes('✅') ? 'green' : 'red' }}>
          {verdict}
        </p>
      )}
    </div>
  );
};

export default Editor;
