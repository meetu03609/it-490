import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import MainFeaturedPost from './MainFeaturedPost';
import Main from './Main';
import Sidebar from './Sidebar';
import "./../../node_modules/video-react/dist/video-react.css"; // import css
import { Player } from 'video-react';


const useStyles = makeStyles((theme) => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  },
}));


export default function Blog({item, trailer, watch}) {
  const classes = useStyles();

  if (!item)
    return <div></div>

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <main>
          <MainFeaturedPost item={item} />
          {(trailer && !trailer.errorMessage) && (
              <iframe src={trailer.linkEmbed} width="100%"
                      height="480" allowFullScreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"
                      frameBorder="no" scrolling="no"></iframe>
          )}

          <Grid container spacing={5} className={classes.mainGrid}>
            <Main watch={watch} item={item} />
            <Sidebar
              title={'Plot'}
              description={item.Plot}
              item={item}
              social={[]}
            />
          </Grid>
        </main>
      </Container>
    </React.Fragment>
  );
}
