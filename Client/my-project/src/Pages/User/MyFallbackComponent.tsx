
import { FallbackProps } from 'react-error-boundary';
import React from 'react'

const MyFallbackComponent = ({ error, resetErrorBoundary }: FallbackProps) => {
  return (
    <div className="w-full h-50px bg-red-500">
        <p className="text-lg text-white font-semibold">Something went wrong:</p>
        <pre>{error.message}</pre>
          <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  )
}

export default MyFallbackComponent

