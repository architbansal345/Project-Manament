"use client"
import React, { useState, useRef, useEffect } from 'react';
import UserProfile from '@/components/formComponent';

interface UserProfileRef {
  handleSubmit: () => Promise<boolean>;
}

const Profile = () => {
  const [isEditable, setIsEditable] = useState(false);
  const [profileData, setProfileData] = useState(null);

  const userProfileRef = useRef<UserProfileRef | null>(null);

  useEffect(() => {
    setProfileData({
      username: 'john_doe',
      email: 'john@example.com',
      phone: '123-456-7890',
    });
  }, []);

  const handleEditClick = () => {
    setIsEditable(true);
  };

  const handleSaveClick = async () => {
    if (userProfileRef.current) {
      const isSaved = await userProfileRef.current.handleSubmit();
      if (isSaved) {
        console.log('Form data saved');
        setIsEditable(false);
      } else {
        console.log('Form validation failed');
      }
    } else {
      console.log('UserProfile component is not yet rendered');
    }
  };

  return (
    <div>
      <h1>Profile</h1>

      {isEditable ? (
        <UserProfile
          ref={userProfileRef}
          profileData={profileData}
        />
      ) : (
        <div>
          <p><strong>Username:</strong> {profileData?.username}</p>
          <p><strong>Email:</strong> {profileData?.email}</p>
          <p><strong>Phone:</strong> {profileData?.phone}</p>
          <button onClick={handleEditClick}>Edit</button>
        </div>
      )}

      {isEditable && <button onClick={handleSaveClick}>Save</button>}
    </div>
  );
};

export default Profile;
