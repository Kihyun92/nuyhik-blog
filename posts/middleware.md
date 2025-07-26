---
title: "middleware란?"
createdDate: "2025-07-26"
---

# middleware?

클라이언트에서 서버로의 요청을 처리하기전에 중간에서 핸들링하는 함수.

Nextjs에서의 예시를 생각해보면 클라이언트에서 서버로 요청이 들어올때 middleware에 선언해둔 로직을 먼저 수행하고(e.g. 요청에 포함된 정보를 기반으로한 토큰 유효성 체크, 리다이렉트 등) 해당 라우트에 대한 처리를 한다.

## nextjs vs express 에서의 middleware 차이

| 구분 | Next.js Middleware | Express Middleware |
|------|-------------------|-------------------|
| **실행 시점** | 요청이 서버에 도달하기 전 (Edge Runtime) | 요청이 서버에 도달한 후 |
| **위치** | `middleware.ts` 또는 `middleware.js` (프로젝트 루트) | 라우터 정의 시 또는 `app.use()` |
| **실행 환경** | Edge Runtime (V8 엔진) | Node.js 런타임 |
| **성능** | 더 빠른 응답 (서버까지 도달하지 않음) | 상대적으로 느림 |
| **기능** | 제한적 (Edge API만 사용 가능) | 풍부한 Node.js API 사용 가능 |
| **파일 시스템 접근** | 불가능 | 가능 |
| **데이터베이스 연결** | 제한적 (Edge 호환 DB만) | 자유롭게 가능 |
| **사용 사례** | 인증, 리다이렉트, 헤더 수정, 지역화 | 로깅, 인증, 에러 처리, 정적 파일 서빙 |
| **설정 방법** | `export default function middleware(request: NextRequest)` | `app.use((req, res, next) => {})` |
| **조건부 실행** | `matcher` 설정으로 특정 경로에만 적용 | 조건문으로 제어 |
| **응답 수정** | `NextResponse` 객체 사용 | `res` 객체 직접 조작 |

### Edge runtime?

Nextjs에서 말하는 엣지 런타임이란 nodejs 환경에서 실행되는게 아니라, 사용자에게서 가까운 엣지 노드(CDN 같은)에서 실행된다는 의미이고, 그렇기 때문에 빠르지만 nodejs API를 사용하지는 못한다.

그럼 NextJS서비스를 할때 엣지 노드를 직접 구성하지 않고도 middleware를 사용하면 어떻게 될지 궁금해서 gpt에게 물어봤다.
> Next.js에서 middleware.ts를 만들기만 해도, 별도 엣지 노드 구성 없이도 자동으로 Edge Runtime 위에서 실행되도록 처리해줘.
> (개발자가 직접 엣지 서버를 구성하거나 CDN 설정을 건드리지 않아도, Next.js와 배포 플랫폼이 알아서 Edge Function으로 변환해서 실행시켜주는 구조라고)

즉 nodejs 서버에서 nextjs를 실행하는 구조에서는 middleware가 엣지 런타임에 맞게 동작하지 않을거고, 직접 middleware를 구현해줘야한다고(express, connect, http 모듈을 사용해서) 하는데,, 요거는 조금 더 확인을 해봐야겠다.
