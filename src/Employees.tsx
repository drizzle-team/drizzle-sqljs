import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Ballot from './icons/Ballot';
import {SQLJsDatabase} from "drizzle-orm/sql-js";
import {Employee} from "./EmployeesPage";
import {setQuery} from "./store/actions/login";
import {eq} from "drizzle-orm/expressions";
import {employees} from "./data/schema";

type Props = {
  database: SQLJsDatabase;
}

const Employees = ({database}: Props) => {
  const navigation = useNavigate();
  const { id } = useParams();
  const goBack = () => {
    navigation('/employees');
  };
  const [employeesData, setEmployeesData] = useState<Employee | null>(null);
  const [reports, setReports] = useState<Employee | null>(null);
  const [queryArr, setQueryArr] = useState<string[]>([]);
  const [queryTime, setQueryTime] = useState<string[]>([]);

  const dispatch = useDispatch<any>();

  useEffect(() => {
    if (employeesData) {
      const obj = {
        query: queryArr,
        time: new Date().toISOString(),
        executeTime: queryTime,
      };
      dispatch(setQuery(obj));
    }
  }, [employeesData, dispatch, queryArr]);

  useEffect(() => {
    if (database && id) {
      const startTime = new Date().getTime();
      const stmt = database.select().from(employees).where(eq(employees.id, Number(id))).all();
      const endTime = new Date().getTime();
      setQueryArr([...queryArr, database.select().from(employees).where(eq(employees.id, Number(id))).toSQL().sql ]);
      setQueryTime([(endTime - startTime).toString()]);
      // @ts-ignore
      setEmployeesData(stmt[0]);
    }
  }, [id,database]);
  return (
    <Wrapper>
      {employeesData ? (
        <>
          <Body>
            <Header>
              <Ballot />
              <HeaderTitle>Product information</HeaderTitle>
            </Header>
            <BodyContent>
              <BodyContentLeft>
                <BodyContentLeftItem>
                  <BodyContentLeftItemTitle>Name</BodyContentLeftItemTitle>
                  <BodyContentLeftItemValue>
                    {employeesData.firstName} {employeesData.lastName}
                  </BodyContentLeftItemValue>
                </BodyContentLeftItem>
                <BodyContentLeftItem>
                  <BodyContentLeftItemTitle>Title</BodyContentLeftItemTitle>
                  <BodyContentLeftItemValue>
                    {employeesData.title}
                  </BodyContentLeftItemValue>
                </BodyContentLeftItem>
                <BodyContentLeftItem>
                  <BodyContentLeftItemTitle>
                    Title Of Courtesy
                  </BodyContentLeftItemTitle>
                  <BodyContentLeftItemValue>
                    {employeesData.titleOfCourtesy}
                  </BodyContentLeftItemValue>
                </BodyContentLeftItem>
                <BodyContentLeftItem>
                  <BodyContentLeftItemTitle>
                    Birth Date
                  </BodyContentLeftItemTitle>
                  <BodyContentLeftItemValue>
                    {/* {employeesData.birthDate} */}
                  </BodyContentLeftItemValue>
                </BodyContentLeftItem>
                <BodyContentLeftItem>
                  <BodyContentLeftItemTitle>Hire Date</BodyContentLeftItemTitle>
                  <BodyContentLeftItemValue>
                    {/* {employeesData.hireDate} */}
                  </BodyContentLeftItemValue>
                </BodyContentLeftItem>
                <BodyContentLeftItem>
                  <BodyContentLeftItemTitle>Address</BodyContentLeftItemTitle>
                  <BodyContentLeftItemValue>
                    {employeesData.address}
                  </BodyContentLeftItemValue>
                </BodyContentLeftItem>
                <BodyContentLeftItem>
                  <BodyContentLeftItemTitle>City</BodyContentLeftItemTitle>
                  <BodyContentLeftItemValue>
                    {employeesData.city}
                  </BodyContentLeftItemValue>
                </BodyContentLeftItem>
              </BodyContentLeft>
              <BodyContentRight>
                <BodyContentLeftItem>
                  <BodyContentLeftItemTitle>
                    Postal Code
                  </BodyContentLeftItemTitle>
                  <BodyContentLeftItemValue>
                    {employeesData.postalCode}
                  </BodyContentLeftItemValue>
                </BodyContentLeftItem>
                <BodyContentLeftItem>
                  <BodyContentLeftItemTitle>Country</BodyContentLeftItemTitle>
                  <BodyContentLeftItemValue>
                    {employeesData.country}
                  </BodyContentLeftItemValue>
                </BodyContentLeftItem>
                <BodyContentLeftItem>
                  <BodyContentLeftItemTitle>
                    Home Phone
                  </BodyContentLeftItemTitle>
                  <BodyContentLeftItemValue>
                    {employeesData.homePhone}
                  </BodyContentLeftItemValue>
                </BodyContentLeftItem>
                <BodyContentLeftItem>
                  <BodyContentLeftItemTitle>Extension</BodyContentLeftItemTitle>
                  <BodyContentLeftItemValue>
                    {employeesData.extension}
                  </BodyContentLeftItemValue>
                </BodyContentLeftItem>
                <BodyContentLeftItem>
                  <BodyContentLeftItemTitle>Notes</BodyContentLeftItemTitle>
                  <BodyContentLeftItemValue>
                    {employeesData.notes}
                  </BodyContentLeftItemValue>
                </BodyContentLeftItem>
                <BodyContentLeftItem>
                  <BodyContentLeftItemTitle>
                    Reports To
                  </BodyContentLeftItemTitle>
                  <BodyContentLeftItemValue>
                    <Link to={`/employee/${employeesData.reportsTo}`}>
                      {reports
                        ? `${reports.firstName} ${reports.lastName}`
                        : `${employeesData.firstName} ${employeesData.lastName}`}
                    </Link>
                  </BodyContentLeftItemValue>
                </BodyContentLeftItem>
              </BodyContentRight>
            </BodyContent>
          </Body>
          <Footer>
            <FooterButton onClick={goBack}>Go back</FooterButton>
          </Footer>
        </>
      ) : (
        <div style={{ color: '#000' }}>Loading employees...</div>
      )}
    </Wrapper>
  );
};

export default Employees;

const Footer = styled.div`
  padding: 24px;
  background-color: #fff;
  border: 1px solid rgba(229, 231, 235, 1);
  border-top: none;
`;

const FooterButton = styled.div`
  color: white;
  background-color: #ef4444;
  border-radius: 0.25rem;
  width: 63px;
  padding: 12px 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const BodyContentLeftItem = styled.div`
  margin-bottom: 15px;
`;
const BodyContentLeftItemTitle = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: black;
  margin-bottom: 10px;
`;
const BodyContentLeftItemValue = styled.div`
  color: black;
`;

const BodyContent = styled.div`
  padding: 24px;
  background-color: #fff;
  display: flex;
`;

const BodyContentLeft = styled.div`
  width: 50%;
`;
const BodyContentRight = styled.div`
  width: 50%;
`;

const Body = styled.div`
  border: 1px solid rgba(229, 231, 235, 1);
`;

const Wrapper = styled.div`
  padding: 24px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  background-color: #fff;
  color: black;
  padding: 12px 16px;
  border-bottom: 1px solid rgba(229, 231, 235, 1);
`;

const HeaderTitle = styled.div`
  font-size: 16px;
  font-weight: 700;
  margin-left: 8px;
`;
