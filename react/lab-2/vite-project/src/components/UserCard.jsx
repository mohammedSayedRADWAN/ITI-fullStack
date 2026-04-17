import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const UserCard = ({ user }) => {
  const { name, username, email, phone, birthdate, role, avatar } = user;

  const getRoleColor = (role) => {
    switch (role.toLowerCase()) {
      case 'admin':
        return 'bg-red-500 hover:bg-red-600 text-white';
      case 'moderator':
        return 'bg-yellow-500 hover:bg-yellow-600 text-white';
      case 'user':
        return 'bg-green-500 hover:bg-green-600 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  return (
    <Card className="flex flex-col items-center p-6 text-center shadow-md hover:shadow-lg transition-shadow bg-card/50 backdrop-blur-sm border-muted">
      <Avatar className="w-24 h-24 mb-4 border-4 border-muted">
        <AvatarImage src={avatar} alt={name} />
        <AvatarFallback>{name.charAt(0)}</AvatarFallback>
      </Avatar>
      
      <Badge className={`${getRoleColor(role)} mb-4 px-4 py-1 uppercase tracking-wider text-xs font-bold rounded-md`}>
        {role}
      </Badge>

      <div className="space-y-2 w-full">
        <h3 className="text-xl font-bold text-foreground">{username}</h3>
        <p className="text-sm text-muted-foreground break-all">{email}</p>
        <p className="text-sm font-medium text-foreground/80">{phone}</p>
        <p className="text-sm font-medium text-foreground/80">{birthdate}</p>
      </div>
    </Card>
  );
};

export default UserCard;
