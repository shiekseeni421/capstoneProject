import { RouterProvider } from "react-router-dom";
import axios from "axios";
import router from "./Router";

function App() {
  // const getBookItem = (url) => {
  //   let query = "";
  //   axios
  //     .get(`https://freetestapi.com/api/v1/books`)
  //     .then((res) => {
  //       console.log(res);
  //     })
  //     .catch((error) => {
  //       console.log("Api is not Working");
  //     });
  // };

  // getBookItem();

  return <RouterProvider router={router} />;
}

export default App;
