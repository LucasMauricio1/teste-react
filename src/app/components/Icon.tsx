import { UserIcon, AtSymbolIcon, LockClosedIcon } from '@heroicons/react/24/outline';

interface Props {
  name: 'user' | 'atSymbol' | 'lockClosed';
  size: string | number;
}

export default function Icon({ name, size }: Props) {
  const renderIcon = () => {
    switch (name) {
      case 'user':
        return <UserIcon className={`h-${size} w-${size}`} />;
      case 'atSymbol':
        return <AtSymbolIcon className={`h-${size} w-${size}`} />;
      case 'lockClosed':
        return <LockClosedIcon className={`h-${size} w-${size}`} />;
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
