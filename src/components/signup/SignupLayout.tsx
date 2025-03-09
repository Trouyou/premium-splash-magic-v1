
import { ReactNode } from 'react';
import LoginAnimation from '@/components/login/LoginAnimation';

interface SignupLayoutProps {
  children: ReactNode;
}

const SignupLayout = ({ children }: SignupLayoutProps) => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen w-screen bg-white m-0 p-0 overflow-y-auto" style={{ margin: 0, padding: 0, maxWidth: '100vw', width: '100vw', height: '100vh', maxHeight: '100vh', boxSizing: 'border-box' }}>
      
      <div className="hidden md:block md:w-3/5 h-screen m-0 p-0 overflow-hidden relative" style={{ margin: 0, padding: 0, height: '100vh', maxHeight: '100vh', overflow: 'hidden', position: 'relative', border: 'none', boxShadow: 'none' }}>
        <LoginAnimation />
      </div>

      <div className="w-full md:w-2/5 flex flex-col justify-center items-center px-6 py-12 md:px-12 scroll-container" style={{ height: '100vh', maxHeight: '100vh', overflowY: 'auto', WebkitOverflowScrolling: 'touch' }}>
        {children}
      </div>
    </div>
  );
};

export default SignupLayout;
