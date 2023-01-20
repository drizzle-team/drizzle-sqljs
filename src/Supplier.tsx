import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {useNavigate, useParams} from 'react-router-dom';

import {useDispatch} from 'react-redux';
import Ballot from './icons/Ballot';
import {SupplierType} from "./SuppliersPage";
import initSqlJs, {Database} from "sql.js";
import {setQuery} from "./store/actions/login";
import {eq} from "drizzle-orm/expressions";
import {suppliers} from "./data/schema";
import {SQLJsDatabase} from "drizzle-orm-sqlite/sql.js";


type Props = {
    database: SQLJsDatabase
}

const Supplier = ({database}: Props) => {
    const navigation = useNavigate();
    const {id} = useParams();
    const goBack = () => {
        navigation('/suppliers');
    };
    const [supplierData, setSupplierData] = useState<SupplierType | null>(null);
    const [queryArr, setQueryArr] = useState<string[]>([]);
    const [queryTime, setQueryTime] = useState<string[]>([]);

    const dispatch = useDispatch();

    useEffect(() => {
        if (supplierData) {
            const obj = {
                query: queryArr,
                time: new Date().toISOString(),
                executeTime: queryTime,
            };
            dispatch(setQuery(obj));
        }
    }, [dispatch, queryArr, supplierData]);


    useEffect(() => {
        if(database && id) {
            const startTime = new Date().getTime();
            const stmt = database.select(suppliers).where(eq(suppliers.id, Number(id))).all();
            const endTime = new Date().getTime();
            setQueryArr([...queryArr, database.select(suppliers).where(eq(suppliers.id, Number(id))).toSQL().sql ]);
            setQueryTime([(endTime - startTime).toString()]);
            setSupplierData(stmt[0]);
        }
    }, [database]);

    return (
        <Wrapper>
            {supplierData ? (
                <>
                    <Body>
                        <Header>
                            <Ballot/>
                            <HeaderTitle>Supplier information</HeaderTitle>
                        </Header>
                        <BodyContent>
                            <BodyContentLeft>
                                <BodyContentLeftItem>
                                    <BodyContentLeftItemTitle>
                                        Company Name
                                    </BodyContentLeftItemTitle>
                                    <BodyContentLeftItemValue>
                                        {supplierData.companyName}
                                    </BodyContentLeftItemValue>
                                </BodyContentLeftItem>
                                <BodyContentLeftItem>
                                    <BodyContentLeftItemTitle>
                                        Contact Name
                                    </BodyContentLeftItemTitle>
                                    <BodyContentLeftItemValue>
                                        {supplierData.contactName}
                                    </BodyContentLeftItemValue>
                                </BodyContentLeftItem>
                                <BodyContentLeftItem>
                                    <BodyContentLeftItemTitle>
                                        Contact Title
                                    </BodyContentLeftItemTitle>
                                    <BodyContentLeftItemValue>
                                        {supplierData.contactTitle}
                                    </BodyContentLeftItemValue>
                                </BodyContentLeftItem>
                                <BodyContentLeftItem>
                                    <BodyContentLeftItemTitle>Address</BodyContentLeftItemTitle>
                                    <BodyContentLeftItemValue>
                                        {supplierData.address}
                                    </BodyContentLeftItemValue>
                                </BodyContentLeftItem>
                                <BodyContentLeftItem>
                                    <BodyContentLeftItemTitle>City</BodyContentLeftItemTitle>
                                    <BodyContentLeftItemValue>
                                        {supplierData.city}
                                    </BodyContentLeftItemValue>
                                </BodyContentLeftItem>
                            </BodyContentLeft>
                            <BodyContentRight>
                                <BodyContentLeftItem>
                                    <BodyContentLeftItemTitle>Region</BodyContentLeftItemTitle>
                                    <BodyContentLeftItemValue>
                                        {supplierData.region}
                                    </BodyContentLeftItemValue>
                                </BodyContentLeftItem>
                                <BodyContentLeftItem>
                                    <BodyContentLeftItemTitle>
                                        Postal Code
                                    </BodyContentLeftItemTitle>
                                    <BodyContentLeftItemValue>
                                        {supplierData.postalCode}
                                    </BodyContentLeftItemValue>
                                </BodyContentLeftItem>
                                <BodyContentLeftItem>
                                    <BodyContentLeftItemTitle>Country</BodyContentLeftItemTitle>
                                    <BodyContentLeftItemValue>
                                        {supplierData.country}
                                    </BodyContentLeftItemValue>
                                </BodyContentLeftItem>
                                <BodyContentLeftItem>
                                    <BodyContentLeftItemTitle>Phone</BodyContentLeftItemTitle>
                                    <BodyContentLeftItemValue>
                                        {supplierData.phone}
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
                <div style={{color: '#000'}}>Loading supplier...</div>
            )}
        </Wrapper>
    );
};

export default Supplier;

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
