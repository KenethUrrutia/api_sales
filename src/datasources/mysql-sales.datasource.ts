import { inject, lifeCycleObserver, LifeCycleObserver } from '@loopback/core';
import { juggler } from '@loopback/repository';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({
	path: path.join(__dirname, `../../.env.${process.env.ENV}`)
});

const config = {
	name: 'mysql_sales',
	connector: 'mysql',
	url: '',
	host: process.env.MYSQL_DB_HOST!,
	port: parseInt(process.env.MYSQL_DB_PORT!, 10),
	user: process.env.MYSQL_DB_USER!,
	password: process.env.MYSQL_DB_PASSWORD!,
	database: process.env.MYSQL_DB_DATABASE!
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class MysqlSalesDataSource extends juggler.DataSource implements LifeCycleObserver {
	static dataSourceName = 'mysql_sales';
	static readonly defaultConfig = config;

	constructor(
		@inject('datasources.config.mysql_sales', { optional: true })
		dsConfig: object = config
	) {
		super(dsConfig);
	}
}
