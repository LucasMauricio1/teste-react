import { UserIcon, AtSymbolIcon, LockClosedIcon } from '@heroicons/react/24/outline';
import React from 'react';

interface Props {
  name: 'user' | 'atSymbol' | 'lockClosed';
}

export default function Icon({ name }: Props) {
  const renderIcon = () => {
    switch (name) {
      case 'user':
        return <UserIcon className={`h-12 w-12`} />;
      case 'atSymbol':
        return <AtSymbolIcon className={`h-12 w-12`} />;
      case 'lockClosed':
        return <LockClosedIcon className={`h-12 w-12`} />;
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
