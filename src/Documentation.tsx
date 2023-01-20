import React from 'react';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const Documentation = () => {
  const src = `
  ### The Repository

This repository stores a desktop copy of [Northwind Traders](https://northwind.d1sql.com/dash) made using electron, react, typescript.

### Install

Clone the repo and install dependencies:

\`\`\`bash
git clone --depth 1 --branch main https://github.com/Nagrik/electron.git your-project-name
cd your-project-name
npm install
\`\`\`

### Starting Development

Start the app in the \`dev\` environment:

\`\`\`bash
npm start
\`\`\`

<!-- ## Packaging for Production

To package apps for the local platform:

\`\`\`bash
npm run package
\`\`\` -->

### Docs

You can use existing backend for this application with existing database or provide your own database either adding link to it in **.env** or setting link in dashboard page of the application.

#### Own database

You can use database with our backend **only if** your database is _PostgreSQL_ and have following tables

\`\`\`sql
CREATE TABLE IF NOT EXISTS Categories (
\t"CategoryID" INT PRIMARY KEY,
\t"CategoryName" character varying(100),
\t"Description" character varying(100)
);

CREATE TABLE IF NOT EXISTS Customers (
\t"CustomerID" character varying(20) PRIMARY KEY,
\t"CompanyName" character varying(100),
\t"ContactName" character varying(100),
\t"ContactTitle" character varying(100),
\t"Address" character varying(100),
\t"City" character varying(100),
\t"Region" character varying(100),
\t"PostalCode" character varying(100),
\t"Country" character varying(100),
\t"Phone" character varying(100),
\t"Fax" character varying(100)
);

CREATE TABLE IF NOT EXISTS EmployeeTerritories (
\t"EmployeeID" INT,
\t"TerritoryID" INT
);

CREATE TABLE IF NOT EXISTS Employees (
\t"EmployeeID" INT PRIMARY KEY,
\t"LastName" character varying(100),
\t"FirstName" character varying(100),
\t"Title" character varying(100),
\t"TitleOfCourtesy" character varying(100),
\t"BirthDate" character varying(100),
\t"HireDate" character varying(100),
\t"Address" character varying(100),
\t"City" character varying(100),
\t"Region" character varying(100),
\t"PostalCode" character varying(100),
\t"Country" character varying(100),
\t"HomePhone" character varying(100),
\t"Extension" INT,
\t"Notes" character varying(500),
\t"ReportsTo" INT
);

CREATE TABLE IF NOT EXISTS OrderDetails (
\t"id" SERIAL PRIMARY KEY,
\t"OrderID" INT,
\t"ProductID" INT,
\t"UnitPrice" numeric,
\t"Quantity" INT,
\t"Discount" numeric
);

CREATE TABLE IF NOT EXISTS Orders (
\t"OrderID" INT PRIMARY KEY,
\t"CustomerID" character varying(5),
\t"EmployeeID" INT,
\t"OrderDate" character varying(100),
\t"RequiredDate" character varying(100),
\t"ShippedDate" character varying(100),
\t"ShipVia" INT,
\t"Freight" numeric,
\t"ShipName" character varying(100),
\t"ShipAddress" character varying(100),
\t"ShipCity" character varying(100),
\t"ShipRegion" character varying(100),
\t"ShipPostalCode" character varying(100),
\t"ShipCountry" character varying(100)
);

CREATE TABLE IF NOT EXISTS Products (
\t"ProductID" INT PRIMARY KEY,
\t"ProductName" character varying(100),
\t"SupplierID" INT,
\t"CategoryID" INT,
\t"QuantityPerUnit" character varying(100),
\t"UnitPrice" numeric,
\t"UnitsInStock" INT,
\t"UnitsOnOrder" INT,
\t"ReorderLevel" INT,
\t"Discontinued" INT
);

CREATE TABLE IF NOT EXISTS Regions (
\t"RegionID" INT PRIMARY KEY,
\t"RegionDescription" character varying(30)
);

CREATE TABLE IF NOT EXISTS Shippers (
\t"ShipperID" INT PRIMARY KEY,
\t"CompanyName" character varying(100),
\t"Phone" character varying(50)
);

CREATE TABLE IF NOT EXISTS Suppliers (
\t"SupplierID" INT PRIMARY KEY,
\t"CompanyName" character varying(100),
\t"ContactName" character varying(100),
\t"ContactTitle" character varying(100),
\t"Address" character varying(100),
\t"City" character varying(100),
\t"Region" character varying(100),
\t"PostalCode" character varying(100),
\t"Country" character varying(100),
\t"Phone" character varying(100),
\t"Fax" character varying(100),
\t"HomePage" character varying(100)
);

CREATE TABLE IF NOT EXISTS Territories (
\t"TerritoryID" character varying(10) PRIMARY KEY,
\t"TerritoryDescription" character varying(50),
\t"RegionID" INT
);

ALTER TABLE customers
    ADD COLUMN customers_with_rankings tsvector;
UPDATE customers SET customers_with_rankings =
    setweight(to_tsvector("CustomerID"), 'AA') ||
    setweight(to_tsvector("CompanyName"), 'AB') ||
    setweight(to_tsvector("ContactName"), 'AC') ||
    setweight(to_tsvector("ContactTitle"), 'AD') ||
    setweight(to_tsvector("Address"), 'BA');

ALTER TABLE products
    ADD COLUMN products_ranking tsvector;
UPDATE products SET products_ranking = to_tsvector("ProductName");
\`\`\`

#### Own API

You can use your own API if has following endpoints:

**queries** field is present on every response

\`\`\`TEXT
queries: Array[{
      executionTime: number,
      select: number,
      selectWhere: number,
      selectJoin: number,
      query: string // SQL query executed to get response data
    }],
\`\`\`
### Suppliers Page:
\`\`\`TEXT
GET http://your.own.api/suppliers?page=1 HTTP/1.1

Response {
  queries,
  data: Array[
    { count: number },
    ...{
      SupplierID: number;
      CompanyName: string;
      ContactName: string;
      ContactTitle: string;
      Address: string;
      City: string;
      Region: string;
      PostalCode: string;
      Country: string;
      Phone: string;
      Fax: string;
      HomePage: string;
    }
  ]
}
\`\`\`
### Supplier:
\`\`\`TEXT
GET http://your.own.api/supplier?id=1 HTTP/1.1

Response {
  queries,
  data: [{
    SupplierID: number;
    CompanyName: string;
    ContactName: string;
    ContactTitle: string;
    Address: string;
    City: string;
    Region: string;
    PostalCode: string;
    Country: string;
    Phone: string;
    Fax: string;
    HomePage: string;
  }]
}

\`\`\`
### Customers Page:
\`\`\`TEXT
GET http://your.own.api/customers?page=1 HTTP/1.1

Response {
  queries,
  data: Array[
    { count: number },
    ...{
      Address: string;
      City: string;
      CompanyName: string;
      ContactName: string;
      ContactTitle: string;
      Country: string;
      CustomerID: string;
      Fax: string;
      Phone: string;
      PostalCode: string;
      Region: string;
    }
  ]
}
\`\`\`
### Customer:
\`\`\`TEXT
GET http://your.own.api/customer?id=ALFKI HTTP/1.1

Response {
  queries,
  data: [{
    Address: string;
    City: string;
    CompanyName: string;
    ContactName: string;
    ContactTitle: string;
    Country: string;
    CustomerID: string;
    Fax: string;
    Phone: string;
    PostalCode: string;
    Region: string;
  }]
}
\`\`\`
### Search Page (search by customer name):
\`\`\`TEXT
GET http://your.own.api/searchCustomer?search=Alfred HTTP/1.1

Response {
  queries,
  data: Array[...{
    Address: string;
    City: string;
    CompanyName: string;
    ContactName: string;
    ContactTitle: string;
    Country: string;
    CustomerID: string;
    Fax: string;
    Phone: string;
    PostalCode: string;
    Region: string;
  }]
}
\`\`\`

### Products Page:
\`\`\`TEXT
GET http://your.own.api/products?page=1 HTTP/1.1

Response {
  queries,
  data: Array[
    { count: number },
    ...{
      CategoryID: number;
      Discontinued: number;
      ProductID: number;
      ProductName: string;
      QuantityPerUnit: string;
      ReorderLevel: number;
      Supplier: string;
      SupplierID: number;
      UnitPrice: number;
      UnitsInStock: number;
      UnitsOnOrder: number;
    }
  ]
}
\`\`\`

### Product:
\`\`\`TEXT
GET http://your.own.api/product?id=1 HTTP/1.1

Response {
  queries,
  data: [{
    CategoryID: number;
    Discontinued: number;
    ProductID: number;
    ProductName: string;
    QuantityPerUnit: string;
    ReorderLevel: number;
    Supplier: string;
    SupplierID: number;
    UnitPrice: number;
    UnitsInStock: number;
    UnitsOnOrder: number;
  }]
}
\`\`\`

### Search Page (search by product name):

\`\`\`TEXT
GET http://your.own.api/searchProduct?search=Chai HTTP/1.1

Response {
  queries,
  data: Array[...{
    CategoryID: number;
    Discontinued: number;
    ProductID: number;
    ProductName: string;
    QuantityPerUnit: string;
    ReorderLevel: number;
    Supplier: string;
    SupplierID: number;
    UnitPrice: number;
    UnitsInStock: number;
    UnitsOnOrder: number;
  }]
}
\`\`\`

### Employees Page:
\`\`\`TEXT
GET http://your.own.api/employees?page=1 HTTP/1.1

Response {
  queries,
  data: Array[
    { count: number },
    ...{
      Address: string;
      BirthDate: string;
      City: string;
      Country: string;
      EmployeeID: number;
      Extension: number;
      FirstName: string;
      HireDate: string;
      HomePhone: string;
      LastName: string;
      Notes: string;
      PostalCode: string;
      Region: string;
      ReportsTo: number;
      ReportsToName: string;
      Title: string;
      TitleOfCourtesy: string;
    }
  ]
}
\`\`\`

### Employee:

\`\`\`TEXT
GET http://your.own.api/employee?id=1 HTTP/1.1

Response {
  queries,
  data: [{
      Address: string;
      BirthDate: string;
      City: string;
      Country: string;
      EmployeeID: number;
      Extension: number;
      FirstName: string;
      HireDate: string;
      HomePhone: string;
      LastName: string;
      Notes: string;
      PostalCode: string;
      Region: string;
      ReportsTo: number;
      ReportsToName: string;
      Title: string;
      TitleOfCourtesy: string;
  }]
}
\`\`\`

### Orders Page:
\`\`\`TEXT
GET http://your.own.api/orders?page=1 HTTP/1.1

Response {
  queries,
  data: Array[{
    { count: number},
    ...{
      CustomerID: string;
      EmployeeID: number;
      Freight: number;
      OrderDate: string;
      OrderID: number;
      RequiredDate: string;
      ShipAddress: string;
      ShipCity: string;
      ShipCountry: string;
      ShipName: string;
      ShipPostalCode: string;
      ShipRegion: string;
      ShipVia: string;
      ShippedDate: string;
      TotalPrice: number;
      TotalQuantity: number;
      TotalDiscount: number;
      TotalProducts: number;
    }
  }]
}
\`\`\`

### Order Page:
\`\`\`TEXT
GET http://your.own.api/order?id=10248 HTTP/1.1

Response {
  queries,
  data: [{
    CustomerID: string;
    EmployeeID: number;
    Freight: number;
    OrderDate: string;
    OrderID: number;
    RequiredDate: string;
    ShipAddress: string;
    ShipCity: string;
    ShipCountry: string;
    ShipName: string;
    ShipPostalCode: string;
    ShipRegion: string;
    ShipVia: string;
    ShippedDate: string;
    TotalPrice: number;
    TotalQuantity: number;
    TotalDiscount: number;
    TotalProducts: number;
    Products: Array[...{
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
    }];
  }]
}
\`\`\`

### License

MIT © [Electron React Boilerplate](https://github.com/electron-react-boilerplate)`;
  return (
    <Wrapper>
      <ReactMarkdown
        children={src}
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
              <SyntaxHighlighter
                children={String(children).replace(/\n$/, '')}
                // @ts-ignore
                style={materialDark}
                language={match[1]}
                PreTag="div"
                {...props}
              />
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
        }}
      />
    </Wrapper>
  );
};

export default Documentation;

const Wrapper = styled.div`
  padding: 24px 48px;
`;
