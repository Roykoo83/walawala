import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
      <div className="text-center space-y-6 max-w-lg px-4">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">
          Welcome to WalaWala
        </h1>
        <p className="text-lg text-gray-600">
          Your community hub for questions, visa help, and connections.
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/community">
            <Button size="lg">Go to Community Board</Button>
          </Link>
          <Link href="/login">
            <Button variant="outline" size="lg">Login</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}