import {NavigationState} from '@react-navigation/native';
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {Linking, Platform} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface RouteState {
  isReady: boolean;
  initialState: NavigationState | undefined;
}

interface RouteStateActions {
  setState: (state?: NavigationState) => void;
}

interface RouteStateContextType extends RouteState, RouteStateActions {}

const RouteStateContext = createContext<RouteStateContextType>({
  isReady: false,
  initialState: undefined,
  setState: () => {},
});

export const RouteStateProvider = ({children}: {children: ReactNode}) => {
  const [isReady, setIsReady] = useState(false);
  const [initialState, setInitialState] = useState<NavigationState>();

  useEffect(() => {
    const restoreState = async () => {
      try {
        const initialUrl = await Linking.getInitialURL();

        if (Platform.OS !== 'web' && initialUrl == null) {
          // Only restore state if there's no deep link and we're not on web
          const savedStateString = await AsyncStorage.getItem(
            'PERSISTENCE_KEY',
          );
          const state = savedStateString
            ? JSON.parse(savedStateString)
            : undefined;

          if (state !== undefined) {
            setInitialState(state);
          }
        }
      } finally {
        setIsReady(true);
      }
    };

    if (!isReady) {
      restoreState();
    }
  }, [isReady]);

  const routeStateActions: RouteStateActions = useMemo(
    () => ({
      setState: async (state?: NavigationState) => {
        AsyncStorage.setItem('PERSISTENCE_KEY', JSON.stringify(state));
      },
    }),
    [],
  );

  return (
    <RouteStateContext.Provider
      value={{
        isReady,
        initialState,
        ...routeStateActions,
      }}>
      {children}
    </RouteStateContext.Provider>
  );
};

export const useRouteState = (): RouteStateContextType => {
  const context = useContext(RouteStateContext);
  if (!context) {
    throw new Error(
      'useRouteState must be inside an RouteStateProvider with a value',
    );
  }
  return context;
};
