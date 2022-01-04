import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import Cookies from 'js-cookie'
import './index.css'
import Header from '../Header'
import Profile from '../Profile'
import FilterGroups from '../FilterGroups'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class Jobs extends Component {
  state = {employmentType: [], salaryRange: '', searchInput: ''}

  componentDidMount() {
    this.getJobs()
  }

  changeSalary = salary => {
    // console.log(salary)
    this.setState({salaryRange: salary}, this.getJobs)
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickSearchButton = () => {
    const {searchInput} = this.state
    this.setState({searchInput}, this.getJobs)
  }

  getJobs = async () => {
    const {employmentType, searchInput, salaryRange} = this.state
    const optionsArray = employmentType.join(',')
    // console.log(optionsArray)
    const jwtToken = Cookies.get('jwt-token')
    const jobsApiUrl =
      'https://apis.ccbp.in/jobs?employment_type=FULLTIME,PARTTIME&minimum_package=1000000&search='
    console.log(jobsApiUrl)
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(jobsApiUrl, options)
    console.log(response)
    if (response.ok) {
      const data = await response.json()
      console.log(data)
    }
  }

  changeEmploymentType = (categoryType, checkedOrNot) => {
    const {employmentType} = this.state
    console.log(categoryType, checkedOrNot)
    if (checkedOrNot) {
      this.setState(
        prevState => ({
          employmentType: [...prevState.employmentType, categoryType],
        }),
        this.getJobs,
      )
    } else {
      const updatedArray = employmentType.filter(
        eachElement => eachElement !== categoryType,
      )
      this.setState({employmentType: updatedArray}, this.getJobs)
      // console.log(employmentType)
    }
  }

  renderSearchButton = () => {
    const {searchInput} = this.state
    return (
      <div className="search-bar-container">
        <input
          type="search"
          className="search-input"
          placeholder="Search"
          onChange={this.onChangeSearchInput}
          value={searchInput}
        />
        <button
          type="button"
          testid="searchButton"
          className="search-button"
          onClick={this.onClickSearchButton}
        >
          <BsSearch className="search-icon" />
        </button>
      </div>
    )
  }

  render() {
    return (
      <>
        <Header />
        <div className="jobs-container">
          <div className="profile-and-filter-section">
            <Profile />
            <hr className="profile-section-end" />
            <FilterGroups
              employmentTypesList={employmentTypesList}
              changeEmploymentType={this.changeEmploymentType}
              salaryRangesList={salaryRangesList}
              changeSalary={this.changeSalary}
            />
          </div>
          <div className="search-container">{this.renderSearchButton()}</div>
        </div>
      </>
    )
  }
}

export default Jobs
