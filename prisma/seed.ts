import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import * as bcrypt from 'bcrypt';

// initialize Prisma Client
const prisma = new PrismaClient();

const roundsOfHashing = 10;

async function main() {
  const seededPassword = faker.internet.password();
  const user = await prisma.user.create({
    data: {
      username: faker.internet.userName(),
      password: await bcrypt.hash(seededPassword, roundsOfHashing),
    },
  });

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

  const ticket = await prisma.ticket.create({
    data: {
      customerID: user.ID,
      concertID: concert.ID,
      purchaseDate: new Date(),
    },
  });

  console.log({
    user,
    concert,
    ticket,
    seededPassword,
  });
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
