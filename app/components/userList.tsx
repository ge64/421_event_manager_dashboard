import { VStack, HStack, Text, Button } from '@chakra-ui/react';

const UserList = ({ users, onEdit, onDelete }: { users: any[], onEdit: (user: any) => void, onDelete: (id: number) => void }) => {
    return (
        <VStack spacing={2}>
            {users.map(user => (
                <HStack key={user.id} spacing={2}>
                    <Text>{user.username} - {user.email}</Text>
                    <Button onClick={() => onEdit(user)}>Edit</Button>
                    <Button colorScheme="red" onClick={() => onDelete(user.id)}>Delete</Button>
                </HStack>
            ))}
        </VStack>
    );
};

export default UserList;
