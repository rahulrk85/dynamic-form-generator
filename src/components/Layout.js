// Layout.js
import React, { useState } from "react";
import JsonEditor from "./JsonEditor";
import FormGenerator from "./FormGenerator";
import data from "./data";

const Layout = () => {
  const [schema, setSchema] = useState({
    fields: [
      { label: "Name",description:"this is just an example paste the json from the readme file of my repo!", id: "name", type: "text" },
      { label: "Age",description:"this is just an example paste the json from the readme file of my repo!", id: "age", type: "number" },
    ],
  });

  const details = data;

  return (
    <div className="flex flex-col md:flex-row justify-between items-start gap-6 p-6 bg-white rounded-lg shadow-md max-w-6xl mx-auto dark:bg-gray-900">
      <div className="flex-1 w-full md:w-1/2">
        <h3 className="text-2xl font-semibold mb-4 dark:text-white">JSON Editor</h3>
        <JsonEditor schema={schema} onChange={setSchema} />
      </div>
      <div style={{ flex: 1 }}>
        <h3 className="text-2xl font-semibold mb-4 dark:text-white">Generated Form</h3>
        <FormGenerator schema={schema} details = {details}/>
      </div>
    </div>
  );
};

export default Layout;
