import React from 'react';
import RepoItem from 'components/RepoItem';
import ContentLoader from 'react-content-loader';

const RepoList = React.memo(({ repos, fetchCommits, userId, commits  }) => {
  return repos ? 
    <div className='repo-container'>
        {repos.map((repo) => (
          <RepoItem
            key={repo.id}
            fetchCommits={fetchCommits}
            userId={userId}
            commits={commits}
            {...repo} 
          />
        ))} 
    </div> : 
    <ContentLoader width='900' height='420' className='repo-container'>
      <rect y='100' width='900' height='25' />
      <rect y='135' width='650' height='25' />
      <rect y='205' width='900' height='25' />
      <rect y='240' width='650' height='25' />
      <rect y='310' width='900' height='25' />
      <rect y='345' width='650' height='25' />
    </ContentLoader>;
});

export default RepoList;

