/*
  A re-usable footer used throughout the site
*/
import styles from '../../styles/Home.module.css'
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import Link from "next/link";
import { makeStyles } from '@material-ui/core/styles';

//JSS
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
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  footerIconSpacing: {
    marginRight: '50px',
  }
}));

export default function Home() {
  const classes = useStyles();

  return (
    <div className={styles.container}>
      <footer className={styles.footer}>
        <div className={classes.footerIconSpacing}>
          <p> Questions/Comments/Sponsorship Inquiries: info@ddsmemorial.ca </p>
        </div>          
          <a href="https://www.instagram.com/dandseginmemorialgolf/">
            <InstagramIcon/>
          </a>
          <a href="https://www.facebook.com/danseginmemorialgolf/">
            <FacebookIcon/>
          </a>
          <a href="https://twitter.com/ddseginmemorial">
            <TwitterIcon/>
          </a>
      </footer>
    </div>
  )
}