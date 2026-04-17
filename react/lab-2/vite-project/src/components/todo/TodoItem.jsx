import React from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

const TodoItem = ({ todo, onToggle, onDelete }) => {
  return (
    <div className="flex items-center justify-between p-4 bg-card/40 backdrop-blur-sm border rounded-xl group transition-all hover:border-primary/50 shadow-sm">
      <div className="flex items-center space-x-4 flex-1">
        <Checkbox 
          id={`todo-${todo.id}`} 
          checked={todo.completed} 
          onCheckedChange={() => onToggle(todo.id)}
          className="h-6 w-6 border-2"
        />
        <label
          htmlFor={`todo-${todo.id}`}
          className={cn(
            "text-lg font-medium transition-all duration-300 cursor-pointer select-none",
            todo.completed ? "text-muted-foreground line-through decoration-2" : "text-foreground"
          )}
        >
          {todo.text}
        </label>
      </div>
      
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onDelete(todo.id)}
        className="opacity-0 group-hover:opacity-100 text-destructive hover:bg-destructive/10 hover:text-destructive transition-all"
      >
        <Trash2 className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default TodoItem;
