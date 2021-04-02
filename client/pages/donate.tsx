/*
    Author: David Melnyk
    This page serves as the donation page for the website.
*/

import React, { useState, useEffect, FormEvent } from "react";
import clsx from "clsx";
import Head from "next/head";
import styles from "../styles/Home.module.css";
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

import axios from "../utils/axios";
import IDonationView from "@local/shared/view-models/donation";

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
}));

export default function Home() {
  // useEffect(() => {}, []);
  const [amount, setAmount] = useState(0);
  const [amountInput, setAmountInput] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const classes = useStyles();

  const handleEmail = (event: React.ChangeEvent<{ value: string }>) => {
    setEmail(event.target.value);
  };
  const handleAmountInput = (event: React.ChangeEvent<{ value: string }>) => {
    setAmountInput(event.target.value);
  };
  const handleFirstName = (event: React.ChangeEvent<{ value: string }>) => {
    setFirstName(event.target.value);
  };
  const handleLastName = (event: React.ChangeEvent<{ value: string }>) => {
    setLastname(event.target.value);
  };

  const handleClick = (e: React.MouseEvent) => {
    let body: IDonationView = {
      amount,
      donor: {
        firstName,
        lastName,
        email,
      },
    };

    axios
      .post("/donations", body)
      .then((res) => {
        window.location.href = "/shoppingCart";
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // const handleKeyDown = (event: React.KeyboardEvent) => {
  //   let code = event.key;

  //   if (isNaN(parseInt(code)) && code !== ".")

  //   try {
  //     let x = parseInt(code);
  //     console.log(typeof x);
  //   } catch (e) {
  //     console.error(e);
  //   }
  // };

  const handleAmountBlur = () => {
    let temp: number;
    if (!/^\d+\.\d{2}$/.test(amountInput)) {
      temp = parseFloat(amountInput);
      if (isNaN(temp)) temp = 0;
      setAmountInput(temp.toFixed(2));
    }
    setAmount(parseInt(amountInput) * 100);
  };

  useEffect(() => {}, []);

  return (
    <div>
      <NavigationBar />
      <div className={styles.container}>
        <Head>
          <title>DEVELOPMENT - Dan Segin Golf Tournament Website</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className={styles.main}>
          <h2> Donation </h2>
          <p>
            {" "}
            Please feel free to make a donation to the Heart & Stroke Foundation. {" "}
          </p>
          <p>
            {" "}
            Please note that all donations larger than $20 will receive a charitable tax receipt. (Please allow up to 4 weeks for processing of reciept)
          </p>
          <h3> Donation Info </h3>
          <hr />
          <form className={classes.root} noValidate autoComplete="off">
            <FormControl className={classes.margin} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-amount">
                Amount
              </InputLabel>
              <OutlinedInput
                // onKeyDown={handleKeyDown}
                value={amountInput}
                onChange={handleAmountInput}
                onBlur={handleAmountBlur}
                id="outlined-adornment-amount"
                startAdornment={
                  <InputAdornment position="start">$</InputAdornment>
                }
                labelWidth={60}
              />
            </FormControl>
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
            <br />
            <FormControl className={classes.margin} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-amount">Email</InputLabel>
              <OutlinedInput
                onChange={handleEmail}
                id="outlined-adornment-amount"
                startAdornment={
                  <InputAdornment position="start"></InputAdornment>
                }
                labelWidth={60}
              />
            </FormControl>
            <br></br>
          </form>
          <FormControl component="fieldset" className={classes.margin}>
            <FormLabel component="legend">Sponsor a Hole</FormLabel>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox name="gilad" />}
                label="Would you like to sponsor a hole? ($150)"
              />
            </FormGroup>
            <FormHelperText>
              *You will be redirected to the sponsor form if this option is
              selected
            </FormHelperText>
          </FormControl>
          <br />
          <Button variant="contained" color="secondary" onClick={handleClick}>
            Add to Cart
          </Button>
        </main>
      </div>
    </div>
  );
}
