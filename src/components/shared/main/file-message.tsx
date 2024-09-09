'use client';

import { FileText, FileSpreadsheet, FileMinus, File } from 'lucide-react';

interface FileMessageProps {
  fileName: string;
  fileType: string;
}

const FileMessage = ({ fileName, fileType }: FileMessageProps) => {
  let icon;

  switch (fileType) {
    case 'text/plain':
      icon = <FileText className='w-5 h-5 mr-2' />;
      break;
    case 'application/pdf':
      icon = <FileSpreadsheet className='w-5 h-5 mr-2' />;
      break;
    case 'application/msword':
      icon = <FileMinus className='w-5 h-5 mr-2' />;
      break;
    default:
      icon = <File className='w-5 h-5 mr-2' />;
      break;
  }

  return (
    <div className='flex items-center'>
      {icon}
      <span className='text-gray-900 dark:text-gray-100'>{fileName}</span>
    </div>
  );
};

export default FileMessage;
