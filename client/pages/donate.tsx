/*
    Author: David Melnyk
    This page serves as the donation page for the website.
*/

import React, { useState, useEffect, FormEvent } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { makeStyles } from "@material-ui/core/styles";
import NavigationBar from "./components/navigationBar";
import FormControl from "@material-ui/core/FormControl";
import { loadStripe } from "@stripe/stripe-js";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  InputAdornment,
} from "@material-ui/core";
import axios from "../utils/axios";
import IDonationView from "@local/shared/view-models/donation";
import { TextField } from "@material-ui/core";
import SubmitButton from "./components/submitButton";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  margin: {
    margin: theme.spacing(5),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: "25ch",
  },
}));

const sponsorPrice = 15000;

export default function Home() {
  /* State variables used throughout the application */
  const [amount, setAmount] = useState(0);
  const [amountError, setAmountError] = useState(false);
  const [amountInput, setAmountInput] = useState("");
  const [sponsorHole, setSponsorHole] = useState(false);

  const classes = useStyles();

  /* Handles the email changed event */
  /* Handles the amount changed event */
  const handleAmountInput = (event: React.ChangeEvent<{ value: string }>) => {
    setAmountInput(event.target.value);
  };

  /* Handles the final payment at the end */
  const handleClick = (e: React.MouseEvent) => {
    let tempAmount = amount;
    if (sponsorHole) tempAmount += sponsorPrice;
    let body: IDonationView = {
      amount: tempAmount,
      type: "donation",
      sponsorAHole: sponsorHole,
    };

    axios
      .post("/donations", body)
      .then(() => {
        window.location.href = "/shoppingCart";
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleAmountBlur = () => {
    let temp: number;
    if (!/^\d+\.\d{2}$/.test(amountInput)) {
      temp = parseFloat(amountInput);
      if (isNaN(temp)) temp = 0;
      setAmountInput(temp.toFixed(2));
    }
    setAmount(parseInt(amountInput) * 100);
    setAmountError(!(parseInt(amountInput) * 100));
  };

  return (
    <>
      <NavigationBar />
      <Head>
        <title>DEVELOPMENT - Dan Segin Golf Tournament Website</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <img
          src="https://g.foolcdn.com/editorial/images/420156/donate-jar.jpg"
          alt="Donation Jar"
          height="400"
        />
        <h2> Donation </h2>
        <p>
          {" "}
          Please feel free to make a donation to the Heart & Stroke Foundation.{" "}
        </p>
        <p>
          {" "}
          Please note that all donations larger than $20 will receive a
          charitable tax receipt. (Please allow up to 4 weeks for processing of
          reciept)
        </p>
        <p>Your information will be collected during the checkout process.</p>
        <h3> Donation Info </h3>
        <hr />
        <form className={classes.root} noValidate autoComplete="off">
          <FormControl className={classes.margin} variant="outlined">
            <TextField
              required
              className="standard-required"
              value={amountInput}
              placeholder="Amount"
              label="Amount"
              error={amountError}
              helperText={amountError && "Please enter an Amount"}
              onChange={handleAmountInput}
              onBlur={handleAmountBlur}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
              id="outlined-adornment-amount"
            />
          </FormControl>
        </form>
        <FormControl component="fieldset" className={classes.margin}>
          <FormLabel component="legend">Sponsor a Hole</FormLabel>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  name="gilad"
                  value={sponsorHole}
                  onChange={() => setSponsorHole(!sponsorHole)}
                />
              }
              label={`Would you like to sponsor a hole? ($${
                sponsorPrice / 100
              })`}
            />
          </FormGroup>
        </FormControl>
        <SubmitButton
          disabled={!amount && !sponsorHole}
          onClick={handleClick}
          loadText="Adding..."
        >
          Add to Cart
        </SubmitButton>
      </main>
    </>
  );
}
