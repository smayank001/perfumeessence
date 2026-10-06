import { connectDB } from "@/lib/config/database";
import ProductSchema from "@/lib/models/ProductSchema";
import { NextResponse } from "next/server";
import { NEXT_PUBLIC_BASE_URL } from "@/config";

export async function GET() {
  try {
    await connectDB();

    const products = await ProductSchema.find().lean();

    const siteUrl = NEXT_PUBLIC_BASE_URL;

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss xmlns:g="http://base.google.com/ns/1.0" version="2.0">
<channel>
<title>The Perfume Essence Products</title>
<link>${siteUrl}</link>
<description>The Perfume Essence Product Feed</description>

${products
  .flatMap((product) => {
    const price =
      product.onSale && product.salePrice
        ? product.salePrice
        : product.price;

    // No variants
    if (!product.hasVariants || product.variants.length === 0) {
      return `
<item>
<g:id>${product._id}</g:id>

<g:title><![CDATA[${product.name}]]></g:title>

<g:description><![CDATA[${product.description}]]></g:description>

<g:link>${siteUrl}/products/${product.slug}</g:link>

<g:image_link>${siteUrl}${product.images[0]}</g:image_link>

<g:availability>in stock</g:availability>

<g:condition>new</g:condition>

<g:price>${price.toFixed(2)} PKR</g:price>

<g:brand>The Perfume Essence</g:brand>

<g:product_type>${product.category}</g:product_type>

</item>
`;
    }

    // Products with variants
    return product.variants.map(
      (variant: { label: string; sku: string; stock: number }) => `
<item>

<g:id>${variant.sku}</g:id>

<g:item_group_id>${product._id}</g:item_group_id>

<g:title><![CDATA[${product.name} - ${variant.label}]]></g:title>

<g:description><![CDATA[${product.description}]]></g:description>

<g:link>${siteUrl}/products/${product.slug}</g:link>

<g:image_link>${siteUrl}${product.images[0]}</g:image_link>

<g:availability>${
        variant.stock > 0 ? "in stock" : "out of stock"
      }</g:availability>

<g:condition>new</g:condition>

<g:price>${price.toFixed(2)} PKR</g:price>

<g:brand>The Perfume Essence</g:brand>

<g:product_type>${product.category}</g:product_type>

<g:custom_label_0>${variant.label}</g:custom_label_0>

</item>
`
    );
  })
  .join("")}

</channel>
</rss>`;

    return new NextResponse(xml, {
      headers: {
        "Content-Type": "application/xml",
      },
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Failed to generate feed",
      },
      {
        status: 500,
      }
    );
  }
}
