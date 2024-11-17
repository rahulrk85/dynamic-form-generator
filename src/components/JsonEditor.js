// JsonEditor.js
import React from "react";
import MonacoEditor from "react-monaco-editor";

const JsonEditor = ({ schema, onChange }) => {
  const handleEditorChange = (newValue) => {
    try {
      const parsedSchema = JSON.parse(newValue);
      onChange(parsedSchema);
    } catch {
      console.warn("Invalid JSON");
    }
  };
  const handleCopy = () => {
    const jsonString = JSON.stringify(schema, null, 2);
    navigator.clipboard.writeText(jsonString)
      .then(() => alert("JSON copied to clipboard!"))
      .catch((err) => alert("Failed to copy JSON: ", err));
  };

  return (
    <>
        <MonacoEditor
            height="400px"
            language="json"
            value={JSON.stringify(schema, null, 2)}
            onChange={handleEditorChange}
            options={{ automaticLayout: true }}
        />
        <button
            onClick={handleCopy}
            className="mt-4 w-[200px] bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        >
            Copy Form JSON
        </button>
    </>
  );
};

export default JsonEditor;
