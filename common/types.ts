export type Fish = {
  name: string;
  average_size: number;
};

export type FishResponse = {
  data: Fish[];
};

export type Lake = {
  name: string;
  max_depth: number;
};

export type LakesResponse = {
  data: Lake[];
}

export type Friend = {
  name: string;
  fishing_score: number;
}

export type FriendsResponse = {
  data: Friend[];
}
