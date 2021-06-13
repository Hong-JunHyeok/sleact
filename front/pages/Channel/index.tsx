import ChatBox from '@components/ChatBox';
import ChatList from '@components/ChatList';
import useInput from '@hooks/useInput';
import Workspace from '@layouts/Workspace';
import React, { useCallback } from 'react';
import { Container, Header } from './styles';
import autosize from 'autosize';

const Channel = () => {
  const [chat, onChangeChat] = useInput('');
  const onSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
    },
    [chat],
  );

  return (
    <Container>
      <Header>채널</Header>
      <ChatList />
      <ChatBox chat={chat} onSubmitForm={onSubmitForm} onChangeChat={onChangeChat} />
    </Container>
  );
};

export default Channel;
