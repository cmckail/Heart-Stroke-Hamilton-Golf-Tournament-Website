/*
    Author: David Melnyk
    This page serves as the sponsors page for the website.
*/

import Head from "next/head";
import styles from "../styles/Home.module.css";
import NavigationBar from "./components/navigationBar";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { useEffect, useState } from "react";
import ISponsorView from "@local/shared/view-models/sponsor";
import axios from "../utils/axios";

/* JSS used for some styles on the page. */
const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

const companyName = [
  "Microsoft",
  "Amazon",
  "Tesla",
  "AMD",
  "Intel",
  "Johnson & Johnson",
  "SpaceX",
  "Suncor",
];

export default function Home() {
  const classes = useStyles();

  const [sponsors, setSponsors] = useState<ISponsorView[]>();

  useEffect(() => {
    let mounted = true;
    axios
      .get("/sponsors")
      .then((res) => {
        setSponsors(
          (res.data as ISponsorView[]).sort((x, y) =>
            x.name.localeCompare(y.name)
          )
        );
      })
      .catch((err) => console.error(err));

    return function cleanup() {
      mounted = false;
    };
  }, []);

  {
    /* The page content is served in a grid format, with spacing=3 being the spacing for the grid. It is responsive and will adjust to page resizing. Otherwise
  an image occupies the card media portion, and the content itself is in a typography material-ui tag. */
  }
  return (
    <div>
      <Head>
        <title>DEVELOPMENT - Dan Segin Golf Tournament Website</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavigationBar />
      {sponsors && (
        <div className="sponsorsContainer">
          <Grid container spacing={3}>
            {sponsors.map((sponsor, index) => {
              return (
                <Grid item key={index}>
                  <Card className={classes.root}>
                    <CardActionArea>
                      <CardMedia
                        className={classes.media}
                        image={sponsor.logoURL}
                        title={sponsor.name}
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                          {sponsor.name}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                        >
                          {sponsor.description}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    {sponsor.url && (
                      <CardActions>
                        <Button size="small" color="primary" href={sponsor.url}>
                          Learn More
                        </Button>
                      </CardActions>
                    )}
                  </Card>
                </Grid>
              );
            })}

            {/* {companyName.map((company, index) => {
              return (
                <Grid item>
                  <Card className={classes.root}>
                    <CardActionArea>
                      <CardMedia
                        className={classes.media}
                        image={`sponsors/${company.toLowerCase()}_logo.png`}
                        title="Contemplative Reptile"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                          {company}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                        >
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua. Ut
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <CardActions>
                      <Button
                        size="small"
                        color="primary"
                        href="https://google.com"
                      >
                        Learn More
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              );
            })} */}
          </Grid>
        </div>
      )}
    </div>
  );
}
