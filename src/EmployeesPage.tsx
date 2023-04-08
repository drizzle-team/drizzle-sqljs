import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import * as style from '@dicebear/avatars-initials-sprites';
import {createAvatar} from '@dicebear/avatars';
import Svg from 'react-inlinesvg';
import HeaderArrowIcon from './icons/HeaderArrowIcon';
import {PaginationRow} from './OrdersPage';
import Pagination from './Pagination';
import {setQuery} from "./store/actions/login";
import {selectQuery} from "./store/selectors/auth";
import {SQLJsDatabase} from "drizzle-orm/sql-js";
import {employees} from "./data/schema";

type Page = {
    EmployeeID: number;
    LastName: string;
    FirstName: string;
    Title: string;
    TitleOfCourtesy: string;
    BirthDate: string;
    HireDate: string;
    Address: string;
    City: string;
    Region: string;
    PostalCode: string;
    Country: string;
    HomePhone: string;
    Extension: number;
    Notes: string;
    ReportsTo: number;
};

type Product = {
    queries: [
        {
            query: string;
            metrics: {
                select: number;
                selectWhere: number;
                selectJoin: number;
                executionTime: number;
            };
        },
        {
            query: string;
            metrics: {
                select: number;
                selectWhere: number;
                selectJoin: number;
                executionTime: number;
            };
        }
    ];
    count: number;
    page: Array<Page>;
};

export type Employee = {
    address: string;
    birthDate: string;
    city: string;
    country: string;
    id: number;
    extension: number;
    firstName: string;
    hireDate: string;
    homePhone: string;
    lastName: string;
    notes: string;
    postalCode: string;
    region: string;
    reportsTo: number;
    reportsToName: string;
    title: string;
    titleOfCourtesy: string;
};

type Props = {
    database: SQLJsDatabase
}

const EmployeesPage = ({database}: Props) => {
    const [employeesData, setEmployeesData] = useState<Employee[] | null>(null);
    const [employeesCount, setEmployeesCount] = useState<number| null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const dispatch = useDispatch<any>();
    const [queryArr, setQueryArr] = useState<string[]>([]);
    const [queryTime, setQueryTime] = useState<string[]>([]);


    useEffect(() => {
        if (database) {
            const startTime = new Date().getTime();
            const stmt = database
                .select()
                .from(employees)
                .limit(20)
                .offset((currentPage - 1) * 20)
                .all();
            const stmtCount = database.select().from(employees).all();
            const endTime = new Date().getTime();
            setQueryTime([(endTime - startTime).toString()]);
            // @ts-ignore
            setEmployeesData(stmt);
            setQueryArr([...queryArr, database.select().from(employees).limit(20).offset((currentPage - 1) * 20).toSQL().sql]);
            // @ts-ignore
            setEmployeesCount(stmtCount.length);
        }
    }, [currentPage]);

    useEffect(() => {
        if (employeesData && employeesData.length > 0) {
            const obj = {
                query: queryArr,
                time: new Date().toISOString(),
                executeTime: queryTime,
            };
            dispatch(setQuery(obj));
        }
    }, [employeesData, dispatch]);
    return (
        <Wrapper>
            {employeesData && employeesCount ? (
                <>
                    <Header>
                        <HeaderTitle>Products</HeaderTitle>
                        <HeaderArrowIcon/>
                    </Header>
                    <Table>
                        <TableHeader>
                            <Icon/>
                            <Company> Name</Company>
                            <Contact> Title</Contact>
                            <Title>City</Title>
                            <City>Phone</City>
                            <Country>Country</Country>
                        </TableHeader>
                        <TableBody>
                            {employeesData.map((product: Employee, i: number) => {
                                const svg = createAvatar(style, {
                                    seed: product.firstName,
                                });
                                if (i < 1) return;
                                return (
                                    <TableRow key={i}>
                                        <BodyIcon>
                                            <Circle>
                                                <Svg src={svg}/>
                                            </Circle>
                                        </BodyIcon>
                                        <BodyCompany>
                                            <Link to={`/employee/${product.id}`}>
                                                {product.firstName} {product.lastName}
                                            </Link>
                                        </BodyCompany>
                                        <BodyContact>{product.title}</BodyContact>
                                        <BodyTitle>{product.city}</BodyTitle>
                                        <BodyCity>{product.homePhone}</BodyCity>
                                        <BodyCountry>{product.country}</BodyCountry>
                                    </TableRow>
                                );
                            })}
                            <PaginationWrapper>
                                <PaginationRow>
                                    <Pagination
                                        className="pagination-bar"
                                        currentPage={currentPage}
                                        totalCount={employeesCount}
                                        pageSize={20}
                                        onPageChange={(page: any) => setCurrentPage(page)}
                                    />
                                </PaginationRow>
                                <PageCount>
                                    Page: {currentPage} of {Math.ceil(employeesCount / 20)}
                                </PageCount>
                            </PaginationWrapper>
                        </TableBody>
                    </Table>
                </>
            ) : (
                <div style={{color: '#000'}}>Loading employees...</div>
            )}
        </Wrapper>
    );
};

export default EmployeesPage;

const Circle = styled.div`
  width: 24px;
  height: 24px;
  overflow: hidden;
  border-radius: 50%;
  color: white;
  font-size: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BodyIcon = styled.div`
  width: 5%;
  padding: 9px 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  //border: 1px solid #000;
`;
const PageCount = styled.div`
  font-size: 12.8px;
`;

const PaginationNumberWrapper = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  border: 1px solid rgba(243, 244, 246, 1);
`;

const PaginationNumber = styled.div<{ active: boolean }>`
  width: 7px;
  padding: 10px 16px;
  border: ${({active}) =>
          active ? '1px solid rgba(209, 213, 219, 1)' : 'none'};
  margin-right: 8px;
`;

const PaginationWrapper = styled.div`
  padding: 12px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const BodyCompany = styled.div`
  width: 25%;
  padding: 9px 12px;
  //border: 1px solid #000;
`;
const BodyContact = styled.div`
  width: 25%;
  padding: 9px 12px;
  //border: 1px solid #000;
`;
const BodyTitle = styled.div`
  width: 20%;
  padding: 9px 12px;
  //border: 1px solid #000;
`;
const BodyCity = styled.div`
  width: 20%;
  padding: 9px 12px;
  //border: 1px solid #000;
`;
const BodyCountry = styled.div`
  width: 8%;
  padding: 9px 12px;
  //border: 1px solid #000;
`;

const TableBody = styled.div`
  background-color: #fff;
`;

const TableRow = styled.div`
  width: 98%;
  display: flex;
  align-items: center;
  background-color: #f9fafb;

  &:hover {
    background-color: #f3f4f6;
  }

  &:hover:nth-child(even) {
    background-color: #f3f4f6;
  }

  &:nth-child(even) {
    background-color: #fff;
  }
`;

const Icon = styled.div`
  width: 5%;
  padding: 9px 12px;
`;

const Company = styled.div`
  width: 25%;
  font-size: 16px;
  font-weight: 700;
  padding: 9px 12px;
`;
const Contact = styled.div`
  width: 25%;
  font-size: 16px;
  padding: 9px 12px;
  font-weight: 700;
`;
const Title = styled.div`
  width: 20%;
  font-size: 16px;
  font-weight: 700;
  padding: 9px 12px;
`;
const City = styled.div`
  width: 20%;
  font-size: 16px;
  font-weight: 700;
  padding: 9px 12px;
`;
const Country = styled.div`
  width: 10%;
  font-size: 16px;
  font-weight: 700;
  padding: 9px 12px;
`;

const Table = styled.div``;

const TableHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  background-color: #fff;
`;

const Wrapper = styled.div`
  color: black;
  padding: 24px;
  border: 1px solid rgba(243, 244, 246, 1);;
`;

const Header = styled.div`
  padding: 12px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  border-bottom: 1px solid rgba(243, 244, 246, 1);;
`;

const HeaderTitle = styled.div`
  font-size: 16px;
  font-weight: 700;
`;

function setQueryResponseDashboard(obj: { query: any; time: string }): any {
    throw new Error('Function not implemented.');
}
