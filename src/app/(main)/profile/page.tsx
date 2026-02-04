import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { User, Settings, LogOut, ChevronRight } from 'lucide-react'
import { logout } from '@/actions/auth'

export default async function ProfilePage() {
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

    return (
        <div className="container mx-auto px-4 py-6 max-w-md pb-24">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Profile</h1>

            {/* User Info Card */}
            <Card className="mb-6">
                <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-brand-accent/20 flex items-center justify-center">
                            <User className="w-8 h-8 text-brand-accent" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-900">
                                {profile?.nickname || 'User'}
                            </h2>
                            <p className="text-sm text-gray-500">{user.email}</p>
                            {profile?.nationality && (
                                <span className="text-xs bg-gray-100 px-2 py-1 rounded mt-1 inline-block">
                                    {profile.nationality}
                                </span>
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Visa Info */}
            <Card className="mb-6">
                <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Visa Information</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        <div className="flex justify-between">
                            <span className="text-gray-500">Visa Type</span>
                            <span className="font-medium">{profile?.visa_type || 'Not set'}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">Expiry Date</span>
                            <span className="font-medium">{profile?.visa_expiry_date || 'Not set'}</span>
                        </div>
                    </div>
                    <Link href="/onboarding">
                        <Button variant="outline" className="w-full mt-4">
                            Edit Visa Info
                        </Button>
                    </Link>
                </CardContent>
            </Card>

            {/* Settings */}
            <Card className="mb-6">
                <CardContent className="p-0">
                    <Link href="/settings" className="flex items-center justify-between p-4 hover:bg-gray-50">
                        <div className="flex items-center gap-3">
                            <Settings className="w-5 h-5 text-gray-500" />
                            <span>Settings</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                    </Link>
                </CardContent>
            </Card>

            {/* Logout */}
            <form action={logout}>
                <Button variant="outline" className="w-full text-red-500 border-red-200 hover:bg-red-50">
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                </Button>
            </form>
        </div>
    )
}
