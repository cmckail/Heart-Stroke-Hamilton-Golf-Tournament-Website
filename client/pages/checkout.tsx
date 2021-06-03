/*
    Author: David Melnyk, Connor Mckail
    This page serves as the donation page for the website.
*/

import React, { useState, useEffect } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { makeStyles } from "@material-ui/core/styles";
import NavigationBar from "./components/navigationBar";
import DDSFooter from "./components/footer";
import FormControl from "@material-ui/core/FormControl";
import { loadStripe } from "@stripe/stripe-js";
import Typography from "@material-ui/core/Typography";
import axios from "../utils/axios";
import ItemList from "./components/itemList";
import IItemView from "@local/shared/view-models/item";
import IPersonView from "@local/shared/view-models/person";
import { TextField } from "@material-ui/core";
import useInputField from "../utils/useInputField";
import SessionUserData from "@local/shared/view-models/session";
import SubmitButton from "./components/submitButton";

// Dummy data to use to test the json rendering
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
  const [firstName, handleFirstName, firstNameError, handleFirstNameBlur] =
    useInputField("", {
      required: true,
    });
  const [lastName, handleLastName, lastNameError, handleLastNameBlur] =
    useInputField("", {
      required: true,
    });
  const [email, handleEmail, emailError, handleEmailBlur] = useInputField("", {
    required: true,
    validateEmail: true,
  });
  const [emailFocus, setEmailFocus] = useState(false);
  const [data, setData] = useState<SessionUserData>();
  const classes = useStyles();

  const handleClick = async () => {
    const stripe = await promise;

    let data: IPersonView = {
      firstName,
      lastName,
      email,
    };

    const response = await axios.post("/payment", data);
    const sessionId = await response.data.id;

    const result = await stripe?.redirectToCheckout({
      sessionId,
    });

    if (result?.error) {
      console.error(result.error.message);
    }
  };

  const getTotal = () => {
    let total = 0;
    if (data) {
      let keys = Object.keys(data) as Array<keyof SessionUserData>;
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

          {data && <ItemList data={data} />}

          <form className={classes.root} noValidate autoComplete="off">
            <FormControl className={classes.margin} variant="outlined">
              <TextField
                value={firstName}
                onBlur={handleFirstNameBlur}
                onChange={handleFirstName}
                id="outlined-adornment-amount"
                label="First Name"
                error={firstNameError}
                helperText={firstNameError && "Please enter first name."}
                required
              />
            </FormControl>
            <FormControl className={classes.margin} variant="outlined">
              <TextField
                value={lastName}
                onBlur={handleLastNameBlur}
                onChange={handleLastName}
                id="outlined-adornment-amount"
                label="Last Name"
                error={lastNameError}
                helperText={lastNameError && "Please enter last name."}
                required
              />
            </FormControl>
            <FormControl className={classes.margin} variant="outlined">
              <TextField
                value={email}
                onBlur={(e) => {
                  setEmailFocus(false);
                  handleEmailBlur(e);
                }}
                onFocus={() => setEmailFocus(true)}
                onChange={handleEmail}
                id="outlined-adornment-amount"
                label="Email"
                error={emailError && !emailFocus}
                helperText={
                  emailError && !emailFocus && "Please enter a valid email."
                }
                required
              />
            </FormControl>
            <br></br>
          </form>
          <br />
          {total > 0 && (
            <SubmitButton
              onClick={handleClick}
              disabled={
                firstNameError ||
                lastNameError ||
                emailError ||
                !firstName ||
                !lastName ||
                !email
              }
            >
              Checkout
            </SubmitButton>
          )}
        </main>
      </div>
      <DDSFooter/>
    </div>
  );
}
