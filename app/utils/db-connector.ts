import {
  Connection,
  ConnectionManager,
  ConnectionOptions,
  DefaultNamingStrategy,
  getConnectionManager,
} from 'typeorm';
import { ProductEntity } from '../model/entities/product.entity';
import { StockEntity } from '../model/entities/stock.entity';
import { RelationLoader } from 'typeorm/query-builder/RelationLoader';
import { RelationIdLoader } from 'typeorm/query-builder/RelationIdLoader';

const CONNECTION_OPTIONS: ConnectionOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  entities: [ProductEntity, StockEntity],
};

export class DbConnector {
  private connectionManager: ConnectionManager;

  public constructor() {
    this.connectionManager = getConnectionManager();
  }

  public async getConnection(): Promise<Connection> {
    try {
      console.log('Establishing connection...');
      let connection: Connection;

      if (this.connectionManager.has('default')) {
        connection = this.injectConnectionOptions(
          this.connectionManager.get(),
          CONNECTION_OPTIONS,
        );
      } else {
        connection = this.connectionManager.create(CONNECTION_OPTIONS);
        await connection.connect();
      }

      console.log('Connection established');
      return connection;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  /**
   * Injects missing / outdated connection options into an existing database
   * connection.
   *
   * @see https://github.com/typeorm/typeorm/issues/2598#issue-345445322
   * @param {Connection} connection
   * @param {ConnectionOptions} CONNECTION_OPTIONS
   * @returns {Connection}
   */
  private injectConnectionOptions(
    connection: Connection,
    CONNECTION_OPTIONS: ConnectionOptions,
  ) : Connection {
    // @ts-ignore
    connection.options = CONNECTION_OPTIONS;
    // @ts-ignore
    connection.manager = connection.createEntityManager();
    // @ts-ignore
    connection.namingStrategy = connection.options.namingStrategy ||
      new DefaultNamingStrategy();
    // @ts-ignore
    connection.relationLoader = new RelationLoader(connection);
    // @ts-ignore
    connection.relationIdLoader = new RelationIdLoader(connection);
    // @ts-ignore
    connection.buildMetadatas();

    return connection;
  }
}
