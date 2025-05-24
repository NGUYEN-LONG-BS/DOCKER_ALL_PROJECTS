// components/ReactHooksCheatSheet.tsx
'use client';

import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import vscDarkPlus from 'react-syntax-highlighter/dist/esm/styles/prism/vsc-dark-plus';

export default function ReactHooksCheatSheet() {
  const [activeTab, setActiveTab] = useState('useState');

  const hooks = [
    { id: 'useState', label: 'useState' },
    { id: 'useEffect', label: 'useEffect' },
    { id: 'useContext', label: 'useContext' },
    { id: 'useReducer', label: 'useReducer' },
    { id: 'useCallback', label: 'useCallback' },
    { id: 'useMemo', label: 'useMemo' },
    { id: 'useRef', label: 'useRef' },
    { id: 'useLayoutEffect', label: 'useLayoutEffect' },
  ];

  return (
    <>
      <h1>
        <i className="fa-brands fa-react me-2" />
        React Hooks Cheat Sheet
      </h1>

      <div className="container">
        <ul className="nav nav-tabs" id="hookTabs" role="tablist">
          {hooks.map((hook) => (
            <li key={hook.id} className="nav-item" role="presentation">
              <button
                className={`nav-link ${activeTab === hook.id ? 'active' : ''}`}
                onClick={() => setActiveTab(hook.id)}
                type="button"
                role="tab"
              >
                {hook.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="tab-content" id="hookTabsContent">
          {/* useState */}
          <div className={`tab-pane fade ${activeTab === 'useState' ? 'show active' : ''}`} id="useState" role="tabpanel">
            <div className="card">
              <div className="card-header">
                <h2>
                  <i className="fa-solid fa-circle-notch me-2" />
                  useState
                </h2>
              </div>
              <div className="card-body">
                <div className="hook-info">
                  <p>Hook cơ bản để quản lý trạng thái trong component.</p>
                </div>
                <SyntaxHighlighter language="jsx" style={vscDarkPlus} customStyle={{ borderRadius: '8px', padding: '1.25rem' }}>
                  {`
import { useState } from 'react';

const [state, setState] = useState(initialValue);
setState(newValue);

// Example:
const [count, setCount] = useState(0);
const increment = () => setCount(count + 1);
                  `}
                </SyntaxHighlighter>
                <div className="key-points">
                  <ul>
                    <li><b>useState(initialValue):</b> Khởi tạo state với giá trị ban đầu.</li>
                    <li><b>state:</b> Giá trị trạng thái hiện tại.</li>
                    <li><b>setState:</b> Hàm cập nhật trạng thái.</li>
                  </ul>
                  <ul>
                    <p><b>LƯU Ý:</b></p>
                    <li>Component được re-render sau khi 'setState'.</li>
                    <li>Inittial state chỉ dùng cho lần đầu.</li>
                    <li>Set state với callback?.</li>
                    <li>Initial state với callback?.</li>
                    <li>Set state là thay thế state với giá trị mới.</li>
                  </ul>
                  <ul>
                    <p><b>Ứng dụng:</b></p>
                    <li>1. Random number - với typescript trong Next.js 15</li>
                    <SyntaxHighlighter language="jsx" style={vscDarkPlus} customStyle={{ borderRadius: '8px', padding: '1.25rem' }}>
                      {`
"use client" // This directive is specific to Next.js, indicating that this component is for the client-side rendering

import { useState } from "react";

// Declaring an array of possible gifts
const gifts: string[] = [
    'CPU i9',
    'RAM 32GB RGB',
    'RGB Keyboard',
];

// The main functional component
function App() {
    const [gift, setGift] = useState<string | undefined>(undefined); // Initial state is undefined, and the type of state can be either a string or undefined

    const randomGift = () => {
        const index = Math.floor(Math.random() * gifts.length); // Generate a random index based on the length of the gifts array
        setGift(gifts[index]);  // Set the state to the randomly selected gift
    };

    return (
      <div style={{ padding: 32 }}>
        <h1>{gift || 'Chưa có phần thưởng'}</h1>    {/* If there is a gift selected, display it. Otherwise, display 'Chưa có phần thưởng' */}
        <button onClick={randomGift}>Lấy thưởng</button>
      </div>
    );
}

export default App; // Export the App component to be used in other parts of the app
                      `}
                    </SyntaxHighlighter>
                    <li>2. Two-way binding - với check box</li>
                    <SyntaxHighlighter language="jsx" style={vscDarkPlus} customStyle={{ borderRadius: '8px', padding: '1.25rem' }}>
                      {`
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
      // Check if the current course ID is already in the checked array
      const isChecked = checked.includes(id);           
      // If it's checked, remove it from the checked array
      if (isChecked) {
        return checked.filter((item) => item !== id);   
      } else {  // If it's not checked, add it to the checked array
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
    <div style={{ padding: 32 }}>                   {/* Container with padding for styling */}
      {/* loop through the courses array and render each course */}
      {courses.map((course) => (
        <div key={course.id}>                       {/* Render each course dynamically */}
          <input
            type="checkbox"                               {/* Checkbox element */}
            checked={checked.includes(course.id)}         {/* Check if the course ID is in the checked array */}
            onChange={() => handleCheck(course.id)}       {/* Call the handleCheck function when the checkbox is clicked */}
          />
          {course.name}                                   {/* Display the name of the course */}
        </div>
      ))}
      <button onClick={handleSubmit}>Register</button>    {/* Button to submit the selected courses */}
    </div>
  );
}

export default App; // Export the App component so it can be used in other parts of the app
                      `}
                    </SyntaxHighlighter>
                    <li>3. Todo list.</li>
                    <SyntaxHighlighter language="jsx" style={vscDarkPlus} customStyle={{ borderRadius: '8px', padding: '1.25rem' }}>
                      {`
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
  
  {/* State to hold the list of jobs, initializing with data from localStorage */}
  const [jobs, setJobs] = useState<Job[]>(() => {
    // Retrieve the jobs from localStorage and parse them into an array of Job objects
    const storageJobs = JSON.parse(localStorage.getItem('jobs') || '[]') as Job[];
    console.log(storageJobs); // Log the jobs to the console for debugging
    return storageJobs; // Return the parsed jobs
  });

  {/* Function to handle when the user submits a new job */}
  const handleSubmit = () => {
    // Update the jobs state by adding a new job
    setJobs(prev => {
      // Create a new array by appending the new job to the previous list of jobs
      const newJobs = [...prev, { id: Date.now(), name: job }]; // Adding a unique ID for each job

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
          <li key={job.id}>{job.name}</li> // Using job.id as the key for better performance
        ))}
      </ul>
    </div>
  );
}

export default App; {/* Export the App component so it can be used in other parts of the app */}
                      `}
                    </SyntaxHighlighter>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* useEffect */}
          <div className={`tab-pane fade ${activeTab === 'useEffect' ? 'show active' : ''}`} id="useEffect" role="tabpanel">
            <div className="card">
              <div className="card-header">
                <h2>
                  <i className="fa-solid fa-bolt me-2" />
                  useEffect
                </h2>
              </div>
              <div className="card-body">
                <div className="hook-info">
                  <div>
                    <p>Trong React, hook useEffect được sử dụng để xử lý các side effects (như gọi API, cập nhật DOM, hoặc thiết lập sự kiện).</p>
                    <p>Cách bạn truyền tham số thứ hai (dependency array) vào useEffect sẽ quyết định khi nào callback được chạy. Dưới đây là sự phân biệt rõ ràng giữa ba trường hợp: useEffect(callback), useEffect(callback, []), và useEffect(callback, [deps]).</p>
                  </div>
                </div>

                <div className="key-points">
                  <ul>
                    <p><b>1. useEffect(callback):</b></p>
                    <li><b>Ý nghĩa:</b> Không có dependency array.</li>
                    <li><b>Hành vi:</b> Callback sẽ chạy sau mỗi lần render của component (bao gồm cả lần render đầu tiên).</li>
                    <li><b>Khi nào dùng:</b> Khi bạn muốn side effect chạy mỗi khi component re-render, bất kể nguyên nhân gì (thay đổi state, props, hoặc bất kỳ cập nhật nào).</li>
                    <li><b>Ví dụ:</b></li>
                    <SyntaxHighlighter language="jsx" style={vscDarkPlus} customStyle={{ borderRadius: '8px', padding: '1.25rem' }}>
                      {`
import { useEffect } from 'react';
function MyComponent() {
  useEffect(() => {
    console.log('Effect ran after every render');
  });
  return <div>Hello</div>;
}
                      `}
                    </SyntaxHighlighter>
                  </ul>
                  <ul>
                    <p><b>LƯU Ý:</b></p>
                    <li>Có thể gây ra vấn đề hiệu suất nếu side effect chạy nhiều lần gây tốn tài nguyên (ví dụ: gọi API liên tục).</li>
                    <li>Ít được sử dụng trong thực tế vì thường cần kiểm soát khi nào effect chạy.</li>
                  </ul>
                </div>

                <div className="key-points">
                  <ul>
                    <p><b>2. useEffect(callback, []):</b></p>
                    <li><b>Ý nghĩa:</b> Dependency array rỗng.</li>
                    <li><b>Hành vi:</b> Callback chỉ chạy một lần duy nhất khi component mount (được thêm vào DOM).</li>
                    <li><b>Khi nào dùng:</b> Khi bạn muốn thực hiện side effect chỉ một lần, tương tự như componentDidMount trong class component (ví dụ: gọi API ban đầu, thiết lập sự kiện toàn cục).</li>
                    <li><b>Ví dụ:</b></li>
                    <SyntaxHighlighter language="jsx" style={vscDarkPlus} customStyle={{ borderRadius: '8px', padding: '1.25rem' }}>
                      {`
import { useEffect } from 'react';

function MyComponent() {
  useEffect(() => {
    console.log('Effect ran only once on mount');
    // Ví dụ: gọi API hoặc thiết lập event listener
    window.addEventListener('resize', handleResize);
    
    // Cleanup (chạy khi component unmount)
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Mảng rỗng
  return <div>Hello</div>;
}
                      `}
                    </SyntaxHighlighter>
                  </ul>
                  <ul>
                    <p><b>LƯU Ý:</b></p>
                    <li>Rất phổ biến để thực hiện các tác vụ khởi tạo một lần.</li>
                    <li>Nếu có cleanup function (trả về từ callback), nó sẽ chạy khi component unmount.</li>
                  </ul>
                </div>

                <div className="key-points">
                  <ul>
                    <p><b>3. useEffect(callback, [deps]):</b></p>
                    <li><b>Ý nghĩa:</b> Dependency array chứa một hoặc nhiều dependencies (các biến/state/props).</li>
                    <li><b>Hành vi:</b> Callback chạy khi component mount và mỗi khi bất kỳ dependency nào trong mảng thay đổi (so sánh shallow).</li>
                    <li><b>Khi nào dùng:</b> Khi bạn muốn side effect chỉ chạy khi các giá trị cụ thể (dependencies) thay đổi (ví dụ: cập nhật dữ liệu khi state hoặc prop thay đổi).</li>
                    <li><b>Ví dụ:</b></li>
                    <SyntaxHighlighter language="jsx" style={vscDarkPlus} customStyle={{ borderRadius: '8px', padding: '1.25rem' }}>
                      {`
import { useEffect, useState } from 'react';

function MyComponent({ userId }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    console.log('Effect ran because userId changed');
    // Gọi API dựa trên userId
    fetch(\`/api/user/\${userId}\`)
      .then(res => res.json())
      .then(setData);
  }, [userId]); // Chạy lại khi userId thay đổi

  return <div>Data: {data?.name}</div>;
}
                      `}
                    </SyntaxHighlighter>
                  </ul>
                  <ul>
                    <p><b>LƯU Ý:</b></p>
                    <li>Chỉ các giá trị được liệt kê trong [deps] mới kích hoạt callback khi thay đổi.</li>
                    <li>Nếu quên liệt kê một dependency mà callback sử dụng, có thể gây lỗi logic (ESLint rule react-hooks/exhaustive-deps sẽ cảnh báo).</li>
                  </ul>
                </div>

                <div className="key-points">
                  <ul>
                    <p><b>So sánh tổng quan</b></p>
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th scope="col">Trường hợp</th>
                          <th scope="col">Dependency Array</th>
                          <th scope="col">Khi nào chạy callback?</th>
                          <th scope="col">Use case điển hình</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>useEffect(callback)</td>
                          <td>Không có</td>
                          <td>Sau mỗi render</td>
                          <td>Theo dõi mọi thay đổi, hiếm dùng</td>
                        </tr>
                        <tr>
                          <td>useEffect(callback, [])</td>
                          <td>Mảng rỗng ([])</td>
                          <td>Chỉ một lần khi mount</td>
                          <td>Khởi tạo ban đầu, thiết lập sự kiện</td>
                        </tr>
                        <tr>
                          <td>useEffect(callback, [deps])</td>
                          <td>Mảng có dependencies</td>
                          <td>Khi mount và khi deps thay đổi</td>
                          <td>Phản ứng với thay đổi của state/props cụ thể</td>
                        </tr>
                      </tbody>
                    </table>
                  </ul>
                </div>

                <div className="key-points">
                  <ul>
                    <p><b>Một số lưu ý chung:</b></p>
                    <li><b>Cleanup:</b> Nếu callback trả về một hàm (cleanup function), hàm này sẽ chạy trước khi effect chạy lại hoặc khi component unmount. Ví dụ:</li>
                    <SyntaxHighlighter language="jsx" style={vscDarkPlus} customStyle={{ borderRadius: '8px', padding: '1.25rem' }}>
                      {`
useEffect(() => {
  const timer = setInterval(() => console.log('Tick'), 1000);
  return () => clearInterval(timer); // Cleanup
}, []);
                      `}
                    </SyntaxHighlighter>
                    <li><b>Hiệu suất:</b> Tránh lạm dụng useEffect không có dependency array vì có thể gây render không cần thiết. Luôn xác định dependencies rõ ràng.</li>
                    <li><b>Debug:</b> Nếu effect chạy không như mong muốn, kiểm tra dependencies trong mảng [deps] và đảm bảo chúng được liệt kê đầy đủ.</li>
                    <li><b>Ví dụ minh họa cả 3 trường hợp:</b></li>
                    <SyntaxHighlighter language="jsx" style={vscDarkPlus} customStyle={{ borderRadius: '8px', padding: '1.25rem' }}>
                      {`
import { useEffect, useState } from 'react';

function ExampleComponent({ userId }) {
  const [count, setCount] = useState(0);

  // Trường hợp 1: Chạy sau mỗi render
  useEffect(() => {
    console.log('This runs after EVERY render');
  });

  // Trường hợp 2: Chạy chỉ một lần khi mount
  useEffect(() => {
    console.log('This runs ONCE on mount');
    return () => console.log('Cleanup on unmount');
  }, []);

  // Trường hợp 3: Chạy khi userId hoặc count thay đổi
  useEffect(() => {
    console.log('This runs when userId or count changes');
  }, [userId, count]);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Increment: {count}</button>
    </div>
  );
}
                      `}
                    </SyntaxHighlighter>
                  </ul>
                  <ul>
                    <p><b>Kết luận:</b></p>
                    <li>Dùng <b>useEffect(callback)</b> khi cần theo dõi mọi render (hiếm).</li>
                    <li>Dùng <b>useEffect(callback, [])</b> cho tác vụ chạy một lần khi mount (phổ biến).</li>
                    <li>Dùng <b>useEffect(callback, [deps])</b> để phản ứng với thay đổi cụ thể của state/props (phổ biến nhất).</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* useContext */}
          <div className={`tab-pane fade ${activeTab === 'useContext' ? 'show active' : ''}`} id="useContext" role="tabpanel">
            <div className="card">
              <div className="card-header">
                <h2>
                  <i className="fa-solid fa-network-wired me-2" />
                  useContext
                </h2>
              </div>
              <div className="card-body">
                <div className="hook-info">
                  <p>Truy cập giá trị Context mà không cần props drilling.</p>
                </div>
                <SyntaxHighlighter language="jsx" style={vscDarkPlus} customStyle={{ borderRadius: '8px', padding: '1.25rem' }}>
                  {`
import { useContext } from 'react';

const MyContext = React.createContext();
const value = useContext(MyContext);
                  `}
                </SyntaxHighlighter>
                <div className="key-points">
                  <ul>
                    <li><b>useContext(Context):</b> Trả về giá trị hiện tại của Context.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* useReducer */}
          <div className={`tab-pane fade ${activeTab === 'useReducer' ? 'show active' : ''}`} id="useReducer" role="tabpanel">
            <div className="card">
              <div className="card-header">
                <h2>
                  <i className="fa-solid fa-cogs me-2" />
                  useReducer
                </h2>
              </div>
              <div className="card-body">
                <div className="hook-info">
                  <p>Quản lý trạng thái phức tạp, tương tự Redux.</p>
                </div>
                <SyntaxHighlighter language="jsx" style={vscDarkPlus} customStyle={{ borderRadius: '8px', padding: '1.25rem' }}>
                  {`
import { useReducer } from 'react';

const initialState = { count: 0 };
const reducer = (state, action) => {
  switch (action.type) {
    case 'increment': return { count: state.count + 1 };
    default: return state;
  }
};

const [state, dispatch] = useReducer(reducer, initialState);
dispatch({ type: 'increment' });
                  `}
                </SyntaxHighlighter>
                <div className="key-points">
                  <ul>
                    <li><b>useReducer(reducer, initialState):</b> Quản lý state phức tạp.</li>
                    <li><b>dispatch:</b> Gửi action để cập nhật state.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* useCallback */}
          <div className={`tab-pane fade ${activeTab === 'useCallback' ? 'show active' : ''}`} id="useCallback" role="tabpanel">
            <div className="card">
              <div className="card-header">
                <h2>
                  <i className="fa-solid fa-memory me-2" />
                  useCallback
                </h2>
              </div>
              <div className="card-body">
                <div className="hook-info">
                  <p>Tối ưu hóa hàm callback giữa các lần render.</p>
                </div>
                <SyntaxHighlighter language="jsx" style={vscDarkPlus} customStyle={{ borderRadius: '8px', padding: '1.25rem' }}>
                  {`
import { useCallback } from 'react';

const handleClick = useCallback(() => {
  console.log('Clicked');
}, []);
                  `}
                </SyntaxHighlighter>
                <div className="key-points">
                  <ul>
                    <li><b>useCallback(callback, [deps]):</b> Memoized callback.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* useMemo */}
          <div className={`tab-pane fade ${activeTab === 'useMemo' ? 'show active' : ''}`} id="useMemo" role="tabpanel">
            <div className="card">
              <div className="card-header">
                <h2>
                  <i className="fa-solid fa-calculator me-2" />
                  useMemo
                </h2>
              </div>
              <div className="card-body">
                <div className="hook-info">
                  <p>Tối ưu hóa giá trị tính toán nặng.</p>
                </div>
                <SyntaxHighlighter language="jsx" style={vscDarkPlus} customStyle={{ borderRadius: '8px', padding: '1.25rem' }}>
                  {`
import { useMemo } from 'react';

const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
                  `}
                </SyntaxHighlighter>
                <div className="key-points">
                  <ul>
                    <li><b>useMemo(factory, [deps]):</b> Memoized computed value.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* useRef */}
          <div className={`tab-pane fade ${activeTab === 'useRef' ? 'show active' : ''}`} id="useRef" role="tabpanel">
            <div className="card">
              <div className="card-header">
                <h2>
                  <i className="fa-solid fa-link me-2" />
                  useRef
                </h2>
              </div>
              <div className="card-body">
                <div className="hook-info">
                  <p>Tham chiếu DOM hoặc lưu giá trị không gây re-render.</p>
                </div>
                <SyntaxHighlighter language="jsx" style={vscDarkPlus} customStyle={{ borderRadius: '8px', padding: '1.25rem' }}>
                  {`
import { useRef } from 'react';

const inputRef = useRef(null);
inputRef.current.focus();
                  `}
                </SyntaxHighlighter>
                <div className="key-points">
                  <ul>
                    <li><b>useRef(initialValue):</b> Trả về object với thuộc tính current.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* useLayoutEffect */}
          <div className={`tab-pane fade ${activeTab === 'useLayoutEffect' ? 'show active' : ''}`} id="useLayoutEffect" role="tabpanel">
            <div className="card">
              <div className="card-header">
                <h2>
                  <i className="fa-solid fa-paint-roller me-2" />
                  useLayoutEffect
                </h2>
              </div>
              <div className="card-body">
                <div className="hook-info">
                  <p>Chạy side effects trước khi DOM được vẽ.</p>
                </div>
                <SyntaxHighlighter language="jsx" style={vscDarkPlus} customStyle={{ borderRadius: '8px', padding: '1.25rem' }}>
                  {`
import { useLayoutEffect } from 'react';

useLayoutEffect(() => {
  // DOM manipulations
}, [dependencies]);
                  `}
                </SyntaxHighlighter>
                <div className="key-points">
                  <ul>
                    <li><b>useLayoutEffect(callback, [deps]):</b> Chạy trước khi browser vẽ.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}