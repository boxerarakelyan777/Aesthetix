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
    <section id="contact" className="bg-midnight-black text-soft-white py-16">
      <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-electric-cyan">Contact Us</h2>
        <p className="mb-8 lg:mb-16 font-light text-center text-soft-white sm:text-xl">
          Got a technical issue? Want to send feedback about a beta feature? Need details about our subscription plans? Let us know.
        </p>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-electric-cyan">Your email</label>
            <input 
              type="email" 
              id="email" 
              className="shadow-sm bg-slate-gray border border-gray-700 text-soft-white text-sm rounded-lg focus:ring-electric-cyan focus:border-electric-cyan block w-full p-2.5" 
              placeholder="name@lookmate.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>
          <div>
            <label htmlFor="subject" className="block mb-2 text-sm font-medium text-electric-cyan">Subject</label>
            <input 
              type="text" 
              id="subject" 
              className="block p-3 w-full text-sm text-soft-white bg-slate-gray rounded-lg border border-gray-700 shadow-sm focus:ring-electric-cyan focus:border-electric-cyan" 
              placeholder="Let us know how we can help you" 
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required 
            />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="message" className="block mb-2 text-sm font-medium text-electric-cyan">Your message</label>
            <textarea 
              id="message" 
              rows={6} 
              className="block p-2.5 w-full text-sm text-soft-white bg-slate-gray rounded-lg shadow-sm border border-gray-700 focus:ring-electric-cyan focus:border-electric-cyan" 
              placeholder="Leave a comment..." 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            ></textarea>
          </div>
          <div>
            <button
              type="submit"
              className="w-full text-white font-bold py-4 px-8 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 bg-gradient-to-r from-royal-purple to-electric-cyan"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>

      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-slate-gray p-8 rounded-lg shadow-xl max-w-md w-full">
            <h3 className="text-2xl font-bold mb-4 text-electric-cyan">Thank You!</h3>
            <p className="text-gray-400 mb-6">Your message has been sent successfully. We&apos;ll get back to you soon.</p>
            <div className="flex justify-between">
              <button
                onClick={() => setShowSuccessModal(false)}
                className="px-4 py-2 bg-slate-gray text-electric-cyan rounded hover:bg-electric-cyan hover:text-midnight-black transition-colors"
              >
                Close
              </button>
              <button
                onClick={handleShare}
                className="px-4 py-2 bg-royal-purple text-white rounded hover:bg-electric-cyan transition-colors"
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
