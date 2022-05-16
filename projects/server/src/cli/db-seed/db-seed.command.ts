import faker from '@faker-js/faker';
import { EntityManager } from '@mikro-orm/sqlite';
import { Command, CommandRunner } from 'nest-commander';

import { Assignment } from '../../features/assignments/entities/assignment.entity';
import { MembershipRequest } from '../../features/membership-requests/entities/membership-request.entity';
import { MembershipRequestStatus } from '../../features/membership-requests/entities/membership-request-status.enum';
import { Membership } from '../../features/memberships/entities/membership.entity';
import { Role } from '../../features/memberships/entities/role.enum';
import { Task } from '../../features/tasks/entities/task.entity';
import { Team } from '../../features/teams/entities/team.entity';
import { Gender } from '../../features/users/entities/gender.enum';
import { User } from '../../features/users/entities/user.entity';

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
        email: faker.internet.email(firstName),
        nickname: faker.datatype.boolean() ? firstName : undefined,
        password:
          '$2a$10$H.tcAfDT6phzgoU0mUp.reIdVn3gmo6ZuieTSSJM5/BVLyHW1D/4S', // "password"
        gender: oneOf([Gender.Male, Gender.Female, Gender.Unknown]),
      });
      users.push(user);
    }
    em.persist(users);

    const teams: Team[] = [];
    while (teams.length < 30) {
      const user = oneOf(users);
      if (user.teams.length === 20) continue;
      teams.push(
        em.create(Team, {
          creator: oneOf(users),
          name: faker.random.words(faker.datatype.number({ min: 1, max: 3 })),
          description: faker.datatype.boolean()
            ? faker.random.words(faker.datatype.number({ min: 1, max: 20 }))
            : undefined,
          isOpen: faker.datatype.boolean(),
        }),
      );
    }
    em.persist(teams);

    const membershipRequests: MembershipRequest[] = [];
    users.forEach((user) => {
      const createFor = (
        teams: Team[],
        statusOptions: MembershipRequestStatus[],
      ) =>
        teams.forEach((team) => {
          membershipRequests.push(
            em.create(MembershipRequest, {
              owner: user,
              team: team,
              status: oneOf(statusOptions),
              message: faker.datatype.boolean()
                ? faker.random.words(faker.datatype.number({ min: 1, max: 10 }))
                : undefined,
            }),
          );
        });
      const acceptedSet = someOf(
        teams,
        faker.datatype.number({ min: 0, max: 8 }),
      );
      const accepted = [...acceptedSet];
      createFor(accepted, [MembershipRequestStatus.Accepted]);
      const rejectedSet = someOf(
        teams,
        faker.datatype.number({ min: 0, max: 4 }),
        acceptedSet,
      );
      const rejected = [...rejectedSet];
      createFor(rejected, [MembershipRequestStatus.Rejected]);
      const reappliedSet = someOf(rejected, 0.5);
      const reapplied = [...reappliedSet];
      createFor(reapplied, [
        MembershipRequestStatus.Pending,
        MembershipRequestStatus.Accepted,
      ]);
    });
    em.persist(membershipRequests);

    const memberships: Membership[] = [];
    teams.forEach((team) => {
      memberships.push(
        em.create(Membership, {
          owner: team.creator,
          team,
          name: possibility(0.3) ? faker.name.lastName() : undefined,
          role: Role.Manager,
        }),
      );
    });
    membershipRequests.forEach((membershipRequest) => {
      if (membershipRequest.status !== MembershipRequestStatus.Accepted) return;
      memberships.push(
        em.create(Membership, {
          owner: membershipRequest.owner,
          team: membershipRequest.team,
          name: possibility(0.3) ? faker.name.lastName() : undefined,
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
    teams.forEach((team) => {
      const managers = team.memberships
        .getItems()
        .filter((m) => m.role === Role.Manager);
      managers.forEach((manager) => {
        const prevLength = tasks.length;
        const count = faker.datatype.number({ min: 0, max: 10 });
        while (tasks.length - prevLength !== count) {
          tasks.push(
            em.create(Task, {
              team,
              creator: manager,
              title: faker.random.words(
                faker.datatype.number({ min: 1, max: 8 }),
              ),
              endsAfter: faker.datatype.datetime({
                min: 0,
                max: 1000 * 60 * 60 * 24 * 30,
              }),
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
      const members = task.team.memberships
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
