import { Navigate, useRoutes } from "react-router-dom";
import { Suspense, lazy } from "react";
import MainLayout from "../layouts/main";
import LoadingScreen from "../components/LoadingScreen";
export default function Router() {
  const RoutedComponent = useRoutes([
    // {
    //   path: "/",
    //   element: <MainLayout />,
    //   children: [
    //     { path: "", element: <Navigate to="home" replace /> },
    //     { path: "home", element: <Home /> },
    //     { path: "aboutus", element: <Aboutus title={`Aboutus link`} /> },
    //     { path: "contactus", element: <Contactus title={`Contactus link`} /> },
    //     {
    //       path: "profile",
    //       children: [
    //         { element: <Navigate to="/profile" replace /> },
    //         { path: "", element: <Profile /> },
    //         { path: "Address", element: <Address /> },
    //         { path: "Address/:addressKey", element: <AddressForm /> },
    //       ],
    //     },
    //   ],
    // },
    {
      path: "/",
      element: <MainLayout />,
      children: [
        { path: "", element: <Navigate to="list" replace /> },
        { path: "/list", element: <TodoApp /> },
        { path: "/movies", element: <Movies /> },
        { path: "/movies/:id", element: <MovieDetail /> },
      ],
    },
    {
      path: "*",
      element: <MainLayout />,
      children: [
        { path: "coming-soon", element: <ComingSoon title="Coming Soon" /> },
        {
          path: "maintenance",
          element: <Maintenance title="Website Under Maintenance" />,
        },
        { path: "500", element: <Page500 title="Page 500  Error" /> },
        { path: "404", element: <NotFound title="Page Not Found" /> },
        { path: "*", element: <Navigate to="/404" replace /> },
      ],
    },
    { path: "*", element: <Navigate to="/404" replace /> },
  ]);
  return <>{RoutedComponent}</>;
}

const Loadable = (Component: React.ElementType) => (props: any) => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );
};

const ComingSoon = Loadable(lazy(() => import("../components/Header")));
const Maintenance = Loadable(lazy(() => import("../components/Header")));
const Page500 = Loadable(lazy(() => import("../components/Header")));
const NotFound = Loadable(lazy(() => import("../components/Header")));

const TodoApp = Loadable(lazy(() => import("../pages/todo")));

const Movies = Loadable(lazy(() => import("../pages/movies")));
const MovieDetail = Loadable(lazy(() => import("../pages/movies/MovieDetail")));
