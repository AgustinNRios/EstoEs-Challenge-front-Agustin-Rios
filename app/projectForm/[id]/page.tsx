import ProjectContainer from '@/components/Form/Form';
import React from 'react';

export default function Form({ params }: { params: { id: string } }) {
  return (
    <ProjectContainer isEdit = {true} id={params.id} />
  );
}
