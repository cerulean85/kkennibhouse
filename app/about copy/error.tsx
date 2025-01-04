'use client' // Error boundaries must be Client Components
 
import { useEffect } from 'react'
import  ErrorViewComponent  from '@/components/ErrorView'
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])
 
  return (
    <ErrorViewComponent 
        message={error.message} 
        onClick={() => console.error(error)} 
        />
  )
}