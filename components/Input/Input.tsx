import React from 'react';

interface InputProps {
    id: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
    type?: string;
  }
  
const Input: React.FC<InputProps> = ({ id, name, value, onChange, error, type = "text" }) => (
    <div className="form-group mb-4">
      <label htmlFor={id} className="block text-gray-700 mb-2">
        {name}
      </label>
      <input
        type={type}
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        className={`appearance-none border ${
          error ? 'border-red-500' : 'border-gray-300'
        } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
      />
      {error && <p className="text-red-500 text-xs italic">{error}</p>}
    </div>
  );

  export default Input