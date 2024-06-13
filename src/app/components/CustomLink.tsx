import React from "react";
import axios from "axios";
import CircleLoader from "react-spinners";

export default function CustomLink({ children, href }: { children: React.ReactNode, href: string }) {
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

    let handleFetchImage = async (url: string) => {
        let {
            data: { image },
        } = await axios.get("http://localhost:3000/api/preview", {
            params: { url },
        });
        setImagePreview(image);
    };

    React.useEffect(() => {
        handleFetchImage(href);

        return () => setImagePreview("");
    }, [href]);

    return (
        <span className="relative z-10 inline-block">
            <a
                href={href}
                className={`${isHovering && "underline"}`}
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
                            <img
                                className="w-36 h-24 rounded-md bg-white shadow-lg object-cover object-top"
                                src={`data:image/jpeg;base64, ${imagePreview}`}
                                alt={children}
                            />
                        ) : (
                            <span className="w-36 h-24 rounded-md bg-slate-800 shadow-lg flex items-center justify-center">
                                <h1>hi</h1>
                            </span>
                        )}
                    </span>
                </a>
            )}
        </span>
    );
}
