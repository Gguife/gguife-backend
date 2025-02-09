import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const existingCategories = await prisma.categories.findMany();
  const existingTags = await prisma.tags.findMany();

  if(existingCategories.length === 0){
    await prisma.categories.createMany({
      data: [
        {name: "Front-end"},
        {name: "Back-end"},
        {name: "Systems"}
      ]
    })
    console.log('Categories created successfully.');
  }


  if(existingTags.length === 0){
    await prisma.tags.createMany({
      data: [
        {tagName: 'Tech'},
        {tagName: 'Culture'},
        {tagName: 'Productivity'},
        {tagName: 'Reflections'},
        {tagName: 'Learning'},
      ]
    })
    console.log("Tags created successfully.");
  }

  console.log("All datas are created.");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  })