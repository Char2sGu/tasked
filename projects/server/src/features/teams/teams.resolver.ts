import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CreateTeamArgs } from './dto/create-team.args.dto';
import { DeleteTeamArgs } from './dto/delete-team.args.dto';
import { PaginatedTeams } from './dto/paginated-teams.obj.dto';
import { QueryTeamArgs } from './dto/query-team.args.dto';
import { QueryTeamsArgs } from './dto/query-teams.args.dto';
import { UpdateTeamArgs } from './dto/update-team.args.dto';
import { Team } from './entities/team.entity';
import { TeamsService } from './teams.service';

@Resolver(() => Team)
export class TeamsResolver {
  constructor(private service: TeamsService) {}

  @Query(() => PaginatedTeams)
  async teams(@Args() args: QueryTeamsArgs): Promise<PaginatedTeams> {
    return this.service.queryMany(args);
  }

  @Query(() => Team)
  async team(@Args() args: QueryTeamArgs): Promise<Team> {
    return this.service.queryOne(args);
  }

  @Mutation(() => Team)
  async createTeam(@Args() args: CreateTeamArgs): Promise<Team> {
    return this.service.createOne(args);
  }

  @Mutation(() => Team)
  async updateTeam(@Args() args: UpdateTeamArgs): Promise<Team> {
    return this.service.updateOne(args);
  }

  @Mutation(() => Team)
  async deleteTeam(@Args() args: DeleteTeamArgs): Promise<Team> {
    return this.service.deleteOne(args);
  }
}
