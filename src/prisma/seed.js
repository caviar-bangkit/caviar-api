const prisma = require("./connection");
const crossings = require("./data.json");

const seed = async () => {
  try {
    // delete existing data
    await prisma.crossing.deleteMany();

    // reset auto-increment to start at 1 using ALTER TABLE
    const resetQuery =
      await prisma.$queryRaw`ALTER TABLE Crossing AUTO_INCREMENT = 1`;
    resetQuery;

    // seed data from data.json
    for (const crossing of crossings) {
      await prisma.crossing.createMany({
        data: {
          name: crossing.name,
          latitude: crossing.latitude,
          longitude: crossing.longitude,
          heading: crossing.heading,
        },
      });
    }

    console.log("Data seeded successfully");
  } catch (error) {
    console.error(error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

seed();
