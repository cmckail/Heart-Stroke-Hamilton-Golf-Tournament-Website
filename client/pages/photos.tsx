/*
    Author: David Melnyk
    This page serves as the photos page for the website.
*/

import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { makeStyles } from '@material-ui/core/styles';
import NavigationBar from './components/navigationBar'
import Pagination from '@material-ui/lab/Pagination';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Home() {
  const classes = useStyles();

  // var [page, 0] = useState("");

  // handlePageChange(event, value) {
  //   this.setState(
  //     {
  //       page: value,
  //     },
  //     () => {
  //       this.retrieveTutorials();
  //     }
  //   );
  // }

  return (
    <div>
      <NavigationBar/>
      <div className={styles.container}>
        <Head>
          <title>DEVELOPMENT - Dan Segin Golf Tournament Website</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className={styles.main}>
        <h2> Photo Album </h2>
        <div className={classes.root}>
          <Grid container spacing={3}>
            <Grid item xs={3}>
            <a
              href="https://github.com/vercel/next.js/tree/master/examples"
              className={styles.card}
            >
            <img src="pictures/golfing.jpeg" alt="Golfing with your buddies" width="300" height="200"/> 
            </a>
            </Grid>
            <Grid item xs={3}>
            <a
              href="https://github.com/vercel/next.js/tree/master/examples"
              className={styles.card}
            >
            <img src="pictures/golfing.jpeg" alt="Golfing with your buddies" width="300" height="200"/> 
            </a>
            </Grid>
            <Grid item xs={3}>
            <a
              href="https://github.com/vercel/next.js/tree/master/examples"
              className={styles.card}
            >
            <img src="pictures/golfing.jpeg" alt="Golfing with your buddies" width="300" height="200"/> 
            </a>
            </Grid>
            <Grid item xs={3}>
            <a
              href="https://github.com/vercel/next.js/tree/master/examples"
              className={styles.card}
            >
            <img src="pictures/golfing.jpeg" alt="Golfing with your buddies" width="300" height="200"/> 
            </a>
            </Grid>
            <Grid item xs={3}>
            <a
              href="https://github.com/vercel/next.js/tree/master/examples"
              className={styles.card}
            >
            <img src="pictures/golfing.jpeg" alt="Golfing with your buddies" width="300" height="200"/> 
            </a>
            </Grid>
            <Grid item xs={3}>
            <a
              href="https://github.com/vercel/next.js/tree/master/examples"
              className={styles.card}
            >
            <img src="pictures/golfing.jpeg" alt="Golfing with your buddies" width="300" height="200"/> 
            </a>
            </Grid>
            <Grid item xs={3}>
            <a
              href="https://github.com/vercel/next.js/tree/master/examples"
              className={styles.card}
            >
            <img src="pictures/golfing.jpeg" alt="Golfing with your buddies" width="300" height="200"/> 
            </a>
            </Grid>
            <Grid item xs={3}>
            <a
              href="https://github.com/vercel/next.js/tree/master/examples"
              className={styles.card}
            >
            <img src="pictures/golfing.jpeg" alt="Golfing with your buddies" width="300" height="200"/> 
            </a>
            </Grid>
          </Grid>
        </div>
          <div className={classes.root}>
            <Pagination count={10} color="primary" />
          </div>
        </main>
      </div>
    </div>
  )
}
