'use client';
import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import {
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  User,
} from '@nextui-org/react';
import { VerticalDotsIcon } from '@/icons/VerticalDotsIcon';
import { EditIcon } from '@/icons/EditIcon';
import { DeleteIcon } from '@/icons/DeleteIcon';
import { DialogArrow } from '@/icons/DialogArrow'
import { columns } from '../../data/data';
import useProjectsStore from '@/store/useProjectsStore';
import Swal from 'sweetalert2';

export default function CustomTable() {
  const router = useRouter();
  const { projectsData, deleteProject } = useProjectsStore();
  const [filterValue, setFilterValue] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [page, setPage] = useState(1);

  const pages = Math.ceil(projectsData.length / rowsPerPage);

  const hasSearchFilter = Boolean(filterValue);

  const filteredItems = useMemo(() => {
    let filteredProjects = [...projectsData];

    if (hasSearchFilter) {
      filteredProjects = filteredProjects.filter((project) =>
        project.name.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    return filteredProjects;
  }, [projectsData, filterValue]);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  // const formatDate = (dateString: Date) => {
  //   return new Date(dateString).toLocaleString('es-ES', {
  //     day: '2-digit',
  //     month: '2-digit',
  //     year: 'numeric',
  //     hour: '2-digit',
  //     minute: '2-digit',
  //     hour12: true,
  //   });
  // };

  const onRowsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  };

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterValue(e.target.value);
    setPage(1);
  };

  const handleDelete = async (id: string) => {
    await Swal.fire({
      title: '¿Estas seguro de borrar el proyecto?',
      text: 'No podras recuperarlo!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#000000',
      confirmButtonText: 'Borrar',
      cancelButtonText: 'Cancelar',
      iconColor: 'red',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProject(id);
      }
    });
  };

  const formatDate = (dateString: Date) => {
    return format(new Date(dateString), 'dd/MM/yyyy, hh:mm a'); // Formato fijo
  };

  function obtenerIniciales(nombreCompleto: string) {
    return nombreCompleto
      .split(' ')
      .map((nombre) => nombre.charAt(0).toUpperCase())
      .join('');
  }

  return (
      <div className='mx-auto flex flex-col h-[100%] max-w-[1330px] mt-[10px]'>
          <div className="flex flex-col md:flex-row min-h-[57px] w-full justify-between items-end mb-5">
            <input
              type="text"
              placeholder="Search by name..."
              className="focus:outline-none with-shadow border rounded px-3 py-2 mb-3 md:mb-0 w-full md:max-w-md "
              value={filterValue}
              onChange={onSearchChange} />
            <div className="flex items-center me-4">
              <span className="text-gray-500 mr-2">Rows per page:</span>
              <select
                value={rowsPerPage}
                onChange={onRowsPerPageChange}
                className="border rounded p-2 px-4 focus:outline-gray-500 with-shadow"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
              </select>
            </div>
          </div>
          <div className="overflow-x-auto w-full h-[580px] overflow-y-scroll bg-white with-shadow">
            <table className="min-w-full bg-white border border-gray-200 w-full" >
              <thead className='bg-[#fcfcfc]'>
                <tr>
                  {columns.map((column) => (
                    <th
                      key={column.uid}
                      className={`py-3 px-5 border-b text-left hidden ${column.name == "Project Manager" ? "lg:table-cell": "md:table-cell"}`}
                    >
                      {column.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody >
                {items.map((item) => (
                  <tr key={item.id} className="border-b hover:bg-gray-100 " >
                    {/* name */}
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium sm:pl-6 ">
                      <p className="text-xl md:text-default-800">{item.name}</p>
                      <span className="text-default-400 text-sm">
                        Creation Date: {formatDate(item.createdAt)}
                      </span>
                      <dl className="md:hidden mt-2">
                        <dt className="sr-only">Assigned To</dt>
                        <dd>
                          <User
                            avatarProps={{
                              radius: 'full',
                              size: 'sm',
                              src: item.designatedAvatar,
                            }}
                            classNames={{
                              description: 'text-default-500',
                            }}
                            name={item.assignedTo}
                          >
                            {item.assignedTo}
                          </User>
                        </dd>
                      </dl>
                    </td>
                    {/* manager */}
                    <td className="hidden lg:table-cell whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium sm:pl-6 ">
                      <User
                        avatarProps={{
                          radius: 'full',
                          size: 'sm',
                          src: item.avatarManager,
                          alt: obtenerIniciales(item.manager)
                        }}
                        classNames={{
                          description: 'text-default-500',
                        }}
                        name={item.manager}
                      >
                        {'asdsas'}
                      </User>
                    </td>
                    {/* designated */}
                    <td className="hidden md:table-cell whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium sm:pl-6 ">
                      <User
                        avatarProps={{
                          radius: 'full',
                          size: 'sm',
                          src: item.designatedAvatar,
                        }}
                        classNames={{
                          description: 'text-default-500',
                        }}
                        name={item.assignedTo}
                      >
                        {obtenerIniciales(item.assignedTo)}
                      </User>
                    </td>
                    {/* Status */}
                    <td className="hidden md:table-cell whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium sm:pl-6 ">
                      <Button
                        className={`capitalize border-2 border-gray-100 gap-1 bg-gray-50 ${item.status === 'Enabled' ? 'bg-green-200': 'bg-red-200'}`}
                        size="sm"
                      >
                        {item.status}
                      </Button>
                    </td>
                    {/* Actions */}
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium sm:pl-6 ">
                      <div className="relative flex align-middle items-center gap-2">
                        <Dropdown className="bg-background border-1 border-default-200 absolute right-[-30px] h-[80px] min-w-[140px] with-shadow">
                          <DropdownTrigger>
                            <Button
                              isIconOnly
                              radius="full"
                              size="sm"
                              variant="light"
                              aria-label="More actions"
                            >
                              <VerticalDotsIcon />
                            </Button>
                          </DropdownTrigger>
                          <DropdownMenu aria-label="Actions menu" className='relative right-0'>
                            <DropdownItem
                              textValue="Edit"
                              onClick={() => router.push(`/projectForm/${item.id}`)}
                            >
                              <div className="flex items-center gap-2">
                                <EditIcon />
                                Edit
                              </div>
                              <div className='w-3 h-3 absolute bottom-[32px] right-[15px] z-10'>
                                <DialogArrow></DialogArrow>
                              </div>
                            </DropdownItem>
                            <DropdownItem
                              textValue="Delete"
                              onClick={() => void handleDelete(item.id)}
                            >
                              <div className="flex items-center gap-2">
                                <DeleteIcon />
                                Delete
                              </div>
                            </DropdownItem>
                          </DropdownMenu>
                        </Dropdown>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        <div className="py-2 flex gap-1 justify-center">
          <button
            className={`px-4 py-2 bg-white border rounded ${page === 1 ? 'hidden' : ''}`}
            onClick={() => setPage(page - 1)}
          >
            Previous
          </button>
          <span className="px-4 bg-white py-2 border rounded">{page}</span>
          <button
            className={`px-4 py-2 bg-white border rounded ${page === pages ? 'hidden' : ''}`}
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        </div>
      </div>
  );
}
