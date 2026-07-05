import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import { PrismaClient } from '../src/generated/prisma/client';
import 'dotenv/config';
import slugify from 'slugify';

// Initialize Prisma adapter for PostgreSQL
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({
  adapter,
  log: ['query', 'error'],
});

async function main() {
  console.log('Starting seed process (Prisma v7 + Adapters)...');

  // Clear database tables in reverse order to prevent foreign key constraint violations
  await prisma.review.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.dressStyle.deleteMany();
  await prisma.color.deleteMany();
  await prisma.size.deleteMany();

  console.log('Database cleared');

  // You can customize the initial categories, styles, colors and sizes here

  const categories = ['T-shirts', 'Shorts', 'Shirts', 'Hoodie', 'Jeans'];
  const styles = ['Casual', 'Formal', 'Party', 'Gym'];

  // Note: you can change or add new colors with hex codes here
  const colorData = [
    { name: 'Green', hex: '#00C12B' },
    { name: 'Red', hex: '#F50606' },
    { name: 'Yellow', hex: '#F5DD06' },
    { name: 'Orange', hex: '#F57906' },
    { name: 'Blue', hex: '#063AF5' },
    { name: 'Black', hex: '#000000' },
  ];
  const sizeNames = ['XX-Small', 'Small', 'Medium', 'Large', 'X-Large'];

  const createdCats = await Promise.all(
    categories.map((name) => prisma.category.create({ data: { name } })),
  );

  const createdStyles = await Promise.all(
    styles.map((name) => prisma.dressStyle.create({ data: { name } })),
  );

  const createdColors = await Promise.all(
    colorData.map((c) => prisma.color.create({ data: c })),
  );

  const createdSizes = await Promise.all(
    sizeNames.map((name) => prisma.size.create({ data: { name } })),
  );

  console.log('Generating products...');

  for (const cat of createdCats) {
    for (let i = 1; i <= 5; i++) {
      const suffixes = ['Alpha', 'Beta', 'Premium', 'Classic', 'Urban'];
      const baseName = cat.name.endsWith('s')
        ? cat.name.slice(0, -1)
        : cat.name;
      const name = `${baseName} ${suffixes[i - 1]}`;

      const price = Math.floor(Math.random() * (300 - 50) + 50);

      await prisma.product.create({
        data: {
          name,
          slug: slugify(`${name}-${cat.id}-${i}`, {
            lower: true,
            strict: true,
          }),
          description: `This ${name} is a high-quality product from our ${cat.name} collection. Perfect for ${styles[i % styles.length].toLowerCase()} wear.`,
          price,
          oldPrice: price + 30,
          discount: 15,
          stock: Math.floor(Math.random() * 100),
          rating: parseFloat((Math.random() * (5 - 3.5) + 3.5).toFixed(1)),
          images: [
            `https://picsum.photos/seed/${name}-1/400/500`,
            `https://picsum.photos/seed/${name}-2/400/500`,
          ],
          categoryId: cat.id,
          styleId:
            createdStyles[Math.floor(Math.random() * createdStyles.length)].id,
          colors: {
            connect: createdColors
              .sort(() => 0.5 - Math.random())
              .slice(0, 3)
              .map((c) => ({ id: c.id })),
          },
          sizes: {
            connect: createdSizes
              .sort(() => 0.5 - Math.random())
              .slice(0, 4)
              .map((s) => ({ id: s.id })),
          },
        },
      });
    }
  }

  console.log('Seed completed successfully! Created 25 products.');
}

main()
  .catch((e) => {
    console.error('Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
