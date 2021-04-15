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
import Button from "@material-ui/core/Button";
import { loadStripe } from "@stripe/stripe-js";

import axios from "../utils/axios";
import IDonationView from "@local/shared/view-models/donation";
import { TextField } from "@material-ui/core";

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
  /* State variables used throughout the application */
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastname] = useState("");
  const [amount, setAmount] = useState(0);
  const [email, setEmail] = useState("");

  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [amountError, setAmountError] = useState(false);
  const [amountInput, setAmountInput] = useState("");

  const classes = useStyles();

  /* Handles the email changed event */
  const handleEmail = (event: React.ChangeEvent<{ value: string }>) => {
    setEmail(event.target.value);
    setEmailError(!event.target.value.trim());
  };
    /* Handles the amount changed event */
  const handleAmountInput = (event: React.ChangeEvent<{ value: string }>) => {
    setAmountInput(event.target.value);
  };
    /* Handles the first name changed event */
  const handleFirstName = (event: React.ChangeEvent<{ value: string }>) => {
    console.log(event.target.value);
    setFirstName(event.target.value);
    setFirstNameError(!event.target.value.trim());
  };
    /* Handles the last name changed event */
  const handleLastName = (event: React.ChangeEvent<{ value: string }>) => {
    setLastname(event.target.value);
    setLastNameError(!event.target.value.trim());
  };

  /* Handles the final payment at the end */
  const handleClick = (e: React.MouseEvent) => {
    if (!lastNameError && !firstNameError && !emailError && !amountError) {
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
    }
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
    setAmountError(!(parseInt(amountInput) * 100));
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
            Please feel free to make a donation to the Heart & Stroke
            Foundation.{" "}
          </p>
          <p>
            {" "}
            Please note that all donations larger than $20 will receive a
            charitable tax receipt. (Please allow up to 4 weeks for processing
            of reciept)
          </p>
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
                id="outlined-adornment-amount"
              />
            </FormControl>
            <FormControl className={classes.margin} variant="outlined">
              <TextField
                value={firstName}
                error={firstNameError}
                helperText={firstNameError && "Please Enter First Name"}
                required
                className="standard-required"
                placeholder="First Name"
                label="First Name"
                onChange={handleFirstName}
                id="outlined-adornment-amount"
              />
            </FormControl>
            <FormControl className={classes.margin} variant="outlined">
              <TextField
                required
                className="standard-required"
                value={lastName}
                placeholder="Last Name"
                label="Last Name"
                error={lastNameError}
                helperText={lastNameError && "Please Enter Last Name"}
                onChange={handleLastName}
                id="outlined-adornment-amount"
              />
            </FormControl>
            <br />
            <FormControl className={classes.margin} variant="outlined">
              <TextField
                required
                className="standard-required"
                value={email}
                placeholder="Email"
                label="Email"
                error={emailError}
                helperText={emailError && "Please Enter Email"}
                onChange={handleEmail}
                id="outlined-adornment-amount"
              />
            </FormControl>
            <br></br>
          </form>
          {/* <FormControl component="fieldset" className={classes.margin}>
            {/* <FormLabel component="legend">Sponsor a Hole</FormLabel> }
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
          </FormControl> }*/}
          <Button
            variant="contained"
            color="secondary"
            disabled={
              !(
                !!firstName.trim() &&
                !!lastName.trim() &&
                !!amount &&
                !!email.trim()
              )
            }
            onClick={handleClick}
          >
            Add to Cart
          </Button>
        </main>
      </div>
    </div>
  );
}
