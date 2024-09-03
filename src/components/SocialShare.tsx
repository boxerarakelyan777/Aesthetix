import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SocialShareProps {
  socialShareLinks: {
    icon: React.ReactNode;
    name: string;
    action: () => void;
  }[];
}

const SocialShare: React.FC<SocialShareProps> = ({ socialShareLinks }) => {
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);

  const handlePlatformClick = (name: string, action: () => void) => {
    setSelectedPlatform(name);
    setTimeout(() => {
      action();
      setSelectedPlatform(null);
    }, 500);
  };

  return (
    <div className="flex flex-wrap justify-center gap-4">
      {socialShareLinks.map((social, index) => (
        <motion.button
          key={index}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => handlePlatformClick(social.name, social.action)}
          className="relative p-3 bg-midnight-black rounded-full text-electric-cyan hover:text-royal-purple transition-colors"
        >
          {social.icon}
          <AnimatePresence>
            {selectedPlatform === social.name && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-deep-slate-gray text-soft-white px-2 py-1 rounded text-xs whitespace-nowrap"
              >
                Opening {social.name}...
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      ))}
    </div>
  );
};

export default SocialShare;