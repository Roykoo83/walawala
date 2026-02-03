'use client'

import { completeOnboarding } from '@/actions/onboarding'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useState } from 'react'

export default function OnboardingPage() {
    const [isSubmitting, setIsSubmitting] = useState(false)

    async function handleSubmit(formData: FormData) {
        setIsSubmitting(true)
        await completeOnboarding(formData)
        // Server action handles redirect, but we keep state true to prevent double submit
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
                <div className="mb-8 text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome to WalaWala! 🎉</h1>
                    <p className="text-gray-600">Let's set up your profile to get started.</p>
                </div>

                <form action={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="nickname">Nickname</Label>
                        <Input
                            id="nickname"
                            name="nickname"
                            placeholder="How should we call you?"
                            required
                            className="bg-gray-50"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="nationality">Nationality</Label>
                        <Input
                            id="nationality"
                            name="nationality"
                            placeholder="e.g. Vietnam, USA, France"
                            className="bg-gray-50"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="visaType">Visa Type</Label>
                            <select
                                id="visaType"
                                name="visaType"
                                className="w-full h-10 px-3 rounded-md border border-input bg-gray-50 text-sm focus:outline-ring/50"
                                required
                            >
                                <option value="">Select...</option>
                                <option value="D-2">D-2 (Student)</option>
                                <option value="D-4">D-4 (Language)</option>
                                <option value="D-10">D-10 (Job Seeker)</option>
                                <option value="E-7">E-7 (Professional)</option>
                                <option value="F-2-7">F-2-7 (Points)</option>
                                <option value="F-4">F-4 (Overseas)</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="expiryDate">Visa Expiry</Label>
                            <Input
                                id="expiryDate"
                                name="expiryDate"
                                type="date"
                                required
                                className="bg-gray-50"
                            />
                        </div>
                    </div>

                    <Button
                        type="submit"
                        className="w-full bg-brand-primary hover:bg-brand-primary/90 text-white h-12 text-lg mt-4"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Setting up...' : 'Start Exploring'}
                    </Button>
                </form>
            </div>
        </div>
    )
}
