import { FC, ReactNode } from 'react';

interface CardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

const Card: FC<CardProps> = ({ icon, title, description }) => {
  return (
    <div className='bg-gray-200 dark:bg-gray-700 rounded-lg p-4'>
      <div className='flex items-center space-x-3'>
        <div>{icon}</div>
        <h2 className='text-lg font-semibold text-gray-900 dark:text-gray-100'>{title}</h2>
      </div>
      <p className='text-gray-600 dark:text-gray-300 mt-2'>{description}</p>
    </div>
  );
};

export default Card;
