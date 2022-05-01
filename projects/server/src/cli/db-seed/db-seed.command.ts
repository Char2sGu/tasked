import faker from '@faker-js/faker';
import { EntityManager } from '@mikro-orm/sqlite';
import { Command, CommandRunner } from 'nest-commander';

import { Application } from '../../applications/entities/application.entity';
import { ApplicationStatus } from '../../applications/entities/application-status.enum';
import { Assignment } from '../../assignments/entities/assignment.entity';
import { Membership } from '../../memberships/entities/membership.entity';
import { Role } from '../../memberships/entities/role.enum';
import { Room } from '../../rooms/entities/room.entity';
import { Task } from '../../tasks/entities/task.entity';
import { Gender } from '../../users/entities/gender.enum';
import { User } from '../../users/entities/user.entity';

@Command({
  name: 'db:seed',
  description: 'Seed the database with random generated data',
})
export class DbSeedCommand implements CommandRunner {
  constructor(private em: EntityManager) {}

  async run(): Promise<void> {
    const em = this.em.fork();

    const users: User[] = [];
    while (users.length < 100) {
      const firstName = faker.name.firstName();
      const user = em.create(User, {
        username: faker.internet.userName(firstName).replace('.', ''),
        nickname: faker.datatype.boolean() ? firstName : undefined,
        password:
          '$2a$10$H.tcAfDT6phzgoU0mUp.reIdVn3gmo6ZuieTSSJM5/BVLyHW1D/4S', // "password"
        gender: oneOf([Gender.Male, Gender.Female, Gender.Unknown]),
      });
      users.push(user);
    }
    em.persist(users);

    const rooms: Room[] = [];
    while (rooms.length < 30) {
      const user = oneOf(users);
      if (user.rooms.length == 20) continue;
      rooms.push(
        em.create(Room, {
          creator: oneOf(users),
          name: faker.random.words(faker.datatype.number({ min: 1, max: 3 })),
          description: faker.datatype.boolean()
            ? faker.random.words(faker.datatype.number({ min: 1, max: 20 }))
            : undefined,
          isOpen: faker.datatype.boolean(),
        }),
      );
    }
    em.persist(rooms);

    const applications: Application[] = [];
    users.forEach((user) => {
      const createFor = (rooms: Room[], statusOptions: ApplicationStatus[]) =>
        rooms.forEach((room) => {
          applications.push(
            em.create(Application, {
              owner: user,
              room: room,
              status: oneOf(statusOptions),
              message: faker.datatype.boolean()
                ? faker.random.words(faker.datatype.number({ min: 1, max: 10 }))
                : undefined,
            }),
          );
        });
      const acceptedSet = someOf(
        rooms,
        faker.datatype.number({ min: 0, max: 8 }),
      );
      const accepted = [...acceptedSet];
      createFor(accepted, [ApplicationStatus.Accepted]);
      const rejectedSet = someOf(
        rooms,
        faker.datatype.number({ min: 0, max: 4 }),
        acceptedSet,
      );
      const rejected = [...rejectedSet];
      createFor(rejected, [ApplicationStatus.Rejected]);
      const reappliedSet = someOf(rejected, 0.5);
      const reapplied = [...reappliedSet];
      createFor(reapplied, [
        ApplicationStatus.Pending,
        ApplicationStatus.Accepted,
      ]);
    });
    em.persist(applications);

    const memberships: Membership[] = [];
    rooms.forEach((room) => {
      memberships.push(
        em.create(Membership, {
          owner: room.creator,
          room,
          role: Role.Manager,
        }),
      );
    });
    applications.forEach((application) => {
      if (application.status != ApplicationStatus.Accepted) return;
      memberships.push(
        em.create(Membership, {
          owner: application.owner,
          room: application.room,
          role: possibility(
            faker.datatype.number({ min: 0.1, max: 0.3, precision: 0.1 }),
          )
            ? Role.Manager
            : Role.Member,
        }),
      );
    });
    em.persist(memberships);

    const tasks: Task[] = [];
    rooms.forEach((room) => {
      const managers = room.memberships
        .getItems()
        .filter((m) => m.role == Role.Manager);
      managers.forEach((manager) => {
        const prevLength = tasks.length;
        const count = faker.datatype.number({ min: 0, max: 10 });
        while (tasks.length - prevLength != count) {
          tasks.push(
            em.create(Task, {
              room,
              creator: manager,
              title: faker.random.words(
                faker.datatype.number({ min: 1, max: 8 }),
              ),
              description: faker.datatype.boolean()
                ? faker.random.words(
                    faker.datatype.number({ min: 10, max: 100 }),
                  )
                : undefined,
              isActive: true,
            }),
          );
        }
      });
    });
    em.persist(tasks);

    await em.flush();

    const assignments: Assignment[] = [];
    tasks.forEach((task) => {
      const members = task.room.memberships
        .getItems()
        .filter((membership) => membership.role == Role.Member);
      someOf(members, Math.random()).forEach((membership) => {
        assignments.push(
          em.create(Assignment, {
            task,
            recipient: membership.id,
            isCompleted: possibility(Math.random()),
            isImportant: possibility(Math.random()),
          }),
        );
      });
    });
    em.persist(assignments);

    await em.flush();
    console.log(users.map((user) => user.username));
  }
}

function oneOf<T>(source: T[]): T {
  return someOf(source, 1).values().next().value;
}
function someOf<T>(source: T[], size: number, distinctFrom?: Set<T>): Set<T> {
  const results = new Set<T>();
  size = size < 1 ? Math.round(size * source.length) : size;
  size = source.length > size ? size : source.length;
  while (results.size < size) {
    const i = faker.datatype.number({ min: 0, max: source.length - 1 });
    const item = source[i];
    if (distinctFrom?.has(item)) continue;
    results.add(item);
  }
  return results;
}
function possibility(value: number): boolean {
  return Math.random() <= value;
}
