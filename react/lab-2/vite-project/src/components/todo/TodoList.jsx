import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ todos, onToggle, onDelete }) => {
  if (todos.length === 0) {
    return (
      <div className="text-center py-10 border-2 border-dashed rounded-2xl bg-muted/5">
        <p className="text-muted-foreground text-lg italic">No tasks yet. Start by adding one!</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-3 max-h-[500px] overflow-y-auto pr-2 scrollbar-thin">
      {todos.map((todo) => (
        <TodoItem 
          key={todo.id} 
          todo={todo} 
          onToggle={onToggle} 
          onDelete={onDelete} 
        />
      ))}
    </div>
  );
};

export default TodoList;
