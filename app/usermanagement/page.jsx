import { Heading, Image } from '@chakra-ui/react';
import UserDashboard from '../components/UserMgmtDashboard';

const fetchUsers = async () => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
            headers: {
                'Authorization': `Bearer ${process.env.JWT_TOKEN}`
            }
        });
        if (!res.ok) throw new Error('Failed to fetch users.');
        return res.json();
    } catch (error) {
        console.error('Error fetching users:', error.message);
        return [];
    }
};

export default async function AdminPage() {
    const users = await fetchUsers();

    return (
        <>
            {/* Banner Section */}
            <Image
                src="/banner.jpg" // Adjust to your banner image URL
                alt="Banner"
                objectFit="cover"
                width="100%"
                height="200px"
                mb={6}
                borderRadius="md"
            />
            <Heading mb={4}>Welcome, Admin User!</Heading>

            {/* User Management Dashboard */}
            <UserDashboard initialUsers={users} />
        </>
    );
}
