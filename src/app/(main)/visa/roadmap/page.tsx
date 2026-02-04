'use client'

import { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, MapPin, Clock, AlertCircle, CheckCircle2, ChevronRight } from 'lucide-react'
import {
    VISA_TYPES,
    VISA_PATHS,
    findAllPaths,
    calculatePathDifficulty,
    type VisaPath
} from '@/lib/visa-paths'

const DIFFICULTY_STYLES = {
    easy: { bg: 'bg-green-100', text: 'text-green-700', label: 'Easy' },
    medium: { bg: 'bg-yellow-100', text: 'text-yellow-700', label: 'Medium' },
    hard: { bg: 'bg-red-100', text: 'text-red-700', label: 'Hard' },
}

export default function VisaRoadmapPage() {
    const [currentVisa, setCurrentVisa] = useState<string>('')
    const [targetVisa, setTargetVisa] = useState<string>('F-2-7')
    const [selectedPath, setSelectedPath] = useState<string[] | null>(null)

    // 선택 가능한 비자 목록 (시작점)
    const startVisas = ['D-2', 'D-10', 'E-7', 'E-9', 'H-2', 'F-6']
    // 목표 비자 목록
    const targetVisas = ['E-7', 'F-2-7', 'F-2-R', 'F-5']

    // 경로 찾기
    const availablePaths = useMemo(() => {
        if (!currentVisa || !targetVisa) return []
        return findAllPaths(currentVisa, targetVisa)
    }, [currentVisa, targetVisa])

    // 경로 상세 정보 가져오기
    const getPathDetails = (path: string[]): VisaPath[] => {
        const details: VisaPath[] = []
        for (let i = 0; i < path.length - 1; i++) {
            const segment = VISA_PATHS.find(p => p.from === path[i] && p.to === path[i + 1])
            if (segment) details.push(segment)
        }
        return details
    }

    return (
        <div className="container mx-auto px-4 py-6 max-w-md pb-24">
            {/* Header */}
            <Link href="/visa" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4">
                <ArrowLeft className="w-4 h-4 mr-1" />
                Back to Visa
            </Link>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">🗺️ Visa Roadmap</h1>
            <p className="text-sm text-gray-500 mb-6">
                Find your path to residence in Korea
            </p>

            {/* Step 1: Select Current Visa */}
            <Card className="mb-6">
                <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-brand-primary text-white text-xs flex items-center justify-center">1</span>
                        Current Visa
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-3 gap-2">
                        {startVisas.map((visa) => (
                            <button
                                key={visa}
                                onClick={() => {
                                    setCurrentVisa(visa)
                                    setSelectedPath(null)
                                }}
                                className={`p-3 rounded-xl border-2 text-center transition-all ${currentVisa === visa
                                    ? 'border-brand-primary bg-brand-primary/5'
                                    : 'border-gray-200 hover:border-gray-300'
                                    }`}
                            >
                                <span className="font-bold text-sm">{visa}</span>
                                <p className="text-[10px] text-gray-500 mt-1">
                                    {VISA_TYPES[visa]?.nameKo || ''}
                                </p>
                            </button>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Step 2: Select Target Visa */}
            <Card className="mb-6">
                <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-brand-primary text-white text-xs flex items-center justify-center">2</span>
                        Target Visa
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 gap-2">
                        {targetVisas.map((visa) => (
                            <button
                                key={visa}
                                onClick={() => {
                                    setTargetVisa(visa)
                                    setSelectedPath(null)
                                }}
                                className={`p-3 rounded-xl border-2 text-center transition-all ${targetVisa === visa
                                    ? 'border-green-500 bg-green-50'
                                    : 'border-gray-200 hover:border-gray-300'
                                    }`}
                            >
                                <span className="font-bold text-sm">{visa}</span>
                                <p className="text-[10px] text-gray-500 mt-1">
                                    {VISA_TYPES[visa]?.nameKo || ''}
                                </p>
                            </button>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Available Paths */}
            {currentVisa && targetVisa && (
                <Card className="mb-6">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-base flex items-center gap-2">
                            <MapPin className="w-5 h-5 text-brand-accent" />
                            Available Paths ({availablePaths.length})
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {availablePaths.length === 0 ? (
                            <div className="text-center py-6 text-gray-500">
                                <AlertCircle className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                                <p className="text-sm">No direct path available</p>
                                <p className="text-xs text-gray-400 mt-1">
                                    Try selecting a different target visa
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {availablePaths.slice(0, 3).map((path, idx) => {
                                    const difficulty = calculatePathDifficulty(path)
                                    const diffStyle = DIFFICULTY_STYLES[difficulty]
                                    const isSelected = selectedPath?.join('-') === path.join('-')

                                    return (
                                        <button
                                            key={idx}
                                            onClick={() => setSelectedPath(path)}
                                            className={`w-full p-4 rounded-xl border-2 text-left transition-all ${isSelected
                                                ? 'border-brand-primary bg-brand-primary/5'
                                                : 'border-gray-100 hover:border-gray-200'
                                                }`}
                                        >
                                            <div className="flex items-center justify-between mb-2">
                                                <span className={`text-xs px-2 py-0.5 rounded-full ${diffStyle.bg} ${diffStyle.text} font-medium`}>
                                                    {diffStyle.label}
                                                </span>
                                                <span className="text-xs text-gray-400">
                                                    {path.length - 1} step{path.length > 2 ? 's' : ''}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-1 flex-wrap">
                                                {path.map((visa, i) => (
                                                    <div key={i} className="flex items-center">
                                                        <span className={`font-bold text-sm ${i === 0 ? 'text-blue-600' :
                                                            i === path.length - 1 ? 'text-green-600' :
                                                                'text-gray-700'
                                                            }`}>
                                                            {visa}
                                                        </span>
                                                        {i < path.length - 1 && (
                                                            <ChevronRight className="w-4 h-4 text-gray-300 mx-1" />
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </button>
                                    )
                                })}
                            </div>
                        )}
                    </CardContent>
                </Card>
            )}

            {/* Path Details */}
            {selectedPath && (
                <Card className="mb-6 border-brand-primary/30">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-base flex items-center gap-2">
                            <CheckCircle2 className="w-5 h-5 text-green-500" />
                            Path Details
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {getPathDetails(selectedPath).map((step, idx) => (
                                <div key={idx} className="relative pl-6 pb-4 border-l-2 border-gray-200 last:border-l-0 last:pb-0">
                                    <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-brand-primary flex items-center justify-center">
                                        <span className="text-[10px] text-white font-bold">{idx + 1}</span>
                                    </div>

                                    <div className="bg-gray-50 rounded-xl p-4">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="font-bold text-brand-primary">{step.from}</span>
                                            <ArrowRight className="w-4 h-4 text-gray-400" />
                                            <span className="font-bold text-green-600">{step.to}</span>
                                            <span className={`text-xs px-2 py-0.5 rounded-full ${DIFFICULTY_STYLES[step.difficulty].bg} ${DIFFICULTY_STYLES[step.difficulty].text}`}>
                                                {DIFFICULTY_STYLES[step.difficulty].label}
                                            </span>
                                        </div>

                                        <p className="text-sm text-gray-600 mb-3">{step.description}</p>

                                        <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                                            <Clock className="w-3 h-3" />
                                            <span>{step.estimatedTime}</span>
                                        </div>

                                        <div>
                                            <p className="text-xs font-semibold text-gray-700 mb-1">Requirements:</p>
                                            <ul className="space-y-1">
                                                {step.requirements.map((req, i) => (
                                                    <li key={i} className="text-xs text-gray-600 flex items-start gap-1">
                                                        <span className="text-brand-accent">•</span>
                                                        {req}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Quick Actions */}
            {currentVisa && (
                <div className="space-y-3">
                    <Link href="/visa/f2-calculator">
                        <Button variant="outline" className="w-full justify-between">
                            <span>🧮 Calculate F-2 Score</span>
                            <ChevronRight className="w-4 h-4" />
                        </Button>
                    </Link>
                </div>
            )}

            {/* Disclaimer */}
            <p className="text-xs text-center text-gray-400 mt-6">
                This simulator is for reference only.
                <br />Requirements may change. Consult immigration office.
            </p>
        </div>
    )
}
