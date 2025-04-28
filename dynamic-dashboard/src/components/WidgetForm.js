import React, { useState } from 'react';
import { useDashboard } from '../context/DashboardContext';
import { v4 as uuidv4 } from 'uuid';

const WidgetForm = ({ categoryId, onClose }) => {
  const { addWidget } = useDashboard();
  const [form, setForm] = useState({ name: '', text: '' });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!form.name || !form.text) return;

    addWidget(categoryId, { id: uuidv4(), ...form });
    setForm({ name: '', text: '' });
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white border p-4 rounded-md shadow mb-4">
      <div className="flex gap-2 mb-2">
        <input
          name="name"
          placeholder="Widget title"
          value={form.name}
          onChange={handleChange}
          className="flex-1 px-3 py-2 border rounded"
        />
        <input
          name="text"
          placeholder="Widget text"
          value={form.text}
          onChange={handleChange}
          className="flex-1 px-3 py-2 border rounded"
        />
      </div>
      <div className="flex gap-3">
        <button type="submit" className="bg-blue-600 text-white px-4 py-1 rounded">
          Add
        </button>
        <button type="button" onClick={onClose} className="text-gray-600 hover:underline">
          Cancel
        </button>
      </div>
    </form>
  );
};

export default WidgetForm;
