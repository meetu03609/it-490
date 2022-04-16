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
import ShoppingBasket from '@material-ui/icons/ShoppingBasket';
import Layout from "../hoc/Layout";

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

export default function CreateProduct() {
  const classes = useStyles();

  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  // const timer = React.useRef();

  const buttonClassname = clsx({
    [classes.buttonSuccess]: success,
  });

  const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
    image: ''
  });

  const [errors, setErrors] = useState({
    title: '',
    description: '',
    price: '',
    image: ''
  });

  const updateForm = ({target}) => {
    form[target.name] = target.value;
    setForm({...form});
    setErrors({
      title: '',
      description: '',
      price: '',
      image: ''
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let title = validate('Title', form.title, FIELD_TYPES.TEXT, true);

    if (!title.status) {
      errors.title = title.message;
      setErrors({...errors});
      return false;
    }

    let description = validate('Description', form.description, FIELD_TYPES.TEXT, true);

    if (!description.status) {
      errors.description = description.message;
      setErrors({...errors});
      return false;
    }

    let price = validate('Price', form.price, FIELD_TYPES.NUMBER, true);

    if (!price.status) {
      errors.price = price.message;
      setErrors({...errors});
      return false;
    }

    if (!loading) {
      setSuccess(false);
      setLoading(true);
      axios.post(`${CONFIG.API_BASE_URL}/product/create`, form)
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
      <Layout edit>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <ShoppingBasket />
            </Avatar>
            <Typography component="h1" variant="h5">
              Spice Form
            </Typography>
            <form onSubmit={handleSubmit} className={classes.form} noValidate>
              <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="title"
                  label="Title"
                  name="title"
                  value={form.title}
                  onChange={updateForm}
                  error={!!errors.title}
                  helperText={errors.title}
              />
              <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="description"
                  label="Description"
                  name="description"
                  multiline
                  rows={4}
                  value={form.description}
                  onChange={updateForm}
                  error={!!errors.description}
                  helperText={errors.description}
              />
              <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="price"
                  label="Price"
                  type="number"
                  id="price"
                  value={form.price}
                  onChange={updateForm}
                  error={!!errors.price}
                  helperText={errors.price}
              />
              <input
                  accept="image/*"
                  className="hidden"
                  id="button-file"
                  type="file"
                  onChange={async e => {
                    function readFileAsync() {
                      return new Promise((resolve, reject) => {
                        const file = e.target.files[0];
                        if (!file) {
                          return;
                        }
                        const reader = new FileReader();

                        reader.onload = () => {
                          resolve({
                            title: file.name,
                            url: `data:${file.type};base64,${btoa(reader.result)}`,
                            type: 'image'
                          });
                        };

                        reader.onerror = reject;

                        reader.readAsBinaryString(file);
                      });
                    }

                    const newImage = await readFileAsync();
                    updateForm({target: {name: 'image', value: newImage.url}});
                    updateForm({target: {name: 'imageName', value: newImage.title}});
                  }}
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
                    Save
                  </Button>
                  {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                </div>
              </div>
            </form>
          </div>
          <Box mt={8}>
            <Copyright />
          </Box>
        </Container>
      </Layout>
  );
}
