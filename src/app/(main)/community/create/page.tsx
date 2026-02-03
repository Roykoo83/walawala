'use client'

import { createPost } from '@/actions/community'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { useActionState } from 'react'

export default function CreatePostPage() {
  const [state, action, isPending] = useActionState(async (_prev: any, formData: FormData) => {
    return await createPost(formData)
  }, null)

  return (
    <div className="container mx-auto py-8 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>Create New Post</CardTitle>
          <CardDescription>Share your thoughts with the community.</CardDescription>
        </CardHeader>
        <form action={action}>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" name="title" placeholder="Give your post a title" required />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="category">Category</Label>
              <select 
                id="category" 
                name="category" 
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                required
              >
                <option value="General">General</option>
                <option value="Questions">Questions</option>
                <option value="Visa">Visa Help</option>
                <option value="Jobs">Jobs</option>
              </select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="content">Content</Label>
              <textarea 
                id="content" 
                name="content" 
                rows={5}
                className="flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Write your post here..."
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="images">Images (Optional)</Label>
              <Input 
                id="images" 
                name="images" 
                type="file" 
                accept="image/*" 
                multiple 
                className="cursor-pointer"
              />
              <p className="text-xs text-muted-foreground">
                You can upload multiple images. (Max 5MB per file)
              </p>
            </div>

            {state?.error && (
              <p className="text-sm text-red-500">{state.error}</p>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Link href="/community">
              <Button variant="outline">Cancel</Button>
            </Link>
            <Button disabled={isPending}>
              {isPending ? 'Posting...' : 'Create Post'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
