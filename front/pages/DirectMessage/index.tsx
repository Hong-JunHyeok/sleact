import Workspace from '@layouts/Workspace';
import React, { useCallback, useEffect, useRef } from 'react';
import { Container, Header } from './styles';
import gravatar from 'gravatar';
import useSWR, { useSWRInfinite } from 'swr';
import { IDM, IUser } from '@typings/db';
import fetcher from '@utils/fetcher';
import { useParams } from 'react-router';
import ChatBox from '@components/ChatBox';
import ChatList from '@components/ChatList';
import useInput from '@hooks/useInput';
import axios from 'axios';
import makeSection from '@utils/makeSection';
import Scrollbars from 'react-custom-scrollbars';

const DirectMessage = () => {
  const { workspace, id } = useParams<{ workspace: string; id: string }>();
  const { data: userData } = useSWR<IUser>(`/api/workspaces/${workspace}/users/${id}`, fetcher);
  const { data: myData } = useSWR<IUser>(`/api/users`, fetcher);
  const [chat, onChangeChat, setChat] = useInput('');
  const {
    data: chatData,
    mutate: mutateChat,
    revalidate,
    setSize,
  } = useSWRInfinite<IDM[]>(
    (index) => `/api/workspaces/${workspace}/dms/${id}/chats?perPage=20&page=${index + 1}`,
    fetcher,
  );

  const isEmpty = chatData?.[0]?.length === 0;
  const isReachingEnd = isEmpty || (chatData && chatData[chatData.length - 1]?.length > 20) || false;

  const scrollbarRef = useRef<Scrollbars>(null);
  const onSubmitForm = useCallback(
    (e) => {
      e.preventDefault();

      if (chat?.trim() && chatData && myData && userData) {
        // mutateChat((prevChatData) => {
        //   const savedChat = chat;
        //   prevChatData?.[0].unshift({
        //     id: (chatData[0][0]?.id || 0) + 1,
        //     content: savedChat,
        //     SenderId: myData.id,
        //     Sender: myData,
        //     ReceiverId: userData.id,
        //     Receiver: userData,
        //     createdAt: new Date(),
        //   });
        //   return prevChatData;
        // }, false).then(() => {
        //   setChat('');
        //   scrollbarRef.current?.scrollToBottom();
        // });
        axios
          .post(`/api/workspaces/${workspace}/dms/${id}/chats`, {
            content: chat,
          })
          .then(() => {
            revalidate();
            setChat('');
            scrollbarRef.current?.scrollToBottom();
          })
          .catch(console.error);
      }
    },
    [id, chat, revalidate, setChat, workspace, myData, userData],
  );

  //* 로딩 시 스크롤 바 가장 아래로
  useEffect(() => {
    if (chatData?.length === 1) {
      console.log(chatData);
      scrollbarRef.current?.scrollToBottom();
    }
  }, [chatData]);

  if (!userData || !myData) {
    return null;
  }

  const chatSections = makeSection(chatData ? chatData.flat().reverse() : []);

  return (
    <Container>
      <Header>
        <img src={gravatar.url(userData?.email, { s: '24px', d: 'retro' })} alt={userData.nickname} />
        <span>{userData.nickname}</span>
      </Header>
      <ChatList
        chatSections={chatSections}
        ref={scrollbarRef}
        isEmpty={isEmpty}
        isReachingEnd={isReachingEnd}
        setSize={setSize}
      />
      <ChatBox chat={chat} onChangeChat={onChangeChat} onSubmitForm={onSubmitForm} />
    </Container>
  );
};

export default DirectMessage;
