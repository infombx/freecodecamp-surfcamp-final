export const dynamic = "force-dynamic";
import { BlockRenderer } from "@/components/BlockRender";
import { ContentList } from "@/components/ContentList";
import { getHomePage } from "@/data/loaders";
import { notFound } from "next/navigation";
import { BlogCard } from "@/components/BlogCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home", // adjust as needed
  description: "Your homepage description", // optional
  verification: {
    google: "Fk4URTqAh8i6pHqtF4xLif8fQdVBAwqlnGG1vFUq77U",
  },
};


async function loader() {
  const data = await getHomePage();
  if (!data) notFound();
  console.log(data);
  return {...data.data};
}

export default async function HomeRoute() {
  const data = await loader();
  const blocks = data?.blocks || [];
  return <div><BlockRenderer blocks={blocks} />
    <div className="container">
      <ContentList
        headline="Featured Articles"
        path="/api/articles"
        component={BlogCard}
        headlineAlignment="center"
        featured
      />
    </div>
  </div>;
}
