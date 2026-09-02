"use client";

import { useState, useEffect } from "react";
import { MapPin, ArrowUpRight, Clock, Sparkles, MessageCircle, Zap } from "lucide-react";
import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { site } from "@/lib/site";
import { GitHubIcon, LinkedInIcon, TwitterIcon, MailIcon } from "@/components/icons";
import { PageFlow } from "@/components/page-flow";

const greetings = [
  "Hey there",
  "Hello",
  "Namaste",
  "Hola",
  "Bonjour",
];

const subject = encodeURIComponent("Hello Heet — ");
const body = encodeURIComponent(`Hi Heet,

I'm reaching out regarding:

[Brief description of your message — project, opportunity, question, etc.]


Best regards,
[Your Name]
[Your Email / LinkedIn / Website]`);

const emailHref = `mailto:${site.email}?subject=${subject}&body=${body}`;

export default function ContactPage() {
  const [greetingIdx, setGreetingIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setGreetingIdx((i) => (i + 1) % greetings.length);
    }, 2500);
    return () => clearInterval(t);
  }, []);

  return (
    <>
      <PageHeader
        eyebrow="Get in touch"
        title={
          <span className="inline-flex items-center gap-3">
            <span>{greetings[greetingIdx]}</span>
            <span className="text-muted-foreground">—</span>
            <span className="text-muted-foreground">let&apos;s talk.</span>
          </span>
        }
        description="I'm receptive to interesting work, collaborations, and thoughtful messages."
      />

      <Container className="py-6 sm:py-10">
        {/* Hero: Terminal-style contact card */}
        <Reveal>
          <div className="overflow-hidden rounded-2xl border border-border bg-[#0b0d11]">
            {/* Terminal bar */}
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5">
              <div className="flex gap-1.5">
                <span className="h-3 w-3 rounded-full bg-[#f87171]" />
                <span className="h-3 w-3 rounded-full bg-[#fbbf24]" />
                <span className="h-3 w-3 rounded-full bg-[#4ade80]" />
              </div>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#71717a]">
                contact.sh
              </span>
              <div className="w-12" />
            </div>

            {/* Terminal content */}
            <div className="p-5 sm:p-7 space-y-5">
              <div className="font-mono text-[13px] leading-relaxed text-[#d4d4d8]">
                <p>
                  <span className="text-[#4ade80]">$</span>{" "}
                  <span className="text-[#a78bfa]">whoami</span>
                </p>
                <p className="mt-1 text-[#71717a]">
                  {site.name} — {site.title}
                </p>
              </div>

              <div className="h-px bg-white/5" />

              <div className="font-mono text-[13px] leading-relaxed text-[#d4d4d8]">
                <p>
                  <span className="text-[#4ade80]">$</span>{" "}
                  <span className="text-[#a78bfa]">cat</span>{" "}
                  <span className="text-[#fbbf24]">preferred_channel.txt</span>
                </p>
                <p className="mt-1 text-[#71717a]">
                  Email is the fastest way to reach me. I reply within 24 hours.
                </p>
                <div className="mt-3 rounded-lg border border-white/5 bg-white/[0.02] p-3 text-[11px] leading-relaxed text-[#52525b]">
                  <p><span className="text-[#71717a]">Subject:</span> Hello Heet — </p>
                  <p className="mt-1"><span className="text-[#71717a]">Body:</span></p>
                  <p className="ml-2 text-[#52525b]">Hi Heet,</p>
                  <p className="ml-2 text-[#52525b]">I&apos;m reaching out regarding: [your message]</p>
                  <p className="ml-2 text-[#52525b]">Best regards, [Your Name]</p>
                </div>
              </div>

              <div className="h-px bg-white/5" />

              {/* Big email CTA */}
              <a
                href={emailHref}
                className="group flex items-center justify-between rounded-xl border border-[#4ade80]/20 bg-[#4ade80]/5 px-5 py-4 transition-all hover:border-[#4ade80]/40 hover:bg-[#4ade80]/10"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#4ade80]/15 text-[#4ade80]">
                    <MailIcon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#d4d4d8]">
                      {site.email}
                    </p>
                    <p className="font-mono text-[10px] text-[#71717a]">
                      click to open mail client
                    </p>
                  </div>
                </div>
                <ArrowUpRight className="h-4 w-4 text-[#4ade80]/60 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>
        </Reveal>

        {/* Social links with hover effects */}
        <Reveal delay={0.1}>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <SocialCard
              icon={<GitHubIcon className="h-5 w-5" />}
              label="GitHub"
              handle={site.socials.github.replace("https://github.com/", "@")}
              href={site.socials.github}
              color="text-[#d4d4d8]"
              bgHover="hover:bg-white/5"
            />
            <SocialCard
              icon={<LinkedInIcon className="h-5 w-5" />}
              label="LinkedIn"
              handle={site.socials.linkedin.replace("https://linkedin.com/in/", "@")}
              href={site.socials.linkedin}
              color="text-[#0A66C2]"
              bgHover="hover:bg-[#0A66C2]/5"
            />
            <SocialCard
              icon={<TwitterIcon className="h-5 w-5" />}
              label="Twitter"
              handle={site.twitter}
              href={site.socials.twitter}
              color="text-[#1DA1F2]"
              bgHover="hover:bg-[#1DA1F2]/5"
            />
          </div>
        </Reveal>

        {/* Status cards */}
        <Reveal delay={0.15}>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <StatusCard
              icon={<span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
              </span>}
              label="Available"
              value="For work & collabs"
              accent="green"
            />
            <StatusCard
              icon={<Clock className="h-3.5 w-3.5" />}
              label="Response time"
              value="Within 24 hours"
              accent="amber"
            />
            <StatusCard
              icon={<MapPin className="h-3.5 w-3.5" />}
              label="Based in"
              value={`${site.location}. Usually online.`}
              accent="blue"
            />
          </div>
        </Reveal>

        {/* What I'm open to */}
        <Reveal delay={0.2}>
          <div className="mt-10 rounded-2xl border border-border bg-card p-6 sm:p-8">
            <div className="flex items-center gap-2 mb-5">
              <Zap className="h-4 w-4 text-accent" />
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                What I&apos;m open to
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { icon: <Sparkles className="h-4 w-4" />, text: "Full-time roles in AI/ML & software" },
                { icon: <MessageCircle className="h-4 w-4" />, text: "Freelance projects & consulting" },
                { icon: <Zap className="h-4 w-4" />, text: "Open-source collaborations" },
                { icon: <ArrowUpRight className="h-4 w-4" />, text: "Speaking & mentorship" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 rounded-xl border border-border bg-card/50 px-4 py-3"
                >
                  <span className="text-accent">{item.icon}</span>
                  <span className="text-sm text-muted-foreground">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </Container>

      <PageFlow currentPath="/contact" />
    </>
  );
}

function SocialCard({
  icon,
  label,
  handle,
  href,
  color,
  bgHover,
}: {
  icon: React.ReactNode;
  label: string;
  handle: string;
  href: string;
  color: string;
  bgHover: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group flex items-center gap-4 rounded-2xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:shadow-md hover:border-accent/40 ${bgHover}`}
    >
      <span className={`flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 transition-transform group-hover:scale-110 ${color}`}>
        {icon}
      </span>
      <div className="flex flex-col min-w-0">
        <span className="text-sm font-medium text-foreground">{label}</span>
        <span className="font-mono text-[11px] text-muted-foreground truncate">
          {handle}
        </span>
      </div>
    </a>
  );
}

function StatusCard({
  icon,
  label,
  value,
  accent,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  accent: "green" | "amber" | "blue";
}) {
  const accents = {
    green: "text-green-500",
    amber: "text-amber-500",
    blue: "text-blue-500",
  };

  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="flex items-center gap-2 mb-2">
        <span className={accents[accent]}>{icon}</span>
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
          {label}
        </p>
      </div>
      <p className="text-sm text-muted-foreground">{value}</p>
    </div>
  );
}
