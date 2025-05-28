import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, MessageCircle, ThumbsUp, User, Users } from 'lucide-react';

const CommunityWisdomScreen = ({ theme, onBack }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Community wisdom data - simulated community posts and experiences
  const communityPosts = [
    {
      id: 1,
      author: "SleepyParent23",
      category: "overtired",
      title: "What worked for my overtired 6-month-old",
      content: "When my baby was overtired, I found that dimming all lights 30 minutes before bedtime and using a consistent white noise machine made a huge difference. The first few nights were still tough, but by night 4, she started settling much faster.",
      likes: 42,
      replies: 12,
      isVerified: true
    },
    {
      id: 2,
      author: "NightOwlMom",
      category: "teething",
      title: "Teething relief that actually worked",
      content: "My son was up every hour with teething pain. What finally helped was a cold teether kept in the fridge (not freezer), infant Tylenol 30 minutes before bedtime (doctor approved), and gentle gum massage. He went from hourly wake-ups to only waking twice.",
      likes: 38,
      replies: 8,
      isVerified: true
    },
    {
      id: 3,
      author: "TwinDaddy",
      category: "separation",
      title: "How we overcame separation anxiety",
      content: "Both our twins developed separation anxiety around 9 months. We started doing very brief separations during the day - just walking to the next room while talking to them, then coming back with big smiles. We gradually increased the time, and within two weeks, bedtime became much easier.",
      likes: 27,
      replies: 5,
      isVerified: false
    },
    {
      id: 4,
      author: "PeacefulNights",
      category: "general",
      title: "The schedule change that changed everything",
      content: "After struggling for months, we realized our baby was actually undertired at bedtime. We extended wake windows by 15 minutes every few days until we found the sweet spot. Bedtime went from 1-hour battles to 10-minute peaceful settling.",
      likes: 56,
      replies: 23,
      isVerified: true
    },
    {
      id: 5,
      author: "FirstTimeMama",
      category: "general",
      title: "It does get better - our journey",
      content: "The first 4 months were so hard with constant wake-ups. We tried everything, but honestly, what helped most was just time and consistency. By 5.5 months, things suddenly improved. If you're in the thick of it, hang in there - it really does get better.",
      likes: 104,
      replies: 34,
      isVerified: false
    }
  ];

  // Filter posts based on selected category
  const filteredPosts = selectedCategory === 'all' 
    ? communityPosts 
    : communityPosts.filter(post => post.category === selectedCategory);

  // Categories for filtering
  const categories = [
    { id: 'all', name: 'All Posts' },
    { id: 'overtired', name: 'Overtired' },
    { id: 'teething', name: 'Teething' },
    { id: 'separation', name: 'Separation Anxiety' },
    { id: 'general', name: 'General Tips' }
  ];

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

  const textStyle = {
    color: theme.textColor,
    fontSize: '1rem',
    lineHeight: '1.6',
    marginBottom: '1rem'
  };

  const categoryStyle = (isSelected) => ({
    backgroundColor: isSelected ? `${theme.primaryColor}30` : `${theme.primaryColor}10`,
    color: isSelected ? theme.headingColor : theme.textColor,
    border: `1px solid ${isSelected ? theme.primaryColor : theme.primaryColor + '30'}`,
    borderRadius: '0.5rem',
    padding: '0.5rem 0.75rem',
    fontSize: '0.85rem',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    fontWeight: isSelected ? '600' : '400'
  });

  const postCardStyle = {
    backgroundColor: `${theme.primaryColor}10`,
    border: `1px solid ${theme.primaryColor}30`,
    borderRadius: '0.75rem',
    padding: '1.25rem',
    marginBottom: '1.25rem',
    transition: 'all 0.2s ease-out',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
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
          Community Wisdom
        </motion.h2>
      </div>

      {/* Introduction */}
      <motion.p 
        style={textStyle}
        variants={itemVariants}
      >
        See how other parents have handled similar sleep challenges. These are real experiences shared by our community.
      </motion.p>

      {/* Category filters */}
      <motion.div 
        className="flex flex-wrap gap-2 mb-4"
        variants={itemVariants}
      >
        {categories.map(category => (
          <motion.button
            key={category.id}
            style={categoryStyle(selectedCategory === category.id)}
            onClick={() => setSelectedCategory(category.id)}
            whileHover={{ 
              backgroundColor: `${theme.primaryColor}30`,
              transform: 'translateY(-2px)'
            }}
            whileTap={{ scale: 0.98 }}
          >
            {category.name}
          </motion.button>
        ))}
      </motion.div>

      {/* Community posts */}
      <div className="space-y-4">
        {filteredPosts.map((post, index) => (
          <motion.div
            key={post.id}
            style={postCardStyle}
            variants={itemVariants}
            whileHover={{ 
              transform: 'translateY(-3px)', 
              boxShadow: `0 8px 16px ${theme.primaryColor}15`,
              backgroundColor: `${theme.primaryColor}15`
            }}
          >
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center">
                <div 
                  style={{
                    backgroundColor: `${theme.primaryColor}20`,
                    padding: '0.5rem',
                    borderRadius: '50%',
                    marginRight: '0.5rem'
                  }}
                >
                  <User size={16} color={theme.primaryColor} />
                </div>
                <div>
                  <div className="flex items-center">
                    <span style={{
                      color: theme.textColor,
                      fontWeight: '600',
                      fontSize: '0.9rem'
                    }}>
                      {post.author}
                    </span>
                    {post.isVerified && (
                      <span 
                        className="ml-1 px-1.5 py-0.5 rounded text-xs"
                        style={{
                          backgroundColor: `${theme.primaryColor}30`,
                          color: theme.primaryColor,
                          fontSize: '0.7rem',
                          fontWeight: '600'
                        }}
                      >
                        Verified
                      </span>
                    )}
                  </div>
                  <span style={{
                    color: theme.subtleTextColor,
                    fontSize: '0.75rem'
                  }}>
                    {categories.find(c => c.id === post.category)?.name || 'General'}
                  </span>
                </div>
              </div>
            </div>
            
            <h3 style={{
              color: theme.headingColor,
              fontFamily: theme.fontFamilyHeadings,
              fontSize: '1.1rem',
              fontWeight: '600',
              marginBottom: '0.5rem'
            }}>
              {post.title}
            </h3>
            
            <p style={{
              color: theme.textColor,
              fontSize: '0.9rem',
              lineHeight: '1.5',
              marginBottom: '1rem'
            }}>
              {post.content}
            </p>
            
            <div className="flex items-center text-sm" style={{ color: theme.subtleTextColor }}>
              <div className="flex items-center mr-4">
                <ThumbsUp size={14} className="mr-1" />
                <span>{post.likes}</span>
              </div>
              <div className="flex items-center">
                <MessageCircle size={14} className="mr-1" />
                <span>{post.replies}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Community message */}
      <motion.div 
        className="mt-6 p-4 rounded-lg text-center"
        style={{
          backgroundColor: `${theme.primaryColor}15`,
          border: `1px solid ${theme.primaryColor}30`,
        }}
        variants={itemVariants}
      >
        <div className="flex justify-center mb-2">
          <Users size={24} style={{ color: theme.primaryColor }} />
        </div>
        <h3 style={{
          color: theme.headingColor,
          fontFamily: theme.fontFamilyHeadings,
          fontSize: '1.1rem',
          fontWeight: '600',
          marginBottom: '0.5rem'
        }}>
          You're Not Alone
        </h3>
        <p style={{
          color: theme.textColor,
          fontSize: '0.9rem',
          lineHeight: '1.5'
        }}>
          Thousands of parents are going through similar challenges right now. What you're experiencing is normal and temporary.
        </p>
      </motion.div>

      {/* Supportive message */}
      <motion.p 
        style={{
          color: theme.subtleTextColor,
          fontSize: '0.8rem',
          marginTop: '1.5rem',
          textAlign: 'center',
          fontStyle: 'italic'
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        Every baby is different. Take what works for you and leave the rest.
      </motion.p>
    </motion.div>
  );
};

export default CommunityWisdomScreen;
