import React from 'react';

interface SelectionPanelProps {
  title: string;
  options: string[];
  onSelect: (option: string) => void;
  selected: string;
}

export const SelectionPanel: React.FC<SelectionPanelProps> = ({ title, options, onSelect, selected }) => (
  <div className="bg-slate-800 rounded-lg p-6 shadow-lg">
    <h3 className="text-2xl font-bold mb-4 text-electric-cyan">{title}</h3>
    <div className="flex flex-wrap gap-2">
      {options.map((option) => (
        <button
          key={option}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
            selected === option
              ? 'bg-electric-cyan text-midnight-black shadow-md'
              : 'bg-slate-700 text-soft-white hover:bg-slate-600'
          }`}
          onClick={() => onSelect(option)}
        >
          {option}
        </button>
      ))}
    </div>
  </div>
);

interface ActionButtonProps {
  text: string;
  onClick: () => void;
  disabled?: boolean;
}

export const ActionButton: React.FC<ActionButtonProps> = ({ text, onClick, disabled }) => (
  <button
    className={`px-8 py-3 bg-gradient-to-r from-electric-cyan to-royal-purple text-soft-white rounded-full text-lg font-semibold shadow-lg transition-all duration-300 ${
      disabled ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-xl hover:scale-105'
    }`}
    onClick={onClick}
    disabled={disabled}
  >
    {text}
  </button>
);