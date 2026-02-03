import {
  Loader2,
  LucideProps,
  Home,
  Compass,
  FileText,
  Briefcase,
  Users,
  MessageCircle,
  Bell,
  Search,
  Menu,
  X,
  ChevronRight,
  ChevronLeft,
  Settings,
  LogOut,
  User,
  Heart,
  Share2,
  AlertTriangle,
  CheckCircle2,
  MapPin,
  Calendar
} from "lucide-react";

export const Icons = {
  spinner: Loader2,
  home: Home,          // 홈
  explore: Compass,    // 탐색
  visa: FileText,      // 비자
  jobs: Briefcase,     // 취업
  community: Users,    // 커뮤니티 (모임)
  chat: MessageCircle, // 채팅/피드
  bell: Bell,          // 알림
  search: Search,      // 검색
  menu: Menu,          // 모바일 메뉴
  close: X,            // 닫기
  chevronRight: ChevronRight,
  chevronLeft: ChevronLeft,
  settings: Settings,  // 설정
  logout: LogOut,      // 로그아웃
  user: User,          // 프로필
  heart: Heart,        // 좋아요
  share: Share2,       // 공유
  warning: AlertTriangle, // 경고/주의
  success: CheckCircle2,  // 성공/완료
  location: MapPin,       // 위치
  calendar: Calendar,     // 일정
};

export type Icon = keyof typeof Icons;
