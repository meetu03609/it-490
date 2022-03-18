import React, {useState, useEffect, useContext} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {Link as RouterLink} from 'react-router-dom';
import {validate} from "../utils/validation";
import {FIELD_TYPES} from "../utils/globals";
import axios from 'axios';
import {CONFIG} from "../config";
import {navigate} from "../utils/services";
import MainContext from "../context/main-context";

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function SignIn(props) {
    const classes = useStyles();
    const context = useContext(MainContext);

    useEffect(() => {
        if (context.user)
            navigate(props, '/')
    }, [context.user]);

    const [form, setForm] = useState({
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState({
        email: '',
        password: ''
    });


    const updateForm = ({target}) => {
        form[target.name] = target.value;
        setForm({...form});
        setErrors({
            email: '',
            password: ''
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        let email = validate('Email', form.email, FIELD_TYPES.EMAIL, true);

        if (!email.status) {
            errors.email = email.message;
            setErrors({...errors});
            return false;
        }

        if (form.password.length <= 0) {
            errors.password = 'Password is required';
            setErrors({...errors});
            return false;
        }

        axios.post(`${CONFIG.API_BASE_URL}/user/token/`, form)
            .then(({data}) => {
                if (data.token) {
                    axios.get(`${CONFIG.API_BASE_URL}/user/me/`,
                        { 'headers': { 'Authorization': `Token ${data.token}` }})
                        .then(res => {
                            localStorage.setItem('token', data.token);
                            localStorage.setItem('User', JSON.stringify(res.data));
                            context.handleUpdateMainState({user: res.data});
                            navigate(props, '/');
                        });
                }
            })
            .catch(error => {
                console.log(error.response)
                if (error.response.data && Object.keys(error.response.data).length)
                    Object.keys(error.response.data).forEach(k => {
                        if (k in errors)
                            errors[k] = error.response.data[k][0];
                    });

                setErrors({...errors});

            })
            .finally()

    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form onSubmit={handleSubmit} className={classes.form} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoFocus
                        value={form.email}
                        onChange={updateForm}
                        error={!!errors.email}
                        helperText={errors.email}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        value={form.password}
                        onChange={updateForm}
                        error={!!errors.password}
                        helperText={errors.password}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item>
                            <RouterLink to="/register" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </RouterLink>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
    );
}
