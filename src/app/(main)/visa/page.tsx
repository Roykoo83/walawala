import { createClient } from '@/utils/supabase/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress' // Shadcn Progress 필요
import { differenceInDays, parseISO, addDays } from 'date-fns'
import Link from 'next/link'

export default async function VisaPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return <div className="p-4">Please login first.</div>
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  if (!profile || !profile.visa_expiry_date) {
    return (
      <div className="container mx-auto p-4">
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="mb-4">비자 정보가 없습니다.</p>
            <Link href="/onboarding">
              <Button>비자 정보 등록하기</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  const today = new Date()
  const expiryDate = parseISO(profile.visa_expiry_date)
  const dDay = differenceInDays(expiryDate, today)

  // 전체 비자 기간 (가정: 1년 또는 2년) - 진행률 계산용
  // 정확한 시작일이 없으므로, 만료일로부터 1년 전을 시작일로 가정 (MVP 근사치)
  const totalDays = 365
  const daysPassed = totalDays - dDay
  const progress = Math.min(Math.max((daysPassed / totalDays) * 100, 0), 100)

  // 색상 결정
  const isUrgent = dDay <= 90
  const colorClass = isUrgent ? 'text-red-500' : 'text-blue-600'
  const progressColor = isUrgent ? 'bg-red-500' : 'bg-blue-600'

  return (
    <div className="container mx-auto px-4 py-6 max-w-md pb-20">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Visa</h1>
        <Link href="/onboarding">
          <Button variant="ghost" size="sm">⚙️</Button>
        </Link>
      </div>

      {/* Main Visa Card */}
      <Card className="mb-6 border-l-4 border-l-indigo-500 shadow-md">
        <CardHeader className="pb-2">
          <div className="flex justify-between">
            <span className="text-sm text-gray-500 uppercase">Current Visa</span>
            <span className={`font-bold ${colorClass}`}>
              {dDay < 0 ? 'Expired' : `D-${dDay}`}
            </span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-3xl font-bold">{profile.visa_type}</span>
            <span className="text-sm text-gray-500">({profile.nationality})</span>
          </div>

          <div className="mb-2 flex justify-between text-xs text-gray-500">
            <span>Start</span>
            <span>Expires: {profile.visa_expiry_date}</span>
          </div>
          <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
            <div
              className={`h-full ${progressColor} transition-all duration-500`}
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-right text-xs text-gray-400 mt-1">{Math.round(progress)}% Used</p>
        </CardContent>
      </Card>

      {/* Upcoming Alerts */}
      <h2 className="text-lg font-semibold mb-4">📅 Upcoming</h2>
      <div className="space-y-3">
        {dDay <= 90 && (
          <Card className="border-l-4 border-l-yellow-400 bg-yellow-50">
            <CardContent className="p-4 flex gap-3 items-center">
              <span className="text-2xl">🟡</span>
              <div>
                <p className="font-bold text-gray-800">D-{dDay}: Prepare Documents</p>
                <p className="text-xs text-gray-600">지금부터 서류 준비를 시작하세요.</p>
              </div>
            </CardContent>
          </Card>
        )}

        <Card className="border-l-4 border-l-red-400 opacity-50">
          <CardContent className="p-4 flex gap-3 items-center">
            <span className="text-2xl">🔴</span>
            <div>
              <p className="font-bold text-gray-800">D-30: Apply Extension</p>
              <p className="text-xs text-gray-600">출입국사무소 방문 예약 필수</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tools */}
      <h2 className="text-lg font-semibold mb-4 mt-8">Tools</h2>
      <div className="grid grid-cols-1 gap-3">
        <Link href="/visa/ai-chat">
          <Card className="hover:bg-gray-50 cursor-pointer transition-colors border-l-4 border-l-purple-500 bg-purple-50/10">
            <CardContent className="p-4 flex justify-between items-center">
              <div>
                <span className="font-bold block text-gray-800">🤖 AI 비자 선배</span>
                <span className="text-xs text-gray-500">무엇이든 물어보세요!</span>
              </div>
              <span className="text-gray-400">→</span>
            </CardContent>
          </Card>
        </Link>
        <Link href="/visa/f2-calculator">
          <Card className="hover:bg-gray-50 cursor-pointer transition-colors">
            <CardContent className="p-4 flex justify-between items-center">
              <span className="font-medium">🧮 F-2 점수 계산기</span>
              <span className="text-gray-400">→</span>
            </CardContent>
          </Card>
        </Link>
        <Link href="/visa/roadmap">
          <Card className="hover:bg-gray-50 cursor-pointer transition-colors">
            <CardContent className="p-4 flex justify-between items-center">
              <span className="font-medium">🗺️ 비자 로드맵 시뮬레이터</span>
              <span className="text-gray-400">→</span>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  )
}