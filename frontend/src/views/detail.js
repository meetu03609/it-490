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
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));


export default function Detail(props) {
    const [item, setItem] = useState(null);
    const [rating, setRating] = useState(0);
    const [comments, setComments] = useState([]);
    const [trailer, setTrailer] = useState();
    const [watch, setWatch] = useState();
    const classes = useStyles();
    const {user, loading, handleUpdateMainState} = useContext(MainContext);
    const itemId = props.match.params.id;

    useEffect(() => {
        if (!user)
            props.history.push('/login')
    }, [user]);

    useEffect(() => {
        fetProductDetail();
    }, [])

    const fetProductDetail = () => {

        fetchComments();
        fetchRating();

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

    const fetchRating = () => {
        axios.get(`${CONFIG.API_BASE_URL}/rating/list?itemId=${itemId}`).then(res => {
            if (res.data && res.data.ratings && res.data.ratings.length) {
                setRating(res.data.ratings[res.data.ratings.length - 1].rating);
            }
        })
    }

    const fetchComments = () => {
        axios.get(`${CONFIG.API_BASE_URL}/comment/list?itemId=${itemId}`).then(res => {
            if (res.data && res.data.comments) {
                setComments(res.data.comments);
            }
        })
    }

    return (
        <Layout>
            {/* Hero unit */}
            <Container className={classes.cardGrid} maxWidth="md">
               <Blog fetchComments={fetchComments}  fetchRating={fetchRating} comments={comments} rating={rating} itemId={props.match.params.id} watch={watch} trailer={trailer} item={item}/>
            </Container>
            <Backdrop className={classes.backdrop} open={loading} >
                <CircularProgress color="inherit" />
            </Backdrop>
        </Layout>
    );
}
