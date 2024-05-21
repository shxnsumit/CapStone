import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Head from "next/head";
const Layout = ({ children, title }) => {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <title>{title}</title>
      </Head>
      <Header />
      <main className="container" style={{ minHeight: "100vh" }}>
        {children}
      </main>
      <Footer />
    </>
  );
};

Layout.defaultProps = {
  title: "Neighbourly",
};
export default Layout;
