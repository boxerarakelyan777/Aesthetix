import React from 'react';

export const SelectionPanel = ({ title, options, onSelect, selected }) => (
  <div className="bg-slate-800 rounded-lg p-4 flex-1">
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <div className="flex flex-wrap gap-2">
      {options.map((option) => (
        <button
          key={option}
          className={`px-3 py-1 ${
            selected === option
              ? 'bg-electric-cyan text-midnight-black'
              : 'bg-slate-700 hover:bg-electric-cyan hover:text-midnight-black'
          } rounded transition-colors`}
          onClick={() => onSelect(option)}
        >
          {option}
        </button>
      ))}
    </div>
  </div>
);

export const ActionButton = ({ text, onClick, disabled }) => (
  <button
    className={`px-6 py-2 bg-gradient-to-r from-electric-cyan to-royal-purple text-soft-white rounded-full transition-all ${
      disabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
    }`}
    onClick={onClick}
    disabled={disabled}
  >
    {text}
  </button>
);