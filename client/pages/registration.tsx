/*
    Author: David Melnyk, Connor Mckail
    This page serves as the registration page for the website.
*/

import Head from "next/head";
import React, { useEffect, useState, useRef } from "react";
import styles from "../styles/Home.module.css";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import NavigationBar from "./components/navigationBar";
import TextField from "@material-ui/core/TextField";
import { FormControl } from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  })
);

export default function Home() {
  const classes = useStyles();

  const [numPlayers, setNumPlayers] = useState("");
  const [teeTimes, setTeeTimes] = useState("");

  const handleNumPlayers = (event: React.ChangeEvent<{ value: unknown }>) => {
    setNumPlayers(event.target.value as string);
  };

  const handleTeeTimes = (event: React.ChangeEvent<{ value: unknown }>) => {
    setTeeTimes(event.target.value as string);
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
          <h2> Tournament Registration </h2>
          <p>
            {" "}
            Please choose a Tee Time and number of players in your group (max of
            4). Choose continue to checkout to pay for registration, or add to
            cart to continue shopping{" "}
          </p>
          <br></br>
          <p>** $165 Per Player </p>
          <h3> OTHER OTHER INFORMATION ABOUT THE TOURNAMENT HERE</h3>
          <FormControl className={classes.formControl}>
            <InputLabel id="tee-time-selector-label">
              Tee Times
            </InputLabel>
            <Select
              className={classes.root}
              id="tee-time-selector"
              labelId="tee-time-selector-label"
              onChange={handleTeeTimes}
            >
              {
                //Request server for valid tee times
                //<MenuItem value={Value}>value in string </MenuItem>
              }
              <MenuItem value={1}>Early Morning</MenuItem>
              <MenuItem value={2}>Morning</MenuItem>
              <MenuItem value={3}>Afternoon</MenuItem>
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel id="tee-time-selector-label">
              Players
            </InputLabel>
            <Select
              className={classes.root}
              id="tee-time-selector"
              labelId="tee-time-selector-label"
              onChange={handleNumPlayers}
            >
              {
                //Request server for valid tee times
                //<MenuItem value={Value}>value in string </MenuItem>
              }
              <MenuItem value={1}>One</MenuItem>
              <MenuItem value={2}>Two</MenuItem>
              <MenuItem value={3}>Three</MenuItem>
              <MenuItem value={3}>Four</MenuItem>
            </Select>
          </FormControl>
          <h3> Player 1</h3>
          <hr></hr>
          <form className={classes.root} noValidate autoComplete="off">
            <TextField
              required
              id="standard-required"
              label="First Name"
              defaultValue="First Name"
            />
            <TextField
              required
              id="standard-required"
              label="Last Name"
              defaultValue="Last Name"
            />
            <TextField
              id="standard-select-currency"
              select
              label="Meal Choice"
              helperText="Please select your meal"
            />
          </form>
          <h3> Player 2</h3>
          <hr></hr>
          <form className={classes.root} noValidate autoComplete="off">
            <TextField
              required
              id="standard-required"
              label="First Name"
              defaultValue="First Name"
            />
            <TextField
              required
              id="standard-required"
              label="Last Name"
              defaultValue="Last Name"
            />
            <TextField
              id="standard-select-currency"
              select
              label="Meal Choice"
              helperText="Please select your meal"
            />
          </form>
          <h3> Player 3</h3>
          <hr></hr>
          <form className={classes.root} noValidate autoComplete="off">
            <TextField
              required
              id="standard-required"
              label="First Name"
              defaultValue="First Name"
            />
            <TextField
              required
              id="standard-required"
              label="Last Name"
              defaultValue="Last Name"
            />
            <TextField
              id="standard-select-currency"
              select
              label="Meal Choice"
              helperText="Please select your meal"
            />
          </form>
          <h3> Player 4</h3>
          <hr></hr>
          <form className={classes.root} noValidate autoComplete="off">
            <TextField
              required
              id="standard-required"
              label="First Name"
              defaultValue="First Name"
            />
            <TextField
              required
              id="standard-required"
              label="Last Name"
              defaultValue="Last Name"
            />
            <TextField
              id="standard-select-currency"
              select
              label="Meal Choice"
              helperText="Please select your meal"
            />
          </form>
        </main>
      </div>
    </div>
  );
}
