![soonoo's profile](soonoo-profile.png)
<br />
# committrs.io - 오픈 소스 프로젝트 개발자들을 위한 프로필 페이지
[![Build Status](https://travis-ci.com/soonoo/committrs.svg?branch=master)](https://travis-ci.com/soonoo/committrs)  
* [English](README.md)  
<br />

## commitrrs.io란?
개발자들은 어떤 방법으로든 다양한 오픈 소스 프로젝트에 기여합니다. 하지만 실제 오픈 소스 기여물을 눈으로 확인하는 것은 쉽지 않습니다. 유명한 오픈 소스 프로젝트, 예를 들어 리눅스에 당신이 코드가 포함되었다고 가정해 보겠습니다. 어떤 코드를 기여했는지 실제로 확인하기 위해서는 리눅스 Git 저장소를 찾아 클론한 뒤 `git log --author=torvalds`와 같은 명령어를 사용해야 합니다. committrs는 웹 이곳 저곳에 흩어져 있는 당신의 기여 행위를 찾아 한 눈에 확인할 수 있는 프로필 페이지를 제공합니다. committrs가 제공하는 프로필 페이지가 궁금하다면 제 [프로필 페이지](https://committrs.io/soonoo)를 확인해 보세요.
 <br />
## committrs.io가 지원하는 플랫폼을 알려주세요
committrs.io는 현재 30개 이상의 star를 받은 GitHub 저장소에 대한 기여만을 수집합니다. 다른 플랫폼(Gitlab, MDN 혹은 Wikipedia와 같은)에 대한 지원은 추후에 제공될 예정입니다. PR과 Issue를 통해 의견을 제시해 주세요!
 <br />
## committrs.io 실행 흐름
![flow of committrs.io](https://raw.githubusercontent.com/soonoo/committrs.io/master/app-flow.png)
 <br />
## 프로젝트 구조
- [`/batch`](https://github.com/soonoo/committrs.io/tree/master/batch): GitHub 저장소의 커밋을 수집하는 배치 스크립트입니다.
- [`/client`](https://github.com/soonoo/committrs.io/tree/master/client): React로 작성된 프론트엔드입니다.
- [`/server`](https://github.com/soonoo/committrs.io/tree/master/server): Node.js로 작성된 API 서버입니다.

<br />

## 프로젝트에 기여하는 법
PR과 Issue는 언제나 환영입니다. 개발을 시작하기 전에 LTS 버전의 [Node.js](https://nodejs.org/)를 설치해 주세요.  
- [개발 시작하기](CONTRIBUTING.md).
- [Swagger 문서](https://api.committrs.io/swagger)

<br />

## 작업 예정
- 더 많은 플랫폼 지원
- 테스트 코드 작성

<br />

## 라이센스
committrs.io는 MIT 라이센스를 따릅니다. [LICENSE](LICENSE.md) 파일을 확인해 주세요.

