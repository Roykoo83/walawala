import { getCourseById, getCourseComments, type Course } from '@/actions/learn'
import { SAMPLE_COURSES } from '@/lib/sample-courses'
import { CourseComments } from '@/components/features/learn/course-comments'
import { createClient } from '@/utils/supabase/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, PlayCircle, FileText, Download, ExternalLink, Clock, BarChart3, MessageCircle } from 'lucide-react'

const CONTENT_TYPE_CONFIG = {
    video: { icon: PlayCircle, label: '영상 콘텐츠', color: 'text-red-500', bg: 'bg-red-50' },
    text: { icon: FileText, label: '텍스트 콘텐츠', color: 'text-blue-500', bg: 'bg-blue-50' },
    document: { icon: Download, label: '자료 다운로드', color: 'text-green-500', bg: 'bg-green-50' },
}

const LEVEL_STYLES = {
    beginner: { bg: 'bg-green-100', text: 'text-green-700', label: 'Beginner' },
    intermediate: { bg: 'bg-yellow-100', text: 'text-yellow-700', label: 'Intermediate' },
    advanced: { bg: 'bg-red-100', text: 'text-red-700', label: 'Advanced' },
}

export default async function CourseDetailPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    // DB에서 강좌 조회, 없으면 샘플 데이터에서 찾기
    let course = await getCourseById(id)
    let comments = await getCourseComments(id)

    // 샘플 데이터에서 찾기
    if (!course) {
        course = SAMPLE_COURSES.find((c: Course) => c.id === id) || null
        comments = [] // 샘플 데이터는 댓글 없음
    }

    if (!course) {
        return (
            <div className="container mx-auto px-4 py-12 text-center">
                <p className="text-gray-500">강좌를 찾을 수 없습니다.</p>
                <Link href="/learn" className="text-brand-primary mt-4 inline-block">
                    ← 목록으로 돌아가기
                </Link>
            </div>
        )
    }

    const contentConfig = CONTENT_TYPE_CONFIG[course.content_type]
    const levelStyle = LEVEL_STYLES[course.level]
    const ContentIcon = contentConfig.icon

    // YouTube URL을 embed URL로 변환
    const getEmbedUrl = (url: string) => {
        const videoId = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/)?.[1]
        return videoId ? `https://www.youtube.com/embed/${videoId}` : null
    }

    const embedUrl = course.content_type === 'video' ? getEmbedUrl(course.content_url) : null

    return (
        <div className="min-h-screen bg-slate-50 pb-24">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 px-4 py-3">
                <div className="max-w-md mx-auto flex items-center gap-3">
                    <Link href="/learn" className="text-gray-600 hover:text-gray-900">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <span className="font-semibold text-slate-800 truncate">{course.title}</span>
                </div>
            </header>

            <main className="container max-w-md mx-auto px-4 pt-4">
                {/* Thumbnail / Video */}
                <div className="relative rounded-2xl overflow-hidden mb-4 bg-gray-100">
                    {course.content_type === 'video' && embedUrl ? (
                        <div className="aspect-video">
                            <iframe
                                src={embedUrl}
                                title={course.title}
                                className="w-full h-full"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </div>
                    ) : (
                        <div className="aspect-video flex items-center justify-center relative bg-gray-50">
                            {course.thumbnail_url ? (
                                <Image
                                    src={course.thumbnail_url}
                                    alt={course.title}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 800px"
                                />
                            ) : (
                                <ContentIcon className={`w-16 h-16 ${contentConfig.color} opacity-50`} />
                            )}
                        </div>
                    )}
                </div>

                {/* Course Info */}
                <Card className="mb-4 border-none shadow-md">
                    <CardContent className="p-4">
                        {/* Badges */}
                        <div className="flex items-center gap-2 mb-3">
                            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${contentConfig.bg} ${contentConfig.color}`}>
                                {contentConfig.label}
                            </span>
                            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${levelStyle.bg} ${levelStyle.text}`}>
                                {levelStyle.label}
                            </span>
                            <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 font-medium uppercase">
                                {course.category}
                            </span>
                        </div>

                        {/* Title */}
                        <h1 className="text-xl font-bold text-gray-900 mb-3">{course.title}</h1>

                        {/* Meta */}
                        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                            <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                <span>{course.duration}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <BarChart3 className="w-4 h-4" />
                                <span>{levelStyle.label}</span>
                            </div>
                        </div>

                        {/* Description */}
                        <p className="text-sm text-gray-600 leading-relaxed">{course.description}</p>

                        {/* Action Button */}
                        {course.content_url && course.content_type !== 'video' && (
                            <a
                                href={course.content_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block mt-4"
                            >
                                <Button className="w-full gap-2">
                                    <ExternalLink className="w-4 h-4" />
                                    {course.content_type === 'document' ? '자료 다운로드' : '콘텐츠 보기'}
                                </Button>
                            </a>
                        )}
                    </CardContent>
                </Card>

                {/* Text Content (for text type) */}
                {course.content_type === 'text' && (
                    <Card className="mb-4 border-none shadow-md">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-base">📖 Content</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="prose prose-sm max-w-none">
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    {course.description}
                                </p>
                                <div className="mt-4 p-4 bg-blue-50 rounded-xl">
                                    <p className="text-blue-800 text-sm">
                                        💡 <strong>Tip:</strong> 이 콘텐츠는 여러 번 반복해서 읽으면 더 효과적입니다.
                                        모르는 단어는 메모해두세요!
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Comments Section */}
                <Card className="border-none shadow-md">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-base flex items-center gap-2">
                            <MessageCircle className="w-5 h-5 text-brand-accent" />
                            Comments ({comments.length})
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <CourseComments
                            courseId={id}
                            comments={comments}
                            currentUserId={user?.id}
                        />
                    </CardContent>
                </Card>
            </main>
        </div>
    )
}
