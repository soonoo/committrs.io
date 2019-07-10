import React from 'react';
import RepoItem from 'components/RepoItem';
import ContentLoader from 'react-content-loader';

const RepoList = React.memo(({ repos, fetchCommits, userId, commits, userName }) => {
  const reposCount = repos ? repos.length : 0;
  const commitsCount = repos ? repos.reduce(((acc, cur) => acc + cur.totalCommits), 0) : 0;
  const className = 'contributions';

  return repos ? 
    <div className={className}>
      <div>Found total {commitsCount} commits in {reposCount} repositories</div>
      <div className='repo-container'>
        {repos.map((repo) => (
          <RepoItem
            key={repo.id}
            fetchCommits={fetchCommits}
            userId={userId}
            commits={commits}
            userName={userName}
            {...repo} 
          />
        ))} 
      </div>
    </div> : 
    <ContentLoader width='900' height='420' className={className}>
      <rect y='100' width='900' height='25' />
      <rect y='135' width='650' height='25' />
      <rect y='205' width='900' height='25' />
      <rect y='240' width='650' height='25' />
      <rect y='310' width='900' height='25' />
      <rect y='345' width='650' height='25' />
    </ContentLoader>;
});

export default RepoList;

