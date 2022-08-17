import {loadStripe} from "@stripe/stripe-js";
const stripePremise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_API_KEY)

export async function initCheckout({lineItems} = {}){
    const stripe = await stripePremise;
    await stripe.redirectToCheckout(
        {
            mode: "payment",
            lineItems,
            successUrl: `${window.location.origin}?session_id={CHECKOUT_SESSION_ID}`,
            cancelUrl: `${window.location.origin}`
        }
    );
}