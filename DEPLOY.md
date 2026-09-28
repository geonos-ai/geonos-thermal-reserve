# GEONOS Thermal Reserve 배포 가이드

가장 빠른 방법은 새 GitHub 저장소를 만든 뒤 현재 폴더를 push하고, 포함된 GitHub Actions로 Pages를 배포하는 것입니다. 빌드 도구나 패키지 설치는 필요 없습니다.

## 0. 제출 전에 먼저 확인

로컬에서 다음 명령을 실행합니다.

```bash
cd /Users/jangholee/Desktop/GitHub/geonos-thermal-reserve
python3 -m http.server 4173 --directory site
```

브라우저에서 `http://localhost:4173`을 열고 다음을 확인합니다.

- 첫 화면과 Antalya dispatch lab이 보이는지
- 슬라이더와 선택 메뉴를 바꾸면 차트와 숫자가 바뀌는지
- 높은 온도와 55% curtailment에서 `PLAN REJECTED — SAFETY GATE`가 나오는지
- 팀 정보와 이메일이 맞는지
- 모바일 화면에서 가로 스크롤이나 잘린 문구가 없는지

확인이 끝나면 로컬 서버 창에서 `Control + C`를 누르면 됩니다.

## 1. GitHub에서 빈 저장소 만들기

1. GitHub에서 **New repository**를 누릅니다.
2. Repository name을 `geonos-thermal-reserve`로 입력합니다.
3. 공개 링크를 F6S 심사위원이 바로 열 수 있도록 **Public**을 권장합니다.
4. README, `.gitignore`, License는 추가하지 말고 빈 저장소로 만듭니다.

## 2. 현재 폴더를 저장소에 올리기

아래에서 `YOUR_GITHUB_ACCOUNT`를 실제 소유 계정으로 바꿉니다. 개인 계정이라면 `jangholee92`, 조직 계정이라면 해당 조직명을 사용합니다.

```bash
cd /Users/jangholee/Desktop/GitHub/geonos-thermal-reserve
git init
git switch -c main
git add .
git commit -m "Launch GEONOS Thermal Reserve prototype"
git remote add origin https://github.com/YOUR_GITHUB_ACCOUNT/geonos-thermal-reserve.git
git push -u origin main
```

주의: 상위 `/Users/jangholee/Desktop/GitHub` 폴더에도 별도 `.git` 폴더가 있습니다. 반드시 위의 정확한 `geonos-thermal-reserve` 경로에서 `git init`을 실행해야 이 프로젝트가 독립 저장소로 관리됩니다.

GitHub CLI에 이미 로그인되어 있다면 저장소 생성과 push를 한 번에 할 수도 있습니다.

```bash
cd /Users/jangholee/Desktop/GitHub/geonos-thermal-reserve
git init
git switch -c main
git add .
git commit -m "Launch GEONOS Thermal Reserve prototype"
gh repo create YOUR_GITHUB_ACCOUNT/geonos-thermal-reserve --public --source=. --remote=origin --push
```

둘 중 한 방법만 사용합니다.

## 3. GitHub Pages 켜기

1. 새 저장소의 **Settings → Pages**로 이동합니다.
2. **Build and deployment → Source**에서 **GitHub Actions**를 선택합니다.
3. 저장소의 **Actions** 탭을 엽니다.
4. `Deploy GEONOS prototype to GitHub Pages` 작업이 초록색 체크로 끝날 때까지 기다립니다.

예상 공개 주소:

```text
https://YOUR_GITHUB_ACCOUNT.github.io/geonos-thermal-reserve/
```

첫 배포는 보통 수 분이 걸립니다. 사이트는 모두 상대경로를 사용하므로 개인 계정과 조직 계정의 project Pages에서 동일하게 동작합니다.

## 4. 공개 링크 검증

로그아웃 상태 또는 시크릿 창에서 공개 URL을 엽니다.

1. 새로고침해도 페이지가 유지되는지 확인합니다.
2. 개발자 계정 로그인 없이 모든 내용을 볼 수 있는지 확인합니다.
3. dispatch 입력을 바꿔 안전 통과와 거부 상태를 각각 확인합니다.
4. 외부 출처 링크가 새 탭에서 열리는지 확인합니다.
5. 휴대폰에서도 한 번 확인합니다.

그다음 아래 파일에서 URL 자리표시자를 실제 주소로 바꿔 F6S에 붙여 넣습니다.

```text
application/TRUE_ZERO_GLOBAL_PRIZE_2026_APPLICATION.md
```

## 5. 내용을 수정한 뒤 재배포

파일을 고친 뒤 다음만 실행하면 자동으로 다시 배포됩니다.

```bash
cd /Users/jangholee/Desktop/GitHub/geonos-thermal-reserve
git add .
git commit -m "Update application prototype"
git push
```

## 6. 자주 생기는 문제

### Actions가 실행되지 않음

- 기본 브랜치가 `main`인지 확인합니다.
- `.github/workflows/pages.yml`이 GitHub에 올라갔는지 확인합니다.
- Settings → Pages의 Source가 `GitHub Actions`인지 확인합니다.

### 공개 URL이 404임

- Actions 작업이 모두 끝났는지 확인합니다.
- 저장소가 Private이라면 현재 GitHub 플랜에서 Private Pages가 허용되는지 확인합니다.
- 주소의 계정명과 저장소명 철자를 확인합니다.

### CSS 또는 JavaScript가 안 보임

- `site/index.html`, `site/styles.css`, `site/app.js`가 모두 push됐는지 확인합니다.
- 브라우저 강력 새로고침을 합니다.
- Actions 로그에서 artifact path가 `site`인지 확인합니다.

## 7. 오늘 F6S 제출 순서

1. GitHub Pages 배포
2. 공개 링크를 시크릿 창에서 검증
3. 2분 40초 영상 녹화 및 unlisted 업로드
4. 지원서의 URL, 영상 URL, 자기자본액, Juyeon 참여 상태 확인
5. F6S 답변을 별도 문서에 백업
6. 즉시 제출
7. 완료 화면과 이메일 캡처

F6S와 주최사는 2026년 9월 28일이라는 날짜만 공개했고 정확한 마감 시각과 시간대는 공개하지 않았습니다. 공개 지원 버튼이 열려 있더라도 지체하지 않는 편이 안전합니다.
