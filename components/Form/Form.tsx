"use client";
import React, { useState } from 'react';
import ProjectForm from '../Input/ProjectForm';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { v4 as uuid } from 'uuid';
import useProjectsStore from '@/store/useProjectsStore';
import { managers, developers, obtenerAvatar } from '@/data/data';
import { validateField, validateForm } from '@/utilities/validationForm';
import './style.css';

interface FormProps {
    isEdit?: boolean;
    id?: string;
}

const ProjectContainer: React.FC<FormProps> = ({ isEdit, id }) => {
    const router = useRouter();
    const { addProject, updateProject, getProjectById } = useProjectsStore();
    // const [isLoading, setIsLoading] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        manager: '',
        assignedTo: '',
        status: 'Enabled',
        createdAt: new Date()
    });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        if (isEdit && id) {
            // setIsLoading(true);
            const project = getProjectById(id);
            if (project) {
                setFormData({ ...project });
                // setIsLoading(false);
            }
        }
        // setIsLoading(false);
    }, [isEdit, id]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: name === 'description' ? value.trim() : value,
        });

        const error = validateField(name, value);
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: error,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const validationErrors = validateForm(formData);
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length > 0) {
            return;
        }
        let project: any = {}
        if(id){
            project = getProjectById(id)
        }
        if (isEdit) {
            updateProject({
                ...formData,
                id: project.id,
                avatarManager: project.avatarManager,
                designatedAvatar: project.designatedAvatar,
            });
        } else {
            const newProject = {
                id: uuid(),
                ...formData,
                createdAt: new Date(),
                avatarManager: obtenerAvatar(formData.manager),
                designatedAvatar: obtenerAvatar(formData.assignedTo),
            };
            addProject(newProject);
        }
        setFormData({
            name: '',
            description: '',
            manager: '',
            assignedTo: '',
            status: 'Enabled',
            createdAt: new Date()
        });
        router.push('/');
    };

    return (
        <div className="mx-auto max-w-[600px]">
            <ProjectForm
                formData={formData}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                errors={errors}
                managers={managers}
                developers={developers}
                isEdit={isEdit || false}
            />
        </div>
    );
};

export default ProjectContainer;