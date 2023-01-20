import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import HeaderArrowIcon from './icons/HeaderArrowIcon';
import { PaginationRow } from './OrdersPage';
import Pagination from './Pagination';
import {SQLJsDatabase} from "drizzle-orm-sqlite/sql.js";
import {products} from "./data/schema";
import {setQuery} from "./store/actions/login";

export type Product = {
  discontinued: number;
  id: number;
  name: string;
  quantityPerUnit: string;
  reorderLevel: number;
  unitPrice: string;
  unitsInStock: number;
  unitsOnOrder: number;

};

type Props = {
  database: SQLJsDatabase
}

const ProductsPage = ({database}:Props) => {
  const [productsData, setProductsData] = useState<Product[]>([]);
  const [productsCount, setProductsCount] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const dispatch = useDispatch<any>();
  const [queryArr, setQueryArr] = useState<string[]>([]);
  const [queryTime, setQueryTime] = useState<string[]>([]);

  useEffect(() => {
    if(database){
        const startTime = new Date().getTime();
      const stmt = database
          .select(products)
          .limit(20)
          .offset((currentPage - 1) * 20)
          .all();
      const stmtCount = database.select(products).all();
        const endTime = new Date().getTime();
        setQueryTime([(endTime - startTime).toString()]);
      setProductsData(stmt);
      setQueryArr([...queryArr, database.select(products).limit(20).offset((currentPage - 1) * 20).toSQL().sql ]);
      setProductsCount(stmtCount.length);
    }
  }, [currentPage, database]);

  useEffect(() => {
    if (productsData && productsData.length > 0) {
      const obj = {
        query: queryArr,
        time: new Date().toISOString(),
        executeTime: queryTime,
      };
      dispatch(setQuery(obj));
    }
  }, [productsData, dispatch, queryArr]);

  return (
    <Wrapper>
      {productsData && productsCount ? (
        <>
          <Header>
            <HeaderTitle>Products</HeaderTitle>
            <HeaderArrowIcon />
          </Header>
          <Table>
            <TableHeader>
              <Company> Name</Company>
              <Contact> Qt per unit</Contact>
              <Title>Price</Title>
              <City>Stock</City>
              <Country>Orders</Country>
            </TableHeader>
            <TableBody>
              {productsData.map((product: Product, i: number) => {
                if (i < 1) return;
                return (
                  <TableRow key={i}>
                    <BodyCompany>
                      <Link to={`/product/${product.id}`}>{product.name}</Link>
                    </BodyCompany>
                    <BodyContact>{product.quantityPerUnit}</BodyContact>
                    <BodyTitle>${product.unitPrice}</BodyTitle>
                    <BodyCity>{product.unitsInStock}</BodyCity>
                    <BodyCountry>{product.unitsOnOrder}</BodyCountry>
                  </TableRow>
                );
              })}
              <PaginationWrapper>
                <PaginationRow>
                  <Pagination
                    className="pagination-bar"
                    currentPage={currentPage}
                    totalCount={productsCount}
                    pageSize={20}
                    onPageChange={(page: any) => setCurrentPage(page)}
                  />
                </PaginationRow>
                <PageCount>
                  Page: {currentPage} of {Math.ceil(productsCount / 20)}
                </PageCount>
              </PaginationWrapper>
            </TableBody>
          </Table>
        </>
      ) : (
        <div style={{ color: '#000' }}>Loading products...</div>
      )}
    </Wrapper>
  );
};

export default ProductsPage;
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
  border: ${({ active }) =>
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
  width: 30%;
  padding: 9px 12px;
  //border: 1px solid #000;
`;
const BodyContact = styled.div`
  width: 20%;
  padding: 9px 12px;
  //border: 1px solid #000;
`;
const BodyTitle = styled.div`
  width: 30%;
  padding: 9px 12px;
  //border: 1px solid #000;
`;
const BodyCity = styled.div`
  width: 10%;
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
  width: 30%;
  font-size: 16px;
  font-weight: 700;
  padding: 9px 12px;
`;
const Contact = styled.div`
  width: 20%;
  font-size: 16px;
  padding: 9px 12px;
  font-weight: 700;
`;
const Title = styled.div`
  width: 30%;
  font-size: 16px;
  font-weight: 700;
  padding: 9px 12px;
`;
const City = styled.div`
  width: 10%;
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
  border: 1px solid rgba(243, 244, 246, 1); ;
`;

const Header = styled.div`
  padding: 12px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  border-bottom: 1px solid rgba(243, 244, 246, 1); ;
`;

const HeaderTitle = styled.div`
  font-size: 16px;
  font-weight: 700;
`;

function setQueryResponseDashboard(obj: { query: any; time: string }): any {
  throw new Error('Function not implemented.');
}
