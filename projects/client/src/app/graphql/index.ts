import { Injectable } from '@angular/core';
import { gql } from 'apollo-angular';
import * as Apollo from 'apollo-angular';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
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
  message?: InputMaybe<Scalars['String']>;
  room: Scalars['ID'];
};

export type ApplicationFilterMap = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  createdAt__eq?: InputMaybe<Scalars['DateTime']>;
  createdAt__gt?: InputMaybe<Scalars['DateTime']>;
  createdAt__gte?: InputMaybe<Scalars['DateTime']>;
  createdAt__in?: InputMaybe<Array<Scalars['DateTime']>>;
  createdAt__like?: InputMaybe<Scalars['String']>;
  createdAt__lt?: InputMaybe<Scalars['DateTime']>;
  createdAt__lte?: InputMaybe<Scalars['DateTime']>;
  createdAt__ne?: InputMaybe<Scalars['DateTime']>;
  createdAt__nin?: InputMaybe<Array<Scalars['DateTime']>>;
  id?: InputMaybe<Scalars['ID']>;
  id__eq?: InputMaybe<Scalars['ID']>;
  id__gt?: InputMaybe<Scalars['ID']>;
  id__gte?: InputMaybe<Scalars['ID']>;
  id__in?: InputMaybe<Array<Scalars['ID']>>;
  id__like?: InputMaybe<Scalars['String']>;
  id__lt?: InputMaybe<Scalars['ID']>;
  id__lte?: InputMaybe<Scalars['ID']>;
  id__ne?: InputMaybe<Scalars['ID']>;
  id__nin?: InputMaybe<Array<Scalars['ID']>>;
  message?: InputMaybe<Scalars['String']>;
  message__eq?: InputMaybe<Scalars['String']>;
  message__gt?: InputMaybe<Scalars['String']>;
  message__gte?: InputMaybe<Scalars['String']>;
  message__in?: InputMaybe<Array<Scalars['String']>>;
  message__like?: InputMaybe<Scalars['String']>;
  message__lt?: InputMaybe<Scalars['String']>;
  message__lte?: InputMaybe<Scalars['String']>;
  message__ne?: InputMaybe<Scalars['String']>;
  message__nin?: InputMaybe<Array<Scalars['String']>>;
  status?: InputMaybe<ApplicationStatus>;
  status__eq?: InputMaybe<ApplicationStatus>;
  status__gt?: InputMaybe<ApplicationStatus>;
  status__gte?: InputMaybe<ApplicationStatus>;
  status__in?: InputMaybe<Array<ApplicationStatus>>;
  status__like?: InputMaybe<Scalars['String']>;
  status__lt?: InputMaybe<ApplicationStatus>;
  status__lte?: InputMaybe<ApplicationStatus>;
  status__ne?: InputMaybe<ApplicationStatus>;
  status__nin?: InputMaybe<Array<ApplicationStatus>>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  updatedAt__eq?: InputMaybe<Scalars['DateTime']>;
  updatedAt__gt?: InputMaybe<Scalars['DateTime']>;
  updatedAt__gte?: InputMaybe<Scalars['DateTime']>;
  updatedAt__in?: InputMaybe<Array<Scalars['DateTime']>>;
  updatedAt__like?: InputMaybe<Scalars['String']>;
  updatedAt__lt?: InputMaybe<Scalars['DateTime']>;
  updatedAt__lte?: InputMaybe<Scalars['DateTime']>;
  updatedAt__ne?: InputMaybe<Scalars['DateTime']>;
  updatedAt__nin?: InputMaybe<Array<Scalars['DateTime']>>;
};

export type ApplicationOrderMap = {
  createdAt?: InputMaybe<QueryOrder>;
  id?: InputMaybe<QueryOrder>;
  message?: InputMaybe<QueryOrder>;
  status?: InputMaybe<QueryOrder>;
  updatedAt?: InputMaybe<QueryOrder>;
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
  isImportant?: InputMaybe<Scalars['Boolean']>;
  recipient: Scalars['ID'];
  task: Scalars['ID'];
};

export type AssignmentFilterMap = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  createdAt__eq?: InputMaybe<Scalars['DateTime']>;
  createdAt__gt?: InputMaybe<Scalars['DateTime']>;
  createdAt__gte?: InputMaybe<Scalars['DateTime']>;
  createdAt__in?: InputMaybe<Array<Scalars['DateTime']>>;
  createdAt__like?: InputMaybe<Scalars['String']>;
  createdAt__lt?: InputMaybe<Scalars['DateTime']>;
  createdAt__lte?: InputMaybe<Scalars['DateTime']>;
  createdAt__ne?: InputMaybe<Scalars['DateTime']>;
  createdAt__nin?: InputMaybe<Array<Scalars['DateTime']>>;
  id?: InputMaybe<Scalars['ID']>;
  id__eq?: InputMaybe<Scalars['ID']>;
  id__gt?: InputMaybe<Scalars['ID']>;
  id__gte?: InputMaybe<Scalars['ID']>;
  id__in?: InputMaybe<Array<Scalars['ID']>>;
  id__like?: InputMaybe<Scalars['String']>;
  id__lt?: InputMaybe<Scalars['ID']>;
  id__lte?: InputMaybe<Scalars['ID']>;
  id__ne?: InputMaybe<Scalars['ID']>;
  id__nin?: InputMaybe<Array<Scalars['ID']>>;
  isCompleted?: InputMaybe<Scalars['Boolean']>;
  isCompleted__eq?: InputMaybe<Scalars['Boolean']>;
  isCompleted__gt?: InputMaybe<Scalars['Boolean']>;
  isCompleted__gte?: InputMaybe<Scalars['Boolean']>;
  isCompleted__in?: InputMaybe<Array<Scalars['Boolean']>>;
  isCompleted__like?: InputMaybe<Scalars['String']>;
  isCompleted__lt?: InputMaybe<Scalars['Boolean']>;
  isCompleted__lte?: InputMaybe<Scalars['Boolean']>;
  isCompleted__ne?: InputMaybe<Scalars['Boolean']>;
  isCompleted__nin?: InputMaybe<Array<Scalars['Boolean']>>;
  isImportant?: InputMaybe<Scalars['Boolean']>;
  isImportant__eq?: InputMaybe<Scalars['Boolean']>;
  isImportant__gt?: InputMaybe<Scalars['Boolean']>;
  isImportant__gte?: InputMaybe<Scalars['Boolean']>;
  isImportant__in?: InputMaybe<Array<Scalars['Boolean']>>;
  isImportant__like?: InputMaybe<Scalars['String']>;
  isImportant__lt?: InputMaybe<Scalars['Boolean']>;
  isImportant__lte?: InputMaybe<Scalars['Boolean']>;
  isImportant__ne?: InputMaybe<Scalars['Boolean']>;
  isImportant__nin?: InputMaybe<Array<Scalars['Boolean']>>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  updatedAt__eq?: InputMaybe<Scalars['DateTime']>;
  updatedAt__gt?: InputMaybe<Scalars['DateTime']>;
  updatedAt__gte?: InputMaybe<Scalars['DateTime']>;
  updatedAt__in?: InputMaybe<Array<Scalars['DateTime']>>;
  updatedAt__like?: InputMaybe<Scalars['String']>;
  updatedAt__lt?: InputMaybe<Scalars['DateTime']>;
  updatedAt__lte?: InputMaybe<Scalars['DateTime']>;
  updatedAt__ne?: InputMaybe<Scalars['DateTime']>;
  updatedAt__nin?: InputMaybe<Array<Scalars['DateTime']>>;
};

export type AssignmentOrderMap = {
  createdAt?: InputMaybe<QueryOrder>;
  id?: InputMaybe<QueryOrder>;
  isCompleted?: InputMaybe<QueryOrder>;
  isImportant?: InputMaybe<QueryOrder>;
  updatedAt?: InputMaybe<QueryOrder>;
};

export type AssignmentUpdateInput = {
  isCompleted?: InputMaybe<Scalars['Boolean']>;
  isImportant?: InputMaybe<Scalars['Boolean']>;
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
  filter?: InputMaybe<AssignmentFilterMap>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<AssignmentOrderMap>;
  ownOnly?: InputMaybe<Scalars['Boolean']>;
};

export type MembershipTasksArgs = {
  filter?: InputMaybe<TaskFilterMap>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<TaskOrderMap>;
  ownOnly?: InputMaybe<Scalars['Boolean']>;
};

export type MembershipFilterMap = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  createdAt__eq?: InputMaybe<Scalars['DateTime']>;
  createdAt__gt?: InputMaybe<Scalars['DateTime']>;
  createdAt__gte?: InputMaybe<Scalars['DateTime']>;
  createdAt__in?: InputMaybe<Array<Scalars['DateTime']>>;
  createdAt__like?: InputMaybe<Scalars['String']>;
  createdAt__lt?: InputMaybe<Scalars['DateTime']>;
  createdAt__lte?: InputMaybe<Scalars['DateTime']>;
  createdAt__ne?: InputMaybe<Scalars['DateTime']>;
  createdAt__nin?: InputMaybe<Array<Scalars['DateTime']>>;
  id?: InputMaybe<Scalars['ID']>;
  id__eq?: InputMaybe<Scalars['ID']>;
  id__gt?: InputMaybe<Scalars['ID']>;
  id__gte?: InputMaybe<Scalars['ID']>;
  id__in?: InputMaybe<Array<Scalars['ID']>>;
  id__like?: InputMaybe<Scalars['String']>;
  id__lt?: InputMaybe<Scalars['ID']>;
  id__lte?: InputMaybe<Scalars['ID']>;
  id__ne?: InputMaybe<Scalars['ID']>;
  id__nin?: InputMaybe<Array<Scalars['ID']>>;
  role?: InputMaybe<Role>;
  role__eq?: InputMaybe<Role>;
  role__gt?: InputMaybe<Role>;
  role__gte?: InputMaybe<Role>;
  role__in?: InputMaybe<Array<Role>>;
  role__like?: InputMaybe<Scalars['String']>;
  role__lt?: InputMaybe<Role>;
  role__lte?: InputMaybe<Role>;
  role__ne?: InputMaybe<Role>;
  role__nin?: InputMaybe<Array<Role>>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  updatedAt__eq?: InputMaybe<Scalars['DateTime']>;
  updatedAt__gt?: InputMaybe<Scalars['DateTime']>;
  updatedAt__gte?: InputMaybe<Scalars['DateTime']>;
  updatedAt__in?: InputMaybe<Array<Scalars['DateTime']>>;
  updatedAt__like?: InputMaybe<Scalars['String']>;
  updatedAt__lt?: InputMaybe<Scalars['DateTime']>;
  updatedAt__lte?: InputMaybe<Scalars['DateTime']>;
  updatedAt__ne?: InputMaybe<Scalars['DateTime']>;
  updatedAt__nin?: InputMaybe<Array<Scalars['DateTime']>>;
};

export type MembershipOrderMap = {
  createdAt?: InputMaybe<QueryOrder>;
  id?: InputMaybe<QueryOrder>;
  role?: InputMaybe<QueryOrder>;
  updatedAt?: InputMaybe<QueryOrder>;
};

export type MembershipUpdateInput = {
  role?: InputMaybe<Role>;
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
  filter?: InputMaybe<ApplicationFilterMap>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<ApplicationOrderMap>;
};

export type QueryAssignmentArgs = {
  id: Scalars['ID'];
};

export type QueryAssignmentsArgs = {
  filter?: InputMaybe<AssignmentFilterMap>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<AssignmentOrderMap>;
  ownOnly?: InputMaybe<Scalars['Boolean']>;
};

export type QueryMembershipArgs = {
  id: Scalars['ID'];
};

export type QueryMembershipsArgs = {
  filter?: InputMaybe<MembershipFilterMap>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<MembershipOrderMap>;
};

export type QueryRoomArgs = {
  id: Scalars['ID'];
};

export type QueryRoomsArgs = {
  filter?: InputMaybe<RoomFilterMap>;
  joinedOnly?: InputMaybe<Scalars['Boolean']>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<RoomOrderMap>;
};

export type QueryTaskArgs = {
  id: Scalars['ID'];
};

export type QueryTasksArgs = {
  filter?: InputMaybe<TaskFilterMap>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<TaskOrderMap>;
  ownOnly?: InputMaybe<Scalars['Boolean']>;
};

export type QueryUserArgs = {
  id: Scalars['ID'];
};

export type QueryUsersArgs = {
  filter?: InputMaybe<UserFilterMap>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<UserOrderMap>;
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
  filter?: InputMaybe<ApplicationFilterMap>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<ApplicationOrderMap>;
};

export type RoomAssignmentsArgs = {
  filter?: InputMaybe<AssignmentFilterMap>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<AssignmentOrderMap>;
  ownOnly?: InputMaybe<Scalars['Boolean']>;
};

export type RoomMembershipsArgs = {
  filter?: InputMaybe<MembershipFilterMap>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<MembershipOrderMap>;
};

export type RoomTasksArgs = {
  filter?: InputMaybe<TaskFilterMap>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<TaskOrderMap>;
  ownOnly?: InputMaybe<Scalars['Boolean']>;
};

export type RoomCreateInput = {
  description?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
};

export type RoomFilterMap = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  createdAt__eq?: InputMaybe<Scalars['DateTime']>;
  createdAt__gt?: InputMaybe<Scalars['DateTime']>;
  createdAt__gte?: InputMaybe<Scalars['DateTime']>;
  createdAt__in?: InputMaybe<Array<Scalars['DateTime']>>;
  createdAt__like?: InputMaybe<Scalars['String']>;
  createdAt__lt?: InputMaybe<Scalars['DateTime']>;
  createdAt__lte?: InputMaybe<Scalars['DateTime']>;
  createdAt__ne?: InputMaybe<Scalars['DateTime']>;
  createdAt__nin?: InputMaybe<Array<Scalars['DateTime']>>;
  description?: InputMaybe<Scalars['String']>;
  description__eq?: InputMaybe<Scalars['String']>;
  description__gt?: InputMaybe<Scalars['String']>;
  description__gte?: InputMaybe<Scalars['String']>;
  description__in?: InputMaybe<Array<Scalars['String']>>;
  description__like?: InputMaybe<Scalars['String']>;
  description__lt?: InputMaybe<Scalars['String']>;
  description__lte?: InputMaybe<Scalars['String']>;
  description__ne?: InputMaybe<Scalars['String']>;
  description__nin?: InputMaybe<Array<Scalars['String']>>;
  id?: InputMaybe<Scalars['ID']>;
  id__eq?: InputMaybe<Scalars['ID']>;
  id__gt?: InputMaybe<Scalars['ID']>;
  id__gte?: InputMaybe<Scalars['ID']>;
  id__in?: InputMaybe<Array<Scalars['ID']>>;
  id__like?: InputMaybe<Scalars['String']>;
  id__lt?: InputMaybe<Scalars['ID']>;
  id__lte?: InputMaybe<Scalars['ID']>;
  id__ne?: InputMaybe<Scalars['ID']>;
  id__nin?: InputMaybe<Array<Scalars['ID']>>;
  isOpen?: InputMaybe<Scalars['Boolean']>;
  isOpen__eq?: InputMaybe<Scalars['Boolean']>;
  isOpen__gt?: InputMaybe<Scalars['Boolean']>;
  isOpen__gte?: InputMaybe<Scalars['Boolean']>;
  isOpen__in?: InputMaybe<Array<Scalars['Boolean']>>;
  isOpen__like?: InputMaybe<Scalars['String']>;
  isOpen__lt?: InputMaybe<Scalars['Boolean']>;
  isOpen__lte?: InputMaybe<Scalars['Boolean']>;
  isOpen__ne?: InputMaybe<Scalars['Boolean']>;
  isOpen__nin?: InputMaybe<Array<Scalars['Boolean']>>;
  name?: InputMaybe<Scalars['String']>;
  name__eq?: InputMaybe<Scalars['String']>;
  name__gt?: InputMaybe<Scalars['String']>;
  name__gte?: InputMaybe<Scalars['String']>;
  name__in?: InputMaybe<Array<Scalars['String']>>;
  name__like?: InputMaybe<Scalars['String']>;
  name__lt?: InputMaybe<Scalars['String']>;
  name__lte?: InputMaybe<Scalars['String']>;
  name__ne?: InputMaybe<Scalars['String']>;
  name__nin?: InputMaybe<Array<Scalars['String']>>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  updatedAt__eq?: InputMaybe<Scalars['DateTime']>;
  updatedAt__gt?: InputMaybe<Scalars['DateTime']>;
  updatedAt__gte?: InputMaybe<Scalars['DateTime']>;
  updatedAt__in?: InputMaybe<Array<Scalars['DateTime']>>;
  updatedAt__like?: InputMaybe<Scalars['String']>;
  updatedAt__lt?: InputMaybe<Scalars['DateTime']>;
  updatedAt__lte?: InputMaybe<Scalars['DateTime']>;
  updatedAt__ne?: InputMaybe<Scalars['DateTime']>;
  updatedAt__nin?: InputMaybe<Array<Scalars['DateTime']>>;
};

export type RoomOrderMap = {
  createdAt?: InputMaybe<QueryOrder>;
  description?: InputMaybe<QueryOrder>;
  id?: InputMaybe<QueryOrder>;
  isOpen?: InputMaybe<QueryOrder>;
  name?: InputMaybe<QueryOrder>;
  updatedAt?: InputMaybe<QueryOrder>;
};

export type RoomUpdateInput = {
  creator?: InputMaybe<Scalars['ID']>;
  description?: InputMaybe<Scalars['String']>;
  isOpen?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
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
  filter?: InputMaybe<AssignmentFilterMap>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<AssignmentOrderMap>;
  ownOnly?: InputMaybe<Scalars['Boolean']>;
};

export type TaskCreateInput = {
  description?: InputMaybe<Scalars['String']>;
  room: Scalars['ID'];
  title: Scalars['String'];
};

export type TaskFilterMap = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  createdAt__eq?: InputMaybe<Scalars['DateTime']>;
  createdAt__gt?: InputMaybe<Scalars['DateTime']>;
  createdAt__gte?: InputMaybe<Scalars['DateTime']>;
  createdAt__in?: InputMaybe<Array<Scalars['DateTime']>>;
  createdAt__like?: InputMaybe<Scalars['String']>;
  createdAt__lt?: InputMaybe<Scalars['DateTime']>;
  createdAt__lte?: InputMaybe<Scalars['DateTime']>;
  createdAt__ne?: InputMaybe<Scalars['DateTime']>;
  createdAt__nin?: InputMaybe<Array<Scalars['DateTime']>>;
  description?: InputMaybe<Scalars['String']>;
  description__eq?: InputMaybe<Scalars['String']>;
  description__gt?: InputMaybe<Scalars['String']>;
  description__gte?: InputMaybe<Scalars['String']>;
  description__in?: InputMaybe<Array<Scalars['String']>>;
  description__like?: InputMaybe<Scalars['String']>;
  description__lt?: InputMaybe<Scalars['String']>;
  description__lte?: InputMaybe<Scalars['String']>;
  description__ne?: InputMaybe<Scalars['String']>;
  description__nin?: InputMaybe<Array<Scalars['String']>>;
  id?: InputMaybe<Scalars['ID']>;
  id__eq?: InputMaybe<Scalars['ID']>;
  id__gt?: InputMaybe<Scalars['ID']>;
  id__gte?: InputMaybe<Scalars['ID']>;
  id__in?: InputMaybe<Array<Scalars['ID']>>;
  id__like?: InputMaybe<Scalars['String']>;
  id__lt?: InputMaybe<Scalars['ID']>;
  id__lte?: InputMaybe<Scalars['ID']>;
  id__ne?: InputMaybe<Scalars['ID']>;
  id__nin?: InputMaybe<Array<Scalars['ID']>>;
  isActive?: InputMaybe<Scalars['Boolean']>;
  isActive__eq?: InputMaybe<Scalars['Boolean']>;
  isActive__gt?: InputMaybe<Scalars['Boolean']>;
  isActive__gte?: InputMaybe<Scalars['Boolean']>;
  isActive__in?: InputMaybe<Array<Scalars['Boolean']>>;
  isActive__like?: InputMaybe<Scalars['String']>;
  isActive__lt?: InputMaybe<Scalars['Boolean']>;
  isActive__lte?: InputMaybe<Scalars['Boolean']>;
  isActive__ne?: InputMaybe<Scalars['Boolean']>;
  isActive__nin?: InputMaybe<Array<Scalars['Boolean']>>;
  title?: InputMaybe<Scalars['String']>;
  title__eq?: InputMaybe<Scalars['String']>;
  title__gt?: InputMaybe<Scalars['String']>;
  title__gte?: InputMaybe<Scalars['String']>;
  title__in?: InputMaybe<Array<Scalars['String']>>;
  title__like?: InputMaybe<Scalars['String']>;
  title__lt?: InputMaybe<Scalars['String']>;
  title__lte?: InputMaybe<Scalars['String']>;
  title__ne?: InputMaybe<Scalars['String']>;
  title__nin?: InputMaybe<Array<Scalars['String']>>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  updatedAt__eq?: InputMaybe<Scalars['DateTime']>;
  updatedAt__gt?: InputMaybe<Scalars['DateTime']>;
  updatedAt__gte?: InputMaybe<Scalars['DateTime']>;
  updatedAt__in?: InputMaybe<Array<Scalars['DateTime']>>;
  updatedAt__like?: InputMaybe<Scalars['String']>;
  updatedAt__lt?: InputMaybe<Scalars['DateTime']>;
  updatedAt__lte?: InputMaybe<Scalars['DateTime']>;
  updatedAt__ne?: InputMaybe<Scalars['DateTime']>;
  updatedAt__nin?: InputMaybe<Array<Scalars['DateTime']>>;
};

export type TaskOrderMap = {
  createdAt?: InputMaybe<QueryOrder>;
  description?: InputMaybe<QueryOrder>;
  id?: InputMaybe<QueryOrder>;
  isActive?: InputMaybe<QueryOrder>;
  title?: InputMaybe<QueryOrder>;
  updatedAt?: InputMaybe<QueryOrder>;
};

export type TaskUpdateInput = {
  description?: InputMaybe<Scalars['String']>;
  isActive?: InputMaybe<Scalars['Boolean']>;
  room?: InputMaybe<Scalars['ID']>;
  title?: InputMaybe<Scalars['String']>;
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
  filter?: InputMaybe<ApplicationFilterMap>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<ApplicationOrderMap>;
};

export type UserAssignmentsArgs = {
  filter?: InputMaybe<AssignmentFilterMap>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<AssignmentOrderMap>;
  ownOnly?: InputMaybe<Scalars['Boolean']>;
};

export type UserMembershipsArgs = {
  filter?: InputMaybe<MembershipFilterMap>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<MembershipOrderMap>;
};

export type UserRoomsArgs = {
  filter?: InputMaybe<RoomFilterMap>;
  joinedOnly?: InputMaybe<Scalars['Boolean']>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<RoomOrderMap>;
};

export type UserTasksArgs = {
  filter?: InputMaybe<TaskFilterMap>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<TaskOrderMap>;
  ownOnly?: InputMaybe<Scalars['Boolean']>;
};

export type UserCreateInput = {
  gender?: InputMaybe<Gender>;
  nickname?: InputMaybe<Scalars['String']>;
  password: Scalars['String'];
  username: Scalars['String'];
};

export type UserFilterMap = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  createdAt__eq?: InputMaybe<Scalars['DateTime']>;
  createdAt__gt?: InputMaybe<Scalars['DateTime']>;
  createdAt__gte?: InputMaybe<Scalars['DateTime']>;
  createdAt__in?: InputMaybe<Array<Scalars['DateTime']>>;
  createdAt__like?: InputMaybe<Scalars['String']>;
  createdAt__lt?: InputMaybe<Scalars['DateTime']>;
  createdAt__lte?: InputMaybe<Scalars['DateTime']>;
  createdAt__ne?: InputMaybe<Scalars['DateTime']>;
  createdAt__nin?: InputMaybe<Array<Scalars['DateTime']>>;
  gender?: InputMaybe<Gender>;
  gender__eq?: InputMaybe<Gender>;
  gender__gt?: InputMaybe<Gender>;
  gender__gte?: InputMaybe<Gender>;
  gender__in?: InputMaybe<Array<Gender>>;
  gender__like?: InputMaybe<Scalars['String']>;
  gender__lt?: InputMaybe<Gender>;
  gender__lte?: InputMaybe<Gender>;
  gender__ne?: InputMaybe<Gender>;
  gender__nin?: InputMaybe<Array<Gender>>;
  id?: InputMaybe<Scalars['ID']>;
  id__eq?: InputMaybe<Scalars['ID']>;
  id__gt?: InputMaybe<Scalars['ID']>;
  id__gte?: InputMaybe<Scalars['ID']>;
  id__in?: InputMaybe<Array<Scalars['ID']>>;
  id__like?: InputMaybe<Scalars['String']>;
  id__lt?: InputMaybe<Scalars['ID']>;
  id__lte?: InputMaybe<Scalars['ID']>;
  id__ne?: InputMaybe<Scalars['ID']>;
  id__nin?: InputMaybe<Array<Scalars['ID']>>;
  nickname?: InputMaybe<Scalars['String']>;
  nickname__eq?: InputMaybe<Scalars['String']>;
  nickname__gt?: InputMaybe<Scalars['String']>;
  nickname__gte?: InputMaybe<Scalars['String']>;
  nickname__in?: InputMaybe<Array<Scalars['String']>>;
  nickname__like?: InputMaybe<Scalars['String']>;
  nickname__lt?: InputMaybe<Scalars['String']>;
  nickname__lte?: InputMaybe<Scalars['String']>;
  nickname__ne?: InputMaybe<Scalars['String']>;
  nickname__nin?: InputMaybe<Array<Scalars['String']>>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  updatedAt__eq?: InputMaybe<Scalars['DateTime']>;
  updatedAt__gt?: InputMaybe<Scalars['DateTime']>;
  updatedAt__gte?: InputMaybe<Scalars['DateTime']>;
  updatedAt__in?: InputMaybe<Array<Scalars['DateTime']>>;
  updatedAt__like?: InputMaybe<Scalars['String']>;
  updatedAt__lt?: InputMaybe<Scalars['DateTime']>;
  updatedAt__lte?: InputMaybe<Scalars['DateTime']>;
  updatedAt__ne?: InputMaybe<Scalars['DateTime']>;
  updatedAt__nin?: InputMaybe<Array<Scalars['DateTime']>>;
  username?: InputMaybe<Scalars['String']>;
  username__eq?: InputMaybe<Scalars['String']>;
  username__gt?: InputMaybe<Scalars['String']>;
  username__gte?: InputMaybe<Scalars['String']>;
  username__in?: InputMaybe<Array<Scalars['String']>>;
  username__like?: InputMaybe<Scalars['String']>;
  username__lt?: InputMaybe<Scalars['String']>;
  username__lte?: InputMaybe<Scalars['String']>;
  username__ne?: InputMaybe<Scalars['String']>;
  username__nin?: InputMaybe<Array<Scalars['String']>>;
};

export type UserOrderMap = {
  createdAt?: InputMaybe<QueryOrder>;
  gender?: InputMaybe<QueryOrder>;
  id?: InputMaybe<QueryOrder>;
  nickname?: InputMaybe<QueryOrder>;
  updatedAt?: InputMaybe<QueryOrder>;
  username?: InputMaybe<QueryOrder>;
};

export type UserUpdateInput = {
  gender?: InputMaybe<Gender>;
  nickname?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
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
      message?: string | null;
      status: ApplicationStatus;
      createdAt: any;
      owner: {
        __typename?: 'User';
        id: string;
        username: string;
        nickname?: string | null;
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
        nickname?: string | null;
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
    message?: string | null;
    status: ApplicationStatus;
    createdAt: any;
    owner: {
      __typename?: 'User';
      id: string;
      username: string;
      nickname?: string | null;
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
  offset?: InputMaybe<Scalars['Int']>;
}>;

export type ApplicationListQuery = {
  __typename?: 'Query';
  applications: {
    __typename?: 'PaginatedApplications';
    total: number;
    results: Array<{
      __typename?: 'Application';
      id: string;
      message?: string | null;
      status: ApplicationStatus;
      createdAt: any;
      owner: {
        __typename?: 'User';
        id: string;
        username: string;
        nickname?: string | null;
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
    message?: string | null;
    status: ApplicationStatus;
    createdAt: any;
    owner: {
      __typename?: 'User';
      id: string;
      username: string;
      nickname?: string | null;
    };
    room: { __typename?: 'Room'; id: string; name: string };
  };
};

export type ApplicationFragment = {
  __typename?: 'Application';
  id: string;
  message?: string | null;
  status: ApplicationStatus;
  createdAt: any;
  owner: {
    __typename?: 'User';
    id: string;
    username: string;
    nickname?: string | null;
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
    nickname?: string | null;
    gender: Gender;
    updatedAt: any;
  };
};

export type MembershipAssignmentListQueryVariables = Exact<{
  id: Scalars['ID'];
  offset?: InputMaybe<Scalars['Int']>;
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
          description?: string | null;
          creator: {
            __typename?: 'Membership';
            id: string;
            role: Role;
            owner: {
              __typename?: 'User';
              id: string;
              username: string;
              nickname?: string | null;
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
  offset?: InputMaybe<Scalars['Int']>;
}>;

export type MembershipTaskListQuery = {
  __typename?: 'Query';
  membership: {
    __typename?: 'Membership';
    id: string;
    tasks: {
      __typename?: 'PaginatedTasks';
      total: number;
      results: Array<{
        __typename?: 'Task';
        id: string;
        title: string;
        description?: string | null;
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
      nickname?: string | null;
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
    nickname?: string | null;
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
    description?: string | null;
    isOpen: boolean;
    creator: {
      __typename?: 'User';
      id: string;
      username: string;
      nickname?: string | null;
    };
    membership?: { __typename?: 'Membership'; id: string; role: Role } | null;
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
    description?: string | null;
    isOpen: boolean;
    creator: {
      __typename?: 'User';
      id: string;
      username: string;
      nickname?: string | null;
    };
    membership?: { __typename?: 'Membership'; id: string; role: Role } | null;
  };
};

export type RoomListQueryVariables = Exact<{
  offset?: InputMaybe<Scalars['Int']>;
  filter?: InputMaybe<RoomFilterMap>;
  joinedOnly?: InputMaybe<Scalars['Boolean']>;
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
      description?: string | null;
      isOpen: boolean;
      creator: {
        __typename?: 'User';
        id: string;
        username: string;
        nickname?: string | null;
      };
      membership?: { __typename?: 'Membership'; id: string; role: Role } | null;
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
          nickname?: string | null;
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
    description?: string | null;
    isOpen: boolean;
    creator: {
      __typename?: 'User';
      id: string;
      username: string;
      nickname?: string | null;
    };
    membership?: { __typename?: 'Membership'; id: string; role: Role } | null;
  };
};

export type RoomFragment = {
  __typename?: 'Room';
  id: string;
  name: string;
  description?: string | null;
  isOpen: boolean;
  creator: {
    __typename?: 'User';
    id: string;
    username: string;
    nickname?: string | null;
  };
  membership?: { __typename?: 'Membership'; id: string; role: Role } | null;
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
    description?: string | null;
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
    description?: string | null;
    createdAt: any;
    assignments: { __typename?: 'PaginatedAssignments'; total: number };
  };
};

export type TaskFragment = {
  __typename?: 'Task';
  id: string;
  title: string;
  description?: string | null;
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
    nickname?: string | null;
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
    nickname?: string | null;
    gender: Gender;
    updatedAt: any;
  };
};

export type UserFragment = {
  __typename?: 'User';
  id: string;
  username: string;
  nickname?: string | null;
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
  override document = ApplicationAcceptDocument;

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
  override document = ApplicationCreateDocument;

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
  override document = ApplicationDeleteDocument;

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
  override document = ApplicationListDocument;

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
  override document = ApplicationRejectDocument;

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
  override document = AssignmentCreateDocument;

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
  override document = AssignmentDeleteDocument;

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
  override document = AssignmentUpdateDocument;

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
  override document = AuthDocument;

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
  override document = MeDocument;

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
  override document = MembershipAssignmentListDocument;

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
  override document = MembershipDeleteDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const MembershipTaskListDocument = gql`
  query MembershipTaskList($id: ID!, $offset: Int) {
    membership(id: $id) {
      id
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
  override document = MembershipTaskListDocument;

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
  override document = MembershipUpdateDocument;

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
  override document = RoomCreateDocument;

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
  override document = RoomDeleteDocument;

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
  override document = RoomDetailDocument;

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
  override document = RoomListDocument;

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
  override document = RoomMembershipListDocument;

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
  override document = RoomUpdateDocument;

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
  override document = TaskAssignmentListDocument;

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
  override document = TaskCreateDocument;

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
  override document = TaskDeleteDocument;

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
  override document = TaskUpdateDocument;

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
  override document = UserCreateDocument;

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
  override document = UserUpdateDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
