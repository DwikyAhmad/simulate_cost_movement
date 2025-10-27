"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Plus, Search, Edit, Trash2 } from 'lucide-react';

interface MasterDataItem {
  id: string;
  category: string;
  name: string;
  valueString: string;
  createdAt: string;
  updatedAt: string;
}

export default function MasterDataPage() {
  const [masterData, setMasterData] = useState<MasterDataItem[]>([
    // Calculation Parameter
    {
      id: "1",
      category: "Calculation Parameter",
      name: "TMMIN E/G OP",
      valueString: "3.5%",
      createdAt: "2024-01-01",
      updatedAt: "2024-01-01"
    },
    {
      id: "2",
      category: "Calculation Parameter",
      name: "Selling and General Admin",
      valueString: "1.37%",
      createdAt: "2024-01-01",
      updatedAt: "2024-01-01"
    },
    {
      id: "3",
      category: "Calculation Parameter",
      name: "Exchange rate",
      valueString: "16374",
      createdAt: "2024-01-01",
      updatedAt: "2024-01-01"
    },
    {
      id: "4",
      category: "Calculation Parameter",
      name: "Inland Insurance JSP",
      valueString: "0.06%",
      createdAt: "2024-01-01",
      updatedAt: "2024-01-01"
    },
    {
      id: "5",
      category: "Calculation Parameter",
      name: "Inland Insurance MSP",
      valueString: "0.10%",
      createdAt: "2024-01-01",
      updatedAt: "2024-01-01"
    },
    {
      id: "6",
      category: "Calculation Parameter",
      name: "O/H Insurance",
      valueString: "0.2018%",
      createdAt: "2024-01-01",
      updatedAt: "2024-01-01"
    },
    {
      id: "7",
      category: "Calculation Parameter",
      name: "Royalty",
      valueString: "6%",
      createdAt: "2024-01-01",
      updatedAt: "2024-01-01"
    },
    // Engine Type Suffix
    {
      id: "8",
      category: "Engine Type Suffix",
      name: "Y*** prefix",
      valueString: "NR",
      createdAt: "2024-01-01",
      updatedAt: "2024-01-01"
    },
    {
      id: "9",
      category: "Engine Type Suffix",
      name: "1*** prefix",
      valueString: "TR",
      createdAt: "2024-01-01",
      updatedAt: "2024-01-01"
    },
    {
      id: "10",
      category: "Engine Type Suffix",
      name: "2*** prefix",
      valueString: "TR",
      createdAt: "2024-01-01",
      updatedAt: "2024-01-01"
    },
    {
      id: "11",
      category: "Engine Type Suffix",
      name: "0*** prefix",
      valueString: "NR",
      createdAt: "2024-01-01",
      updatedAt: "2024-01-01"
    }
  ]);

  const [searchInput, setSearchInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [editingItem, setEditingItem] = useState<MasterDataItem | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newItem, setNewItem] = useState<Omit<MasterDataItem, 'id' | 'createdAt' | 'updatedAt'>>({
    category: '',
    name: '',
    valueString: ''
  });

  const filteredData = masterData.filter(item => {
    const matchesSearch = item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.valueString.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleSearch = () => {
    setSearchTerm(searchInput);
  };

  const handleAddNew = () => {
    // Required field validation [Appendix Error Message 4]
    if (!newItem.category.trim()) {
      alert('Category is required and cannot be empty');
      return;
    }
    if (!newItem.name.trim()) {
      alert('Name is required and cannot be empty');
      return;
    }
    if (!newItem.valueString.trim()) {
      alert('Value is required and cannot be empty');
      return;
    }

    // Maximum length validation [Appendix Error Message 5]
    if (newItem.category.length > 50) {
      alert('Category exceeds maximum length of 50 characters');
      return;
    }
    if (newItem.name.length > 100) {
      alert('Name exceeds maximum length of 100 characters');
      return;
    }
    if (newItem.valueString.length > 50) {
      alert('Value exceeds maximum length of 50 characters');
      return;
    }

    // Duplicate data validation [Appendix Error Message 6]
    const isDuplicate = masterData.some(existingItem => 
      existingItem.category === newItem.category && existingItem.name === newItem.name
    );
    if (isDuplicate) {
      alert('A record with the same category and name already exists');
      return;
    }

    // Format validation [Appendix Error Message 7]
    if (newItem.category === 'Calculation Parameter') {
      const value = newItem.valueString.trim();
      const isPercentage = value.endsWith('%');
      const isNumber = !isPercentage && /^(\d+(\.\d{1,4})?)$/.test(value);
      const isValidPercentage = isPercentage && /^(\d+(\.\d{1,4})?%)$/.test(value);

      if (!isValidPercentage && !isNumber) {
        alert('Value must be a valid number or percentage (e.g., 3.5% or 16374)');
        return;
      }
    }

    if (newItem.category === 'Engine Type Suffix') {
      if (!/^[A-Z]{2}$/.test(newItem.valueString.trim())) {
        alert('Engine Type Suffix must be exactly 2 uppercase letters (e.g., NR, TR)');
        return;
      }
    }

    // If all validations pass, save the data and display success message [6]
    const item: MasterDataItem = {
      id: Date.now().toString(),
      category: newItem.category,
      name: newItem.name,
      valueString: newItem.valueString,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0]
    };
    
    setMasterData([...masterData, item]);
    setNewItem({ category: '', name: '', valueString: '' });
    setIsAddingNew(false);
    alert('Data has been successfully saved to staging table');
  };

  const handleEdit = (item: MasterDataItem) => {
    setEditingItem(item);
  };

  const handleSaveEdit = () => {
    if (editingItem) {
      // Required field validation [Appendix Error Message 4]
      if (!editingItem.category.trim()) {
        alert('Category is required and cannot be empty');
        return;
      }
      if (!editingItem.name.trim()) {
        alert('Name is required and cannot be empty');
        return;
      }
      if (!editingItem.valueString.trim()) {
        alert('Value is required and cannot be empty');
        return;
      }

      // Maximum length validation [Appendix Error Message 5]
      if (editingItem.category.length > 50) {
        alert('Category exceeds maximum length of 50 characters');
        return;
      }
      if (editingItem.name.length > 100) {
        alert('Name exceeds maximum length of 100 characters');
        return;
      }
      if (editingItem.valueString.length > 50) {
        alert('Value exceeds maximum length of 50 characters');
        return;
      }

      // Duplicate data validation [Appendix Error Message 6]
      const isDuplicate = masterData.some(existingItem => 
        existingItem.id !== editingItem.id && 
        existingItem.category === editingItem.category && 
        existingItem.name === editingItem.name
      );
      if (isDuplicate) {
        alert('A record with the same category and name already exists');
        return;
      }

      // Format validation [Appendix Error Message 7]
      if (editingItem.category === 'Calculation Parameter') {
        const value = editingItem.valueString.trim();
        const isPercentage = value.endsWith('%');
        const isNumber = !isPercentage && /^(\d+(\.\d{1,4})?)$/.test(value);
        const isValidPercentage = isPercentage && /^(\d+(\.\d{1,4})?%)$/.test(value);

        if (!isValidPercentage && !isNumber) {
          alert('Value must be a valid number or percentage (e.g., 3.5% or 16374)');
          return;
        }
      }

      // If all validations pass, save the data and display success message
      setMasterData(masterData.map(item =>
        item.id === editingItem.id
          ? { ...editingItem, updatedAt: new Date().toISOString().split('T')[0] }
          : item
      ));
      setEditingItem(null);
      alert('Data has been successfully updated in staging table');
    }
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this item?')) {
      setMasterData(masterData.filter(item => item.id !== id));
    }
  };

  const handleCancelEdit = () => {
    setEditingItem(null);
  };


  return (
    <div className="min-h-screen bg-gray-50 p-3 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white shadow-sm border-b-2 border-gray-200 p-4 md:p-6 rounded-lg">
          <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-col space-y-3 md:space-y-0 md:flex-row md:items-center md:gap-4">
              <Button 
                onClick={() => window.location.href = '/'}
                variant="outline" 
                className="flex items-center gap-2 rounded-lg border-2 border-gray-300 bg-white text-gray-700 hover:bg-gray-100 hover:border-gray-400 transition-all w-fit"
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="hidden sm:inline">Back to Home</span>
                <span className="sm:hidden">Home</span>
              </Button>
              <div>
                <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900">Master Data</h1>
                <p className="text-gray-600 mt-1 text-sm md:text-base">
                  Manage master data for cost calculations and analysis
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white shadow-sm border border-gray-200 p-6 space-y-4 rounded-lg">
          {/* New Button */}
          <div>
            <Button
              onClick={() => setIsAddingNew(!isAddingNew)}
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-sm transition-all px-6 py-2"
            >
              <Plus className="h-4 w-4 mr-2" />
              New
            </Button>
          </div>

          {/* New Item Form */}
          {isAddingNew && (
            <div className="bg-blue-50 border-2 border-blue-200 p-4 rounded-lg space-y-3">
              <h3 className="text-gray-900 font-semibold text-lg">Add New Master Data</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <Select value={newItem.category} onValueChange={(value) => setNewItem({ ...newItem, category: value })}>
                  <SelectTrigger className="bg-white border-2 border-gray-300 text-gray-900 rounded-lg hover:border-blue-400 transition-all">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border border-gray-200 text-gray-900 rounded-lg">
                    <SelectItem value="Calculation Parameter">Calculation Parameter</SelectItem>
                    <SelectItem value="Engine Type Suffix">Engine Type Suffix</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  placeholder="Name"
                  value={newItem.name}
                  onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                  className="bg-white border-2 border-gray-300 text-gray-900 placeholder-gray-400 rounded-lg focus:border-blue-400 transition-all"
                />
                <Input
                  placeholder="Value"
                  value={newItem.valueString}
                  onChange={(e) => setNewItem({ ...newItem, valueString: e.target.value })}
                  className="bg-white border-2 border-gray-300 text-gray-900 placeholder-gray-400 rounded-lg focus:border-blue-400 transition-all"
                />
              </div>
                <div className="flex gap-2">
                  <Button
                    onClick={handleAddNew}
                    className="bg-green-600 hover:bg-green-700 text-white rounded-lg shadow-sm transition-all px-4 py-2"
                  >
                    Add
                  </Button>
                <Button
                  onClick={() => {
                    setIsAddingNew(false);
                    setNewItem({ category: '', name: '', valueString: '' });
                  }}
                  variant="outline"
                  className="border-2 border-gray-300 text-gray-700 hover:bg-gray-100 rounded-lg transition-all px-4 py-2"
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}

          {/* Search and Filter */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Search by name or value
              </label>
              <div className="flex gap-2">
                <Input
                  placeholder="Search master data..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  className="flex-1 bg-white border-2 border-gray-300 text-gray-900 placeholder-gray-400 rounded-lg focus:border-blue-400 transition-all"
                />
                <Button
                  onClick={handleSearch}
                  className="bg-blue-600 border-2 border-blue-600 rounded-lg px-3 py-2 flex items-center hover:bg-blue-700 transition-all"
                >
                  <Search className="h-4 w-4 text-white" />
                </Button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Filter by category
              </label>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="bg-white border-2 border-gray-300 text-gray-900 rounded-lg hover:border-blue-400 transition-all">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-200 text-gray-900 rounded-lg">
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Calculation Parameter">Calculation Parameter</SelectItem>
                  <SelectItem value="Engine Type Suffix">Engine Type Suffix</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-white shadow-sm border border-gray-200 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gradient-to-r from-blue-600 to-blue-700">
                  <th className="border-b-2 border-blue-800 p-3 text-left font-semibold text-white text-sm">ID</th>
                  <th className="border-b-2 border-blue-800 p-3 text-left font-semibold text-white text-sm">Category</th>
                  <th className="border-b-2 border-blue-800 p-3 text-left font-semibold text-white text-sm">Name</th>
                  <th className="border-b-2 border-blue-800 p-3 text-left font-semibold text-white text-sm">ValueString</th>
                  <th className="border-b-2 border-blue-800 p-3 text-left font-semibold text-white text-sm">createdAt</th>
                  <th className="border-b-2 border-blue-800 p-3 text-left font-semibold text-white text-sm">updatedAt</th>
                  <th className="border-b-2 border-blue-800 p-3 text-left font-semibold text-white text-sm">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-8 text-center">
                      <div className="flex flex-col items-center justify-center space-y-3">
                        <div className="bg-gray-100 rounded-full p-4">
                          <Search className="h-8 w-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900">No Data Found</h3>
                        <p className="text-gray-600 text-sm">
                          No master data matches your search criteria.
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredData.map((item, index) => (
                    <tr key={item.id} className={`hover:bg-blue-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                    <td className="border-b border-gray-200 p-3 text-gray-900 text-sm font-medium">{item.id}</td>
                    <td className="border-b border-gray-200 p-3 text-gray-900 text-sm">
                      {editingItem?.id === item.id ? (
                        <Select value={editingItem.category} onValueChange={(value) => setEditingItem({ ...editingItem, category: value })}>
                          <SelectTrigger className="bg-white border-2 border-gray-300 text-gray-900 text-sm h-8 rounded-lg">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-white border border-gray-200 text-gray-900 rounded-lg">
                            <SelectItem value="Calculation Parameter">Calculation Parameter</SelectItem>
                            <SelectItem value="Engine Type Suffix">Engine Type Suffix</SelectItem>
                          </SelectContent>
                        </Select>
                      ) : (
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          item.category === 'Calculation Parameter' ? 'bg-blue-100 text-blue-700 border border-blue-300' :
                          'bg-purple-100 text-purple-700 border border-purple-300'
                        }`}>
                          {item.category}
                        </span>
                      )}
                    </td>
                    <td className="border-b border-gray-200 p-3 text-gray-900 text-sm">
                      {editingItem?.id === item.id ? (
                        <Input
                          value={editingItem.name}
                          onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                          className="bg-white border-2 border-gray-300 text-gray-900 text-sm h-8 rounded-lg"
                        />
                      ) : (
                        item.name
                      )}
                    </td>
                    <td className="border-b border-gray-200 p-3 text-gray-900 text-sm">
                      {editingItem?.id === item.id ? (
                        <Input
                          value={editingItem.valueString}
                          onChange={(e) => setEditingItem({ ...editingItem, valueString: e.target.value })}
                          className="bg-white border-2 border-gray-300 text-gray-900 text-sm h-8 rounded-lg"
                        />
                      ) : (
                        <span className="font-medium text-gray-900">{item.valueString}</span>
                      )}
                    </td>
                    <td className="border-b border-gray-200 p-3 text-gray-600 text-sm">{item.createdAt}</td>
                    <td className="border-b border-gray-200 p-3 text-gray-600 text-sm">{item.updatedAt}</td>
                    <td className="border-b border-gray-200 p-3 text-gray-900 text-sm">
                      {editingItem?.id === item.id ? (
                        <div className="flex gap-2">
                          <Button
                            onClick={handleSaveEdit}
                            size="sm"
                            className="bg-green-600 hover:bg-green-700 text-white rounded-lg shadow-sm transition-all px-3 py-1 h-8"
                          >
                            Save
                          </Button>
                          <Button
                            onClick={handleCancelEdit}
                            size="sm"
                            variant="outline"
                            className="border-2 border-gray-300 text-gray-700 hover:bg-gray-100 rounded-lg transition-all px-3 py-1 h-8"
                          >
                            Cancel
                          </Button>
                        </div>
                      ) : (
                        <div className="flex gap-2">
                          <Button
                            onClick={() => handleEdit(item)}
                            size="sm"
                            variant="outline"
                            className="border-2 border-blue-400 text-blue-600 hover:bg-blue-50 rounded-lg transition-all px-3 py-1 h-8"
                          >
                            <Edit className="h-3 w-3 mr-1" />
                            Edit
                          </Button>
                          <Button
                            onClick={() => handleDelete(item.id)}
                            size="sm"
                            variant="outline"
                            className="border-2 border-red-400 text-red-600 hover:bg-red-50 rounded-lg transition-all px-3 py-1 h-8"
                          >
                            <Trash2 className="h-3 w-3 mr-1" />
                            Delete
                          </Button>
                        </div>
                      )}
                    </td>
                  </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}