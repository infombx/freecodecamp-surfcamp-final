import ReactMarkdown from "react-markdown";
import { StrapiImage } from "../StrapiImage";
import Link from "next/link";
import type { FeaturedArticleProps } from "@/types";

export function FeaturedArticle({
    headline,
    link,
    excerpt,
    image,
}: Readonly<FeaturedArticleProps>) {
    return (
        <article className="featured-article container">
            <div className="featured-article__info">
                <h3>{headline}</h3>
                <div className="copy">
                    <ReactMarkdown>{excerpt}</ReactMarkdown>
                </div>
                <Link
                    href={link.href}
                    className="btn btn--medium btn--turquoise"
                >
                    {link.text}
                </Link>
            </div>
            <StrapiImage
                src={image.url}
                alt={image.alternativeText || "No alternative text provided"}
                width={500}
                height={600}
            />
        </article>
    );
}