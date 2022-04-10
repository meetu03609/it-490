import React, {useEffect, useContext} from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';
import {api} from "../../utils/request";
import MainContext from "../../context/main-context";
import {navigate} from "../../utils/services";
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router-dom";

const axios = require("axios").default;
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '60ch',
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
}));


function PrimarySearchAppBar(props) {
    const context = useContext(MainContext);
    const [open, setOpen] = React.useState(true);
    const [keyword, setKeyword] = React.useState('');
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    useEffect(() => {
        // fetchProducts();
    }, [])

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const handleLogout = () => {
        localStorage.clear();
        context.handleUpdateMainState({user: null});
    }

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={() => {}}>Profile</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <p>Profile</p>
            </MenuItem>
        </Menu>
    );

    const handleKeyPress = (e) => {
        if(e.keyCode === 13){
            const options = {
                method: 'GET',
                url: 'https://amazon-product-reviews-keywords.p.rapidapi.com/product/search',
                params: {keyword: e.target.value, category: 'aps', country: 'US'},
                headers: {
                    'x-rapidapi-key': 'a63dca9f08msh09539df4e2ab02bp112a4djsn44d5666aeb47',
                    'x-rapidapi-host': 'amazon-product-reviews-keywords.p.rapidapi.com'
                }
            };

            axios.request(options).then(function (response) {
                if (response.data && response.data.products && response.data.products.length) {
                    response.data.products.forEach(d => {
                        let product = {
                            asin: d.asin,
                            title: d.title,
                            score: d.score,
                            sponsored: d.sponsored,
                            amazon_choice: d.amazon_choice,
                            amazon_prime: d.amazon_prime,
                            price: d.price.current_price,
                            before_price: d.price.before_price,
                            current_price: d.price.current_price,
                            currency: d.price.currency,
                            rating: d.reviews.rating,
                            total_reviews: d.reviews.total_reviews,
                            discounted: d.discounted,
                            url: d.uri,
                            thumbnail: d.thumbnail,
                        };

                        const isFoundProduct = context.products.findIndex(p => p.asin === product.asin);
                        if (isFoundProduct === -1)
                            createProduct(product);
                    })

                }
                fetchProducts();
            }).catch(function (error) {
                console.error(error);
            });
        }
    }

    const createProduct = (product) => {
        api('/product/products/', 'POST', product)
            .then(res => {
                console.log('res', res.data);
            })
    };

    const fetchProducts = () => {
        api('/product/products/', 'GET')
            .then(res => {
                context.handleUpdateMainState({products: res.data});
            })
    }

    const handleAddButton = () => {
        navigate(props, props.edit ? '/home' :'create-product')
    }

    return (
        <div className={classes.grow}>
            <AppBar
                position="static"
                // className={clsx(classes.appBar, {
                //     [classes.appBarShift]: open,
                // })}
            >
                <Toolbar>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="open drawer"
                    >
                    </IconButton>
                    <Typography className={classes.title} variant="h6" noWrap>
                        IT490-Team-3
                    </Typography>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Search…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                            onKeyDown={handleKeyPress}
                        />
                    </div>
                    <div className={classes.grow} />
                    <Button onClick={handleAddButton} variant="contained">{props.edit ? 'List Product' : 'Add Product'}</Button>
                    <div className={classes.sectionDesktop}>
                        <IconButton
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                    </div>
                    <div className={classes.sectionMobile}>
                        <IconButton
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
        </div>
    );
}

export default withRouter(PrimarySearchAppBar);
