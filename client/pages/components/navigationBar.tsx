import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Link from 'next/link'
import SvgIcon from '@material-ui/core/SvgIcon';

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

export default function NavigationBar() {
  const classes = useStyles();

  return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <Link href="/">
              <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                <img src="dds_logo.png" alt="Girl in a jacket" width="100" height="50"/> 
              </IconButton>
            </Link>
            <Link href="/registration">
              <Typography variant="h6" className={classes.title}>
                Registration
              </Typography>
            </Link>
            <Typography variant="h6" className={classes.title}>
              Donate
            </Typography>
            <Typography variant="h6" className={classes.title}>
              Sponsors
            </Typography>
            <Typography variant="h6" className={classes.title}>
              Events
            </Typography>
            <Typography variant="h6" className={classes.title}>
              Photos
            </Typography>
            <Typography variant="h6" className={classes.title}>
              Auction
            </Typography>
            <Typography variant="h6" className={classes.title}>
              Store
            </Typography>
            <Typography variant="h6" className={classes.title}>
              News
            </Typography>
          </Toolbar>
        </AppBar>
       </div>
  )
}
