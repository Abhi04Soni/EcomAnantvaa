import React from 'react';

const Addresses = () => {

    const handleAddAddress = () => {
      // Add address logic here
    };

    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-[rgb(82,52,26)]">Saved Addresses</h2>
        <div className="space-y-4">
          <div className="border p-4 rounded-md shadow-sm text-black">
            <p className="font-semibold">John Doe</p>
            <p>123 Main Street</p>
            <p>New Delhi, India</p>
            <p>ZIP: 110001</p>
          </div>
          
          <button className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition" onClick={handleAddAddress}>Add New Address</button>
        </div>
      </div>
    );
  };
  
  export default Addresses;
  