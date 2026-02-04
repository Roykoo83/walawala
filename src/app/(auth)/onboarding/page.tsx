'use client'

import { completeOnboarding } from '@/actions/onboarding'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useActionState, useState } from 'react'

const VISA_TYPES = [
  { value: 'D-2', label: 'D-2 (Study / 유학)' },
  { value: 'D-4', label: 'D-4 (Training / 어학연수)' },
  { value: 'D-10', label: 'D-10 (Job Seeking / 구직)' },
  { value: 'E-7', label: 'E-7 (Professional / 전문직)' },
  { value: 'E-9', label: 'E-9 (Non-Professional / 비전문취업)' },
  { value: 'F-2', label: 'F-2 (Residence / 거주)' },
  { value: 'F-2-R', label: 'F-2-R (Regional / 지역특화)' },
  { value: 'F-5', label: 'F-5 (Permanent / 영주)' },
  { value: 'F-6', label: 'F-6 (Marriage / 결혼이민)' },
]

export default function OnboardingPage() {
  const [state, action, isPending] = useActionState(async (_prev: any, formData: FormData) => {
    return await completeOnboarding(formData)
  }, null)

  const [step, setStep] = useState(1)

  return (
    <div className="flex h-screen w-full items-center justify-center px-4 bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-pink-500">Step {step} of 2</span>
            <div className="flex gap-1">
              <div className={`h-2 w-8 rounded-full ${step >= 1 ? 'bg-pink-500' : 'bg-gray-200'}`} />
              <div className={`h-2 w-8 rounded-full ${step >= 2 ? 'bg-pink-500' : 'bg-gray-200'}`} />
            </div>
          </div>
          <CardTitle className="text-2xl">Complete Your Profile</CardTitle>
          <CardDescription>
            Tell us more about yourself to get personalized visa help.
          </CardDescription>
        </CardHeader>
        <form action={action}>
          <CardContent className="grid gap-6">
            {/* Step 1: Nationality */}
            <div className={step === 1 ? 'block' : 'hidden'}>
              <div className="grid gap-2">
                <Label htmlFor="nationality">Where are you from?</Label>
                <Select name="nationality" required={step === 1}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Vietnam">Vietnam 🇻🇳</SelectItem>
                    <SelectItem value="China">China 🇨🇳</SelectItem>
                    <SelectItem value="Uzbekistan">Uzbekistan 🇺🇿</SelectItem>
                    <SelectItem value="Russia">Russia 🇷🇺</SelectItem>
                    <SelectItem value="Spain">Spain 🇪🇸</SelectItem>
                    <SelectItem value="Indonesia">Indonesia 🇮🇩</SelectItem>
                    <SelectItem value="Mongolia">Mongolia 🇲🇳</SelectItem>
                    <SelectItem value="USA">USA 🇺🇸</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Step 2: Visa Info */}
            <div className={step === 2 ? 'block' : 'hidden'}>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="visaType">Visa Type</Label>
                  <Select name="visaType" required={step === 2}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Visa Type" />
                    </SelectTrigger>
                    <SelectContent>
                      {VISA_TYPES.map((visa) => (
                        <SelectItem key={visa.value} value={visa.value}>
                          {visa.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="visaExpiryDate">Visa Expiry Date</Label>
                  <Input
                    id="visaExpiryDate"
                    name="visaExpiryDate"
                    type="date"
                    required={step === 2}
                  />
                </div>
              </div>
            </div>

            {state?.error && (
              <p className="text-sm text-red-500">{state.error}</p>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            {step === 1 ? (
              <Button type="button" variant="ghost" disabled>Back</Button>
            ) : (
              <Button type="button" variant="outline" onClick={() => setStep(1)}>Back</Button>
            )}

            {step === 1 ? (
              <Button type="button" onClick={() => setStep(2)}>Next</Button>
            ) : (
              <Button type="submit" disabled={isPending}>
                {isPending ? 'Saving...' : 'Complete'}
              </Button>
            )}
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}