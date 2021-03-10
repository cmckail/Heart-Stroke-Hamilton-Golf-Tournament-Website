import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { makeStyles } from '@material-ui/core/styles';
import NavigationBar from './components/navigationBar'
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Home() {
  const classes = useStyles();

  return (
    <div>
      <NavigationBar/>
      <div className={styles.container}>
        <Head>
          <title>DEVELOPMENT - Dan Segin Golf Tournament Website</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className={styles.main}>
            <h2> Tournament Registration </h2>
            <p> Please choose a Tee Time and number of players in your group (max of 4). Choose continue to checkout to pay for registration, or add to cart to continue shopping </p>
            <br></br>
            <p>** $165 Per Player </p>
            <h3> OTHER OTHER INFORMATION ABOUT THE TOURNAMENT HERE</h3>
          <form className={classes.root} noValidate autoComplete="off">
            <TextField
              id="standard-select-currency"
              select
              label="Tee Time"
              helperText="Please select your number of players"
            />
            <TextField
              id="standard-select-currency"
              select
              label="# of Players" 
              helperText="Please select your Tee Time"
            />
          </form>

            <h3> Player 1</h3>
            <hr></hr>
            <form className={classes.root} noValidate autoComplete="off">
            <TextField required id="standard-required" label="First Name" defaultValue="First Name" />
            <TextField required id="standard-required" label="Last Name" defaultValue="Last Name" />
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
            <TextField required id="standard-required" label="First Name" defaultValue="First Name" />
            <TextField required id="standard-required" label="Last Name" defaultValue="Last Name" />
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
  )
}
