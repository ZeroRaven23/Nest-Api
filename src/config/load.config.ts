export const LoadConfig = () => ({
  port: parseInt(process.env.PORT, 10) || 3001,
  database: {
    type: 'mysql',
    host: process.env.MYSQL_HOST,
    port: parseInt(process.env.MYSQL_PORT, 10) || 3306,
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    entities: ['dist/src/core/**/*.entity.js', 'src/core/*.entity.ts'],
    // synchronize:  true,
  },
});
