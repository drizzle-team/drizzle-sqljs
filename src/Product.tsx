import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {useNavigate, useParams} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import Ballot from './icons/Ballot';
import {setQuery} from "./store/actions/login";
import {SQLJsDatabase} from "drizzle-orm/sql-js";
import {products} from "./data/schema";
import {eq} from "drizzle-orm/expressions";


type SupplierData = {
    discontinued: number;
    id: number;
    name: string;
    quantityPerUnit: string;
    reorderLevel: number;
    supplier: string;
    unitPrice: number;
    unitsInStock: number;
    unitsOnOrder: number;
    supplierId: number;
};

type Props = {
    database: SQLJsDatabase;
}
const Product = ({database}: Props) => {
    const navigation = useNavigate();
    const {id} = useParams();
    const goBack = () => {
        navigation('/products');
    };
    const [productData, setProductData] = useState<SupplierData>();
    const [queryArr, setQueryArr] = useState<string[]>([]);
    const [queryTime, setQueryTime] = useState<string[]>([]);

    const dispatch = useDispatch<any>();

    useEffect(() => {
        if (database) {
            const stmt = database.select().from(products).where(eq(products.id, Number(id))).all();
            setQueryArr([...queryArr, database.select().from(products).where(eq(products.id, Number(id))).toSQL().sql]);
            // @ts-ignore
            setProductData(stmt[0]);
        }
    }, [id]);

    useEffect(() => {
        if (productData) {
            const obj = {
                query: queryArr,
                time: new Date().toISOString(),
                executeTime: queryTime,
            };
            dispatch(setQuery(obj));
        }
    }, [productData, dispatch, queryArr]);
    return (
        <Wrapper>
            {productData ? (
                <>
                    <Body>
                        <Header>
                            <Ballot/>
                            <HeaderTitle>Product information</HeaderTitle>
                        </Header>
                        <BodyContent>
                            <BodyContentLeft>
                                <BodyContentLeftItem>
                                    <BodyContentLeftItemTitle>
                                        Product Name
                                    </BodyContentLeftItemTitle>
                                    <BodyContentLeftItemValue>
                                        {productData.name}
                                    </BodyContentLeftItemValue>
                                </BodyContentLeftItem>
                                <BodyContentLeftItem>
                                    <BodyContentLeftItemTitle>Supplier</BodyContentLeftItemTitle>
                                    <BodyContentLeftItemValue>
                                        {productData.supplier}
                                    </BodyContentLeftItemValue>
                                </BodyContentLeftItem>
                                <BodyContentLeftItem>
                                    <BodyContentLeftItemTitle>
                                        Quantity Per Unit
                                    </BodyContentLeftItemTitle>
                                    <BodyContentLeftItemValue>
                                        {productData.quantityPerUnit}
                                    </BodyContentLeftItemValue>
                                </BodyContentLeftItem>
                                <BodyContentLeftItem>
                                    <BodyContentLeftItemTitle>
                                        Unit Price
                                    </BodyContentLeftItemTitle>
                                    <BodyContentLeftItemValue>
                                        {productData.unitPrice}
                                    </BodyContentLeftItemValue>
                                </BodyContentLeftItem>
                            </BodyContentLeft>
                            <BodyContentRight>
                                <BodyContentLeftItem>
                                    <BodyContentLeftItemTitle>
                                        Units In Stock
                                    </BodyContentLeftItemTitle>
                                    <BodyContentLeftItemValue>
                                        {productData.unitsInStock}
                                    </BodyContentLeftItemValue>
                                </BodyContentLeftItem>
                                <BodyContentLeftItem>
                                    <BodyContentLeftItemTitle>
                                        Units In Order
                                    </BodyContentLeftItemTitle>
                                    <BodyContentLeftItemValue>
                                        {productData.unitsOnOrder}
                                    </BodyContentLeftItemValue>
                                </BodyContentLeftItem>
                                <BodyContentLeftItem>
                                    <BodyContentLeftItemTitle>
                                        Reorder Level
                                    </BodyContentLeftItemTitle>
                                    <BodyContentLeftItemValue>
                                        {productData.reorderLevel}
                                    </BodyContentLeftItemValue>
                                </BodyContentLeftItem>
                                <BodyContentLeftItem>
                                    <BodyContentLeftItemTitle>
                                        Discontinued
                                    </BodyContentLeftItemTitle>
                                    <BodyContentLeftItemValue>
                                        {productData.discontinued}
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
                <div style={{color: '#000'}}>Loading product...</div>
            )}
        </Wrapper>
    );
};

export default Product;

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
