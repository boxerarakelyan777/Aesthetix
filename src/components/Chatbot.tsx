'use client'

import React, { useState, useEffect, useRef } from "react";
import { useUser } from "@clerk/nextjs";
import { collection, doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { motion, AnimatePresence } from 'framer-motion';
import { FiGlobe, FiTrash2, FiMaximize2, FiMinimize2, FiX, FiThumbsUp, FiThumbsDown, FiSend } from 'react-icons/fi';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'de', name: 'Deutsch' },
  { code: 'fr', name: 'Français' },
  { code: 'it', name: 'Italiano' },
  { code: 'pt', name: 'Português' },
  { code: 'hi', name: 'हिन्दी' },
  { code: 'es', name: 'Español' },
  { code: 'th', name: 'ไทย' },
];

const initialMessages = {
  en: "How can I help you today?",
  de: "Wie kann ich Ihnen heute helfen?",
  fr: "Comment puis-je vous aider aujourd'hui ?",
  it: "Come posso aiutarti oggi?",
  pt: "Como posso ajudar você hoje?",
  hi: "आज मैं आपकी कैसे मदद कर सकता हूँ?",
  es: "¿Cómo puedo ayudarte hoy?",
  th: "วันนี้ฉันจะช่วยคุณอย่างไรดี?",
};

const getPersonalizedGreeting = (name: string | null | undefined, language: keyof typeof initialMessages) => {
  const greetings = {
    en: `Hello ${name || 'there'}! How can I help you today?`,
    de: `Hallo ${name || 'dort'}! Wie kann ich Ihnen heute helfen?`,
    fr: `Bonjour ${name || 'là'}! Comment puis-je vous aider aujourd'hui ?`,
    it: `Ciao ${name || 'lì'}! Come posso aiutarti oggi?`,
    pt: `Olá ${name || 'aí'}! Como posso ajudar você hoje?`,
    hi: `नमस्ते ${name || 'वहाँ'}! आज मैं आपकी कैसे मदद कर सकता हूँ?`,
    es: `¡Hola ${name || 'allí'}! ¿Cómo puedo ayudarte hoy?`,
    th: `สวัสดี ${name || 'ที่นั่น'}! วันนี้ฉันจะช่วยคุณอย่างไรดี?`,
  };
  return greetings[language] || greetings.en;
};

const Chatbot: React.FC = () => {
  const [showChatbot, setShowChatbot] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState<keyof typeof initialMessages>('en');
  const { user } = useUser();
  const [feedbacks, setFeedbacks] = useState<{[key: number]: 'up' | 'down' | null}>({});
  const [regeneratingIndex, setRegeneratingIndex] = useState<number | null>(null);
  const messageContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (user) {
      loadUserChat();
    } else {
      setMessages([{ role: "bot", content: initialMessages[selectedLanguage] }]);
    }
  }, [user]);

  const loadUserChat = async () => {
    if (user) {
      const chatRef = doc(collection(db, 'userChats'), user.id);
      const chatDoc = await getDoc(chatRef);
      if (chatDoc.exists()) {
        const chatData = chatDoc.data();
        setMessages(chatData.messages || [{ role: "bot", content: getPersonalizedGreeting(user.fullName, chatData.language || 'en') }]);
        setSelectedLanguage(chatData.language || 'en');
      } else {
        setMessages([{ role: "bot", content: getPersonalizedGreeting(user.fullName, selectedLanguage) }]);
      }
    }
  };

  const saveUserChat = async (messagesToSave: { role: string; content: string }[]) => {
    if (user) {
      const chatRef = doc(collection(db, 'userChats'), user.id);
      await setDoc(chatRef, { messages: messagesToSave, language: selectedLanguage }, { merge: true });
    }
  };

  const clearChat = () => {
    const initialMessage = { 
      role: "bot", 
      content: user 
        ? getPersonalizedGreeting(user.fullName, selectedLanguage) 
        : initialMessages[selectedLanguage] 
    };
    setMessages([initialMessage]);
    if (user) {
      saveUserChat([initialMessage]);
    }
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const newUserMessage = { role: "user", content: input };
    const updatedMessages = [...messages, newUserMessage];
    setMessages(updatedMessages);
    setInput("");

    if (user) {
      await saveUserChat(updatedMessages);
    }

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify([
          newUserMessage,
          { role: "system", content: `Respond in ${languages.find(lang => lang.code === selectedLanguage)?.name}${user && user.fullName ? `. The user's name is ${user.fullName}.` : ''}` }
        ]),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder("utf-8");
      let accumulatedResponse = "";

      while (true) {
        const { done, value } = await reader?.read()!;
        if (done) break;

        const chunk = decoder.decode(value);
        accumulatedResponse += chunk;
      }

      const newBotMessage = { role: "bot", content: accumulatedResponse };
      const finalMessages = [...updatedMessages, newBotMessage];
      setMessages(finalMessages);

      if (user) {
        await saveUserChat(finalMessages);
      }
    } catch (error) {
      console.error('Error in handleSendMessage:', error);
    }
  };

  const toggleChatbotSize = () => {
    setIsExpanded(!isExpanded);
  };

  const formatMessage = (content: string) => {
    content = content.replace(/\*\*(.*?)\*\*/g, '$1');
    const lines = content.split('\n');
    return lines.map((line, index) => {
      const numberedMatch = line.match(/^\d+\.\s(.+)/);
      if (numberedMatch) {
        return <div key={index} className="ml-4">• {numberedMatch[1]}</div>;
      }
      if (line.startsWith('- ') || line.startsWith('• ')) {
        return <div key={index} className="ml-4">{line}</div>;
      }
      return <div key={index}>{line}</div>;
    });
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLang = e.target.value as keyof typeof initialMessages;
    setSelectedLanguage(newLang);
    
    const newInitialMessage = { 
      role: "bot", 
      content: user 
        ? getPersonalizedGreeting(user.fullName, newLang) 
        : initialMessages[newLang] 
    };

    setMessages(prevMessages => [newInitialMessage, ...prevMessages.slice(1)]);

    if (user) {
      saveUserChat([newInitialMessage, ...messages.slice(1)]);
    }
  };

  const scrollToBottom = () => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleFeedback = async (index: number, type: 'up' | 'down') => {
    setFeedbacks(prev => ({ ...prev, [index]: type }));
    
    if (type === 'down') {
      setRegeneratingIndex(index);
      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify([
            { role: "user", content: messages[index - 1].content },
            { role: "system", content: `Respond in ${languages.find(lang => lang.code === selectedLanguage)?.name}${user && user.fullName ? `. The user's name is ${user.fullName}.` : ''}. The previous response was not satisfactory. Please provide a better answer.` }
          ]),
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        const reader = response.body?.getReader();
        const decoder = new TextDecoder("utf-8");
        let accumulatedResponse = "";
  
        while (true) {
          const { done, value } = await reader?.read()!;
          if (done) break;
  
          const chunk = decoder.decode(value);
          accumulatedResponse += chunk;
        }
  
        const updatedMessages = [...messages];
        updatedMessages[index] = { ...updatedMessages[index], content: accumulatedResponse };
        setMessages(updatedMessages);
  
        setFeedbacks(prev => ({ ...prev, [index]: null }));
  
        if (user) {
          await saveUserChat(updatedMessages);
        }

        scrollToBottom();
      } catch (error) {
        console.error('Error regenerating response:', error);
      } finally {
        setRegeneratingIndex(null);
      }
    }
  };

  return (
    <>
      {/* Chat Icon Button */}
      <div className="fixed bottom-8 right-8 z-50">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowChatbot(!showChatbot)}
          className="bg-gradient-to-r from-royal-purple to-electric-cyan text-soft-white p-4 rounded-full shadow-xl hover:shadow-glow transition-all duration-300 ease-in-out"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </motion.button>
      </div>

      {/* Chatbot Popup */}
      <AnimatePresence>
        {showChatbot && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className={`fixed bottom-24 right-8 bg-midnight-black rounded-lg shadow-2xl flex flex-col z-50 overflow-hidden ${
              isExpanded ? 'w-[28rem] h-[36rem]' : 'w-96 h-[28rem]'
            }`}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-royal-purple to-electric-cyan p-4 text-soft-white">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-bold font-sans">AI Assistant</h3>
                <div className="flex items-center space-x-2">
                  <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={clearChat} className="text-soft-white hover:text-electric-cyan transition-colors">
                    <FiTrash2 className="h-5 w-5" />
                  </motion.button>
                  <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={toggleChatbotSize} className="text-soft-white hover:text-electric-cyan transition-colors">
                    {isExpanded ? <FiMinimize2 className="h-5 w-5" /> : <FiMaximize2 className="h-5 w-5" />}
                  </motion.button>
                  <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => setShowChatbot(false)} className="text-soft-white hover:text-electric-cyan transition-colors">
                    <FiX className="h-5 w-5" />
                  </motion.button>
                </div>
              </div>
              <div className="relative">
                <FiGlobe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-soft-white" />
                <select
                  value={selectedLanguage}
                  onChange={handleLanguageChange}
                  className="w-full pl-10 pr-4 py-2 bg-slate-gray bg-opacity-20 border border-soft-white border-opacity-30 rounded-md text-sm text-soft-white appearance-none focus:outline-none focus:ring-2 focus:ring-electric-cyan transition-all duration-300"
                >
                  {languages.map((lang) => (
                    <option key={lang.code} value={lang.code} className="bg-midnight-black">
                      {lang.name}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-soft-white">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div 
              ref={messageContainerRef}
              className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-gray"
            >
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${message.role === "bot" ? "justify-start" : "justify-end"}`}
                >
                  <div className={`max-w-[75%] p-3 rounded-lg shadow-md ${
                    message.role === "bot" 
                      ? "bg-midnight-black text-soft-white" 
                      : "bg-gradient-to-r from-royal-purple to-electric-cyan text-soft-white"
                  }`}>
                    <div className="whitespace-pre-wrap break-words">{formatMessage(message.content)}</div>
                    {message.role === "bot" && (
                      <div className="mt-2 flex justify-end space-x-2">
                        <motion.button 
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleFeedback(index, 'up')} 
                          className={`p-1 rounded ${feedbacks[index] === 'up' ? 'bg-electric-cyan text-midnight-black' : 'bg-slate-gray text-soft-white'}`}
                          disabled={feedbacks[index] === 'down'}
                        >
                          <FiThumbsUp className="h-4 w-4" />
                        </motion.button>
                        <motion.button 
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleFeedback(index, 'down')} 
                          className={`p-1 rounded ${feedbacks[index] === 'down' ? 'bg-vibrant-coral text-midnight-black' : 'bg-slate-gray text-soft-white'}`}
                          disabled={feedbacks[index] === 'up'}
                        >
                          <FiThumbsDown className="h-4 w-4" />
                        </motion.button>
                        {regeneratingIndex === index && (
                          <span className="text-sm text-electric-cyan">Regenerating...</span>
                        )}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Input area */}
            <div className="p-4 bg-midnight-black border-t border-slate-gray">
              <div className="relative">
                <input
                  type="text"
                  className="w-full p-2 pr-10 bg-slate-gray text-soft-white border border-slate-gray rounded-full focus:outline-none focus:ring-2 focus:ring-electric-cyan transition-all duration-300"
                  placeholder="Type your message..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSendMessage();
                  }}
                />
                <motion.button 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleSendMessage}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-electric-cyan hover:text-royal-purple transition-colors"
                >
                  <FiSend className="h-5 w-5" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;