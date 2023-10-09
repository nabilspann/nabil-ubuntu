import Desktop from '@/pages/Desktop';
import { ContextProvider } from '@/components/ContextProvider';

export default function Home() {
  return (
    <ContextProvider>
        <main>
          <Desktop />
        </main>
    </ContextProvider>
  );
}
