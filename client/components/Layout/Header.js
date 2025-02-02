import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context";
import { useRouter } from "next/router";
import Link from "next/link";
const Header = () => {
  const [state, setState] = useContext(UserContext);
  const [currentTab, setCurrentTab] = useState("");
  useEffect(() => {
    process.browser && setCurrentTab(window.location.pathname);
  }, []);
  const router = useRouter();
  const handleLogout = () => {
    window.localStorage.removeItem("auth");
    setState(null);
    router.push("/login");
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-danger p-4">
        <div className="container">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <Link href="/user/update" legacyBehavior>
            <a className="navbar-brand">NB</a>
          </Link>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link href="/user/dashboard" legacyBehavior>
                  <a
                    className={`nav-link ${currentTab === "/user/dashboard"}`}
                    aria-current="page"
                  >
                    Explore
                  </a>
                </Link>
              </li>
              {/* <li className="nav-item">
                <Link href="/about" legacyBehavior>
                  <a
                    className={`nav-link ${
                      currentTab === "/about" && "active"
                    }`}
                    aria-current="page"
                  >
                    About
                  </a>
                </Link>
              </li> */}
              {state !== null ? (
                <>
                  <div>
                    <li className="nav-item dropdown">
                      <a
                        className="nav-link dropdown-toggle"
                        href="#"
                        id="navbarDropdown"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        {state && state.user && state.user.name}
                      </a>
                      <ul
                        className="dropdown-menu"
                        aria-labelledby="navbarDropdown"
                      >
                        {/* <li>
                          <Link href="/user/dashboard" legacyBehavior>
                            <a
                              className={`dropdown-item ${
                                currentTab === "/user/dashborad" && "active"
                              }`}
                              aria-current="page"
                            >
                              Dashboard
                            </a>
                          </Link>
                        </li> */}
                        <li>
                          <Link href="/user/profile/update" legacyBehavior>
                            <a
                              className={`dropdown-item ${
                                currentTab === "/user/profile/update" &&
                                "active"
                              }`}
                              aria-current="page"
                            >
                              Profile
                            </a>
                          </Link>
                        </li>
                      </ul>
                    </li>
                  </div>
                  <li className="nav-item">
                    <a
                      className="nav-link "
                      aria-current="page"
                      onClick={handleLogout}
                    >
                      Logout
                    </a>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link href="/signup" legacyBehavior>
                      <a
                        className={`nav-link ${
                          currentTab === "/signup" && "active"
                        }`}
                        aria-current="page"
                      >
                        Sign up
                      </a>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link href="/login" legacyBehavior>
                      <a
                        className={`nav-link ${
                          currentTab === "/login" && "active"
                        }`}
                        aria-current="page"
                      >
                        Login
                      </a>
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
