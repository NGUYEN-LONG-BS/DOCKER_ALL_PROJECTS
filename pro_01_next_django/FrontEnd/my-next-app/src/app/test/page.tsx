"use client"; // This directive is specific to Next.js, indicating that this component is for client-side rendering

import { useState } from "react"; // Import the useState hook from React to manage state

interface Job {
  id: number;
  name: string;
}

function App() {
  const [job, setJob] = useState<string>(''); // State to hold the current job input
  const [jobs, setJobs] = useState<Job[]>(() => {
    const storageJobs = JSON.parse(localStorage.getItem('jobs') || '[]') as Job[];
    console.log(storageJobs);
    return storageJobs;
  });

  const handleSubmit = () => {
    setJobs(prev => {
      const newJobs = [...prev, { id: Date.now(), name: job }]; // Adding a unique ID for each job

      // Save to local storage
      const jsonJobs = JSON.stringify(newJobs);
      localStorage.setItem('jobs', jsonJobs);

      return newJobs;
    });

    setJob('');
  };

  return (
    <div style={{ padding: 32 }}>
      <input
        value={job}
        onChange={e => setJob(e.target.value)}
      />
      <button onClick={handleSubmit}>Add</button>
      <ul>
        {jobs.map((job, index) => (
          <li key={job.id}>{job.name}</li> // Using job.id as the key for better performance
        ))}
      </ul>
    </div>
  );
}

export default App; // Export the App component so it can be used in other parts of the app
