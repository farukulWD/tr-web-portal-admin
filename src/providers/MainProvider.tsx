
import React from 'react'
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

export default function MainProvider({children}:{children:React.ReactNode}) {
  return (
    <>
      {children}
    
        <ProgressBar
                height='4px'
                color='#f9be34'
                options={{ showSpinner: false }}
                shallowRouting
            />
    </>
  )
}
