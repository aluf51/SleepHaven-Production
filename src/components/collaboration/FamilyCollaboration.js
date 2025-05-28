import React, { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import { AppContext } from '../../contexts/AppContext';
import { lightTheme, darkTheme } from '../../utils/theme';
import { 
  Users, 
  UserPlus, 
  Share2, 
  MessageSquare, 
  Bell,
  CheckCircle,
  Calendar,
  Clock
} from 'lucide-react';

// Family Collaboration Hub Component
const FamilyCollaboration = ({ babyName }) => {
  const { state } = useContext(AppContext);
  const currentTheme = state.isDarkMode ? darkTheme : lightTheme;
  
  // State for family members and caregivers
  const [familyMembers, setFamilyMembers] = useState([
    {
      id: 1,
      name: 'Partner',
      email: 'partner@example.com',
      role: 'co-parent',
      permissions: ['full'],
      avatar: '👨‍👩‍👧',
      active: true
    }
  ]);
  
  const [caregivers, setCaregivers] = useState([
    {
      id: 2,
      name: 'Grandma',
      email: 'grandma@example.com',
      role: 'caregiver',
      permissions: ['view', 'log'],
      avatar: '👵',
      active: true
    },
    {
      id: 3,
      name: 'Babysitter',
      email: 'sitter@example.com',
      role: 'caregiver',
      permissions: ['view', 'log'],
      avatar: '👧',
      active: false
    }
  ]);
  
  // State for shared activities
  const [sharedActivities, setSharedActivities] = useState([
    {
      id: 1,
      type: 'log',
      user: 'Partner',
      action: 'logged sleep data',
      time: '8:30 AM',
      date: new Date().toISOString(),
      details: 'Slept from 7:30 PM to 6:15 AM with one waking at 2:30 AM'
    },
    {
      id: 2,
      type: 'achievement',
      user: 'You',
      action: 'unlocked an achievement',
      time: '9:45 AM',
      date: new Date(Date.now() - 86400000).toISOString(), // Yesterday
      details: 'Three-Day Streak: Logged sleep for 3 consecutive days'
    },
    {
      id: 3,
      type: 'routine',
      user: 'Grandma',
      action: 'completed bedtime routine',
      time: '7:45 PM',
      date: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
      details: 'Followed all steps in the visual routine'
    }
  ]);
  
  // State for invitations
  const [showInviteForm, setShowInviteForm] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('caregiver');
  const [invitePermissions, setInvitePermissions] = useState(['view', 'log']);
  
  // Handle sending invitation
  const handleSendInvite = () => {
    if (!inviteEmail.trim()) return;
    
    // In a real app, this would send an invitation email
    alert(`Invitation sent to ${inviteEmail}`);
    
    // Reset form
    setInviteEmail('');
    setInviteRole('caregiver');
    setInvitePermissions(['view', 'log']);
    setShowInviteForm(false);
  };
  
  // Handle changing permissions
  const handlePermissionChange = (id, isFamily, permission) => {
    if (isFamily) {
      setFamilyMembers(familyMembers.map(member => {
        if (member.id === id) {
          const permissions = [...member.permissions];
          if (permissions.includes(permission)) {
            return { ...member, permissions: permissions.filter(p => p !== permission) };
          } else {
            return { ...member, permissions: [...permissions, permission] };
          }
        }
        return member;
      }));
    } else {
      setCaregivers(caregivers.map(caregiver => {
        if (caregiver.id === id) {
          const permissions = [...caregiver.permissions];
          if (permissions.includes(permission)) {
            return { ...caregiver, permissions: permissions.filter(p => p !== permission) };
          } else {
            return { ...caregiver, permissions: [...permissions, permission] };
          }
        }
        return caregiver;
      }));
    }
  };
  
  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === now.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };
  
  // Get activity icon based on type
  const getActivityIcon = (type) => {
    switch (type) {
      case 'log':
        return <Clock size={20} className="text-blue-500" />;
      case 'achievement':
        return <CheckCircle size={20} className="text-green-500" />;
      case 'routine':
        return <Calendar size={20} className="text-purple-500" />;
      case 'notification':
        return <Bell size={20} className="text-amber-500" />;
      default:
        return <MessageSquare size={20} className="text-gray-500" />;
    }
  };
  
  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4 text-center">
        Family Collaboration
      </h2>
      <p className="text-center text-gray-600 dark:text-gray-300 mb-8">
        Coordinate {babyName ? `${babyName}'s` : 'your baby\'s'} care with family members and caregivers.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Family Members & Caregivers */}
        <div className="md:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
              Care Team
            </h3>
            <button
              onClick={() => setShowInviteForm(true)}
              className="flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
            >
              <UserPlus size={18} className="mr-1" />
              Invite
            </button>
          </div>
          
          <div className="p-4">
            <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">
              Family Members
            </h4>
            
            <div className="space-y-3 mb-6">
              {familyMembers.map(member => (
                <div 
                  key={member.id}
                  className="p-3 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-between"
                >
                  <div className="flex items-center">
                    <div className="text-2xl mr-3">{member.avatar}</div>
                    <div>
                      <h5 className="font-medium text-gray-800 dark:text-gray-200">{member.name}</h5>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{member.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      member.active ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400' : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300'
                    }`}>
                      {member.active ? 'Active' : 'Inactive'}
                    </span>
                    <span className="px-2 py-1 text-xs rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400">
                      Co-parent
                    </span>
                  </div>
                </div>
              ))}
            </div>
            
            <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">
              Caregivers
            </h4>
            
            <div className="space-y-3">
              {caregivers.map(caregiver => (
                <div 
                  key={caregiver.id}
                  className="p-3 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-between"
                >
                  <div className="flex items-center">
                    <div className="text-2xl mr-3">{caregiver.avatar}</div>
                    <div>
                      <h5 className="font-medium text-gray-800 dark:text-gray-200">{caregiver.name}</h5>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{caregiver.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      caregiver.active ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400' : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300'
                    }`}>
                      {caregiver.active ? 'Active' : 'Inactive'}
                    </span>
                    <div className="relative">
                      <button
                        className="px-2 py-1 text-xs rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-400"
                      >
                        Permissions
                      </button>
                      <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg z-10 hidden group-hover:block">
                        <div className="p-2">
                          <div className="flex items-center justify-between p-2">
                            <span className="text-sm text-gray-700 dark:text-gray-300">View Data</span>
                            <input 
                              type="checkbox" 
                              checked={caregiver.permissions.includes('view')}
                              onChange={() => handlePermissionChange(caregiver.id, false, 'view')}
                              className="h-4 w-4 text-blue-600 rounded"
                            />
                          </div>
                          <div className="flex items-center justify-between p-2">
                            <span className="text-sm text-gray-700 dark:text-gray-300">Log Data</span>
                            <input 
                              type="checkbox" 
                              checked={caregiver.permissions.includes('log')}
                              onChange={() => handlePermissionChange(caregiver.id, false, 'log')}
                              className="h-4 w-4 text-blue-600 rounded"
                            />
                          </div>
                          <div className="flex items-center justify-between p-2">
                            <span className="text-sm text-gray-700 dark:text-gray-300">Modify Settings</span>
                            <input 
                              type="checkbox" 
                              checked={caregiver.permissions.includes('modify')}
                              onChange={() => handlePermissionChange(caregiver.id, false, 'modify')}
                              className="h-4 w-4 text-blue-600 rounded"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              <button
                onClick={() => setShowInviteForm(true)}
                className="w-full p-3 rounded-lg border border-dashed border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors flex items-center justify-center"
              >
                <UserPlus size={18} className="mr-2" />
                Add Caregiver
              </button>
            </div>
          </div>
        </div>
        
        {/* Activity Feed */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
              Activity Feed
            </h3>
          </div>
          
          <div className="divide-y divide-gray-200 dark:divide-gray-700 max-h-96 overflow-y-auto">
            {sharedActivities.length === 0 ? (
              <div className="p-6 text-center text-gray-500 dark:text-gray-400">
                <p>No activities yet.</p>
              </div>
            ) : (
              sharedActivities.map(activity => (
                <div 
                  key={activity.id}
                  className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                >
                  <div className="flex">
                    <div className="flex-shrink-0 mr-3">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h4 className="font-medium text-gray-800 dark:text-gray-200">
                          {activity.user}
                        </h4>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {activity.time}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                        {activity.action}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {activity.details}
                      </p>
                      <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                        {formatDate(activity.date)}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <button className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center">
              <Share2 size={18} className="mr-2" />
              Share Sleep Plan
            </button>
          </div>
        </div>
      </div>
      
      {/* Contextual Help */}
      <div className="mt-12 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 p-6 rounded-lg shadow-md border border-purple-100 dark:border-purple-800">
        <div className="flex items-start">
          <div className="flex-shrink-0 bg-white dark:bg-gray-800 p-3 rounded-full shadow-md">
            <Users size={24} className="text-purple-500" />
          </div>
          <div className="ml-4">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
              About Family Collaboration
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-2">
              Sleep Haven's family collaboration features help you coordinate care with partners, family members, and caregivers.
            </p>
            <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1 list-disc pl-5">
              <li>Share sleep plans and routines with your care team</li>
              <li>Allow caregivers to log sleep data during their care sessions</li>
              <li>Control permissions for each team member</li>
              <li>See a unified activity feed of all care actions</li>
              <li>Celebrate achievements together as a team</li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Invite Modal */}
      {showInviteForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
              Invite to Care Team
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  placeholder="email@example.com"
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Role
                </label>
                <select
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value)}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="co-parent">Co-parent</option>
                  <option value="caregiver">Caregiver</option>
                  <option value="family">Family Member</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Permissions
                </label>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="perm-view"
                      checked={invitePermissions.includes('view')}
                      onChange={() => {
                        if (invitePermissions.includes('view')) {
                          setInvitePermissions(invitePermissions.filter(p => p !== 'view'));
                        } else {
                          setInvitePermissions([...invitePermissions, 'view']);
                        }
                      }}
                      className="h-4 w-4 text-blue-600 rounded"
                    />
                    <label htmlFor="perm-view" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                      View sleep data and plans
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="perm-log"
                      checked={invitePermissions.includes('log')}
                      onChange={() => {
                        if (invitePermissions.includes('log')) {
                          setInvitePermissions(invitePermissions.filter(p => p !== 'log'));
                        } else {
                          setInvitePermissions([...invitePermissions, 'log']);
                        }
                      }}
                      className="h-4 w-4 text-blue-600 rounded"
                    />
                    <label htmlFor="perm-log" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                      Log sleep data
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="perm-modify"
                      checked={invitePermissions.includes('modify')}
                      onChange={() => {
                        if (invitePermissions.includes('modify')) {
                          setInvitePermissions(invitePermissions.filter(p => p !== 'modify'));
                        } else {
                          setInvitePermissions([...invitePermissions, 'modify']);
                        }
                      }}
                      className="h-4 w-4 text-blue-600 rounded"
                    />
                    <label htmlFor="perm-modify" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                      Modify settings and plans
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="pt-2 text-sm text-gray-500 dark:text-gray-400">
                <p>An email invitation will be sent with instructions to join your care team.</p>
              </div>
            </div>
            
            <div className="flex justify-end space-x-2 mt-6">
              <button
                onClick={() => setShowInviteForm(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleSendInvite}
                disabled={!inviteEmail.trim()}
                className={`px-4 py-2 text-sm font-medium text-white rounded-md ${
                  !inviteEmail.trim() ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                Send Invitation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FamilyCollaboration;
