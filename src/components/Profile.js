// Profile.js
import React, { useState } from 'react';
import './Profile.css';

function Profile() {
  const [selectedMenu, setSelectedMenu] = useState('profileManagement');

  const handleMenuClick = (menu) => {
    setSelectedMenu(menu);
  };

  // Dummy user data
  const userData = {
    email: "project1@example.com",
    projectNumber: "123456",
    projectLocation: "Lilongwe, Malawi",
  };

  return (
    <div>
      <h1>User Profile</h1>
      <div className="navbar">
        <button
          className={selectedMenu === 'profileManagement' ? 'active' : ''}
          onClick={() => handleMenuClick('profileManagement')}
        >
          Profile Management
        </button>
        <button
          className={selectedMenu === 'showProject' ? 'active' : ''}
          onClick={() => handleMenuClick('showProject')}
        >
          Show Project
        </button>
      </div>
      <div className="profile-container">
        <div className="profile-info">
          {selectedMenu === 'profileManagement' && (
            <>
              <h2>Email:</h2>
              <p>{userData.email}</p>
            </>
          )}
          {selectedMenu === 'showProject' && (
            <>
              <h2>Project Number:</h2>
              <p>{userData.projectNumber}</p>
              <h2>Project Location:</h2>
              <p>{userData.projectLocation}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
