import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

// Initialize Prisma Client
const prisma = new PrismaClient();

async function createConcert() {
  const concert = await prisma.concert.create({
    data: {
      name: faker.lorem.sentence(5),
      artistName: faker.person.fullName(),
      venue: faker.location.streetAddress({ useFullAddress: true }),
      concertDate: faker.date.future(),
      ticketPrice: parseFloat(faker.finance.amount({ min: 50, max: 300 })),
      availableTickets: faker.number.int({ min: 100, max: 300 }),
      imageURL: faker.image.urlLoremFlickr({ category: 'nightlife' }),
    },
  });

  console.log({ concert });
}

async function main() {
  // execute the main function
  for (let i = 0; i < 10; i++) {
    await createConcert();
  }
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
