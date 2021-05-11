/*
    Author: David Melnyk
    This page serves as the donation page for the website.
*/

import React, { useState, useEffect, FormEvent } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import NavigationBar from "./components/navigationBar";

/* All state variables*/
type State = {
  name: number;
  orderNumber: number;
};


export default function Home() {
/* Intializing state variables, almost like a constructor.  */
const initialState: State = {
  name: 0,
  orderNumber: 0,
};

  return (
    <>
      <NavigationBar />
      <Head>
        <title>DEVELOPMENT - Dan Segin Golf Tournament Website</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h2> Success! </h2>
        <p>
          {" "}
          Order Number: 123 was successful!
        </p>
        <p>
          Thank you for donating to the Heart and Stroke Foundation. Please note that all donations larger than $20 will receive a
          charitable tax receipt. (Please allow up to 4 weeks for processing of
          reciept)
        </p>
      </main>
    </>
  );
}
