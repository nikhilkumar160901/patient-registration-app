import { useState } from 'react';
import { db } from '../db/initDB';

export default function SQLQuery() {
  const [query, setQuery] = useState('SELECT * FROM patients');
  const [results, setResults] = useState<any[]>([]);

  const execute = async () => {
    const result = await db.query(query);
    setResults(result.rows);
  };

  return (
    <div>
      <textarea value={query} onChange={(e) => setQuery(e.target.value)} rows={4} cols={50} />
      <button onClick={execute}>Run SQL</button>
      <table>
        <thead>
          <tr>
            {results[0] && Object.keys(results[0]).map((key) => <th key={key}>{key}</th>)}
          </tr>
        </thead>
        <tbody>
          {results.map((row, idx) => (
            <tr key={idx}>
              {Object.values(row).map((val, i) => <td key={i}>{String(val)}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
