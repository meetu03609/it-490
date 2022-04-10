import React, {useContext, useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import MainContext from './../context/main-context';
import Layout from "../hoc/Layout";
import {CardActions} from "@material-ui/core";
import axios from "axios";
import {CONFIG} from "../config";

const useStyles = makeStyles((theme) => ({
    icon: {
        marginRight: theme.spacing(2),
    },
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
        marginTop: theme.spacing(4),
    },
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6),
    },
}));


export default function Home(props) {
    const classes = useStyles();
    const [products, setProducts] = useState();
    const context = useContext(MainContext);

    useEffect(() => {
        if (!context.user)
            props.history.push('/login')
    }, [context.user]);

    useEffect(() => {
        fetProducts();
    }, [])

    const fetProducts = () => {
        axios.get(`${CONFIG.API_BASE_URL}/product/list`)
            .then(res => {
                setProducts(res.data.products)
            })
    }

    const handleDelete = (id) => {
        axios.delete(`${CONFIG.API_BASE_URL}/product/delete/${id}`)
            .then(() => {
                fetProducts();
            })
    }

    return (
        <Layout>
                {/* Hero unit */}
                <div className={classes.heroContent}>
                    <Container maxWidth="sm">
                        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                            Indian Spices
                        </Typography>
                        <Typography variant="h5" align="center" color="textSecondary" paragraph>
                            No other country grows and consumes as many spices as in India.
                        </Typography>
                    </Container>
                </div>
                <Container className={classes.cardGrid} maxWidth="md">
                    {/* End hero unit */}
                    <Grid container spacing={4}>
                        {products && products.map((card) => (
                            <Grid item key={card} xs={12} sm={6} md={4}>
                                <Card className={classes.card}>
                                    <CardMedia
                                        className={classes.cardMedia}
                                        image="https://source.unsplash.com/random"
                                        title={card.title}
                                    />
                                    <CardContent className={classes.cardContent}>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {card.title}
                                        </Typography>
                                        <Typography>
                                            {card.description}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button onClick={() => handleDelete(card.id)} startIcon={<DeleteIcon />} size="small" color="secondary">
                                            Delete
                                        </Button>
                                        {/*<Button size="small" color="primary" startIcon={<EditIcon />}>*/}
                                        {/*    Edit*/}
                                        {/*</Button>*/}
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
        </Layout>
    );
}