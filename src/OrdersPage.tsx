import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { useDispatch } from 'react-redux';
import HeaderArrowIcon from './icons/HeaderArrowIcon';
import Pagination from './Pagination';
import {SQLJsDatabase} from "drizzle-orm/sql-js";
import {details, orders} from "./data/schema";
import {sql} from "drizzle-orm";
import {asc, eq} from "drizzle-orm/expressions";
import {setQuery} from "./store/actions/login";

type Props = {
  database: SQLJsDatabase
}


export type OrderType = {
  customerId: string;
  employeeId: number;
  freight: number;
  orderDate: string;
  id: number;
  requiredDate: string;
  shipAddress: string;
  shipCity: string;
  shipCountry: string;
  shipName: string;
  shipPostalCode: string;
  shipRegion: string;
  shipVia: string;
  shippedDate: string;
  totalPrice: number;
  quantitySum: number;
  totalDiscount: number;
  productsCount: number;
  products?: Array<OrderProduct>;
};

export type OrderProduct = {
  CategoryID: number;
  Discontinued: number;
  Discount: string;
  OrderID: number;
  OrderUnitPrice: string;
  ProductID: number;
  ProductName: string;
  ProductUnitPrice: string;
  Quantity: number;
  QuantityPerUnit: string;
  ReorderLevel: number;
  SupplierID: number;
  UnitsInStock: number;
  UnitsOnOrder: number;
};


const OrdersPage = ({database}:Props) => {
  const [ordersData, setOrdersData] = useState< OrderType[] | null>(null);
  const [ordersCount, setOrdersCount] = useState< number| null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [queryArr, setQueryArr] = useState<string[]>([]);
  const [queryTime, setQueryTime] = useState<string[]>([]);

  const dispatch = useDispatch<any>();

  useEffect(() => {
  if(database){
    const startTime = new Date().getTime();
    const stmt = database
        .select({
          id: orders.id,
          shippedDate: orders.shippedDate,
          shipName: orders.shipName,
          shipCity: orders.shipCity,
          shipCountry: orders.shipCountry,
          productsCount: sql`count(${details.productId})`.as<number>(),
          quantitySum: sql`sum(${details.quantity})`.as<number>(),
          totalPrice:
              sql`sum(${details.quantity} * ${details.unitPrice})`.as<number>(),
        })
        .from(orders)
        .leftJoin(details, eq(orders.id, details.orderId))
        .groupBy(orders.id)
        .orderBy(asc(orders.id))
        .limit(20)
        .offset((currentPage - 1) * 20)
        .all();
    const endTime = new Date().getTime();
    setQueryArr([...queryArr, database
        .select({
          id: orders.id,
          shippedDate: orders.shippedDate,
          shipName: orders.shipName,
          shipCity: orders.shipCity,
          shipCountry: orders.shipCountry,
          productsCount: sql<number>`count(${details.productId})`,
          quantitySum: sql<number>`sum(${details.quantity})`,
          totalPrice:
              sql<number>`sum(${details.quantity} * ${details.unitPrice})`,
        })
        .from(orders)
        .leftJoin(details, eq(orders.id, details.orderId))
        .groupBy(orders.id)
        .orderBy(asc(orders.id))
        .limit(20)
        .offset((currentPage - 1) * 20).toSQL().sql ]);
    // @ts-ignore
    setOrdersData(stmt);
    const stmtCount = database.select().from(orders).all();
    setQueryTime([(endTime - startTime).toString()]);
    setOrdersCount(stmtCount.length)
  }
  }, [currentPage]);

  useEffect(() => {
    if (ordersData && ordersData.length > 0) {
      const obj = {
        query: queryArr,
        time: new Date().toISOString(),
        executeTime: queryTime,
      };
      dispatch(setQuery(obj));
    }
  }, [ordersData, dispatch, queryArr]);


  return (
    <Wrapper>
      {ordersData && ordersCount ? (
        <>
          <Header>
            <HeaderTitle>Orders</HeaderTitle>
            <HeaderArrowIcon />
          </Header>
          <Table>
            <TableHeader>
              <Company> Id</Company>
              <Contact>Total Price</Contact>
              <Title>Products</Title>
              <City>Quantity</City>
              <Country>Shipped</Country>
              <Country>Ship Name</Country>
              <Country>City</Country>
              <Country>Country</Country>
            </TableHeader>
            <TableBody>
              {ordersData.map((order: OrderType) => (
                <TableRow>
                  <BodyCompany>
                    <Link to={`/order/${order.id}`}>{order.id}</Link>
                  </BodyCompany>
                  <BodyContact>${order.totalPrice.toFixed(0)}</BodyContact>
                  <BodyTitle>{order.productsCount}</BodyTitle>
                  <BodyCity>{order.quantitySum}</BodyCity>
                  <BodyCountry>
                    {order.shippedDate
                      ? format(new Date(order.shippedDate), 'yyyy-LL-dd')
                      : ''}
                  </BodyCountry>
                  <BodyCountry>{order.shipName}</BodyCountry>
                  <BodyCountry>{order.shipCity}</BodyCountry>
                  <BodyCountry1>{order.shipCountry}</BodyCountry1>
                </TableRow>
              ))}
              <PaginationWrapper>
                <PaginationRow>
                  <Pagination
                    className="pagination-bar"
                    currentPage={currentPage}
                    totalCount={ordersCount}
                    pageSize={20}
                    onPageChange={(page: any) => setCurrentPage(page)}
                  />
                </PaginationRow>
                <PageCount>
                  Page: {currentPage} of {Math.ceil(ordersCount / 20)}
                </PageCount>
              </PaginationWrapper>
            </TableBody>
          </Table>
        </>
      ) : (
        <div style={{ color: '#000' }}>Loading orders...</div>
      )}
    </Wrapper>
  );
};

export default OrdersPage;

export const PaginationRow = styled.div`
  display: flex;
  align-items: center;
`;

const PageCount = styled.div`
  font-size: 12.8px;
`;

export const PaginationNumberWrapper = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  border: 1px solid rgba(243, 244, 246, 1);
`;

export const PaginationNumber = styled.div<{ active: boolean }>`
  //width: 7px;
  padding: 10px 16px;
  border-radius: 0.25rem;
  margin-left: 0.25rem;
  margin-right: 0.25rem;
  cursor: pointer;
  border: ${({ active }) =>
    active ? '1px solid rgba(209, 213, 219, 1)' : '1px solid #fff'};
  //margin-right: 8px;
  :hover {
    border: 1px solid black;
    border-radius: 0.25rem;
  }
`;

export const PaginationWrapper = styled.div`
  padding: 12px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid rgba(243, 244, 246, 1);
`;

const BodyCountry1 = styled.div`
  width: 12.25%;
  padding: 9px 12px;
`;

const BodyCompany = styled.div`
  width: 5.5%;
  padding: 9px 12px;
  //border: 1px solid #000;
`;
const BodyContact = styled.div`
  width: 9%;
  padding: 9px 12px;
  //border: 1px solid #000;
`;
const BodyTitle = styled.div`
  width: 9%;
  padding: 9px 12px;
  //border: 1px solid #000;
`;
const BodyCity = styled.div`
  width: 8%;

  padding: 9px 12px;
  //border: 1px solid #000;
`;
const BodyCountry = styled.div`
  width: 12.25%;

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
  width: 5.5%;
  font-size: 16px;
  font-weight: 700;
  padding: 9px 12px;
`;
const Contact = styled.div`
  width: 9%;
  font-size: 16px;
  padding: 9px 12px;
  font-weight: 700;
`;
const Title = styled.div`
  width: 8%;
  font-size: 16px;
  font-weight: 700;
  padding: 9px 12px;
`;
const City = styled.div`
  width: 7.5%;
  font-size: 16px;
  font-weight: 700;
  padding: 9px 12px;
`;
const Country = styled.div`
  width: 12.5%;
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
  border: 1px solid rgba(243, 244, 246, 1);
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
