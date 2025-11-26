import React from 'react'

import {Hero,Feature,DragCard,Testimonials,Banner,Footer} from '../components'
import { GridPattern } from '../components/ui/GridPattern';

export function Landing() {
  return (
    <GridPattern>
      <Hero/>
      <Feature />
      <DragCard />
      <Testimonials />
      <Banner />
      <Footer />
    </GridPattern>
  )
}
