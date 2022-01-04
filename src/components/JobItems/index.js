import {FaStar} from 'react-icons/fa'
import {IoLocationSharp} from 'react-icons/io5'
import {CgToolbox} from 'react-icons/cg'
import './index.css'

const JobItems = props => {
  const {jobsData} = props
  const {
    id,
    companyLogoUrl,
    packagePerAnnum,
    jobDescription,
    rating,
    location,
    employmentType,
    title,
  } = jobsData

  return (
    <div className="job-item">
      <div className="image-title-rating-container">
        <img
          src={companyLogoUrl}
          alt="company logo"
          className="company-image"
        />
        <div>
          <h1 className="title-heading">{title}</h1>
          <div className="icon-and-star-container">
            <FaStar className="star-icon" />
            <p className="rating">{rating}</p>
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
      <div className="description-container">
        <p className="description-heading">Description</p>
        <p className="job-description">{jobDescription}</p>
      </div>
    </div>
  )
}

export default JobItems
