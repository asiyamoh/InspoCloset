import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { useAuthContext } from '../../utils/auth/use-auth-context';
import { useNavigate } from '@tanstack/react-router';

export function UserMenu() {
  const { user, signOut } = useAuthContext();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate({ to: '/sign-in' });
  };

  if (!user) {
    return (
      <div className="flex space-x-2">
        <button
          onClick={() => navigate({ to: '/sign-in' })}
          className="px-3 py-1 text-sm text-dustyRose hover:text-dustyRose/80 transition-colors"
        >
          Sign In
        </button>
        <button
          onClick={() => navigate({ to: '/sign-up' })}
          className="px-3 py-1 text-sm bg-dustyRose text-white rounded-md hover:bg-dustyRose/90 transition-colors"
        >
          Sign Up
        </button>
      </div>
    );
  }

  return (
    <Menu as="div" className="relative">
      <Menu.Button className="flex items-center space-x-2 text-dustyRose hover:text-dustyRose/80 transition-colors">
        <div className="w-10 h-10 bg-dustyRose rounded-full flex items-center justify-center text-white text-sm font-medium border-2 border-white shadow-md">
          {user.email?.charAt(0).toUpperCase() || 'U'}
        </div>
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
          <div className="py-1">
            {/* User info header */}
            <div className="px-4 py-2 border-b border-gray-100">
              <p className="text-sm font-medium text-gray-900 truncate">{user.email}</p>
            </div>
            
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={handleSignOut}
                  className={`${
                    active ? 'bg-gray-100' : ''
                  } block w-full text-left px-4 py-2 text-sm text-gray-700`}
                >
                  Sign Out
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
