import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const useUserProfile = () => {
  const { userName } = useParams();
  const user = useSelector(state => state.user.profiles.find(user => user.github_login === userName)) || {};

  return user;
};

export default useUserProfile;

