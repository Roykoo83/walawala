/**
 * WalaWala Production URL Helper
 * This helper ensures that the application always redirects to the correct
 * production or development URL, avoiding localhost issues on Vercel.
 */
export const getURL = (path: string = '') => {
    let url = ''

    // 1. Production Domain (사용자 설정 값)
    if (process.env.NEXT_PUBLIC_SITE_URL && process.env.NEXT_PUBLIC_SITE_URL.trim() !== '') {
        url = process.env.NEXT_PUBLIC_SITE_URL
    }
    // 2. Vercel System Env (Server-side)
    else if (process.env.VERCEL_URL && process.env.VERCEL_URL.trim() !== '') {
        url = process.env.VERCEL_URL
    }
    // 3. Vercel Public Env (Client-side)
    else if (process.env.NEXT_PUBLIC_VERCEL_URL && process.env.NEXT_PUBLIC_VERCEL_URL.trim() !== '') {
        url = process.env.NEXT_PUBLIC_VERCEL_URL
    }
    // 4. 로컬호스트 Fallback (개발 환경이거나 위 값이 모두 없을 때)
    else {
        url = 'http://localhost:3000'
    }

    // URL 정리 (프로토콜 포함 및 끝 슬래시 제거)
    url = url.includes('http') ? url : `https://${url}`
    url = url.charAt(url.length - 1) === '/' ? url : `${url}/`

    // 경로 조합
    if (path) {
        path = path.charAt(0) === '/' ? path.substring(1) : path
        return `${url}${path}`
    }

    return url
}
