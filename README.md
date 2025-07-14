# ♾️ Infinite Scroll - User Feed

A performant infinite scrolling user feed with React Query and virtualization, featuring smooth loading states and full accessibility support..

[![Live Demo](https://img.shields.io/badge/-View%20Demo-blue?style=for-the-badge&logo=vercel&logoColor=white)](https://your-demo-url.vercel.app)
[![License](https://img.shields.io/badge/license-MIT-green?style=for-the-badge)](LICENSE)

## ✨ Features

- **Infinite Scrolling** - Automatically loads more users on scroll
- **Virtualized List** - Optimized performance with react-window
- **Skeleton Loaders** - Smooth loading experience
- **Error Handling** - Graceful fallback UI
- **Accessibility** - Keyboard nav & ARIA attributes
- **Responsive Design** - Works on all devices

## 🛠 Tech Stack

![React](https://img.shields.io/badge/-React-61DAFB?logo=react&logoColor=white)
![React Query](https://img.shields.io/badge/-React%20Query-FF4154?logo=reactquery&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/-Tailwind%20CSS-06B6D4?logo=tailwindcss&logoColor=white)

- **Core**: React 18
- **State**: React Query (TanStack)
- **Virtualization**: react-window
- **Styling**: Tailwind CSS
- **API**: Axios

## 📂 Project Structure

```bash
src/
├── components/
│   ├── UserCard/           # User profile component
│   │   ├── UserCard.tsx
│   │   ├── UserCardSkeleton.tsx
│   │   └── styles.module.css
│   ├── UserList/           # Infinite scroll logic
│   │   ├── VirtualizedList.tsx
│   │   └── useInfiniteUsers.ts
│   └── ErrorBoundary.tsx   # Error handling
├── hooks/
│   └── useIntersectionObserver.ts
├── services/
│   └── api.ts              # API configuration
├── App.tsx
└── main.tsx
```
## 🚀 Quick Start
Prerequisites
Node.js ≥ v18

npm or yarn

Installation
```bash
git clone https://github.com/yourusername/infinite-scroll-user-feed.git
cd infinite-scroll-user-feed
npm install
```
Running the App
```bash
npm run dev
```
Open http://localhost:3000 in your browser.

## 🔗 API Integration
Endpoint:

```bash
GET https://tech-test.raintor.com/api/users/GetUsersList?take=10&skip=0
```
Sample Response:
```bash
json
{
  "users": [
    {
      "id": 1,
      "firstName": "Emily",
      "lastName": "Johnson",
      "email": "emily.johnson@x.dummyjson.com",
      "phone": "+81 965-431-3024",
      "image": "https://dummyjson.com/icon/emilys/128",
      "university": "University of Wisconsin--Madison",
      "company": {
        "title": "Sales Manager"
      }
    }
  ],
  "total": 208,
  "skip": 0,
  "limit": 10
}
```
## 🧩 Key Components
useInfiniteUsers Hook
```bash
typescript
export const useInfiniteUsers = () => {
  return useInfiniteQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
    getNextPageParam: (lastPage) => {
      const nextSkip = lastPage.skip + lastPage.limit;
      return nextSkip < lastPage.total ? nextSkip : undefined;
    }
  });
};
```
Virtualized List
```bash
<List
  height={600}
  itemCount={itemCount}
  itemSize={120}
  width="100%"
>
  {({ index, style }) => (
    <div style={style}>
      {index === users.length ? (
        <div ref={loadMoreRef}><UserCardSkeleton /></div>
      ) : (
        <UserCard user={users[index]} />
      )}
    </div>
  )}
</List>
```
## 📦 Dependencies
```bash
npm install @tanstack/react-query react-window axios
```
## 🌐 Environment Variables
Create .env file:

```bash
REACT_APP_API_URL=https://tech-test.raintor.com/api
```
## 🖼 Screenshots
Loading State	Active Feed
https://loading-state.png	https://active-feed.png
## 🛠️ Advanced Features
Retry Logic: Exponential backoff for failed requests

Search: Filter users by name/email

Tests: Jest + React Testing Library

Error Boundaries: Component-level error handling

## 📄 License
MIT License © 2025 [MD Dulal Hossain]
