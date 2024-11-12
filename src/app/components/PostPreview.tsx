"use client";
import CustomLink from "./CustomLink";

interface PostPreviewProps {
  slug: string;
  subtitle: string;
  date: string;
  locale: string;
  difficulty: string;
}

const PostPreview = (props: PostPreviewProps) => {
  return (
    <div
      className="w-fit rounded-md border border-slate-300 bg-white p-4 shadow-sm"
      key={props.slug}
    >
      <CustomLink
        href={`${process.env.NEXT_PUBLIC_API_BASE_URL}/${props.locale}/quantum_tuesdays/${props.difficulty}/${props.slug}`}
      >
        <h1 className="mb-4 text-violet-600 hover:underline">{props.slug}</h1>
      </CustomLink>
      <p className="text-slate-700">{props.subtitle}</p>
      <p className="text-sm text-slate-400">{props.date}</p>
    </div>
  );
};

export default PostPreview;
