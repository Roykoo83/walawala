export const getURL = (path: string = '') => {
    // 1. Production Domain (사용자가 수동 설정한 경우 최우선)
    let url =
        process.env.NEXT_PUBLIC_SITE_URL &&
            process.env.NEXT_PUBLIC_SITE_URL.trim() !== ''
            ? process.env.NEXT_PUBLIC_SITE_URL
            : // 2. Vercel System Env (Server-side에서 가장 확실한 값)
            process.env.VERCEL_URL && process.env.VERCEL_URL.trim() !== ''
                ? process.env.VERCEL_URL
                : // 3. Vercel Public Env (Client-side에서 넘어올 경우)
                process.env.NEXT_PUBLIC_VERCEL_URL &&
                    process.env.NEXT_PUBLIC_VERCEL_URL.trim() !== ''
                    ? process.env.NEXT_PUBLIC_VERCEL_URL
                    : // 4. 로컬 개발 환경 Fallback
                    'http://localhost:3000'

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
