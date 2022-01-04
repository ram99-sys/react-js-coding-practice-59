import {Component} from 'react'
import Cookies from 'js-cookie'
import Header from '../Header'

import './index.css'

class JobItemDetails extends Component {
  componentDidMount() {
    this.getJobItemDetails()
  }

  getJobItemDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    console.log(id)
    const jobDetailsApiUrl = `https://apis.ccbp.in/jobs/${id}`
    const jwtToken = Cookies.get('jwt_token')
    console.log(jwtToken)
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
    } else {
      console.log(response)
    }
  }

  render() {
    return (
      <div>
        <Header />
      </div>
    )
  }
}

export default JobItemDetails
