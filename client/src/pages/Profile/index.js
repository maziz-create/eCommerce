import React from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { Text, Button } from '@chakra-ui/react'

function Profile({ history }) { //history => alttaki logout callbackFn ile logout anında anasayfaya yönlendirmek için.
    const { user, logout } = useAuth();

    const handleLogout = async () => {
        logout(() => {
            history.push('/'); //ana sayfaya git!
        });
    }

    return (
        <div>
            <Text fontSize="22">Profile</Text>
            {
                user && <code>{JSON.stringify(user)}</code>
            }
            <br /><br />
            {
                user && <Button colorScheme="pink" variant="solid" onClick={handleLogout}>
                    Logout
                </Button>
            }

            {
                !user && <Text>Çıkış yaptınız!</Text>
            }

        </div>
    )
}

export default Profile
