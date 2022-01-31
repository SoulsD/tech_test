import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const UserList = () => {
    const [users, setUsers] = React.useState([]);
    const [isLoaded, setIsLoaded] = React.useState(false);

    React.useEffect(() => {
        fetch('http://localhost:8000/api/users')
            .then(res => res.json())
            .then(
                (result) => {
                    setUsers(result.data);
                    setIsLoaded(true);
                },
                (error) => {
                    console.error(error);
                }
            )
    }, [])

    if (!isLoaded)
        return null;

    return (
        <Container maxWidth="xl">
            <Typography variant="h4" component="h1" gutterBottom>
                Users
            </Typography>

            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>username</TableCell>
                            <TableCell align="right">id</TableCell>
                            <TableCell align="right">isDeleted</TableCell>
                            <TableCell align="right">name</TableCell>
                            <TableCell align="right">city</TableCell>
                            <TableCell align="right">country</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow
                                hover
                                key={user.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    <Link to={`/user/${user.id}`}>
                                        {user.username}
                                    </Link>
                                </TableCell>
                                <TableCell align="right">{user.id}</TableCell>
                                <TableCell align="right">{user.isDeleted}</TableCell>
                                <TableCell align="right">{user.name}</TableCell>
                                <TableCell align="right">{user.city}</TableCell>
                                <TableCell align="right">{user.country}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Link to='user/1'>user 1</Link>
        </Container>
    );
}

export default UserList;
