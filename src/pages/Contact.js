import React from "react";
import { Helmet } from "react-helmet";

const Contact = () => {
  document.title = "Chris Black: Contact";
  return (
    <div className="contact">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Chris Black: Contact</title>
        <meta name="description" content="Let's reach each other." />

        <meta property="og:title" content="Chris Black: Contact" />
        <meta property="og:description" content="Let's reach each other." />
        <meta property="og:url" content="https://www.chrisblack.net/contact" />
        <meta name="twitter:title" content="Chris Black: Contact" />
        <meta name="twitter:description" content="Let's reach each other." />
      </Helmet>
      <h2>Contact</h2>
      <p>
        You can reach me at{" "}
        <a href="mailto:black@chrisblack.net">black@chrisblack.net</a>.
      </p>
      <p>
        I can reach you if you join my{" "}
        <a
          href="https://chrisblackmusic.us4.list-manage.com/subscribe?u=c34da350025e08d5c3a2afd49&id=9b8fff5b69"
          target="_blank"
          rel="noopener noreferrer"
        >
          email list
        </a>
        .
      </p>
    </div>
  );
};

export default Contact;
