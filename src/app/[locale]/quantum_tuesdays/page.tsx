import PostPreview from "@/app/components/PostPreview";
import { getBlogPosts } from "@/app/components/utils";
import { useTranslations } from "next-intl";

export default function Page({ params }: { params: { locale: string } }) {
  let mdxfiles = getBlogPosts("quantum_tuesdays");
  const t = useTranslations("MarkDownFiles");
  const keys = ["test", "test1"] as const;
  keys.map((key: string) => {
    console.debug(`${t(`posts.${key}.title`)}`);
  });
  // ${t(`${key}.subtitle`)}, ${t(`${key}.date`)}
  return (
    <div className="absolute left-24 top-52">
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
