"use client"; // This directive is specific to Next.js, indicating that this component is for client-side rendering

import { useState } from "react"; // Import the useState hook from React to manage state

// Define an interface for Job objects, ensuring each job has an id (number) and a name (string)
interface Job {
  id: number;
  name: string;
}

function App() {
  // State to hold the current job input from the user
  const [job, setJob] = useState<string>(''); 

  // State to hold the list of jobs, initializing with data from localStorage
  const [jobs, setJobs] = useState<Job[]>(() => {
    // Retrieve the jobs from localStorage and parse them into an array of Job objects
    const storageJobs = JSON.parse(localStorage.getItem('jobs') || '[]') as Job[];
    console.log(storageJobs); // Log the jobs to the console for debugging
    return storageJobs; // Return the parsed jobs
  });

  // Function to handle when the user submits a new job
  const handleSubmit = () => {
    // Update the jobs state by adding a new job
    setJobs(prev => {
      // Create a new array by appending the new job to the previous list of jobs
      const newJobs = [...prev, { id: Date.now(), name: job }]; // Adding a unique ID (using current timestamp) for each job

      // Convert the new list of jobs to a JSON string
      const jsonJobs = JSON.stringify(newJobs);
      
      // Save the updated list of jobs to localStorage
      localStorage.setItem('jobs', jsonJobs);

      return newJobs; // Return the new list of jobs
    });

    // Clear the current job input field
    setJob('');
  };

  return (
    <div style={{ padding: 32 }}>
      {/* Input field for the user to enter a new job */}
      <input
        value={job} // Bind the input value to the 'job' state
        onChange={e => setJob(e.target.value)} // Update the 'job' state when the user types in the input field
      />
      {/* Button to trigger the handleSubmit function */}
      <button onClick={handleSubmit}>Add</button>
      <ul>
        {/* Map over the jobs array and display each job as a list item */}
        {jobs.map((job, index) => (
          <li key={job.id}>{job.name}</li> // Using job.id as the key for better performance and unique identification
        ))}
      </ul>
    </div>
  );
}

export default App; // Export the App component so it can be used in other parts of the app
