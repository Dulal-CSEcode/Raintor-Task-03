import React, { useRef, useCallback } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { FixedSizeList as List, ListOnItemsRenderedProps } from 'react-window';
import UserCard, { UserCardProps } from './UserCard';
import './App.css';

const PAGE_SIZE = 10;

async function fetchUsers({ pageParam = 0 }) {
  const res = await fetch(
    `https://tech-test.raintor.com/api/users/GetUsersList?take=${PAGE_SIZE}&skip=${pageParam}`
  );
  if (!res.ok) throw new Error('Failed to fetch users');
  return res.json();
}

function SkeletonCard() {
  return (
    <div className="user-card skeleton" aria-busy="true" style={{ display: 'flex', alignItems: 'center', gap: 16, padding: 16, border: '1px solid #eee', borderRadius: 8, marginBottom: 12, background: '#f6f6f6' }}>
      <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#ddd' }} />
      <div style={{ flex: 1 }}>
        <div style={{ width: '40%', height: 20, background: '#ddd', marginBottom: 8, borderRadius: 4 }} />
        <div style={{ width: '60%', height: 16, background: '#eee', marginBottom: 6, borderRadius: 4 }} />
        <div style={{ width: '50%', height: 14, background: '#eee', marginBottom: 6, borderRadius: 4 }} />
        <div style={{ width: '30%', height: 14, background: '#eee', borderRadius: 4 }} />
      </div>
    </div>
  );
}

const ErrorFallback = ({ error, resetErrorBoundary }: { error: Error, resetErrorBoundary: () => void }) => (
  <div role="alert" style={{ color: 'red', padding: 24 }}>
    <p>Something went wrong: {error.message}</p>
    <button onClick={resetErrorBoundary}>Try again</button>
  </div>
);

const App: React.FC = () => {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    refetch,
  } = useInfiniteQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
    getNextPageParam: (lastPage, allPages) => {
      const loaded = allPages.reduce((acc, page) => acc + page.users.length, 0);
      return loaded < lastPage.total ? loaded : undefined;
    },
    refetchOnWindowFocus: false,
  });

  // Flatten users
  const users: UserCardProps[] = data ? data.pages.flatMap((page) => page.users) : [];
  const total = data?.pages[0]?.total || 0;

  // Infinite scroll observer
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isFetchingNextPage) return;
      if (observerRef.current) observerRef.current.disconnect();
      observerRef.current = new window.IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });
      if (node) observerRef.current.observe(node);
    },
    [isFetchingNextPage, fetchNextPage, hasNextPage]
  );

  // Virtualized row renderer
  const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => {
    if (index >= users.length) {
      return (
        <div style={style} ref={loadMoreRef} tabIndex={-1} aria-label="Loading more users">
          <SkeletonCard />
        </div>
      );
    }
    const user = users[index];
    return (
      <div style={style} tabIndex={0} aria-label={`User card for ${user.firstName} ${user.lastName}`}>
        <UserCard {...user} />
      </div>
    );
  };

  if (isLoading) {
    return (
      <main style={{ maxWidth: 600, margin: '40px auto' }}>
        {[...Array(PAGE_SIZE)].map((_, i) => <SkeletonCard key={i} />)}
      </main>
    );
  }

  if (isError && error instanceof Error) {
    return <ErrorFallback error={error} resetErrorBoundary={refetch} />;
  }

  return (
    <main style={{ maxWidth: 600, margin: '40px auto' }}>
      <h1 style={{ textAlign: 'center' }}>User Feed</h1>
      <List
        height={600}
        itemCount={hasNextPage ? users.length + 1 : users.length}
        itemSize={120}
        width={600}
        overscanCount={3}
        role="list"
        aria-label="User list"
      >
        {Row}
      </List>
      {isFetchingNextPage && (
        <div style={{ margin: 16 }}><SkeletonCard /></div>
      )}
      {!hasNextPage && users.length === 0 && (
        <div style={{ textAlign: 'center', margin: 32 }}>No users found.</div>
      )}
    </main>
  );
};

export default App;
