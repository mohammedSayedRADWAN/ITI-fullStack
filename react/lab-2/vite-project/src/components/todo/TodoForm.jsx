import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

const TodoForm = ({ onAdd }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text.trim());
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex space-x-2 items-center mb-8">
      <Input
        type="text"
        placeholder="Enter new task..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="h-12 bg-background/50 border-primary/20 focus-visible:ring-primary shadow-sm text-lg"
      />
      <Button 
        type="submit" 
        className="h-12 px-6 bg-primary hover:bg-primary/90 text-primary-foreground font-bold flex gap-2"
        disabled={!text.trim()}
      >
        <PlusCircle className="h-5 w-5" />
        Add
      </Button>
    </form>
  );
};

export default TodoForm;
