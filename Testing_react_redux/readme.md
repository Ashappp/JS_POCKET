# REACT REDUX TESTING with JEST & ENZYME

1. [Snapshot](#Тестирование_Снимками)

2. [Lifecycle](#Тестирование_LIFECYCLE_METHOD_CONTAINER)

3. [MSTP_MDTP](#Тестирование_MSTP_MDTP_CONNECTED_CONTAINER)

4. Redux

   4.1 [Action](#Тестирование_ACTION)

   4.2 [Reducer](#Тестирование_REDUCER)

   4.3 [Selector](#Тестирование_SELECTOR)

5. Async Redux

   5.1 [Redux Logic](#Тестирование_REDUX_LOGIC)

   5.2 [Redux Logic Multi](#Тестирование_REDUX_LOGIC_multi)

6. [Formik](#Тестирование_вызова_обработчиков_формы)

---

[Документация Jest](https://jestjs.io/docs/ru/getting-started)

[Документация Enzyme](https://airbnb.io/enzyme/)

### Тестирование_Снимками

Снимками тестируются

- компонента
- конейнер
  Если компонента имеет разные состояния (loading, error, empty) то для каждого состояния создается снимок.

С помощью Enzyme рендерим поверхностно компонент и задем ожидаем что он совпадет со снимком

```js
import React from "react";
import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import TopFilms from "../component";

describe("Component: TopFilms", () => {
  const props = {
    loading: false,
    topFilms: [
      { id: 1, title: "Some title", poster_path: "path to picture" },
      { id: 2, title: "Another title", poster_path: "path to another picture" }
    ]
  };

  it("Match its snapshot. Display Data from DataBse", () => {
    const TopFilmsComponent = shallow(<TopFilms {...props} />);
    expect(shallowToJson(TopFilmsComponent)).toMatchSnapshot();
  });

  it("Match its snapshot. Display ...Loading ", () => {
    const nextProps = {
      ...props,
      loading: true
    };
    const TopFilmsComponent = shallow(<TopFilms {...nextProps} />);
    expect(shallowToJson(TopFilmsComponent)).toMatchSnapshot();
  });
});
```

### Тестирование_LIFECYCLE_METHOD_CONTAINER

- Проверка вызова жизненного цикла компонента

```js
1. Первый способ --------------------------

it('Check call lifeCycleMethod ', () => {
    const componentDidMountSpy = spyOn(
      TopFilmsContainer.prototype,
      'componentDidMount',
    );
    const component = shallow(<TopFilmsContainer {...props} />);
    expect(componentDidMountSpy).toHaveBeenCalledTimes(1);
  });

2. Второй способ --------------------------
  it('Check call lifeCycleMethod 2', () => {

    jest.spyOn(TopFilmsContainer.prototype, 'componentDidMount');
    const component = shallow(<TopFilmsContainer {...props} />);

    expect(TopFilmsContainer.prototype.componentDidMount.mock.calls.length,
    ).toBe(1);
  });

3.  Третий способ --------------------------

  it('Check call lifeCycleMethod componentDidMount', () => {
    mount(<TopFilmsContainerConnected store={store} />);

    expect(store.dispatch).toHaveBeenCalledWith(fetchDataRequest());
  });
```

### Тестирование_MSTP_MDTP_CONNECTED_CONTAINER

- Проверка map state and dispatch to props для контейнера подключенного к Redux

```js
1- Рендерим заимпортированный по дефолту компонент подключенный к Redux через connect
const wrapper = shallow(
  <TopFilmsContainerConnected store={store} {...props} />
);
2- выбираем компонент А НЕ ОБЕРТКУ CONNECTED
const container = wrapper.dive();

it("map state and dispatch to props", () => {
  expect(container.props()).toEqual(
    expect.objectContaining({
      topFilms: expect.any(Array),
      loading: expect.any(Boolean),
      error: expect.any(Boolean),
      fetchDataRequest: expect.any(Function)
    })
  );
});
```

### Тестирование_ACTION

```js
import { fetchDataRequest, fetchDataError, fetchDataSuccess } from '../actions';

describe('actions', () => {
  describe('sync action', () => {
    it('should return type: "FETCH_REQUEST"', () => {
      const expectedAction = {
        type: 'FETCH_REQUEST',
      };
      expect(fetchDataRequest()).toEqual(expectedAction);
    });

    it('should return error message', () => {
      const message = 'error message';
      const expectedAction = {
        type: 'FETCH_ERROR',
        payload: message,
      };
      expect(fetchDataError(message)).toEqual(expectedAction);
    });

    it('should return responce - array', () => {
      const response = [{}];
      const expectedAction = {
        type: 'FETCH_RESPONSE',
        payload: response,
      };
      expect(fetchDataSuccess(response)).toEqual(expectedAction);
    });
  });
});

+++++++++++++++++++++++++++++++++++++++++++++++

import { userLogout, authUser, setUserData } from "../actions";

describe("actions", () => {
  it("should return - type:'DELETE_SESSION_ID'", () => {
    const expectedAction = {
      type: "DELETE_SESSION_ID"
    };
    expect(userLogout()).toEqual(expectedAction);
  });

  it("should return userData from form", () => {
    const username = "fakeuser";
    const password = "12345";

    const expectedAction = {
      type: "AUTH_USER",
      payload: { username, password }
    };
    expect(authUser({ username, password })).toEqual(expectedAction);
  });

  it("should return userData for setting in store", () => {
    const userData = {
      username: "fakeuser",
      sessionId: "53623g4jgfsusilss"
    };
    const expectedAction = {
      type: "SET_USER_DATA",
      payload: userData
    };
    expect(setUserData(userData)).toEqual(expectedAction);
  });
});
```

### Тестирование_REDUCER

```js
import reducer, { initialState } from "../reducers";

describe("reducers", () => {
  it("should set loading field to true", () => {
    const action = {
      type: "FETCH_REQUEST"
    };
    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      loading: true
    });
  });

  it("should set error field to error message", () => {
    const action = {
      type: "FETCH_ERROR",
      payload: "error message"
    };
    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      error: action.payload
    });
  });

  it("should set films field to response - films array", () => {
    const action = {
      type: "FETCH_RESPONSE",
      payload: [{}]
    };
    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      films: action.payload
    });
  });

  it("should return initialState", () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });
});
```

### Тестирование_SELECTOR

```js
import { getTopFilmsSelector, isloading, isError } from "../selectors";

describe("topfilms selector", () => {
  const state = {
    topFilms: {
      films: [{}],
      loading: false,
      error: false
    }
  };
  it("returns all films", () => {
    expect(getTopFilmsSelector(state)).toEqual(state.topFilms.films);
  });

  it("returns loadiing status", () => {
    expect(isloading(state)).toEqual(state.topFilms.loading);
  });

  it("returns error status", () => {
    expect(isError(state)).toEqual(state.topFilms.error);
  });
});

import { isAuthentificated, getUserLogin } from "../selectors";

describe("topfilms selector", () => {
  const state = {
    user: {
      username: "fakeuser",
      sessionId: "12345"
    }
  };
  describe("session id exist", () => {
    it("returns true", () => {
      expect(isAuthentificated(state)).toBeTruthy();
    });
  });

  describe("session id doesn't exist", () => {
    it("returns false", () => {
      expect(isAuthentificated({})).toBeFalsy();
    });
  });

  describe("grab username", () => {
    it("returns username", () => {
      expect(getUserLogin(state)).toEqual(state.user.username);
    });
  });
});
```

### Тестирование_REDUX_LOGIC

LOGIC.js =====================================

```js
import { createLogic } from "redux-logic";

export const fooLogic = createLogic({
  type: "FOO",
  process({ API, getState, action }, dispatch, done) {
    API.get().then(results => {
      dispatch({ type: "FOO_SUCCESS", payload: results });
      done();
    });
  }
});
export default [fooLogic];
```

REDUCER.js =====================================

```js
const initialState = {
  answer: null
};
export default function reducer(state = initialState, action = {}) {
  if (action.type === "FOO_SUCCESS") {
    return {
      ...state,
      answer: action.payload
    };
  }
  return state;
}
```

TESTLOGIC.js ==================================

```js
import { createMockStore } from "redux-logic-test";
import appLogic from "./App.logic";
import appReducer from "./App.reducer";

const injectedDeps = {
  API: {
    //simulate an async fetch
    get() {
      return Promise.resolve(42);
    }
  }
};

describe("appLogic test without reducer", () => {
  describe("appLogic test without reducer", () => {
    let store;
    beforeEach(() => {
      store = createMockStore({
        logic: appLogic,
        injectedDeps
      });
    });

    it("should fetch answer and dispatch", done => {
      store.dispatch({ type: "FOO" }); // start fetching
      store.whenComplete(() => {
        // all logic has completed
        expect(store.actions).toEqual([
          { type: "FOO" },
          { type: "FOO_SUCCESS", payload: 42 }
        ]);
        done();
      });
    });
  });

  describe("appLogic test with reducer", () => {
    let store;
    beforeEach(() => {
      store = createMockStore({
        reducer: appReducer,
        logic: appLogic,
        injectedDeps
      });
    });

    it("should fetch answer and dispatch", done => {
      store.dispatch({ type: "FOO" }); // start fetching
      store.whenComplete(() => {
        // all logic has completed
        expect(store.actions).toEqual([
          { type: "FOO" },
          { type: "FOO_SUCCESS", payload: 42 }
        ]);
        done();
      });
    });
  });
});
```

**И ЕЩЕ**

```js
import getTopFilmsLogic from "../logic";
import httpClientMock from "../../../helpers/httpClientMock";

describe("getTopFilmsLogic operation", () => {
  const httpClient = httpClientMock({
    method: "get",
    response: { data: [{}] }
  });

  const getState = jest.fn();
  const done = jest.fn();
  const dispatch = jest.fn();

  getState.mockReturnValue({
    films: [{}],
    loading: false,
    error: false
  });

  getTopFilmsLogic.process({ httpClient, getState }, dispatch, done);

  it("dispatches action - FETCH_RESPONSE", () => {
    expect(dispatch.mock.calls.length).toBe(1);
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: "FETCH_RESPONSE",
      payload: getState.films
    });
  });

  it("calls done", () => {
    expect(done).toBeCalled();
  });
});
```

### Тестирование_REDUX_LOGIC_multi

```js
import { authUserLogic, userLogoutLogic } from "../logic";
import httpClientMock, {
  multiHttpClientMock
} from "../../../helpers/httpClientMock";

describe("authUserLogic operation", () => {
  const requests = [
    { method: "get", response: { data: { request_token: "token" } } },
    { method: "post", response: {} },
    { method: "post", response: { data: { session_id: "465sdc3awa" } } }
  ];

  const httpClient = multiHttpClientMock(requests);

  const getState = jest.fn();
  const done = jest.fn();
  const dispatch = jest.fn();
  const action = {
    payload: {
      username: "somename",
      password: "qwerty123"
    }
  };
  getState.mockReturnValue({
    user: {}
  });

  authUserLogic.process({ httpClient, getState, action }, dispatch, done);

  it("calls httpClient to get request token", () => {});

  it("dispatches action - SET_USER_DATA", () => {
    expect(dispatch.mock.calls.length).toBe(1);
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: "SET_USER_DATA",
      payload: {
        username: "somename",
        sessionId: "465sdc3awa"
      }
    });
  });

  it("calls done", () => {
    expect(done.mock.calls.length).toBe(1);
  });
});

// USER LOGOUT
describe("userLogoutLogic operation", () => {
  const httpClient = httpClientMock({
    method: "delete"
  });

  const getState = jest.fn();
  const done = jest.fn();
  const dispatch = jest.fn();

  getState.mockReturnValue({
    username: "",
    sessionId: ""
  });

  userLogoutLogic.process({ httpClient, getState }, dispatch, done);

  it("dispatches action - DELETE_SESSION_ID", () => {
    expect(dispatch.mock.calls.length).toBe(1);
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: "DELETE_SESSION_ID"
    });
  });

  it("calls done", () => {
    expect(done).toBeCalled();
  });
});
```

### Тестирование*вызова*обработчиков_формы

- не забыть заимпортировать функции из файла

```js
import React from "react";
import { configure, shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { shallowToJson } from "enzyme-to-json";
import configureStore from "redux-mock-store";
import LoginForm, {
  mapPropsToValues,
  validationSchema,
  handleSubmit
} from "../container";
import { authRequest } from "../../../../store/authentifiction/actions";

configure({ adapter: new Adapter() });

describe("Container: LoginForm", () => {
  const props = {
    username: "movie__watcher",
    sessionID: true
  };

  const store = configureStore()({
    user: {
      username: "movie__watcher",
      sessionId: "955360edb24b7e6d0179b7b4d6afdf5da2f56ada"
    }
  });

  const wrapper = mount(<LoginForm store={store} {...props} />);
  const loginForm = wrapper.find("LoginForm");

  it("Snapshot: should match", () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it("Check: map dispatch to props", () => {
    expect(loginForm.props()).toEqual(
      expect.objectContaining({
        authUser: expect.any(Function)
      })
    );
  });

  it("Check: mapPropsToValues function", () => {
    expect(mapPropsToValues()).toEqual({
      username: "",
      password: ""
    });
  });

  it("check validationSchema", () => {
    expect(validationSchema).toMatchSnapshot();
  });

  it("check call handlesubmit and function inside", () => {
    const resetForm = jest.fn();
    const values = {
      username: "name",
      password: "219fsf",
      rememberMe: false
    };
    const params = {
      props: {
        authRequest
      },
      resetForm: jest.fn()
    };
    handleSubmit(values, params);

    mount(<LoginForm store={store} />);
    const spy = jest.spyOn(store, "dispatch");
    expect(spy).toHaveBeenCalledWith(authRequest(values));
  });
});
```
