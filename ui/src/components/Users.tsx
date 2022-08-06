import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { User } from '../models/User';
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Box from '@mui/material/Box';
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

interface IUser {
    users: any[];
    deleteUser: Function;
    userEdited: Function;
}
export default function Users({ users, deleteUser, userEdited }: IUser) {
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    height: "calc(100vh - 200px)",
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center"
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                    <Avatar />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Users
                </Typography>
                <Box
                    sx={{ mt: 1 }}
                >
                    {users.length === 0 ? "No Users found." :
                        <TableContainer component={Paper}>
                            <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>First Name</TableCell>
                                        <TableCell >Last Name</TableCell>
                                        <TableCell>Email</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {users.map((row: User) => (
                                        <TableRow
                                            key={row._id}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                {row.firstname}
                                            </TableCell>
                                            <TableCell>{row.lastname}</TableCell>
                                            <TableCell>{row.email}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    }
                </Box>
            </Box>
        </Container>

    );
}
