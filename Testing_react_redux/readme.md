черновик

#### Проверка вызова жизненного цикла компонента

```js
Первый способ

it('Check call lifeCycleMethod ', () => {
    const componentDidMountSpy = spyOn(
      TopFilmsContainer.prototype,
      'componentDidMount',
    );
    const component = shallow(<TopFilmsContainer {...props} />);
    expect(componentDidMountSpy).toHaveBeenCalledTimes(1);
  });

Второй способ
  it('Check call lifeCycleMethod 2', () => {

    jest.spyOn(TopFilmsContainer.prototype, 'componentDidMount');
    const component = shallow(<TopFilmsContainer {...props} />);

    expect(TopFilmsContainer.prototype.componentDidMount.mock.calls.length,
    ).toBe(1);
  });
```

#### Проверка map state and dispatch to props для контейнера подключенного к Redux

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
