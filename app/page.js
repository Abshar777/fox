import { LoaderProvider } from "@/components/loader-context";
import Preloader from "@/components/preloader";
import SmoothScroll from "@/components/smooth-scroll";
import Cursor from "@/components/cursor";
import Nav from "@/components/nav";
import Hero from "@/components/hero";
import Ticker from "@/components/ticker";
import Manifesto from "@/components/manifesto";
import Method from "@/components/method";
import Stats from "@/components/stats";
import Curriculum from "@/components/curriculum";
import Desk from "@/components/desk";
import Mentors from "@/components/mentors";
import Testimonials from "@/components/testimonials";
import Pricing from "@/components/pricing";
import Faq from "@/components/faq";
import Cta from "@/components/cta";
import Footer from "@/components/footer";

export default function Page() {
  return (
    <LoaderProvider>
      <Preloader />
      <SmoothScroll />
      <Cursor />

      <div className="u-grain" aria-hidden="true" />
      <div className="u-vignette" aria-hidden="true" />

      <Nav />

      <main>
        <Hero />
        <Ticker />
        <Manifesto />
        <Method />
        <Stats />
        <Curriculum />
        <Desk />
        <Mentors />
        <Testimonials />
        <Pricing />
        <Faq />
        <Cta />
      </main>

      <Footer />
    </LoaderProvider>
  );
}
