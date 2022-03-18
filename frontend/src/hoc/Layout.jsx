import React, {useContext} from 'react';
import PrimarySearchAppBar from "../components/layouts/appbar";
import CssBaseline from '@material-ui/core/CssBaseline';
import Footer from "../components/layouts/Footer";
import AppDrawer from "../components/layouts/Drawer";

const Layout = props => {

    return (
        <React.Fragment>
            <CssBaseline />
            <PrimarySearchAppBar/>
            {/*<AppDrawer/>*/}
            <main>
                {props.children}
            </main>
            <Footer/>
        </React.Fragment>
    );
};

export default Layout;
