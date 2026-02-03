'use client'

import { createPost } from '@/actions/post'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function WritePostPage() {
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false)

    async function handleSubmit(formData: FormData) {
        setIsSubmitting(true)
        await createPost(formData)
        // Redirect is handled in server action
    }

    return (
        <div className="container mx-auto px-4 py-6 max-w-md">
            <h1 className="text-xl font-bold mb-6">Write New Post</h1>

            <form action={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <select
                        name="category"
                        id="category"
                        className="w-full p-2 border rounded bg-background"
                        required
                    >
                        <option value="">Select a category</option>
                        <option value="VISA">Visa Help</option>
                        <option value="JOBS">Jobs</option>
                        <option value="LIFE">Life in Korea</option>
                        <option value="Q&A">Q&A</option>
                    </select>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input name="title" id="title" placeholder="What's on your mind?" required />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="content">Content</Label>
                    <textarea
                        name="content"
                        id="content"
                        rows={6}
                        className="w-full p-3 border rounded bg-background resize-none focus:outline-ring/50"
                        placeholder="Share your story or ask a question..."
                        required
                    />
                </div>

                <div className="flex gap-3 pt-4">
                    <Button
                        type="button"
                        variant="outline"
                        className="flex-1"
                        onClick={() => router.back()}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        className="flex-1 bg-brand-primary text-white hover:bg-brand-primary/90"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Posting...' : 'Post'}
                    </Button>
                </div>
            </form>
        </div>
    )
}
