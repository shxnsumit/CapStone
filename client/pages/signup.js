import React, { useState, useContext } from "react";
import { useRouter } from "next/router";
import { UserContext } from "@/context";
import Layout from "@/components/Layout";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Link from "next/link";
import "react-toastify/dist/ReactToastify.css";
const signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [state, setstate] = useContext(UserContext);
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(`/register`, {
        name,
        email,
        password,
        answer,
      });
      setLoading(false);
      toast.success("User registered successfully");
      router.push("/login");
    } catch (error) {
      toast.error(error.response.data);
    }
  };
  if (state && state.token) router.push("/");
  return (
    <Layout title="About neighbourly">
      <div className="row d-flex align-items-center justify-content-center mb-2">
        <div className="col-md-5 py-5">
          <h1 className="text-center">Sign up</h1>
          <form className="py-3">
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
              <label htmlFor="exampleInputName1" className="form-label">
                Name
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                className="form-control"
                id="exampleInputName"
                aria-describedby="NameHelp"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
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

            <select
              className="form-select"
              defaultValue={"DEFAULT"}
              aria-label="Default select example"
            >
              <option value="DEFAULT">Security questions?</option>
              <option value={1}>What is your dog's name?</option>
              <option value={2}>Name of your bestfriend?</option>
              <option value={3}>Primary school?</option>
            </select>
            <div className="mb-3">
              <input
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                className="form-control"
                id="exampleInputAnswer"
                aria-describedby="NameHelp"
                placeholder="Write your answer here"
                required
              />
            </div>
            <button
              type="submit"
              onClick={handleSubmit}
              className="btn btn-success btn-md px-4"
              disabled={!name || !email || !password || !answer}
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
                "Sign up"
              )}
            </button>
            <p className="mt-2 ml-2">
              Already have a account ? <Link href="/login">Login</Link>{" "}
            </p>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default signup;
