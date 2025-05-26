# Cruisebound - Search Results Page

This project is a responsive cruise search results page built with **Next.js**, **React**, and **Tailwind CSS** as part of the Cruisebound Intern Engineer Assessment.

## 🚀 Live Demo
[https://cruise-bond-assignment-ndyw.vercel.app/](https://cruise-bond-assignment-ndyw.vercel.app/)

## 🧰 Tech Stack
- React.js
- Next.js
- Tailwind CSS
- Vercel (deployment)

## ✅ Features
- Display all sailings from the Cruisebound API
- Responsive design
- Show total number of results

## 💎 Extra Features
- Sort by price, departure date, and duration
- Pagination (10 results per page)

## Structure
The project is organized as follows:

```bash
CruiseBond_Assignment
├─ app
│   └─ api
│       └─ sailings
│           └─ route.ts
│   └─ global.css
│   └─ layout.tsx
│   └─ page.tsx 
├─ components
│   └─ cruiseCard.tsx
├─ utils
│  └─ fetchData.ts
├─ types.ts
```

## 📦 Installation

```bash
npm install
npm run dev
