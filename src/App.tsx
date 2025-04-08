import { useUserContext } from '../stores/UserContext';
import { format } from "date-fns";
import { useState } from "react";

const USERS_PER_PAGE = 10;

function App() {
  const { state, dispatch } = useUserContext();
  const { users, currentPage } = state;
  const [showSidebar, setShowSidebar] = useState(false);

  const totalPages = Math.ceil(users.length / USERS_PER_PAGE);
  const paginatedUsers = users.slice(
    (currentPage - 1) * USERS_PER_PAGE,
    currentPage * USERS_PER_PAGE
  );

  return (
    <div className="container-fluid">
      <button
        className="btn btn-primary mt-2 d-md-none"
        onClick={() => setShowSidebar(true)}
      >
        ☰
      </button>

      <div
        className={`offcanvas offcanvas-start ${showSidebar ? "show" : ""}`}
        tabIndex={-1}
        style={{ visibility: showSidebar ? "visible" : "hidden", backgroundColor: "#fff" }}
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title">Dashboard</h5>
          <button
            type="button"
            className="btn-close"
            onClick={() => setShowSidebar(false)}
            aria-label="Close sidebar"
          ></button>
        </div>
        <div className="offcanvas-body">
          <ul className="nav flex-column">
            <li className="nav-item">
              <a className="nav-link active" href="/">Danh sách người dùng</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="row">
        <div className="col-md-2 d-none d-md-block bg-light vh-100 p-3 bg-dark">
          <ul className="nav flex-column">
            <li className="nav-item">
              <a className="nav-link active text-white" href="/"><i className="fa-solid fa-user-tie"></i> Danh sách người dùng</a>
            </li>
          </ul>
        </div>
        <div className="col-md-10">
          <h1 className="text-center mt-3">Danh sách người dùng</h1>
          <div className="table-responsive">
            <table className="table table-bordered table-hover mt-3">
              <thead className="table-light">
                <tr>
                  <th>Name</th>
                  <th>Balance ($)</th>
                  <th>Email</th>
                  <th className='text-center'>Registration date</th>
                  <th className='text-center'>Status</th>
                </tr>
              </thead>
              <tbody>
                {paginatedUsers.map((user) => (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>${user.balance.toLocaleString()}</td>
                    <td>
                      <a
                        href={`mailto:${user.email}`}
                        className="text-primary text-decoration-underline"
                      >
                        {user.email}
                      </a>
                    </td>
                    <td className='text-center' title={new Date(user.registerAt).toLocaleString()}>
                      {format(new Date(user.registerAt), "yyyy-MM-dd")}
                    </td>
                    <td className="text-center">
                      <span className={`badge ${user.active ? 'bg-success' : 'bg-secondary'}`}>
                        {user.active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <nav className="d-flex justify-content-center mt-2">
            <ul className="pagination">
              {Array.from({ length: totalPages }).map((_, index) => (
                <li
                  key={index}
                  className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
                >
                  <button
                    className="page-link"
                    onClick={() => dispatch({ type: 'SET_PAGE', payload: index + 1 })}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default App;
