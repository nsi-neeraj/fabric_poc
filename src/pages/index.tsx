import { HiTemplate } from "react-icons/hi";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router";
import useTemplatesStore from "../store/templateStore";
import { useMemo } from "react";
import useAuthStore from "../store/authStore";

export default function Home() {
  const { templates, removeTemplate } = useTemplatesStore();
  const {
    auth: { user },
  } = useAuthStore();
  const cards = useMemo(
    () =>
      templates.map((card) => (
        <Link
          to={card.uid}
          className="h-32 w-32 bg-slate-500 shadow-md rounded-md p-2 relative grid place-items-center hover:bg-slate-400 cursor-pointer"
          key={card.uid}
        >
          <MdDelete
            role="button"
            tabIndex={0}
            onClick={() => removeTemplate(card.uid)}
            className="self-start justify-self-end text-xl text-red-400"
          />

          <HiTemplate className="text-5xl" />
          <p className="absolute text-center bottom-2 truncate text-white">
            {card.title}
          </p>
        </Link>
      )),
    [removeTemplate, templates]
  );

  return (
    <main className="relative flex-1 p-2 flex justify-start content-start gap-2 flex-wrap bg-slate-200">
      {cards}
      {0 === templates.length && (
        <p className="text-center pt-6 text-2xl">No Data</p>
      )}
      {user?.role === "admin" && (
        <Link
          to="new"
          className="h-16 w-16 bg-lime-500 absolute right-4 bottom-4 grid place-items-center rounded-full cursor-pointer"
        >
          New
        </Link>
      )}
    </main>
  );
}
