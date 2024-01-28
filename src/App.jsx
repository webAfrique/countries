import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Countries from "./routes/Countries";
import CountriesSingle from "./routes/CountriesSingle";
import Home from "./routes/Home";
import Root from "./routes/Root";

const theme = createTheme({
  palette: {
    primary: {
      main: "#3f51b5",
    },
    secondary: {
      main: "#f50057",
    },
  },
});

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/countries",
          element: <Countries />,
        },
        {
          path: "countries/:single",
          element: <CountriesSingle />,
        },
      ],
    },
  ]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router}></RouterProvider>
      </ThemeProvider>
    </LocalizationProvider>
  );
}

export default App;
