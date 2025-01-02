"use client";

import Image from "next/image";
import { ReactNode, useState, useEffect, useCallback } from "react";

interface CustomLinkProps {
  children: ReactNode;
  href: string;
}

const CustomLink: React.FC<CustomLinkProps> = ({ children, href }) => {
  const [imagePreview, setImagePreview] = useState<string>("");
  const [isHoveringLink, setIsHoveringLink] = useState<boolean>(false);
  const [isHoveringPopup, setIsHoveringPopup] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Determines if the hover popup should be visible
  const isHovering = isHoveringLink || isHoveringPopup;

  const handleMouseEnterLink = () => setIsHoveringLink(true);
  const handleMouseLeaveLink = () => setIsHoveringLink(false);
  const handleMouseEnterPopup = () => setIsHoveringPopup(true);
  const handleMouseLeavePopup = () => setIsHoveringPopup(false);

  const fetchImage = useCallback(async (url: string, signal: AbortSignal) => {
    setIsLoading(true);
    setError(null);
    setImagePreview("");

    try {
      const response = await fetch(`/api/previewImage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
        signal,
      });

      if (!response.ok) {
        const errorMessage = `Error ${response.status}: ${response.statusText}`;
        throw new Error(errorMessage);
      }

      const data = await response.json();
      if (data.image) {
        setImagePreview(data.image);
      } else {
        throw new Error("No image data received.");
      }
    } catch (err: any) {
      if (err.name !== "AbortError") {
        console.error("Failed to fetch image preview:", err);
        setError(err.message || "Failed to load preview.");
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    fetchImage(href, controller.signal);

    return () => {
      controller.abort();
    };
  }, [href, fetchImage]);

  return (
    <span className="relative z-20 inline-block">
      {/* Main Link */}
      <a
        href={href}
        className="underline"
        onMouseEnter={handleMouseEnterLink}
        onMouseLeave={handleMouseLeaveLink}
        onFocus={handleMouseEnterLink}
        onBlur={handleMouseLeaveLink}
      >
        {children}
      </a>

      {/* Hover Popup */}
      {isHovering && (
        <div
          className="absolute -top-32 left-1/2 flex h-28 w-36 -translate-x-1/2 translate-y-8 transform cursor-pointer items-start justify-center"
          onMouseEnter={handleMouseEnterPopup}
          onMouseLeave={handleMouseLeavePopup}
          onFocus={handleMouseEnterPopup}
          onBlur={handleMouseLeavePopup}
        >
          {/* Clickable Preview */}
          <a href={href} className="block">
            {isLoading ? (
              /* Loading Spinner */
              <span className="flex h-24 w-36 items-center justify-center rounded-md bg-slate-800 shadow-lg">
                <div
                  className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-white border-t-transparent"
                  role="status"
                >
                  <span className="sr-only">Loading...</span>
                </div>
              </span>
            ) : error ? (
              /* Error Message */
              <span className="flex h-24 w-36 items-center justify-center rounded-md bg-red-500 text-center text-white shadow-lg">
                {error}
              </span>
            ) : imagePreview ? (
              /* Image Preview */
              <Image
                className="h-24 w-36 rounded-md bg-white object-cover object-top shadow-lg"
                height={96}
                width={144}
                src={`data:image/jpeg;base64,${imagePreview}`}
                alt={
                  typeof children === "string" ? children : "Website preview"
                }
              />
            ) : !isLoading ? (
              <span className="flex h-24 w-36 items-center justify-center rounded-md bg-slate-800 shadow-lg">
                <div
                  className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-white border-t-transparent"
                  role="status"
                >
                  <span className="sr-only">Loading...</span>
                </div>
              </span>
            ) : (
              /* Fallback for No Preview */
              <span className="flex h-24 w-36 items-center justify-center rounded-md bg-slate-800 text-sm text-white shadow-lg">
                No preview available
              </span>
            )}
          </a>
        </div>
      )}
    </span>
  );
};

export default CustomLink;
