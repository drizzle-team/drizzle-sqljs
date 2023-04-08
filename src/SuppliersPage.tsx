import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

import {createAvatar} from '@dicebear/avatars';
import * as style from '@dicebear/avatars-initials-sprites';
import Svg from 'react-inlinesvg';
import {useDispatch, useSelector} from 'react-redux';
import HeaderArrowIcon from './icons/HeaderArrowIcon';
import Pagination from './Pagination';
import {PaginationRow, PaginationWrapper} from './OrdersPage';
import initSqlJs from "sql.js";
import {drizzle, SQLJsDatabase} from "drizzle-orm/sql-js";
import {suppliers} from "./data/schema";
import {setLoadedFile, setQuery} from "./store/actions/login";
import {selectLoadedFile} from "./store/selectors/auth";

type Props = {
    database: SQLJsDatabase;
}

export type SupplierType = {
    address: string;
    city: string;
    companyName: string;
    contactName: string;
    contactTitle: string;
    country: string;
    id: number;
    phone: string;
    postalCode: string;
    region: string | null;
}
const SuppliersPage = ({database}: Props) => {
    const [suppliersData, setSuppliersData] = useState<SupplierType[]>([]);
    const [suppliersDataCount, setSuppliersDataCount] = useState<number | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [queryArr, setQueryArr] = useState<string[]>([]);
    const dispatch = useDispatch<any>();
    const [queryTime, setQueryTime] = useState<string[]>([]);
    const loadedFile = useSelector(selectLoadedFile);

    useEffect(() => {
        if (database) {
            const startTime = new Date().getTime();
            const stmtCount = database.select().from(suppliers).all()
            const stmt = database.select().from(suppliers).limit(20).offset((currentPage - 1) * 20).all();
            const endTime = new Date().getTime();
            setQueryTime([(endTime - startTime).toString()]);
            setQueryArr([...queryArr, database.select().from(suppliers).limit(20).offset((currentPage - 1) * 20).toSQL().sql ]);
            setSuppliersData(stmt);
            setSuppliersDataCount(stmtCount.length);

        }

    }, [currentPage, database]);


    useEffect(() => {
        if (suppliersData && suppliersData.length > 0) {
            const obj = {
                query: queryArr,
                time: new Date().toISOString(),
                executeTime: queryTime,
            };
            dispatch(setQuery(obj));
        }
    }, [suppliersData, dispatch]);
    return (
        <Wrapper>
            {suppliersData && suppliersDataCount ? (
                <>
                    <Header>
                        <HeaderTitle>Suppliers</HeaderTitle>
                        <HeaderArrowIcon/>
                    </Header>
                    <Table>
                        <TableHeader>
                            <Icon/>
                            <Company>Company</Company>
                            <Contact>Contact</Contact>
                            <Title>Title</Title>
                            <City>City</City>
                            <Country>Country</Country>
                        </TableHeader>
                        <TableBody>
                            {suppliersData.map((supplier: SupplierType, index: number) => {
                                const svg = createAvatar(style, {
                                    seed: supplier.contactName,
                                    // ... and other options
                                });
                                if (index < 1) return;
                                return (
                                    <TableRow key={index}>
                                        <BodyIcon>
                                            <Circle>
                                                <Svg src={svg}/>
                                            </Circle>
                                        </BodyIcon>
                                        <BodyCompany>
                                            <Link to={`/supplier/${supplier.id}`}>
                                                {supplier.companyName}
                                            </Link>
                                        </BodyCompany>

                                        <BodyContact>{supplier.contactName}</BodyContact>
                                        <BodyTitle>{supplier.contactTitle}</BodyTitle>
                                        <BodyCity>{supplier.city}</BodyCity>
                                        <BodyCountry>{supplier.country}</BodyCountry>
                                    </TableRow>
                                );
                            })}
                            <PaginationWrapper>
                                <PaginationRow>
                                    <Pagination
                                        className="pagination-bar"
                                        currentPage={currentPage}
                                        totalCount={suppliersDataCount}
                                        pageSize={20}
                                        onPageChange={(page: any) => setCurrentPage(page)}
                                    />
                                </PaginationRow>
                                <PageCount>
                                    Page: {currentPage} of {Math.ceil(suppliersDataCount! / 20)}
                                </PageCount>
                            </PaginationWrapper>
                        </TableBody>
                    </Table>
                </>
            ) : (
                <div style={{color: '#000'}}>Loading suppliers...</div>
            )}
        </Wrapper>
    );
};

export default SuppliersPage;

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

const Circle = styled.div`
  width: 24px;
  height: 24px;
  overflow: hidden;
  background-color: cadetblue;
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
const BodyCompany = styled.div`
  width: 30%;
  padding: 9px 12px;
  //border: 1px solid #000;
`;
const BodyContact = styled.div`
  width: 15%;
  padding: 9px 12px;
  //border: 1px solid #000;
`;
const BodyTitle = styled.div`
  width: 20%;
  padding: 9px 12px;
  //border: 1px solid #000;
`;
const BodyCity = styled.div`
  width: 15%;
  padding: 9px 12px;
  //border: 1px solid #000;
`;
const BodyCountry = styled.div`
  width: 13%;
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
  width: 30%;
  font-size: 16px;
  font-weight: 700;
  padding: 9px 12px;
`;
const Contact = styled.div`
  width: 15%;
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
  width: 15%;
  font-size: 16px;
  font-weight: 700;
  padding: 9px 12px;
`;
const Country = styled.div`
  width: 15%;
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
