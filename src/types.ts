export type File = {
  key: string;
  slug: string;
  metadata: {
    title: string;
    subtitle: string;
    author: string;
    date: string;
  };
  locale: string;
  folder: string;
};
