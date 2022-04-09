import { Injectable } from '@angular/core';
import { gql } from 'apollo-angular';
import * as Apollo from 'apollo-angular';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
};

export type AcceptApplicationResult = {
  __typename?: 'AcceptApplicationResult';
  application: Application;
  membership: Membership;
};

export type Application = {
  __typename?: 'Application';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  message?: Maybe<Scalars['String']>;
  owner: User;
  room: Room;
  status: ApplicationStatus;
  updatedAt: Scalars['DateTime'];
};

export type ApplicationCreateInput = {
  message?: Maybe<Scalars['String']>;
  room: Scalars['ID'];
};

export type ApplicationFilterMap = {
  createdAt?: Maybe<Scalars['DateTime']>;
  createdAt__eq?: Maybe<Scalars['DateTime']>;
  createdAt__gt?: Maybe<Scalars['DateTime']>;
  createdAt__gte?: Maybe<Scalars['DateTime']>;
  createdAt__in?: Maybe<Array<Scalars['DateTime']>>;
  createdAt__like?: Maybe<Scalars['String']>;
  createdAt__lt?: Maybe<Scalars['DateTime']>;
  createdAt__lte?: Maybe<Scalars['DateTime']>;
  createdAt__ne?: Maybe<Scalars['DateTime']>;
  createdAt__nin?: Maybe<Array<Scalars['DateTime']>>;
  id?: Maybe<Scalars['ID']>;
  id__eq?: Maybe<Scalars['ID']>;
  id__gt?: Maybe<Scalars['ID']>;
  id__gte?: Maybe<Scalars['ID']>;
  id__in?: Maybe<Array<Scalars['ID']>>;
  id__like?: Maybe<Scalars['String']>;
  id__lt?: Maybe<Scalars['ID']>;
  id__lte?: Maybe<Scalars['ID']>;
  id__ne?: Maybe<Scalars['ID']>;
  id__nin?: Maybe<Array<Scalars['ID']>>;
  message?: Maybe<Scalars['String']>;
  message__eq?: Maybe<Scalars['String']>;
  message__gt?: Maybe<Scalars['String']>;
  message__gte?: Maybe<Scalars['String']>;
  message__in?: Maybe<Array<Scalars['String']>>;
  message__like?: Maybe<Scalars['String']>;
  message__lt?: Maybe<Scalars['String']>;
  message__lte?: Maybe<Scalars['String']>;
  message__ne?: Maybe<Scalars['String']>;
  message__nin?: Maybe<Array<Scalars['String']>>;
  status?: Maybe<ApplicationStatus>;
  status__eq?: Maybe<ApplicationStatus>;
  status__gt?: Maybe<ApplicationStatus>;
  status__gte?: Maybe<ApplicationStatus>;
  status__in?: Maybe<Array<ApplicationStatus>>;
  status__like?: Maybe<Scalars['String']>;
  status__lt?: Maybe<ApplicationStatus>;
  status__lte?: Maybe<ApplicationStatus>;
  status__ne?: Maybe<ApplicationStatus>;
  status__nin?: Maybe<Array<ApplicationStatus>>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedAt__eq?: Maybe<Scalars['DateTime']>;
  updatedAt__gt?: Maybe<Scalars['DateTime']>;
  updatedAt__gte?: Maybe<Scalars['DateTime']>;
  updatedAt__in?: Maybe<Array<Scalars['DateTime']>>;
  updatedAt__like?: Maybe<Scalars['String']>;
  updatedAt__lt?: Maybe<Scalars['DateTime']>;
  updatedAt__lte?: Maybe<Scalars['DateTime']>;
  updatedAt__ne?: Maybe<Scalars['DateTime']>;
  updatedAt__nin?: Maybe<Array<Scalars['DateTime']>>;
};

export type ApplicationOrderMap = {
  createdAt?: Maybe<QueryOrder>;
  id?: Maybe<QueryOrder>;
  message?: Maybe<QueryOrder>;
  status?: Maybe<QueryOrder>;
  updatedAt?: Maybe<QueryOrder>;
};

export enum ApplicationStatus {
  Accepted = 'Accepted',
  Pending = 'Pending',
  Rejected = 'Rejected',
}

export type Assignment = {
  __typename?: 'Assignment';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  isCompleted: Scalars['Boolean'];
  isImportant: Scalars['Boolean'];
  recipient: Membership;
  task: Task;
  updatedAt: Scalars['DateTime'];
};

export type AssignmentCreateInput = {
  isImportant?: Maybe<Scalars['Boolean']>;
  recipient: Scalars['ID'];
  task: Scalars['ID'];
};

export type AssignmentFilterMap = {
  createdAt?: Maybe<Scalars['DateTime']>;
  createdAt__eq?: Maybe<Scalars['DateTime']>;
  createdAt__gt?: Maybe<Scalars['DateTime']>;
  createdAt__gte?: Maybe<Scalars['DateTime']>;
  createdAt__in?: Maybe<Array<Scalars['DateTime']>>;
  createdAt__like?: Maybe<Scalars['String']>;
  createdAt__lt?: Maybe<Scalars['DateTime']>;
  createdAt__lte?: Maybe<Scalars['DateTime']>;
  createdAt__ne?: Maybe<Scalars['DateTime']>;
  createdAt__nin?: Maybe<Array<Scalars['DateTime']>>;
  id?: Maybe<Scalars['ID']>;
  id__eq?: Maybe<Scalars['ID']>;
  id__gt?: Maybe<Scalars['ID']>;
  id__gte?: Maybe<Scalars['ID']>;
  id__in?: Maybe<Array<Scalars['ID']>>;
  id__like?: Maybe<Scalars['String']>;
  id__lt?: Maybe<Scalars['ID']>;
  id__lte?: Maybe<Scalars['ID']>;
  id__ne?: Maybe<Scalars['ID']>;
  id__nin?: Maybe<Array<Scalars['ID']>>;
  isCompleted?: Maybe<Scalars['Boolean']>;
  isCompleted__eq?: Maybe<Scalars['Boolean']>;
  isCompleted__gt?: Maybe<Scalars['Boolean']>;
  isCompleted__gte?: Maybe<Scalars['Boolean']>;
  isCompleted__in?: Maybe<Array<Scalars['Boolean']>>;
  isCompleted__like?: Maybe<Scalars['String']>;
  isCompleted__lt?: Maybe<Scalars['Boolean']>;
  isCompleted__lte?: Maybe<Scalars['Boolean']>;
  isCompleted__ne?: Maybe<Scalars['Boolean']>;
  isCompleted__nin?: Maybe<Array<Scalars['Boolean']>>;
  isImportant?: Maybe<Scalars['Boolean']>;
  isImportant__eq?: Maybe<Scalars['Boolean']>;
  isImportant__gt?: Maybe<Scalars['Boolean']>;
  isImportant__gte?: Maybe<Scalars['Boolean']>;
  isImportant__in?: Maybe<Array<Scalars['Boolean']>>;
  isImportant__like?: Maybe<Scalars['String']>;
  isImportant__lt?: Maybe<Scalars['Boolean']>;
  isImportant__lte?: Maybe<Scalars['Boolean']>;
  isImportant__ne?: Maybe<Scalars['Boolean']>;
  isImportant__nin?: Maybe<Array<Scalars['Boolean']>>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedAt__eq?: Maybe<Scalars['DateTime']>;
  updatedAt__gt?: Maybe<Scalars['DateTime']>;
  updatedAt__gte?: Maybe<Scalars['DateTime']>;
  updatedAt__in?: Maybe<Array<Scalars['DateTime']>>;
  updatedAt__like?: Maybe<Scalars['String']>;
  updatedAt__lt?: Maybe<Scalars['DateTime']>;
  updatedAt__lte?: Maybe<Scalars['DateTime']>;
  updatedAt__ne?: Maybe<Scalars['DateTime']>;
  updatedAt__nin?: Maybe<Array<Scalars['DateTime']>>;
};

export type AssignmentOrderMap = {
  createdAt?: Maybe<QueryOrder>;
  id?: Maybe<QueryOrder>;
  isCompleted?: Maybe<QueryOrder>;
  isImportant?: Maybe<QueryOrder>;
  updatedAt?: Maybe<QueryOrder>;
};

export type AssignmentUpdateInput = {
  isCompleted?: Maybe<Scalars['Boolean']>;
  isImportant?: Maybe<Scalars['Boolean']>;
};

export type AuthResult = {
  __typename?: 'AuthResult';
  token: Scalars['String'];
  user: User;
};

export enum Gender {
  Female = 'Female',
  Male = 'Male',
  Unknown = 'Unknown',
}

export type Membership = {
  __typename?: 'Membership';
  assignments: PaginatedAssignments;
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  owner: User;
  role: Role;
  room: Room;
  tasks: PaginatedTasks;
  updatedAt: Scalars['DateTime'];
};

export type MembershipAssignmentsArgs = {
  filter?: Maybe<AssignmentFilterMap>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order?: Maybe<AssignmentOrderMap>;
  ownOnly?: Maybe<Scalars['Boolean']>;
};

export type MembershipTasksArgs = {
  filter?: Maybe<TaskFilterMap>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order?: Maybe<TaskOrderMap>;
  ownOnly?: Maybe<Scalars['Boolean']>;
};

export type MembershipFilterMap = {
  createdAt?: Maybe<Scalars['DateTime']>;
  createdAt__eq?: Maybe<Scalars['DateTime']>;
  createdAt__gt?: Maybe<Scalars['DateTime']>;
  createdAt__gte?: Maybe<Scalars['DateTime']>;
  createdAt__in?: Maybe<Array<Scalars['DateTime']>>;
  createdAt__like?: Maybe<Scalars['String']>;
  createdAt__lt?: Maybe<Scalars['DateTime']>;
  createdAt__lte?: Maybe<Scalars['DateTime']>;
  createdAt__ne?: Maybe<Scalars['DateTime']>;
  createdAt__nin?: Maybe<Array<Scalars['DateTime']>>;
  id?: Maybe<Scalars['ID']>;
  id__eq?: Maybe<Scalars['ID']>;
  id__gt?: Maybe<Scalars['ID']>;
  id__gte?: Maybe<Scalars['ID']>;
  id__in?: Maybe<Array<Scalars['ID']>>;
  id__like?: Maybe<Scalars['String']>;
  id__lt?: Maybe<Scalars['ID']>;
  id__lte?: Maybe<Scalars['ID']>;
  id__ne?: Maybe<Scalars['ID']>;
  id__nin?: Maybe<Array<Scalars['ID']>>;
  role?: Maybe<Role>;
  role__eq?: Maybe<Role>;
  role__gt?: Maybe<Role>;
  role__gte?: Maybe<Role>;
  role__in?: Maybe<Array<Role>>;
  role__like?: Maybe<Scalars['String']>;
  role__lt?: Maybe<Role>;
  role__lte?: Maybe<Role>;
  role__ne?: Maybe<Role>;
  role__nin?: Maybe<Array<Role>>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedAt__eq?: Maybe<Scalars['DateTime']>;
  updatedAt__gt?: Maybe<Scalars['DateTime']>;
  updatedAt__gte?: Maybe<Scalars['DateTime']>;
  updatedAt__in?: Maybe<Array<Scalars['DateTime']>>;
  updatedAt__like?: Maybe<Scalars['String']>;
  updatedAt__lt?: Maybe<Scalars['DateTime']>;
  updatedAt__lte?: Maybe<Scalars['DateTime']>;
  updatedAt__ne?: Maybe<Scalars['DateTime']>;
  updatedAt__nin?: Maybe<Array<Scalars['DateTime']>>;
};

export type MembershipOrderMap = {
  createdAt?: Maybe<QueryOrder>;
  id?: Maybe<QueryOrder>;
  role?: Maybe<QueryOrder>;
  updatedAt?: Maybe<QueryOrder>;
};

export type MembershipUpdateInput = {
  role?: Maybe<Role>;
};

export type Mutation = {
  __typename?: 'Mutation';
  acceptApplication: AcceptApplicationResult;
  auth: AuthResult;
  createApplication: Application;
  createAssignment: Assignment;
  createRoom: Room;
  createTask: Task;
  createUser: User;
  deleteApplication: Application;
  deleteAssignment: Assignment;
  deleteMembership: Membership;
  deleteRoom: Room;
  deleteTask: Task;
  rejectApplication: Application;
  updateAssignment: Assignment;
  updateMembership: Membership;
  updateRoom: Room;
  updateTask: Task;
  updateUser: User;
};

export type MutationAcceptApplicationArgs = {
  id: Scalars['ID'];
};

export type MutationAuthArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};

export type MutationCreateApplicationArgs = {
  data: ApplicationCreateInput;
};

export type MutationCreateAssignmentArgs = {
  data: AssignmentCreateInput;
};

export type MutationCreateRoomArgs = {
  data: RoomCreateInput;
};

export type MutationCreateTaskArgs = {
  data: TaskCreateInput;
};

export type MutationCreateUserArgs = {
  data: UserCreateInput;
};

export type MutationDeleteApplicationArgs = {
  id: Scalars['ID'];
};

export type MutationDeleteAssignmentArgs = {
  id: Scalars['ID'];
};

export type MutationDeleteMembershipArgs = {
  id: Scalars['ID'];
};

export type MutationDeleteRoomArgs = {
  id: Scalars['ID'];
};

export type MutationDeleteTaskArgs = {
  id: Scalars['ID'];
};

export type MutationRejectApplicationArgs = {
  id: Scalars['ID'];
};

export type MutationUpdateAssignmentArgs = {
  data: AssignmentUpdateInput;
  id: Scalars['ID'];
};

export type MutationUpdateMembershipArgs = {
  data: MembershipUpdateInput;
  id: Scalars['ID'];
};

export type MutationUpdateRoomArgs = {
  data: RoomUpdateInput;
  id: Scalars['ID'];
};

export type MutationUpdateTaskArgs = {
  data: TaskUpdateInput;
  id: Scalars['ID'];
};

export type MutationUpdateUserArgs = {
  data: UserUpdateInput;
  id: Scalars['ID'];
};

export type PaginatedApplications = {
  __typename?: 'PaginatedApplications';
  results: Array<Application>;
  total: Scalars['Int'];
};

export type PaginatedAssignments = {
  __typename?: 'PaginatedAssignments';
  results: Array<Assignment>;
  total: Scalars['Int'];
};

export type PaginatedMemberships = {
  __typename?: 'PaginatedMemberships';
  results: Array<Membership>;
  total: Scalars['Int'];
};

export type PaginatedRooms = {
  __typename?: 'PaginatedRooms';
  results: Array<Room>;
  total: Scalars['Int'];
};

export type PaginatedTasks = {
  __typename?: 'PaginatedTasks';
  results: Array<Task>;
  total: Scalars['Int'];
};

export type PaginatedUsers = {
  __typename?: 'PaginatedUsers';
  results: Array<User>;
  total: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  application: Application;
  applications: PaginatedApplications;
  assignment: Assignment;
  assignments: PaginatedAssignments;
  me: User;
  membership: Membership;
  memberships: PaginatedMemberships;
  room: Room;
  rooms: PaginatedRooms;
  task: Task;
  tasks: PaginatedTasks;
  user: User;
  users: PaginatedUsers;
};

export type QueryApplicationArgs = {
  id: Scalars['ID'];
};

export type QueryApplicationsArgs = {
  filter?: Maybe<ApplicationFilterMap>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order?: Maybe<ApplicationOrderMap>;
};

export type QueryAssignmentArgs = {
  id: Scalars['ID'];
};

export type QueryAssignmentsArgs = {
  filter?: Maybe<AssignmentFilterMap>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order?: Maybe<AssignmentOrderMap>;
  ownOnly?: Maybe<Scalars['Boolean']>;
};

export type QueryMembershipArgs = {
  id: Scalars['ID'];
};

export type QueryMembershipsArgs = {
  filter?: Maybe<MembershipFilterMap>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order?: Maybe<MembershipOrderMap>;
};

export type QueryRoomArgs = {
  id: Scalars['ID'];
};

export type QueryRoomsArgs = {
  filter?: Maybe<RoomFilterMap>;
  joinedOnly?: Maybe<Scalars['Boolean']>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order?: Maybe<RoomOrderMap>;
};

export type QueryTaskArgs = {
  id: Scalars['ID'];
};

export type QueryTasksArgs = {
  filter?: Maybe<TaskFilterMap>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order?: Maybe<TaskOrderMap>;
  ownOnly?: Maybe<Scalars['Boolean']>;
};

export type QueryUserArgs = {
  id: Scalars['ID'];
};

export type QueryUsersArgs = {
  filter?: Maybe<UserFilterMap>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order?: Maybe<UserOrderMap>;
};

export enum QueryOrder {
  Asc = 'ASC',
  Desc = 'DESC',
}

export enum Role {
  Manager = 'Manager',
  Member = 'Member',
}

export type Room = {
  __typename?: 'Room';
  applications: PaginatedApplications;
  assignments: PaginatedAssignments;
  createdAt: Scalars['DateTime'];
  creator: User;
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  isOpen: Scalars['Boolean'];
  membership?: Maybe<Membership>;
  memberships: PaginatedMemberships;
  name: Scalars['String'];
  tasks: PaginatedTasks;
  updatedAt: Scalars['DateTime'];
};

export type RoomApplicationsArgs = {
  filter?: Maybe<ApplicationFilterMap>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order?: Maybe<ApplicationOrderMap>;
};

export type RoomAssignmentsArgs = {
  filter?: Maybe<AssignmentFilterMap>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order?: Maybe<AssignmentOrderMap>;
  ownOnly?: Maybe<Scalars['Boolean']>;
};

export type RoomMembershipsArgs = {
  filter?: Maybe<MembershipFilterMap>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order?: Maybe<MembershipOrderMap>;
};

export type RoomTasksArgs = {
  filter?: Maybe<TaskFilterMap>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order?: Maybe<TaskOrderMap>;
  ownOnly?: Maybe<Scalars['Boolean']>;
};

export type RoomCreateInput = {
  description?: Maybe<Scalars['String']>;
  name: Scalars['String'];
};

export type RoomFilterMap = {
  createdAt?: Maybe<Scalars['DateTime']>;
  createdAt__eq?: Maybe<Scalars['DateTime']>;
  createdAt__gt?: Maybe<Scalars['DateTime']>;
  createdAt__gte?: Maybe<Scalars['DateTime']>;
  createdAt__in?: Maybe<Array<Scalars['DateTime']>>;
  createdAt__like?: Maybe<Scalars['String']>;
  createdAt__lt?: Maybe<Scalars['DateTime']>;
  createdAt__lte?: Maybe<Scalars['DateTime']>;
  createdAt__ne?: Maybe<Scalars['DateTime']>;
  createdAt__nin?: Maybe<Array<Scalars['DateTime']>>;
  description?: Maybe<Scalars['String']>;
  description__eq?: Maybe<Scalars['String']>;
  description__gt?: Maybe<Scalars['String']>;
  description__gte?: Maybe<Scalars['String']>;
  description__in?: Maybe<Array<Scalars['String']>>;
  description__like?: Maybe<Scalars['String']>;
  description__lt?: Maybe<Scalars['String']>;
  description__lte?: Maybe<Scalars['String']>;
  description__ne?: Maybe<Scalars['String']>;
  description__nin?: Maybe<Array<Scalars['String']>>;
  id?: Maybe<Scalars['ID']>;
  id__eq?: Maybe<Scalars['ID']>;
  id__gt?: Maybe<Scalars['ID']>;
  id__gte?: Maybe<Scalars['ID']>;
  id__in?: Maybe<Array<Scalars['ID']>>;
  id__like?: Maybe<Scalars['String']>;
  id__lt?: Maybe<Scalars['ID']>;
  id__lte?: Maybe<Scalars['ID']>;
  id__ne?: Maybe<Scalars['ID']>;
  id__nin?: Maybe<Array<Scalars['ID']>>;
  isOpen?: Maybe<Scalars['Boolean']>;
  isOpen__eq?: Maybe<Scalars['Boolean']>;
  isOpen__gt?: Maybe<Scalars['Boolean']>;
  isOpen__gte?: Maybe<Scalars['Boolean']>;
  isOpen__in?: Maybe<Array<Scalars['Boolean']>>;
  isOpen__like?: Maybe<Scalars['String']>;
  isOpen__lt?: Maybe<Scalars['Boolean']>;
  isOpen__lte?: Maybe<Scalars['Boolean']>;
  isOpen__ne?: Maybe<Scalars['Boolean']>;
  isOpen__nin?: Maybe<Array<Scalars['Boolean']>>;
  name?: Maybe<Scalars['String']>;
  name__eq?: Maybe<Scalars['String']>;
  name__gt?: Maybe<Scalars['String']>;
  name__gte?: Maybe<Scalars['String']>;
  name__in?: Maybe<Array<Scalars['String']>>;
  name__like?: Maybe<Scalars['String']>;
  name__lt?: Maybe<Scalars['String']>;
  name__lte?: Maybe<Scalars['String']>;
  name__ne?: Maybe<Scalars['String']>;
  name__nin?: Maybe<Array<Scalars['String']>>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedAt__eq?: Maybe<Scalars['DateTime']>;
  updatedAt__gt?: Maybe<Scalars['DateTime']>;
  updatedAt__gte?: Maybe<Scalars['DateTime']>;
  updatedAt__in?: Maybe<Array<Scalars['DateTime']>>;
  updatedAt__like?: Maybe<Scalars['String']>;
  updatedAt__lt?: Maybe<Scalars['DateTime']>;
  updatedAt__lte?: Maybe<Scalars['DateTime']>;
  updatedAt__ne?: Maybe<Scalars['DateTime']>;
  updatedAt__nin?: Maybe<Array<Scalars['DateTime']>>;
};

export type RoomOrderMap = {
  createdAt?: Maybe<QueryOrder>;
  description?: Maybe<QueryOrder>;
  id?: Maybe<QueryOrder>;
  isOpen?: Maybe<QueryOrder>;
  name?: Maybe<QueryOrder>;
  updatedAt?: Maybe<QueryOrder>;
};

export type RoomUpdateInput = {
  description?: Maybe<Scalars['String']>;
  isOpen?: Maybe<Scalars['Boolean']>;
  name?: Maybe<Scalars['String']>;
};

export type Task = {
  __typename?: 'Task';
  assignments: PaginatedAssignments;
  createdAt: Scalars['DateTime'];
  creator: Membership;
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  room: Room;
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type TaskAssignmentsArgs = {
  filter?: Maybe<AssignmentFilterMap>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order?: Maybe<AssignmentOrderMap>;
  ownOnly?: Maybe<Scalars['Boolean']>;
};

export type TaskCreateInput = {
  description?: Maybe<Scalars['String']>;
  room: Scalars['ID'];
  title: Scalars['String'];
};

export type TaskFilterMap = {
  createdAt?: Maybe<Scalars['DateTime']>;
  createdAt__eq?: Maybe<Scalars['DateTime']>;
  createdAt__gt?: Maybe<Scalars['DateTime']>;
  createdAt__gte?: Maybe<Scalars['DateTime']>;
  createdAt__in?: Maybe<Array<Scalars['DateTime']>>;
  createdAt__like?: Maybe<Scalars['String']>;
  createdAt__lt?: Maybe<Scalars['DateTime']>;
  createdAt__lte?: Maybe<Scalars['DateTime']>;
  createdAt__ne?: Maybe<Scalars['DateTime']>;
  createdAt__nin?: Maybe<Array<Scalars['DateTime']>>;
  description?: Maybe<Scalars['String']>;
  description__eq?: Maybe<Scalars['String']>;
  description__gt?: Maybe<Scalars['String']>;
  description__gte?: Maybe<Scalars['String']>;
  description__in?: Maybe<Array<Scalars['String']>>;
  description__like?: Maybe<Scalars['String']>;
  description__lt?: Maybe<Scalars['String']>;
  description__lte?: Maybe<Scalars['String']>;
  description__ne?: Maybe<Scalars['String']>;
  description__nin?: Maybe<Array<Scalars['String']>>;
  id?: Maybe<Scalars['ID']>;
  id__eq?: Maybe<Scalars['ID']>;
  id__gt?: Maybe<Scalars['ID']>;
  id__gte?: Maybe<Scalars['ID']>;
  id__in?: Maybe<Array<Scalars['ID']>>;
  id__like?: Maybe<Scalars['String']>;
  id__lt?: Maybe<Scalars['ID']>;
  id__lte?: Maybe<Scalars['ID']>;
  id__ne?: Maybe<Scalars['ID']>;
  id__nin?: Maybe<Array<Scalars['ID']>>;
  isActive?: Maybe<Scalars['Boolean']>;
  isActive__eq?: Maybe<Scalars['Boolean']>;
  isActive__gt?: Maybe<Scalars['Boolean']>;
  isActive__gte?: Maybe<Scalars['Boolean']>;
  isActive__in?: Maybe<Array<Scalars['Boolean']>>;
  isActive__like?: Maybe<Scalars['String']>;
  isActive__lt?: Maybe<Scalars['Boolean']>;
  isActive__lte?: Maybe<Scalars['Boolean']>;
  isActive__ne?: Maybe<Scalars['Boolean']>;
  isActive__nin?: Maybe<Array<Scalars['Boolean']>>;
  title?: Maybe<Scalars['String']>;
  title__eq?: Maybe<Scalars['String']>;
  title__gt?: Maybe<Scalars['String']>;
  title__gte?: Maybe<Scalars['String']>;
  title__in?: Maybe<Array<Scalars['String']>>;
  title__like?: Maybe<Scalars['String']>;
  title__lt?: Maybe<Scalars['String']>;
  title__lte?: Maybe<Scalars['String']>;
  title__ne?: Maybe<Scalars['String']>;
  title__nin?: Maybe<Array<Scalars['String']>>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedAt__eq?: Maybe<Scalars['DateTime']>;
  updatedAt__gt?: Maybe<Scalars['DateTime']>;
  updatedAt__gte?: Maybe<Scalars['DateTime']>;
  updatedAt__in?: Maybe<Array<Scalars['DateTime']>>;
  updatedAt__like?: Maybe<Scalars['String']>;
  updatedAt__lt?: Maybe<Scalars['DateTime']>;
  updatedAt__lte?: Maybe<Scalars['DateTime']>;
  updatedAt__ne?: Maybe<Scalars['DateTime']>;
  updatedAt__nin?: Maybe<Array<Scalars['DateTime']>>;
};

export type TaskOrderMap = {
  createdAt?: Maybe<QueryOrder>;
  description?: Maybe<QueryOrder>;
  id?: Maybe<QueryOrder>;
  isActive?: Maybe<QueryOrder>;
  title?: Maybe<QueryOrder>;
  updatedAt?: Maybe<QueryOrder>;
};

export type TaskUpdateInput = {
  description?: Maybe<Scalars['String']>;
  isActive?: Maybe<Scalars['Boolean']>;
  room?: Maybe<Scalars['ID']>;
  title?: Maybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  applications: PaginatedApplications;
  assignments: PaginatedAssignments;
  createdAt: Scalars['DateTime'];
  gender: Gender;
  id: Scalars['ID'];
  memberships: PaginatedMemberships;
  nickname?: Maybe<Scalars['String']>;
  rooms: PaginatedRooms;
  tasks: PaginatedTasks;
  updatedAt: Scalars['DateTime'];
  username: Scalars['String'];
};

export type UserApplicationsArgs = {
  filter?: Maybe<ApplicationFilterMap>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order?: Maybe<ApplicationOrderMap>;
};

export type UserAssignmentsArgs = {
  filter?: Maybe<AssignmentFilterMap>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order?: Maybe<AssignmentOrderMap>;
  ownOnly?: Maybe<Scalars['Boolean']>;
};

export type UserMembershipsArgs = {
  filter?: Maybe<MembershipFilterMap>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order?: Maybe<MembershipOrderMap>;
};

export type UserRoomsArgs = {
  filter?: Maybe<RoomFilterMap>;
  joinedOnly?: Maybe<Scalars['Boolean']>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order?: Maybe<RoomOrderMap>;
};

export type UserTasksArgs = {
  filter?: Maybe<TaskFilterMap>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order?: Maybe<TaskOrderMap>;
  ownOnly?: Maybe<Scalars['Boolean']>;
};

export type UserCreateInput = {
  gender?: Maybe<Gender>;
  nickname?: Maybe<Scalars['String']>;
  password: Scalars['String'];
  username: Scalars['String'];
};

export type UserFilterMap = {
  createdAt?: Maybe<Scalars['DateTime']>;
  createdAt__eq?: Maybe<Scalars['DateTime']>;
  createdAt__gt?: Maybe<Scalars['DateTime']>;
  createdAt__gte?: Maybe<Scalars['DateTime']>;
  createdAt__in?: Maybe<Array<Scalars['DateTime']>>;
  createdAt__like?: Maybe<Scalars['String']>;
  createdAt__lt?: Maybe<Scalars['DateTime']>;
  createdAt__lte?: Maybe<Scalars['DateTime']>;
  createdAt__ne?: Maybe<Scalars['DateTime']>;
  createdAt__nin?: Maybe<Array<Scalars['DateTime']>>;
  gender?: Maybe<Gender>;
  gender__eq?: Maybe<Gender>;
  gender__gt?: Maybe<Gender>;
  gender__gte?: Maybe<Gender>;
  gender__in?: Maybe<Array<Gender>>;
  gender__like?: Maybe<Scalars['String']>;
  gender__lt?: Maybe<Gender>;
  gender__lte?: Maybe<Gender>;
  gender__ne?: Maybe<Gender>;
  gender__nin?: Maybe<Array<Gender>>;
  id?: Maybe<Scalars['ID']>;
  id__eq?: Maybe<Scalars['ID']>;
  id__gt?: Maybe<Scalars['ID']>;
  id__gte?: Maybe<Scalars['ID']>;
  id__in?: Maybe<Array<Scalars['ID']>>;
  id__like?: Maybe<Scalars['String']>;
  id__lt?: Maybe<Scalars['ID']>;
  id__lte?: Maybe<Scalars['ID']>;
  id__ne?: Maybe<Scalars['ID']>;
  id__nin?: Maybe<Array<Scalars['ID']>>;
  nickname?: Maybe<Scalars['String']>;
  nickname__eq?: Maybe<Scalars['String']>;
  nickname__gt?: Maybe<Scalars['String']>;
  nickname__gte?: Maybe<Scalars['String']>;
  nickname__in?: Maybe<Array<Scalars['String']>>;
  nickname__like?: Maybe<Scalars['String']>;
  nickname__lt?: Maybe<Scalars['String']>;
  nickname__lte?: Maybe<Scalars['String']>;
  nickname__ne?: Maybe<Scalars['String']>;
  nickname__nin?: Maybe<Array<Scalars['String']>>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedAt__eq?: Maybe<Scalars['DateTime']>;
  updatedAt__gt?: Maybe<Scalars['DateTime']>;
  updatedAt__gte?: Maybe<Scalars['DateTime']>;
  updatedAt__in?: Maybe<Array<Scalars['DateTime']>>;
  updatedAt__like?: Maybe<Scalars['String']>;
  updatedAt__lt?: Maybe<Scalars['DateTime']>;
  updatedAt__lte?: Maybe<Scalars['DateTime']>;
  updatedAt__ne?: Maybe<Scalars['DateTime']>;
  updatedAt__nin?: Maybe<Array<Scalars['DateTime']>>;
  username?: Maybe<Scalars['String']>;
  username__eq?: Maybe<Scalars['String']>;
  username__gt?: Maybe<Scalars['String']>;
  username__gte?: Maybe<Scalars['String']>;
  username__in?: Maybe<Array<Scalars['String']>>;
  username__like?: Maybe<Scalars['String']>;
  username__lt?: Maybe<Scalars['String']>;
  username__lte?: Maybe<Scalars['String']>;
  username__ne?: Maybe<Scalars['String']>;
  username__nin?: Maybe<Array<Scalars['String']>>;
};

export type UserOrderMap = {
  createdAt?: Maybe<QueryOrder>;
  gender?: Maybe<QueryOrder>;
  id?: Maybe<QueryOrder>;
  nickname?: Maybe<QueryOrder>;
  updatedAt?: Maybe<QueryOrder>;
  username?: Maybe<QueryOrder>;
};

export type UserUpdateInput = {
  gender?: Maybe<Gender>;
  nickname?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
};

export type ApplicationAcceptMutationVariables = Exact<{
  id: Scalars['ID'];
}>;

export type ApplicationAcceptMutation = {
  __typename?: 'Mutation';
  acceptApplication: {
    __typename?: 'AcceptApplicationResult';
    application: {
      __typename?: 'Application';
      id: string;
      message?: string | null | undefined;
      status: ApplicationStatus;
      createdAt: any;
      owner: {
        __typename?: 'User';
        id: string;
        username: string;
        nickname?: string | null | undefined;
      };
      room: { __typename?: 'Room'; id: string; name: string };
    };
    membership: {
      __typename?: 'Membership';
      id: string;
      role: Role;
      owner: {
        __typename?: 'User';
        id: string;
        username: string;
        nickname?: string | null | undefined;
        gender: Gender;
      };
    };
  };
};

export type ApplicationCreateMutationVariables = Exact<{
  data: ApplicationCreateInput;
}>;

export type ApplicationCreateMutation = {
  __typename?: 'Mutation';
  createApplication: {
    __typename?: 'Application';
    id: string;
    message?: string | null | undefined;
    status: ApplicationStatus;
    createdAt: any;
    owner: {
      __typename?: 'User';
      id: string;
      username: string;
      nickname?: string | null | undefined;
    };
    room: { __typename?: 'Room'; id: string; name: string };
  };
};

export type ApplicationDeleteMutationVariables = Exact<{
  id: Scalars['ID'];
}>;

export type ApplicationDeleteMutation = {
  __typename?: 'Mutation';
  deleteApplication: { __typename?: 'Application'; id: string };
};

export type ApplicationListQueryVariables = Exact<{
  offset?: Maybe<Scalars['Int']>;
}>;

export type ApplicationListQuery = {
  __typename?: 'Query';
  applications: {
    __typename?: 'PaginatedApplications';
    total: number;
    results: Array<{
      __typename?: 'Application';
      id: string;
      message?: string | null | undefined;
      status: ApplicationStatus;
      createdAt: any;
      owner: {
        __typename?: 'User';
        id: string;
        username: string;
        nickname?: string | null | undefined;
      };
      room: { __typename?: 'Room'; id: string; name: string };
    }>;
  };
};

export type ApplicationRejectMutationVariables = Exact<{
  id: Scalars['ID'];
}>;

export type ApplicationRejectMutation = {
  __typename?: 'Mutation';
  rejectApplication: {
    __typename?: 'Application';
    id: string;
    message?: string | null | undefined;
    status: ApplicationStatus;
    createdAt: any;
    owner: {
      __typename?: 'User';
      id: string;
      username: string;
      nickname?: string | null | undefined;
    };
    room: { __typename?: 'Room'; id: string; name: string };
  };
};

export type ApplicationFragment = {
  __typename?: 'Application';
  id: string;
  message?: string | null | undefined;
  status: ApplicationStatus;
  createdAt: any;
  owner: {
    __typename?: 'User';
    id: string;
    username: string;
    nickname?: string | null | undefined;
  };
  room: { __typename?: 'Room'; id: string; name: string };
};

export type AssignmentCreateMutationVariables = Exact<{
  data: AssignmentCreateInput;
}>;

export type AssignmentCreateMutation = {
  __typename?: 'Mutation';
  createAssignment: {
    __typename?: 'Assignment';
    id: string;
    recipient: { __typename?: 'Membership'; id: string };
  };
};

export type AssignmentDeleteMutationVariables = Exact<{
  id: Scalars['ID'];
}>;

export type AssignmentDeleteMutation = {
  __typename?: 'Mutation';
  deleteAssignment: { __typename?: 'Assignment'; id: string };
};

export type AssignmentUpdateMutationVariables = Exact<{
  id: Scalars['ID'];
  data: AssignmentUpdateInput;
}>;

export type AssignmentUpdateMutation = {
  __typename?: 'Mutation';
  updateAssignment: {
    __typename?: 'Assignment';
    id: string;
    isCompleted: boolean;
    isImportant: boolean;
    updatedAt: any;
  };
};

export type AssignmentFragment = {
  __typename?: 'Assignment';
  id: string;
  recipient: { __typename?: 'Membership'; id: string };
};

export type AuthMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;

export type AuthMutation = {
  __typename?: 'Mutation';
  auth: { __typename?: 'AuthResult'; token: string };
};

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = {
  __typename?: 'Query';
  me: {
    __typename?: 'User';
    id: string;
    username: string;
    nickname?: string | null | undefined;
    gender: Gender;
    updatedAt: any;
  };
};

export type MembershipAssignmentListQueryVariables = Exact<{
  id: Scalars['ID'];
  offset?: Maybe<Scalars['Int']>;
}>;

export type MembershipAssignmentListQuery = {
  __typename?: 'Query';
  membership: {
    __typename?: 'Membership';
    id: string;
    assignments: {
      __typename?: 'PaginatedAssignments';
      total: number;
      results: Array<{
        __typename?: 'Assignment';
        id: string;
        isCompleted: boolean;
        isImportant: boolean;
        createdAt: any;
        updatedAt: any;
        recipient: { __typename?: 'Membership'; id: string };
        task: {
          __typename?: 'Task';
          id: string;
          title: string;
          description?: string | null | undefined;
          creator: {
            __typename?: 'Membership';
            id: string;
            role: Role;
            owner: {
              __typename?: 'User';
              id: string;
              username: string;
              nickname?: string | null | undefined;
              gender: Gender;
            };
          };
        };
      }>;
    };
  };
};

export type MembershipDeleteMutationVariables = Exact<{
  id: Scalars['ID'];
}>;

export type MembershipDeleteMutation = {
  __typename?: 'Mutation';
  deleteMembership: { __typename?: 'Membership'; id: string };
};

export type MembershipTaskListQueryVariables = Exact<{
  id: Scalars['ID'];
  offset?: Maybe<Scalars['Int']>;
}>;

export type MembershipTaskListQuery = {
  __typename?: 'Query';
  membership: {
    __typename?: 'Membership';
    tasks: {
      __typename?: 'PaginatedTasks';
      total: number;
      results: Array<{
        __typename?: 'Task';
        id: string;
        title: string;
        description?: string | null | undefined;
        createdAt: any;
        assignments: { __typename?: 'PaginatedAssignments'; total: number };
      }>;
    };
  };
};

export type MembershipUpdateMutationVariables = Exact<{
  id: Scalars['ID'];
  data: MembershipUpdateInput;
}>;

export type MembershipUpdateMutation = {
  __typename?: 'Mutation';
  updateMembership: {
    __typename?: 'Membership';
    id: string;
    role: Role;
    owner: {
      __typename?: 'User';
      id: string;
      username: string;
      nickname?: string | null | undefined;
      gender: Gender;
    };
  };
};

export type MembershipFragment = {
  __typename?: 'Membership';
  id: string;
  role: Role;
  owner: {
    __typename?: 'User';
    id: string;
    username: string;
    nickname?: string | null | undefined;
    gender: Gender;
  };
};

export type RoomCreateMutationVariables = Exact<{
  data: RoomCreateInput;
}>;

export type RoomCreateMutation = {
  __typename?: 'Mutation';
  createRoom: {
    __typename?: 'Room';
    id: string;
    name: string;
    description?: string | null | undefined;
    isOpen: boolean;
    creator: {
      __typename?: 'User';
      id: string;
      username: string;
      nickname?: string | null | undefined;
    };
    membership?:
      | { __typename?: 'Membership'; id: string; role: Role }
      | null
      | undefined;
  };
};

export type RoomDeleteMutationVariables = Exact<{
  id: Scalars['ID'];
}>;

export type RoomDeleteMutation = {
  __typename?: 'Mutation';
  deleteRoom: { __typename?: 'Room'; id: string };
};

export type RoomDetailQueryVariables = Exact<{
  id: Scalars['ID'];
}>;

export type RoomDetailQuery = {
  __typename?: 'Query';
  room: {
    __typename?: 'Room';
    id: string;
    name: string;
    description?: string | null | undefined;
    isOpen: boolean;
    creator: {
      __typename?: 'User';
      id: string;
      username: string;
      nickname?: string | null | undefined;
    };
    membership?:
      | { __typename?: 'Membership'; id: string; role: Role }
      | null
      | undefined;
  };
};

export type RoomListQueryVariables = Exact<{
  offset?: Maybe<Scalars['Int']>;
  filter?: Maybe<RoomFilterMap>;
  joinedOnly?: Maybe<Scalars['Boolean']>;
}>;

export type RoomListQuery = {
  __typename?: 'Query';
  rooms: {
    __typename?: 'PaginatedRooms';
    total: number;
    results: Array<{
      __typename?: 'Room';
      id: string;
      name: string;
      description?: string | null | undefined;
      isOpen: boolean;
      creator: {
        __typename?: 'User';
        id: string;
        username: string;
        nickname?: string | null | undefined;
      };
      membership?:
        | { __typename?: 'Membership'; id: string; role: Role }
        | null
        | undefined;
    }>;
  };
};

export type RoomMembershipListQueryVariables = Exact<{
  id: Scalars['ID'];
}>;

export type RoomMembershipListQuery = {
  __typename?: 'Query';
  room: {
    __typename?: 'Room';
    id: string;
    memberships: {
      __typename?: 'PaginatedMemberships';
      total: number;
      results: Array<{
        __typename?: 'Membership';
        id: string;
        role: Role;
        owner: {
          __typename?: 'User';
          id: string;
          username: string;
          nickname?: string | null | undefined;
          gender: Gender;
        };
      }>;
    };
  };
};

export type RoomUpdateMutationVariables = Exact<{
  id: Scalars['ID'];
  data: RoomUpdateInput;
}>;

export type RoomUpdateMutation = {
  __typename?: 'Mutation';
  updateRoom: {
    __typename?: 'Room';
    id: string;
    name: string;
    description?: string | null | undefined;
    isOpen: boolean;
    creator: {
      __typename?: 'User';
      id: string;
      username: string;
      nickname?: string | null | undefined;
    };
    membership?:
      | { __typename?: 'Membership'; id: string; role: Role }
      | null
      | undefined;
  };
};

export type RoomFragment = {
  __typename?: 'Room';
  id: string;
  name: string;
  description?: string | null | undefined;
  isOpen: boolean;
  creator: {
    __typename?: 'User';
    id: string;
    username: string;
    nickname?: string | null | undefined;
  };
  membership?:
    | { __typename?: 'Membership'; id: string; role: Role }
    | null
    | undefined;
};

export type TaskAssignmentListQueryVariables = Exact<{
  id: Scalars['ID'];
}>;

export type TaskAssignmentListQuery = {
  __typename?: 'Query';
  task: {
    __typename?: 'Task';
    id: string;
    assignments: {
      __typename?: 'PaginatedAssignments';
      total: number;
      results: Array<{
        __typename?: 'Assignment';
        id: string;
        recipient: { __typename?: 'Membership'; id: string };
      }>;
    };
  };
};

export type TaskCreateMutationVariables = Exact<{
  data: TaskCreateInput;
}>;

export type TaskCreateMutation = {
  __typename?: 'Mutation';
  createTask: {
    __typename?: 'Task';
    id: string;
    title: string;
    description?: string | null | undefined;
    createdAt: any;
    assignments: { __typename?: 'PaginatedAssignments'; total: number };
  };
};

export type TaskDeleteMutationVariables = Exact<{
  id: Scalars['ID'];
}>;

export type TaskDeleteMutation = {
  __typename?: 'Mutation';
  deleteTask: { __typename?: 'Task'; id: string };
};

export type TaskUpdateMutationVariables = Exact<{
  id: Scalars['ID'];
  data: TaskUpdateInput;
}>;

export type TaskUpdateMutation = {
  __typename?: 'Mutation';
  updateTask: {
    __typename?: 'Task';
    id: string;
    title: string;
    description?: string | null | undefined;
    createdAt: any;
    assignments: { __typename?: 'PaginatedAssignments'; total: number };
  };
};

export type TaskFragment = {
  __typename?: 'Task';
  id: string;
  title: string;
  description?: string | null | undefined;
  createdAt: any;
  assignments: { __typename?: 'PaginatedAssignments'; total: number };
};

export type UserCreateMutationVariables = Exact<{
  data: UserCreateInput;
}>;

export type UserCreateMutation = {
  __typename?: 'Mutation';
  createUser: {
    __typename?: 'User';
    id: string;
    username: string;
    nickname?: string | null | undefined;
    gender: Gender;
    updatedAt: any;
  };
};

export type UserUpdateMutationVariables = Exact<{
  id: Scalars['ID'];
  data: UserUpdateInput;
}>;

export type UserUpdateMutation = {
  __typename?: 'Mutation';
  updateUser: {
    __typename?: 'User';
    id: string;
    username: string;
    nickname?: string | null | undefined;
    gender: Gender;
    updatedAt: any;
  };
};

export type UserFragment = {
  __typename?: 'User';
  id: string;
  username: string;
  nickname?: string | null | undefined;
  gender: Gender;
  updatedAt: any;
};

export const ApplicationFragmentDoc = gql`
  fragment Application on Application {
    id
    owner {
      id
      username
      nickname
    }
    room {
      id
      name
    }
    message
    status
    createdAt
  }
`;
export const AssignmentFragmentDoc = gql`
  fragment Assignment on Assignment {
    id
    recipient {
      id
    }
  }
`;
export const MembershipFragmentDoc = gql`
  fragment Membership on Membership {
    id
    owner {
      id
      username
      nickname
      gender
    }
    role
  }
`;
export const RoomFragmentDoc = gql`
  fragment Room on Room {
    id
    name
    description
    isOpen
    creator {
      id
      username
      nickname
    }
    membership {
      id
      role
    }
  }
`;
export const TaskFragmentDoc = gql`
  fragment Task on Task {
    id
    title
    description
    assignments {
      total
    }
    createdAt
  }
`;
export const UserFragmentDoc = gql`
  fragment User on User {
    id
    username
    nickname
    gender
    updatedAt
  }
`;
export const ApplicationAcceptDocument = gql`
  mutation ApplicationAccept($id: ID!) {
    acceptApplication(id: $id) {
      application {
        ...Application
      }
      membership {
        ...Membership
      }
    }
  }
  ${ApplicationFragmentDoc}
  ${MembershipFragmentDoc}
`;

@Injectable({
  providedIn: 'root',
})
export class ApplicationAcceptGQL extends Apollo.Mutation<
  ApplicationAcceptMutation,
  ApplicationAcceptMutationVariables
> {
  document = ApplicationAcceptDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const ApplicationCreateDocument = gql`
  mutation ApplicationCreate($data: ApplicationCreateInput!) {
    createApplication(data: $data) {
      ...Application
    }
  }
  ${ApplicationFragmentDoc}
`;

@Injectable({
  providedIn: 'root',
})
export class ApplicationCreateGQL extends Apollo.Mutation<
  ApplicationCreateMutation,
  ApplicationCreateMutationVariables
> {
  document = ApplicationCreateDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const ApplicationDeleteDocument = gql`
  mutation ApplicationDelete($id: ID!) {
    deleteApplication(id: $id) {
      id
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class ApplicationDeleteGQL extends Apollo.Mutation<
  ApplicationDeleteMutation,
  ApplicationDeleteMutationVariables
> {
  document = ApplicationDeleteDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const ApplicationListDocument = gql`
  query ApplicationList($offset: Int) {
    applications(limit: 20, offset: $offset, order: { id: DESC }) {
      total
      results {
        ...Application
      }
    }
  }
  ${ApplicationFragmentDoc}
`;

@Injectable({
  providedIn: 'root',
})
export class ApplicationListGQL extends Apollo.Query<
  ApplicationListQuery,
  ApplicationListQueryVariables
> {
  document = ApplicationListDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const ApplicationRejectDocument = gql`
  mutation ApplicationReject($id: ID!) {
    rejectApplication(id: $id) {
      ...Application
    }
  }
  ${ApplicationFragmentDoc}
`;

@Injectable({
  providedIn: 'root',
})
export class ApplicationRejectGQL extends Apollo.Mutation<
  ApplicationRejectMutation,
  ApplicationRejectMutationVariables
> {
  document = ApplicationRejectDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const AssignmentCreateDocument = gql`
  mutation AssignmentCreate($data: AssignmentCreateInput!) {
    createAssignment(data: $data) {
      ...Assignment
    }
  }
  ${AssignmentFragmentDoc}
`;

@Injectable({
  providedIn: 'root',
})
export class AssignmentCreateGQL extends Apollo.Mutation<
  AssignmentCreateMutation,
  AssignmentCreateMutationVariables
> {
  document = AssignmentCreateDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const AssignmentDeleteDocument = gql`
  mutation AssignmentDelete($id: ID!) {
    deleteAssignment(id: $id) {
      id
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class AssignmentDeleteGQL extends Apollo.Mutation<
  AssignmentDeleteMutation,
  AssignmentDeleteMutationVariables
> {
  document = AssignmentDeleteDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const AssignmentUpdateDocument = gql`
  mutation AssignmentUpdate($id: ID!, $data: AssignmentUpdateInput!) {
    updateAssignment(id: $id, data: $data) {
      id
      isCompleted
      isImportant
      updatedAt
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class AssignmentUpdateGQL extends Apollo.Mutation<
  AssignmentUpdateMutation,
  AssignmentUpdateMutationVariables
> {
  document = AssignmentUpdateDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const AuthDocument = gql`
  mutation Auth($username: String!, $password: String!) {
    auth(username: $username, password: $password) {
      token
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class AuthGQL extends Apollo.Mutation<
  AuthMutation,
  AuthMutationVariables
> {
  document = AuthDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const MeDocument = gql`
  query Me {
    me {
      ...User
    }
  }
  ${UserFragmentDoc}
`;

@Injectable({
  providedIn: 'root',
})
export class MeGQL extends Apollo.Query<MeQuery, MeQueryVariables> {
  document = MeDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const MembershipAssignmentListDocument = gql`
  query MembershipAssignmentList($id: ID!, $offset: Int) {
    membership(id: $id) {
      id
      assignments(limit: 20, offset: $offset, order: { updatedAt: DESC }) {
        total
        results {
          id
          recipient {
            id
          }
          task {
            id
            title
            description
            creator {
              ...Membership
            }
          }
          isCompleted
          isImportant
          createdAt
          updatedAt
        }
      }
    }
  }
  ${MembershipFragmentDoc}
`;

@Injectable({
  providedIn: 'root',
})
export class MembershipAssignmentListGQL extends Apollo.Query<
  MembershipAssignmentListQuery,
  MembershipAssignmentListQueryVariables
> {
  document = MembershipAssignmentListDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const MembershipDeleteDocument = gql`
  mutation MembershipDelete($id: ID!) {
    deleteMembership(id: $id) {
      id
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class MembershipDeleteGQL extends Apollo.Mutation<
  MembershipDeleteMutation,
  MembershipDeleteMutationVariables
> {
  document = MembershipDeleteDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const MembershipTaskListDocument = gql`
  query MembershipTaskList($id: ID!, $offset: Int) {
    membership(id: $id) {
      tasks(limit: 20, offset: $offset, order: { id: DESC }) {
        total
        results {
          ...Task
        }
      }
    }
  }
  ${TaskFragmentDoc}
`;

@Injectable({
  providedIn: 'root',
})
export class MembershipTaskListGQL extends Apollo.Query<
  MembershipTaskListQuery,
  MembershipTaskListQueryVariables
> {
  document = MembershipTaskListDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const MembershipUpdateDocument = gql`
  mutation MembershipUpdate($id: ID!, $data: MembershipUpdateInput!) {
    updateMembership(id: $id, data: $data) {
      ...Membership
    }
  }
  ${MembershipFragmentDoc}
`;

@Injectable({
  providedIn: 'root',
})
export class MembershipUpdateGQL extends Apollo.Mutation<
  MembershipUpdateMutation,
  MembershipUpdateMutationVariables
> {
  document = MembershipUpdateDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const RoomCreateDocument = gql`
  mutation RoomCreate($data: RoomCreateInput!) {
    createRoom(data: $data) {
      ...Room
    }
  }
  ${RoomFragmentDoc}
`;

@Injectable({
  providedIn: 'root',
})
export class RoomCreateGQL extends Apollo.Mutation<
  RoomCreateMutation,
  RoomCreateMutationVariables
> {
  document = RoomCreateDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const RoomDeleteDocument = gql`
  mutation RoomDelete($id: ID!) {
    deleteRoom(id: $id) {
      id
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class RoomDeleteGQL extends Apollo.Mutation<
  RoomDeleteMutation,
  RoomDeleteMutationVariables
> {
  document = RoomDeleteDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const RoomDetailDocument = gql`
  query RoomDetail($id: ID!) {
    room(id: $id) {
      ...Room
    }
  }
  ${RoomFragmentDoc}
`;

@Injectable({
  providedIn: 'root',
})
export class RoomDetailGQL extends Apollo.Query<
  RoomDetailQuery,
  RoomDetailQueryVariables
> {
  document = RoomDetailDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const RoomListDocument = gql`
  query RoomList($offset: Int, $filter: RoomFilterMap, $joinedOnly: Boolean) {
    rooms(
      limit: 20
      offset: $offset
      filter: $filter
      joinedOnly: $joinedOnly
    ) {
      total
      results {
        ...Room
      }
    }
  }
  ${RoomFragmentDoc}
`;

@Injectable({
  providedIn: 'root',
})
export class RoomListGQL extends Apollo.Query<
  RoomListQuery,
  RoomListQueryVariables
> {
  document = RoomListDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const RoomMembershipListDocument = gql`
  query RoomMembershipList($id: ID!) {
    room(id: $id) {
      id
      memberships {
        total
        results {
          ...Membership
        }
      }
    }
  }
  ${MembershipFragmentDoc}
`;

@Injectable({
  providedIn: 'root',
})
export class RoomMembershipListGQL extends Apollo.Query<
  RoomMembershipListQuery,
  RoomMembershipListQueryVariables
> {
  document = RoomMembershipListDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const RoomUpdateDocument = gql`
  mutation RoomUpdate($id: ID!, $data: RoomUpdateInput!) {
    updateRoom(id: $id, data: $data) {
      ...Room
    }
  }
  ${RoomFragmentDoc}
`;

@Injectable({
  providedIn: 'root',
})
export class RoomUpdateGQL extends Apollo.Mutation<
  RoomUpdateMutation,
  RoomUpdateMutationVariables
> {
  document = RoomUpdateDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const TaskAssignmentListDocument = gql`
  query TaskAssignmentList($id: ID!) {
    task(id: $id) {
      id
      assignments {
        total
        results {
          ...Assignment
        }
      }
    }
  }
  ${AssignmentFragmentDoc}
`;

@Injectable({
  providedIn: 'root',
})
export class TaskAssignmentListGQL extends Apollo.Query<
  TaskAssignmentListQuery,
  TaskAssignmentListQueryVariables
> {
  document = TaskAssignmentListDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const TaskCreateDocument = gql`
  mutation TaskCreate($data: TaskCreateInput!) {
    createTask(data: $data) {
      ...Task
    }
  }
  ${TaskFragmentDoc}
`;

@Injectable({
  providedIn: 'root',
})
export class TaskCreateGQL extends Apollo.Mutation<
  TaskCreateMutation,
  TaskCreateMutationVariables
> {
  document = TaskCreateDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const TaskDeleteDocument = gql`
  mutation TaskDelete($id: ID!) {
    deleteTask(id: $id) {
      id
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class TaskDeleteGQL extends Apollo.Mutation<
  TaskDeleteMutation,
  TaskDeleteMutationVariables
> {
  document = TaskDeleteDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const TaskUpdateDocument = gql`
  mutation TaskUpdate($id: ID!, $data: TaskUpdateInput!) {
    updateTask(id: $id, data: $data) {
      ...Task
    }
  }
  ${TaskFragmentDoc}
`;

@Injectable({
  providedIn: 'root',
})
export class TaskUpdateGQL extends Apollo.Mutation<
  TaskUpdateMutation,
  TaskUpdateMutationVariables
> {
  document = TaskUpdateDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const UserCreateDocument = gql`
  mutation UserCreate($data: UserCreateInput!) {
    createUser(data: $data) {
      ...User
    }
  }
  ${UserFragmentDoc}
`;

@Injectable({
  providedIn: 'root',
})
export class UserCreateGQL extends Apollo.Mutation<
  UserCreateMutation,
  UserCreateMutationVariables
> {
  document = UserCreateDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const UserUpdateDocument = gql`
  mutation UserUpdate($id: ID!, $data: UserUpdateInput!) {
    updateUser(id: $id, data: $data) {
      ...User
    }
  }
  ${UserFragmentDoc}
`;

@Injectable({
  providedIn: 'root',
})
export class UserUpdateGQL extends Apollo.Mutation<
  UserUpdateMutation,
  UserUpdateMutationVariables
> {
  document = UserUpdateDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
