/*
  A re-usable footer used throughout the site
*/
import styles from '../../styles/Home.module.css'
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import Link from "next/link";

export default function Home() {

  return (
    <div className={styles.container}>
      <footer className={styles.footer}>
          <p> Questions/Comments/Sponsorship inquiries: info@ddsmemorial.ca </p>
          <br/>
          <a href="https://www.instagram.com/dandseginmemorialgolf/">
            <InstagramIcon/>
          </a>
          <a href="https://www.facebook.com/danseginmemorialgolf/">
            <FacebookIcon/>
          </a>
          <a href="https://twitter.com/ddseginmemorial">
            <TwitterIcon/>
          </a>
          {/* FACEBOOK: <a href="https://www.facebook.com/danseginmemorialgolf/"> https://www.facebook.com/danseginmemorialgolf/</a>
          INSTAGRAM: <a href="https://www.instagram.com/dandseginmemorialgolf/"> https://www.instagram.com/dandseginmemorialgolf/?utm_source=ig_profile_share&igshid=xqzqiyezny1t/</a> 
          TWITTER: <a href="https://twitter.com/ddseginmemorial">https://twitter.com/ddseginmemorial</a> */}
      </footer>
    </div>
  )
}