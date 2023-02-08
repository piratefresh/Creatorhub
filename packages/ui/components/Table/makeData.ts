import { faker } from "@faker-js/faker";

export type Person = {
  id: string;
  name: string;
  email: string;
  role: string;
  experience: string;
  message: string;
  updatedAt: Date;
  firstName?: string;
  lastName?: string;
};

const range = (len: number) => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

export function randomIntFromInterval(min: number, max: number) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const newPerson = (): Person => {
  return {
    id: faker.datatype.uuid(),
    name: faker.name.fullName(),
    email: faker.internet.email(),
    role: faker.helpers.arrayElement([
      "Director",
      "Lightning",
      "Production Assistent",
      "Script Writer",
      "Cinematography",
    ]),
    experience: faker.helpers.shuffle<Person["experience"]>([
      "Beginner",
      "Advanced",
      "All",
    ])[0]!,
    message: faker.lorem.paragraphs(randomIntFromInterval(1, 3)),
    updatedAt: new Date(),
  };
};

export function makeData(...lens: number[]) {
  const makeDataLevel = (depth = 0): Person[] => {
    const len = lens[depth]!;
    return range(len).map((d): Person => {
      return {
        ...newPerson(),
      };
    });
  };

  return makeDataLevel();
}
