# 알지티 Web front-end S/W 개발 직무 면접 전 과제

문제: 당신은 온라인 서점을 위한 웹 애플리케이션을 개발하고 있습니다. 이 애플리케이션은 상점 주인이 책을 검새갛고, 상세 정보를 보고 편집하며, 각 책의 판매 수량을 확인할 수 있어야 합니다.

1. 프론트엔드

  1) 책 목록 페이지 구현
     - 페이지네이션 활용 (한 페이지당 10개 항목) (한 페이지당 10개 항목 완료, 페이지네이션 구현 미완료)
     - 제목과 저자로 필터링 할 수 있는 검색 기능 구현 (구현 완료)
    
  2) 책 상세 정보 페이지/뷰 구현 (구현 완료)
  3) 책 추가/제거 및 수량 조절 기능 (구현 완료)

2. 백엔드
   1) 데이터베이스와 통신하는 기본적인 RESTful API 설계 및 구현
      - 책 목록 조회 (구현 완료)
      - 책 상세 정보 조회 (구현 완료)
      - 책 추가 (구현 완료)
      - 책 정보 수정 (구현 완료)
      - 책 삭제 (구현 완료)

- 추가 요청사항
  - 프론트엔드 백엔드 간 타입 안전성을 위해 TypeScript 사용
 
## 환경 설정
- DB=postgresql://${username}:${password}@localhost:${psqlPORT}/${db} <-- DB 연결
- SERVER_PORT=${port}
- PEM_DB=${pem file path}

배포 URL: dev.webprolist.click:8080/

## 아키텍처 및 설계

AWS RDS, EC2 활용
AWS( VPC ( private-subnet( RDS ) <-> public-subnet( EC2 ) ) )
- AWS 내부에서 private subnet에 RDS(postgreSQL) 넣어 DB 보안 강화

EC2( Frontend, Backend )
- EC2 비용 절감을 위해 Front-end, Back-end 서버 통합 배포

Frontend.tech( Typescript, React, TailwindCSS, Shadcn, zod, react-query )
- 프론트엔드 기술
	- TypeScript, React, TailwindCSS, Shadcn, zod, react-query
Backend.tech( Typescript, Node.js, Hono.js, Drizzle, postgreSQL,  )
- 백엔드 기술
	- TypeScript, Node.js, Hono.js, Drizzle, postgreSQL

## Getting Started

- prerequisite
	- localhost:5432로 포트포워딩 되는 postgreSQL 요구
	- node.js version `v22.11.0`
	- npm version `v10.9.0`

```bash
cd frontend
npm i
npm run build <-- build된 `dist`폴더 내의 정적 파일 backend/public 폴더로 이동

cd ../backend
npm i
npm run start:prod
```

## 도전 과제와 해결 방안

- 하나의 EC2에 프론트엔드와 백엔드를 함께 배포하려는 과정이 기존의 방식과 달라 어려운 점이 있었지만,
백엔드 내에서 프론트엔드에 대한 라우팅만 추가적으로 넣어 배포를 성공적으로 완수할 수 있었습니다.

- input 태그 활용시 타이핑에 따라 불필요한 서버 API 호출을 방지하기 위해 lodash.debounce를 활용해
리렌더링 및 불필요한 서버 API 호출또한 방지해 성능을 최적화할 수 있었습니다.

- zod와 react-hook-form을 활용해 런타임 유효성 검사를 진행해 form 데이터의 요청에 대해 데이터 일관성을 보장할 수 있었습니다.
