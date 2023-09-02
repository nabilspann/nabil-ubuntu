import Image from 'next/image';
import Desktop from '@/pages/Desktop';
import { ContextProvider } from '@/components/ContextProvider';
import DndWrapper from '@/components/DndWrapper';

export default function Home() {
  return (
    <ContextProvider>
      {/* <DndWrapper> */}
        <main>
          <Desktop />
        </main>
      {/* </DndWrapper> */}
    </ContextProvider>
  );
}
