/* eslint-disable jest/no-mocks-import */
import "../__mocks__/IntersectionObserverMock"
import { render as rnd, screen } from '@testing-library/react';
import { BrowserRouter as Router } from "react-router-dom"
import { Provider } from 'react-redux';
import { Locations } from '../screens';
import store from '../store';


const render = component => rnd(
    <Provider store={store}>
        <Router>
            {component}
        </Router>
    </Provider>
)

test('The characters component renders properly', () => {
    render(<Locations />);
    expect(screen.getByText("Rick & Morty!")).toBeInTheDocument()
});
