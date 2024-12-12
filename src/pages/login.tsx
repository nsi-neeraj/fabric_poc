import { faker } from "@faker-js/faker";
import useAuthStore from "../store/authStore";
import { UserRoleType } from "../store/authStore/authStore.types";

export default function Login() {
  const { login } = useAuthStore();
  const loginUser = (userRole: UserRoleType) => () => {
    login({
      name: faker.internet.username(),
      role: userRole,
      uid: faker.string.uuid(),
    });
  };
  return (
    <div className="h-screen w-screen grid place-items-center font-bold text-white">
      <section className="h-full w-full md:w-1/2 md:h-1/2 flex flex-col gap-y-2 rounded-md bg-slate-950 overflow-hidden">
        <h2 className="text-center p-3 text-2xl">User Type</h2>
        <div className="flex-1 flex gap-x-2 h-full">
          <button
            className="flex-1 bg-slate-800 hover:bg-slate-600"
            onClick={loginUser("admin")}
          >
            Admin
          </button>
          <button
            className="flex-1 bg-slate-800 hover:bg-slate-600"
            onClick={loginUser("user")}
          >
            User
          </button>
        </div>
      </section>
    </div>
  );
}
