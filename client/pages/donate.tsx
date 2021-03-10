import React from 'react';
import clsx from 'clsx';
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { makeStyles } from '@material-ui/core/styles';
import NavigationBar from './components/navigationBar'
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Checkbox from '@material-ui/core/Checkbox';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Button from '@material-ui/core/Button';
const currencies = [
  {
    value: 'USD',
    label: '$',
  },
  {
    value: 'EUR',
    label: '€',
  },
  {
    value: 'BTC',
    label: '฿',
  },
  {
    value: 'JPY',
    label: '¥',
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: '25ch',
  },
}));

export default function Home() {
  const classes = useStyles();
  const [currency, setCurrency] = React.useState('EUR');
  const [values, setValues] = React.useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  });
  return (
    <div>
      <NavigationBar/>
      <div className={styles.container}>
        <Head>
          <title>DEVELOPMENT - Dan Segin Golf Tournament Website</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className={styles.main}>
            <h2> Donation </h2>
            <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
            <p> Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
 </p>

            <h3> Donation Info </h3>
            <hr></hr>
            <form className={classes.root} noValidate autoComplete="off">
            <FormControl className={classes.margin} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            value={values.amount}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            labelWidth={60}
          />
        </FormControl>
        <FormControl className={classes.margin} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-amount">First Name</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            value={values.amount}
            startAdornment={<InputAdornment position="start"></InputAdornment>}
            labelWidth={60}
          />
        </FormControl>
        <FormControl className={classes.margin} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-amount">Last Name</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            value={values.amount}
            startAdornment={<InputAdornment position="start"></InputAdornment>}
            labelWidth={60}
          />
        </FormControl>
            <br></br>
          </form>
          <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">Sponsor a Hole</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox name="gilad" />}
            label="Would you like to sponsor a hole? ($150)"
          />
        </FormGroup>
        <FormHelperText>*You will be redirected to the sponsor form if this option is selected</FormHelperText>
      </FormControl>
      <br></br>
      <Button variant="contained" color="secondary">
        Add to Cart
      </Button>
        </main>
      </div>
    </div>
  )
}
