import { getCourses } from '@/actions/learn'
import { SAMPLE_COURSES } from '@/lib/sample-courses'
import { CourseCard } from '@/components/features/learn/course-card'
import Link from 'next/link'
import { BookOpen, GraduationCap, Globe, Sparkles } from 'lucide-react'
import type { Course } from '@/actions/learn'

const CATEGORIES = [
    { id: 'all', label: 'All', icon: Sparkles, color: 'bg-purple-100 text-purple-600' },
    { id: 'kiip', label: 'KIIP', icon: GraduationCap, color: 'bg-blue-100 text-blue-600' },
    { id: 'korean', label: 'Korean', icon: BookOpen, color: 'bg-green-100 text-green-600' },
    { id: 'culture', label: 'Culture', icon: Globe, color: 'bg-orange-100 text-orange-600' },
]

export default async function LearnPage({
    searchParams,
}: {
    searchParams: Promise<{ category?: string }>
}) {
    const params = await searchParams
    const category = params.category || 'all'

    // DB에서 강좌 조회, 없으면 샘플 데이터 사용
    let courses = await getCourses(category)

    if (courses.length === 0) {
        // DB가 비어있으면 샘플 데이터 사용
        courses = category === 'all'
            ? SAMPLE_COURSES
            : SAMPLE_COURSES.filter((c: Course) => c.category === category)
    }

    return (
        <div className="min-h-screen bg-slate-50 pb-24">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 px-4 py-4">
                <div className="max-w-md mx-auto">
                    <h1 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                        <GraduationCap className="w-6 h-6 text-brand-primary" />
                        Learn
                    </h1>
                    <p className="text-xs text-slate-500 mt-1">
                        KIIP, 한국어, 문화 강좌를 학습하세요
                    </p>
                </div>
            </header>

            <main className="container max-w-md mx-auto px-4 pt-4">
                {/* Category Tabs */}
                <div className="flex gap-2 mb-6 overflow-x-auto no-scrollbar pb-2">
                    {CATEGORIES.map((cat) => {
                        const isActive = category === cat.id
                        const Icon = cat.icon

                        return (
                            <Link
                                key={cat.id}
                                href={cat.id === 'all' ? '/learn' : `/learn?category=${cat.id}`}
                                className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all ${isActive
                                    ? 'bg-brand-primary text-white shadow-md'
                                    : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300'
                                    }`}
                            >
                                <Icon className="w-4 h-4" />
                                <span className="text-sm font-medium">{cat.label}</span>
                            </Link>
                        )
                    })}
                </div>

                {/* Course Grid */}
                <div className="grid grid-cols-2 gap-3">
                    {courses.length === 0 ? (
                        <div className="col-span-2 text-center py-12 bg-white rounded-2xl border border-slate-100">
                            <div className="text-4xl mb-3">📚</div>
                            <p className="text-slate-500 font-medium">강좌가 없어요.</p>
                            <p className="text-slate-400 text-sm mt-1">곧 새로운 콘텐츠가 추가됩니다!</p>
                        </div>
                    ) : (
                        courses.map((course) => (
                            <CourseCard key={course.id} course={course} />
                        ))
                    )}
                </div>

                {/* Info Banner */}
                <div className="mt-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-4 border border-blue-100">
                    <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                            <GraduationCap className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                            <h3 className="font-bold text-sm text-blue-900 mb-1">KIIP란?</h3>
                            <p className="text-xs text-blue-700 leading-relaxed">
                                사회통합프로그램(KIIP)은 외국인이 한국사회 구성원으로 적응하는데 필요한
                                한국어와 한국문화를 체계적으로 배울 수 있는 정부 프로그램입니다.
                            </p>
                            <a
                                href="https://www.socinet.go.kr"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block mt-2 text-xs text-blue-600 font-semibold hover:underline"
                            >
                                공식 사이트 방문 →
                            </a>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
