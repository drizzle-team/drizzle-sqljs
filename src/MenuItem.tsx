import React, { FC, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

type Props = {
  title: string;
  icon: React.ReactNode;
  route: string;
  active: boolean;
};
const MenuItem: FC<Props> = ({ title, icon, route, active }) => {
  const navigation = useNavigate();
  const goToRoute = () => {
    navigation(route);
  };
  return (
    <Item onClick={goToRoute} active={active}>
      <IconWrapper>{icon}</IconWrapper>
      <ItemTitle>{title}</ItemTitle>
    </Item>
  );
};

export default MenuItem;

const Item = styled.div<{ active: boolean }>`
  display: flex;
  align-items: center;
  padding: 8px 0;
  cursor: pointer;
  background-color: ${({ active }) =>
    active ? 'rgba(55,65,81,1)' : 'transparent'};
  &:hover {
    background-color: rgba(55, 65, 81, 1);
  }
`;

const ItemTitle = styled.div`
  color: #d1d5db;
  font-size: 1rem;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  color: #d1d5db;
  padding: 0 0.75rem;
`;
