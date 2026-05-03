# ITI Movie App - Lab 2 (React + Material UI)

Welcome to the Movie App project! This is a beginner-friendly React application designed to teach you the fundamentals of React hooks, API fetching, and styling with Material UI (MUI).

## 📁 Folder Structure

```text
lab2/
├── public/                 # Static files (HTML)
│   └── index.html          # The entry HTML file
├── src/                    # Source code
│   ├── components/         # Reusable UI components
│   │   ├── Footer.jsx      # Custom Footer component
│   │   ├── MovieCard.jsx   # Individual movie card display
│   │   └── MovieList.jsx   # Data fetching and grid layout
│   ├── App.jsx             # Main application layout
│   └── index.jsx           # Entry point for React
├── package.json            # Project dependencies and scripts
└── README.md               # This documentation
```

## 🚀 How to Run the Project

1. **Open the terminal** in the `lab2` directory.
2. **Install dependencies**:
   ```bash
   npm install --legacy-peer-deps
   ```
3. **Add your API Key**:
   Open `src/components/MovieList.jsx` and replace `YOUR_TMDB_API_KEY_HERE` with your actual TMDB API key.
   *Note: You can get one for free at [themoviedb.org](https://www.themoviedb.org/).*
4. **Start the app**:
   ```bash
   npm run dev
   ```

## 🎓 Learning Objectives

1. **State Management**: Using `useState` to track movies, loading progress, and errors.
2. **Side Effects**: Using `useEffect` to fetch data when the page first loads.
3. **Props**: Passing data from `MovieList` down to `MovieCard`.
4. **MUI Components**: Utilizing `Container`, `Grid`, `Card`, and `Typography` for a professional layout.
5. **Conditional Rendering**: Displaying different UI elements based on the application state (Loading vs Error vs Data).

## 📝 Design Principles
- **Clarity**: Simple code over complex abstractions.
- **Organization**: Small, focused components.
- **Feedback**: Providing users with loading indicators and error messages.

Happy Coding!
