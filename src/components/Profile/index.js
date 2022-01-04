import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './index.css'

const profileApiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class Profile extends Component {
  state = {apiStatus: profileApiStatusConstants.initial, profileData: []}

  componentDidMount() {
    this.getProfileDetails()
  }

  getProfileDetails = async () => {
    this.setState({apiStatus: profileApiStatusConstants.inProgress})
    const profileApiUrl = 'https://apis.ccbp.in/profile'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(profileApiUrl, options)
    if (response.ok) {
      const data = await response.json()
      // console.log(data)
      const updatedData = {
        profileDetails: data.profile_details,
      }
      // console.log(updatedData)
      const updatedProfileData = {
        name: updatedData.profileDetails.name,
        profileImageUrl: updatedData.profileDetails.profile_image_url,
        shortBio: updatedData.profileDetails.short_bio,
      }
      // console.log(updatedProfileData)
      this.setState({
        profileData: updatedProfileData,
        apiStatus: profileApiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: profileApiStatusConstants.failure})
    }
  }

  renderSuccessView = () => {
    const {profileData} = this.state
    const {name, profileImageUrl, shortBio} = profileData

    return (
      <div className="display-profile">
        <img src={profileImageUrl} alt="profile" />
        <h1 className="profile-name">{name}</h1>
        <p className="profile-bio">{shortBio}</p>
      </div>
    )
  }

  onClickRetryButton = () => {
    this.getProfileDetails()
  }

  renderFailureView = () => (
    <div className="failure-view-container">
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
    <div className="loader-container display-loader" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderActiveView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case profileApiStatusConstants.success:
        return this.renderSuccessView()
      case profileApiStatusConstants.failure:
        return this.renderFailureView()
      case profileApiStatusConstants.inProgress:
        return this.renderInProgressView()
      default:
        return null
    }
  }

  render() {
    return <div className="profile-container">{this.renderActiveView()}</div>
  }
}

export default Profile
