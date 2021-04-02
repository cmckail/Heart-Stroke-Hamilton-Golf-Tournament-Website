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
import { Button, FormControl } from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

const mealOptions = [
  {
    value: 'Vegetarian',
    label: 'Vegetarian',
  },
  {
    value: 'Boxed Lunch',
    label: 'Boxed Lunch',
  },
  {
    value: 'Gluten-Free',
    label: 'Gluten-Free',
  },
];

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

  const [numPlayers, setNumPlayers] = useState(1);
  const [teeTimes, setTeeTimes] = useState("");
  // const [selectedNumPlayers, setSelectedNumPlayers] = useState("One");

  const handleTeeTimes = (event: React.ChangeEvent<{ value: string }>) => {
    setTeeTimes(event.target.value);
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
            <InputLabel id="tee-time-selector-label">Tee Times</InputLabel>
            <Select
              className={classes.root}
              id="tee-time-selector"
              labelId="tee-time-selector-label"
              // onSelect={handleTeeTimes}
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
            <InputLabel id="tee-time-selector-label">Players</InputLabel>
            <Select
              className={classes.root}
              id="tee-time-selector"
              labelId="tee-time-selector-label"
              value={numPlayers}
              onChange={(e) => setNumPlayers(e.target.value as number)}
            >
              {
                //Request server for valid tee times
                //<MenuItem value={Value}>value in string </MenuItem>
              }
              <MenuItem value={1}>One</MenuItem>
              <MenuItem value={2}>Two</MenuItem>
              <MenuItem value={3}>Three</MenuItem>
              <MenuItem value={4}>Four</MenuItem>
            </Select>
          </FormControl>
          {[...Array(numPlayers)].map((item, index) => {
            return (
              <React.Fragment key={index}>
                <h3> Player {index + 1}</h3>
                <hr></hr>
                <form className={classes.root} noValidate autoComplete="off">
                  <TextField
                    required
                    className="standard-required"
                    placeholder="First Name"
                    label="First Name"
                  />
                  <TextField
                    required
                    className="standard-required"
                    label="Last Name"
                    placeholder="Last Name"
                  />
                  <TextField
                    className="standard-select-currency"
                    select
                    label="Meal Choice"
                    helperText="Please select your meal"
                  >
                  {mealOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                </form>
              </React.Fragment>
            );
          })}
          <Button
            variant="contained"
            color="secondary"
            // onClick={handleClick}
          >
            Add to Cart
          </Button>
        </main>
      </div>
    </div>
  );
}
