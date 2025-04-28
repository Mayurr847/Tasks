import React, { useState } from 'react';
import { useDashboard } from '../context/DashboardContext';
import WidgetForm from './WidgetForm';

const Dashboard = () => {
  const { categories, removeWidget } = useDashboard();
  const [openFormCategory, setOpenFormCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCategories = categories.map(category => ({
    ...category,
    widgets: category.widgets.filter(widget =>
      widget.name.toLowerCase().includes(searchTerm.toLowerCase())
    ),
  }));

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">📊 Dynamic Dashboard</h1>

      {/* 🔍 Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search widgets..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="w-full md:w-1/2 px-4 py-2 border rounded shadow-sm"
        />
      </div>

      <div className="grid gap-6">
        {filteredCategories.map(category => (
          <div key={category.id} className="border p-4 rounded-xl bg-white shadow">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-semibold">{category.name}</h2>
              <button
                className="text-blue-600 hover:underline"
                onClick={() =>
                  setOpenFormCategory(
                    openFormCategory === category.id ? null : category.id
                  )
                }
              >
                {openFormCategory === category.id ? 'Close Form' : '+ Add Widget'}
              </button>
            </div>

            {openFormCategory === category.id && (
              <WidgetForm
                categoryId={category.id}
                onClose={() => setOpenFormCategory(null)}
              />
            )}

            {/* Show widgets if any match the search */}
            {category.widgets.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                {category.widgets.map(widget => (
                  <div
                    key={widget.id}
                    className="relative bg-gray-100 p-4 rounded shadow-sm"
                  >
                    <button
                      className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                      onClick={() => removeWidget(category.id, widget.id)}
                    >
                      ❌
                    </button>
                    <h3 className="font-bold">{widget.name}</h3>
                    <p className="text-sm text-gray-700">{widget.text}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400 text-sm mt-2">No matching widgets.</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
