import Image, { type StaticImageData } from "next/image";
import { cn } from "@/lib/utils";

interface ProjectImageFrameProps {
  image?: StaticImageData;
  title: string;
  sizes: string;
  priority?: boolean;
  className?: string;
  imageClassName?: string;
}

/**
 * Shows any screenshot or diagram the same way: contained (never cropped) on a soft tinted
 * backdrop, so light/dark screenshots and wide diagrams sit together consistently.
 */
export function ProjectImageFrame({
  image,
  title,
  sizes,
  priority,
  className,
  imageClassName,
}: ProjectImageFrameProps) {
  // The padded frame's inner box is ~2:1. Wider images fill the width; narrower ones fill the height.
  const fillWidth = image ? image.width / image.height >= 2 : true;

  return (
    <div
      className={cn(
        "relative flex aspect-video w-full items-center justify-center overflow-hidden bg-zinc-100 bg-[radial-gradient(120%_80%_at_50%_0%,rgb(255_255_255/0.9),transparent_60%)] p-5 dark:bg-zinc-800/60 dark:bg-[radial-gradient(120%_80%_at_50%_0%,rgb(255_255_255/0.06),transparent_60%)] sm:p-6",
        className
      )}
    >
      {image ? (
        <Image
          src={image}
          alt={`Screenshot of ${title}`}
          sizes={sizes}
          priority={priority}
          placeholder="blur"
          className={cn(
            fillWidth ? "h-auto w-full" : "h-full w-auto",
            "max-h-full max-w-full rounded-md border border-black/10 shadow-lg shadow-black/15 dark:border-white/10 dark:shadow-black/40",
            imageClassName
          )}
        />
      ) : (
        <span className="text-xs text-zinc-500 dark:text-zinc-600">Image coming soon</span>
      )}
    </div>
  );
}
