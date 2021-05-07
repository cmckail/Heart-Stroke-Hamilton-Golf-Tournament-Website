/*
    Author: David Melnyk
    This page serves as the about page for the website.
*/

import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { makeStyles } from '@material-ui/core/styles';
import NavigationBar from './components/navigationBar'
import Grid from '@material-ui/core/Grid';
import CardMedia from '@material-ui/core/CardMedia';
import Hidden from '@material-ui/core/Hidden';
// JSS used for some of the styles.
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
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  aboutPageHeader: {
    backgroundImage: "url('./backgrounds/aboutPageSplash.png')",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    width: "100%",
    objectFit: "cover",
  },
  '@media only screen and (min-width: 800px)' : {
    aboutPageHeader: {
      height: '600px',
    }
  },
  aboutPageContent: {
    backgroundColor: "black",
    height: "100%",
    width: "100%",
  },
  aboutPageContentText: {
    color: "white",
    fontSize: "20px",
    marginLeft: "30px",
    marginRight: "10px",
  },
  aboutPageContentHeader: {
    color: "white",
    fontSize: "30px",
    marginLeft: "60px",
    marginBottom: "10px",
  }
}));

export default function Home() {
  const classes = useStyles();

  return (
    <div>
      <NavigationBar/>
      <div className={styles.container}>
        <Head>
          <title>DEVELOPMENT - Dan Segin Golf Tournament Website</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        {/* The page content is served in a grid, xs = 6 determines the dimensions of the grid which in this case is in two's down the page. One grid item is used for the text,
        another grid item is used for the picture and they alternate. */}
        <div className={classes.aboutPageContent}>
          <Grid container spacing={3}>
            <Hidden only="md">
              <Grid item sm={12}>
                {/* This serves as the header for the page, an image occupies this space in global.css*/}
                <div className={classes.aboutPageHeader}>
                </div>
              </Grid>
          </Hidden>
          <Grid item xs={12} md={6}>
              <h2 className={classes.aboutPageContentHeader}> Signs of a Heart Attack </h2>
              <hr></hr>
              <div className={classes.aboutPageContentText}>
                <ul>
                  <li>Chest discomfort, pressure, squeezing, fullness or pain, burning or heaviness</li>
                  <li>Sweating</li>
                  <li>Upper body discomfort. Neck, jaw, shoulder, arms or back</li>
                  <li>Nausea</li>
                  <li>Shortness of breath</li>
                  <li>Light-headedness</li>
                </ul>
              </div>
            </Grid>
            <Grid item sm={12} md={6}>
            <CardMedia
                className={classes.media}
                image="pictures/examplePicture.png"
                title="Paella dish"
              />
            </Grid>
            <Grid item sm={12} md={6}>
              <CardMedia
                className={classes.media}
                image="pictures/cheque.png"
                title="Paella dish"
              />
            </Grid>
            <Grid item sm={12} md={6}>
              <h2 className={classes.aboutPageContentHeader}> The Tournament </h2>
              <hr></hr>
              <p className={classes.aboutPageContentText}> The tournament we host today originated from the Segin family wanting to do something to honour the memory of their Father, Brother, Grandfather and Great Grandfather, Dan D Segin, who passed from a Heart attack due to complications from a broken hip in 2013. The event started with modest expectations, and snowballed into an event that exceeded expectations each and every year. In 2019, the Segin family eclipsed the $115,000 mark in funds raised. To date, the family has raised $122,000 for the Heart & Stroke foundation for the Southwest Ontario Region serving Halton, Hamilton, Niagara, Brantford regions. It is the single biggest independant fundraiser for this chapter. </p>
            </Grid>
            <Grid item sm={12} md={6}>
              <h2 className={classes.aboutPageContentHeader}> Dan D. Segin </h2>
              <hr></hr>
              <p className={classes.aboutPageContentText}>  We celebrate this event in honour of our Father, Brother, Grandfather and Great Grandfather who passed in 2013 from a Heart attack due to complications from hip surgey. Dan D. Segin was a career millitary man who served in Korea at the age of 16, and later joined the P.P.C.L.I and served with the United Nations Peace Keeping Core in Cypress in 1974-1974 and finally the Canadian Airborne regiment up until his retirement in 1984 . His 35 years of service to our country is what we are so proud of. And we wish to thank all supporters of our annual event in celebrating his memory.</p>
            </Grid>
            <Grid item sm={12} md={6}>
            <CardMedia
                className={classes.media}
                image="pictures/milli.png"
                title="Paella dish"
              />
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  )
}
