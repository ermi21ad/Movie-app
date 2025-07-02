# 🎬 Movie App

A modern, responsive movie browser built with **Vite + React**, using the [OMDb API](https://www.omdbapi.com/) to search and display movies. Styled with **Material-UI (MUI)**.

Live Demo: 👉 [https://ermi-movie.netlify.app](https://ermi-movie.netlify.app)

---

## 📸 Preview

![Movie App Screenshot](public/movie-icon.webp)

---

## ✨ Features

- 🔍 Search movies by title
- ⭐ Mark movies as favorites
- 🎭 Filter by year, type, and rating
- 💡 Light/Dark mode toggle
- 🎬 View detailed movie info in a modal
- 🎨 Beautiful UI with Material-UI
- ⚡️ Fast build using Vite

---

## 🚀 Technologies Used

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Material-UI](https://mui.com/)
- [OMDb API](https://www.omdbapi.com/)
- [Framer Motion](https://www.framer.com/motion/)

---

## 🛠️ Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm

### Installation

```bash
git clone https://github.com/ermi21ad/Movie-app.git
cd Movie-app/vite-project
npm install

Run Locally
bash
Copy
Edit
npm run dev
Build for Production
bash
Copy
Edit
npm run build
🌐 Deployment
GitHub Pages
Add this to vite.config.js:

js
Copy
Edit
export default defineConfig({
  plugins: [react()],
  base: '/Movie-app/', // your repo name
})
Deploy:

bash
Copy
Edit
npm run build
npm run deploy
Netlify
Build command: npm run build

Publish directory: dist

Branch: master

🔐 Environment Variables
Create a .env file in the root:

env
Copy
Edit
VITE_OMDB_API_KEY=your_api_key_here
Use HTTPS to avoid mixed content issues:
Use: https://www.omdbapi.com/?apikey=...
Not: http://...

🧠 Author
Made with ❤️ by @ermi21ad

```
