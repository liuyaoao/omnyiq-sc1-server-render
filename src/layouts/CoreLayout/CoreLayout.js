import React from 'react'
import ReactTabBar from '../../components/ReactTabBar'
import './CoreLayout.scss'
import '../../styles/core.scss'

export const CoreLayout = ({ children }) => (
  <div className='container text-center'>
    <div className='mainContainer'>
      {children}
    </div>
    <ReactTabBar />
  </div>
)

CoreLayout.propTypes = {
  children: React.PropTypes.element.isRequired
}

export default CoreLayout
