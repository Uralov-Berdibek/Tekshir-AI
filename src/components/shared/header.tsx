import React from 'react';

type HeaderProps = {};

const Header = (props: HeaderProps) => {
  return (
    <div className='w-full py-3 px-4 h-auto bg-gray-100 dark:bg-gray-900 border-b'>
      <h1 className='text-3xl font-semibold text-primary dark:text-white'>Welcome</h1>
      <p className='text-xs font-normal text-primary dark:text-white'></p>
    </div>
  );
};

export default Header;
