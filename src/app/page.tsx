import Desktop from '@/pages/Desktop';
import { ContextProvider } from '@/components/ContextProvider';
import SessionChange from '@/components/SessionChange/SessionChange';

export default function Home() {
  return (
    <ContextProvider>
        <main className='select-none'>
          <Desktop />
          <SessionChange />
        </main>
    </ContextProvider>
  );
}
