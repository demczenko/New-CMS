import React from 'react'

const TemplateNotFound = () => {
  return (
    <div className='flex flex-col items-center justify-center h-screen absolute inset-0 -z-10'>
      <h3 className='text-4xl font-semibold'>Oooooops...</h3>
      <p className='text-base mt-4 text-neutral-300'>Looks like template not selected or not found.</p>
    </div>
  )
}

export default TemplateNotFound