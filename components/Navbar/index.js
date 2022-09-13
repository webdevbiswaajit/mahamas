import { logout } from "apis/auth";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "providers/AuthProvider";
import { useEffect } from "react";
import store from "store";
import Image from "next/image";

export default function Navbar() {
  const router = useRouter();
  const { user, setUser, setToken } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {}
    store.remove("token");
    store.remove("user");
    setUser(null);
    setToken(null);
    router.replace("/");
  };

  useEffect(() => {
    setUser(store.get("user"));
  }, [setUser]);

  const navActive = (path) => {
    return router.pathname == path ? "active" : "";
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white container">
      <div className="container-fluid">
        <Link href="/">
          <a className="navbar-brand fw-bold">
            <Image
              height={100}
              width={200}
              className="logo"
              src="/img/logo.png"
              alt=""
            />
          </a>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mr-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link href="/">
                <a className={`nav-link ${navActive("/")}`}>Home</a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/subdivisions">
                <a className={`nav-link ${navActive("/subdivisions")}`}>
                  Subdivisions
                </a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/housing-models">
                <a className={`nav-link ${navActive("/housing-models")}`}>
                  Housing Models
                </a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/contact">
                <a className={`nav-link ${navActive("/contact")}`}>Contact</a>
              </Link>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                data-bs-toggle="dropdown"
                data-bs-auto-close="outside"
              >
                More
              </a>
              <ul className="dropdown-menu shadow">
                <li>
                  <Link href="/download">
                    <a className="dropdown-item">Housing Act</a>
                  </Link>
                </li>
                <li>
                  <Link href="/download">
                    <a className="dropdown-item">Housing Regulations</a>
                  </Link>
                </li>
                <li>
                  <Link href="#">
                    <a className="dropdown-item">Plans to Own</a>
                  </Link>
                </li>
                <li className="dropstart">
                  <a
                    href="#"
                    className="dropdown-item dropdown-toggle"
                    data-bs-toggle="dropdown"
                  >
                    Agencies
                  </a>
                  <ul className="dropdown-menu shadow">
                    <li>
                      <a className="dropdown-item" href="#">
                        Post Office
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Met Office
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Port Department
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Mortgage Corporation
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Road Traffic
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Bahamas Maritime Authority
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="dropstart">
                  <a
                    href="#"
                    className="dropdown-item dropdown-toggle"
                    data-bs-toggle="dropdown"
                  >
                    DOH Department
                  </a>
                  <ul className="dropdown-menu shadow">
                    <li>
                      <a className="dropdown-item" href="#">
                        Head of Department
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Human Resources
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Customer Service
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Complains
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Undertaking to Ensure
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Accounts Section
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Legal
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Registry Section
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Public Rentals
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Collections & Resettlement
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Land Management
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Infrastructural Development
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        House Construction
                      </a>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link href="/about">
                    <a className="dropdown-item">About Us</a>
                  </Link>
                </li>
                <li>
                  <Link href="/faq">
                    <a className="dropdown-item">FAQs</a>
                  </Link>
                </li>
                <li>
                  <Link href="/tnc">
                    <a className="dropdown-item">Terms and Conditions</a>
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
          <ul className="navbar-nav">
            {user && (
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="fas fa-user" />
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <Link href="/profile">
                      <a className="dropdown-item">Profile</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/application">
                      <a className="dropdown-item">Application</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/application-status">
                      <a className="dropdown-item">Application Status</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/support">
                      <a className="dropdown-item">Contact Support</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/support/history">
                      <a className="dropdown-item">Support History</a>
                    </Link>
                  </li>
                  <li>
                    <a
                      onClick={handleLogout}
                      className="dropdown-item cursor-pointer"
                    >
                      Logout
                    </a>
                  </li>
                </ul>
              </li>
            )}
          </ul>

          {!user && (
            <Link href="/login">
              <a className="btn bg-gradient-hover ms-auto">Login/Signup</a>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
