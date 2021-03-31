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
import Typography from "@material-ui/core/Typography";
import axios from "../utils/axios";
import ItemList from "./components/itemList";
import IItemView from "@local/shared/view-models/item";
import ICartView from "../utils/interfaces/cartview";

// Dummy data to use to test the json rendering
const checkoutData = {
  registration: [
    {
      amount: 15000,
      players: [
        {
          firstName: "testing",
          lastName: "hello",
          mealChoice: "chicken",
        },
      ],
      teeRange: "10AM-2PM",
    },
    {
      amount: 15000,
      players: [
        {
          firstName: "testing",
          lastName: "hello",
          mealChoice: "chicken",
        },
      ],
      teeRange: "10AM-2PM",
      foodChoice: "beef",
    },
  ],
  donation: [
    {
      amount: 150,
      donor: {
        firstName: "testing",
        lastName: "testing 2",
        email: "test@test.com",
      },
    },
  ],
};
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
  const [total, setTotal] = useState(0);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [data, setData] = useState<ICartView>();
  const classes = useStyles();

  const handleEmail = (event: React.ChangeEvent<{ value: string }>) => {
    setEmail(event.target.value);
  };
  const handleFirstName = (event: React.ChangeEvent<{ value: string }>) => {
    setFirstName(event.target.value);
  };
  const handleLastName = (event: React.ChangeEvent<{ value: string }>) => {
    setLastName(event.target.value);
  };

  const getTotal = () => {
    let total = 0;
    if (data) {
      let keys = Object.keys(data) as Array<keyof ICartView>;
      keys.forEach((item) => {
        if (data[item]) {
          let x = data[item]!;

          (x as IItemView[]).forEach((item) => {
            if (item.amount) {
              total += item.amount;
            }
          });
        }
      });
    }
    return total;
  };

  // Getting the /cart json data into the system.
  useEffect(() => {
    let mounted = true;
    axios
      .get("/cart")
      .then((response) => {
        if (mounted) setData(response.data);
      })
      .catch((err) => console.error(err));

    return function cleanup() {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      setTotal(getTotal());
    }

    return function cleanup() {
      mounted = false;
    };
  }, [data]);

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

          {data ? <ItemList data={data} /> : null}

          <form className={classes.root} noValidate autoComplete="off">
            <FormControl className={classes.margin} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-amount">
                First Name
              </InputLabel>
              <OutlinedInput
                value={firstName}
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
                value={lastName}
                onChange={handleLastName}
                id="outlined-adornment-amount"
                startAdornment={
                  <InputAdornment position="start"></InputAdornment>
                }
                labelWidth={60}
              />
            </FormControl>
            <FormControl className={classes.margin} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-amount">Email</InputLabel>
              <OutlinedInput
                value={email}
                onChange={handleEmail}
                id="outlined-adornment-amount"
                startAdornment={
                  <InputAdornment position="start">@</InputAdornment>
                }
                labelWidth={60}
              />
            </FormControl>
            <br></br>
          </form>
          <br />
          {total > 0 ? (
            <Elements stripe={promise}>
              <CheckoutForm
                name={(firstName + " " + lastName).trim()}
                email={email}
                amount={total}
              />
            </Elements>
          ) : null}
        </main>
      </div>
    </div>
  );
}