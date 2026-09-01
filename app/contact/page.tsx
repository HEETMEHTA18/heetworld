import { MapPin, Send } from "lucide-react";
import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";
import { Input, Textarea } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";
import { site } from "@/lib/site";
import { GitHubIcon, LinkedInIcon, TwitterIcon, MailIcon } from "@/components/icons";

export const metadata = {
  title: "Contact",
  description:
    "Get in touch — about a project, a role, or a shared interest in AI and developer tools.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Get in touch"
        title="Contact"
        description="I'm receptive to interesting work, collaborations, and thoughtful messages. The fastest reply is often via email."
      />

      <Container className="py-6">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <div className="flex flex-col gap-6">
              <h2 className="font-serif text-2xl tracking-tight text-foreground">Let&apos;s talk.</h2>
              <p className="max-w-md text-pretty leading-relaxed text-muted-foreground">
                Whether it&apos;s a question about a project, an opportunity to work together, or a
                correction on something I wrote — say hello. I read and reply to email.
              </p>

              <div className="flex flex-col gap-3">
                <a
                  href={site.socials.email}
                  className="inline-flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 text-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
                >
                  <MailIcon className="h-5 w-5 text-accent" />
                  <span className="font-medium text-foreground">{site.email}</span>
                </a>
                <a
                  href={site.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 text-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
                >
                  <GitHubIcon className="h-5 w-5 text-accent" />
                  <span className="font-medium text-foreground">GitHub</span>
                </a>
                <a
                  href={site.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 text-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
                >
                  <LinkedInIcon className="h-5 w-5 text-accent" />
                  <span className="font-medium text-foreground">LinkedIn</span>
                </a>
                <a
                  href={site.socials.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 text-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
                >
                  <TwitterIcon className="h-5 w-5 text-accent" />
                  <span className="font-medium text-foreground">Twitter</span>
                </a>
              </div>

              <div className="flex items-center gap-2 pt-2 text-xs text-muted-foreground">
                <MapPin className="h-3.5 w-3.5 text-accent" />
                <span>Based in {site.location}. Usually online.</span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <form
              className="grid gap-4"
              action="https://formspree.io/f/your-form-id"
              method="POST"
            >
              <Input
                name="name"
                label="Name"
                placeholder="Jane Doe"
                required
              />
              <Input
                name="email"
                type="email"
                label="Email"
                placeholder="jane@example.com"
                required
              />
              <Textarea
                name="message"
                label="Message"
                placeholder="What's this about?"
                rows={5}
                required
              />
              <Button type="submit" variant="primary" className="inline-flex items-center gap-2 self-start">
                <span>Send Message</span>
                <Send className="h-3.5 w-3.5" />
              </Button>
            </form>
          </Reveal>
        </div>
      </Container>
    </>
  );
}
