import PostPreview from "@/app/components/PostPreview";
import { getBlogPosts } from "@/app/components/utils";
export default function Page({ params }: { params: { locale: string } }) {
  let mdxfiles = getBlogPosts("quantum_tuesdays");

  return (
    <div>
      {mdxfiles.map((file) => {
        return (
          <PostPreview
            key={file.slug}
            slug={file.slug}
            subtitle={file.metadata.subtitle}
            date={file.metadata.date}
            locale={params.locale}
          />
        );
      })}
    </div>
  );
}
