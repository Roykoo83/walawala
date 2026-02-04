
// 100 Persona Generator Script
// Usage: npx ts-node generate-personas.ts

const NATIONALITIES = [
  { code: 'VN', name: 'Vietnam', emoji: '🇻🇳', weight: 30, names: ['Nguyen', 'Tran', 'Le', 'Pham', 'Hoang'] },
  { code: 'CN', name: 'China', emoji: '🇨🇳', weight: 30, names: ['Wang', 'Li', 'Zhang', 'Liu', 'Chen'] },
  { code: 'NP', name: 'Nepal', emoji: '🇳🇵', weight: 10, names: ['Gurung', 'Shrestha', 'Tamang', 'Magar'] },
  { code: 'UZ', name: 'Uzbekistan', emoji: '🇺🇿', weight: 10, names: ['Kim', 'Lee', 'Pak', 'Choi'] }, // Koryo-saram mostly
  { code: 'PH', name: 'Philippines', emoji: '🇵🇭', weight: 10, names: ['Santos', 'Reyes', 'Cruz', 'Bautista'] },
  { code: 'US', name: 'USA', emoji: '🇺🇸', weight: 5, names: ['Smith', 'Johnson', 'Williams'] },
  { code: 'KR', name: 'Korea', emoji: '🇰🇷', weight: 5, names: ['Kim', 'Lee', 'Park'] } // Friendly locals
];

const VISAS = ['D-2', 'D-4', 'E-7', 'E-9', 'F-2', 'F-5', 'F-6'];

function getRandomItem(arr: any[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getWeightedNationality() {
  const rand = Math.random() * 100;
  let sum = 0;
  for (const nat of NATIONALITIES) {
    sum += nat.weight;
    if (rand < sum) return nat;
  }
  return NATIONALITIES[0];
}

function generatePersonas(count: number) {
  const personas = [];
  for (let i = 0; i < count; i++) {
    const nat = getWeightedNationality();
    const firstName = getRandomItem(nat.names);
    const lastName = String.fromCharCode(65 + Math.floor(Math.random() * 26)); // Random Initial
    
    personas.push({
      id: `user_${i + 1}`,
      nickname: `${firstName} ${lastName}.`,
      nationality: `${nat.name} ${nat.emoji}`,
      visa_type: getRandomItem(VISAS),
      role: 'user',
      korean_level: Math.floor(Math.random() * 6) + 1, // TOPIK 1-6
      activity_score: Math.floor(Math.random() * 100) // For simulation logic
    });
  }
  return personas;
}

const users = generatePersonas(100);
console.log(JSON.stringify(users, null, 2));
