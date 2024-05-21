import React, { useState, useContext } from "react";
import { UserContext } from "@/context";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Link from "next/link";
import "react-toastify/dist/ReactToastify.css";
const login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [state, setstate] = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(`login`, {
        email,
        password,
      });
      setstate({
        user: data.user,
        token: data.token,
      });
      window.localStorage.setItem("auth", JSON.stringify(data));
      setLoading(false);
      console.log(data);
      toast.success("Login successfully");
      router.push("/");
    } catch (error) {
      console.log("sumit");
      toast.error(error.response.data);
    }
  };
  if (state && state.token) router.push("/");
  return (
    <Layout title="About neighbourly">
      <div className="row d-flex align-items-center justify-content-center mb-2">
        <div className="col-md-5 py-5">
          <h1 className="text-center text-secondary fs-1 my-4">Neighbourly</h1>
          <form className="py-5 border border-success px-4">
            <ToastContainer
              position="top-center"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
                id="exampleInputPassword1"
                required
              />
            </div>
            <button
              type="submit"
              onClick={handleSubmit}
              className="btn btn-success btn-md px-4"
              disabled={!email || !password}
            >
              {loading ? (
                <>
                  <span> &nbsp;</span>
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                </>
              ) : (
                "Login"
              )}
            </button>
            <p className="mt-2 text-primary">
              New User ! <Link href="/signup">Sign up ?</Link>
            </p>
            <p className="mt-2 text-danger">
              Forgot <Link href="/forgot-password">Password ?</Link>
            </p>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default login;
