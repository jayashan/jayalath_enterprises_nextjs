import { Loader2 } from 'lucide-react'

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Loader2 className="w-16 h-16 text-blue-600 animate-spin" />
      <h2 className="mt-4 text-2xl font-semibold text-gray-800">Site Maintenance</h2>
      <p className="mt-2 text-gray-600">We are taking time out for maintenance</p>
    </div>
  )
}

