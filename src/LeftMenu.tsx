import React, { useState } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import MenuItem from './MenuItem';
import HomeIcon from './icons/HomeIcon';
import DashboardIcon from './icons/DashboardIcon';
import SuppliersIcon from './icons/SuppliersIcon';
import Cart from './icons/Cart';
import ProductsIcon from './icons/ProductsIcon';
import EmployeesIcon from './icons/EmployeesIcon';
import CustomersIcon from './icons/CustomersIcon';
import SearchIcon from './icons/SearchIcon';
import MenuIcon from './icons/MenuIcon';
import ArrowDownIcon from './icons/ArrowDownIcon';
import LinkIcon from './icons/LinkIcon';
import InfoIcon from './icons/InfoIcon';

const Home = ({ children }: any) => {
  const location = useLocation();
  const [timer, setTimer] = useState<any>(
    new Date().toLocaleTimeString('en-US', {
      hour12: false,
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    })
  );
  const [isMenuOpened, setIsMenuOpened] = useState<boolean>(false);
  const menuItemsFirst = [
    {
      title: 'Home',
      icon: <HomeIcon />,
      route: '/',
    },
    {
      title: 'Dashboard',
      icon: <DashboardIcon />,
      route: '/dashboard',
    },
  ];

  const MenuItemsSecond = [
    {
      title: 'Suppliers',
      icon: <SuppliersIcon />,
      route: '/suppliers',
    },
    {
      title: 'Products',
      icon: <ProductsIcon />,
      route: '/products',
    },
    {
      title: 'Orders',
      icon: <Cart />,
      route: '/orders',
    },
    {
      title: 'Employees',
      icon: <EmployeesIcon />,
      route: '/employees',
    },
    {
      title: 'Customers',
      icon: <CustomersIcon />,
      route: '/customers',
    },
    {
      title: 'Documentation',
      icon: <InfoIcon />,
      route: '/documentation',
    },
    {
      title: 'Search',
      icon: <SearchIcon />,
      route: '/search',
    },
  ];
  setInterval(() => {
    const time = new Date().toLocaleTimeString('en-US', {
      hour12: false,
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    });
    setTimer(time);
  }, 1000);

  return (
    <Wrapper>
      <LeftMenu>
        <LeftMenuHeader>
          <LeftMenuHeaderTitle>
            <span>Northwind</span> Traders
          </LeftMenuHeaderTitle>
        </LeftMenuHeader>

        <LeftMenuBody>
          <BodyTitle>General</BodyTitle>
          {menuItemsFirst.map((item, index) => (
            <MenuItem
              key={index}
              title={item.title}
              icon={item.icon}
              route={item.route}
              active={location.pathname === item.route}
            />
          ))}
          <BodyTitle>BACKOFFICE</BodyTitle>
          {MenuItemsSecond.map((item, index) => (
            <MenuItem
              key={index}
              title={item.title}
              icon={item.icon}
              route={item.route}
              active={location.pathname === item.route}
            />
          ))}
        </LeftMenuBody>
      </LeftMenu>
      <ContentWrapper>
        <Right>
          <RightMenuHeader>
            <div style={{ marginLeft: '240px' }}>{timer}</div>
            <HeaderMenu
              onClick={() => setIsMenuOpened(!isMenuOpened)}
              isActive={isMenuOpened}
            >
              <MenuIcon />
              <span>SQLite Links</span>
              <ArrowDownIcon />
            </HeaderMenu>
            {isMenuOpened && (
              <MenuOpened>
                <MenuOpenedItem>
                  <LinkWrapper>
                    <LinkIcon />
                  </LinkWrapper>
                  Introducing C1
                </MenuOpenedItem>
                <MenuOpenedItem>
                  <LinkWrapper>
                    <LinkIcon />
                  </LinkWrapper>
                  SQLite SQL Flavour
                </MenuOpenedItem>
                <MenuOpenedItem>
                  <LinkWrapper>
                    <LinkIcon />
                  </LinkWrapper>
                  Durable Objects
                </MenuOpenedItem>
              </MenuOpened>
            )}
          </RightMenuHeader>
        </Right>
        <Margin>{children}</Margin>
      </ContentWrapper>
    </Wrapper>
  );
};

export default Home;

const Margin = styled.div`
  margin-left: 240px;
  margin-top: 60px;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const LinkWrapper = styled.div`
  padding-right: 0.5rem;
  display: flex;
  align-items: center;
`;

const MenuOpened = styled.div`
  position: absolute;
  top: 60px;
  right: 0;
  background-color: #fff;
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
    var(--tw-ring-shadow, 0 0 #0000), 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
`;

const MenuOpenedItem = styled.div`
  padding: 10.5px 12px;
  display: flex;
  align-items: center;
  min-width: 195px;
  font-size: 14px;
  cursor: pointer;
`;

const HeaderMenu = styled.div<{ isActive: boolean }>`
  display: flex;
  align-items: center;
  position: relative;
  color: ${({ isActive }) => (isActive ? '#3b82f6' : '#000')};
  span {
    margin-left: 0.5rem;
  }
  svg {
    margin-left: 0.2rem;
  }
  cursor: pointer;
`;

const Wrapper = styled.div`
  display: flex;
`;

const RightMenuHeader = styled.div`
  font-size: 16px;
  color: black;
  margin-left: 12px;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Right = styled.div`
  background-color: #fff;
  width: 100%;
  position: fixed;
  z-index: 3;
  padding: 17.5px 0;
  border-bottom: 1px solid rgba(229, 231, 235, 1);
`;

const LeftMenuBody = styled.div``;

const BodyTitle = styled.div`
  padding: 0.75rem;
  font-size: 0.75rem;
  text-transform: uppercase;
  color: rgba(156, 163, 175, 1);
`;

const LeftMenu = styled.div`
  min-width: 15rem;
  max-width: 15rem;
  height: 100vh;
  position: fixed;
  z-index: 4;
  background-color: rgba(31, 41, 55, 1);
`;

const LeftMenuHeader = styled.div`
  height: 3.5rem;
  background-color: rgba(17, 24, 39, 1);
  display: flex;
  padding: 0 12px;
  align-items: center;
`;

const LeftMenuHeaderTitle = styled.div`
  color: white;
  span {
    font-weight: 900;
  }
`;
