import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import {selectQuery} from "./store/selectors/auth";

const DashboardPage = () => {
  const query = useSelector(selectQuery);
  const [countSelect, setCountSelect] = useState<number>(0);
  const [countSelectWhere, setCountSelectWhere] = useState<number>(0);
  const [countSelectLeft, setCountSelectLeft] = useState<number>(0);

  // find all left join in query
  useEffect(() => {
    query?.map((item: any) => {
      item.query.map((queryArr: any) => {
        if (queryArr.toLowerCase().includes('left join')) {
          setCountSelectLeft((prev) => prev + 1);
        }
        if (queryArr.toLowerCase().includes('where')) {
          setCountSelectWhere((prev) => prev + 1);
        }
        if (queryArr.toLowerCase().includes('select')) {
          setCountSelect((prev) => prev + 1);
        }
      });
    });
  }, [query]);

  return (
    <Wrapper>
      <TopContentWrapper>

        <TopContentRight>
          <Title>SQL Metrics</Title>
          <SubTitle>Query count: {query?.length}</SubTitle>
          <SubTitle>Results count: {query?.length}</SubTitle>
          <SubTitle># SELECT: {countSelect}</SubTitle>
          <SubTitle># SELECT WHERE: {countSelectWhere}</SubTitle>
          <SubTitle># SELECT LEFT JOIN: {countSelectLeft}</SubTitle>
        </TopContentRight>
      </TopContentWrapper>
      <MainContent>
        <MainContentTitle>Activity log</MainContentTitle>
        <MainContentSubTitle>
          Explore the app and see metrics here
        </MainContentSubTitle>
        <MainContentLogs>
          {query?.map((item: any) =>
            item.query.map((itemQuery: any) => {
              return (
                <Log>
                  <div style={{ display: 'flex' }}>
                    <LogsInfo>{item.time}</LogsInfo>
                    <LogsInfo>,&nbsp;SQL,&nbsp;</LogsInfo>
                    <LogsInfo>
                      {item.executeTime ? item.executeTime[0] : ''}ms
                    </LogsInfo>
                  </div>
                  <LogString>{itemQuery}</LogString>
                </Log>
              );
            })
          )}
        </MainContentLogs>
      </MainContent>
    </Wrapper>
  );
};

export default DashboardPage;

const LogString = styled.div`
  font-size: 14px;
  //line-height: 22px;
  line-height: 1.25rem;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
    Liberation Mono, Courier New, monospace;
`;

const Log = styled.div`
  padding-top: 8px;
`;

const LogsInfo = styled.div`
  font-size: 12px;
  color: #9ca3af;
`;

const MainContentLogs = styled.div``;

const MainContent = styled.div`
  padding-top: 24px;
`;
const MainContentTitle = styled.div`
  font-size: 20px;
  line-height: 30px;
`;

const MainContentSubTitle = styled.div`
  font-size: 12px;
`;

const Title = styled.div`
  font-size: 20px;
  line-height: 28px;
`;
const SubTitle = styled.div`
  font-size: 14px;
  line-height: 20px;
`;

const Wrapper = styled.div`
  padding: 48px;
`;
const TopContentWrapper = styled.div`
  display: flex;
  align-content: center;
  width: 100%;
  justify-content: space-between;
`;
const TopContentLeft = styled.div`
  width: 49%;
`;
const TopContentRight = styled.div`
  width: 49%;
`;
