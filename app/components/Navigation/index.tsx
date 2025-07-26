import Link from 'next/link';

export const Navigation = () => {
  return (
    <nav className="flex flex-row sticky top-0 left-0 justify-between items-center p-4 bg-white">
      <header className='text-2xl font-bold p-4'>
        <Link href="/">견스</Link>
      </header>
      <ul className='flex flex-row'>
        <li className='p-4'>
          <Link href="/categories">Categories</Link>
        </li>
        <li className='p-4'>
          <Link href="/about">About</Link>
        </li>
      </ul>
    </nav>
  );
};
