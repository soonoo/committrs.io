import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CommitItem from 'components/CommitItem';
import OwnerBadge from 'components/OwnerBadge';
import colors from 'constants/githubLanguageColors';
import { fetchCommitsRequest } from 'store/actions/commits';

import './RepoItem.css';

const getShortCount = (number) => {
  if(number < 1000) return number.toString();
  else return `${parseInt(number/1000)}k`;
};

const RepoItem = ({ owner, name, id: repoId, totalCommits, starsCount, description, languages }) => {
  const dispatch = useDispatch();
  const [listVisibility, setListVisibility] = useState(false);
  const { id: userId, github_login: userName } = useSelector(state => state.user);
  const repoPath = `${owner}/${name}`;
  const dataKey = `${userId}/${repoId}`;
  const data = useSelector(state => state.commits[dataKey]) || [];
  const isOwner = owner === userName;

  const onRepoClick = () => {
    if(!listVisibility) {
      dispatch(fetchCommitsRequest(userId, repoId));
    }
    setListVisibility(!listVisibility)
  };

  const repoClassName = 'repo ' + (listVisibility ? 'visible' : '');
  return (
    <div className={repoClassName}>
      <div className='repo-title' onClick={onRepoClick}>{repoPath}</div>
      <div>
        {languages.split(',').slice(0, 4).map((lang) => {
          if(!lang) return null;
          const background = colors[lang] ? colors[lang]['color'] : '';
          return <span className='langCircleWrap'><span className='langCircle' style={{ background }}></span>{lang}</span>
        })}
      </div>
      <div className='repo-desc'>{getShortCount(starsCount)}⭐ | {description}</div>
      <div>{isOwner && <OwnerBadge />}</div>
      <div className='repo-commits-count'>{`${totalCommits} commits`}</div>
      {listVisibility &&
        <div className='commit-container'>
          <div>
            {data.length ? data.map((commit) => {
              commit.repoPath = repoPath;
              return <CommitItem key={commit.hash} commitInfo={commit} />;
            }) : 'Loading ...'}
          </div>
        </div>
      }
    </div>
  );
};

export default RepoItem;

