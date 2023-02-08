/* eslint-disable jest/no-mocks-import */
import "../__mocks__/IntersectionObserverMock"
import { fireEvent, render as rnd, screen } from '@testing-library/react';
import { BrowserRouter as Router } from "react-router-dom"
import { Provider } from 'react-redux';
import { Characters } from '../screens';
import store from '../store';

const render = component => rnd(
  <Provider store={store}>
    <Router>
      {component}
    </Router>
  </Provider>
)

const clickEvent = new MouseEvent('click', {
  bubbles: true,
  cancelable: true,
})


test('The characters component renders properly', () => {
  render(<Characters />);
  expect(screen.getByText("Rick & Morty!")).toBeInTheDocument()
  expect(screen.getByText("Check out locations!")).toBeInTheDocument()
});


test('The filter and search trigger components are in the characters component', () => {
  render(<Characters />);
  const searchBtn = screen.getByTestId("search-btn")
  const filterBtn = screen.getByTestId("filter-btn")
  expect(filterBtn).toBeInTheDocument()
  expect(searchBtn).toBeInTheDocument()

})

test('The filter and search components are available when their corresponding CTAs are clicked and vice-versa', () => {
  render(<Characters />);
  const searchBtn = screen.getByTestId("search-btn")
  const filterBtn = screen.getByTestId("filter-btn")
  fireEvent(searchBtn, clickEvent)
  const searchModal = screen.getByTestId("search-modal")
  const cancelSearch = screen.getByTestId("search-cancel")
  expect(searchModal).toBeInTheDocument()
  fireEvent(cancelSearch, clickEvent)
  expect(searchModal).not.toBeInTheDocument()
  fireEvent(filterBtn, clickEvent)
  const filterModal = screen.getByTestId("filter-modal")
  expect(filterModal).toBeInTheDocument()
  const cancelFilter = screen.getByTestId("filter-cancel")
  fireEvent(cancelFilter, clickEvent)
  expect(filterModal).not.toBeInTheDocument()
})
