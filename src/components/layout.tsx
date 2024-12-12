import { Suspense } from "react";
import { Outlet, useNavigate } from "react-router";
import Loading from "./loading";
import withAuth from "../hocs/withAuth";
import useAuthStore from "../store/authStore";
import { ROOT_PATH } from "../settings/routePath";

function Layout() {
  const { auth, logout } = useAuthStore();
  const navigate = useNavigate();
  const logoutUser = () => {
    logout();
    navigate(ROOT_PATH, { replace: true });
  };
  return (
    <section className="min-h-screen w-screen flex flex-col bg-slate-300">
      <div className="flex justify-center items-center p-2 text-white bg-cyan-500">
        <p className="mr-2 capitalize text-xl font-bold">{auth.user?.role}</p>
        <button onClick={logoutUser} className="bg-slate-500 p-2 rounded-md">
          Logout
        </button>
      </div>
      <Suspense fallback={<Loading />}>
        <Outlet />
      </Suspense>
    </section>
  );
}

const LayoutComponent = withAuth(Layout);
export default LayoutComponent;
