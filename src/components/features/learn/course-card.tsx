'use client'

import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { PlayCircle, FileText, Download } from 'lucide-react'
import type { Course } from '@/actions/learn'

const CONTENT_TYPE_ICONS = {
    video: { icon: PlayCircle, label: '영상', color: 'text-red-500' },
    text: { icon: FileText, label: '텍스트', color: 'text-blue-500' },
    document: { icon: Download, label: '자료', color: 'text-green-500' },
}

const LEVEL_STYLES = {
    beginner: { bg: 'bg-green-100', text: 'text-green-700', label: 'Beginner' },
    intermediate: { bg: 'bg-yellow-100', text: 'text-yellow-700', label: 'Intermediate' },
    advanced: { bg: 'bg-red-100', text: 'text-red-700', label: 'Advanced' },
}

interface CourseCardProps {
    course: Course
}

export function CourseCard({ course }: CourseCardProps) {
    const contentType = CONTENT_TYPE_ICONS[course.content_type]
    const levelStyle = LEVEL_STYLES[course.level]
    const ContentIcon = contentType.icon

    return (
        <Link href={`/learn/${course.id}`}>
            <Card className="overflow-hidden border-none shadow-md hover:shadow-lg transition-all duration-300 group h-full">
                {/* Thumbnail */}
                <div className="relative h-32 overflow-hidden">
                    {course.thumbnail_url ? (
                        <img
                            src={course.thumbnail_url}
                            alt={course.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                            <ContentIcon className={`w-12 h-12 ${contentType.color} opacity-50`} />
                        </div>
                    )}

                    {/* Content Type Badge */}
                    <div className="absolute top-2 left-2 flex items-center gap-1 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full">
                        <ContentIcon className={`w-3 h-3 ${contentType.color}`} />
                        <span className="text-[10px] font-medium text-gray-700">{contentType.label}</span>
                    </div>

                    {/* Duration Badge */}
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-0.5 rounded text-[10px] font-medium">
                        {course.duration}
                    </div>
                </div>

                <CardContent className="p-4">
                    {/* Level Badge */}
                    <div className="flex items-center justify-between mb-2">
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${levelStyle.bg} ${levelStyle.text}`}>
                            {levelStyle.label}
                        </span>
                        <span className="text-[10px] text-gray-400 uppercase font-semibold">
                            {course.category}
                        </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-bold text-sm text-gray-800 line-clamp-2 group-hover:text-brand-primary transition-colors mb-2">
                        {course.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs text-gray-500 line-clamp-2">
                        {course.description}
                    </p>
                </CardContent>
            </Card>
        </Link>
    )
}
