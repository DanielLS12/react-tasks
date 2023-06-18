import { useState, createRef, useContext } from "react";
import { TaskContext } from "../../context/TaskContext";

function TaskForm() {
  //Se usan para almacenar datos y modificarlo
  const [title, setTitle] = useState("");
  const [description, setDesription] = useState("");

  const [error, setError] = useState(false);

  const { createTask } = useContext(TaskContext);

  //Para crear una referencia algun elemento
  //Que servira para realizar un focus cuando
  //Se termine agregar una tarea
  const firstInput = createRef();

  //Funcion que crea tareas
  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      title.length === 0 ||
      description.length === 0 ||
      description.length > 25
    ) {
      setError(true);
      return;
    }

    createTask({
      title,
      description,
    });
    setTitle("");
    setDesription("");
    setError(false);
  };

  //Componente que retornara
  return (
    <div className="max-w-md mx-auto">
      <form className="bg-slate-800 p-10 mb-4" onSubmit={handleSubmit}>
        <div className=" flex justify-between mb-2">
          <h1 className="text-white font-bold text-2xl">Crear tarea</h1>
          <img
            src="https://images-ext-1.discordapp.net/external/LtwJ8huSL0_DMVTbCulPSwLfjfIZ5C6UL-YLDmNXDmo/https/static.ssb.ee/images/companies/14943484_moonfox-ou_16233542_a_xl.png"
            className="w-10 hover:-translate-y-2 hover:scale-125 transition ease-in-out delay-75 duration-150"
            alt="MoonTi"
          />
        </div>
        <input
          className="w-full bg-gray-100 p-2 rounded-sm mb-2 border-2 border-gray-200 leading-tight focus:outline-none focus:bg-white focus:border-orange-400"
          onChange={(e) => {
            setTitle(e.target.value.trimStart());
          }}
          ref={firstInput}
          placeholder="Escribe tu tarea"
          value={title}
          autoFocus
        />
        {error && title.length <= 0 ? (
          <label className="text-red-600 font-bold">
            Campo titulo requerido
          </label>
        ) : (
          ""
        )}
        <textarea
          className="w-full bg-gray-100 p-2 rounded-sm border-2 border-gray-200 leading-tight focus:outline-none focus:bg-white focus:border-orange-400 mt-2"
          maxLength="25"
          onChange={(e) => {
            setDesription(e.target.value.trimStart());
          }}
          placeholder="Escribe una descripción"
          value={description}
        ></textarea>
        {error && description.length <= 0 ? (
          <label className="text-red-600 block font-bold">
            Campo descripción requerido
          </label>
        ) : (
          ""
        )}
        {description.length > 25 ? (
          <label className="text-red-600 block font-bold">
            Limite de 100 caracteres permitidos
          </label>
        ) : (
          ""
        )}
        <label
          className={
            description.length >= 25
              ? "block text-right text-red-500"
              : "block text-right text-gray-400"
          }
        >
          {description.length}/25
        </label>
        <button
          className="bg-blue-500 text-white px-2 py-1 rounded-sm"
          onClick={(e) => {
            firstInput.current.focus();
          }}
        >
          Guardar
        </button>
      </form>
    </div>
  );
}

export default TaskForm;
