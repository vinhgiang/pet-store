import { PrismaClient } from "../src/generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";
import { productsList } from "./productsList";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Start seeding...");

  for (const product of productsList) {
    await prisma.product.upsert({
      where: { stripePriceId: product.stripePriceId },
      update: {},
      create: {
        name: product.name,
        description: product.description,
        price: product.price,
        image: product.image,
        stripePriceId: product.stripePriceId,
        isFeatured: product.isFeatured,
      },
    });
    console.log(`Upserted product: ${product.name}`);
  }

  console.log("Seeding finished.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
