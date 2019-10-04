import Sequelize from 'sequelize';
import sequelize from '../';

const uniqueIndexName = 'repo_unique_key';
const Repo = sequelize.define('repo', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: uniqueIndexName,
  },
  owner: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: uniqueIndexName,
  },
  starsCount: {
    type: Sequelize.INTEGER,
  },
  description: {
    type: Sequelize.STRING,
  },
  languages: {
    type: Sequelize.STRING,
  },
});

export default Repo;

