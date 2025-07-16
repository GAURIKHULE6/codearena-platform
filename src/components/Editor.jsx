// ✅ UPDATED CODE EDITOR COMPONENT (CodeEditor.jsx)
import React, { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import axios from 'axios';
import '../style.css';

const CodeEditor = ({ problem, user }) => {
  const [code, setCode] = useState(problem?.starter_code || '');
  const [languageId, setLanguageId] = useState(problem?.language_id || 71);
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [verdict, setVerdict] = useState('');
  const [running, setRunning] = useState(false);

  const languageMap = {
    71: 'python', 54: 'cpp', 62: 'java', 63: 'javascript', 50: 'c'
  };

  useEffect(() => {
    if (problem) {
      setCode(problem.starter_code || '');
    }
  }, [problem]);

  const handleRun = async () => {
    setRunning(true);
    setOutput('');
    setVerdict('');

    try {
      const testCases = problem.test_cases
        ? JSON.parse(problem.test_cases)
        : [{ input, expected_output: problem.expected_output }];

      let allPassed = true;
      let combined = '';

      for (const tc of testCases) {
        const res = await axios.post(
          'https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true',
          {
            source_code: code,
            stdin: tc.input,
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

        const out = (res.data.stdout || '').trim();
        const exp = (tc.expected_output || '').trim();
        combined += `🧪 Input:\n${tc.input}\n✅ Expected:\n${exp}\n💡 Actual:\n${out}\n\n`;
        if (out !== exp) allPassed = false;
      }

      setOutput(combined.trim());
      setVerdict(allPassed ? '✅ All test cases passed!' : '❌ Some test cases failed.');

      if (user) {
        await axios.post('http://localhost:5000/api/submissions', {
          user_id: user.id,
          problem_id: problem.id,
          code,
          output: combined.trim(),
          is_correct: allPassed,
        });
      }
    } catch (e) {
      console.error(e);
      setOutput('❌ Error running code.');
      setVerdict('❌ Server error or invalid code.');
    } finally {
      setRunning(false);
    }
  };

  if (!problem) return <div className="no-problem">🛑 Please select a problem to solve.</div>;

  return (
    <div className="editor-container">
      <h2>💻 {problem.title}</h2>

      {/* ✅ Problem Details */}
<div className="problem-details">
  {problem.description && (
    <p><strong>Description:</strong> {problem.description}</p>
  )}
  {problem.input_format && (
    <p><strong>Input Format:</strong> <pre>{problem.input_format}</pre></p>
  )}
  {problem.output_format && (
    <p><strong>Output Format:</strong> <pre>{problem.output_format}</pre></p>
  )}
  {problem.constraints && (
    <p><strong>Constraints:</strong> <pre>{problem.constraints}</pre></p>
  )}
  {problem.sample_input && (
    <p><strong>Sample Input:</strong> <pre>{problem.sample_input}</pre></p>
  )}
  {problem.sample_output && (
    <p><strong>Sample Output:</strong> <pre>{problem.sample_output}</pre></p>
  )}
</div>

      {/* ✅ Language Selector */}
      <div className="editor-controls">
        <label><strong>Language:</strong></label>
        <select value={languageId} onChange={(e) => setLanguageId(Number(e.target.value))}>
          <option value={71}>Python</option>
          <option value={54}>C++</option>
          <option value={62}>Java</option>
          <option value={63}>JavaScript</option>
          <option value={50}>C</option>
        </select>
      </div>

      {/* ✅ Monaco Editor */}
      <Editor
        height="400px"
        theme="vs-dark"
        language={languageMap[languageId]}
        value={code}
        onChange={(value) => setCode(value)}
        options={{ fontSize: 14, minimap: { enabled: false } }}
      />

      {/* ✅ Input Field */}
      <label><strong>Custom Input (optional):</strong></label>
      <textarea
        className="input-box"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter input for manual testing"
      />

      {/* ✅ Run Code Button */}
      <button className="run-btn" onClick={handleRun} disabled={running}>
        {running ? '⏳ Running...' : '▶️ Run Code'}
      </button>

      {/* ✅ Output Section */}
      <label><strong>Output:</strong></label>
      <pre className="output-box">{output}</pre>

      {verdict && <p className="verdict">{verdict}</p>}
    </div>
  );
};

export default CodeEditor;
