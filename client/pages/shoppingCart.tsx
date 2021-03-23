/*
    Author: David Melnyk
    This page serves as the donation page for the website.
*/

import React, { useState, useEffect, FormEvent } from "react";
import clsx from "clsx";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import Link from 'next/link'
import { makeStyles } from "@material-ui/core/styles";
import NavigationBar from "./components/navigationBar";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Checkbox from "@material-ui/core/Checkbox";
import FormLabel from "@material-ui/core/FormLabel";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Button from "@material-ui/core/Button";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./components/checkoutForm";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import axios from "../utils/axios";
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
const products = [
  { name: 'Donation ', desc: 'Thank you for the donation!', price: '$50.00' },
  { name: 'Sponsor a hole', desc: 'Another thing', price: '$5.00' },
  { name: 'Golf Tournament Registration', desc: 'Something else', price: '$7.50' },
];
const payments = [
  { name: "Card type", detail: "Visa" },
  { name: "Card holder", detail: "Mr John Smith" },
  { name: "Card number", detail: "xxxx-xxxx-xxxx-1234" },
  { name: "Expiry date", detail: "04/2024" },
];
export default function Home() {
  // useEffect(() => {}, []);
  const [amount, setAmount] = useState("");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const classes = useStyles();
  const handleEmail = (event: React.ChangeEvent<{ value: unknown }>) => {
    setEmail(event.target.value as string);
  };
  const handleAmount = (event: React.ChangeEvent<{ value: unknown }>) => {
    setAmount(event.target.value as string);
  };
  const handleFirstName = (event: React.ChangeEvent<{ value: unknown }>) => {
    setFirstName(event.target.value as string);
  };

  useEffect(() => {
    axios
      .get("/cart")
      .then((data) => console.log(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <NavigationBar />
      <div className={styles.container}>
        <Head>
          <title>DEVELOPMENT - Dan Segin Golf Tournament Website</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className={styles.main}>
          <h3> Shopping Cart </h3>
          <hr />
          <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {products.map((product) => (
          <ListItem className={classes.listItem} key={product.name}>
            <ListItemText primary={product.name} secondary={product.desc} />
            <Typography variant="body2">{product.price}</Typography>
          </ListItem>
        ))}
        <ListItem className={classes.listItem}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" className={classes.total}>
            $34.06
          </Typography>
        </ListItem>
      </List>
          <br />
          <Link href="/checkout">
            <Button variant="contained" color="secondary">
              Checkout
            </Button>
          </Link>
        </main>
      </div>
    </div>
  );
}
