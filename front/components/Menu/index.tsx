import React, { FC } from 'react';
import { CreateMenu } from './styles';

const Menu: FC = ({ children }) => {
  return (
    <CreateMenu>
      <div>Menu</div>
      {children}
    </CreateMenu>
  );
};

export default Menu;
