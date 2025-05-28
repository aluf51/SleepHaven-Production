import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { AppContext } from '../../contexts/AppContext';
import { 
  Bell, Moon, Sun, Volume2, VolumeX, Lock, User, HelpCircle, 
  ChevronRight, ToggleLeft, ToggleRight, LogOut, Shield, 
  MessageSquare, FileText, Info, ArrowLeft, Save
} from 'lucide-react';

const SettingsScreen = () => {
  const { state, dispatch } = useContext(AppContext);
  const currentTheme = state.isDarkMode ? 'dark' : 'light';
  
  // Settings state
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [vibrationEnabled, setVibrationEnabled] = useState(true);
  const [dataSharing, setDataSharing] = useState('minimal');
  const [activeSection, setActiveSection] = useState('main');
  const [showSaveConfirmation, setShowSaveConfirmation] = useState(false);

  // Theme colors
  const colors = {
    background: currentTheme === 'dark' ? '#1E1E2E' : '#FFFFFF',
    cardBackground: currentTheme === 'dark' ? '#2C2C3C' : '#F8F9FA',
    textPrimary: currentTheme === 'dark' ? '#E4E6EB' : '#212529',
    textSecondary: currentTheme === 'dark' ? '#B0B3B8' : '#6C757D',
    accent: currentTheme === 'dark' ? '#7986CB' : '#5686C4',
    border: currentTheme === 'dark' ? '#3E3E4E' : '#E9ECEF',
    toggle: {
      active: currentTheme === 'dark' ? '#7986CB' : '#5686C4',
      inactive: currentTheme === 'dark' ? '#4A4A5A' : '#CED4DA',
    }
  };

  const handleGoBack = () => {
    if (activeSection !== 'main') {
      setActiveSection('main');
    } else {
      dispatch({ type: "SET_VIEW", payload: "dashboard" });
    }
  };

  const handleToggleDarkMode = () => {
    dispatch({ type: "TOGGLE_DARK_MODE" });
    setShowSaveConfirmation(true);
    setTimeout(() => setShowSaveConfirmation(false), 2000);
  };

  const handleToggleNotifications = () => {
    setNotificationsEnabled(!notificationsEnabled);
    setShowSaveConfirmation(true);
    setTimeout(() => setShowSaveConfirmation(false), 2000);
  };

  const handleToggleSound = () => {
    setSoundEnabled(!soundEnabled);
    setShowSaveConfirmation(true);
    setTimeout(() => setShowSaveConfirmation(false), 2000);
  };

  const handleToggleVibration = () => {
    setVibrationEnabled(!vibrationEnabled);
    setShowSaveConfirmation(true);
    setTimeout(() => setShowSaveConfirmation(false), 2000);
  };

  const handleDataSharingChange = (value) => {
    setDataSharing(value);
    setShowSaveConfirmation(true);
    setTimeout(() => setShowSaveConfirmation(false), 2000);
  };

  const renderToggle = (isEnabled, onToggle) => (
    <div 
      onClick={onToggle}
      style={{ 
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center'
      }}
    >
      {isEnabled ? 
        <ToggleRight size={28} color={colors.toggle.active} /> : 
        <ToggleLeft size={28} color={colors.toggle.inactive} />
      }
    </div>
  );

  const renderMainSettings = () => (
    <>
      <div style={{ padding: '16px 20px', borderBottom: `1px solid ${colors.border}` }}>
        <h1 style={{ 
          fontSize: '1.5rem', 
          fontWeight: '600',
          color: colors.textPrimary,
          margin: 0
        }}>
          Settings
        </h1>
      </div>

      <div style={{ padding: '16px' }}>
        {/* Appearance Section */}
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{ 
            fontSize: '1.1rem', 
            fontWeight: '600',
            color: colors.textPrimary,
            marginBottom: '12px'
          }}>
            Appearance
          </h2>
          
          <div style={{ 
            backgroundColor: colors.cardBackground,
            borderRadius: '12px',
            overflow: 'hidden'
          }}>
            <div style={{ 
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '16px',
              borderBottom: `1px solid ${colors.border}`
            }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                {state.isDarkMode ? 
                  <Moon size={20} color={colors.textPrimary} style={{ marginRight: '12px' }} /> : 
                  <Sun size={20} color={colors.textPrimary} style={{ marginRight: '12px' }} />
                }
                <span style={{ color: colors.textPrimary }}>Dark Mode</span>
              </div>
              {renderToggle(state.isDarkMode, handleToggleDarkMode)}
            </div>
          </div>
        </div>

        {/* Notifications Section */}
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{ 
            fontSize: '1.1rem', 
            fontWeight: '600',
            color: colors.textPrimary,
            marginBottom: '12px'
          }}>
            Notifications
          </h2>
          
          <div style={{ 
            backgroundColor: colors.cardBackground,
            borderRadius: '12px',
            overflow: 'hidden'
          }}>
            <div style={{ 
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '16px',
              borderBottom: `1px solid ${colors.border}`
            }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Bell size={20} color={colors.textPrimary} style={{ marginRight: '12px' }} />
                <span style={{ color: colors.textPrimary }}>Enable Notifications</span>
              </div>
              {renderToggle(notificationsEnabled, handleToggleNotifications)}
            </div>

            <div style={{ 
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '16px',
              borderBottom: `1px solid ${colors.border}`,
              opacity: notificationsEnabled ? 1 : 0.5
            }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Volume2 size={20} color={colors.textPrimary} style={{ marginRight: '12px' }} />
                <span style={{ color: colors.textPrimary }}>Sound</span>
              </div>
              {renderToggle(soundEnabled, notificationsEnabled ? handleToggleSound : null)}
            </div>

            <div style={{ 
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '16px',
              opacity: notificationsEnabled ? 1 : 0.5
            }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <VolumeX size={20} color={colors.textPrimary} style={{ marginRight: '12px' }} />
                <span style={{ color: colors.textPrimary }}>Vibration</span>
              </div>
              {renderToggle(vibrationEnabled, notificationsEnabled ? handleToggleVibration : null)}
            </div>
          </div>
        </div>

        {/* Privacy Section */}
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{ 
            fontSize: '1.1rem', 
            fontWeight: '600',
            color: colors.textPrimary,
            marginBottom: '12px'
          }}>
            Privacy
          </h2>
          
          <div style={{ 
            backgroundColor: colors.cardBackground,
            borderRadius: '12px',
            overflow: 'hidden'
          }}>
            <div 
              onClick={() => setActiveSection('privacy')}
              style={{ 
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '16px',
                cursor: 'pointer'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Lock size={20} color={colors.textPrimary} style={{ marginRight: '12px' }} />
                <span style={{ color: colors.textPrimary }}>Privacy Settings</span>
              </div>
              <ChevronRight size={20} color={colors.textSecondary} />
            </div>
          </div>
        </div>

        {/* Account Section */}
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{ 
            fontSize: '1.1rem', 
            fontWeight: '600',
            color: colors.textPrimary,
            marginBottom: '12px'
          }}>
            Account
          </h2>
          
          <div style={{ 
            backgroundColor: colors.cardBackground,
            borderRadius: '12px',
            overflow: 'hidden'
          }}>
            <div 
              onClick={() => setActiveSection('account')}
              style={{ 
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '16px',
                borderBottom: `1px solid ${colors.border}`,
                cursor: 'pointer'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <User size={20} color={colors.textPrimary} style={{ marginRight: '12px' }} />
                <span style={{ color: colors.textPrimary }}>Account Information</span>
              </div>
              <ChevronRight size={20} color={colors.textSecondary} />
            </div>

            <div 
              style={{ 
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '16px',
                cursor: 'pointer'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <LogOut size={20} color="#DC3545" style={{ marginRight: '12px' }} />
                <span style={{ color: "#DC3545" }}>Sign Out</span>
              </div>
            </div>
          </div>
        </div>

        {/* Help & Support Section */}
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{ 
            fontSize: '1.1rem', 
            fontWeight: '600',
            color: colors.textPrimary,
            marginBottom: '12px'
          }}>
            Help & Support
          </h2>
          
          <div style={{ 
            backgroundColor: colors.cardBackground,
            borderRadius: '12px',
            overflow: 'hidden'
          }}>
            <div 
              onClick={() => setActiveSection('help')}
              style={{ 
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '16px',
                borderBottom: `1px solid ${colors.border}`,
                cursor: 'pointer'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <HelpCircle size={20} color={colors.textPrimary} style={{ marginRight: '12px' }} />
                <span style={{ color: colors.textPrimary }}>Help Center</span>
              </div>
              <ChevronRight size={20} color={colors.textSecondary} />
            </div>

            <div 
              style={{ 
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '16px',
                borderBottom: `1px solid ${colors.border}`,
                cursor: 'pointer'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <MessageSquare size={20} color={colors.textPrimary} style={{ marginRight: '12px' }} />
                <span style={{ color: colors.textPrimary }}>Contact Support</span>
              </div>
              <ChevronRight size={20} color={colors.textSecondary} />
            </div>

            <div 
              style={{ 
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '16px',
                cursor: 'pointer'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Info size={20} color={colors.textPrimary} style={{ marginRight: '12px' }} />
                <span style={{ color: colors.textPrimary }}>About Sleep Haven</span>
              </div>
              <ChevronRight size={20} color={colors.textSecondary} />
            </div>
          </div>
        </div>

        <div style={{ 
          textAlign: 'center', 
          color: colors.textSecondary,
          fontSize: '0.8rem',
          marginTop: '32px',
          marginBottom: '16px'
        }}>
          Sleep Haven v1.0.0
        </div>
      </div>
    </>
  );

  const renderPrivacySettings = () => (
    <>
      <div style={{ 
        padding: '16px 20px', 
        borderBottom: `1px solid ${colors.border}`,
        display: 'flex',
        alignItems: 'center'
      }}>
        <div 
          onClick={handleGoBack}
          style={{ 
            marginRight: '16px',
            cursor: 'pointer'
          }}
        >
          <ArrowLeft size={20} color={colors.textPrimary} />
        </div>
        <h1 style={{ 
          fontSize: '1.5rem', 
          fontWeight: '600',
          color: colors.textPrimary,
          margin: 0
        }}>
          Privacy Settings
        </h1>
      </div>

      <div style={{ padding: '16px' }}>
        <div style={{ marginBottom: '24px' }}>
          <p style={{ 
            color: colors.textSecondary,
            lineHeight: '1.5',
            marginBottom: '24px'
          }}>
            Control how your data is used and shared within the app and with our partners.
          </p>
          
          <div style={{ 
            backgroundColor: colors.cardBackground,
            borderRadius: '12px',
            overflow: 'hidden',
            marginBottom: '24px'
          }}>
            <div style={{ padding: '16px', borderBottom: `1px solid ${colors.border}` }}>
              <h3 style={{ 
                fontSize: '1rem', 
                fontWeight: '600',
                color: colors.textPrimary,
                marginTop: 0,
                marginBottom: '8px'
              }}>
                Data Sharing
              </h3>
              <p style={{ 
                color: colors.textSecondary,
                fontSize: '0.9rem',
                marginTop: 0,
                marginBottom: '16px'
              }}>
                Choose how much information is shared for personalization and community features
              </p>

              <div style={{ marginBottom: '12px' }}>
                <label style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '12px',
                  cursor: 'pointer'
                }}>
                  <input 
                    type="radio" 
                    name="dataSharing" 
                    value="minimal" 
                    checked={dataSharing === 'minimal'}
                    onChange={() => handleDataSharingChange('minimal')}
                    style={{ marginRight: '12px' }}
                  />
                  <div>
                    <div style={{ color: colors.textPrimary, fontWeight: '500' }}>Minimal</div>
                    <div style={{ color: colors.textSecondary, fontSize: '0.8rem' }}>
                      Only essential data for app functionality
                    </div>
                  </div>
                </label>

                <label style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '12px',
                  cursor: 'pointer'
                }}>
                  <input 
                    type="radio" 
                    name="dataSharing" 
                    value="moderate" 
                    checked={dataSharing === 'moderate'}
                    onChange={() => handleDataSharingChange('moderate')}
                    style={{ marginRight: '12px' }}
                  />
                  <div>
                    <div style={{ color: colors.textPrimary, fontWeight: '500' }}>Moderate</div>
                    <div style={{ color: colors.textSecondary, fontSize: '0.8rem' }}>
                      Includes data for personalized recommendations
                    </div>
                  </div>
                </label>

                <label style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  cursor: 'pointer'
                }}>
                  <input 
                    type="radio" 
                    name="dataSharing" 
                    value="full" 
                    checked={dataSharing === 'full'}
                    onChange={() => handleDataSharingChange('full')}
                    style={{ marginRight: '12px' }}
                  />
                  <div>
                    <div style={{ color: colors.textPrimary, fontWeight: '500' }}>Full</div>
                    <div style={{ color: colors.textSecondary, fontSize: '0.8rem' }}>
                      Includes anonymized data for community features and research
                    </div>
                  </div>
                </label>
              </div>
            </div>

            <div style={{ 
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '16px',
              borderBottom: `1px solid ${colors.border}`
            }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Shield size={20} color={colors.textPrimary} style={{ marginRight: '12px' }} />
                <span style={{ color: colors.textPrimary }}>Anonymous Usage Statistics</span>
              </div>
              {renderToggle(true, () => {})}
            </div>

            <div 
              style={{ 
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '16px',
                cursor: 'pointer'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <FileText size={20} color={colors.textPrimary} style={{ marginRight: '12px' }} />
                <span style={{ color: colors.textPrimary }}>Privacy Policy</span>
              </div>
              <ChevronRight size={20} color={colors.textSecondary} />
            </div>
          </div>

          <div style={{ 
            backgroundColor: colors.cardBackground,
            borderRadius: '12px',
            padding: '16px',
            marginBottom: '24px'
          }}>
            <h3 style={{ 
              fontSize: '1rem', 
              fontWeight: '600',
              color: colors.textPrimary,
              marginTop: 0,
              marginBottom: '8px'
            }}>
              Data Export
            </h3>
            <p style={{ 
              color: colors.textSecondary,
              fontSize: '0.9rem',
              marginTop: 0,
              marginBottom: '16px'
            }}>
              Download a copy of your data
            </p>
            <button style={{
              backgroundColor: colors.accent,
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '8px',
              padding: '10px 16px',
              fontWeight: '500',
              cursor: 'pointer',
              width: '100%'
            }}>
              Request Data Export
            </button>
          </div>

          <div style={{ 
            backgroundColor: colors.cardBackground,
            borderRadius: '12px',
            padding: '16px'
          }}>
            <h3 style={{ 
              fontSize: '1rem', 
              fontWeight: '600',
              color: '#DC3545',
              marginTop: 0,
              marginBottom: '8px'
            }}>
              Delete Account
            </h3>
            <p style={{ 
              color: colors.textSecondary,
              fontSize: '0.9rem',
              marginTop: 0,
              marginBottom: '16px'
            }}>
              Permanently delete your account and all associated data
            </p>
            <button style={{
              backgroundColor: 'transparent',
              color: '#DC3545',
              border: '1px solid #DC3545',
              borderRadius: '8px',
              padding: '10px 16px',
              fontWeight: '500',
              cursor: 'pointer',
              width: '100%'
            }}>
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </>
  );

  const renderAccountSettings = () => (
    <>
      <div style={{ 
        padding: '16px 20px', 
        borderBottom: `1px solid ${colors.border}`,
        display: 'flex',
        alignItems: 'center'
      }}>
        <div 
          onClick={handleGoBack}
          style={{ 
            marginRight: '16px',
            cursor: 'pointer'
          }}
        >
          <ArrowLeft size={20} color={colors.textPrimary} />
        </div>
        <h1 style={{ 
          fontSize: '1.5rem', 
          fontWeight: '600',
          color: colors.textPrimary,
          margin: 0
        }}>
          Account Information
        </h1>
      </div>

      <div style={{ padding: '16px' }}>
        <div style={{ 
          backgroundColor: colors.cardBackground,
          borderRadius: '12px',
          padding: '20px',
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'center'
        }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            backgroundColor: colors.accent,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: '16px'
          }}>
            <User size={32} color="#FFFFFF" />
          </div>
          <div>
            <h2 style={{ 
              fontSize: '1.2rem', 
              fontWeight: '600',
              color: colors.textPrimary,
              margin: 0,
              marginBottom: '4px'
            }}>
              {state.userName || 'Sarah Johnson'}
            </h2>
            <p style={{ 
              color: colors.textSecondary,
              margin: 0
            }}>
              Parent of {state.babyName || 'Emma'}, {state.babyAgeMonths || 8} months
            </p>
          </div>
        </div>

        <div style={{ 
          backgroundColor: colors.cardBackground,
          borderRadius: '12px',
          overflow: 'hidden',
          marginBottom: '24px'
        }}>
          <div style={{ padding: '16px', borderBottom: `1px solid ${colors.border}` }}>
            <h3 style={{ 
              fontSize: '1rem', 
              fontWeight: '600',
              color: colors.textPrimary,
              marginTop: 0,
              marginBottom: '16px'
            }}>
              Personal Information
            </h3>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ 
                display: 'block',
                color: colors.textSecondary,
                fontSize: '0.9rem',
                marginBottom: '6px'
              }}>
                Name
              </label>
              <input 
                type="text" 
                value={state.userName || 'Sarah Johnson'}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: `1px solid ${colors.border}`,
                  backgroundColor: colors.background,
                  color: colors.textPrimary,
                  fontSize: '1rem'
                }}
              />
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ 
                display: 'block',
                color: colors.textSecondary,
                fontSize: '0.9rem',
                marginBottom: '6px'
              }}>
                Email
              </label>
              <input 
                type="email" 
                value="sarah.johnson@example.com"
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: `1px solid ${colors.border}`,
                  backgroundColor: colors.background,
                  color: colors.textPrimary,
                  fontSize: '1rem'
                }}
              />
            </div>

            <div>
              <label style={{ 
                display: 'block',
                color: colors.textSecondary,
                fontSize: '0.9rem',
                marginBottom: '6px'
              }}>
                Phone Number
              </label>
              <input 
                type="tel" 
                value="+1 (555) 123-4567"
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: `1px solid ${colors.border}`,
                  backgroundColor: colors.background,
                  color: colors.textPrimary,
                  fontSize: '1rem'
                }}
              />
            </div>
          </div>

          <div style={{ padding: '16px' }}>
            <h3 style={{ 
              fontSize: '1rem', 
              fontWeight: '600',
              color: colors.textPrimary,
              marginTop: 0,
              marginBottom: '16px'
            }}>
              Baby Information
            </h3>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ 
                display: 'block',
                color: colors.textSecondary,
                fontSize: '0.9rem',
                marginBottom: '6px'
              }}>
                Baby's Name
              </label>
              <input 
                type="text" 
                value={state.babyName || 'Emma'}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: `1px solid ${colors.border}`,
                  backgroundColor: colors.background,
                  color: colors.textPrimary,
                  fontSize: '1rem'
                }}
              />
            </div>

            <div>
              <label style={{ 
                display: 'block',
                color: colors.textSecondary,
                fontSize: '0.9rem',
                marginBottom: '6px'
              }}>
                Age (months)
              </label>
              <input 
                type="number" 
                value={state.babyAgeMonths || 8}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: `1px solid ${colors.border}`,
                  backgroundColor: colors.background,
                  color: colors.textPrimary,
                  fontSize: '1rem'
                }}
              />
            </div>
          </div>
        </div>

        <button style={{
          backgroundColor: colors.accent,
          color: '#FFFFFF',
          border: 'none',
          borderRadius: '8px',
          padding: '12px 16px',
          fontWeight: '500',
          cursor: 'pointer',
          width: '100%',
          marginBottom: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Save size={18} style={{ marginRight: '8px' }} />
          Save Changes
        </button>
      </div>
    </>
  );

  const renderHelpCenter = () => (
    <>
      <div style={{ 
        padding: '16px 20px', 
        borderBottom: `1px solid ${colors.border}`,
        display: 'flex',
        alignItems: 'center'
      }}>
        <div 
          onClick={handleGoBack}
          style={{ 
            marginRight: '16px',
            cursor: 'pointer'
          }}
        >
          <ArrowLeft size={20} color={colors.textPrimary} />
        </div>
        <h1 style={{ 
          fontSize: '1.5rem', 
          fontWeight: '600',
          color: colors.textPrimary,
          margin: 0
        }}>
          Help Center
        </h1>
      </div>

      <div style={{ padding: '16px' }}>
        <div style={{ 
          backgroundColor: colors.cardBackground,
          borderRadius: '12px',
          padding: '20px',
          marginBottom: '24px'
        }}>
          <h2 style={{ 
            fontSize: '1.2rem', 
            fontWeight: '600',
            color: colors.textPrimary,
            marginTop: 0,
            marginBottom: '12px'
          }}>
            How can we help you?
          </h2>
          <input 
            type="text" 
            placeholder="Search for help topics..."
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '8px',
              border: `1px solid ${colors.border}`,
              backgroundColor: colors.background,
              color: colors.textPrimary,
              fontSize: '1rem'
            }}
          />
        </div>

        <div style={{ marginBottom: '24px' }}>
          <h3 style={{ 
            fontSize: '1.1rem', 
            fontWeight: '600',
            color: colors.textPrimary,
            marginBottom: '12px'
          }}>
            Popular Topics
          </h3>
          
          <div style={{ 
            backgroundColor: colors.cardBackground,
            borderRadius: '12px',
            overflow: 'hidden'
          }}>
            <div 
              style={{ 
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '16px',
                borderBottom: `1px solid ${colors.border}`,
                cursor: 'pointer'
              }}
            >
              <span style={{ color: colors.textPrimary }}>Getting Started with Sleep Haven</span>
              <ChevronRight size={20} color={colors.textSecondary} />
            </div>

            <div 
              style={{ 
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '16px',
                borderBottom: `1px solid ${colors.border}`,
                cursor: 'pointer'
              }}
            >
              <span style={{ color: colors.textPrimary }}>Understanding Your Sleep Plan</span>
              <ChevronRight size={20} color={colors.textSecondary} />
            </div>

            <div 
              style={{ 
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '16px',
                borderBottom: `1px solid ${colors.border}`,
                cursor: 'pointer'
              }}
            >
              <span style={{ color: colors.textPrimary }}>Using the SOS Mode</span>
              <ChevronRight size={20} color={colors.textSecondary} />
            </div>

            <div 
              style={{ 
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '16px',
                borderBottom: `1px solid ${colors.border}`,
                cursor: 'pointer'
              }}
            >
              <span style={{ color: colors.textPrimary }}>Tracking Progress with the Calendar</span>
              <ChevronRight size={20} color={colors.textSecondary} />
            </div>

            <div 
              style={{ 
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '16px',
                cursor: 'pointer'
              }}
            >
              <span style={{ color: colors.textPrimary }}>Chatting with Margaret AI</span>
              <ChevronRight size={20} color={colors.textSecondary} />
            </div>
          </div>
        </div>

        <div style={{ marginBottom: '24px' }}>
          <h3 style={{ 
            fontSize: '1.1rem', 
            fontWeight: '600',
            color: colors.textPrimary,
            marginBottom: '12px'
          }}>
            Contact Support
          </h3>
          
          <div style={{ 
            backgroundColor: colors.cardBackground,
            borderRadius: '12px',
            padding: '20px'
          }}>
            <p style={{ 
              color: colors.textSecondary,
              marginTop: 0,
              marginBottom: '16px'
            }}>
              Need more help? Our support team is ready to assist you.
            </p>
            <button style={{
              backgroundColor: colors.accent,
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '8px',
              padding: '12px 16px',
              fontWeight: '500',
              cursor: 'pointer',
              width: '100%'
            }}>
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'privacy':
        return renderPrivacySettings();
      case 'account':
        return renderAccountSettings();
      case 'help':
        return renderHelpCenter();
      default:
        return renderMainSettings();
    }
  };

  return (
    <div style={{ 
      backgroundColor: colors.background,
      color: colors.textPrimary,
      minHeight: '100vh',
      position: 'relative'
    }}>
      {renderContent()}
      
      {/* Save confirmation toast */}
      {showSaveConfirmation && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          style={{
            position: 'fixed',
            bottom: '80px',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: colors.accent,
            color: '#FFFFFF',
            padding: '12px 24px',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            display: 'flex',
            alignItems: 'center',
            zIndex: 1000
          }}
        >
          <Save size={18} style={{ marginRight: '8px' }} />
          Settings saved successfully
        </motion.div>
      )}
    </div>
  );
};

export default SettingsScreen;
