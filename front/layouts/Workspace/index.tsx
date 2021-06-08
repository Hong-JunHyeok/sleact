import fetcher from '@utils/fetcher';
import axios from 'axios';
import React, { useCallback, FC } from 'react';
import { Redirect } from 'react-router';
import useSWR from 'swr';
import {
  Channels,
  Chats,
  Header,
  MenuScroll,
  ProfileImg,
  RightMenu,
  WorkspaceName,
  Workspaces,
  WorkspaceWrapper,
} from './style';
import gravatar from 'gravatar';

const Workspace: FC = ({ children }) => {
  const { data, error, revalidate } = useSWR('http://localhost:3095/api/users', fetcher);

  const onLogout = useCallback(() => {
    axios
      .post('http://localhost:3095/api/users/logout', null, {
        withCredentials: true,
      })
      .then(() => revalidate());
  }, []);

  if (!data) {
    return <Redirect to="/login" />;
  }

  return (
    <div>
      <Header>
        <RightMenu>
          <ProfileImg
            src={gravatar.url(data.email, {
              s: '28px',
              d: 'retro',
            })}
            alt={data.nickname}
          />
        </RightMenu>
      </Header>

      <button onClick={onLogout}>로그아웃</button>
      <WorkspaceWrapper>
        <Workspaces>test</Workspaces>
        <Channels>
          <WorkspaceName>Sleact</WorkspaceName>
          <MenuScroll>Menu Scroll</MenuScroll>
          <Chats></Chats>
        </Channels>
        {children}
      </WorkspaceWrapper>
    </div>
  );
};

export default Workspace;
