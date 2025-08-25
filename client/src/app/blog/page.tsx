export const dynamic = "force-dynamic";
import { getPageBySlug } from "@/data/loaders";
import { notFound } from "next/navigation";
import { BlockRenderer } from "@/components/BlockRender";
import { ContentList } from "@/components/ContentList";
import { BlogCard } from "@/components/BlogCard";

async function loader(slug: string) {
    const {data} = await getPageBySlug(slug);
    if (data.length === 0) notFound();
    return { blocks: data[0]?.blocks };
}

interface PageProps {
    searchParams: Promise<{ page?: string; query?: string }>;
}

export default async function BlogRoute({ searchParams }: PageProps) {
    const { page, query } = await searchParams;
    const { blocks } = await loader("blog");
    return <div className="blog-page">
        <BlockRenderer blocks={blocks} />
        <ContentList
            headline="Check Out Our Latest Articles"
            path="/api/articles"
            component={BlogCard}
            headlineAlignment="center"
            showSearch
            query={query}
            showPagination
            page={page}
        />
        </div>;
}
