import '@types/jest';

import { EntityRepository } from '@mikro-orm/core';
import { getRepositoryToken } from '@mikro-orm/nestjs';
import { INestApplication } from '@nestjs/common';
import { TestingModule } from '@nestjs/testing';
import { ClientError } from 'graphql-request';

import { AuthService } from '../src/features/auth/auth.service';
import { PaginatedUsers } from '../src/features/users/dto/paginated-users.obj.dto';
import { User } from '../src/features/users/entities/user.entity';
import { GraphQLClient } from './utils/graphql-client.class';
import { prepareE2E } from './utils/prepare-e2e';

describe('Users', () => {
  let app: INestApplication;
  let module: TestingModule;
  let client: GraphQLClient;
  let repo: EntityRepository<User>;

  beforeEach(async () => {
    ({ app, module, client } = await prepareE2E());
    repo = module.get(getRepositoryToken(User));

    await repo
      .persist([
        repo.create({
          username: 'username',
          password: 'password',
        }),
      ])
      .flush();

    const token = (
      await module.get(AuthService).obtainJwt('username', 'password')
    ).token;
    client.setToken(token);
  });

  afterEach(async () => {
    await app.close();
  });

  describe('user', () => {
    const fields: (keyof User)[] = [
      'id',
      'username',
      'nickname',
      'gender',
      'createdAt',
      'updatedAt',
    ];

    let user: User;

    it('should return the data', async () => {
      await request();
      fields.forEach((field) => {
        expect(user[field]).toBeDefined();
      });
    });

    it('should throw an error when the target not exists', async () => {
      await expect(request(999)).rejects.toThrowError(ClientError);
    });

    it('should return an error when not authenticated', async () => {
      client.setToken();
      await expect(request()).rejects.toThrowError(ClientError);
    });

    async function request(id = 1) {
      const result = await client.request<{ user: User }>(
        `query { user(id: ${id}) { ${fields.join(', ')} } }`,
      );
      user = result.user;
    }
  });

  describe('users', () => {
    let users: PaginatedUsers;

    it('should return the paginated users when no arguments are provided', async () => {
      await request('');
      expect(users.total).toBe(1);
      expect(users.results).toBeInstanceOf(Array);
      expect(users.results).toHaveLength(1);
    });

    it('should return an error when not authenticated', async () => {
      client.setToken();
      await expect(request('')).rejects.toThrowError(ClientError);
    });

    it('should return the requested range when limit and offset are specified', async () => {
      await insert(2);
      await request('(limit: 1, offset: 1)');
      expect(users.results).toHaveLength(1);
      expect(users.results[0].id).toBe('2');
    });

    async function request(args: string) {
      const result = await client.request<{ users: PaginatedUsers }>(
        `query { users${args} { total, results { id } } }`,
      );
      users = result.users;
    }
  });

  describe('me', () => {
    let user: User;

    it('should return the current user', async () => {
      await request();
      expect(user.id).toBe('1');
    });

    it('should return an error when not authenticated', async () => {
      client.setToken();
      await expect(request()).rejects.toThrowError(ClientError);
    });

    async function request() {
      const result = await client.request<{ me: User }>(`query { me { id } }`);
      user = result.me;
    }
  });

  describe('createUser', () => {
    let user: User;

    it('should return the created user', async () => {
      await request('(data: { username: "username_", password: "password" })');
      expect(user).toBeDefined();
      expect(user.username).toBe('username_');
      expect(await repo.count()).toBe(2);
    });

    it.each`
      desc                     | data
      ${'username duplicated'} | ${'{ username: "username", password: "password" }'}
      ${'username too short'}  | ${'{ username: "",  password: "password" }'}
    `(
      'should return an error when data is not valid: $desc',
      async ({ data }) => {
        await expect(request(`(data: ${data})`)).rejects.toThrowError(
          ClientError,
        );
      },
    );

    async function request(args: string) {
      const result = await client.request<{ createUser: User }>(
        `mutation { createUser${args} { username } }`,
      );
      user = result.createUser;
    }
  });

  describe('updateUser', () => {
    let user: User;

    it('should return the updated user', async () => {
      disableFrequentUpdateInspection();
      await request(
        '(id: 1, data: { nickname: "new-nickname" })',
        '{ nickname }',
      );
      expect(user.nickname).toBe('new-nickname');
    });

    it('should return an error when not authenticated', async () => {
      disableFrequentUpdateInspection();
      client.setToken();
      await expect(request('(id: 1, data: {})', '{ id }')).rejects.toThrowError(
        ClientError,
      );
    });

    it('should return an error when updating too frequently', async () => {
      await expect(request('(id: 1, data: {})', '{ id }')).rejects.toThrowError(
        ClientError,
      );
    });

    it('should return an error when updating other users', async () => {
      await expect(request('(id: 2, data: {})', '{ id }')).rejects.toThrowError(
        ClientError,
      );
    });

    async function request(args: string, fields: string) {
      const result = await client.request<{ updateUser: User }>(
        `mutation { updateUser${args} ${fields} }`,
      );
      user = result.updateUser;
    }

    function disableFrequentUpdateInspection() {
      jest
        .spyOn(User.prototype, 'isUpdatedRecently', 'get')
        .mockReturnValue(false);
    }
  });

  async function insert(count = 1) {
    for (let i = 1; i <= count; i++)
      repo.persist(
        repo.create({ username: `username${i}`, password: 'password' }),
      );

    await repo.flush();
  }
});
