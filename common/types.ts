export type Fish = {
  name: string;
  average_size: number;
  description: string;
};

export type FishResponse = {
  data: Fish[];
};

export type Lake = {
  name: string;
  max_depth: number;
  about: string;
};

export type LakesResponse = {
  data: Lake[];
}

export type Friend = {
  name: string;
  fishing_score: number;
  bio: string;
}

export type FriendsResponse = {
  data: Friend[];
}
