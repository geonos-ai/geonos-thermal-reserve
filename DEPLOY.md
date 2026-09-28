# GEONOS 수정·배포 가이드

현재 저장소와 GitHub Pages 연결은 끝난 상태입니다.

- 저장소: `geonos-ai/geonos-thermal-reserve`
- 브랜치: `main`
- 공개 주소: https://geonos-ai.github.io/geonos-thermal-reserve/

다시 `git init`을 하거나 remote를 추가할 필요는 없습니다.

## GitHub Desktop에서 수정본 올리기

1. GitHub Desktop을 엽니다.
2. 왼쪽 위 **Current repository**에서 `geonos-thermal-reserve`를 선택합니다.
3. **Changes** 목록에서 이번 수정 파일을 확인합니다.
4. 왼쪽 아래 **Summary**에 `Rewrite site and application`을 입력합니다.
5. **Commit to main**을 누릅니다.
6. 상단의 **Push origin**을 누릅니다.

핵심은 **Commit to main → Push origin** 순서입니다. 수정만 한 상태에서 Push를 눌러서는 새 내용이 올라가지 않습니다.

## 배포 확인

Push 뒤 GitHub 저장소의 **Actions** 탭을 엽니다. `Deploy GEONOS prototype to GitHub Pages`가 초록색 체크로 끝나면 배포 완료입니다. 보통 1~3분 정도 걸립니다.

그다음 시크릿 창에서 공개 주소를 열어 확인합니다.

- `Overview / Simulator / How it works / Pilot / Company` 메뉴가 모두 열리는지
- Simulator의 슬라이더와 선택 메뉴를 바꾸면 차트와 숫자가 바뀌는지
- 44°C와 55% reduction에서 `Plan rejected: upper temperature limit exceeded`가 보이는지
- 모바일에서 가로 스크롤이나 잘린 문구가 없는지
- `Model notes`와 외부 출처 링크가 열리는지

예전 화면이 보이면 1~3분 기다린 뒤 강력 새로고침합니다.

## 로컬에서 먼저 확인하고 싶을 때

터미널에서 아래 명령을 실행합니다.

```bash
cd /Users/jangholee/Desktop/GitHub/geonos-thermal-reserve
python3 -m http.server 4173 --directory site
```

브라우저에서 `http://localhost:4173`을 엽니다. 확인이 끝나면 터미널에서 `Control + C`를 누릅니다.

## 문제가 생기면

### Actions가 실행되지 않음

- GitHub Desktop에서 **Push origin**까지 눌렀는지 확인합니다.
- GitHub 저장소의 기본 브랜치가 `main`인지 확인합니다.
- **Settings → Pages → Build and deployment → Source**가 `GitHub Actions`인지 확인합니다.

### 공개 사이트가 404임

- Actions 작업이 끝났는지 확인합니다.
- 주소가 `https://geonos-ai.github.io/geonos-thermal-reserve/`인지 확인합니다.

### 새 CSS나 JavaScript가 안 보임

- GitHub Desktop의 **History**에서 방금 커밋이 보이는지 확인합니다.
- GitHub 웹사이트에서 최신 커밋이 보이는지 확인합니다.
- 브라우저를 강력 새로고침합니다.

## F6S 제출 직전

1. 공개 사이트를 시크릿 창에서 최종 확인합니다.
2. 3분 미만 영상을 올리고 지원서의 영상 URL을 채웁니다.
3. 정확한 자기자본 현금액을 채웁니다.
4. F6S에 붙여 넣은 답변을 별도 문서에도 저장합니다.
5. 제출 완료 화면과 이메일을 캡처합니다.

공개 페이지에는 2026년 9월 28일이라는 날짜만 있고 정확한 마감 시각과 시간대는 보이지 않으므로, 준비되는 즉시 제출하는 편이 안전합니다.
