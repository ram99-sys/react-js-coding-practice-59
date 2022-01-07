import {Component} from 'react'
import Cookies from 'js-cookie'
import {FaStar} from 'react-icons/fa'
import {IoLocationSharp} from 'react-icons/io5'
import {CgToolbox} from 'react-icons/cg'
import {BiLinkExternal} from 'react-icons/bi'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import Header from '../Header'

import './index.css'
import SimilarJobItemsData from '../SimilarJobItemsData'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class JobItemDetails extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    jobItemDetailsData: [],
    jobItemSkillsData: [],
    jobItemSimilarJobsData: [],
    lifeAtCompanyDetailsData: [],
  }

  componentDidMount() {
    this.getJobItemDetails()
  }

  getJobItemDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    // console.log(id)
    const jobDetailsApiUrl = `https://apis.ccbp.in/jobs/${id}`
    const jwtToken = Cookies.get('jwt_token')
    // console.log(jwtToken)
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(jobDetailsApiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = {
        jobDetails: data.job_details,
        similarJobs: data.similar_jobs,
      }
      console.log(updatedData)
      const jobDetailsData = {
        companyLogoUrl: updatedData.jobDetails.company_logo_url,
        companyWebsiteUrl: updatedData.jobDetails.company_website_url,
        employmentType: updatedData.jobDetails.employment_type,
        jobDescription: updatedData.jobDetails.job_description,
        lifeAtCompany: updatedData.jobDetails.life_at_company,
        location: updatedData.jobDetails.location,
        packagePerAnnum: updatedData.jobDetails.package_per_annum,
        rating: updatedData.jobDetails.rating,
        title: updatedData.jobDetails.title,
        id: updatedData.jobDetails.id,
      }
      console.log(jobDetailsData)

      const lifeAtCompanyData = {
        lifeAtCompany: updatedData.jobDetails.life_at_company,
      }

      console.log(lifeAtCompanyData)

      const lifeAtCompanyData1 = {
        imageUrl: jobDetailsData.lifeAtCompany.image_url,
        description: jobDetailsData.lifeAtCompany.description,
      }

      console.log(lifeAtCompanyData1)

      const skillsData = updatedData.jobDetails.skills.map(eachObject => ({
        imageUrl: eachObject.image_url,
        name: eachObject.name,
      }))
      console.log(skillsData)
      const similarJobsData = updatedData.similarJobs.map(eachObject => ({
        companyLogoUrl: eachObject.company_logo_url,
        employmentType: eachObject.employment_type,
        id: eachObject.id,
        jobDescription: eachObject.job_description,
        location: eachObject.location,
        rating: eachObject.rating,
        title: eachObject.title,
      }))
      console.log(similarJobsData)
      this.setState({
        apiStatus: apiStatusConstants.success,
        jobItemDetailsData: jobDetailsData,
        jobItemSkillsData: skillsData,
        jobItemSimilarJobsData: similarJobsData,
        lifeAtCompanyDetailsData: lifeAtCompanyData1,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderSkillsView = () => {
    const {jobItemSkillsData} = this.state

    return (
      <ul className="skills-data-list">
        {jobItemSkillsData.map(eachObject => (
          <li key={eachObject.name} className="skills-data-list-item">
            <img
              src={eachObject.imageUrl}
              alt={eachObject.name}
              className="skill-image-url"
            />
            <p className="skill-name">{eachObject.name}</p>
          </li>
        ))}
      </ul>
    )
  }

  renderSuccessView = () => {
    const {
      jobItemDetailsData,
      lifeAtCompanyDetailsData,
      jobItemSimilarJobsData,
    } = this.state
    const {
      jobDescription,
      rating,
      title,
      location,
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      packagePerAnnum,
    } = jobItemDetailsData
    const {imageUrl, description} = lifeAtCompanyDetailsData
    return (
      <>
        <div className="job-item-data">
          <div className="logo-and-title-container">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
              className="job-details-company-logo"
            />
            <div>
              <h1 className="job-item-title">{title}</h1>
              <div className="icon-and-rating-container">
                <FaStar className="star-icon1" />
                <p className="job-item-rating">{rating}</p>
              </div>
            </div>
          </div>
          <div className="location-and-package-container">
            <div className="location-and-role-container">
              <div className="location-container">
                <IoLocationSharp className="location-icon" />
                <p className="location">{location}</p>
              </div>
              <div className="role-container">
                <CgToolbox className="role-icon" />
                <p className="role">{employmentType}</p>
              </div>
            </div>
            <div>
              <p className="package">{packagePerAnnum}</p>
            </div>
          </div>
          <hr className="title-image-section-end" />
          <div className="description-and-website-url">
            <h1 className="description-heading1">Description</h1>
            <a
              href={companyWebsiteUrl}
              rel="noreferrer"
              className="company-nav-link"
              target="_blank"
            >
              <button type="button" className="visit-button">
                <p className="visit-text">Visit</p>
                <BiLinkExternal className="link-icon" />
              </button>
            </a>
          </div>
          <p className="job-description1">{jobDescription}</p>
          <h1 className="skills-heading-text">Skills</h1>
          {this.renderSkillsView()}
          <h1 className="life-at-company-heading">Life at Company</h1>
          <div className="life-at-company-container">
            <p className="life-at-company-description">{description}</p>
            <img
              src={imageUrl}
              alt="life at company"
              className="life-at-company-image"
            />
          </div>
        </div>
        <h1 className="similar-jobs-heading">Similar Jobs</h1>
        <ul className="similar-jobs-data-container">
          {jobItemSimilarJobsData.map(eachJobDetails => (
            <SimilarJobItemsData
              jobDetails={eachJobDetails}
              key={eachJobDetails.id}
            />
          ))}
        </ul>
      </>
    )
  }

  failureViewRetryButton = () => {
    this.getJobItemDetails()
  }

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-view1"
      />
      <h1 className="something-went-wrong-heading">
        Oops! Something Went Wrong
      </h1>
      <p className="display-text">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        type="button"
        className="retry-button"
        onClick={this.failureViewRetryButton}
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

  renderJobItemsView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderInProgressView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="job-items-bg-container">
          {this.renderJobItemsView()}
        </div>
      </>
    )
  }
}

export default JobItemDetails
