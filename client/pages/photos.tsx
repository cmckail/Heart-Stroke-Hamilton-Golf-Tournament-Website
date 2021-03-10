import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { makeStyles } from '@material-ui/core/styles';
import NavigationBar from './components/navigationBar'

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
        <h2> Photo Album </h2>
        <div className={styles.grid}>
            <a href="https://nextjs.org/learn" className={styles.card}>
            <img src="golfing.jpeg" alt="Golfing with your buddies" width="300" height="200"/> 
            </a>

            <a
              href="https://github.com/vercel/next.js/tree/master/examples"
              className={styles.card}
            >
            <img src="golfing.jpeg" alt="Golfing with your buddies" width="300" height="200"/> 
            </a>

            <a
              href="https://github.com/vercel/next.js/tree/master/examples"
              className={styles.card}
            >
            <img src="golfing.jpeg" alt="Golfing with your buddies" width="300" height="200"/> 
            </a>
            <a
              href="https://github.com/vercel/next.js/tree/master/examples"
              className={styles.card}
            >
            <img src="golfing.jpeg" alt="Golfing with your buddies" width="300" height="200"/> 
            </a>
            <a
              href="https://github.com/vercel/next.js/tree/master/examples"
              className={styles.card}
            >
            <img src="golfing.jpeg" alt="Golfing with your buddies" width="300" height="200"/> 
            </a>
            <a
              href="https://vercel.com/import?filter=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
              className={styles.card}
            >
              <h3>Golf April 23 2021</h3>
              <img src="golfing.jpeg" alt="Golfing with your buddies" width="300" height="200"/> 
            </a>
          </div>
        </main>
      </div>
    </div>
  )
}
