
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !serviceRoleKey) {
    console.error('Missing env vars')
    process.exit(1)
}

const supabase = createClient(supabaseUrl, serviceRoleKey)

async function main() {
    console.log('Checking storage buckets...')

    const { data: buckets, error } = await supabase.storage.listBuckets()

    if (error) {
        console.error('Error listing buckets:', error)
        return
    }

    const imagesBucket = buckets.find(b => b.name === 'images')

    if (imagesBucket) {
        console.log('✅ Bucket "images" exists.')
        console.log('Public:', imagesBucket.public)
    } else {
        console.log('⚠️ Bucket "images" does not exist. Creating...')
        const { data, error: createError } = await supabase.storage.createBucket('images', {
            public: true,
            fileSizeLimit: 5242880, // 5MB
            allowedMimeTypes: ['image/png', 'image/jpeg', 'image/gif', 'image/webp']
        })

        if (createError) {
            console.error('Failed to create bucket:', createError)
        } else {
            console.log('✅ Bucket "images" created successfully.')
        }
    }
}

main()
