import React from 'react';
import Card from './card';
import { Sun, Zap, AlertCircle } from 'lucide-react';

type Props = {};

const Cards = (props: Props) => {
  return (
    <>
      <h1 className='text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8'>Tekshir AI</h1>
      <div className='grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl'>
        <Card
          icon={<Sun className='text-yellow-400 w-6 h-6' />}
          title='Examples'
          description='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus.'
        />
        <Card
          icon={<Zap className='text-blue-400 w-6 h-6' />}
          title='Capabilities'
          description='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus.'
        />
        <Card
          icon={<AlertCircle className='text-red-400 w-6 h-6' />}
          title='Limitations'
          description='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus.'
        />
      </div>
    </>
  );
};

export default Cards;
