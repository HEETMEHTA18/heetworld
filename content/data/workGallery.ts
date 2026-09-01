export type WorkGalleryItem = {
  src: string;
  alt: string;
  title: string;
  caption: string;
  credit: string;
  ratio: "tall" | "wide" | "square";
};

export const workGallery: WorkGalleryItem[] = [
  {
    src: "/images/projects/aaron-burden-aRya3uMiNIA-unsplash.jpg",
    alt: "Project work — editorial photograph by Aaron Burden",
    title: "01",
    caption: "Systems thinking applied in the open.",
    credit: "Aaron Burden",
    ratio: "wide",
  },
  {
    src: "/images/projects/alice-triquet-HeEJU3nrg_0-unsplash.jpg",
    alt: "Project work — editorial photograph by Alice Triquet",
    title: "02",
    caption: "Building interfaces that feel human.",
    credit: "Alice Triquet",
    ratio: "tall",
  },
  {
    src: "/images/projects/casey-horner-4rDCa5hBlCs-unsplash.jpg",
    alt: "Project work — editorial photograph by Casey Horner",
    title: "03",
    caption: "Experiments at the edge of the stack.",
    credit: "Casey Horner",
    ratio: "tall",
  },
  {
    src: "/images/projects/daniel-gomez-eKegp5f2PPk-unsplash.jpg",
    alt: "Project work — editorial photograph by Daniel Gomez",
    title: "04",
    caption: "Prototypes that ship and ship again.",
    credit: "Daniel Gomez",
    ratio: "wide",
  },
];
