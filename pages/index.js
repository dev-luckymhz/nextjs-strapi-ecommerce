import Head from 'next/head'
import styles from '../styles/Home.module.css'
import products from '../data.json'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Zo{"'"}s rig</title>
        <meta name="description" content="Egg commerce app test" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          The List Of My rig
        </h1>

        <ul className={styles.grid}>
          { products.map( product => {
            const { title, price, description, image, id} = product;
                return (
                    <li className={styles.card} key={id}>
                      <img src={image} alt={image}/>
                      <h2>{title}</h2>
                      <p>{price}</p>
                      <p>{description}</p>
                    </li>
                )
              }
          )}
        </ul>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Developed By Zo
        </a>
      </footer>
    </div>
  )
}
