import Chatbot from "./ChatBot/Body/ChatBot";
import { Provider } from "react-redux";
import store from "./store/Redux/Redux-Store";

function App() {
  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        justifyContent: "center",
        height: "100%",
      }}
    >
      <Provider store={store}>
        <Chatbot />
      </Provider>
    </div>
  );
}

export default App;
