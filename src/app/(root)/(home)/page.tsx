import React from 'react';
import Header from '../../../components/shared/header';
import Sidebar from '../../../components/shared/sidebar';
import Main from '../../../components/shared/main';

type HomeProps = {};

const page = (props: HomeProps) => {
  return (
    <div>
      <Header />
      <main className='flex'>
        <Sidebar />
        <Main />
      </main>
    </div>
  );
};

export default page;
