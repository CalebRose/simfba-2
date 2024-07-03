import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { validatePassword } from "firebase/auth";
import { fieldImage } from "../../_utility/getField";
import { AuthService } from "../../_services/auth";

export const SignUpPage = () => {
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [processing, setProcessing] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [form, setForm] = useState({
    username: { value: "" },
    email: { value: "" },
    password: { value: "" },
  });
  const [fieldImg] = useState(() => {
    return fieldImage();
  });
  let navigate = useNavigate();

  useEffect(() => {
    console.log("REGISTER!");
  }, []);

  const handleChange = (e) => {
    let _form = { ...form };
    _form[e.target.name].value = e.target.value;
    setForm(_form);
  };

  const submitForm = async (e) => {
    e.preventDefault();

    if (form.email.value && form.password.value) {
      setProcessing(true);

      try {
        let data = await AuthService.register(
          form.username.value,
          form.email.value,
          form.password.value
        );
        if (data.status) {
          setProcessing(false);
          navigate(`/`);
          enqueueSnackbar(data.message, {
            variant: "success",
            autoHideDuration: 3000,
          });
        } else {
          setProcessing(false);
          enqueueSnackbar(data.message, {
            variant: "error",
            autoHideDuration: 3000,
          });
        }
      } catch (e) {
        setProcessing(false);
        enqueueSnackbar("Something went wrong.", {
          variant: "error",
          autoHideDuration: 3000,
        });
      }
    } else {
      enqueueSnackbar("All fields are required.", {
        variant: "error",
        autoHideDuration: 3000,
      });
    }
  };
  return (
    <section className="w-screen">
      <div className="lg:grid lg:grid-cols-12 lg:w-full xl:grid xl:min-h-screen">
        <section className="relative flex items-end bg-gray-900 col-span-12 h-[100vh]">
          <img
            alt="Night"
            src={fieldImg}
            className="absolute inset-0 h-full w-full object-cover opacity-90"
          />

          <div className="hidden md:flex flex-col items-center my-auto md:relative lg:p-12 bg-black bg-opacity-75 align-middle rounded-md min-w-full">
            <h2 className="mt-6 text-2xl font-bold sm:text-3xl md:text-4xl">
              Welcome to SimFBA
            </h2>

            <p className="mt-4 leading-relaxed ">
              Where Dynasties are made and the simulations are plentiful.
            </p>
            <form
              action="#"
              className="mt-8 grid grid-cols-6 gap-6"
              onSubmit={submitForm}
            >
              <div className="col-span-12 sm:col-span-6">
                <label className="block text-sm font-medium ">Username</label>

                <input
                  type="text"
                  id="Username"
                  name="user_name"
                  className="mt-1 w-full rounded-md border-gray-200  text-sm  shadow-sm"
                />
              </div>

              <div className="col-span-12 sm:col-span-6">
                <label className="block text-sm font-medium ">Email</label>

                <input
                  type="email"
                  id="Email"
                  name="email"
                  className="mt-1 w-full rounded-md border-gray-200  text-sm  shadow-sm"
                  onChange={handleChange}
                />
              </div>

              <div className="col-span-12 sm:col-span-6">
                <label className="block text-sm font-medium ">Password</label>

                <input
                  type={passwordVisibility ? "text" : "password"}
                  id="Password"
                  name="password"
                  className="mt-1 w-full rounded-md border-gray-200  text-sm  shadow-sm"
                  onChange={handleChange}
                />
              </div>

              <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                <button
                  type="submit"
                  className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
                >
                  {processing ? "Processing..." : "Create an account"}
                </button>

                <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                  Already have an account?
                  <NavLink to={"/login"} href="#" className=" underline">
                    Log in
                  </NavLink>
                  .
                </p>
              </div>
            </form>
          </div>
        </section>

        <main className="md:hidden flex items-center justify-center px-4 sm:px-8 sm:py-8 my-auto">
          <div className="max-w-xl lg:max-w-3xl">
            <div className="relative -mt-16 block lg:hidden">
              <h1 className="mt-2 text-2xl font-bold  sm:text-3xl md:text-4xl">
                Welcome to SimFBA 🦑
              </h1>

              <p className="mt-4 leading-relaxed ">
                Where Dynasties are made and the simulations are plentiful.
              </p>
              <form
                action="#"
                className="mt-8 grid grid-cols-6 gap-6"
                onSubmit={submitForm}
              >
                <div className="col-span-6 sm:col-span-3">
                  <label className="block text-sm font-medium ">Username</label>

                  <input
                    type="text"
                    id="FirstName"
                    name="first_name"
                    className="mt-1 w-full rounded-md border-gray-200  text-sm  shadow-sm"
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label className="block text-sm font-medium ">Email</label>

                  <input
                    type="email"
                    id="Email"
                    name="email"
                    className="mt-1 w-full rounded-md border-gray-200  text-sm  shadow-sm"
                    onChange={handleChange}
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label className="block text-sm font-medium ">Password</label>

                  <input
                    type={passwordVisibility ? "text" : "password"}
                    id="Password"
                    name="password"
                    className="mt-1 w-full rounded-md border-gray-200  text-sm  shadow-sm"
                    onChange={handleChange}
                  />
                </div>

                <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                  <button
                    type="submit"
                    className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
                  >
                    {processing ? "Processing..." : "Create an account"}
                  </button>

                  <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                    Already have an account?
                    <NavLink to={"/login"} href="#" className=" underline">
                      Log in
                    </NavLink>
                    .
                  </p>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    </section>
  );
};
