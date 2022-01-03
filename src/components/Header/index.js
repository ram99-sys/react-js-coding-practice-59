import {Link} from 'react-router-dom'
import './index.css'

const Header = () => (
  <div className="header-section">
    <img
      src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
      alt="website logo"
      className="website-logo"
    />
    <ul className="options-list">
      <li>
        <Link to="/" className="nav-link">
          Home
        </Link>
      </li>
      <li>
        <Link to="/jobs" className="nav-link">
          Jobs
        </Link>
      </li>
    </ul>
    <button type="button" className="logout-button">
      Logout
    </button>
  </div>
)

export default Header
