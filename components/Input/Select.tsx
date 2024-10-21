import React from 'react';
import { Select as NextSelect, SelectItem } from '@nextui-org/react'

interface SelectProps {
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
  error?: string;
}

// Select Component
const Select: React.FC<SelectProps> = ({ id, name, value, onChange, options, error }) => (
  <div className="form-group mb-4">
    <select
      id={id}
      name={id}
      value={value}
      onChange={onChange}
      className={`border ${error ? 'border-red-500' : 'border-gray-300'
      } h-[40px] rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
    >
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
    {error && <p className="text-red-500 text-xs italic">{error}</p>}
  </div>
);

export default Select