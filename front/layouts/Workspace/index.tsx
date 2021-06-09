import fetcher from '@utils/fetcher';
import axios from 'axios';
import React, { useCallback, FC, useState } from 'react';
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
  ProfileModal,
} from './style';
import gravatar from 'gravatar';
import Menu from '@components/Menu';

const Workspace: FC = ({ children }) => {
  const { data, error, revalidate } = useSWR('http://localhost:3095/api/users', fetcher);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const onLogout = useCallback(() => {
    axios
      .post('http://localhost:3095/api/users/logout', null, {
        withCredentials: true,
      })
      .then(() => revalidate());
  }, []);

  const onClickUserProfile = useCallback(() => {
    setShowUserMenu((prev) => !prev);
  }, []);

  if (!data) {
    return <Redirect to="/login" />;
  }

  return (
    <div>
      <Header>
        <RightMenu>
          <span onClick={onClickUserProfile}>
            <ProfileImg
              src={gravatar.url(data.email, {
                s: '28px',
                d: 'retro',
              })}
              alt={data.nickname}
            />
            {showUserMenu && (
              <Menu style={{ right: 0, top: 38 }} show={showUserMenu} onCloseModal={onClickUserProfile}>
                <ProfileModal>
                  <img
                    src={gravatar.url(data.email, {
                      s: '36px',
                      d: 'retro',
                    })}
                    alt={data.nickname}
                  />
                  <div>
                    <span id="profile-name">{data.nickname}</span>
                    <span id="profile-active">Active</span>
                  </div>
                </ProfileModal>
              </Menu>
            )}
          </span>
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
