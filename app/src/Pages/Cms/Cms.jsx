import React ,{lazy} from 'react'
import Sidebar from '../../components/cms/Sidebar'

const Cms = () => {
  return (
    <div className='flex flex-row gap-10'>
      <div className='absolute left-0 h-full'>
        <span>
            <a href="/">Home</a>
        </span>
        <Sidebar />
      </div>
      
    </div>
  )
}

export default Cms
