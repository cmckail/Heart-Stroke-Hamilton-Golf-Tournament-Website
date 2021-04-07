import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Link from "next/link";
import ShoppingCart from "@material-ui/icons/ShoppingCart";
import MenuItem from "@material-ui/core/MenuItem";
import Badge from "@material-ui/core/Badge";
import { useEffect, useState } from "react";
import axios from "../../utils/axios";

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

export default function NavigationBar({
  updateIcon,
  num,
}: {
  updateIcon?: boolean;
  num?: number;
}) {
  const classes = useStyles();

  const [numItems, setNumItems] = useState(0);
  const [initial, setInitial] = useState(true);

  useEffect(() => {
    let mounted = true;
    if (updateIcon || initial) {
      axios
        .get("/cart")
        .then((res) => {
          let total = 0;
          let data = res.data;

          total = Object.keys(data).reduce(
            (acc, key) => acc + (data[key] as any[]).length,
            0
          );
          if (mounted) {
            setNumItems(total);
            setInitial(false);
          }
        })
        .catch((err) => console.error(err));
    }
    return () => {
      mounted = false;
    };
  }, [updateIcon]);

  return (
    <div>
      <AppBar position="static" style={{ background: "#2a2929" }}>
        <Toolbar>
          <Link href="/">
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <img
                src="dds_logo.png"
                alt="Girl in a jacket"
                width="100"
                height="50"
              />
            </IconButton>
          </Link>
          <Link href="/registration">
            <a className={classes.title}>Registration</a>
          </Link>
          <Link href="/donate">
            <a className={classes.title}>Donate</a>
          </Link>
          <Link href="/sponsors">
            <a className={classes.title}>Sponsors</a>
          </Link>
          <Link href="/photos">
            <a className={classes.title}>Photos</a>
          </Link>
          <Link href="https://app.autographauthentic.com/bid-now">
            <a className={classes.title} target="_blank" rel="noreferrer">
              Auction
            </a>
          </Link>
          <Link href="/store">
            <a className={classes.title}>Store</a>
          </Link>
          <Link href="/about">
            <a className={classes.title}>About</a>
          </Link>
          <MenuItem>
            <Link href="/shoppingCart">
              <IconButton aria-label="show new items" color="inherit">
                <Badge badgeContent={numItems} color="secondary">
                  <ShoppingCart />
                </Badge>
              </IconButton>
            </Link>
          </MenuItem>
        </Toolbar>
      </AppBar>
    </div>
  );
}
