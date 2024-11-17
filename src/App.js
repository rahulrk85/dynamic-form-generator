// src/App.js

import React, { useState } from 'react';
import Layout from './components/Layout';
import JsonEditor from './components/JsonEditor';
import FormGenerator from './components/FormGenerator';
import data from './components/data';

const schema = {
  fields: [
    {
      id: "name",
      label: "Name",
      type: "text",
      placeholder: "Enter your name",
      required: true,
    },
    {
      id: "email",
      label: "Email",
      type: "email",
      placeholder: "Enter your email",
      required: true,
      validation: {
        pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
        message: "Please enter a valid email address",
      },
    },
    {
      id: "description",
      label: "Description",
      type: "textarea",
      placeholder: "Enter a brief description",
      rows: 5,
    },
    {
      id: "gender",
      label: "Gender",
      type: "radio",
      required: true,
      options: [
        { label: "Male", value: "male" },
        { label: "Female", value: "female" },
      ],
    },
  ],
};

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const details = data

  return (
    <div className={darkMode ? "dark dark:bg-black h-[100vh]" : "h-[100vh]"}>
      <button
        onClick={toggleDarkMode}
        className="p-2 m-4 bg-gray-800 text-white rounded-md"
      >
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>
      <h1 className='text-4xl text-center font-semibold mb-4 dark:text-white'>{details.formTitle ? details.formTitle : "Dynamic Form Generator"}</h1>
      <p className='text-center font-semibold mb-4 dark:text-white'>{details?.formDescription}</p>
      <Layout>
        <JsonEditor schema={schema} />
        <FormGenerator schema={schema} />
      </Layout>
    </div>
  );
};

export default App;
