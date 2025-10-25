import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DirectoryView from "./DirectoryView";
import Register from "./Register";
import "./App.css";
import Login from "./Login";
import UsersPage from "./UsersPage";
import ForgotPassword from "./forgot-password";
import ProfilePage from "./profile";
import NotFound from "./components/Notfound";
import PrcingPage from "./pricing";
import SubscriptionSuccess from "./subscriptionSucess";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DirectoryView />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/users",
    element: <UsersPage />,
  },
  {
    path: "/directory/:dirId",
    element: <DirectoryView />,
  },
  {
    path: "/profile",
    element: <ProfilePage />,
  },
  {
    path: "/pricing",
    element: <PrcingPage />,
  },
  {
    path: "/subscription/success",
    element: <SubscriptionSuccess/>,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

function App() {
//   // Large blue "WAIT!"
// console.log(
//   '%cWait!',
//   'font-size: 40px; font-weight: bold; color: blue;'
// );

// // Scam warning in white
// console.log(
//   '%cIf someone told you to copy/paste something here, there’s an 11/10 chance you’re being scammed.',
//   'font-size: 16px; color: white;'
// );

// // Red security alert
// console.log(
//   '%cPasting anything in here could give attackers access to your account.',
//   'font-size: 18px; color: red; font-weight: bold;'
// );
  return <RouterProvider router={router} />;
}

export default App;
