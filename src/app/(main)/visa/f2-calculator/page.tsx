'use client'

import { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { ArrowLeft, Lightbulb, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react'

// F-2-7 점수제 기준 (2024년 기준, 총 80점 이상 필요)
const SCORE_CRITERIA = {
    age: {
        label: 'Age (나이)',
        max: 25,
        options: [
            { label: '18-24', value: 25 },
            { label: '25-29', value: 23 },
            { label: '30-34', value: 20 },
            { label: '35-39', value: 15 },
            { label: '40-44', value: 10 },
            { label: '45+', value: 5 },
        ]
    },
    education: {
        label: 'Education (학력)',
        max: 35,
        options: [
            { label: 'PhD (Korean)', value: 35 },
            { label: 'PhD (Foreign)', value: 30 },
            { label: "Master's (Korean)", value: 30 },
            { label: "Master's (Foreign)", value: 25 },
            { label: "Bachelor's (Korean)", value: 26 },
            { label: "Bachelor's (Foreign)", value: 21 },
            { label: 'Associate (Korean)', value: 20 },
            { label: 'High School', value: 10 },
        ]
    },
    korean: {
        label: 'Korean Language (한국어)',
        max: 20,
        options: [
            { label: 'TOPIK 6', value: 20 },
            { label: 'TOPIK 5', value: 16 },
            { label: 'TOPIK 4', value: 12 },
            { label: 'TOPIK 3', value: 8 },
            { label: 'TOPIK 2', value: 4 },
            { label: 'TOPIK 1 or None', value: 0 },
        ]
    },
    income: {
        label: 'Annual Income (연소득)',
        max: 15,
        options: [
            { label: '₩50M+ / GNI 150%+', value: 15 },
            { label: '₩40M+ / GNI 120%+', value: 12 },
            { label: '₩30M+ / GNI 100%+', value: 8 },
            { label: '₩20M+ / GNI 80%+', value: 4 },
            { label: 'Below ₩20M', value: 0 },
        ]
    },
    bonus: {
        label: 'Bonus Points (가산점)',
        max: 30,
        options: [
            { label: 'KIIP Level 5 Complete', value: 10 },
            { label: 'Korean Investment ₩100M+', value: 5 },
            { label: 'Professional License (Korean)', value: 5 },
            { label: 'Volunteer Activity 1yr+', value: 2 },
            { label: 'None', value: 0 },
        ]
    }
}

const RECOMMENDATIONS = [
    { condition: (scores: any) => scores.korean < 16, text: 'Pass TOPIK 5 or higher (+4~8 pts)', icon: '📚' },
    { condition: (scores: any) => scores.bonus < 10, text: 'Complete KIIP Level 5 (+10 pts)', icon: '🎓' },
    { condition: (scores: any) => scores.income < 12, text: 'Increase annual income (+4~7 pts)', icon: '💰' },
    { condition: (scores: any) => scores.education < 26, text: 'Consider Korean university degree (+5~9 pts)', icon: '🎓' },
]

export default function F2CalculatorPage() {
    const [scores, setScores] = useState({
        age: 0,
        education: 0,
        korean: 0,
        income: 0,
        bonus: 0,
    })

    const totalScore = useMemo(() => {
        return Object.values(scores).reduce((a, b) => a + b, 0)
    }, [scores])

    const isEligible = totalScore >= 80
    const pointsNeeded = Math.max(0, 80 - totalScore)

    const applicableRecommendations = RECOMMENDATIONS.filter(rec => rec.condition(scores))

    return (
        <div className="container mx-auto px-4 py-6 max-w-md pb-24">
            {/* Header */}
            <Link href="/visa" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4">
                <ArrowLeft className="w-4 h-4 mr-1" />
                Back to Visa
            </Link>
            <h1 className="text-2xl font-bold text-gray-900 mb-6">F-2 Score Calculator</h1>

            {/* Score Display */}
            <Card className={`mb-6 border-2 ${isEligible ? 'border-green-500' : 'border-gray-200'}`}>
                <CardContent className="p-6 text-center">
                    <p className="text-sm text-gray-500 mb-2">Your Current Score</p>
                    <div className="flex items-baseline justify-center gap-1">
                        <span className={`text-5xl font-extrabold ${isEligible ? 'text-green-600' : 'text-brand-primary'}`}>
                            {totalScore}
                        </span>
                        <span className="text-2xl text-gray-400">/ 80</span>
                    </div>
                    <div className="mt-4">
                        {isEligible ? (
                            <div className="flex items-center justify-center gap-2 text-green-600">
                                <CheckCircle className="w-5 h-5" />
                                <span className="font-semibold">Eligible for F-2-7!</span>
                            </div>
                        ) : (
                            <div className="flex items-center justify-center gap-2 text-red-500">
                                <AlertCircle className="w-5 h-5" />
                                <span className="font-semibold">{pointsNeeded} points needed</span>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* Score Breakdown */}
            <Card className="mb-6">
                <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-brand-accent" />
                        Score Breakdown
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    {Object.entries(SCORE_CRITERIA).map(([key, category]) => (
                        <div key={key}>
                            <Label className="text-sm font-semibold text-gray-700 mb-2 block">
                                {category.label} (max {category.max} pts)
                            </Label>
                            <select
                                className="w-full p-3 border rounded-lg text-sm bg-white focus:ring-2 focus:ring-brand-accent/50 focus:border-brand-accent"
                                value={scores[key as keyof typeof scores]}
                                onChange={(e) => setScores({ ...scores, [key]: Number(e.target.value) })}
                            >
                                <option value={0}>Select...</option>
                                {category.options.map((opt, idx) => (
                                    <option key={idx} value={opt.value}>
                                        {opt.label} ({opt.value} pts)
                                    </option>
                                ))}
                            </select>
                        </div>
                    ))}
                </CardContent>
            </Card>

            {/* Recommendations */}
            {!isEligible && applicableRecommendations.length > 0 && (
                <Card className="mb-6 bg-yellow-50 border-yellow-200">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-lg flex items-center gap-2 text-yellow-800">
                            <Lightbulb className="w-5 h-5" />
                            Recommendations
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-2">
                            {applicableRecommendations.map((rec, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-sm text-yellow-900">
                                    <span>{rec.icon}</span>
                                    <span>{rec.text}</span>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            )}

            {/* Disclaimer */}
            <p className="text-xs text-center text-gray-400 mt-6">
                This calculator is for reference only. Official requirements may vary.
                <br />Please consult with immigration office for accurate information.
            </p>
        </div>
    )
}
