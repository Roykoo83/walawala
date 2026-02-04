export const getURL = (path: string = '') => {
    // 1. Vercel 배포 환경 (자동 설정됨)
    let url =
        process.env.NEXT_PUBLIC_VERCEL_URL &&
            process.env.NEXT_PUBLIC_VERCEL_URL.trim() !== ''
            ? process.env.NEXT_PUBLIC_VERCEL_URL
            : // 2. 로컬 개발 환경 또는 Site URL 수동 설정
            process.env.NEXT_PUBLIC_SITE_URL &&
                process.env.NEXT_PUBLIC_SITE_URL.trim() !== ''
                ? process.env.NEXT_PUBLIC_SITE_URL
                : // 3. 기본값 (로컬호스트)
                'http://localhost:3000'

    // URL 정리 (프로토콜 포함 및 끝 슬래시 제거)
    url = url.includes('http') ? url : `https://${url}`
    url = url.charAt(url.length - 1) === '/' ? url : `${url}/`

    // 경로 조합
    // path가 있으면 합치고, 없으면 기본 URL 반환
    // path 앞의 slash 처리
    if (path) {
        path = path.charAt(0) === '/' ? path.substring(1) : path
        return `${url}${path}`
    }

    return url
}
