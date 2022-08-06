import { UserService } from '../services/UserService'
import Box from '@mui/material/Box';
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useState } from "react";
import { User } from "../models/User";

export default function CreateUser(props: any) {
    const MAX_CHARS = 100;
    const DUPLICATE_ERROR = "The user has already been added.";

    const [user, setUser] = useState<User>({ firstname: '', lastname: '', email: '' } as User);
    const userService = new UserService();
    const [error, setError] = useState<String>("");

    const handleSubmit = (event: any) => {
        event.preventDefault();
        const users = props.users.map((u: User) => u.email);
        if (users.includes(user.email)) {
            setError(DUPLICATE_ERROR);
        }
        else {
            setError('');
            userService.createUser(user).then(response => {
                props.userCreated();
                event.target.reset();
            });
        }
    };

    const validate = (e: any) => {
        setUser({ ...user, [e.target.name]: e.target.value.trim() });
    }

    const isValid = () => {
        return ((user.firstname === '' || /^[a-zA-Z]+$/.test(user.firstname) === false)
            || (user.lastname === '' || /^[a-zA-Z]+$/.test(user.lastname) === false)
            || (user.email === '' || /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(user.email) === false))
    }
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
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
                    Create User
                </Typography>
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    noValidate
                    sx={{ mt: 1 }}
                >
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        error={user.firstname === '' || /^[a-zA-Z]+$/.test(user.firstname) === false}
                        value={user.firstname}
                        type="text"
                        onChange={(e) => {
                            if (e.target.value.length <= MAX_CHARS) {
                                validate(e);
                            }
                        }}
                        id="firstname"
                        label="First Name"
                        name="firstname"
                        autoComplete="firstname"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        error={user.lastname === '' || /^[a-zA-Z]+$/.test(user.lastname) === false}
                        value={user.lastname}
                        name="lastname"
                        label="Last Name"
                        type="text"
                        id="lastname"
                        autoComplete="lastname"
                        onChange={(e) => {
                            if (e.target.value.length <= MAX_CHARS) {
                                validate(e);
                            }
                        }}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        error={user.email === '' || /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(user.email) === false}
                        value={user.email}
                        onChange={validate}
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                    />
                    <div style={{ color: 'red' }}>
                        {error}
                    </div>
                    <Button
                        type="submit"
                        fullWidth
                        disabled={isValid()}
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Create
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}