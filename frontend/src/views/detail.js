import React, {useContext, useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import MainContext from './../context/main-context';
import Layout from "../hoc/Layout";
import Blog from "../blog/Blog";
import {movieDetailApi} from "../utils/methods";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import axios from "axios";

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
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));


export default function Detail(props) {
    const [item, setItem] = useState();
    const [trailer, setTrailer] = useState();
    const [watch, setWatch] = useState();
    const classes = useStyles();
    const {user, loading, handleUpdateMainState} = useContext(MainContext);

    useEffect(() => {
        if (!user)
            props.history.push('/login')
    }, [user]);

    useEffect(() => {
        fetProductDetail();
    }, [])

    const fetProductDetail = () => {
        handleUpdateMainState({loading: true});
        movieDetailApi(props.match.params.id).then(function (res) {
            axios.get(`https://imdb-api.com/en/API/Trailer/k_s0266grf/${props.match.params.id}`).then(res => {
                setTrailer(res.data)
            });

            axios.get(`https://imdb-api.com/en/API/ExternalSites/k_s0266grf/${props.match.params.id}`).then(res => {
                setWatch(res.data)
            });
            setItem(res.data);
        }).catch(function (error) {
            console.error(error);
        }).finally(() => {
            handleUpdateMainState({loading: false});
        });
    }

    return (
        <Layout>
            {/* Hero unit */}
            <Container className={classes.cardGrid} maxWidth="md">
               <Blog watch={watch} trailer={trailer} item={item}/>
            </Container>
            <Backdrop className={classes.backdrop} open={loading} >
                <CircularProgress color="inherit" />
            </Backdrop>
        </Layout>
    );
}