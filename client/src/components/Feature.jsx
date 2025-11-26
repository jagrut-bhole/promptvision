import { Palette, Download, Zap, Sparkles,Image } from "lucide-react";
import { GlowingEffect } from "./ui/glowing-effect";
import { cn } from "../lib/utils";

export function Feature() {
  return (
    <section id="features" className="m-12 scroll-mt-30">
      <ul className="grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-3 lg:gap-6 xl:gap-8 max-w-7xl mx-auto">
        <GridItem
          area="md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/7]"
          icon={<Sparkles className="h-4 w-4" />}
          title="AI-Powered Generation"
          description="Create stunning images with advanced AI algorithms that understand your creative vision and bring it to life."
        />
        <GridItem
          area="md:[grid-area:1/7/2/13] xl:[grid-area:1/7/2/13]"
          icon={<Zap className="h-4 w-4" />}
          title="Lightning Fast"
          description="Generate high-quality images in seconds, not hours. Our optimized AI delivers results at unprecedented speed."
        />
        <GridItem
          area="md:[grid-area:2/1/3/7] xl:[grid-area:2/1/3/7]"
          icon={<Palette className="h-4 w-4" />}
          title="Multiple Styles"
          description="Choose from photorealistic, artistic, abstract, and custom styles to match your creative needs perfectly."
        />
        <GridItem
          area="md:[grid-area:2/7/3/13] xl:[grid-area:2/7/3/13]"
          icon={<Image className="h-4 w-4" />}
          title="High Resolution"
          description="Generate images up to 4K resolution with crisp details and professional quality for any use case."
        />
        <GridItem
          area="md:[grid-area:3/1/4/13] xl:[grid-area:3/1/4/13]"
          icon={<Download className="h-4 w-4" />}
          title="Instant Download"
          description="Download your creations immediately in various formats including PNG, JPG, and high-res versions."
        />
      </ul>
    </section>
  );
}

const GridItem = ({ area, icon, title, description }) => {
  return (
    <li className={cn("min-h-56 list-none", area)}>
      <div className="relative h-full rounded-[1.25rem] border-[0.75px] border-border p-2 md:rounded-3xl md:p-3">
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
          borderWidth={3}
        />
        <div className="relative text-white bg-black flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border-[0.75px] bg-background p-6 shadow-sm dark:shadow-[0px_0px_27px_0px_rgba(45,45,45,0.3)] md:p-6">
          <div className="relative flex flex-1 flex-col justify-between gap-3">
            <div className="w-fit rounded-lg border-[0.75px] border-border bg-muted p-2">
              {icon}
            </div>
            <div className="space-y-3">
              <h3 className="pt-0.5 text-xl leading-5.5 font-semibold font-sans tracking-[-0.04em] md:text-2xl md:leading-5.5 text-balance text-foreground">
                {title}
              </h3>
              <h2 className="[&_b]:md:font-semibold [&_strong]:md:font-semibold font-sans text-sm leading-4.5 md:text-base md:leading-4.5 text-muted-foreground">
                {description}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};
