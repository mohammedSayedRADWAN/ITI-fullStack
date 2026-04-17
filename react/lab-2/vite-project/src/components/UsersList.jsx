import React, { useState, useMemo } from 'react';
import UserCard from './UserCard';
import usersData from '../data/users.json';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const UsersList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState(usersData);

  const handleSearch = () => {
    const query = searchQuery.toLowerCase();
    const filtered = usersData.filter(user => 
      user.username.toLowerCase().includes(query) || 
      user.email.toLowerCase().includes(query)
    );
    setFilteredData(filtered);
  };

  // Allow live search or search on button click
  // Here we use the button for the "Search" action as per the image
  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
    // If you want live search, uncomment line below:
    // filterUsers(e.target.value);
  };

  return (
    <div className="max-w-6xl mx-auto p-8 space-y-8 min-h-screen bg-transparent">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-6">
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground">
          Users
        </h1>
        <div className="flex w-full md:w-96 items-center space-x-2">
          <Input 
            type="text" 
            placeholder="Search by email or username..." 
            value={searchQuery}
            onChange={handleInputChange}
            className="h-11 bg-background/50 border-muted focus-visible:ring-primary"
          />
          <Button onClick={handleSearch} className="h-11 px-6 bg-[#006064] hover:bg-[#004d40] text-white">
            Search
          </Button>
        </div>
      </div>

      {filteredData.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredData.map(user => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-muted/20 rounded-xl border border-dashed border-muted">
          <p className="text-xl text-muted-foreground">No users found matching your search.</p>
        </div>
      )}
    </div>
  );
};

export default UsersList;
