import React, {useState} from 'react';
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
import axios from "axios";
import {CONFIG} from "../config";
import {Button, TextField} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  markdown: {
    ...theme.typography.body2,
    padding: theme.spacing(3, 0),
  },
}));

export default function Main(props) {
  const classes = useStyles();
  const { item } = props;
  const [comment, setComment] = useState('');

  const createRating = (rating) => {
      axios.post(`${CONFIG.API_BASE_URL}/rating/create`, {rating, itemId: props.itemId})
          .then(() => {
              props.fetchRating();
          });
  };

    const createComment = () => {
        axios.post(`${CONFIG.API_BASE_URL}/comment/create`, {comment, itemId: props.itemId})
            .then(() => {
                props.fetchComments();
                setComment('');
            });
    };

  return (
    <Grid item xs={12} md={8}>
      <Typography variant="h6" gutterBottom>
        {item.Title}
      </Typography>
        <img src={item.Poster}/>
        <Typography variant="h6" gutterBottom>
            IMDB Rating: {item.imdbRating}
        </Typography>
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
            User Rating: {'N/A'}
        </Typography>
        <StarRatings
            rating={parseFloat(props.rating)}
            starRatedColor="blue"
            starDimension="40px"
            changeRating={(e) => createRating(e)}
            numberOfStars={10}
            name='rating'
            isSelectable={false}
        />

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
            {props.comments.map((item, index) => (
                <React.Fragment key={index}>
                    <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                        </ListItemAvatar>
                        <ListItemText
                            primary={'Meet'}
                            secondary={
                                <React.Fragment>
                                    <Typography
                                        component="span"
                                        variant="body2"
                                        className={classes.inline}
                                        color="textPrimary"
                                    >
                                        Comment
                                    </Typography>
                                    {` — ${item.comment}`}
                                </React.Fragment>
                            }
                        />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                </React.Fragment>
            ))}
            <TextField value={comment} onChange={e => setComment(e.target.value)} id="standard-basic" label="Enter Comment" />
            <Button onClick={createComment} variant="contained" color="primary">
                Primary
            </Button>
        </List>
      <Divider />
    </Grid>
  );
}

Main.propTypes = {
  posts: PropTypes.array,
  title: PropTypes.string,
};
