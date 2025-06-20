# User Feed Infinite Scroll

This project implements an infinite scroll user feed with real-time API integration, virtualization, and accessibility features.

## Features
- Infinite scroll with paginated API fetching
- Virtualized list for large data sets (`react-window`)
- User cards with accessible keyboard navigation
- Skeleton loader and spinner for loading states
- Error boundary and graceful fallback UI
- Built with React, TypeScript, and React Query

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm start
   ```

## API
- Endpoint: `https://tech-test.raintor.com/api/users/GetUsersList?take=10&skip=0`
- Pagination: `take` (page size), `skip` (offset)

## Accessibility
- User cards are focusable and navigable by keyboard
- Proper ARIA labels and roles for screen readers

## Customization
- Adjust `PAGE_SIZE` in `App.tsx` for different page sizes
- Style user cards in `App.css` and `UserCard.tsx`

---

© 2024 Raintor Tech Test 