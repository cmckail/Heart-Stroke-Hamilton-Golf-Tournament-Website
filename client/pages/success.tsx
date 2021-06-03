/*
    Author: David Melnyk
    This page serves as the donation page for the website.
*/

import React, { useState, useEffect, FormEvent } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import NavigationBar from "./components/navigationBar";
import axios from "../utils/axios";
import DDSFooter from "./components/footer";

/* All state variables*/
type State = {
  name: number;
  orderNumber: number;
};

export default function Home() {
  /* Intializing state variables, almost like a constructor.  */
  const [name, setName] = useState("");
  const [order, setOrder] = useState("");
  const [updateIcon, setUpdateIcon] = useState(false);

  useEffect(() => {
    let queries = window.location.search;
    let orderID = queries.match(/session_id=([\w%]*)/)![1];
    setOrder(orderID);
    axios
      .get("/payment/success", {
        params: {
          session_id: orderID,
        },
      })
      .then((data) => {
        setName(data.data.name);
        setUpdateIcon(true);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <NavigationBar num={0} />
      <Head>
        <title>DEVELOPMENT - Dan Segin Golf Tournament Website</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h2> Success! </h2>
        <p>Thank you for your donation! It was successfully processed.</p>
        {/* <p> Order Number: {order} was successful!</p> */}
        <p>
          Thank you for donating to the Heart and Stroke Foundation. Please note
          that all donations larger than $20 will receive a charitable tax
          receipt. (Please allow up to 4 weeks for processing of reciept)
        </p>
        <DDSFooter/>
      </main>
    </>
  );
}
