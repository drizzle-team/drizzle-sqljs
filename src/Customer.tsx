import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {useNavigate, useParams} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import Ballot from './icons/Ballot';
import {SQLJsDatabase} from "drizzle-orm-sqlite/sql.js";
import {customers} from "./data/schema";
import {eq} from "drizzle-orm/expressions";
import {setQuery} from "./store/actions/login";

type CustomerType = {
    address: string;
    city: string;
    companyName: string;
    contactName: string;
    contactTitle: string;
    country: string;
    id: string;
    fax: string | null;
    phone: string;
    postalCode: string | null;
    region: string | null;
};
type Props = {
    database: SQLJsDatabase
}
const Customer = ({database}: Props) => {
    const navigation = useNavigate();
    const {id} = useParams();
    const goBack = () => {
        navigation('/customers');
    };

    const [customerData, setCustomerData] = useState<CustomerType | null>(null);
    const [queryArr, setQueryArr] = useState<string[]>([]);
    const dispatch = useDispatch<any>();
    const [queryTime, setQueryTime] = useState<string[]>([]);

    useEffect(() => {
        if (database && id) {
            const startTime = new Date().getTime();
            const stmt = database.select(customers).where(eq(customers.id, id)).all();
            const endTime = new Date().getTime();
            setQueryTime([(endTime - startTime).toString()]);
            setQueryArr([...queryArr, database.select(customers).where(eq(customers.id, id)).toSQL().sql]);
            setCustomerData(stmt[0]);
        }
    }, [database, id]);

    useEffect(() => {
        if (customerData) {
            const obj = {
                query: queryArr,
                time: new Date().toISOString(),
                executeTime: queryTime,
            };
            dispatch(setQuery(obj));
        }
    }, [customerData, dispatch]);
    return (
        <Wrapper>
            {customerData ? (
                <>
                    <Body>
                        <Header>
                            <Ballot/>
                            <HeaderTitle>Customer information</HeaderTitle>
                        </Header>
                        <BodyContent>
                            <BodyContentLeft>
                                <BodyContentLeftItem>
                                    <BodyContentLeftItemTitle>
                                        Company Name
                                    </BodyContentLeftItemTitle>
                                    <BodyContentLeftItemValue>
                                        {customerData.companyName}
                                    </BodyContentLeftItemValue>
                                </BodyContentLeftItem>
                                <BodyContentLeftItem>
                                    <BodyContentLeftItemTitle>
                                        Contact Name
                                    </BodyContentLeftItemTitle>
                                    <BodyContentLeftItemValue>
                                        {customerData.contactName}
                                    </BodyContentLeftItemValue>
                                </BodyContentLeftItem>
                                <BodyContentLeftItem>
                                    <BodyContentLeftItemTitle>
                                        Contact Title
                                    </BodyContentLeftItemTitle>
                                    <BodyContentLeftItemValue>
                                        {customerData.contactTitle}
                                    </BodyContentLeftItemValue>
                                </BodyContentLeftItem>
                                <BodyContentLeftItem>
                                    <BodyContentLeftItemTitle>Address</BodyContentLeftItemTitle>
                                    <BodyContentLeftItemValue>
                                        {customerData.address}
                                    </BodyContentLeftItemValue>
                                </BodyContentLeftItem>
                                <BodyContentLeftItem>
                                    <BodyContentLeftItemTitle>City</BodyContentLeftItemTitle>
                                    <BodyContentLeftItemValue>
                                        {customerData.city}
                                    </BodyContentLeftItemValue>
                                </BodyContentLeftItem>
                            </BodyContentLeft>
                            <BodyContentRight>
                                <BodyContentLeftItem>
                                    <BodyContentLeftItemTitle>Region</BodyContentLeftItemTitle>
                                    <BodyContentLeftItemValue>
                                        {customerData.region}
                                    </BodyContentLeftItemValue>
                                </BodyContentLeftItem>
                                <BodyContentLeftItem>
                                    <BodyContentLeftItemTitle>
                                        Postal Code
                                    </BodyContentLeftItemTitle>
                                    <BodyContentLeftItemValue>
                                        {customerData.postalCode}
                                    </BodyContentLeftItemValue>
                                </BodyContentLeftItem>
                                <BodyContentLeftItem>
                                    <BodyContentLeftItemTitle>Country</BodyContentLeftItemTitle>
                                    <BodyContentLeftItemValue>
                                        {customerData.country}
                                    </BodyContentLeftItemValue>
                                </BodyContentLeftItem>
                                <BodyContentLeftItem>
                                    <BodyContentLeftItemTitle>Phone</BodyContentLeftItemTitle>
                                    <BodyContentLeftItemValue>
                                        {customerData.phone}
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
                <div style={{color: '#000'}}>Loading customer...</div>
            )}
        </Wrapper>
    );
};

export default Customer;

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
