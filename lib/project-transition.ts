/** Transition type that turns on the card image -> case study hero morph (see ProjectCard). */
export const PROJECT_OPEN = "project-open";

/** <ViewTransition> props for the shared project image: morph only when opening a project. */
export const projectImageTransition = {
  default: "none",
  share: { [PROJECT_OPEN]: "morph", default: "none" },
} as const;
