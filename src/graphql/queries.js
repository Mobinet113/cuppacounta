// eslint-disable
// this is an auto generated file. This will be overwritten

export const getCuppas = `query GetCuppas($id: ID!) {
  getCuppas(id: $id) {
    id
    USERID
  }
}
`;
export const listCuppass = `query ListCuppass(
  $filter: ModelCuppasFilterInput
  $limit: Int
  $nextToken: String
) {
  listCuppass(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      USERID
    }
    nextToken
  }
}
`;
export const getTeam = `query GetTeam($id: ID!) {
  getTeam(id: $id) {
    id
    TEAMID
    USERID
    MEMBERS
  }
}
`;
export const listTeams = `query ListTeams(
  $filter: ModelTeamFilterInput
  $limit: Int
  $nextToken: String
) {
  listTeams(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      TEAMID
      USERID
      MEMBERS
    }
    nextToken
  }
}
`;
export const getUsers = `query GetUsers($id: ID!) {
  getUsers(id: $id) {
    id
    USERID
    USERNAME
    AVATAR
  }
}
`;
export const listUserss = `query ListUserss(
  $filter: ModelUsersFilterInput
  $limit: Int
  $nextToken: String
) {
  listUserss(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      USERID
      USERNAME
      AVATAR
    }
    nextToken
  }
}
`;
