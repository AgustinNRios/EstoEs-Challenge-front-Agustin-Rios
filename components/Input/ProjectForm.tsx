import React from 'react';

import Input from "../Input/Input";
import Select from "./Select";
import Textarea from "../Input/TextArea";

interface ProjectFormProps {
    formData: {
      name: string;
      description: string;
      manager: string;
      assignedTo: string;
      status: string;
    };
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    errors: {
      name?: string;
      description?: string;
      manager?: string;
      assignedTo?: string;
      status?: string;
    };
    managers: { id: number; name: string }[];
    developers: { id: number; name: string }[];
    isEdit: boolean;
  }

const ProjectForm: React.FC<ProjectFormProps> = ({ formData, handleChange, handleSubmit, errors, managers, developers, isEdit }) => (
    <form className="project-form with-shadow" onSubmit={handleSubmit}>
      <Input
        id="name"
        name="Project name"
        value={formData.name}
        onChange={handleChange}
        error={errors.name}
      />
      <Textarea
        id="description"
        name="Description"
        value={formData.description}
        onChange={handleChange}
        error={errors.description}
      />
      <Select
        id="manager"
        name="Project manager"
        value={formData.manager}
        onChange={handleChange}
        options={[{ value: '', label: 'Select manager' }, ...managers.map(m => ({ value: m.name, label: m.name }))]}
        error={errors.manager}
      />
      <Select
        id="assignedTo"
        name="Assigned to"
        value={formData.assignedTo}
        onChange={handleChange}
        options={[{ value: '', label: 'Select developer' }, ...developers.map(d => ({ value: d.name, label: d.name }))]}
        error={errors.assignedTo}
      />
      <Select
        id="status"
        name="Status"
        value={formData.status}
        onChange={handleChange}
        options={[
          { value: 'enabled', label: 'Enabled' },
          { value: 'disabled', label: 'Disabled' },
        ]}
        error={errors.status}
      />
      <button
        type="submit"
        className="bg-red-600 text-white font-500 py-2 px-4 rounded w-full sm:w-auto hover:bg-red-700"
      >
        {isEdit ? 'Save Changes' : 'Create Project'}
      </button>
    </form>
  );
  
  export default ProjectForm;