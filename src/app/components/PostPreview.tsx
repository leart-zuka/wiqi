import Link from "next/link";

interface PostPreviewProps {
  slug: string;
  subtitle: string;
  date: string;
  locale: string;
}

const PostPreview = (props: PostPreviewProps) => {
  return (
    <div
      className="border border-slate-300 p-4 rounded-md shadow-sm bg-white w-fit"
      key={props.slug}
    >
      <Link href={`/${props.locale}/quantum_tuesdays/${props.slug}`}>
        <h1 className=" text-violet-600 hover:underline mb-4">{props.slug}</h1>
      </Link>
      <p className="text-slate-700">{props.subtitle}</p>
      <p className="text-sm text-slate-400">{props.date}</p>
    </div>
  );
};

export default PostPreview;
