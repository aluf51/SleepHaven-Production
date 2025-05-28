import React, { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import { AppContext } from '../../contexts/AppContext';
import { lightTheme, darkTheme } from '../../utils/theme';
import { 
  PlusIcon, 
  ArrowPathIcon, 
  CheckIcon, 
  XMarkIcon,
  DocumentDuplicateIcon,
  PencilSquareIcon,
  ArrowDownTrayIcon
} from '@heroicons/react/24/outline';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

// Visual routine item component
const RoutineItem = ({ item, onEdit, onDelete, isDragging, provided }) => {
  const { state } = useContext(AppContext);
  const currentTheme = state.isDarkMode ? darkTheme : lightTheme;
  
  return (
    <div
      ref={provided?.innerRef}
      {...provided?.draggableProps}
      {...provided?.dragHandleProps}
      className={`p-3 mb-2 rounded-lg border flex items-center justify-between ${
        isDragging 
          ? 'bg-blue-50 border-blue-300 shadow-lg' 
          : 'bg-white border-gray-200 shadow-sm'
      }`}
    >
      <div className="flex items-center">
        <span className="text-2xl mr-3">{item.icon}</span>
        <div>
          <h4 className="font-medium text-gray-800">{item.title}</h4>
          {item.description && (
            <p className="text-sm text-gray-500">{item.description}</p>
          )}
        </div>
      </div>
      <div className="flex space-x-1">
        <button 
          onClick={() => onEdit(item)}
          className="p-1 text-gray-500 hover:text-blue-500 rounded-full hover:bg-gray-100"
        >
          <PencilSquareIcon className="w-5 h-5" />
        </button>
        <button 
          onClick={() => onDelete(item.id)}
          className="p-1 text-gray-500 hover:text-red-500 rounded-full hover:bg-gray-100"
        >
          <XMarkIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

// Main Visual Sleep Planner component
const VisualSleepPlanner = ({ babyName }) => {
  const { state } = useContext(AppContext);
  const currentTheme = state.isDarkMode ? darkTheme : lightTheme;
  
  // State for routine items
  const [routineItems, setRoutineItems] = useState([]);
  const [showItemForm, setShowItemForm] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [routineName, setRoutineName] = useState(`${babyName || 'Baby'}'s Bedtime Routine`);
  
  // Form state
  const [itemTitle, setItemTitle] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [itemIcon, setItemIcon] = useState('🛁');
  
  // Available icons
  const availableIcons = [
    '🛁', '📚', '🧸', '🍼', '👶', '🎵', '😴', '🌙', '⭐', '🦷', '👕', '🧠', '💤'
  ];
  
  // Load saved routine from localStorage on component mount
  useEffect(() => {
    const savedRoutine = localStorage.getItem('sleepHavenVisualRoutine');
    if (savedRoutine) {
      try {
        const parsed = JSON.parse(savedRoutine);
        setRoutineItems(parsed.items || []);
        setRoutineName(parsed.name || `${babyName || 'Baby'}'s Bedtime Routine`);
      } catch (e) {
        console.error('Error loading saved routine:', e);
      }
    }
  }, [babyName]);
  
  // Save routine to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('sleepHavenVisualRoutine', JSON.stringify({
      name: routineName,
      items: routineItems
    }));
  }, [routineName, routineItems]);
  
  // Handle adding a new item
  const handleAddItem = () => {
    if (!itemTitle.trim()) return;
    
    const newItem = {
      id: Date.now().toString(),
      title: itemTitle,
      description: itemDescription,
      icon: itemIcon
    };
    
    if (currentItem) {
      // Edit existing item
      setRoutineItems(routineItems.map(item => 
        item.id === currentItem.id ? newItem : item
      ));
    } else {
      // Add new item
      setRoutineItems([...routineItems, newItem]);
    }
    
    // Reset form
    setItemTitle('');
    setItemDescription('');
    setItemIcon('🛁');
    setCurrentItem(null);
    setShowItemForm(false);
  };
  
  // Handle editing an item
  const handleEditItem = (item) => {
    setCurrentItem(item);
    setItemTitle(item.title);
    setItemDescription(item.description || '');
    setItemIcon(item.icon);
    setShowItemForm(true);
  };
  
  // Handle deleting an item
  const handleDeleteItem = (itemId) => {
    setRoutineItems(routineItems.filter(item => item.id !== itemId));
  };
  
  // Handle reordering items (drag and drop)
  const handleReorder = (result) => {
    if (!result.destination) return;
    
    const items = Array.from(routineItems);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    setRoutineItems(items);
  };
  
  // Export routine as PDF
  const exportRoutineAsPDF = () => {
    const routineElement = document.getElementById('visual-routine');
    
    html2canvas(routineElement).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      const imgWidth = 210; // A4 width in mm
      const imgHeight = canvas.height * imgWidth / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save(`${routineName.replace(/\s+/g, '_')}.pdf`);
    });
  };
  
  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4 text-center">
        Visual Sleep Planner
      </h2>
      <p className="text-center text-gray-600 dark:text-gray-300 mb-8">
        Create a visual bedtime routine to help your little one understand and follow their sleep schedule.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Routine Builder */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
            Build Your Routine
          </h3>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Routine Name
            </label>
            <input
              type="text"
              value={routineName}
              onChange={(e) => setRoutineName(e.target.value)}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
          
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-medium text-gray-700 dark:text-gray-300">
                Routine Steps
              </h4>
              <button
                onClick={() => {
                  setCurrentItem(null);
                  setItemTitle('');
                  setItemDescription('');
                  setItemIcon('🛁');
                  setShowItemForm(true);
                }}
                className="flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
              >
                <PlusIcon className="w-4 h-4 mr-1" />
                Add Step
              </button>
            </div>
            
            {/* Routine items list */}
            <div className="space-y-2 max-h-96 overflow-y-auto p-1">
              {routineItems.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400 text-sm italic text-center py-4">
                  No steps added yet. Click "Add Step" to create your routine.
                </p>
              ) : (
                routineItems.map((item, index) => (
                  <RoutineItem
                    key={item.id}
                    item={item}
                    onEdit={handleEditItem}
                    onDelete={handleDeleteItem}
                    index={index}
                  />
                ))
              )}
            </div>
          </div>
          
          {/* Export buttons */}
          <div className="flex justify-end space-x-2 mt-4">
            <button
              onClick={() => setRoutineItems([])}
              className="px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              <ArrowPathIcon className="w-4 h-4 mr-1 inline" />
              Reset
            </button>
            <button
              onClick={exportRoutineAsPDF}
              disabled={routineItems.length === 0}
              className={`px-3 py-2 text-sm font-medium text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                routineItems.length === 0
                  ? 'bg-blue-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              <ArrowDownTrayIcon className="w-4 h-4 mr-1 inline" />
              Export PDF
            </button>
          </div>
        </div>
        
        {/* Routine Preview */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
            Preview
          </h3>
          
          <div 
            id="visual-routine"
            className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700"
          >
            <h2 className="text-2xl font-bold text-center text-purple-700 dark:text-purple-300 mb-6">
              {routineName}
            </h2>
            
            {routineItems.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400 text-center py-8 italic">
                Your routine preview will appear here
              </p>
            ) : (
              <div className="space-y-4">
                {routineItems.map((item, index) => (
                  <div key={item.id} className="flex items-center">
                    <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-white dark:bg-gray-700 rounded-full shadow-md text-2xl mr-4">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 dark:text-gray-100">
                        {index + 1}. {item.title}
                      </h4>
                      {item.description && (
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
            <p>
              <span className="font-medium">Tip:</span> Print this routine and post it in your child's room. Visual cues help children understand what to expect.
            </p>
          </div>
        </div>
      </div>
      
      {/* Add/Edit Item Modal */}
      {showItemForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
              {currentItem ? 'Edit Step' : 'Add Step'}
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Step Title
                </label>
                <input
                  type="text"
                  value={itemTitle}
                  onChange={(e) => setItemTitle(e.target.value)}
                  placeholder="e.g., Bath Time"
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Description (Optional)
                </label>
                <input
                  type="text"
                  value={itemDescription}
                  onChange={(e) => setItemDescription(e.target.value)}
                  placeholder="e.g., Warm bath with lavender soap"
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Icon
                </label>
                <div className="grid grid-cols-7 gap-2">
                  {availableIcons.map((icon) => (
                    <button
                      key={icon}
                      type="button"
                      onClick={() => setItemIcon(icon)}
                      className={`w-10 h-10 text-xl flex items-center justify-center rounded-md ${
                        itemIcon === icon
                          ? 'bg-blue-100 dark:bg-blue-900 border-2 border-blue-500'
                          : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                    >
                      {icon}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-2 mt-6">
              <button
                onClick={() => setShowItemForm(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handleAddItem}
                disabled={!itemTitle.trim()}
                className={`px-4 py-2 text-sm font-medium text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  !itemTitle.trim()
                    ? 'bg-blue-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {currentItem ? 'Save Changes' : 'Add Step'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VisualSleepPlanner;
