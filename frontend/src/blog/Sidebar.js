import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme) => ({
  sidebarAboutBox: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.grey[200],
  },
  sidebarSection: {
    marginTop: theme.spacing(3),
  },
}));

export default function Sidebar(props) {
  const classes = useStyles();
  const { item, description, social, title } = props;

  const archives = [
      {name: 'Year', value: item.Year},
      {name: 'Rated', value: item.Rated},
      {name: 'Release', value: item.Release},
      {name: 'Runtime', value: item.Runtime},
      {name: 'Genre', value: item.Genre},
      {name: 'Director', value: item.Director},
      {name: 'Actors', value: item.Actors},
      {name: 'Language', value: item.Language},
      {name: 'Country', value: item.Country},
      {name: 'Awards', value: item.Awards},
      {name: 'Metascore', value: item.Metascore},
      {name: 'imdbRating', value: item.imdbRating},
      {name: 'imdbVotes', value: item.imdbVotes},
      {name: 'Type', value: item.Type},
      {name: 'DVD', value: item.DVD},
      {name: 'BoxOffice', value: item.BoxOffice},
  ]

  return (
    <Grid item xs={12} md={4}>
      <Paper elevation={0} className={classes.sidebarAboutBox}>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Typography>{description}</Typography>
      </Paper>
      <Typography variant="h6" gutterBottom className={classes.sidebarSection}>
        Details
      </Typography>
      {archives.map((archive) => (
        <Typography display="block">
           <span style={{ fontWeight: 'bold'}}>{archive.name}</span>  : {archive.value}
        </Typography>
      ))}
      <Typography variant="h6" gutterBottom className={classes.sidebarSection}>
        Social
      </Typography>
      {social.map((network) => (
        <Link display="block" variant="body1" href="#" key={network}>
          <Grid container direction="row" spacing={1} alignItems="center">
            <Grid item>
              <network.icon />
            </Grid>
            <Grid item>{network.name}</Grid>
          </Grid>
        </Link>
      ))}
    </Grid>
  );
}

Sidebar.propTypes = {
  archives: PropTypes.array,
  description: PropTypes.string,
  social: PropTypes.array,
  title: PropTypes.string,
};
