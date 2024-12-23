import { PrismaClient, Users } from "@prisma/client";
import { mockDeep, mockReset, DeepMockProxy } from "jest-mock-extended";
import prisma from '../../src/config/client';

jest.mock('../../src/config/client', () => ({
  __esModule: true,
  default: mockDeep<PrismaClient>(),
}))

beforeEach(() => {
  mockReset(prismaMock);
})

export const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>;

export const userMock = {
  id: 1,
  username: 'linux',
  password: '$2b$10$encryptedPasswordHere'
} as Users;

export const usersMock = [
  {
    id: 1,
    username: 'linux',
    password: '$2b$10$encryptedPasswordHere',
    title: 'Testando mock',
    introduction: 'Testando mock',
    content: 'Testando mock',
    imageUrl: 'Testando mock',
    createdAt: new Date('2023-01-01T10:00:00Z'),
    updatedAt: new Date('2023-01-02T12:00:00Z'),
    tagId: 1,
    userId: 1,
  },
  {
    id: 2,
    username: 'Daniel',
    password: '$2b$10$encryptedPasswordHere',
    title: 'Testando mock',
    introduction: 'Testando mock',
    content: 'Testando mock',
    imageUrl: 'Testando mock',
    createdAt: new Date('2023-01-01T10:00:00Z'),
    updatedAt: new Date('2023-01-02T12:00:00Z'),
    tagId: 2,
    userId: 2,
  },
]