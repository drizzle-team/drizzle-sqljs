import { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';
import initSqlJs, { SqlValue } from 'sql.js';
import { drizzle } from 'drizzle-orm-sqlite/sql.js';
import { sql } from 'drizzle-orm';

function App() {
	const [now, setNow] = useState<SqlValue>();

	useEffect(() => {
		(async () => {
			const SQL = await initSqlJs({
				// Required to load the wasm binary asynchronously. Of course, you can host it wherever you want
				// You can omit locateFile completely when running in node
				locateFile: (file) => `https://sql.js.org/dist/${file}`,
			});

			const sqlJs = new SQL.Database();
			const db = drizzle(sqlJs);

			const { now } = db.get<{ now: string }>(
				sql`select datetime('now') as now`,
			);

			setNow(now);
		})().catch((e) => console.error(e));
	}, []);

	if (!now) return <div>Loading...</div>;

	return <div>Current time from SQLite: {now}</div>;
}

export default App;
