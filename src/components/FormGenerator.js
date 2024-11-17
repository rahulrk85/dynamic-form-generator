// src/components/FormGenerator.js

import React, { useState } from 'react';

const FormGenerator = ({ schema }) => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  const handleChange = (id, value) => {
    setFormData({ ...formData, [id]: value });
    if (errors[id]) {
      setErrors({ ...errors, [id]: "" }); // Clear error when value is updated
    }
  };

  const downloadJSON = () => {
  const blob = new Blob([JSON.stringify(formData, null, 2)], { type: "application/json" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "form-submission.json";
  link.click();
};

  const handleBlur = (field) => {
    const { id, required, validation } = field;
    const value = formData[id];

    // Required field validation
    if (required && !value) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [id]: "This field is required",
      }));
      return;
    }

    // Validation for email type
    if (field.type === "email" && validation?.pattern && value) {
      const regex = new RegExp(validation.pattern);
      if (!regex.test(value)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [id]: validation.message || "Invalid email format",
        }));
      }
    }
  };

  const renderField = (field) => {
    switch (field.type) {
      case "text":
      case "number":
      case "email":
        return (
          <div className="mb-4 ">
            <input
              type={field.type}
              id={field.id}
              value={formData[field.id] || ""}
              onChange={(e) => handleChange(field.id, e.target.value)}
              onBlur={() => handleBlur(field)}
              placeholder={field.placeholder || ""}
              className="w-[350px] p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
            {errors[field.id] && (
              <p className="text-red-500 text-sm mt-1">{errors[field.id]}</p>
            )}
          </div>
        );

      case "textarea":
        return (
          <div className="mb-4">
            <textarea
              id={field.id}
              value={formData[field.id] || ""}
              onChange={(e) => handleChange(field.id, e.target.value)}
              onBlur={() => handleBlur(field)}
              rows={field.rows || 4}
              placeholder={field.placeholder || ""}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none dark:text-white"
            />
            {errors[field.id] && (
              <p className="text-red-500 text-sm mt-1">{errors[field.id]}</p>
            )}
          </div>
        );

      case "select":
        return (
          <div className="mb-4">
            <select
              id={field.id}
              value={formData[field.id] || ""}
              onChange={(e) => handleChange(field.id, e.target.value)}
              onBlur={() => handleBlur(field)}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
            >
              <option value="" disabled>
                {field.placeholder || "Select an option"}
              </option>
              {field.options?.map((option, idx) => (
                <option key={idx} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors[field.id] && (
              <p className="text-red-500 text-sm mt-1">{errors[field.id]}</p>
            )}
          </div>
        );

      case "radio":
        return (
          <div className="mb-4">
            {field.options?.map((option, idx) => (
              <label key={idx} className="block mb-2 dark:text-white">
                <input
                  type="radio"
                  id={`${field.id}-${option.value}`}
                  name={field.id}
                  value={option.value}
                  checked={formData[field.id] === option.value}
                  onChange={() => handleChange(field.id, option.value)}
                  onBlur={() => handleBlur(field)}
                  className="mr-2"
                />
                {option.label}
              </label>
            ))}
            {errors[field.id] && (
              <p className="text-red-500 text-sm mt-1">{errors[field.id]}</p>
            )}
          </div>
        );

      default:
        return <p className="text-red-500">Unsupported field type: {field.type}</p>;
    }
  };

  const handleSubmit = () => {
    console.log("Form Submitted", formData);
  };

  return (
    <div className="flex-1 w-full md:w-1/2">
      <form className="space-y-6" onSubmit={handleSubmit}>
        {schema.fields.map((field, idx) => (
          <div key={idx} className="mb-6">
            <label
              htmlFor={field.id}
              className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-500"
            >
              {field.label}
            </label>
            {renderField(field)}
          </div>
        ))}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Submit
        </button>
      </form>
    <button
      type="button"
      onClick={downloadJSON}
      className="w-full bg-green-500 text-white py-3 rounded-md hover:bg-green-600 mt-4"
    >
      Download Form Submission as JSON
    </button>
  </div>
  );
};

export default FormGenerator;
