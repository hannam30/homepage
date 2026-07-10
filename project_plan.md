# 사주성지학회(四柱成志學會) Website

## 1. Project Description
사주성지학회의 공식 웹사이트. 학회 소개, 사주명리 학술 프로그램, 운세 상담 서비스, 학술 블로그, 유튜브 콘텐츠, 회원가입을 한 곳에서 안내한다. 동양적 우아함과 현대적 미니멀리즘을 결합한 디자인으로 신뢰감과 학문적 권위를 전달한다.

## 2. Page Structure
- `/` - 메인 페이지 (Hero · About · Programs · Fortune Service · Blog · YouTube · Signup · Footer)
- (이후 단계) `/about`, `/programs`, `/fortune`, `/blog`, `/contact` 등 확장 가능

## 3. Core Features
- [x] 고정 상단 네비게이션 (스크롤 시 배경 전환)
- [x] Hero 섹션 (학회 슬로건 + CTA)
- [x] 학회 소개 섹션
- [x] 프로그램 소개 그리드
- [x] 운세 서비스 + 유튜브 스플릿 섹션
- [x] 학술 블로그 카드 리스트
- [x] 회원가입 / 뉴스레터 폼
- [x] SNS 연결 아이콘
- [x] 푸터 (연락처 · 저작권)

## 4. Data Model Design
현재 단계 데이터 저장 없음. 추후 회원관리, 블로그 CMS 필요 시 Supabase 추가.

## 5. Backend / Third-party Integration Plan
- Form: Readdy Form (뉴스레터/회원가입 신청)
- Supabase: 미사용 (추후 회원 인증 시 추가)
- Shopify / Stripe: 미사용

## 6. Development Phase Plan

### Phase 1: 메인 페이지 (현재)
- Goal: 한 페이지에 학회의 전체 가치 제안을 담은 랜딩 페이지
- Deliverable: `/` 라우트의 풀스크린 랜딩 페이지, 모든 섹션 완성

### Phase 2: 서브 페이지 확장
- Goal: 프로그램 상세, 학술 블로그 리스트/상세, 운세 상담 예약 페이지
- Deliverable: 개별 라우트 추가

### Phase 3: 회원 인증 & 개인화
- Goal: Supabase 연동 로그인/회원가입, 마이페이지
- Deliverable: 인증 시스템 구축