import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('notes_db', 'postgres', 'postgres', {
  host: 'localhost',
  dialect: 'postgres',
});

export default sequelize;
