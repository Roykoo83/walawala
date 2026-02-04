export const NATIONALITIES = ['Vietnam', 'China', 'Uzbekistan', 'Nepal', 'Indonesia', 'Mongolia', 'USA', 'Thailand', 'Philippines']
export const VISA_TYPES = ['D-2', 'D-4', 'D-10', 'E-7', 'E-9', 'F-2', 'F-2-R', 'F-5', 'F-6']

const NICKNAMES = [
  'Kim', 'Lee', 'Park', 'Nguyen', 'Chen', 'Zafar', 'Amar', 'Sari', 'Bat', 'John',
  'Minh', 'Wei', 'Alisher', 'Raj', 'Budi', 'Ankh', 'Sarah', 'Somchai', 'Maria'
]

export function generate100Personas() {
  const personas = []
  for (let i = 1; i <= 100; i++) {
    const nationality = NATIONALITIES[Math.floor(Math.random() * NATIONALITIES.length)]
    const visaType = VISA_TYPES[Math.floor(Math.random() * VISA_TYPES.length)]
    const nickname = `${NICKNAMES[Math.floor(Math.random() * NICKNAMES.length)]}_${i}`
    
    // 비자 만료일 랜덤 생성 (오늘 기준 -30일 ~ +365일)
    const randomDays = Math.floor(Math.random() * 400) - 30
    const expiryDate = new Date()
    expiryDate.setDate(expiryDate.getDate() + randomDays)

    personas.push({
      id: crypto.randomUUID(),
      email: `resident_${i}@walawala.test`,
      nickname: nickname,
      nationality: nationality,
      visa_type: visaType,
      visa_expiry_date: expiryDate.toISOString().split('T')[0],
      avatar_url: `https://api.dicebear.com/7.x/avataaars/svg?seed=${nickname}`
    })
  }
  return personas
}
