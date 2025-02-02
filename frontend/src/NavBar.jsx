import React from 'react'

// here we are going to navigate the pages from the one of the path to the another path
// Just need to give the link and do route it from the App.jsx
// get the NavBar.jsx into the Home page and and direct it from there, accordingly
export default function NavBar() {
  return (
    <div>
        <div>
        <nav class="bg-blue-500 p-4">
    <ul class="flex space-x-6">
      <li><a href="/home" class="text-white hover:text-gray-300 font-semibold">Home</a></li>
      <li><a href="#" class="text-white hover:text-gray-300 font-semibold">About</a></li>
      <li><a href="#" class="text-white hover:text-gray-300 font-semibold">Services</a></li>
      <li><a href="#" class="text-white hover:text-gray-300 font-semibold">Portfolio</a></li>
      <li><a href="#" class="text-white hover:text-gray-300 font-semibold">Contact</a></li>
    </ul>
  </nav>
        </div>
      
    </div>
  )
}
