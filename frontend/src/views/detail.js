import React, {useContext, useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import MainContext from './../context/main-context';
import Layout from "../hoc/Layout";
import Blog from "../blog/Blog";
import {movieDetailApi} from "../utils/methods";

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


export default function Detail(props) {
    const [item, setItem] = useState();
    const classes = useStyles();
    const {user} = useContext(MainContext);

    useEffect(() => {
        if (!user)
            props.history.push('/login')
    }, [user]);

    useEffect(() => {
        fetProductDetail();
    }, [])

    const fetProductDetail = () => {
        movieDetailApi(props.match.params.id).then(function (res) {
            console.log(res.data);
            setItem(res.data);
        }).catch(function (error) {
            console.error(error);
        });
    }

    return (
        <Layout>
            {/* Hero unit */}
            <Container className={classes.cardGrid} maxWidth="md">
               <Blog item={item}/>
            </Container>
        </Layout>
    );
}