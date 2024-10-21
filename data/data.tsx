const columns = [
  { name: 'Project info', uid: 'info' },
  { name: 'Project Manager', uid: 'manager' },
  { name: 'Assigned to', uid: 'designated' },
  { name: 'Status', uid: 'status' },
  { name: 'Action', uid: 'actions' },
];

const projectsData = [
  {
    id: '1',
    name: 'Challenge Front-end',
    createdAt: new Date(),
    manager: 'Ignacio Francolino',
    avatarManager: '/images/ignaciofrancolino.webp',
    assignedTo: 'Agustin Rios',
    designatedAvatar: "/images/agustinrios.webp",
    status: 'Enabled',
    description: 'Projectos de prueba',
  },
  {
    id: '2',
    name: 'Diseño de UI',
    createdAt: new Date(),
    manager: 'Lionel Messi',
    avatarManager: '/images/messi.jpg',
    assignedTo: 'Franco colapinto',
    designatedAvatar: "/images/colapinto.jpg",
    status: 'Enabled',
    description: 'Projectos de prueba',
  },
  {
    id: '3',
    name: 'App React y Next.js',
    createdAt: new Date(),
    manager: 'Ignacio Francolino',
    avatarManager: '/images/ignaciofrancolino.webp',
    assignedTo: 'Agustin Rios',
    designatedAvatar: "/images/agustinrios.webp",
    status: 'Enabled',
    description: 'Projectos de prueba',
  },
  {
    id: '4',
    name: 'App Angular',
    createdAt: new Date(),
    manager: 'Emiliano Martinez',
    avatarManager: '/images/emiliano.jpg',
    assignedTo: 'Agustin Rios',
    designatedAvatar: "/images/agustinrios.webp",
    status: 'Enabled',
    description: 'Projectos de prueba',
  },
  {
    id: '5',
    name: 'Diseño de Assets con Suit Adobe',
    createdAt: new Date(),
    manager: 'Ignacio Francolino',
    avatarManager: '/images/ignaciofrancolino.webp',
    assignedTo: 'Agustin Rios',
    designatedAvatar: "/images/agustinrios.webp",
    status: 'Disabled',
    description: 'Projectos de prueba',
  },
];
const managers = [
  {
    id: 1,
    name: 'Ignacio Francolino',
    avatarManager:'/images/ignaciofrancolino.webp',
  },
  {
    id: 2,
    name: 'Lionel Messi',
    designatedAvatar:"/images/messi.jpg",
  },
  {
    id: 3,
    name: 'Emiliano Martinez',
    designatedAvatar:"/images/emiliano.jpg",
  },
];

const developers = [
  {
    id: 1,
    name: 'Agustin Rios',
    designatedAvatar:"/images/agustinrios.webp",
  },
  {
    id: 2,
    name: 'Franco Colapinto',
    designatedAvatar:"/images/colapinto.jpg",
  },
];

export function obtenerAvatar(nombre: string) {
  const manager = managers.find((m) => m.name === nombre);
  if (manager) {
    return manager.avatarManager || manager.designatedAvatar || '';
  }

  const developer = developers.find((d) => d.name === nombre);
  if (developer) {
    return developer.designatedAvatar || '';
  }

  return '';
}

export { columns, projectsData, managers, developers };
