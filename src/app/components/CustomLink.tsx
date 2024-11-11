"use client";
import Image from "next/image";
import { ReactNode, useState, useEffect } from "react";

export default function CustomLink({
  children,
  href,
}: {
  children: ReactNode;
  href: string;
}) {
  let [imagePreview, setImagePreview] = useState("");
  let [isHovering, setIsHovering] = useState(false);

  let inImagePreview = false;
  let inLink = false;

  let handleMouseEnterLink = () => {
    inLink = true;
    setIsHovering(true);
  };

  let handleMouseLeaveLink = () => {
    inLink = false;
    setIsHovering(inImagePreview);
  };

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

  useEffect(() => {
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
            className="absolute -top-32 left-1/2 flex h-28 w-36 -translate-x-[4.5rem] translate-y-8 transform items-start justify-center"
            onMouseEnter={handleMouseEnterLink}
            onMouseLeave={handleMouseLeaveLink}
            onFocus={handleMouseEnterLink}
            onBlur={handleMouseLeaveLink}
          >
            {imagePreview ? (
              <Image
                className="h-24 w-36 rounded-md bg-white object-cover object-top shadow-lg"
                height={24}
                width={36}
                src={`data:image/jpeg;base64, ${imagePreview}`}
                alt={typeof children === "string" ? children : ""}
              />
            ) : (
              <span className="flex h-24 w-36 items-center justify-center rounded-md bg-slate-800 shadow-lg">
                <div
                  className="text-surface inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
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
