// 비자 전환 경로 데이터 정의

export interface VisaPath {
    from: string
    to: string
    requirements: string[]
    difficulty: 'easy' | 'medium' | 'hard'
    estimatedTime: string
    description: string
}

export interface VisaInfo {
    code: string
    name: string
    nameKo: string
    description: string
    maxDuration: string
    canWorkPart?: boolean
    canWorkFull?: boolean
}

// 비자 종류 정의
export const VISA_TYPES: Record<string, VisaInfo> = {
    'D-2': {
        code: 'D-2',
        name: 'Student Visa',
        nameKo: '유학 비자',
        description: 'For international students studying at Korean universities',
        maxDuration: '2 years',
        canWorkPart: true,
    },
    'D-10': {
        code: 'D-10',
        name: 'Job Seeker Visa',
        nameKo: '구직 비자',
        description: 'For graduates seeking employment in Korea',
        maxDuration: '2 years',
        canWorkPart: true,
    },
    'E-7': {
        code: 'E-7',
        name: 'Professional Visa',
        nameKo: '특정활동 비자',
        description: 'For professionals with specialized skills',
        maxDuration: '3 years (renewable)',
        canWorkFull: true,
    },
    'E-7-4': {
        code: 'E-7-4',
        name: 'Skilled Worker Visa',
        nameKo: '숙련기능인력 비자',
        description: 'For skilled manufacturing workers',
        maxDuration: '3 years (renewable)',
        canWorkFull: true,
    },
    'E-9': {
        code: 'E-9',
        name: 'Non-Professional Visa',
        nameKo: '비전문취업 비자',
        description: 'For workers in manufacturing, construction, agriculture',
        maxDuration: '4 years 10 months',
        canWorkFull: true,
    },
    'H-2': {
        code: 'H-2',
        name: 'Working Visit Visa',
        nameKo: '방문취업 비자',
        description: 'For overseas Koreans',
        maxDuration: '5 years',
        canWorkFull: true,
    },
    'F-2-7': {
        code: 'F-2-7',
        name: 'Points-based Residence Visa',
        nameKo: '점수제 거주 비자',
        description: 'Residence visa based on point system (80+ points)',
        maxDuration: '5 years (renewable)',
        canWorkFull: true,
    },
    'F-2-R': {
        code: 'F-2-R',
        name: 'Regional Residence Visa',
        nameKo: '지역특화 거주 비자',
        description: 'Residence visa for regional areas',
        maxDuration: '5 years',
        canWorkFull: true,
    },
    'F-5': {
        code: 'F-5',
        name: 'Permanent Residence',
        nameKo: '영주권',
        description: 'Permanent residence in Korea',
        maxDuration: 'Permanent',
        canWorkFull: true,
    },
    'F-6': {
        code: 'F-6',
        name: 'Marriage Visa',
        nameKo: '결혼이민 비자',
        description: 'For spouses of Korean nationals',
        maxDuration: '3 years (renewable)',
        canWorkFull: true,
    },
}

// 비자 전환 경로 정의
export const VISA_PATHS: VisaPath[] = [
    // D-2 (유학) 경로
    {
        from: 'D-2',
        to: 'D-10',
        requirements: [
            'Bachelor\'s degree or higher from Korean university',
            'Valid D-2 visa status',
            'Graduation certificate',
        ],
        difficulty: 'easy',
        estimatedTime: '1-2 weeks',
        description: 'After graduation, apply for job seeker visa to find employment',
    },
    {
        from: 'D-2',
        to: 'E-7',
        requirements: [
            'Job offer from Korean company',
            'Bachelor\'s degree or higher',
            'Skills matching E-7 job categories',
            'Employer sponsorship',
        ],
        difficulty: 'medium',
        estimatedTime: '2-4 weeks',
        description: 'Direct change to professional visa with job offer',
    },
    {
        from: 'D-2',
        to: 'F-2-7',
        requirements: [
            '80+ points on the point system',
            'Korean language (TOPIK 4+)',
            'Minimum income requirements',
            'Clean criminal record',
        ],
        difficulty: 'hard',
        estimatedTime: '1-2 months',
        description: 'Points-based residence visa for qualified graduates',
    },

    // D-10 (구직) 경로
    {
        from: 'D-10',
        to: 'E-7',
        requirements: [
            'Job offer from Korean company',
            'Employer E-7 sponsorship',
            'Valid D-10 status',
        ],
        difficulty: 'medium',
        estimatedTime: '2-4 weeks',
        description: 'Change to professional visa after finding a job',
    },
    {
        from: 'D-10',
        to: 'F-2-7',
        requirements: [
            '80+ points on the point system',
            'Must meet all point criteria',
        ],
        difficulty: 'hard',
        estimatedTime: '1-2 months',
        description: 'Points-based residence without E-7 step',
    },

    // E-7 (특정활동) 경로
    {
        from: 'E-7',
        to: 'F-2-7',
        requirements: [
            '80+ points on the point system',
            'E-7 visa for 1+ year',
            'Korean language (TOPIK)',
            'Annual income requirements',
        ],
        difficulty: 'medium',
        estimatedTime: '1-2 months',
        description: 'Upgrade to points-based residence visa',
    },
    {
        from: 'E-7',
        to: 'F-5',
        requirements: [
            'F-2-7 visa for 2+ years',
            'Or E-7 for 5+ years with high income',
            'KIIP Level 5 completion',
            'No criminal record',
        ],
        difficulty: 'hard',
        estimatedTime: '3-6 months',
        description: 'Path to permanent residence',
    },

    // E-9 (비전문취업) 경로
    {
        from: 'E-9',
        to: 'E-7-4',
        requirements: [
            'E-9 for 4+ years',
            'Skills certification',
            'Korean language (TOPIK 2+)',
            'Annual income 20M+ KRW',
        ],
        difficulty: 'hard',
        estimatedTime: '2-3 months',
        description: 'Upgrade to skilled worker visa',
    },
    {
        from: 'E-9',
        to: 'F-2-R',
        requirements: [
            'E-9 in regional area for 3+ years',
            'Employer in designated region',
            'Korean language ability',
        ],
        difficulty: 'medium',
        estimatedTime: '1-2 months',
        description: 'Regional residence visa for qualified workers',
    },

    // E-7-4 (숙련기능) 경로
    {
        from: 'E-7-4',
        to: 'F-2-7',
        requirements: [
            'E-7-4 for 1+ year',
            '80+ points',
            'Stable employment',
        ],
        difficulty: 'medium',
        estimatedTime: '1-2 months',
        description: 'Points-based residence visa',
    },

    // H-2 (방문취업) 경로
    {
        from: 'H-2',
        to: 'F-4',
        requirements: [
            'H-2 for 2+ years',
            'Bachelor\'s degree or skilled worker',
            'No violations',
        ],
        difficulty: 'medium',
        estimatedTime: '1-2 months',
        description: 'Upgrade to overseas Korean visa',
    },
    {
        from: 'H-2',
        to: 'F-5',
        requirements: [
            'H-2 for 5+ years',
            'KIIP completion',
            'Meet income requirements',
        ],
        difficulty: 'hard',
        estimatedTime: '3-6 months',
        description: 'Path to permanent residence',
    },

    // F-2-7 (점수제 거주) 경로
    {
        from: 'F-2-7',
        to: 'F-5',
        requirements: [
            'F-2-7 for 2+ years',
            'Maintain point requirements',
            'KIIP completion recommended',
            'Clean record',
        ],
        difficulty: 'medium',
        estimatedTime: '2-4 months',
        description: 'Final step to permanent residence',
    },

    // F-6 (결혼이민) 경로
    {
        from: 'F-6',
        to: 'F-5',
        requirements: [
            'F-6 for 2+ years',
            'Basic Korean ability',
            'Marriage maintained',
        ],
        difficulty: 'easy',
        estimatedTime: '1-2 months',
        description: 'Path to permanent residence through marriage',
    },
]

// 특정 비자에서 가능한 경로 찾기
export function getPathsFrom(visaCode: string): VisaPath[] {
    return VISA_PATHS.filter(path => path.from === visaCode)
}

// 특정 비자까지의 경로 찾기
export function getPathsTo(visaCode: string): VisaPath[] {
    return VISA_PATHS.filter(path => path.to === visaCode)
}

// 두 비자 사이의 모든 경로 찾기 (BFS)
export function findAllPaths(from: string, to: string, maxDepth: number = 4): string[][] {
    const result: string[][] = []
    const queue: { path: string[]; current: string }[] = [{ path: [from], current: from }]

    while (queue.length > 0) {
        const { path, current } = queue.shift()!

        if (path.length > maxDepth) continue

        if (current === to) {
            result.push(path)
            continue
        }

        const nextPaths = getPathsFrom(current)
        for (const nextPath of nextPaths) {
            if (!path.includes(nextPath.to)) {
                queue.push({
                    path: [...path, nextPath.to],
                    current: nextPath.to,
                })
            }
        }
    }

    return result.sort((a, b) => a.length - b.length)
}

// 경로의 총 예상 난이도 계산
export function calculatePathDifficulty(path: string[]): 'easy' | 'medium' | 'hard' {
    let totalScore = 0
    for (let i = 0; i < path.length - 1; i++) {
        const segment = VISA_PATHS.find(p => p.from === path[i] && p.to === path[i + 1])
        if (segment) {
            if (segment.difficulty === 'easy') totalScore += 1
            else if (segment.difficulty === 'medium') totalScore += 2
            else totalScore += 3
        }
    }
    const avgScore = totalScore / (path.length - 1)
    if (avgScore <= 1.5) return 'easy'
    if (avgScore <= 2.5) return 'medium'
    return 'hard'
}
