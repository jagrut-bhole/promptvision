import React from "react";
import { Navbar, Features, Footer, Hero,Banner, HowItWorks } from "../components";

function Landing() {
  return (
    <div className="overflow-hidden">
      {/* <Navbar isAuthenticated={true} user={{name: "Jagrut Bhole",email:"jagrutbhole103@gmail.com"}} /> */}
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
