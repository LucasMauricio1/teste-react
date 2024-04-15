import { UserIcon, AtSymbolIcon, LockClosedIcon, PencilIcon, TrashIcon, PlusIcon } from '@heroicons/react/24/outline';
import React from 'react';

interface Props {
  name: 'user' | 'atSymbol' | 'lockClosed' | 'edit' | 'trash' | "plus";
  onClick?: () => void
}

export default function Icon({ name, onClick }: Props) {
  const renderIcon = () => {
    switch (name) {
      case 'user':
        return <UserIcon className={`h-12 w-12`} onClick={onClick}/>;
      case 'atSymbol':
        return <AtSymbolIcon className={`h-12 w-12`} onClick={onClick}/>;
      case 'lockClosed':
        return <LockClosedIcon className={`h-12 w-12`} onClick={onClick}/>;
      case 'edit':
        return <PencilIcon className={`h-5 w-5`} onClick={onClick}/>;
      case 'trash':
        return <TrashIcon className={`h-5 w-5`} onClick={onClick}/>;
      case 'plus':
        return <PlusIcon className={`h-12 w-12`} onClick={onClick}/>;
      default:
        return null;
    }
  };

  return (
    <div className='flex justify-center'>
      {renderIcon()}
    </div>
  );
}
