import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './index.css'
import Header from '../Header'
import Profile from '../Profile'
import FilterGroups from '../FilterGroups'
import JobItems from '../JobItems'

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

const jobsApiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class Jobs extends Component {
  state = {
    employmentType: [],
    salaryRange: '',
    searchInput: '',
    jobsData: [],
    apiStatus: jobsApiStatusConstants.initial,
  }

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
    this.setState({apiStatus: jobsApiStatusConstants.inProgress})
    const {employmentType, searchInput, salaryRange} = this.state
    const optionsArray = employmentType.join(',')
    // console.log(optionsArray)
    const jwtToken = Cookies.get('jwt_token')
    // console.log(jwtToken)
    const jobsApiUrl = `https://apis.ccbp.in/jobs?employment_type=${optionsArray}&minimum_package=${salaryRange}&search=${searchInput}`
    // console.log(jobsApiUrl)
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(jobsApiUrl, options)
    // console.log(response)
    if (response.ok) {
      const data = await response.json()
      // console.log(data)
      const updatedData = {
        jobs: data.jobs,
      }
      // console.log(updatedData)
      const updatedJobsData = updatedData.jobs.map(eachObject => ({
        id: eachObject.id,
        companyLogoUrl: eachObject.company_logo_url,
        jobDescription: eachObject.job_description,
        packagePerAnnum: eachObject.package_per_annum,
        rating: eachObject.rating,
        title: eachObject.title,
        location: eachObject.location,
        employmentType: eachObject.employment_type,
      }))
      // console.log(updatedJobsData)
      this.setState({
        jobsData: updatedJobsData,
        apiStatus: jobsApiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: jobsApiStatusConstants.failure})
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
      <div className="search-bar-container search-bar">
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

  renderNoJobsView = () => (
    <div className="no-jobs-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
        className="no-jobs-image"
      />
      <h1 className="no-jobs-found-heading">No Jobs Found</h1>
      <p className="no-jobs-found-text">
        We could not find any jobs. Try other filters
      </p>
    </div>
  )

  renderSuccessView = () => {
    const {jobsData} = this.state
    const findJobsListEmptyOrNot = jobsData.length > 0
    return findJobsListEmptyOrNot ? (
      <ul className="jobs-api-data-container">
        {jobsData.map(eachJob => (
          <JobItems jobsData={eachJob} key={eachJob.id} />
        ))}
      </ul>
    ) : (
      <>{this.renderNoJobsView()}</>
    )
  }

  onClickRetryButton = () => {
    this.getJobs()
  }

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-view"
      />
      <h1 className="failure-view-heading">Oops! Something Went Wrong</h1>
      <p className="failure-view-text">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        type="button"
        className="retry-button"
        onClick={this.onClickRetryButton}
      >
        Retry
      </button>
    </div>
  )

  renderInProgressView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderApiDataView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case jobsApiStatusConstants.success:
        return this.renderSuccessView()
      case jobsApiStatusConstants.failure:
        return this.renderFailureView()
      case jobsApiStatusConstants.inProgress:
        return this.renderInProgressView()

      default:
        return null
    }
  }

  renderSearchBar = () => {
    const {searchInput} = this.state
    return (
      <div className="search-bar-container not-display-search-bar">
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
          {this.renderSearchBar()}
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
          <div className="search-container">
            {this.renderSearchButton()}
            {this.renderApiDataView()}
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
