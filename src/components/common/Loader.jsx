import React from 'react';
import { Vortex } from 'react-loader-spinner';

const Loader = () => {
  return (
  <div className='h-screen flex items-center justify-center'>
      <Vortex
      visible={true}
      height="100"
      width="100"
      ariaLabel="vortex-loading"
      wrapperStyle={{}}
      wrapperClass="vortex-wrapper"
      colors={['#fd7252','#FF5733', '#C70039','#811561','#943678', '#581845']}
    />
    <p className='px-2 text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#FF5733] via-[#C70039] to-[#581845]'>Hold on for us</p>
 </div>
  )
}

export default Loader