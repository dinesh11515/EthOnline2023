import { useRouter } from 'next/router';
import { RiHomeLine } from 'react-icons/ri';
import { RxDashboard } from 'react-icons/rx';
import { IoMdSettings } from 'react-icons/io';
import { MdCreateNewFolder } from 'react-icons/md';
import Link from 'next/link';

const links = [
  {
    name: 'Home',
    icon: <RiHomeLine size={20} />,
    link: '/',
  },
  {
    name: 'NFTs',
    icon: <RxDashboard size={20} />,
    link: '/nfts',
  },
  {
    name: 'Info',
    icon: <MdCreateNewFolder size={20} />,
    link: '/create',
  },
  {
    name: 'Settings',
    icon: <IoMdSettings size={20} />,
    link: '/settings',
  },
];

const Sidebar = () => {
  const router = useRouter();

  return (
    <div className='flex flex-col gap-2 w-fit fixed top-[50%] -translate-y-[50%] mx-6'>
      {links.map((link) => (
        <Link
          href={link.link}
          key={link.name}
          className={`w-fit ${
            router.pathname === link.link
              ? 'bg-[#1e1e1e] text-white'
              : 'bg-[#e1e1e1] '
          } bg-[#1e1e1e] p-2 rounded-md `}>
          {link.icon}
        </Link>
      ))}
    </div>
  );
};

export default Sidebar;
