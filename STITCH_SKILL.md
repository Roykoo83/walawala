# Stitch UI Designer Skill

## Description
Google Stitch(Design with AI)를 활용하여 프론트엔드 UI 화면을 생성하고 디자인 코드를 추출하는 스킬입니다.

## Tools
이 스킬은 `Stitch` MCP 확장이 제공하는 다음 도구들을 활용합니다:
- `create_project(name)`: 새로운 디자인 프로젝트 생성
- `generate_screen_from_text(project_id, prompt, model_id)`: 텍스트 프롬프트로 UI 화면 생성
- `list_screens(project_id)`: 생성된 화면 목록 조회
- `get_screen(project_id, screen_id)`: 화면 상세 정보 및 디자인 스펙 조회

## Usage Instructions
1. **프로젝트 생성**: 사용자의 요구사항에 맞는 새 프로젝트를 생성합니다.
2. **화면 생성**: 구체적인 프롬프트(예: "로그인 화면", "대시보드")를 사용하여 화면을 생성합니다.
3. **코드 변환**: 생성된 화면의 스펙을 바탕으로 프론트엔드 코드(React/Tailwind)를 작성합니다.

## Requirements
- `gemini-cli-extensions/stitch` 확장이 설치되어 있어야 합니다.
- 유효한 Google Cloud 인증 또는 Stitch API Key가 설정되어 있어야 합니다.
