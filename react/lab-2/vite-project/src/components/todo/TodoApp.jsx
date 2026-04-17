import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import TodoForm from './TodoForm';
import TodoList from './TodoList';

const TodoApp = () => {
  // Initialize state from local storage or use defaults
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem('iti-todos');
    if (saved) return JSON.parse(saved);
    return [
      { id: 1, text: "Learn React Hooks", completed: true },
      { id: 2, text: "Build a Todo App", completed: false }
    ];
  });

  // Persist state changes to local storage
  useEffect(() => {
    localStorage.setItem('iti-todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(),
      text,
      completed: false
    };
    setTodos([newTodo, ...todos]);
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  return (
    <div className="max-w-2xl mx-auto p-4 md:p-8">
      <Card className="border-none shadow-2xl bg-card/60 backdrop-blur-md overflow-hidden rounded-3xl border border-white/20">
        <CardHeader className="bg-primary p-8 text-center text-primary-foreground">
          <CardTitle className="text-4xl font-black uppercase tracking-tight">
            To-Do App!
          </CardTitle>
          <p className="opacity-80 mt-2 font-medium">Elevate your productivity</p>
        </CardHeader>
        
        <CardContent className="p-8">
          <TodoForm onAdd={addTodo} />
          
          <div className="space-y-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              Let's get some work done!
            </h2>
            <TodoList 
              todos={todos} 
              onToggle={toggleTodo} 
              onDelete={deleteTodo} 
            />
          </div>
        </CardContent>
        
        <div className="p-4 bg-muted/30 text-center text-xs text-muted-foreground border-t">
          Proudly powered by ITI & React
        </div>
      </Card>
    </div>
  );
};

export default TodoApp;
