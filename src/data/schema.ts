import {
  foreignKey,
  InferModel,
  integer,
  numeric,
  sqliteTable,
  text,
} from 'drizzle-orm-sqlite';

export const customers = sqliteTable('Customers', {
  id: text('CustomerID').primaryKey(),
  companyName: text('CompanyName').notNull(),
  contactName: text('ContactName').notNull(),
  contactTitle: text('ContactTitle').notNull(),
  address: text('Address').notNull(),
  city: text('City').notNull(),
  postalCode: text('PostalCode'),
  region: text('Region'),
  country: text('Country').notNull(),
  phone: text('Phone').notNull(),
  fax: text('Fax'),
});

export type Customers = InferModel<typeof customers>;

export const employees = sqliteTable(
  'Employees',
  {
    id: integer('EmployeeID').primaryKey(),
    lastName: text('LastName').notNull(),
    firstName: text('FirstName'),
    title: text('Title').notNull(),
    titleOfCourtesy: text('TitleOfCourtesy').notNull(),
    birthDate: integer('BirthDate', { mode: 'timestamp' }).notNull(),
    hireDate: integer('HireDate', { mode: 'timestamp' }).notNull(),
    address: text('Address').notNull(),
    city: text('City').notNull(),
    postalCode: text('PostalCode').notNull(),
    country: text('Country').notNull(),
    homePhone: text('HomePhone').notNull(),
    extension: integer('Extension').notNull(),
    notes: text('Notes').notNull(),
    reportsTo: integer('ReportsTo'),
    photoPath: text('PhotoPath'),
  },
  (table) => ({
    reportsToFk: foreignKey(() => ({
      columns: [table.reportsTo],
      foreignColumns: [table.id],
    })),
  })
);

export type Employees = InferModel<typeof employees>;

export const orders = sqliteTable('Orders', {
  id: integer('OrderID').primaryKey(),
  orderDate: integer('OrderDate', { mode: 'timestamp' }).notNull(),
  requiredDate: integer('RequiredDate', { mode: 'timestamp' }).notNull(),
  shippedDate: integer('ShippedDate', { mode: 'timestamp' }),
  shipVia: integer('ShipVia').notNull(),
  freight: numeric('Freight').notNull(),
  shipName: text('ShipName').notNull(),
  shipCity: text('ShipCity').notNull(),
  shipRegion: text('ShipRegion'),
  shipPostalCode: text('ShipPostalCode'),
  shipCountry: text('ShipCountry').notNull(),

  customerId: text('customerId')
    .notNull()
    .references(() => customers.id, { onDelete: 'cascade' }),

  employeeId: integer('employeeId')
    .notNull()
    .references(() => employees.id, { onDelete: 'cascade' }),
});

export type Orders = InferModel<typeof orders>;

export const suppliers = sqliteTable('Suppliers', {
  id: integer('SupplierID').primaryKey({ autoIncrement: true }),
  companyName: text('CompanyName').notNull(),
  contactName: text('ContactName').notNull(),
  contactTitle: text('ContactTitle').notNull(),
  address: text('Address').notNull(),
  city: text('City').notNull(),
  region: text('Region'),
  postalCode: text('PostalCode').notNull(),
  country: text('Country').notNull(),
  phone: text('Phone').notNull(),
});

export type Suppliers = InferModel<typeof suppliers>;

export const shipper = sqliteTable('Shippers', {
  id: integer('ShipperID').primaryKey({ autoIncrement: true }),
  companyName: text('CompanyName').notNull(),
  phone: text('Phone').notNull(),
});

export type Shippers = InferModel<typeof shipper>;

export const products = sqliteTable('Products', {
  id: integer('ProductID').primaryKey({ autoIncrement: true }),
  name: text('ProductName').notNull(),
  quantityPerUnit: text('QuantityPerUnit').notNull(),
  unitPrice: numeric('UnitPrice').notNull(),
  unitsInStock: integer('UnitsInStock').notNull(),
  unitsOnOrder: integer('UnitsOnOrder').notNull(),
  reorderLevel: integer('ReorderLevel').notNull(),
  discontinued: integer('Discontinued').notNull(),

  supplierId: integer('SupplierId')
    .notNull()
    .references(() => suppliers.id, { onDelete: 'cascade' }),
});

export type Products = InferModel<typeof products>;

export const details = sqliteTable('Order Details', {
  unitPrice: numeric('UnitPrice').notNull(),
  quantity: integer('Quantity').notNull(),
  discount: numeric('Discount').notNull(),

  orderId: integer('OrderID')
    .notNull()
    .references(() => orders.id, { onDelete: 'cascade' }),

  productId: integer('ProductID')
    .notNull()
    .references(() => products.id, { onDelete: 'cascade' }),
});

export type Detail = InferModel<typeof details>;
