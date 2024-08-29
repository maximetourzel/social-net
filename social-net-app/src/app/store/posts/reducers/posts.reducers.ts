import { Action, createReducer, on } from '@ngrx/store';
import { HttpError, Post } from '../../../models';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { postsActions } from '../actions/posts.actions';

export const POST_FEATURE_KEY = 'post';

export interface State extends EntityState<Post> {
  loaded: boolean;
  error: HttpError | null;
}

export const adapter: EntityAdapter<Post> = createEntityAdapter<Post>({
  // In this case this would be optional since primary key is id
  //   selectId: (post) => post.id,
});

export interface PostPartialState {
  readonly [POST_FEATURE_KEY]: State;
}

export const initialState: State = adapter.getInitialState({
  // Additional entity state properties
  loaded: false,
  error: null,
});

const _reducer = createReducer(
  initialState,
  on(postsActions.loadPostsSuccess, (state, { posts }) => {
    return adapter.setAll(posts, { ...state, loaded: true });
  }),
  on(postsActions.loadPostsFailure, (state, { error }): State => {
    return { ...state, error };
  }),
  on(postsActions.loadPostsByAuthorSuccess, (state, { posts }) => {
    return adapter.setAll(posts, state);
  }),
  on(postsActions.loadPostsByAuthorFailure, (state, { error }): State => {
    return { ...state, error };
  }),
  on(postsActions.loadPostSuccess, (state, { post }) => {
    return adapter.upsertOne(post, state);
  }),
  on(postsActions.loadPostFailure, (state, { error }): State => {
    return { ...state, error };
  }),
  on(postsActions.createPostSuccess, (state, { post }) => {
    return adapter.addOne(post, state);
  }),
  on(postsActions.createPostFailure, (state, { error }): State => {
    return { ...state, error };
  }),
  on(postsActions.updatePostSuccess, (state, { post }) => {
    return adapter.updateOne({ id: post.id, changes: post }, state);
  }),
  on(postsActions.updatePostFailure, (state, { error }): State => {
    return { ...state, error };
  }),
  on(postsActions.deletePostSuccess, (state, { id }) => {
    return adapter.removeOne(id, state);
  }),
  on(postsActions.deletePostFailure, (state, { error }): State => {
    return { ...state, error };
  }),
);

export function reducer(state: State | undefined, action: Action) {
  return _reducer(state, action);
}