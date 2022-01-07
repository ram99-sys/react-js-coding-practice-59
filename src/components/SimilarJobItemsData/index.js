import {FaStar} from 'react-icons/fa'
import {IoLocationSharp} from 'react-icons/io5'
import {CgToolbox} from 'react-icons/cg'
import './index.css'

const SimilarJobItemsData = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = jobDetails

  return (
    <li className="similar-job-data-item">
      <div className="logo-and-title-container">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
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
      <h1 className="similar-jobs-heading">Description</h1>
      <p className="job-description-data">{jobDescription}</p>
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
    </li>
  )
}

export default SimilarJobItemsData
