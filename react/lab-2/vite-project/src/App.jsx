import React from 'react';
import UsersList from './components/UsersList';
import TodoApp from './components/todo/TodoApp';
import './App.css';

function App() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300 py-10">
      <div className="container mx-auto px-4 space-y-16">
        {/* Section 1: Users Dashboard */}
        <section>
          <UsersList />
        </section>

        <hr className="border-muted mx-auto w-1/2" />

        {/* Section 2: To-Do App */}
        <section>
          <TodoApp />
        </section>
      </div>
    </main>
  );
}

export default App;
