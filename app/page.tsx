import { Hero } from "@/components/home/Hero";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { About } from "@/components/home/About";
import { Achievements } from "@/components/home/Achievements";
import { GitHubActivity } from "@/components/home/GitHubActivity";
import { RecentBlogs } from "@/components/home/RecentBlogs";
import { ContactCTA } from "@/components/home/ContactCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedProjects />
      <About />
      {/* <Achievements /> */}
      <RecentBlogs />
      <GitHubActivity />
      <ContactCTA />
    </>
  );
}
