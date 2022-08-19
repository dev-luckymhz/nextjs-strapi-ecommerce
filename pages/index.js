import Head from 'next/head'
import styles from '../styles/Home.module.css'
import products from '../data.json'
import {initCheckout} from "../services/payment";
import {useState} from "react";
import Image from "next/image";
const defaultCart = {
    products: {},
}
export default function Home() {
    const [cart, updateCart] = useState(defaultCart);

    let cartItem = Object.keys(cart.products).map(
        key => {
            const product = products.find(({id}) => `${id}` === `${key}`)
            return {
                ...cart.products[key],
                pricePerItem: product.price
            }
        }
    )
    let  subtotal = cartItem.reduce((prev, { pricePerItem , quantity})=>{
        let p = parseInt(pricePerItem)*parseInt(quantity)
        return prev + p
    }, 0)
    let  total = cartItem.reduce((prev, {quantity})=>{
        return prev + parseInt(quantity)
    }, 0)

    function addToCart({id} = {}){
        updateCart( prevState => {
            let cartState = {...prevState}
            if ( cartState.products[id] ){
                    cartState.products[id].quantity +=1
                } else {
                cartState.products[id] = {
                    id,
                    quantity: 1
                    };
                }
            return cartState;
            }
        )
    }
    function checkout() {
        initCheckout(
            {lineItems:cartItem.map(item => {
                    return {
                        price: item.id,
                        quantity: item.quantity
                    }
                })}
        );
    }
  return (
    <div className={styles.container}>
      <Head>
        <title>E-commerce Showcase</title>
        <meta name="description" content="Egg commerce app test" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          The List Of the product
        </h1>
        <p className={styles.description}>
            <strong>Items:</strong> {total}
            <br/>
            <strong>Total price:</strong> {subtotal} $
            <br/>
            <button className={styles.button} onClick={checkout}>Check Out</button>
        </p>
        <ul className={styles.grid}>
          { products.map( product => {
            const { title, price, description, image, id} = product;
                return (
                    <li className={styles.card} key={id}>
                      <Image src={image} width={500} height={500} alt={image}/>
                      <h2>{title}</h2>
                      <p>{price}</p>
                      <p>{description}</p>
                        <hr/>
                        <p>
                            <button className={styles.button} onClick={() => {
                                event.preventDefault();
                                addToCart({id})
                            }}>Add To Cart!</button>
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
