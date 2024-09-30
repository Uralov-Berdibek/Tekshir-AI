'use client';

import React from 'react';
import Header from '../../../components/shared/header';
import Sidebar from '../../../components/shared/sidebar';
import useAuth from '../../../hooks/useAuth';

type HomeProps = {};

const Home = (props: HomeProps) => {
  // useAuth();
  return (
    <div>
      <Header />
      <main className='flex'>
        <Sidebar />
        <div className='flex w-full flex-col justify-center items-center '>
          <h1>Welcome to the chat app</h1>
        </div>
      </main>
    </div>
  );
};

export default Home;
