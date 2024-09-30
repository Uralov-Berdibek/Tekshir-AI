'use client';

import { useConversationStore } from '../../../../lib/conversationStore';
import Main from '../../../../components/shared/main';
import Header from '../../../../components/shared/header';
import Sidebar from '../../../../components/shared/sidebar';

const Page = ({ params }: { params: { id: string } }) => {
  // Преобразуем params.id в число
  const conversationId = parseInt(params.id, 10);

  // Получаем разговор из состояния по идентификатору
  const conversation = useConversationStore((state) => state.getConversationById(conversationId));

  if (!conversation) {
    return <div>Conversation not found</div>;
  }

  return (
    <div>
      <div>
        <Header />
        <main className='flex'>
          <Sidebar />
          <div className='flex-1'>
            <Main />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Page;
