"use client"; // This directive is specific to Next.js, indicating that this component is for client-side rendering

import { useState } from "react"; // Import the useState hook from React to manage state

// Define the type for course to provide better type safety
type Course = {
  id: number;  // Unique identifier for each course
  name: string;  // Name of the course
};

// Simulating the response from an API with a list of courses
const courses: Course[] = [
  {
    id: 1,
    name: 'HTML, CSS' // First course in the list
  },
  {
    id: 2,
    name: 'Javascript' // Second course in the list
  },
  {
    id: 3,
    name: 'ReactJS' // Third course in the list
  }
];

// Main component of the application
function App() {
  // useState hook to manage the state of checked courses. It holds an array of course IDs that are selected.
  const [checked, setChecked] = useState<number[]>([]); 

  // Function to handle checkbox selection (or deselection)
  const handleCheck = (id: number) => {
    setChecked((prev) => {
      const isChecked = checked.includes(id); // Check if the current course ID is already in the checked array
      if (isChecked) {
        // If it's checked, remove it from the checked array
        return checked.filter((item) => item !== id);
      } else {
        // If it's not checked, add it to the checked array
        return [...prev, id];
      }
    });
  };

  // Function to handle the submission of selected courses
  const handleSubmit = () => {
    // Output the selected course IDs (checked) to the console
    console.log({ ids: checked });
  };

  return (
    <div style={{ padding: 32 }}> {/* Container with padding for styling */}
      {courses.map((course) => (
        <div key={course.id}> {/* Render each course dynamically */}
          <input
            type="checkbox" // The input is a checkbox for each course
            checked={checked.includes(course.id)} // The checkbox will be checked if the course ID is in the 'checked' array
            onChange={() => handleCheck(course.id)} // When the checkbox is clicked, it calls handleCheck to update the state
          />
          {course.name} {/* Display the name of the course */}
        </div>
      ))}
      <button onClick={handleSubmit}>Register</button> {/* Button to submit the selected courses */}
    </div>
  );
}

export default App; // Export the App component so it can be used in other parts of the app
