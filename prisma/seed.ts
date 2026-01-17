import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { PrismaClient } from "../src/generated/prisma/client";
import "dotenv/config";
import slugify from "slugify";

// 1. Настройка адаптера (Обязательно для Prisma v7 без Accelerate)
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);

// 2. Инициализация клиента с адаптером
const prisma = new PrismaClient({
  adapter,
  log: ["query", "error"],
});

async function main() {
  console.log("🚀 Начинаем процесс сидинга (Prisma v7 + Adapters)...");

  // 1. Очистка базы (в порядке, учитывающем связи)
  // Удаляем в обратном порядке, чтобы не нарушить целостность
  await prisma.review.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.dressStyle.deleteMany();
  await prisma.color.deleteMany();
  await prisma.size.deleteMany();

  console.log("🧹 База очищена");

  // 2. Подготовка справочников
  const categories = ["T-shirts", "Shorts", "Shirts", "Hoodie", "Jeans"];
  const styles = ["Casual", "Formal", "Party", "Gym"];
  const colorData = [
    { name: "Green", hex: "#00C12B" },
    { name: "Red", hex: "#F50606" },
    { name: "Yellow", hex: "#F5DD06" },
    { name: "Orange", hex: "#F57906" },
    { name: "Blue", hex: "#063AF5" },
    { name: "Black", hex: "#000000" },
  ];
  const sizeNames = ["XX-Small", "Small", "Medium", "Large", "X-Large"];

  // 3. Создание записей (используем create, так как мы почистили базу)
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

  // 4. Генерация товаров (по 5 на категорию)
  console.log("📦 Генерация товаров...");

  for (const cat of createdCats) {
    for (let i = 1; i <= 5; i++) {
      // Генерируем красивое имя
      const suffixes = ["Alpha", "Beta", "Premium", "Classic", "Urban"];
      const baseName = cat.name.endsWith("s")
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
          rating: parseFloat((Math.random() * (5 - 3.5) + 3.5).toFixed(1)), // Рейтинг 3.5 - 5.0
          images: [
            `https://picsum.photos/seed/${name}-1/400/500`,
            `https://picsum.photos/seed/${name}-2/400/500`,
          ],
          categoryId: cat.id,
          styleId:
            createdStyles[Math.floor(Math.random() * createdStyles.length)].id,
          // Привязываем случайные цвета и размеры
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

  console.log("✅ Сидинг успешно завершен! Создано 25 товаров.");
}

main()
  .catch((e) => {
    console.error("❌ Ошибка при сидинге:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
