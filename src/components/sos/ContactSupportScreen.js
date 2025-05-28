import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Phone, MessageCircle, Heart, AlertTriangle, ExternalLink } from 'lucide-react';

const ContactSupportScreen = ({ theme, onBack }) => {
  const [alertSent, setAlertSent] = useState(false);
  
  // Support options
  const supportOptions = [
    {
      title: "Alert Your Partner",
      description: "Send a notification to your partner that you need assistance right now.",
      icon: <Heart size={24} />,
      action: () => handleAlertPartner(),
      color: "#FF6B6B" // Soft red
    },
    {
      title: "Call Sleep Consultant",
      description: "Connect with a sleep specialist for immediate guidance.",
      icon: <Phone size={24} />,
      action: () => handleCallConsultant(),
      color: "#7B91C9" // Light blue
    },
    {
      title: "Text Support Line",
      description: "Send a message to our 24/7 parent support text line.",
      icon: <MessageCircle size={24} />,
      action: () => handleTextSupport(),
      color: "#5A6794" // Darker blue
    }
  ];
  
  // Professional resources
  const professionalResources = [
    {
      name: "National Parent Helpline",
      description: "Emotional support from trained advocates: 1-855-427-2736",
      link: "#"
    },
    {
      name: "Postpartum Support International",
      description: "Support for parents: 1-800-944-4773",
      link: "#"
    },
    {
      name: "Crisis Text Line",
      description: "Text HOME to 741741 for crisis support",
      link: "#"
    }
  ];

  // Community support options
  const communitySupport = [
    {
      name: "Sleep Haven Community",
      description: "Connect with other parents facing similar challenges",
      link: "#"
    },
    {
      name: "Local Parent Groups",
      description: "Find support groups in your area",
      link: "#"
    }
  ];

  // Handle alert partner
  const handleAlertPartner = () => {
    setAlertSent(true);
    setTimeout(() => {
      setAlertSent(false);
    }, 3000);
  };

  // Handle call consultant (placeholder)
  const handleCallConsultant = () => {
    console.log("Would initiate call to sleep consultant");
    // In a real app, this would open the phone app or initiate a call
  };

  // Handle text support (placeholder)
  const handleTextSupport = () => {
    console.log("Would open messaging to support line");
    // In a real app, this would open the messaging app
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  // Styles
  const headingStyle = {
    color: theme.headingColor,
    fontSize: '1.5rem',
    fontFamily: theme.fontFamilyHeadings,
    fontWeight: '600',
    marginBottom: '0.75rem'
  };

  const sectionHeadingStyle = {
    color: theme.headingColor,
    fontSize: '1.2rem',
    fontFamily: theme.fontFamilyHeadings,
    fontWeight: '600',
    marginBottom: '0.75rem',
    marginTop: '1.5rem'
  };

  const textStyle = {
    color: theme.textColor,
    fontSize: '1rem',
    lineHeight: '1.6',
    marginBottom: '1.5rem'
  };

  const optionCardStyle = (color) => ({
    backgroundColor: `${color}15`, // Very light background based on option color
    border: `1px solid ${color}40`,
    borderRadius: '0.75rem',
    padding: '1.25rem',
    marginBottom: '1rem',
    cursor: 'pointer',
    transition: 'all 0.2s ease-out',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
  });

  const resourceCardStyle = {
    backgroundColor: `${theme.primaryColor}10`,
    border: `1px solid ${theme.primaryColor}30`,
    borderRadius: '0.5rem',
    padding: '0.75rem 1rem',
    marginBottom: '0.75rem',
    transition: 'all 0.2s ease'
  };

  return (
    <motion.div
      className="p-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header with back button */}
      <div className="flex items-center mb-4">
        <motion.button
          onClick={onBack}
          className="p-2 rounded-full hover:bg-white/10"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowLeft size={20} color={theme.textColor} />
        </motion.button>
        <motion.h2 
          style={headingStyle}
          className="ml-2"
          variants={itemVariants}
        >
          Contact Support
        </motion.h2>
      </div>

      {/* Alert sent notification */}
      {alertSent && (
        <motion.div
          className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4 flex items-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <AlertTriangle size={20} className="mr-2" />
          <span>Alert sent to your partner!</span>
        </motion.div>
      )}

      {/* Immediate support options */}
      <motion.p 
        style={textStyle}
        variants={itemVariants}
      >
        Choose an option below to get immediate support with your baby's sleep challenges:
      </motion.p>

      <div className="space-y-3">
        {supportOptions.map((option, index) => (
          <motion.div
            key={index}
            style={optionCardStyle(option.color)}
            onClick={option.action}
            whileHover={{ 
              transform: 'translateY(-3px)', 
              boxShadow: `0 8px 16px ${option.color}20`,
              backgroundColor: `${option.color}25`
            }}
            whileTap={{ scale: 0.98 }}
            variants={itemVariants}
          >
            <div className="flex items-start">
              <div 
                style={{
                  color: option.color,
                  backgroundColor: `${option.color}20`,
                  padding: '0.75rem',
                  borderRadius: '0.5rem',
                  marginRight: '1rem'
                }}
              >
                {option.icon}
              </div>
              <div>
                <h3 style={{
                  color: theme.textColor,
                  fontFamily: theme.fontFamilyHeadings,
                  fontSize: '1.1rem',
                  marginBottom: '0.35rem',
                  fontWeight: '600'
                }}>
                  {option.title}
                </h3>
                <p style={{
                  color: theme.subtleTextColor,
                  fontSize: '0.85rem'
                }}>
                  {option.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Professional resources section */}
      <motion.h3 
        style={sectionHeadingStyle}
        variants={itemVariants}
      >
        Professional Resources
      </motion.h3>

      <div className="space-y-2">
        {professionalResources.map((resource, index) => (
          <motion.div
            key={index}
            style={resourceCardStyle}
            whileHover={{ 
              backgroundColor: `${theme.primaryColor}20`,
              transform: 'translateY(-2px)'
            }}
            variants={itemVariants}
          >
            <div className="flex justify-between items-start">
              <div>
                <h4 style={{
                  color: theme.textColor,
                  fontFamily: theme.fontFamilyHeadings,
                  fontSize: '1rem',
                  fontWeight: '600',
                  marginBottom: '0.25rem'
                }}>
                  {resource.name}
                </h4>
                <p style={{
                  color: theme.subtleTextColor,
                  fontSize: '0.8rem'
                }}>
                  {resource.description}
                </p>
              </div>
              <ExternalLink size={16} style={{ color: theme.primaryColor, flexShrink: 0, marginTop: '0.25rem' }} />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Community support section */}
      <motion.h3 
        style={sectionHeadingStyle}
        variants={itemVariants}
      >
        Community Support
      </motion.h3>

      <div className="space-y-2 mb-6">
        {communitySupport.map((support, index) => (
          <motion.div
            key={index}
            style={resourceCardStyle}
            whileHover={{ 
              backgroundColor: `${theme.primaryColor}20`,
              transform: 'translateY(-2px)'
            }}
            variants={itemVariants}
          >
            <div className="flex justify-between items-start">
              <div>
                <h4 style={{
                  color: theme.textColor,
                  fontFamily: theme.fontFamilyHeadings,
                  fontSize: '1rem',
                  fontWeight: '600',
                  marginBottom: '0.25rem'
                }}>
                  {support.name}
                </h4>
                <p style={{
                  color: theme.subtleTextColor,
                  fontSize: '0.8rem'
                }}>
                  {support.description}
                </p>
              </div>
              <ExternalLink size={16} style={{ color: theme.primaryColor, flexShrink: 0, marginTop: '0.25rem' }} />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Supportive message */}
      <motion.p 
        style={{
          color: theme.subtleTextColor,
          fontSize: '0.8rem',
          marginTop: '2rem',
          textAlign: 'center',
          fontStyle: 'italic'
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        Remember, reaching out for help is a sign of strength, not weakness.
      </motion.p>
    </motion.div>
  );
};

export default ContactSupportScreen;
