import React, { useEffect, useState } from "react";
import { useAuth } from "../auth/authContext"; // Import the useAuth hook

interface User {
  id: string;
  email: string;
  user_role: string;
  subscription_tier?: string;
  payment_info?: string;
}

function AdminPanel() {
  const { user: loggedInUser } = useAuth(); // Get the logged-in user's info from AuthContext
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [tempInputValues, setTempInputValues] = useState<Partial<User> | null>(
    null
  );

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/users");
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      }
    };

    fetchUsers();
  }, []);

  const handleEdit = (user: User) => {
    setEditingUserId(user.id);
    setTempInputValues({ ...user }); // Initialize local state with the user's current values
  };

  const handleDelete = async (id: string) => {
    if (loggedInUser?.id === id) {
      alert("You cannot delete your own account.");
      return; // Exit the function
    }

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (!confirmDelete) {
      return; // Exit if the user cancels the action
    }

    try {
      const response = await fetch(`/api/users/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete user");
      }

      // Remove the deleted user from the state
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    }
  };

  const handleInputChange = (field: keyof User, value: string) => {
    if (tempInputValues) {
      setTempInputValues({ ...tempInputValues, [field]: value });
    }
  };

  const handleSave = async (id: string) => {
    try {
      console.log("Saving user:", tempInputValues); // Log the data being sent to the backend
      const response = await fetch(`/api/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tempInputValues),
      });

      if (!response.ok) {
        throw new Error("Failed to update user");
      }

      const updatedUserFromServer = await response.json();
      setUsers((prevUsers) =>
        prevUsers.map((user) => (user.id === id ? updatedUserFromServer : user))
      );

      setEditingUserId(null);
      setTempInputValues(null); // Clear the local state
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    }
  };

  const handleCancel = () => {
    setEditingUserId(null);
    setTempInputValues(null); // Clear the local state
  };

  return (
    <div>
      <h1>Admin Panel</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Role</th>
            <th>Subscription Tier</th>
            <th>Payment Info</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              {editingUserId === user.id ? (
                <>
                  <td>{user.id}</td>
                  <td>
                    <input
                      type="text"
                      value={tempInputValues?.email || ""}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={tempInputValues?.user_role || ""}
                      onChange={(e) =>
                        handleInputChange("user_role", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={tempInputValues?.subscription_tier || ""}
                      onChange={(e) =>
                        handleInputChange("subscription_tier", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={tempInputValues?.payment_info || ""}
                      onChange={(e) =>
                        handleInputChange("payment_info", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <button onClick={() => handleSave(user.id)}>Save</button>
                    <button onClick={handleCancel}>Cancel</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{user.id}</td>
                  <td>{user.email}</td>
                  <td>{user.user_role}</td>
                  <td>
                    {user.subscription_tier ? user.subscription_tier : "N/A"}
                  </td>
                  <td>{user.payment_info ? user.payment_info : "N/A"}</td>
                  <td>
                    <button onClick={() => handleEdit(user)}>Edit</button>
                    <button onClick={() => handleDelete(user.id)}>
                      Delete
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminPanel;
