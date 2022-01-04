import './index.css'

const FilterGroups = props => {
  const renderEmploymentTypeView = () => {
    const {employmentTypesList} = props

    return (
      <ul className="employment-types-container">
        {employmentTypesList.map(employmentType => {
          const {changeEmploymentType} = props
          const onChangeEmploymentType = event => {
            const checkedOrNot = event.target.checked
            changeEmploymentType(employmentType.employmentTypeId, checkedOrNot)
            // console.log(event.target.checked)
          }
          return (
            <li
              key={employmentType.employmentTypeId}
              className="employment-type-item"
            >
              <input
                type="checkbox"
                id={employmentType.employmentTypeId}
                className="checkbox-input"
                value={employmentType.employmentTypeId}
                onChange={onChangeEmploymentType}
              />
              <label
                htmlFor={employmentType.employmentTypeId}
                className="employment-type"
              >
                {employmentType.label}
              </label>
            </li>
          )
        })}
      </ul>
    )
  }

  const renderHeaderAndEmploymentTypeView = () => (
    <>
      <h1 className="employment-type-heading">Type of Employment</h1>
      {renderEmploymentTypeView()}
      <hr className="employment-type-section-end" />
    </>
  )

  const renderSalaryRangeView = () => {
    const {salaryRangesList} = props
    return (
      <ul className="salary-range-container">
        {salaryRangesList.map(salaryRange => {
          const {changeSalary} = props
          const onChangeSalary = () => {
            changeSalary(salaryRange.salaryRangeId)
          }
          return (
            <li key={salaryRange.salaryRangeId} className="salary-list-item">
              <input
                type="radio"
                id={salaryRange.salaryRangeId}
                name="salary"
                className="radio-button"
                value={salaryRange.salaryRangeId}
                onChange={onChangeSalary}
              />
              <label
                htmlFor={salaryRange.salaryRangeId}
                className="salary-input-label"
                onChange={onChangeSalary}
              >
                {salaryRange.label}
              </label>
            </li>
          )
        })}
      </ul>
    )
  }

  const renderHeaderAndSalaryView = () => (
    <>
      <h1 className="salary-range-heading">Salary Range</h1>
      {renderSalaryRangeView()}
    </>
  )

  return (
    <div className="filters-container">
      {renderHeaderAndEmploymentTypeView()}
      {renderHeaderAndSalaryView()}
    </div>
  )
}

export default FilterGroups
