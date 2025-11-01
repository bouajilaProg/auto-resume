// projects info
interface Project {
  id: number;
  title: string;
  description: string;
  tools: string,

  projectLink?: string,
  repoLink?: string,
}

export type { Project };
