import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Link from 'next/link'
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import MenuItem from '@material-ui/core/MenuItem';
import Badge from '@material-ui/core/Badge';

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
        <AppBar position="static" style={{ background: '#2a2929' }}>
          <Toolbar>
            <Link href="/">
              <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                <img src="dds_logo.png" alt="Girl in a jacket" width="100" height="50"/> 
              </IconButton>
            </Link>
            <Link href="/registration">
              <a className={classes.title}>
                Registration
              </a>
            </Link>
            <Link href="/donate">
            <a className={classes.title}>
                Donate
              </a>
            </Link>
            <Link href="/sponsors">
            <a className={classes.title}>
                Sponsors
              </a>
            </Link>
            <Link href="/events">
            <a className={classes.title}>
                Events
              </a>
            </Link>
            <Link href="/photos">
            <a className={classes.title}>
                Photos
              </a>
            </Link>
            <Link href="/auction">
            <a className={classes.title}>
                Auction
              </a>
            </Link>
            <Link href="/store">
            <a className={classes.title}>
                Store
              </a>
            </Link>
            <Link href="/about">
            <a className={classes.title}>
                About
              </a>
            </Link>
            <MenuItem>
            <Link href="/shoppingCart">
              <IconButton aria-label="show 11 new notifications" color="inherit">
                <Badge badgeContent={11} color="secondary">
                  <ShoppingCart />
                </Badge>
              </IconButton>
            </Link>
      </MenuItem>
          </Toolbar>
        </AppBar>
       </div>
  )
}
