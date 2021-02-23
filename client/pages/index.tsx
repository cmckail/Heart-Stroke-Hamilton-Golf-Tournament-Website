import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          8TH ANNUAL TOURNAMENT
        </h1>

        <p className={styles.description}>
          Register today for the 8th Annual Dan D. Segin - Southwest Ontario Heart and Stroke Golf Tournament! {' '}
        </p>

        <a href="https://nextjs.org/docs" className={styles.card}>
            <h3>Register &rarr;</h3>
          </a>

        <div className={styles.grid}>
          <a href="https://nextjs.org/learn" className={styles.card}>
            <h3>Support Heart and Stroke &rarr;</h3>
            <p>All proceeds are donated to the South West Ontario Heart and Stroke Foundation</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/master/examples"
            className={styles.card}
          >
            <h3>Virtual Silent Auction &rarr;</h3>
            <p>Virtual Silent Auction with a chance to win sport memoriabilia such as [Examples] from our partners (Company Hosting Auction)</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/master/examples"
            className={styles.card}
          >
            <h3>Scheduled Tee Times &rarr;</h3>
            <p>To keep you safe, tee off is in groups of up to 4 players every 15 minutes. Tee times selected during registration.</p>
          </a>
          <a
            href="https://github.com/vercel/next.js/tree/master/examples"
            className={styles.card}
          >
            <h3>Raffle Prizes Day &rarr;</h3>
            <p>Buy raffle tickets on our Web Store or the day of the tournament! Prizes include: Prize 1, Prize 2 etc.</p>
          </a>
          <a
            href="https://github.com/vercel/next.js/tree/master/examples"
            className={styles.card}
          >
            <h3>Dinner or Lunch Included &rarr;</h3>
            <p>Every Registrant gets to choose between a BBQ Lunch or Dinner! Options include Beef, Chicken, or a Vegetarian option.</p>
          </a>
          <a
            href="https://vercel.com/import?filter=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h3>Corporate Sponsorships &rarr;</h3>
            <p>
              Does your business want to give back? Business donation can pay for Hole Sponsorship, Website Footer space and a feature on our Sponsor Page!
            </p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}
