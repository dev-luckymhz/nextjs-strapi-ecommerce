import Head from 'next/head'
import styles from '../styles/Home.module.css'
import products from '../data.json'
import {initCheckout} from "../services/payment";
import {useState} from "react";
const defaultCart = {
    product: {},
}
export default function Home() {
    const [cart, updateCart] = useState(defaultCart);

    function addToCart({id} = {}){
        updateCart( prevState => {
            let cartState = {...prevState}
            if ( cartState.product[id] ){
                cartState.product[id].quantity = cartState.product[id].quantity  + 1;
                } else {
                cartState.product[id] = {
                    id,
                    quantity: 1
                    };
                };
            return cartState;
            }
        )
    }
    console.log(cart)
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
        <p className={styles.description}>
            <strong>Items:</strong> 0
            <br/>
            <strong>Total price:</strong> 0 $
            <br/>
            <button className={styles.button}>Check Out</button>
        </p>
        <ul className={styles.grid}>
          { products.map( product => {
            const { title, price, description, image, id} = product;
                return (
                    <li className={styles.card} key={id}>
                      <img src={image} alt={image}/>
                      <h2>{title}</h2>
                      <p>{price}</p>
                      <p>{description}</p>
                        <hr/>
                        <p>
                            <button className={styles.button} onClick={() => {
                                addToCart({id})
                                // initCheckout(
                                //     {lineItems: [
                                //             {
                                //                 price: id,
                                //                 quantity: 1
                                //             }
                                //         ]}
                                // );
                            }}>buy now!</button>
                        </p>
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
