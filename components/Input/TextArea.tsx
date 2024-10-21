import React from 'react';

interface TextareaProps {
    id: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    error?: string;
  }
  
  const Textarea: React.FC<TextareaProps> = ({ id, name, value, onChange, error }) => (
    <div className="form-group mb-4">
      <label htmlFor={id} className="block text-gray-700 font-extralight mb-2">
        {name}
      </label>
      <textarea
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        className={`h-[40px] appearance-none border resize-none ${
          error ? 'border-red-500' : 'border-gray-300'
        } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
      ></textarea>
      {error && <p className="text-red-500 text-xs italic">{error}</p>}
    </div>
  );

  export default Textarea