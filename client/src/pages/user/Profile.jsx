import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useParams } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';


const Profile = () => {
    const [user, setUser] = React.useState([]);
    const [messagesFrom, setMessagesFrom] = React.useState([]);
    const [messagesTo, setMessagesTo] = React.useState([]);
    const [isLoaded, setIsLoaded] = React.useState(false);
    const params = useParams();

    const handleDisable = () => {
        fetch(`http://localhost:8000/api/user/deactivate/${params.id}`, {
            method: 'POST',
        })
    };
    const handleEnable = () => {
        fetch(`http://localhost:8000/api/user/activate/${params.id}`, {
            method: 'POST',
        })
    };

    React.useEffect(() => {
        Promise.all([
            fetch(`http://localhost:8000/api/user/${params.id}`)
            .then(res => res.json())
            .then(
                (result) => {
                    setUser(result.data);
                },
            ),
            fetch(`http://localhost:8000/api/messages/from/${params.id}`)
            .then(res => res.json())
            .then(
                (result) => {
                    setMessagesFrom(result.data);
                },
            ),
            fetch(`http://localhost:8000/api/messages/to/${params.id}`)
            .then(res => res.json())
            .then(
                (result) => {
                    setMessagesTo(result.data);
                },
            ),
        ]).then(
            (result) => {
                setIsLoaded(true);
            },
            (error) => {
                console.error(error);
            }
        )
    }, [params.id]);

    if (!isLoaded)
        return null;

    console.log(user);

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" component="h1" gutterBottom>
                Profile: {user.username}
            </Typography>

            { user.isDeleted ? (
                <Button variant='contained' onClick={handleEnable}>
                    Enable profile
                </Button>
            ) : (
                <Button variant='contained' onClick={handleDisable}>
                    Disable profile
                </Button>
            ) }

            <Typography variant="h5" component="h1" gutterBottom>
                Messages from {user.username}
            </Typography>

            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>message</TableCell>
                            <TableCell align="right">from</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {messagesFrom.map((msg) => (
                            <TableRow
                                hover
                                key={msg.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {msg.content}
                                </TableCell>
                                <TableCell align="right">{msg.receiverId}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>


            <Typography variant="h5" component="h1" gutterBottom>
                Messages to {user.username}
            </Typography>

            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>message</TableCell>
                            <TableCell align="right">to</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {messagesTo.map((msg) => (
                            <TableRow
                                hover
                                key={msg.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {msg.content}
                                </TableCell>
                                <TableCell align="right">{msg.senderId}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

        </Container>
    );
}

export default Profile;
