/* eslint-disable @next/next/no-img-element */
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { SubscribeButton } from '../components/SubscribeButton';
import { stripe } from '../services/stripe';
import styles from '../styles/home.module.scss';


interface IProduct {
  priceId: string;
  amount: number;
}

interface HomeProps {
  product: IProduct
}

export default function Home({ product }: HomeProps) {
  return (
    <>
      <Head>
        <title>ig.news | Home</title>
      </Head>

      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Hey, welcome</span>
          
          <h1>News about the <span>React</span> world.</h1>

          <p>
            Get access to all publications <br />
            <span>for {product?.amount}/month</span>
          </p>

          <SubscribeButton priceId={product.priceId} />
        </section>

        <img src="/images/avatar.svg" alt="Girl coding" />
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {

  const price = await stripe.prices.retrieve('price_1KrAPgDBMaLrwZtTcN5PELiN');

  const product = {
    productId: price.id,
    amount: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(Number(price.unit_amount) / 100),
  };
  
  return {
    props: {
      product,
    },
    revalidate: 60 * 60 * 24, // 24h
  }
}