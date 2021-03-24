/*
    Author: David Melnyk
    This page serves as the donation page for the website.
*/

import React, { useState, useEffect, FormEvent } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { makeStyles } from "@material-ui/core/styles";
import NavigationBar from "./components/navigationBar";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./components/checkoutForm";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import axios from "../utils/axios";

// Dummy data to use to test the json rendering
const checkoutData = {
  "registration":[
     {
        "amount":15000,
        "players":[
           {
              "firstName":"testing",
              "lastName":"hello",
              "mealChoice":"chicken"
           }
        ],
        "teeRange":"10AM-2PM"
     },
     {
        "amount":15000,
        "players":[
           {
              "firstName":"testing",
              "lastName":"hello",
              "mealChoice":"chicken"
           }
        ],
        "teeRange":"10AM-2PM",
        "foodChoice":"beef"
     }
  ],
  "donation":[
     {
        "amount":150,
        "donor":{
           "firstName":"testing",
           "lastName":"testing 2",
           "email":"test@test.com"
        }
     }
  ]
}
// A few constants and jss used on this page. 
const promise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: "25ch",
  },
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
}));

// The constructor for checkout.
export default function Home() {
  var [donateAmount, setAmount] = useState("");
  var [totalAmount, setAmount] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const classes = useStyles();
  const handleEmail = (event: React.ChangeEvent<{ value: unknown }>) => {
    setEmail(event.target.value as string);
  };
  const handleAmount = (event: React.ChangeEvent<{ value: unknown }>) => {
    setAmount(event.target.value as string);
  };
  const handleFirstName = (event: React.ChangeEvent<{ value: string }>) => {
    setFirstName(event.target.value);
  };
  const handleLastName = (event: React.ChangeEvent<{ value: string }>) => {
    setLastName(event.target.value);
  };

  // Getting the amounts and setting them to data from the json. toFixed sets the decimals points to two.
  donateAmount = checkoutData.donation[0].amount; 
  donateAmount = donateAmount.toFixed(2)

  totalAmount = (parseInt(donateAmount) + 150000)/100
  totalAmount = totalAmount.toFixed(2)

  // Getting the /cart json data into the system.
  useEffect(() => {
    axios
      .get("/cart")
      .then((data) => console.log(data))
      .catch((err) => console.error(err));
  }, []);

  // Returning the jsx used in this page.
  return (
    <div>
      <NavigationBar />
      <div className={styles.container}>
        <Head>
          <title>DEVELOPMENT - Dan Segin Golf Tournament Website</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className={styles.main}>
          <h3> Check Out </h3>
          <hr />
          <Typography variant="h6" gutterBottom>
            Order summary
          </Typography>

          <List disablePadding>
            {
              checkoutData.hasOwnProperty('registration') &&
                <React.Fragment>
                  <ListItem className={classes.listItem} key="Registration">
                    <ListItemText primary="Registration" secondary="Test" />
                    <Typography variant="body2">$1500.00</Typography>
                  </ListItem>
                </React.Fragment>
            }
            {
              checkoutData.hasOwnProperty('donation') &&
                <React.Fragment>
                <ListItem className={classes.listItem} key="Registration">
                  <ListItemText primary="Donation" secondary="Thank you for the donation!" />
                  <Typography variant="body2">${donateAmount}</Typography>
                </ListItem>
              </React.Fragment>

            }

            <ListItem className={classes.listItem}>
              <ListItemText primary="Total" />
              <Typography variant="subtitle1" className={classes.total}>
                ${totalAmount}
              </Typography>
            </ListItem>

          </List>
          <form className={classes.root} noValidate autoComplete="off">
            <FormControl className={classes.margin} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-amount">
                First Name
              </InputLabel>
              <OutlinedInput
                onChange={handleFirstName}
                id="outlined-adornment-amount"
                startAdornment={
                  <InputAdornment position="start"></InputAdornment>
                }
                labelWidth={60}
              />
            </FormControl>
            <FormControl className={classes.margin} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-amount">
                Last Name
              </InputLabel>
              <OutlinedInput
                onChange={handleLastName}
                id="outlined-adornment-amount"
                startAdornment={
                  <InputAdornment position="start"></InputAdornment>
                }
                labelWidth={60}
              />
            </FormControl>
            <br></br>
          </form>
          <br />
          <Elements stripe={promise}>
            <CheckoutForm
              donator={{
                name: firstName,
                email: email,
                amount: parseInt(donateAmount),
              }}
            />
          </Elements>
        </main>
      </div>
    </div>
  );
}
