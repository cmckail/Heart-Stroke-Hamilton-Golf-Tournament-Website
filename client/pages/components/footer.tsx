/*
  A re-usable footer used throughout the site
*/
import styles from '../styles/Home.module.css'

export default function Home() {

  return (
    <div className={styles.container}>
      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Questions/Comments/Sponsorship inquiries: info@ddsmemorial.ca
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
          FACEBOOK: <a href="https://www.facebook.com/danseginmemorialgolf/"> https://www.facebook.com/danseginmemorialgolf/</a>
          INSTAGRAM: <a href="https://www.instagram.com/dandseginmemorialgolf/"> https://www.instagram.com/dandseginmemorialgolf/?utm_source=ig_profile_share&igshid=xqzqiyezny1t/</a> 
          TWITTER: <a href="https://twitter.com/ddseginmemorial">https://twitter.com/ddseginmemorial</a>
        </a>
      </footer>
    </div>
  )
}