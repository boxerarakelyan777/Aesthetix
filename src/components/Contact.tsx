'use client';

import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const ContactForm = () => {
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      const docRef = await addDoc(collection(db, 'contacts'), {
        email,
        subject,
        message,
        timestamp: new Date(),
      });
      console.log('Document written with ID: ', docRef.id);
      setShowSuccessModal(true);
      
      // Clear form
      setEmail('');
      setSubject('');
      setMessage('');
    } catch (e) {
      console.error('Error adding document: ', e);
      alert('There was an error sending your message. Please try again later.');
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Check out LookMate',
        text: 'I just contacted LookMate. You should check them out!',
        url: 'https://lookmate.vercel.app/',
      }).then(() => {
        console.log('Thanks for sharing!');
      }).catch(console.error);
    } else {
      // Fallback for browsers that don't support the Web Share API
      alert('Sharing is not supported on this browser, but we appreciate your intention!');
    }
  };

  return (
    <section id="contact" className="bg-teal-50 dark:bg-teal-900 relative">
      <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-teal-900 dark:text-teal-50">Contact Us</h2>
        <p className="mb-8 lg:mb-16 font-light text-center text-teal-700 dark:text-teal-200 sm:text-xl">
          Got a technical issue? Want to send feedback about a beta feature? Need details about our subscription plans? Let us know.
        </p>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-teal-900 dark:text-teal-200">Your email</label>
            <input 
              type="email" 
              id="email" 
              className="shadow-sm bg-white border border-teal-300 text-teal-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2.5 dark:bg-teal-800 dark:border-teal-600 dark:placeholder-teal-400 dark:text-teal-50 dark:focus:ring-teal-500 dark:focus:border-teal-500" 
              placeholder="name@lookmate.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>
          <div>
            <label htmlFor="subject" className="block mb-2 text-sm font-medium text-teal-900 dark:text-teal-200">Subject</label>
            <input 
              type="text" 
              id="subject" 
              className="block p-3 w-full text-sm text-teal-900 bg-white rounded-lg border border-teal-300 shadow-sm focus:ring-teal-500 focus:border-teal-500 dark:bg-teal-800 dark:border-teal-600 dark:placeholder-teal-400 dark:text-teal-50 dark:focus:ring-teal-500 dark:focus:border-teal-500" 
              placeholder="Let us know how we can help you" 
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required 
            />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="message" className="block mb-2 text-sm font-medium text-teal-900 dark:text-teal-200">Your message</label>
            <textarea 
              id="message" 
              rows={6} 
              className="block p-2.5 w-full text-sm text-teal-900 bg-white rounded-lg shadow-sm border border-teal-300 focus:ring-teal-500 focus:border-teal-500 dark:bg-teal-800 dark:border-teal-600 dark:placeholder-teal-400 dark:text-teal-50 dark:focus:ring-teal-500 dark:focus:border-teal-500" 
              placeholder="Leave a comment..." 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            ></textarea>
          </div>
          <div>
            <button
              type="submit"
              className="w-full text-white font-bold py-4 px-8 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 bg-gradient-to-r from-teal-500 to-blue-500"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>

      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-teal-800 p-8 rounded-lg shadow-xl max-w-md w-full">
            <h3 className="text-2xl font-bold mb-4 text-teal-900 dark:text-teal-50">Thank You!</h3>
            <p className="text-teal-600 dark:text-teal-300 mb-6">Your message has been sent successfully. We&apos;ll get back to you soon.</p>
            <div className="flex justify-between">
              <button
                onClick={() => setShowSuccessModal(false)}
                className="px-4 py-2 bg-teal-200 text-teal-900 rounded hover:bg-teal-300 transition-colors"
              >
                Close
              </button>
              <button
                onClick={handleShare}
                className="px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600 transition-colors"
              >
                Share
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ContactForm;
