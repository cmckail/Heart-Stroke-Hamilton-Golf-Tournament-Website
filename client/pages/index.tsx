/*
    Author: David Melnyk
    This page serves as the landing page for the website.
*/

import Head from "next/head";
import { makeStyles } from "@material-ui/core/styles";
import NavigationBar from "./components/navigationBar";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    margin: "0 1em",
    textAlign: "center",
    color: "white",
  },
  description: {
    textAlign: "center",
    color: "white",
  },
  card: {
    textDecoration: "none",
    border: "2px solid #eaeaea",
    borderRadius: "10px",
    transition: "color 0.15s ease, border-color 0.15s ease",
    textAlign: "center",
    "&:hover": {
      color: "#0070f3",
      borderColor: "#0070f3",
      cursor: "pointer",
    },
  },
  cardPadding: {
    margin: "100px 0 auto",
    padding: "1rem",
  },
  gridContent: {
    width: "100%",
    height: "100%",
    padding: "1rem",
  },
  jumbotron: {
    backgroundImage: "url('./backgrounds/landing_page_background.png')",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    minHeight: "500px",
    maxHeight: "700px",
    width: "100%",
  },
}));

{
  /* The index page serves as the landing page, on this page there is a header which is called the jumbotron, and then multiple sub-cards beneath that which serve to occupy the action items
beneath the jumbotron.*/
}
export default function Home() {
  const classes = useStyles();

  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <NavigationBar />
      <Head>
        <title>DEVELOPMENT - Dan Segin Golf Tournament Website</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <main className={styles.main} style={{ paddingTop: "0" }}>
        {/* The jumbotron is an image which is defined in globals.css */}
        <div className={classes.jumbotron}>
          <h2
            className={classes.title}
            style={{
              fontSize:
                windowWidth > 1500
                  ? "60px"
                  : windowWidth > 1000
                  ? "4vw"
                  : "4vh",
            }}
          >
            8TH ANNUAL Southwest Ontario Heart & Stroke
          </h2>
          <p
            className={classes.description}
            style={{
              fontSize:
                windowWidth > 1500
                  ? "30px"
                  : windowWidth > 1000
                  ? "2vw"
                  : "2vh",
            }}
          >
            Dan D Segin Memorial Golf for Heart Tournament
          </p>

          {/* Register button for registration. */}
          <div style={{ textAlign: "center" }}>
            <Link href="/registration">
              <h3
                className={classes.card + " " + classes.cardPadding}
                style={{
                  fontSize:
                    windowWidth > 1500
                      ? "37.5px"
                      : windowWidth > 1000
                      ? "2.5vw"
                      : "2.5vh",
                  color: "white",
                  display: "inline-block",
                }}
              >
                Register &rarr;
              </h3>
            </Link>
          </div>
        </div>

        <Grid
          container
          spacing={4}
          style={{ width: "100%", margin: "1em auto" }}
        >
          <Grid item xs={12} sm={6} md={3}>
            <Link href="/donate">
              <div className={[classes.card, classes.gridContent].join(" ")}>
                <img
                  src="icons/support_heart_and_stroke.png"
                  alt="Girl in a jacket"
                  width="70"
                  height="50"
                />
                <h3>Support Heart and Stroke &rarr;</h3>
                <p>Make a donation today!</p>
              </div>
            </Link>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Link href="/auction">
              <div className={[classes.card, classes.gridContent].join(" ")}>
                <img
                  src="icons/virtual_silent_auction.png"
                  alt="Girl in a jacket"
                  width="70"
                  height="50"
                />
                <h3>Virtual Silent Auction &rarr;</h3>
                <p>
                  Virtual Silent Auction with a chance to win sport memoriabilia
                  such as from our partners
                </p>
              </div>
            </Link>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Link href="/registration">
              <div className={[classes.card, classes.gridContent].join(" ")}>
                <img
                  src="icons/scheduled_tee_times.png"
                  alt="Girl in a jacket"
                  width="70"
                  height="50"
                />
                <h3>Scheduled Tee Times &rarr;</h3>
                <p>
                  To keep you safe, tee off is socially distanced in groups of
                  up to 4 players. Tee time is selected during registration.
                </p>
              </div>
            </Link>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Link href="/registration">
              <div className={[classes.card, classes.gridContent].join(" ")}>
                <img
                  src="icons/dinner_or_lunch.png"
                  alt="Girl in a jacket"
                  width="70"
                  height="50"
                />
                <h3>Box Lunch Included &rarr;</h3>
                <p>
                  A box lunch is included in the price for registration. We
                  provide vegetarian and gluten-free options on request.
                </p>
              </div>
            </Link>
          </Grid>
        </Grid>
      </main>
    </>
  );
}
