import { configureStore } from "@reduxjs/toolkit";
import { counterSlice } from "./slices/counterSlice";
import { themeSlice } from "./slices/themeSlice";
import { todoSlice } from "./slices/todoSlice";
// ...

export const store = configureStore({
  reducer: {
    // posts: postsReducer,
    counter: counterSlice.reducer,
    theme: themeSlice.reducer,
    todo: todoSlice.reducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
