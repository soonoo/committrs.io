import User from '../../db/model/User';
import SyncStatus from '../../db/model/SyncStatus';

export const updateUser = async (body) => {
  return await User.update({ ...body }, { where: { id: body.id } });
};

export const createUser = async (body) => {
  const syncStatus = await SyncStatus.findOne({ where: { name: 'ADDED' } });
  const syncStatusId = syncStatus ? syncStatus.dataValues.id : null;

  return await User.create({
    ...body,
    syncStatusId,
  });
};

export const findUser = async (github_login) => {
  if(typeof github_login !== 'string') return null;

  return await User.findOne({
    where: {
      github_login,
    },
  });
}

