/*
    Author: David Melnyk, Connor Mckail
    This page serves as the registration page for the website.
*/

import Head from "next/head";
import React, { useEffect, useReducer } from "react";
import styles from "../styles/Home.module.css";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import NavigationBar from "./components/navigationBar";
import TextField from "@material-ui/core/TextField";
import { Button, FormControl } from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import IRegistrationView, {
  IPlayerView,
} from "@local/shared/view-models/registration";
import axios from "../utils/axios";
import SubmitButton from "./components/submitButton";

const pricePerPerson = 175;

/* These serve as arrays used within the dropdown menus in JSX.  */
const mealOptions = [
  {
    value: "Regular Lunch",
    label: "Regular Lunch",
  },
  {
    value: "Vegetarian",
    label: "Vegetarian",
  },
  {
    value: "Gluten-Free",
    label: "Gluten-Free",
  },
];

const teeTimeOptions = [
  {
    value: "Early Morning",
    label: "Early Morning",
  },
  {
    value: "Mid Morning",
    label: "Mid Morning",
  },
  {
    value: "Late Morning",
    label: "Late Morning",
  },
];
/* JSS styles used in some material ui components.  */
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
      margin: theme.spacing(4),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  })
);

/* Defining a type for actions */
enum ActionKind {
  SetMeal,
  SetNumPlayers,
  SetTeeTime,
  SetFirstName,
  SetLastName,
  SetValidation,
}

/* These serve as validation arrays used in the jsx. */
type ValidationPayload = {
  name: string;
  validated: boolean;
};

type ValidationState = {
  firstName: boolean;
  lastName: boolean;
  mealChoice: boolean;
};

type Action = {
  type: ActionKind;
  payload: string | number | ValidationPayload;
  index?: number;
};

/* All state variables*/
type State = {
  numPlayers: number;
  playerInfo: IPlayerView[];
  teeTime: string;
  total: number;
  validated: ValidationState[];
};

export default function Home() {
  const classes = useStyles();

  /* Intializing state variables, almost like a constructor.  */
  const initialState: State = {
    numPlayers: 1,
    playerInfo: [
      {
        player: { firstName: "", lastName: "" },
        mealChoice: mealOptions[0].value,
      },
      {
        player: { firstName: "", lastName: "" },
        mealChoice: mealOptions[0].value,
      },
      {
        player: { firstName: "", lastName: "" },
        mealChoice: mealOptions[0].value,
      },
      {
        player: { firstName: "", lastName: "" },
        mealChoice: mealOptions[0].value,
      },
    ],
    validated: [
      { firstName: true, lastName: true, mealChoice: true },
      { firstName: true, lastName: true, mealChoice: true },
      { firstName: true, lastName: true, mealChoice: true },
      { firstName: true, lastName: true, mealChoice: true },
    ],
    teeTime: teeTimeOptions[0].value,
    total: pricePerPerson,
  };

  const playerReducer = (state: State, action: Action): State => {
    const { type, payload, index } = action;

    /* A function to set the first name and return validation */
    function setName(type: string) {
      let validated = state.validated;
      let info = state.playerInfo;
      if (!info[index!]) {
        info[index!] = {
          player: { firstName: "", lastName: "" },
          mealChoice: "",
        };
      }
      info[index!].player[type] = payload as string;
      validated[index!][type] = !!(payload as string).trim();
      return {
        ...state,
        playerInfo: info,
        validated,
      };
    }
    switch (type) {
      case ActionKind.SetMeal:
        let info = state.playerInfo;
        info[index!].mealChoice = payload as string;
        return {
          ...state,
          playerInfo: info,
        };
      case ActionKind.SetNumPlayers:
        return {
          ...state,
          numPlayers: payload as number,
          total: (payload as number) * pricePerPerson,
        };
      case ActionKind.SetTeeTime:
        return {
          ...state,
          teeTime: payload as string,
        };
      case ActionKind.SetFirstName:
        return setName("firstName");
      case ActionKind.SetLastName:
        return setName("lastName");
      case ActionKind.SetValidation:
        let validated = state.validated;
        validated[index!][(payload as ValidationPayload).name] = (
          payload as ValidationPayload
        ).validated;
        return {
          ...state,
          validated,
        };
    }
  };

  const [state, dispatch] = useReducer(playerReducer, initialState);

  /* A function used to validate data used in the registration page. Disables the button if things are not validated. */
  const validateData = () => {
    return state.playerInfo
      .slice(0, state.numPlayers)
      .every(
        (item) =>
          item.player.firstName.trim() &&
          item.player.lastName.trim() &&
          item.mealChoice.trim()
      );
  };

  /* This event handles the submission of the registration page */
  const handleSubmit = async (e: React.MouseEvent) => {
    let data: IRegistrationView = {
      players: state.playerInfo.slice(0, state.numPlayers),
      teeRange: state.teeTime,
      amount: state.total * 100,
    };

    let res = await axios.post("/registration", data);

    if (res.status < 400) {
      window.location.href = "/shoppingCart";
    }
  };

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
            4).{" "}
          </p>
          <br></br>
          <p>** ${pricePerPerson} Per Player </p>
          <h3> OTHER OTHER INFORMATION ABOUT THE TOURNAMENT HERE</h3>
          {/* Beginning of the form */}
          <div>
            <FormControl className={classes.formControl}>
              <InputLabel id="tee-time-selector-label">Tee Times</InputLabel>

              <Select
                className={classes.root}
                id="tee-time-selector"
                labelId="tee-time-selector-label"
                value={state.teeTime}
                onChange={(e) =>
                  dispatch({
                    type: ActionKind.SetTeeTime,
                    payload: e.target.value as string,
                  })
                }
              >
                {teeTimeOptions.map((item, index) => {
                  return (
                    <MenuItem key={index} value={item.value}>
                      {item.label}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel id="num-players-selector-label">Players</InputLabel>
              <Select
                className={classes.root}
                id="num-players-selector"
                labelId="num-players-selector-label"
                value={state.numPlayers}
                onChange={(e) =>
                  dispatch({
                    type: ActionKind.SetNumPlayers,
                    payload: e.target.value as number,
                  })
                }
              >
                <MenuItem value={1}>One</MenuItem>
                <MenuItem value={2}>Two</MenuItem>
                <MenuItem value={3}>Three</MenuItem>
                <MenuItem value={4}>Four</MenuItem>
              </Select>
            </FormControl>
          </div>
          {/* This array is used to populate the player JSX forms */}
          {[...Array(state.numPlayers)].map((item, index) => {
            return (
              <React.Fragment key={index}>
                <h3> Player {index + 1}</h3>
                <hr></hr>
                <form className={classes.root} noValidate autoComplete="off">
                  <TextField
                    margin="normal"
                    required
                    className="standard-required"
                    placeholder="First Name"
                    label="First Name"
                    error={!state.validated[index].firstName}
                    helperText={
                      !state.validated[index].firstName &&
                      "Please enter your first name."
                    }
                    value={state.playerInfo[index].player.firstName}
                    onChange={(e) => {
                      dispatch({
                        type: ActionKind.SetFirstName,
                        payload: e.target.value as string,
                        index,
                      });
                    }}
                  />
                  <TextField
                    required
                    margin="normal"
                    className="standard-required"
                    label="Last Name"
                    // placeholder="Last Name"
                    error={!state.validated[index].lastName}
                    helperText={
                      !state.validated[index].lastName &&
                      "Please enter your last name."
                    }
                    value={state.playerInfo[index].player.lastName}
                    onChange={(e) => {
                      dispatch({
                        type: ActionKind.SetLastName,
                        payload: e.target.value as string,
                        index,
                      });
                    }}
                  />
                  <TextField
                    className={classes.root}
                    select
                    margin="normal"
                    required
                    SelectProps={{
                      value: state.playerInfo[index].mealChoice,
                      onChange: (e) =>
                        dispatch({
                          type: ActionKind.SetMeal,
                          payload: e.target.value as string,
                          index,
                        }),
                    }}
                    error={!state.validated[index].mealChoice}
                    label="Meal Choice"
                    helperText={
                      !state.validated[index].mealChoice &&
                      "Please select your meal."
                    }
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
          {/* The total amount of all players added up */}
          <h3>Total: ${state.total}</h3>
          <SubmitButton
            onClick={handleSubmit}
            disabled={!validateData()}
            loadText="Adding..."
          >
            Add to Cart
          </SubmitButton>
        </main>
      </div>
    </div>
  );
}
