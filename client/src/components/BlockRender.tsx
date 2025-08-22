import type {Block} from "@/types";

import {HeroSection} from "./blocks/HeroSection";
import {InfoBlock} from "./blocks/InfoBlock";
import {FeaturedArticle} from "./blocks/FeaturedArticle";
import {Subscribe} from "./blocks/Subscribe";
import {Heading} from "./blocks/Heading";
import {ParagraphWithImage} from "./blocks/ParagraphWithImage";
import {Paragraph} from "./blocks/Paragraph";
import {FullImage} from "./blocks/FullImage";

export function blockRenderer(block: Block, index: number) {
    switch (block.__component) {
        case "blocks.hero-section":
            return <HeroSection key={index} {...block} />;
        case "blocks.info-block":
            return <InfoBlock key={index} {...block} />;
        case "blocks.featured-article":
            return <FeaturedArticle key={index} {...block} />;
        case "blocks.subscribe":
            return <Subscribe key={index} {...block} />;
        case "blocks.heading":
            return <Heading key={index} {...block} />;
        case "blocks.paragraph-with-image":
            return <ParagraphWithImage key={index} {...block} />;
        case "blocks.paragraph":
            return <Paragraph key={index} {...block} />;
        case "blocks.full-image":
            return <FullImage key={index} {...block} />;
        default:
            return null;
    }
}

export function BlockRenderer({blocks}: {blocks: Block[]}) {
    return blocks.map((block, index) => blockRenderer(block, index));
}