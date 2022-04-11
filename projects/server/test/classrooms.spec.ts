import { EntityData } from '@mikro-orm/core';
import { EntityManager } from '@mikro-orm/sqlite';
import { INestApplication } from '@nestjs/common';
import { TestingModule } from '@nestjs/testing';

import { AuthService } from '../src/auth/auth.service';
import { Membership } from '../src/memberships/entities/membership.entity';
import { Role } from '../src/memberships/entities/role.enum';
import { PaginatedRooms } from '../src/rooms/dto/paginated-rooms.obj.dto';
import { Room } from '../src/rooms/entities/room.entity';
import { User } from '../src/users/entities/user.entity';
import { GraphQLClient } from './utils/graphql-client.class';
import { prepareE2E } from './utils/prepare-e2e';

describe.only('Rooms', () => {
  let app: INestApplication;
  let module: TestingModule;
  let client: GraphQLClient;
  let em: EntityManager;

  beforeEach(async () => {
    ({ app, module, client } = await prepareE2E());
    em = module.get(EntityManager);
  });

  beforeEach(async () => {
    await em
      .persist([
        em.create(User, {
          username: 'username',
          password: 'password',
        }),
        em.create(User, {
          username: 'username2',
          password: 'password2',
        }),
      ])
      .flush();

    const token = (
      await module.get(AuthService).obtainJwt('username', 'password')
    ).token;

    client.setToken(token);
  });

  describe('room', () => {
    let result: EntityData<Room>;

    beforeEach(async () => {
      await em.persist([create(1)]).flush();
    });

    it('should return the scalar data', async () => {
      await request('(id: 1)', `{ id, name, deletedAt }`);
      expect(result).toEqual({ id: '1', name: 'name', deletedAt: null });
    });

    it('should return the relation data', async () => {
      await request(`(id: 1)`, `{ memberships { total } }`);
      expect(result).toEqual({ memberships: { total: 1 } });
    });

    it.each`
      args
      ${'(id: 999)'}
      ${'(id: 0)'}
    `(
      'should return an error when the target cannot be found',
      async ({ args }) => {
        await expect(request(args, `{ id }`)).rejects.toThrow('Not Found');
      },
    );

    it('should return an error when not authenticated', async () => {
      client.setToken();
      await expect(request('(id: 1)', `{ id }`)).rejects.toThrow(
        'Unauthorized',
      );
    });

    async function request(args: string, fields: string) {
      const content = await client.request(`query { room${args} ${fields} }`);
      result = content.room;
    }
  });

  describe('rooms', () => {
    beforeEach(async () => {
      await em.persist([create(1), create(1), create(1)]).flush();
    });

    let result: PaginatedRooms;

    it('should return the data when no arguments are specified', async () => {
      await request();
      expect(result).toEqual({
        total: 3,
        results: [{ id: '1' }, { id: '2' }, { id: '3' }],
      });
    });

    it('should return an error when not authenticated', async () => {
      client.setToken();
      await expect(request()).rejects.toThrow('Unauthorized');
    });

    it.each`
      args
      ${'(limit: 1, offset: 1)'}
    `('should the data when arguments are $args', async ({ args }) => {
      await request(args);
      expect(result).toEqual({ total: 3, results: [{ id: '2' }] });
    });

    async function request(args = '') {
      const content = await client.request(
        `query { rooms${args} { total, results { id } } }`,
      );
      result = content.rooms;
    }
  });

  describe('createRoom', () => {
    let result: Room;

    it('should return the data', async () => {
      await request('(data: { name: "name" })');
      expect(result).toEqual({ id: '1', name: 'name' });
    });

    it('should return an error when not authenticated', async () => {
      client.setToken();
      const promise = request('(data: { name: "name" })');
      await expect(promise).rejects.toThrow('Unauthorized');
    });

    it.each`
      data              | msg
      ${'{}'}           | ${'Field '}
      ${'{ name: "" }'} | ${'Bad Request'}
    `(
      'should return an error when the data $data is not valid',
      async ({ data, msg }) => {
        const promise = request(`(data: ${data})`);
        await expect(promise).rejects.toThrow(msg);
      },
    );

    async function request(args: string) {
      const content = await client.request(
        `mutation { createRoom${args} { id, name } }`,
      );
      result = content.createRoom;
      return result;
    }
  });

  describe('updateRoom', () => {
    let result: Room;

    beforeEach(async () => {
      await em.persist(create(1)).flush();
    });

    it('should return the data', async () => {
      await request('(id: 1, data: { name: "new-name" })', '{ name }');
      expect(result).toEqual({ name: 'new-name' });
    });

    it('should return an error when not authenticated', async () => {
      client.setToken();
      const promise = request('(id: 1, data: {})', '{ id }');
      await expect(promise).rejects.toThrow('Unauthorized');
    });

    it.each`
      data
      ${'{ name: "" }'}
    `(
      'should return an error when data $data is not valid',
      async ({ data }) => {
        const promise = request(`(id: 1, data: ${data})`, '{ id }');
        await expect(promise).rejects.toThrow('Bad Request');
      },
    );

    it('should return an error when not authorized', async () => {
      await em.persist(create(2)).flush();
      const promise = request(`(id: 2, data: {})`, `{ id }`);
      await expect(promise).rejects.toThrow(
        'Cannot update rooms not created by you',
      );
    });

    async function request(args: string, fields: string) {
      const content = await client.request(
        `mutation { updateRoom${args} ${fields} }`,
      );
      result = content.updateRoom;
    }
  });

  describe('deleteRoom', () => {
    let result: Room;

    beforeEach(async () => {
      await em.persist(create(1)).flush();
    });

    it('should return the data', async () => {
      await request(`(id: 1)`, `{ id }`);
      expect(result).toEqual({ id: '1' });
      const count = await em.count(Room);
      expect(count).toBe(0);
    });

    it('should return an error when not authenticated', async () => {
      client.setToken();
      const promise = request(`(id: 1)`, `{ id }`);
      await expect(promise).rejects.toThrow('Unauthorized');
    });

    it('should return an error when not authorized', async () => {
      await em.persist(create(2)).flush();
      const promise = request(`(id: 2)`, `{ id }`);
      await expect(promise).rejects.toThrow(
        'Cannot delete rooms not created by you',
      );
    });

    async function request(args: string, fields: string) {
      const content = await client.request(
        `mutation { deleteRoom${args} ${fields} }`,
      );
      result = content.deleteRoom;
    }
  });

  afterEach(async () => {
    await app.close();
  });

  function create(creator: number) {
    return em.create(Room, {
      name: 'name',
      creator,
      memberships: [
        {
          owner: 1,
          role: Role.Manager,
        } as EntityData<Membership>,
      ],
    });
  }
});
