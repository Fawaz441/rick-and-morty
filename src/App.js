import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import AppRoutes from "./Routes";
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <div className="bg-[#050505] min-h-screen">
        <AppRoutes />
      </div>
    </Provider>
  );
}

export default App;
