import React from 'react';

const Register = () => {
  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow bg-white">
      <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
      <form className="space-y-4">
        <div className='mb-4'>
          <label className="block text-sm font-medium text-gray-700">Username</label>
          <input type="text" placeholder='Enetr your Username' name="username" className="w-full p-2 border border-gray-300 rounded" />
        </div>
        <div className='mb-4'>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input type="email"placeholder='Enetr your email' name="email" className=" w-full p-2 border border-gray-300 rounded" />
        </div>
        <div className='mb-4'>
          <label className="block mb-1">Password</label>
          <input type="password" placeholder="Entyer your password" name="password" className="w-full p-2 border rounded" />
        </div>
        <div className='mb-4'>
          <label className="block mb-1">Re-Enter-Password</label>
          <input type="password" placeholder="Entyer your password" name="password" className="w-full p-2 border rounded" />
        </div>
         <div className='mb-4'>
            <label className="block mb-1">Phoneno</label>
          <input type="password" placeholder="Entyer your PhoneNo" name="password" className="w-full p-2 border rounded" />
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;

