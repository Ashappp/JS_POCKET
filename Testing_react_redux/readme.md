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
