import { connectDB } from "@/lib/config/database";
import ProductSchema from "@/lib/models/ProductSchema";
import { productType } from "@/type";
import { NextResponse } from "next/server";

type SitemapUrl = {
  loc: string;           // Full URL string
  changefreq: string;    // e.g., "daily", "weekly", "monthly"
  priority: number;      // e.g., 1.0, 0.9
};

export async function GET() {
  try {
    // Connect to MongoDB
    await connectDB();

    const menuRes = await ProductSchema.find({}).lean();
    const menuItems: productType[] = JSON.parse(JSON.stringify(menuRes));

    // Static pages
    const staticPages = [
      '/',
      '/collections',
      '/contact-information',
      '/privacy-policy',
      '/return-refund-policy',
      '/shipping-policy',
      '/terms-service'
    ];

    // Generate sitemap URLs as typed objects
    const urls: SitemapUrl[] = [];

    // Add static pages
    staticPages.forEach(page => {
      urls.push({
        loc: `https://www.zevoraofficial.com${page}`,
        changefreq: "weekly",
        priority: 0.7,
      });
    });

    menuItems.forEach(item => {
      urls.push({
        loc: `https://www.zevoraofficial.com/collections/${item.category}/${item.slug}`,
        changefreq: "weekly",
        priority: 0.9,
      });
    });

    // 1. Get an array of unique category names
    const uniqueCategories = [...new Set(menuItems.map(item => item.category))];

    // 2. Map those unique categories to your URL objects
    uniqueCategories.forEach(category => {
      urls.push({
        loc: `https://www.zevoraofficial.com/collections/${category}`,
        changefreq: "weekly",
        priority: 0.9,
      });
    });

    // Generate final XML from typed objects
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    u => `
  <url>
    <loc>${u.loc}</loc>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join('')}
</urlset>`;

    return new NextResponse(sitemap, {
      headers: { "Content-Type": "application/xml" },
    });
  } catch (err) {
    console.error("Error generating sitemap:", err);
    return new NextResponse("Sitemap generation failed", { status: 500 });
  }
}
