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
    <div className="flex h-80 w-72 flex-col justify-between rounded-md border border-slate-300 bg-white p-4 shadow-sm">
      <CustomLink
        href={`${process.env.NEXT_PUBLIC_API_BASE_URL}/${props.locale}/quantum_tuesdays/${props.difficulty}/${props.slug}`}
      >
        <h1 className="mb-2 text-lg font-semibold text-violet-600 hover:underline">
          {props.slug}
        </h1>
        <p className="line-clamp-3 text-slate-700">{props.subtitle}</p>
      </CustomLink>
      <p className="mt-2 text-sm text-slate-400">{props.date}</p>
    </div>
  );
};

export default PostPreview;
