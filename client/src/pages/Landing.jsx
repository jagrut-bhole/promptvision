import React from "react";
import { Navbar, Features, Footer, Hero,Banner, HowItWorks } from "../components";

function Landing() {
  return (
    <div className="overflow-hidden">
      <Navbar />
      <Hero />
      <Features/>
      <HowItWorks />
      <Banner />
      <Footer />
    </div>
  )
}

export default Landing;
