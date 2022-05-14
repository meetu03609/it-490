import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
// import Markdown from './Markdown';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import StarRatings from 'react-star-ratings';
import Link from "@material-ui/core/Link";

const useStyles = makeStyles((theme) => ({
  markdown: {
    ...theme.typography.body2,
    padding: theme.spacing(3, 0),
  },
}));

export default function Main(props) {
  const classes = useStyles();
  const { item } = props;

  return (
    <Grid item xs={12} md={8}>
      <Typography variant="h6" gutterBottom>
        {item.Title}
      </Typography>
        <img src={item.Poster}/>
        <Typography variant="h6" gutterBottom>
            IMDB Rating: {item.imdbRating}
        </Typography>
        <StarRatings
            rating={parseFloat(item.imdbRating)}
            starRatedColor="blue"
            starDimension="40px"
            changeRating={() => {}}
            numberOfStars={10}
            name='rating'
            isSelectable={false}
        />
        {/*<Typography variant="h6" gutterBottom>*/}
        {/*    User Rating: {'N/A'}*/}
        {/*</Typography>*/}
        {/*<StarRatings*/}
        {/*    rating={parseFloat(item.imdbRating)}*/}
        {/*    starRatedColor="blue"*/}
        {/*    starDimension="40px"*/}
        {/*    changeRating={() => {}}*/}
        {/*    numberOfStars={10}*/}
        {/*    name='rating'*/}
        {/*    isSelectable={false}*/}
        {/*/>*/}

        <Typography variant="h6" gutterBottom>
            Watch Now
        </Typography>

        <List className={classes.root}>
            {(props.watch && props.watch.netflix) && (
                <ListItem alignItems="flex-start">
                    <ListItemText
                        primary="Netflix"
                        secondary={
                            <React.Fragment>
                                <Link
                                    href={props.watch.netflix.url} target="__blank"
                                >
                                    {props.watch.netflix.url}
                                </Link>
                            </React.Fragment>
                        }
                    />
                </ListItem>
            )}

            {(props.watch && props.watch.allMovie) && (
                <ListItem alignItems="flex-start">
                    <ListItemText
                        primary="All Movie"
                        secondary={
                            <React.Fragment>
                                <Link
                                    href={props.watch.allMovie.url} target="__blank"
                                >
                                    {props.watch.allMovie.url}
                                </Link>
                            </React.Fragment>
                        }
                    />
                </ListItem>
            )}

            {(props.watch && props.watch.theMovieDb) && (
                <ListItem alignItems="flex-start">
                    <ListItemText
                        primary="The Movie DB"
                        secondary={
                            <React.Fragment>
                                <Link
                                    href={props.watch.theMovieDb.url} target="__blank"
                                >
                                    {props.watch.theMovieDb.url}
                                </Link>
                            </React.Fragment>
                        }
                    />
                </ListItem>
            )}

        </List>

        <Typography variant="h6" gutterBottom>
            Comments
        </Typography>
        <List className={classes.root}>
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                </ListItemAvatar>
                <ListItemText
                    primary="Brunch this weekend?"
                    secondary={
                        <React.Fragment>
                            <Typography
                                component="span"
                                variant="body2"
                                className={classes.inline}
                                color="textPrimary"
                            >
                                Ali Connors
                            </Typography>
                            {" — I'll be in your neighborhood doing errands this…"}
                        </React.Fragment>
                    }
                />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                </ListItemAvatar>
                <ListItemText
                    primary="Summer BBQ"
                    secondary={
                        <React.Fragment>
                            <Typography
                                component="span"
                                variant="body2"
                                className={classes.inline}
                                color="textPrimary"
                            >
                                to Scott, Alex, Jennifer
                            </Typography>
                            {" — Wish I could come, but I'm out of town this…"}
                        </React.Fragment>
                    }
                />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                </ListItemAvatar>
                <ListItemText
                    primary="Oui Oui"
                    secondary={
                        <React.Fragment>
                            <Typography
                                component="span"
                                variant="body2"
                                className={classes.inline}
                                color="textPrimary"
                            >
                                Sandra Adams
                            </Typography>
                            {' — Do you have Paris recommendations? Have you ever…'}
                        </React.Fragment>
                    }
                />
            </ListItem>
        </List>
      <Divider />
    </Grid>
  );
}

Main.propTypes = {
  posts: PropTypes.array,
  title: PropTypes.string,
};
