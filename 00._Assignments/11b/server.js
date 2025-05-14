import express from 'express';
import Stripe from 'stripe';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const stripe = Stripe(process.env.apikey);

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(process.cwd(), 'public')));

app.get('/config', (req, res) => {
  res.json({ publishableKey: process.env.apipublickey });
});

// Products catalog
const PRODUCTS = {
  prod1: { name: 'Red T-Shirt', unit_amount: 2000 },
  prod2: { name: 'Blue Hoodie', unit_amount: 4500 },
  prod3: { name: 'Green Cap', unit_amount: 1500 },
};

app.post('/create-checkout-session', async (req, res) => {
  const { productId } = req.body;
  const product = PRODUCTS[productId];
  if (!product) return res.status(400).json({ error: 'Unknown product' });

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: { name: product.name },
          unit_amount: product.unit_amount,
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: `${req.headers.origin}/success.html`,
      cancel_url: `${req.headers.origin}/cancel.html`,
    });
    res.json({ sessionId: session.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 4242;
app.listen(PORT, () => console.log(`🚀 Server listening on port ${PORT}`));