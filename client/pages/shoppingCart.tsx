/*
    Author: David Melnyk
    This page serves as the donation page for the website.
*/

import React, { useState, useEffect, FormEvent } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import { makeStyles } from "@material-ui/core/styles";
import NavigationBar from "./components/navigationBar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import axios from "../utils/axios";
import ItemList from "./components/itemList";
import ICartView from "../utils/interfaces/cartview";

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

// const products = [
//   { name: 'Donation ', desc: 'Thank you for the donation!', price: '$50.00' },
//   { name: 'Sponsor a hole', desc: 'Another thing', price: '$5.00' },
//   { name: 'Golf Tournament Registration', desc: 'Something else', price: '$7.50' },
// ];

export default function Home() {
  const classes = useStyles();
  const [data, setData] = useState<ICartView>();

  useEffect(() => {
    axios
      .get("/cart")
      .then((res) => {
        if (res.data) {
          setData(res.data);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <NavigationBar />
      <div className={styles.container}>
        <Head>
          <title>DEVELOPMENT - Dan Segin Golf Tournament Website</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className={styles.main}>
          <h3> Shopping Cart </h3>
          <hr />
          <Typography variant="h6" gutterBottom>
            Order summary
          </Typography>
          {data && <ItemList data={data} allowDelete={true} />}
          <br />
          <Link href="/checkout">
            <Button variant="contained" color="secondary">
              Checkout
            </Button>
          </Link>
        </main>
      </div>
    </div>
  );
}
