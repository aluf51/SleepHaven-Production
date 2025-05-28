import React, { useContext } from 'react';
import { AppContext } from '../../contexts/AppContext'; // Adjust path as needed
import { motion } from 'framer-motion';
import { Volume2, MessageSquareText, Settings2, Trash2, RadioTower } from 'lucide-react';

const MargaretVoiceSettings = ({ theme }) => {
  const { state, dispatch } = useContext(AppContext);
  const { margaretVoiceSettings } = state; // Assuming settings are in AppContext

  const defaultTheme = {
    bgColor: '#1F2937', // Gray-800
    cardBgColor: '#374151', // Gray-700
    textColor: '#E5E7EB', // Gray-200
    headingColor: '#F3F4F6', // Gray-100
    accentColor: '#3B82F6', // Blue-500
    inputBgColor: '#4B5563', // Gray-600
    buttonTextColor: '#FFFFFF',
  };
  const currentTheme = { ...defaultTheme, ...theme };

  const handleSettingChange = (settingName, value) => {
    dispatch({ 
      type: 'UPDATE_MARGARET_VOICE_SETTINGS', 
      payload: { ...margaretVoiceSettings, [settingName]: value }
    });
  };

  // Default settings if not present in context
  const settings = margaretVoiceSettings || {
    preferredMode: 'voice', // 'voice', 'text', 'context'
    enableAudioCues: true,
    closedCaptioning: false,
    // Future settings
    // wakeWordEnabled: false,
    // speechRate: 1.0, 
  };

  const SettingRow = ({ label, description, children }) => (
    <motion.div 
      className="py-4 px-1 border-b flex justify-between items-center"
      style={{ borderColor: `${currentTheme.textColor}20` }}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex-grow pr-4">
        <h4 className="text-md font-semibold" style={{ color: currentTheme.textColor }}>{label}</h4>
        {description && <p className="text-xs" style={{ color: `${currentTheme.textColor}A0` }}>{description}</p>}
      </div>
      <div className="flex-shrink-0">{children}</div>
    </motion.div>
  );

  const ToggleSwitch = ({ checked, onChange }) => (
    <label className="relative inline-flex items-center cursor-pointer">
      <input type="checkbox" checked={checked} onChange={onChange} className="sr-only peer" />
      <div className="w-11 h-6 bg-gray-500 peer-focus:outline-none peer-focus:ring-2 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"
           style={{ backgroundColor: checked ? currentTheme.accentColor : '#6B7280', ringColor: currentTheme.accentColor }}></div>
    </label>
  );

  return (
    <div 
      className="p-4 md:p-6 rounded-lg shadow-xl max-w-2xl mx-auto my-4"
      style={{ backgroundColor: currentTheme.cardBgColor }}
    >
      <div className="flex items-center mb-6">
        <Settings2 size={28} className="mr-3" style={{ color: currentTheme.accentColor }} />
        <h2 className="text-xl md:text-2xl font-bold" style={{ color: currentTheme.headingColor }}>Margaret AI Voice Settings</h2>
      </div>

      <SettingRow 
        label="Preferred Interaction Mode"
        description="Choose how you primarily want to interact with Margaret."
      >
        <select 
          value={settings.preferredMode}
          onChange={(e) => handleSettingChange('preferredMode', e.target.value)}
          className="p-2 rounded text-sm focus:ring-2 focus:outline-none"
          style={{ backgroundColor: currentTheme.inputBgColor, color: currentTheme.textColor, borderColor: currentTheme.accentColor, ringColor: currentTheme.accentColor }}
        >
          <option value="voice">Voice First</option>
          <option value="text">Text First</option>
          <option value="context">Context-Dependent</option>
        </select>
      </SettingRow>

      <SettingRow 
        label="Enable Audio Cues"
        description="Play short sounds when voice input starts or stops."
      >
        <ToggleSwitch 
          checked={settings.enableAudioCues}
          onChange={(e) => handleSettingChange('enableAudioCues', e.target.checked)}
        />
      </SettingRow>

      <SettingRow 
        label="Closed Captioning"
        description="Show text captions for Margaret's speech."
      >
        <ToggleSwitch 
          checked={settings.closedCaptioning}
          onChange={(e) => handleSettingChange('closedCaptioning', e.target.checked)}
        />
      </SettingRow>
      
      <div className="mt-6 pt-4 border-t" style={{ borderColor: `${currentTheme.textColor}20` }}>
        <h3 className="text-lg font-semibold mb-3 flex items-center" style={{ color: currentTheme.textColor}}>
            <RadioTower size={20} className="mr-2" style={{color: currentTheme.accentColor}}/>
            Future Enhancements
        </h3>
        <p className="text-xs mb-2" style={{ color: `${currentTheme.textColor}A0` }}>These settings are planned for future updates:</p>
        <ul className="list-disc list-inside text-xs space-y-1 pl-2" style={{ color: `${currentTheme.textColor}B0` }}>
            <li>Wake Word Activation (e.g., "Hey Margaret")</li>
            <li>Adjust Margaret's Speech Rate</li>
            <li>Voice Data & History Management</li>
        </ul>
      </div>

      {/* Example: Delete Voice History Button (Conceptual) */}
      {/* <SettingRow label="Voice Data" description="Manage your stored voice interactions.">
        <button 
          onClick={() => console.log("TODO: Implement delete voice history")}
          className="p-2 text-sm rounded transition-colors flex items-center"
          style={{ backgroundColor: '#DC2626', color: currentTheme.buttonTextColor }} // Red-600
        >
          <Trash2 size={16} className="mr-1.5" /> Delete History
        </button>
      </SettingRow> */}

    </div>
  );
};

export default MargaretVoiceSettings;

