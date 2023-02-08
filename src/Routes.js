import { Characters, Locations } from "./screens";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom"
import { routes } from "./utils/constants";


const AppRoutes = () => (
    <Router>
        <Switch>
            <Route path={routes.home} exact component={Characters} />
            <Route path={routes.locations} component={Locations} />
        </Switch>
    </Router>
)

export default AppRoutes