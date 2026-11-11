import authReducer, { logout } from '../src/store/slices/authSlice';
import { loginUser } from '../src/store/thunks/authThunks';

const user = {
  id: 1,
  username: 'emilys',
  email: 'e@x.com',
  firstName: 'Emily',
  lastName: 'J',
};

describe('authSlice', () => {
  const initial = authReducer(undefined, { type: 'init' });

  it('sets loading on login pending', () => {
    const state = authReducer(
      initial,
      loginUser.pending('id', { username: 'a', password: 'b' }),
    );
    expect(state.loading).toBe(true);
  });

  it('stores user and token on login success', () => {
    const action = loginUser.fulfilled(
      { user, token: 't', refreshToken: 'r' },
      'id',
      {
        username: 'a',
        password: 'b',
      },
    );
    const state = authReducer(initial, action);
    expect(state.token).toBe('t');
    expect(state.user?.username).toBe('emilys');
  });

  it('clears everything on logout', () => {
    const loggedIn = { ...initial, token: 't', user };
    expect(authReducer(loggedIn, logout())).toEqual(initial);
  });
});
