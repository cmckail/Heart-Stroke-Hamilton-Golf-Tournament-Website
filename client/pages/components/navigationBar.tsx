/*
  Author: David Melnyk, Connor Mckail
  This navigation bar is used on most pages in the site, it is imported as a component at the top of the screen.
*/

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Link from "next/link";
import ShoppingCart from "@material-ui/icons/ShoppingCart";
import MenuIcon from "@material-ui/icons/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Badge from "@material-ui/core/Badge";
import React, { useEffect, useState } from "react";
import axios from "../../utils/axios";
import { Drawer } from "@material-ui/core";

// JSS used in some of the styles for the framework Material-Ui
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    textAlign: "center",
    color: "white",
    "&:hover": {
      color: "#8c8985",
    },
  },
  paper: {
    background: "#2a2929",
    padding: "2em",
  },
  NavigationBar: {
    backgroundColor: "#0a0200",
  },
}));

const navLinks = [
  { title: "Registration", path: "/registration" },
  { title: "Donate", path: "/donate" },
  { title: "Sponsors", path: "/sponsors" },
  {
    title: "Auction",
    path: "https://app.autographauthentic.com/bn/clients/ddsmemorial",
    opts: { target: "_blank", rel: "noreferrer" },
  },
  { title: "About", path: "/about" },
];

export default function NavigationBar({
  updateIcon,
  num,
}: {
  updateIcon?: boolean;
  num?: number;
}) {
  const classes = useStyles();

  const [numItems, setNumItems] = useState(num || 0);
  const [initial, setInitial] = useState(true);

  const [mobile, setMobile] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    let mounted = true;
    if ((updateIcon || initial) && num === undefined) {
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

  useEffect(() => {
    function setResponsiveness() {
      setMobile(window.innerWidth < 900);
    }

    window.addEventListener("resize", setResponsiveness);
    setResponsiveness();

    return () => window.removeEventListener("resize", setResponsiveness);
  }, []);

  const displayMobile = () => {
    return (
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={() => setDrawerOpen(true)}
        >
          <MenuIcon />
        </IconButton>
        <Drawer
          classes={{ paper: classes.paper }}
          anchor="left"
          open={drawerOpen}
          color="#2a2929"
          onClose={() => setDrawerOpen(false)}
        >
          <div
            style={{ display: "flex", flexDirection: "column", height: "50%" }}
          >
            <Link href="/">
              <a className={classes.title}>Home</a>
            </Link>
            {navLinks.map((item, index) => {
              return (
                <Link href={item.path} key={index}>
                  <a className={classes.title} {...item.opts}>
                    {item.title}
                  </a>
                </Link>
              );
            })}
          </div>
          <Link href="/">
            <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
              style={{ margin: 0 }}
            >
              <img
                src="dds_logo.png"
                alt="Dan D Segin Memorial logo"
                width="100"
                height="50"
              />
            </IconButton>
          </Link>
        </Drawer>
      </Toolbar>
    );
  };

  const displayDesktop = () => {
    return (
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
              alt="Dan D Segin Memorial logo"
              width="100"
              height="50"
            />
          </IconButton>
        </Link>
        {navLinks.map((item, index) => {
          return (
            <Link href={item.path} key={index}>
              <a className={classes.title} {...item.opts}>
                {item.title}
              </a>
            </Link>
          );
        })}
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
    );
  };

  return (
    <div>
      <AppBar position="static" style={{ background: "#808080" }}>
        {mobile ? displayMobile() : displayDesktop()}
      </AppBar>
    </div>
  );
}
