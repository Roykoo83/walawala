import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { differenceInDays, format } from 'date-fns'
import { Calculator, FileCheck, Clock, ChevronRight, AlertTriangle, CheckCircle2 } from 'lucide-react'

// Visa type specific required documents
const VISA_DOCUMENTS: Record<string, string[]> = {
    'D-2': ['Passport', 'Alien Registration Card', 'Enrollment Certificate', 'Bank Statement', 'Application Form'],
    'D-4': ['Passport', 'Alien Registration Card', 'Language School Certificate', 'Bank Statement', 'Application Form'],
    'D-10': ['Passport', 'Alien Registration Card', 'Degree Certificate', 'Job Seeking Plan', 'Application Form'],
    'E-7': ['Passport', 'Alien Registration Card', 'Employment Contract', 'Company Documents', 'Degree Certificate'],
    'F-2': ['Passport', 'Alien Registration Card', 'Income Proof', 'TOPIK Certificate', 'Criminal Record Check'],
    'F-4': ['Passport', 'Alien Registration Card', 'Korean Heritage Documents', 'Application Form'],
}

export default async function VisaPage() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

    const visaType = profile?.visa_type || 'Not Set'
    const expiryDate = profile?.visa_expiry_date
    const nickname = profile?.nickname || user.email?.split('@')[0] || 'User'

    // D-Day calculation
    let daysLeft = 0
    let progress = 0
    let urgencyLevel: 'safe' | 'warning' | 'danger' = 'safe'

    if (expiryDate) {
        const today = new Date()
        const expiry = new Date(expiryDate)
        daysLeft = differenceInDays(expiry, today)
        progress = Math.max(0, Math.min(100, ((365 - daysLeft) / 365) * 100))

        if (daysLeft <= 30) urgencyLevel = 'danger'
        else if (daysLeft <= 60) urgencyLevel = 'warning'
    }

    // Required documents for current visa type
    const requiredDocs = VISA_DOCUMENTS[visaType] || VISA_DOCUMENTS['D-2']

    // Timeline items
    const timeline = [
        { label: 'Prepare Documents', dDay: 45, status: daysLeft <= 45 ? 'active' : 'pending' },
        { label: 'Apply for Extension', dDay: 30, status: daysLeft <= 30 ? 'active' : 'pending' },
        { label: 'Visa Expires', dDay: 0, status: daysLeft <= 0 ? 'active' : 'pending' },
    ]

    return (
        <div className="container mx-auto px-4 py-6 max-w-md pb-24">
            {/* Header */}
            <h1 className="text-2xl font-bold text-gray-900 mb-6">My Visa</h1>

            {/* Visa Card */}
            <Card className="mb-6 overflow-hidden border-none shadow-lg">
                <div className={`h-2 w-full ${urgencyLevel === 'danger' ? 'bg-red-500' :
                        urgencyLevel === 'warning' ? 'bg-yellow-500' : 'bg-brand-accent'
                    }`} />
                <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold mb-1">
                                Current Visa
                            </p>
                            <h2 className="text-3xl font-bold text-gray-900">{visaType}</h2>
                        </div>
                        <div className="text-right">
                            <p className="text-sm text-gray-500">Hello,</p>
                            <p className="text-lg font-bold text-brand-primary">{nickname}</p>
                        </div>
                    </div>

                    {expiryDate ? (
                        <div className="bg-gray-50 rounded-xl p-4 border">
                            <div className="flex justify-between items-center mb-3">
                                <span className="text-sm text-gray-600">Expires</span>
                                <span className="text-sm font-medium">{format(new Date(expiryDate), 'MMM d, yyyy')}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex-1 mr-4">
                                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full rounded-full transition-all ${urgencyLevel === 'danger' ? 'bg-red-500' :
                                                    urgencyLevel === 'warning' ? 'bg-yellow-500' : 'bg-brand-accent'
                                                }`}
                                            style={{ width: `${progress}%` }}
                                        />
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className={`text-2xl font-extrabold ${urgencyLevel === 'danger' ? 'text-red-600' :
                                            urgencyLevel === 'warning' ? 'text-yellow-600' : 'text-brand-primary'
                                        }`}>
                                        D-{daysLeft}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-gray-50 rounded-xl p-4 text-center text-gray-500 border">
                            <p>Set your visa expiry date in profile</p>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Renewal Timeline */}
            <Card className="mb-6">
                <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                        <Clock className="w-5 h-5 text-brand-accent" />
                        Renewal Timeline
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        {timeline.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-3">
                                <div className={`w-3 h-3 rounded-full ${item.status === 'active' ?
                                        (item.dDay === 0 ? 'bg-red-500' : 'bg-yellow-500') :
                                        'bg-gray-300'
                                    }`} />
                                <div className="flex-1">
                                    <span className={`text-sm ${item.status === 'active' ? 'font-semibold' : 'text-gray-500'}`}>
                                        D-{item.dDay}
                                    </span>
                                    <span className="text-sm text-gray-600 ml-2">{item.label}</span>
                                </div>
                                {item.status === 'active' && daysLeft <= item.dDay && (
                                    <AlertTriangle className="w-4 h-4 text-yellow-500" />
                                )}
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Required Documents */}
            <Card className="mb-6">
                <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                        <FileCheck className="w-5 h-5 text-brand-accent" />
                        Required Documents
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-2">
                        {requiredDocs.map((doc, idx) => (
                            <div key={idx} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50">
                                <CheckCircle2 className="w-4 h-4 text-gray-300" />
                                <span className="text-sm text-gray-700">{doc}</span>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* F-2 Calculator Link */}
            <Link href="/visa/f2-calculator">
                <Card className="cursor-pointer hover:shadow-md transition-shadow border-2 border-brand-accent/20">
                    <CardContent className="p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-brand-accent/10 flex items-center justify-center">
                                <Calculator className="w-5 h-5 text-brand-accent" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900">F-2 Score Calculator</h3>
                                <p className="text-sm text-gray-500">Check your eligibility for F-2 visa</p>
                            </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                    </CardContent>
                </Card>
            </Link>
        </div>
    )
}
