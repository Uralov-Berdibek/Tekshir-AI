import React from 'react';
import Header from '../../../components/shared/header';
import Sidebar from '../../../components/shared/sidebar';

type HomeProps = {};

const Home = (props: HomeProps) => {
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
