import React, {useContext, useEffect, useState} from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import MainContext from './../context/main-context';
import Layout from "../hoc/Layout";
import {movieApi} from "../utils/methods";
import {navigate} from "../utils/services";
import Pagination from '@material-ui/lab/Pagination';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
    icon: {
        marginRight: theme.spacing(2),
    },
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(4, 0, 4),
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
    const {products, user, handleUpdateMainState, count, page, keyword} = useContext(MainContext);

    useEffect(() => {
        if (!user)
            props.history.push('/login')
    }, [user]);

    useEffect(() => {
        fetProducts();
    }, [])

    const fetProducts = (p) => {
        let fPage = p || page;
        handleUpdateMainState({loading: true});
        movieApi(keyword, fPage).then(function (res) {
            handleUpdateMainState({products: res.data.Search, count: res.data.totalResults, page: fPage});
        }).catch(function (error) {
            console.error(error);
        }).finally(() => {
            handleUpdateMainState({loading: false});

        });
    }

    return (
        <Layout>
                {/* Hero unit */}
                <div className={classes.heroContent}>
                    <Container maxWidth="sm">
                        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                            Movie 36
                        </Typography>
                        <Typography variant="h5" align="center" color="textSecondary" paragraph>
                            Movies encyclopedia.
                        </Typography>
                    </Container>
                </div>
                <Container className={classes.cardGrid} maxWidth="md">
                    {/* End hero unit */}
                    <Grid container spacing={4}>
                        {products && products.map((card) => (
                            <Grid onClick={() => navigate(props, `detail/${card.imdbID}`)} item key={card} xs={12} sm={6} md={4}>
                                <Card className={classes.card}>
                                    <CardMedia
                                        className={classes.cardMedia}
                                        image={card.Poster !== 'N/A' ? card.Poster : 'https://t4.ftcdn.net/jpg/04/70/29/97/360_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg'}
                                        title={card.Title}
                                    />
                                    <CardContent className={classes.cardContent}>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {card.Type} : {card.Year}
                                        </Typography>
                                        <Typography>
                                            {card.Title}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid><br/><br/>
                    <div className={classes.root}>
                        <Pagination onChange={(e, value) => fetProducts(value)} page={page} count={parseInt(count/10)} color="primary" />
                    </div>
                </Container>
        </Layout>
    );
}