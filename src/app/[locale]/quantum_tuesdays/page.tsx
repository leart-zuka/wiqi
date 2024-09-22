import PostPreview from "@/app/components/PostPreview";
import { getBlogPosts } from "@/app/components/utils";
import { cookies } from "next/headers";

export default function Page({ params }: { params: { locale: string } }) {
  const cookieStore = cookies();
  const difficulty = cookieStore.get("difficulty")?.value ?? "highschool";
  let mdxfiles = getBlogPosts("quantum_tuesdays", params.locale, difficulty);
  return (
    <div className="p-2">
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
