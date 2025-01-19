import React, { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2"; 
import { Button, Card, CardBody, CardHeader, Chip, Input, Typography } from "@material-tailwind/react";
import { FaSearch, FaUserShield, FaUserSlash } from "react-icons/fa"; 
import useAxiosSecure from "../../../hook/useAxiosSecure"; 
import { AuthContext } from './../../../provider/AuthProvider';

const ViewAllUsers = () => {
  const [users, setUsers] = useState([]); 
  const [searchTerm, setSearchTerm] = useState(""); 
  const axiosSecure = useAxiosSecure(); 
  const { user } = useContext(AuthContext);
  const userEmail = user.email; 

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosSecure.get("/users"); 
        setUsers(response.data)
      } catch (error) {
        console.error("Error fetching users:", error); 
      }
    };

    fetchUsers(); 
  }, [axiosSecure]); 

  const handleRoleUpdate = async (userId, currentRole) => {
    const actionMessage =
      currentRole === "admin"
        ? "Are you sure you want to remove admin privileges?"
        : "Are you sure you want to make this user an admin?";

    const result = await Swal.fire({
      title: "Confirm Action",
      text: actionMessage,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    });

    if (result.isConfirmed) {
      const newRole = currentRole === "admin" ? "student" : "admin";

      try {
        await axiosSecure.patch(`/users/${userId}/role`, {
          role: newRole,
        });

        const updatedUsers = users.map((u) =>
          u._id === userId ? { ...u, role: newRole } : u
        );
        setUsers(updatedUsers);

        Swal.fire({
          title: "Success",
          text: `User role has been updated to ${newRole}.`,
          icon: "success",
          confirmButtonText: "OK",
        });
      } catch (error) {
        console.error("Error updating role:", error);
        Swal.fire({
          title: "Error",
          text: "There was an issue updating the user role. Please try again.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="px-6 py-4 bg-gray-50 min-h-screen">
      <Card className="h-full w-full shadow-lg">
        <CardHeader floated={false} shadow={false} className="bg-white rounded-none">
          <div className="mb-4 flex justify-between items-center">
            <div>
              <Typography variant="h5" color="blue-gray">
                User List
              </Typography>
              <Typography color="gray" className="mt-1 text-sm font-normal">
                All registered users and their details.
              </Typography>
            </div>
            <div className="relative w-80">
              <Input
                label="Search Users"
                icon={<FaSearch className="h-5 w-5 text-gray-500" />}
                className="pr-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardBody className="overflow-scroll p-0">
          <table className="w-full table-auto text-left">
            <thead className="bg-blue-gray-50 text-sm text-gray-500">
              <tr>
                <th className="px-4 py-2">#</th>
                <th className="px-4 py-2">Image</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Role</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {filteredUsers.map((user, index) => (
                <tr key={user.id || index} className="border-b hover:bg-gray-100">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">
                    <img
                      src={user.userImg}
                      alt={user.name}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  </td>
                  <td className="px-4 py-2">{user.name}</td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2">
                    <Chip
                      size="sm"
                      variant="ghost"
                      value={user.role}
                      color={
                        user.role === "admin"
                          ? "red"
                          : user.role === "tutor"
                          ? "green"
                          : "blue"
                      }
                    />
                  </td>
                  <td className="px-4 py-2">
                    <Button
                      size="sm"
                      className={`flex items-center gap-2 ${
                        user.role === "admin"
                          ? "bg-red-500 hover:bg-red-600"
                          : "bg-indigo-500 hover:bg-indigo-600"
                      } text-white shadow-md`}
                      onClick={() => handleRoleUpdate(user._id, user.role)}
                      disabled={user.email === userEmail} // Disable button if user's email matches logged-in user's email
                    >
                      {user.role === "admin" ? (
                        <FaUserSlash />
                      ) : (
                        <FaUserShield />
                      )}
                      {user.role === "admin" ? "Remove Admin" : "Make Admin"}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  );
};

export default ViewAllUsers;
