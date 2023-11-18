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
      ticketPrice: faker.finance.amount(50, 300),
    },
  });

  console.log({
    user,
    concert,
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
