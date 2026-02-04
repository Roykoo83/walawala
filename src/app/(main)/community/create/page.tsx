'use client'

import { createPost } from '@/actions/community'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import Link from 'next/link'
import { useActionState, useState } from 'react'
import { ImagePlus, X, ChevronLeft } from 'lucide-react'

const CATEGORIES = [
  'General', 'Visa', 'Jobs', 'Housing', 'Meetup', 'Market', 'Tips', 'News'
]

export default function CreatePostPage() {
  const [state, action, isPending] = useActionState(async (_prev: any, formData: FormData) => {
    return await createPost(formData)
  }, null)

  const [preview, setPreview] = useState<string | null>(null)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="container mx-auto px-4 py-6 max-w-2xl">
        <Link href="/community" className="flex items-center text-gray-400 mb-6 hover:text-brand-primary transition-colors">
          <ChevronLeft className="w-5 h-5" />
          <span className="text-sm font-medium">광장으로 돌아가기</span>
        </Link>

        <Card className="border-none shadow-xl shadow-gray-200/50 overflow-hidden">
          <CardHeader className="bg-white pb-8">
            <CardTitle className="text-2xl font-black text-brand-primary">새로운 소식 들려주기</CardTitle>
            <CardDescription className="text-gray-500 font-medium">
              여러분의 이야기가 누군가에게는 큰 힘이 됩니다.
            </CardDescription>
          </CardHeader>
          <form action={action}>
            <CardContent className="grid gap-6 bg-white">
              <div className="grid gap-2">
                <Label htmlFor="category" className="text-sm font-bold text-gray-700">카테고리</Label>
                <select 
                  id="category" 
                  name="category" 
                  className="flex h-12 w-full rounded-xl border border-gray-100 bg-gray-50/50 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all font-medium"
                  required
                >
                  {CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="title" className="text-sm font-bold text-gray-700">제목</Label>
                <Input 
                  id="title" 
                  name="title" 
                  placeholder="무엇에 대해 이야기하고 싶나요?" 
                  className="h-12 rounded-xl border-gray-100 bg-gray-50/50 focus:ring-brand-primary/20 transition-all"
                  required 
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="content" className="text-sm font-bold text-gray-700">내용</Label>
                <Textarea 
                  id="content" 
                  name="content" 
                  rows={8}
                  className="rounded-xl border-gray-100 bg-gray-50/50 focus:ring-brand-primary/20 transition-all resize-none p-4"
                  placeholder="따뜻하고 도움이 되는 정보를 공유해 주세요."
                  required
                />
              </div>

              {/* 이미지 업로드 UI */}
              <div className="grid gap-2">
                <Label className="text-sm font-bold text-gray-700">사진 추가</Label>
                <div className="flex gap-4 items-end">
                  {!preview ? (
                    <label className="flex flex-col items-center justify-center w-32 h-32 rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-all">
                      <ImagePlus className="w-8 h-8 text-gray-400" />
                      <span className="text-[10px] text-gray-400 mt-2 font-bold uppercase tracking-wider">Add Photo</span>
                      <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                    </label>
                  ) : (
                    <div className="relative w-32 h-32 rounded-xl overflow-hidden group">
                      <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                      <button 
                        type="button"
                        onClick={() => setPreview(null)}
                        className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                  <p className="text-xs text-gray-400 font-medium pb-1">
                    최대 1장, 5MB 이하의<br />이미지를 올려주세요.
                  </p>
                </div>
              </div>

              {state?.error && (
                <p className="text-sm text-red-500 font-medium bg-red-50 p-3 rounded-lg border border-red-100">
                  {state.error}
                </p>
              )}
            </CardContent>
            <CardFooter className="bg-gray-50/50 border-t border-gray-100 px-6 py-6 flex gap-3">
              <Link href="/community" className="flex-1">
                <Button type="button" variant="outline" className="w-full h-12 rounded-xl font-bold text-gray-500 hover:bg-white transition-all">
                  취소
                </Button>
              </Link>
              <Button disabled={isPending} className="flex-2 h-12 rounded-xl font-bold bg-brand-primary hover:bg-brand-primary-dark shadow-lg shadow-brand-primary/20 transition-all">
                {isPending ? '소중한 글을 올리는 중...' : '소식 들려주기'}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  )
}
