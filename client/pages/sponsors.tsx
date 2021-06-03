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
  {
    "name": "Gator Ted's",
    "description": "The Kindos Family that owns this iconic Burlington Sports Pub, has also been a loyal friend of the Segin Family, and supporter of our event since the beginning. Gator ‘Ted’, Sisters Mary Anne and Michelle, and of course ‘Ma’ Kindos are an amazing & charitable family that we are proud to call friends.",
    "url": "https://www.gatorteds.ca/",
    "logoURL": "sponsors/gator_teds_logo.jpg"
},
{
    "name": "Routes",
    "description": "Routes Transport has been associated with our tournament since its inception in 2014. Virgil Macera, President of Routes, feels that ‘Giving Is Vital For Happiness’ And his support as Cart Sponsor each year helps push us toward our target goals.",
    "url": "https://routestransport.com/",
    "logoURL": "sponsors/routes_logo.png"
},
{
    "name": "Landshark",
    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    "url": "https://tesla.ca",
    "logoURL": "sponsors/landshark_logo.png"
},
{
    "name": "Flamborough Hills",
    "description": "Flamborough Hills has been our home course for our event from the beginning. Owners    Tom & Lisa DeJonge’s support has been simply amazing, and the venue at Flamborough Hills provides a challenging, yet beautiful setting for a tournament. Head Golf Professional Nigel Bowerman has assisted our family in putting together an event each year that is always tough to measure up to.",
    "url": "https://www.flamboroughhills.com/",
    "logoURL": "sponsors/flamborough_hills_logo.png"
},
{
    "name": "Waterloo Brewing",
    "description": "Waterloo Brewery is our Beer Partner for our 2021 Golf Tournament. We are honoured to have them provide our golfers with a wonderful Thank You gift from Land Shark Beer.",
    "url": "https://waterloobrewing.com",
    "logoURL": "sponsors/waterloo_brewing_logo.png"
},
{
    "name": "QB’s Sports Bar Grille ",
    "description": "Owner Mike Marcolin and his staff at QB’s has been a mainstay supporter to our event from the beginning. QB’s is a Burlington Institution when it comes to Sports Bars in the Halton area. It’s massive dining room, games room and too many TV’s to count, make it a perfect place for families, sports teams and kids to enjoy an evening out. ",
    "url": "https://www.qbsports.com/",
    "logoURL": "sponsors/QBSports_logo.png"
},
{
    "name": "Fox40 International",
    "description": "Fox40 is famous for the ‘pealess whistle’ that is used in the NBA, NHL, NFL, CFL and all over the world where officiating is required. BUt they have also been a major supporter of our event each year through the generosity of Dave Foxcroft, President at Fox40. His donations and support raise a great portion each & every year. We are lucky to have a great corporate partner like the Foxcroft Family.",
    "url": "https://www.fox40world.com/",
    "logoURL": "sponsors/fox40_logo.png"
},
{
    "name": "Bunzl International",
    "description": "Visit Bunzl Canada’s website and it states ‘Global Provider of A Lot More Than You Think’, and they are more than an industry leader in the food and retail packaging, cleaning supplies and equipment, safety products and industrial packaging sectors… President John Howlett’s generosity each and every year to our tournament not only holds a special place to our family, his generosity has helped raise thousands of dollars each and every year.  We thank the Howlett & Bunzl family for their ongoing support.",
    "url": "https://www.bunzlcanada.ca/",
    "logoURL": "sponsors/bunzl_logo.png"
},
{
    "name": "The Judge & Jury",
    "description": "Andy Marcolini & Mark Hopkins, Owners of the Judge & Jury are another amazing friend of our tournament since day #1. The generosity provided makes our prize table a discussion piece each & every year. The ‘Judge’ is another long standing popular Burlington Pub that has lasted because of simple principles: Great Food , Outstanding Customer Service and Attention to detail. Our family is proud to have their support.",
    "url": "https://www.thejudgeandjury.ca/",
    "logoURL": "sponsors/judge_logo.png"
}
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
          <h2> Sponsors </h2>
          <p> We wish to thank our loyal Corporate Supporters That make our event possible each and every year. We invite you to take a peek at their websites and encourage you to support their business. You will not be disappointed. </p>
          <Grid container spacing={3}>
            {companyName.map((sponsor, index) => {
              return (
                <Grid item xs={3} key={index}>
                  <Card className={classes.root}>
                    <CardActionArea>
                    <CardMedia
                        alt={sponsor.name}
                        image={sponsor.logoURL}
                        title={sponsor.name}
                        component="img"
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
        <DDSFooter/>
    </div>
  );
}
