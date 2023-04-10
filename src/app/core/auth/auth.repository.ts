import { createStore, withProps, select } from '@ngneat/elf';
import {
  persistState,
  localStorageStrategy,
} from '@ngneat/elf-persist-state';
import { User } from '../user/user.types';

export interface AuthProps {
    user: User | null
}

export const authStore = createStore({ name: 'auth' }, withProps<AuthProps>({
  user: null
}));

export const persist = persistState(authStore, {
  key: 'auth',
  storage: localStorageStrategy,
});

export const user$ = authStore.pipe(select((state) => state.user));