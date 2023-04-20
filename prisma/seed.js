import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const main = async () => {
  const goalOne = await prisma.goals.create({
    data: {
      title: "Learn JavaScript",
      description: "My goal is to learn and understand key JavaScript concepts",
      targetDate: new Date("August 23, 2023"),
      complete: false,
      tasks: {
        create: [
          {
            title: "Syntax Basics",
            complete: true,
          },
          {
            title: "Arrays & Objects",
            complete: true,
          },
          {
            title: "Promises",
            complete: false,
          },
          {
            title: "Destructuring Objects",
            complete: false,
          },
        ],
      },
    },
  });
  //const res = await prisma.goals.findMany();

  console.log( {goalOne} );
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });