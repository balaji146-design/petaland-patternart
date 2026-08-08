import React from 'react'

function Loader({ size = 'md', fullScreen = false, label = 'Loading...' }) {
  const sizeMap = {
    sm: 'w-5 h-5 border-2',
    md: 'w-9 h-9 border-[3px]',
    lg: 'w-14 h-14 border-4',
  }

  const spinner = (
    <div className="flex flex-col items-center justify-center gap-3">
      <div
        className={`${sizeMap[size] || sizeMap.md} rounded-full border-[#c9a24b]/20 border-t-[#c9a24b] animate-spin`}
      />
      {label && (
        <span className="text-xs tracking-wide uppercase text-muted-luxury">
          {label}
        </span>
      )}
    </div>
  )

  if (fullScreen) {
    return (
      <div className="admin-bg min-h-screen w-full flex items-center justify-center">
        {spinner}
      </div>
    )
  }

  return spinner
}

export default Loader