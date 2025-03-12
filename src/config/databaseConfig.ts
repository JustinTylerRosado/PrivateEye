// filepath: /c:/Users/ajtho/Project2/Private Eye/src/config/databaseConfig.ts
interface DbConfig {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
}

const dbConfig: DbConfig = {
  host: process.env.REACT_APP_DB_HOST || 'localhost',
  port: Number(process.env.REACT_APP_DB_PORT) || 5000,
  user: process.env.REACT_APP_DB_USER || '//add username//',
  password: process.env.REACT_APP_DB_PASSWORD || '//add password//',
  database: process.env.REACT_APP_DB_NAME || 'privateeye_db',
};

export default dbConfig;