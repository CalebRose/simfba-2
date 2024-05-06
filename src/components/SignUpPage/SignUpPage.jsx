import { validatePassword } from "firebase/auth";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { fieldImage } from "../../_utility/getField";

export const SignUpPage = () => {
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [processing, setProcessing] = useState(false);
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
    <>
      <section className="w-screen">
        <div className="lg:grid lg:min-h-screen lg:grid-cols-12 xl:w-full xl:grid xl:min-h-screen">
          <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-8 xl:w-full">
            <img
              alt="Night"
              src={fieldImg}
              className="absolute inset-0 h-full w-full object-cover opacity-90"
            />

            <div className="hidden lg:relative lg:block lg:p-12 bg-black bg-opacity-70 align-middle rounded-md mb-[40vh] min-w-full">
              <h2 className="mt-6 text-2xl font-bold sm:text-3xl md:text-4xl">
                Welcome to SimFBA
              </h2>

              <p className="mt-4 leading-relaxed">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Eligendi nam dolorum aliquam, quibusdam aperiam voluptatum.
              </p>
            </div>
          </section>

          <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-4">
            <div className="max-w-xl lg:max-w-3xl">
              <div className="relative -mt-16 block lg:hidden">
                <h1 className="mt-2 text-2xl font-bold  sm:text-3xl md:text-4xl">
                  Welcome to SimFBA 🦑
                </h1>

                <p className="mt-4 leading-relaxed ">
                  Where Dynasties are made and the simulations are plentiful.
                </p>
              </div>

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
          </main>
        </div>
      </section>
    </>
  );
};
