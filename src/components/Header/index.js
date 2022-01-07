import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {MdHome} from 'react-icons/md'
import {FiLogOut} from 'react-icons/fi'
import {CgToolbox} from 'react-icons/cg'
import './index.css'

const Header = props => {
  const onCLickLogoutButton = () => {
    const {history} = props
    console.log(props)
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <ul className="header-section">
      <li>
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="website-logo"
          />
        </Link>
      </li>
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
      <li className="button-option">
        <button
          type="button"
          className="logout-button"
          onClick={onCLickLogoutButton}
        >
          Logout
        </button>
      </li>
      <li className="icons-header">
        <Link to="/">
          <MdHome className="home-icon" />
        </Link>
        <Link to="/jobs">
          <CgToolbox className="job-icon" />
        </Link>
        <button
          type="button"
          className="logout-icon"
          onClick={onCLickLogoutButton}
        >
          <FiLogOut className="logout-icon" />
        </button>
      </li>
    </ul>
  )
}
export default withRouter(Header)
