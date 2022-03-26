import React, {useState} from 'react';
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
import {CONFIG} from "../config";
import axios from 'axios';
import clsx from 'clsx';
import CircularProgress from '@material-ui/core/CircularProgress';
import { green } from '@material-ui/core/colors';
import Fab from '@material-ui/core/Fab';
import CheckIcon from '@material-ui/icons/Check';
import SaveIcon from '@material-ui/icons/Save';

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
  root: {
    display: 'flex',
    alignItems: 'center',
    float: 'right'
  },
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
  buttonSuccess: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
  fabProgress: {
    color: green[500],
    position: 'absolute',
    top: -6,
    left: -6,
    zIndex: 1,
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));

export default function SignUp() {
  const classes = useStyles();

  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  // const timer = React.useRef();

  const buttonClassname = clsx({
    [classes.buttonSuccess]: success,
  });

  const [form, setForm] = useState({
    username: '',
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: ''
  });

  const updateForm = ({target}) => {
    form[target.name] = target.value;
    setForm({...form});
    setErrors({
      username: '',
      email: '',
      password: ''
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let username = validate('User Name', form.username, FIELD_TYPES.TEXT, true);

    if (!username.status) {
      errors.username = username.message;
      setErrors({...errors});
      return false;
    }

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

    if (!loading) {
      setSuccess(false);
      setLoading(true);
      axios.post(`${CONFIG.API_BASE_URL}/registration`, form)
          .then(({data}) => {
            console.log(data)
            setSuccess(true);
          })
          .catch(error => {
            console.log('error',error.response.data);
            if (error.response.data && Object.keys(error.response.data).length)
                Object.keys(error.response.data).forEach(k => {
                  if (k in errors)
                    errors[k] = error.response.data[k][0];
                });

            setErrors({...errors});
            setSuccess(false);
          })
          .finally(() => {
            setLoading(false);
          })

    }

  };


  return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form onSubmit={handleSubmit} className={classes.form} noValidate>
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="username"
                label="User Name"
                name="username"
                value={form.username}
                onChange={updateForm}
                error={!!errors.username}
                helperText={errors.username}
            />
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
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

            <div className={classes.root}>
              <div className={classes.wrapper}>
                <Fab
                    aria-label="save"
                    color="primary"
                    className={buttonClassname}
                    onClick={handleSubmit}
                >
                  {success ? <CheckIcon /> : <SaveIcon />}
                </Fab>
                {loading && <CircularProgress size={68} className={classes.fabProgress} />}
              </div>
              <div className={classes.wrapper}>
                <Button
                    variant="contained"
                    color="primary"
                    className={buttonClassname}
                    disabled={loading}
                    onClick={handleSubmit}
                >
                     Sign Up
                </Button>
                {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
              </div>
            </div>
            <Grid container>
              <Grid item>
                <RouterLink to="/login" variant="body2">
                  {"Already have a account? Sign In"}
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
