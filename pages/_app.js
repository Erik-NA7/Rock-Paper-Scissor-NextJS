import Head from "next/head";
import UserContextProvider from '../context/authContext';
import "../styles/globals.css";

const MyApp = ({ Component, pageProps }) => {
  const Layout = Component.Layout || EmptyLayout;
  return (
    <UserContextProvider>
      <Head>
        <title>Rock Paper Scissors</title>
        <meta name="description" content="Generated by create next app"/>
        <link rel="icon" href="/favicon.ico"/>
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      </UserContextProvider>
  );
};

const EmptyLayout = ({ children }) => <>{children}</>;

export default MyApp;