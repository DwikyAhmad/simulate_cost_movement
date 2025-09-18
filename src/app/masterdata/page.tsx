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

  const handleAddNew = () => {
    if (newItem.category && newItem.name && newItem.valueString) {
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
    }
  };

  const handleEdit = (item: MasterDataItem) => {
    setEditingItem(item);
  };

  const handleSaveEdit = () => {
    if (editingItem) {
      setMasterData(masterData.map(item =>
        item.id === editingItem.id
          ? { ...editingItem, updatedAt: new Date().toISOString().split('T')[0] }
          : item
      ));
      setEditingItem(null);
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
    <div className="min-h-screen bg-gray-900 p-3 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-gray-800 border-b border-gray-600 p-4 md:p-6">
          <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-col space-y-3 md:space-y-0 md:flex-row md:items-center md:gap-4">
              <Button 
                onClick={() => window.location.href = '/'}
                variant="outline" 
                className="flex items-center gap-2 rounded-none border-2 border-gray-500 bg-gray-700 text-white hover:bg-gray-600 w-fit"
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="hidden sm:inline">Back to Home</span>
                <span className="sm:hidden">Home</span>
              </Button>
              <div>
                <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-white">Master Data</h1>
                <p className="text-gray-300 mt-1 text-sm md:text-base">
                  Manage master data for cost calculations and analysis
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-gray-800 border border-gray-600 p-6 space-y-4">
          {/* New Button */}
          <div>
            <Button
              onClick={() => setIsAddingNew(!isAddingNew)}
              className="bg-green-600 hover:bg-green-700 text-white rounded-none border-2 border-green-500 px-6 py-2"
            >
              <Plus className="h-4 w-4" />
              New
            </Button>
          </div>

          {/* New Item Form */}
          {isAddingNew && (
            <div className="bg-gray-700 border border-gray-500 p-4 rounded-lg space-y-3">
              <h3 className="text-white font-medium">Add New Master Data</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <Select value={newItem.category} onValueChange={(value) => setNewItem({ ...newItem, category: value })}>
                  <SelectTrigger className="bg-gray-600 border-gray-500 text-white rounded-none">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-600 border-gray-500 text-white">
                    <SelectItem value="Calculation Parameter">Calculation Parameter</SelectItem>
                    <SelectItem value="Engine Type Suffix">Engine Type Suffix</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  placeholder="Name"
                  value={newItem.name}
                  onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                  className="bg-gray-600 border-gray-500 text-white placeholder-gray-400"
                />
                <Input
                  placeholder="Value"
                  value={newItem.valueString}
                  onChange={(e) => setNewItem({ ...newItem, valueString: e.target.value })}
                  className="bg-gray-600 border-gray-500 text-white placeholder-gray-400"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={handleAddNew}
                  className="bg-blue-600 hover:bg-blue-700 text-white rounded-none border-2 border-blue-500 px-4 py-2"
                >
                  Add
                </Button>
                <Button
                  onClick={() => setIsAddingNew(false)}
                  variant="outline"
                  className="border-gray-500 text-black hover:bg-gray-600 rounded-none border-2 px-4 py-2"
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}

          {/* Search and Filter */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Search by name or value
              </label>
              <div className="flex gap-2">
                <Input
                  placeholder="Search master data..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1 bg-gray-600 border-gray-500 text-white placeholder-gray-400"
                />
                <div className="bg-gray-600 border border-gray-500 rounded px-3 py-2 flex items-center">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Filter by category
              </label>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="bg-gray-600 border-gray-500 text-white rounded-none">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="bg-gray-600 border-gray-500 text-white">
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Calculation Parameter">Calculation Parameter</SelectItem>
                  <SelectItem value="Engine Type Suffix">Engine Type Suffix</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-gray-800 border border-gray-600 rounded-none">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-700">
                  <th className="border border-gray-600 p-3 text-left font-medium text-gray-200 text-sm">ID</th>
                  <th className="border border-gray-600 p-3 text-left font-medium text-gray-200 text-sm">Category</th>
                  <th className="border border-gray-600 p-3 text-left font-medium text-gray-200 text-sm">Name</th>
                  <th className="border border-gray-600 p-3 text-left font-medium text-gray-200 text-sm">ValueString</th>
                  <th className="border border-gray-600 p-3 text-left font-medium text-gray-200 text-sm">createdAt</th>
                  <th className="border border-gray-600 p-3 text-left font-medium text-gray-200 text-sm">updatedAt</th>
                  <th className="border border-gray-600 p-3 text-left font-medium text-gray-200 text-sm">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-700">
                    <td className="border border-gray-600 p-3 text-white text-sm">{item.id}</td>
                    <td className="border border-gray-600 p-3 text-white text-sm">
                      {editingItem?.id === item.id ? (
                        <Select value={editingItem.category} onValueChange={(value) => setEditingItem({ ...editingItem, category: value })}>
                          <SelectTrigger className="bg-gray-600 border-gray-500 text-white text-sm h-8 rounded-none">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-600 border-gray-500 text-white">
                            <SelectItem value="Calculation Parameter">Calculation Parameter</SelectItem>
                            <SelectItem value="Engine Type Suffix">Engine Type Suffix</SelectItem>
                          </SelectContent>
                        </Select>
                      ) : (
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          item.category === 'Calculation Parameter' ? 'bg-blue-900 text-blue-200' :
                          'bg-purple-900 text-purple-200'
                        }`}>
                          {item.category}
                        </span>
                      )}
                    </td>
                    <td className="border border-gray-600 p-3 text-white text-sm">
                      {editingItem?.id === item.id ? (
                        <Input
                          value={editingItem.name}
                          onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                          className="bg-gray-600 border-gray-500 text-white text-sm h-8"
                        />
                      ) : (
                        item.name
                      )}
                    </td>
                    <td className="border border-gray-600 p-3 text-white text-sm">
                      {editingItem?.id === item.id ? (
                        <Input
                          value={editingItem.valueString}
                          onChange={(e) => setEditingItem({ ...editingItem, valueString: e.target.value })}
                          className="bg-gray-600 border-gray-500 text-white text-sm h-8"
                        />
                      ) : (
                        item.valueString
                      )}
                    </td>
                    <td className="border border-gray-600 p-3 text-white text-sm">{item.createdAt}</td>
                    <td className="border border-gray-600 p-3 text-white text-sm">{item.updatedAt}</td>
                    <td className="border border-gray-600 p-3 text-white text-sm">
                      {editingItem?.id === item.id ? (
                        <div className="flex gap-2">
                          <Button
                            onClick={handleSaveEdit}
                            size="sm"
                            className="bg-green-600 hover:bg-green-700 text-white rounded-none border-2 border-green-500 px-3 py-1 h-8 cursor-pointer"
                          >
                            Save
                          </Button>
                          <Button
                            onClick={handleCancelEdit}
                            size="sm"
                            variant="outline"
                            className="border-gray-500 text-black hover:bg-gray-600 rounded-none border-2 px-3 py-1 h-8 cursor-pointer"
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
                            className="border-gray-500 text-black hover:bg-gray-600 rounded-none border-2 px-3 py-1 h-8 cursor-pointer"
                          >
                            <Edit className="h-3 w-3 mr-1" />
                            Edit
                          </Button>
                          <Button
                            onClick={() => handleDelete(item.id)}
                            size="sm"
                            variant="outline"
                            className="border-red-500 text-red-400 hover:bg-red-900 rounded-none border-2 px-3 py-1 h-8"
                          >
                            <Trash2 className="h-3 w-3 mr-1" />
                            Delete
                          </Button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}