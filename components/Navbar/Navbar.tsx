'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import BackIcon from '@/icons/BackIcon';
import PlusIcon from '@/icons/PlusIcon';
import logo from '@/public/images/logo.png';

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const isRoot = pathname === '/';

  const handleBackClick = () => {
    router.back();
  };

  return (
    <nav className="flex flex-col border border-gray-300 bg-white">
      <div className="h-[57px] flex items-center border-b border-gray-300 py-4 px-12">
        <Image src={logo} alt="Logo esto es" width={50} height={25}/>
      </div>
      <div className=" h-[57px] flex justify-between items-center p-2.5 sm:py-4 text-lg font-normal px-10">
        <div className="flex items-center">
          {!isRoot && (
            <div className="flex items-center justify-start mr-2">
              <button
                onClick={handleBackClick}
                className="text-gray-700 hover:text-gray-900 mr-4"
              >
                <BackIcon />
              </button>
              <span className="text-sm text-default-600">Back</span>
            </div>
          )}
          <Link href="/" passHref className="text-gray-900 font-bold">
            My projects
          </Link>
        </div>
        {isRoot && (
          <Link
            href="/projectForm/new"
            passHref
            className="bg-red-600 flex items-center gap-2 font-500 text-white py-2 px-4 rounded hover:bg-red-700"
          >
            <PlusIcon></PlusIcon>
            Add project
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;