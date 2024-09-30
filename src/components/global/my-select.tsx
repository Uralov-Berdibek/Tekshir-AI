import * as React from 'react';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface MySelectProps {
  onSelectChange: (value: string) => void;
}

export function MySelect({ onSelectChange }: MySelectProps) {
  return (
    <Select onValueChange={onSelectChange}>
      <SelectTrigger className='w-[180px] text-black'>
        <SelectValue placeholder='Select a Gender' />
      </SelectTrigger>
      <SelectContent className='bg-white dark:bg-gray-600'>
        <SelectGroup>
          <SelectLabel className='text-black'>Gender</SelectLabel>
          <SelectItem value='male'>Male</SelectItem>
          <SelectItem value='female'>Female</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
