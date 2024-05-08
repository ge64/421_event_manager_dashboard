// components/UserMgmtDashboard.tsx
'use client'
import { useState } from 'react';
import { VStack, Heading } from '@chakra-ui/react';
import UserForm from './UserForm';
import UserList from './UserList';

const UserDashboard = ({ initialUsers }) => {
    const [users, setUsers] = useState(initialUsers || []);
    const [editUser, setEditUser] = useState(null);

    // Save or update user
    const handleSave = async (formData) => {
        const method = editUser ? 'PUT' : 'POST';
        const url = editUser ? `http://localhost:8000/api/users/${editUser.id}` : `http://localhost:8000/api/users/`;

        try {
            const res = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.JWT_TOKEN}`
                },
                body: JSON.stringify(formData)
            });

            if (!res.ok) throw new Error('Failed to save the user.');

            const newUser = await res.json();
            if (editUser) {
                setUsers(users.map(user => user.id === editUser.id ? newUser : user));
            } else {
                setUsers([...users, newUser]);
            }

            setEditUser(null);
        } catch (error) {
            console.error('Error saving user:', error.message);
        }
    };

    // Delete user
    const handleDelete = async (userId) => {
        try {
            const res = await fetch(`http://localhost:8000/api/users/${userId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${process.env.JWT_TOKEN}`
                }
            });
            if (!res.ok) throw new Error('Failed to delete the user.');

            setUsers(users.filter(user => user.id !== userId));
        } catch (error) {
            console.error('Error deleting user:', error.message);
        }
    };

    // Edit user function definition
    const handleEdit = (user) => {
        setEditUser(user);
    };

    return (
        <VStack spacing={4}>
            <Heading>User Management Dashboard</Heading>
            <UserForm onSave={handleSave} initialData={editUser || {}} />
            <UserList users={users} onEdit={handleEdit} onDelete={handleDelete} />
        </VStack>
    );
};

export default UserDashboard;
