import React, {useContext} from 'react';
import PrimarySearchAppBar from "../components/layouts/appbar";
import CssBaseline from '@material-ui/core/CssBaseline';
import Footer from "../components/layouts/Footer";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import MainContext from "../context/main-context";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

const Layout = props => {
    const classes = useStyles();
    const {loading} = useContext(MainContext);
    return (
        <React.Fragment>
            <CssBaseline />
            <PrimarySearchAppBar edit={props.edit}/>
            {/*<AppDrawer/>*/}
            <main>
                {props.children}
            </main>
            <Footer/>
            <Backdrop className={classes.backdrop} open={loading} >
                <CircularProgress color="inherit" />
            </Backdrop>
        </React.Fragment>
    );
};

export default Layout;
