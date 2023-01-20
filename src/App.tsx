import { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';
import initSqlJs, { SqlValue } from 'sql.js';
import { drizzle } from 'drizzle-orm-sqlite/sql.js';
import Home from "./LeftMenu";
import MainPage from "./MainPage";
import SuppliersPage from "./SuppliersPage";
import {MemoryRouter as Router, Route, Routes, useNavigate} from 'react-router-dom';
import Supplier from "./Supplier";
import DashboardPage from "./DashboardPage";
import {setLoadedFile} from "./store/actions/login";
import {details, employees, suppliers} from "./data/schema";
import {useDispatch, useSelector} from "react-redux";
import {selectLoadedFile} from "./store/selectors/auth";
import axios from "axios";
import ProductsPage from "./ProductsPage";
import Product from "./Product";
import OrdersPage from "./OrdersPage";
import Order from "./Order";
import EmployeesPage from "./EmployeesPage";
import Employees from "./Employees";
import CustomersPage from "./CustomersPage";
import Customer from "./Customer";
import Documentation from "./Documentation";
import SearchPage from "./SearchPage";



function App() {
	const [now, setNow] = useState<SqlValue>();
	const [file, setFile] = useState<Blob>()
	const loadedFile = useSelector(selectLoadedFile);
	const dispatch = useDispatch<any>();
	const [db, setDb] = useState<any>()

	useEffect(() => {
		(async () => {
			const sqlPromise = await initSqlJs({
				// Required to load the wasm binary asynchronously. Of course, you can host it wherever you want
				// You can omit locateFile completely when running in node
				locateFile: (file) => `https://sql.js.org/dist/${file}`,
			});
			//
			// const dataPromise = !loadedFile && await axios.get('https://therealyo-university.s3.eu-west-2.amazonaws.com/nw.sqlite', {
			// 	responseType: 'arraybuffer'
			// }).then((response) => {
			// 	dispatch(setLoadedFile(true))
			// 	return response.data
			// })
			// const [SQL, buf] = await Promise.all([sqlPromise, dataPromise])
			// const db = new SQL.Database(new Uint8Array(buf));
			function loadBinaryFile(path:any,success:any, error:any) {
				console.log(path,error )
				let xhr = new XMLHttpRequest();
				xhr.open("GET", path, true);
				xhr.responseType = "arraybuffer";
				console.log('xhr', xhr)
				xhr.onload = function() {
					let data = new Uint8Array(xhr.response);
					let arr = [];
					for(let i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
					success(arr.join(""));
				};
				xhr.send();
			};

			loadBinaryFile('./nw.sqlite', function(data:any){
				let sqldb = new sqlPromise.Database(data);
				// Database is ready
				const database = drizzle(sqldb);
				const res = database.select(employees).all()
				setDb(database)

			}, function(error:any){
				console.log(error)
			});

		})().catch((e) => console.error(e));

	}, []);


	return(
		<>
			<Router>
				<Home>
					<Routes>
						<Route path="/" element={<MainPage />} />
						<Route path="/suppliers" element={<SuppliersPage database={db} />} />
						<Route path="/dashboard" element={<DashboardPage />} />
						<Route path="/supplier/:id" element={<Supplier database={db} />} />
						<Route path="/products" element={<ProductsPage database={db} />} />
						<Route path="/employees" element={<EmployeesPage database={db} />} />
						<Route path="/employee/:id" element={<Employees database={db} />} />
						<Route path="/product/:id" element={<Product database={db} />} />
						<Route path="/orders" element={<OrdersPage database={db} />} />
						<Route path="/order/:id" element={<Order database={db} />} />
						<Route path="/customers" element={<CustomersPage database={db} />} />
						<Route path="/customer/:id" element={<Customer database={db} />} />
						<Route path="/search" element={<SearchPage database={db} />} />
						<Route path="/documentation" element={<Documentation />} />
					</Routes>
				</Home>
			</Router>
		</>
	)
}

export default App;
