"use client";
import Image from "next/image";
import React from "react";

export default function CustomLink({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) {
  let [imagePreview, setImagePreview] = React.useState("");
  let [isHovering, setIsHovering] = React.useState(false);

  let inImagePreview = false;
  let inLink = false;

  let handleMouseEnterImage = () => {
    inImagePreview = true;
    setIsHovering(true);
  };

  let handleMouseLeaveImage = () => {
    inImagePreview = false;
    setIsHovering(inLink);
  };

  let handleMouseEnterLink = () => {
    inLink = true;
    setIsHovering(true);
  };

  let handleMouseLeaveLink = () => {
    inLink = false;
    setIsHovering(inImagePreview);
  };

  const pathName = process.env.NEXT_PUBLIC_API_BASE_URL!;

  let handleFetchImage = async (url: string) => {
    try {
      const response = await fetch(`/api/previewImage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: url }),
      });
      const data = await response.json();
      setImagePreview(data.image);
    } catch (error) {
      console.debug(
        "An error occured while trying to make the api request",
        error,
      );
    }
  };

  React.useEffect(() => {
    handleFetchImage(href);

    return () => setImagePreview("");
  }, [href]);

  return (
    <span className="relative z-10 inline-block">
      <a
        href={href}
        className={"underline"}
        onMouseEnter={handleMouseEnterLink}
        onMouseLeave={handleMouseLeaveLink}
        onFocus={handleMouseEnterLink}
        onBlur={handleMouseLeaveLink}
      >
        {children}
      </a>
      {isHovering && (
        <a href={href}>
          <span
            className="w-36 h-28 absolute -top-32 left-1/2 transform -translate-x-[4.5rem] translate-y-8 flex items-start justify-center"
            onMouseEnter={handleMouseEnterLink}
            onMouseLeave={handleMouseLeaveLink}
            onFocus={handleMouseEnterLink}
            onBlur={handleMouseLeaveLink}
          >
            {imagePreview ? (
              <Image
                className="w-36 h-24 rounded-md bg-white shadow-lg object-cover object-top"
                height={24}
                width={36}
                src={`data:image/jpeg;base64, ${imagePreview}`}
                alt={typeof children === "string" ? children : ""}
              />
            ) : (
              <span className="w-36 h-24 rounded-md bg-slate-800 shadow-lg flex items-center justify-center">
                <div
                  className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
                  role="status"
                >
                  <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                    Loading...
                  </span>
                </div>
              </span>
            )}
          </span>
        </a>
      )}
    </span>
  );
}
