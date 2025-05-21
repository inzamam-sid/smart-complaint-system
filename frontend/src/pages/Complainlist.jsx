// src/pages/Complainlist.jsx
import React from 'react';

const Complainlist = () => {
  const complaints = [
    { id: 1, title: "Broken streetlight on Main St of the hostel" },
    { id: 2, title: "Water leakage in building lobby of the main hostel" },
    { id: 3, title: "Ac of the room not working properly" },
    { id: 4, title: "Someone broke the window of my room" },
    { id: 5, title: "Two groups stared figthing" },
    { id: 6, title: "there are unabilibty of the books of dept. of CSE" },
    { id: 7, title: "There are no one at the counter of issue/return desks" },
    { id: 8, title: "There are a lot of random guys who are not the part of our college but still they enterd" },
    { id: 9, title: "xyz" },
    { id: 10, title: "dfkjvhs" },
  ];

  return (
    <div className="bg-gray-100 min-h-screen p-8 pt-12 text-center">
      <h1 className="text-4xl font-bold text-blue-800 mb-4">
        Complaint List
      </h1>

      <ul className="max-w-xl mx-auto list-disc list-inside space-y-2 text-left">
        {complaints.map(complain => (
          <li key={complain.id} className="text-gray-800">
            {complain.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Complainlist;
