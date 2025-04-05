import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="w-full min-h-screen flex flex-col bg-gray-900 text-white">
      {/* Header */}
      <header className="w-full bg-black bg-opacity-80 py-11 px-6 flex justify-between items-center">
        <div className="text-xl font-bold">Tickefy</div>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search a specific Ticket"
            className="px-4 py-2 rounded-lg bg-gray-800 text-white"
          />
          <Link to="/signup" className="text-green-400">
            Sign up
          </Link>
          <Link to="/login" className="text-green-400">
            Login
          </Link>
          <Link to="/ticketlist" className="text-green-400">
            Ticket List
          </Link>
          <Link to="/cart" className="text-green-400">
            Cart
          </Link>
          <Link to="/support" className="text-green-400">
            Support
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <div
        className="w-full flex flex-col items-center bg-cover bg-center px-4 py-10 relative"
        style={{ backgroundImage: "url('/stadium.jpg')" }}
      >
        {/* Overlay Player Image */}
        <div className="absolute inset-0 flex justify-center items-center">
          <img
            src="/player.png"
            alt="Star Player"
            className="w-full max-w-2xl z-10" // Player at z-10
          />
        </div>

        <div className="relative w-full max-w-6xl flex mt-8 items-start">
          {/* Left Section - Match Title and Fixture Boxes */}
          <div className="w-1/4 flex flex-col space-y-4 pl-10">
            {/* Morocco VS Senegal Title */}
            <h2 className="text-5xl font-bold bg-black bg-opacity-50 p-4 rounded-lg">
              Morocco <span className="text-green-400">VS</span> Senegal
            </h2>

            {/* Fixture Boxes */}
            <div className="bg-black bg-opacity-70 p-4 rounded-xl w-60">
              <h3 className="text-lg font-semibold">Last Fixture</h3>
              <div className="flex items-center space-x-2">
                <span>MOR</span>
                <img src="/morocco-flag.png" alt="Morocco Flag" className="w-6 h-6" />
                <span>1 : 0</span>
                <img src="/benin-flag.png" alt="Benin Flag" className="w-6 h-6" />
                <span>BEN</span>
              </div>
              <Link to="/highlights/last" className="text-green-400 text-sm">
                View Highlights
              </Link>
            </div>
            <div className="bg-black bg-opacity-70 p-4 rounded-xl w-60">
              <h3 className="text-lg font-semibold">Next Fixture</h3>
              <div className="flex items-center space-x-2">
                <span>CAF</span>
                <span>Matchday 22</span>
              </div>
              <Link to="/highlights/next" className="text-green-400 text-sm">
                View Highlights
              </Link>
            </div>
          </div>

          {/* Center Section - Empty (Player Image is in the background) */}
          <div className="w-1/2"></div>

          {/* Right Section - Upcoming Matches and User Profile */}
          <div className="w-1/4 flex flex-col items-end pr-10 space-y-4">
            <div className="flex flex-col w-64 space-y-4">
              
              <div className="bg-black bg-opacity-70 p-4 rounded-xl text-right">
                <div className="flex flex-col items-end space-y-2">
                  <span className="">Morocco vs Algeria</span>
                  <div className="flex justify-end items-center space-x-2">
                    <img src="/moralg.jpeg" alt="moralg" className="w-45 h-45" /> {/* Adjusted size */}
                  </div>
                </div>
                <Link
                  to="/ticketlist"
                  className="mt-2 px-10 py-2 bg-green-400 text-black font-bold rounded-lg"
                >
                  Purchase a ticket
                </Link>
              </div>
              <div className="bg-black bg-opacity-70 p-4 rounded-xl text-right">
                <div className="flex flex-col items-end space-y-2">
                  <span className="">Nigeria vs Benin</span>
                  <div className="flex justify-end items-center space-x-2">
                    <img src="/nigeriabenin.jpg" alt="Benin Flag" className="w-45 h-45" />
                    
                  </div>
                </div>
                <Link
                  to="/ticketlist"
                  className="mt-2 px-10 py-2 bg-green-400 text-black font-bold rounded-lg"
                >
                  Purchase a ticket
                </Link>
              </div>
            </div>

            {/* User Profile */}
            <div className="bg-black bg-opacity-70 p-4 rounded-xl w-64 text-right">
              <div className="flex justify-end items-center space-x-2">
                <span>Mohammed Lahkim</span>
                <div className="w-10 h-10 bg-gray-500 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Ticket Info Section - Shifted slightly to the left */}
        <div className="w-full max-w-6xl flex justify-end mt-10 pr-4 z-20">
          <div className="flex space-x-6 mr-60">
            <div className="bg-black bg-opacity-80 p-6 rounded-xl text-center border border-gray-600 shadow-lg transform transition-transform hover:scale-105">
              <h3 className="text-xl font-semibold mb-2">Ticket Price</h3>
              <p className="text-3xl font-bold">50.999$</p>
            </div>
            <div className="bg-black bg-opacity-80 p-6 rounded-xl text-center border border-gray-600 shadow-lg transform transition-transform hover:scale-105">
              <h3 className="text-xl font-semibold mb-2">Timing</h3>
              <p className="text-3xl font-bold">6:30 pm</p>
            </div>
            <div className="bg-black bg-opacity-80 p-6 rounded-xl text-center border border-gray-600 shadow-lg transform transition-transform hover:scale-105">
              <h3 className="text-xl font-semibold mb-2">Remaining Tickets</h3>
              <p className="text-3xl font-bold">268</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;