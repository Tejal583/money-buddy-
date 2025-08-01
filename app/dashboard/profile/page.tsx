"use client";

import { useState, useEffect } from "react";
import { auth } from "@/lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const ProfilePage = () => {
  const [user, loading, error] = useAuthState(auth);
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        const userId = user.uid;
        try {
          const response = await fetch(`/api/users/${userId}`, {
            headers: {
              Authorization: userId,
            },
          });
          if (response.ok) {
            const data = await response.json();
            setDisplayName(data.name || "");
            setEmail(data.email || "");
          } else {
            console.error("Failed to fetch profile:", response.status);
          }
        } catch (error) {
          console.error("Error fetching profile:", error);
        }
      }
    };

    fetchProfile();
  }, [user]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (!user) {
    return <p>Please login to view your profile.</p>;
  }

  const handleUpdateProfile = async () => {
    try {
      if (user) {
        const userId = user.uid;
        const response = await fetch(`/api/users/${userId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: userId,
          },
          body: JSON.stringify({ name: displayName, email: email }),
        });

        if (response.ok) {
          alert("Profile updated successfully!");
        } else {
          console.error("Failed to update profile:", response.status);
          alert("Failed to update profile");
        }
      }
    } catch (error: any) {
      alert("Error updating profile: " + error.message);
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="displayName"
        >
          Display Name:
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="displayName"
          type="text"
          placeholder="Display Name"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="email"
        >
          Email:
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled
        />
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="button"
        onClick={handleUpdateProfile}
      >
        Update Profile
      </button>
    </div>
  );
};

export default ProfilePage;
