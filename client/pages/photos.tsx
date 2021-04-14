/*
    Author: Connor Mckail
    This page serves as the photos page for the website.

    Page Currently uses a json array of photolinks to display in a gallery.
    Using When an image is clicked, a modal is opened and the carousel starting point becomes
    the picture clicked on. 
    Main functionality from npm packahes: react-photo-gallery and react-images
    TODO: link to database of photos
*/

import Head from "next/head";
import React, { useState, useCallback, useEffect } from "react";
import styles from "../styles/Home.module.css";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";
import NavigationBar from "./components/navigationBar";
import { photos } from "./components/images";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-around",
      overflow: "hidden",
      backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      width: 500,
      height: 450,
    },
    icon: {
      color: "rgba(255, 255, 255, 0.54)",
    },
  })
);

export default function Home() {
  const classes = useStyles();

  /*
    Setting up states used in the program
*/
  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);
  const [images, setImages] = useState();
  const openLightbox = useCallback((event, { photo, index }) => {
    setCurrentImage(index);
    setViewerIsOpen(true);
  }, []);

  /*
    Used when the 'gallery' view mode is open for pictures
*/
  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };

  return (
    <div>
      <NavigationBar />
      <div className={styles.container}>
        <Head>
          <title>DEVELOPMENT - Dan Segin Golf Tournament Website</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div>
          <Gallery photos={photos} onClick={openLightbox} />
          {/*
                  The modal viewer for when an image is clicked.
            */}
          <ModalGateway>
            {viewerIsOpen ? (
              <Modal onClose={closeLightbox}>
                <Carousel
                  currentIndex={currentImage}
                  views={photos.map((x) => ({
                    ...x,
                    key: x.src,
                    srcset: "source",
                    caption: "Picture",
                  }))}
                />
              </Modal>
            ) : null}
          </ModalGateway>
        </div>
      </div>
    </div>
  );
}
