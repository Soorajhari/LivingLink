import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserProfile {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  mobile: number | null;
  role: string;
  subrole: string | null;
  followers:[]|null;
  following:[];
}

interface Post {
  _id: string;
  user: string; 
  text: string;
  Url: string;
  __v: number;
}

interface Data {
  loading: boolean;
  user: UserProfile | null; 
  posts: Post[]; 
  error: boolean;
}

const initialState: Data = {
  loading: false,
  user: null,
  posts: [],
  error: false,
};

const profileSlice = createSlice({
  name: "Profile",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<boolean>) => {
      state.error = action.payload;
    },
    ProfileData: (state, action: PayloadAction<Data>) => {
      const { user, posts } = action.payload;
      state.user = user;
      state.posts = posts;
    },
  },
});

export const { setLoading, setError, ProfileData } = profileSlice.actions;

export default profileSlice.reducer;
