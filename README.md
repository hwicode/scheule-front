# schedule-front

Schedule 프로젝트의 프론트엔드를 구현한 저장소

<br>

## 서비스 화면

<details>
<summary>본문 확인</summary>

#### 캘린더 화면

<img src="https://github.com/hwicode/schedule/assets/95541996/5264c6ab-2839-4069-98f6-7edbc03912a7" width="600" height="400">

<br><br>

#### 계획표 화면

<img src="https://github.com/hwicode/schedule/assets/95541996/d058f80d-fb60-433f-a775-db6c8a4d0d96" width="600" height="450">

<br><br>

#### 로그인 화면

<img src="https://github.com/hwicode/schedule/assets/95541996/a09aeaa0-4648-4f40-9ecc-b385a3b61278" width="500" height="550">

<br><br>

#### 검색 화면

<img src="https://github.com/hwicode/schedule/assets/95541996/fa7fb390-8f24-445f-8606-bfb4de398323" width="600" height="450">


</details>

<br>


## 프로젝트 전 상황

+ Schedule 프로젝트의 완성도를 위해 프론트엔드 구현의 필요성을 느낌
+ HTML, CSS, JS의 기초지식만 보유한 상태였음
+ 프론트엔드를 빠르게 학습하고 프로젝트를 구현해야 함

<br><br>

## 학습 과정

+ 새로운 기술(vue, 부트스트랩)의 기능을 전체적으로 훑어봄
+ 즉시 프로젝트를 구현하며 필요한 기능을 검색하고 적용

<br><br>

## 주요 문제

+ [Access token 만료 시, 재발급 요청이 여러 개 발생하는 문제를 async-mutex로 해결](https://github.com/hwicode/scheule-front/issues/1)
+ [디바운스 방식으로 검색어 자동 완성 요청 횟수 제한](https://github.com/hwicode/scheule-front/issues/2)
+ [Axios 인터셉터로 공통 로직 관리 및 코드 간결화](https://github.com/hwicode/scheule-front/issues/3)
+ 반응형 웹 구현을 통해 다양한 디바이스에서 일관된 사용자 경험 제공

<br><br>

## 결과

+ 총 25일 간 프론트엔드를 학습하고 프로젝트를 완성
+ 프론트엔드에 대한 거부감 줄어듦
+ 프론트엔드와 백엔드의 상호작용 경험
    + 프론트엔드 입장에서 백엔드가 해줬으면 하는 일을 직접 경험
    + 내가 불편함을 예상하는 것보다, 사용자가 실제로 느낀 불편을 해결하는 것이 중요함을 느낌
+ 서로가 이해하지 못하는 상황이 존재 -> 커뮤니케이션의 중요성 느낌

<br><br>

## 아쉬운점

+ 예외 코드 없음 -> 프론트에서 예외 처리할 때, 예외 메시지 사용
+ 기본적인 자바스크립트와 CSS에 대한 이해가 부족 
    + null과  undefined를 구분 X
        + 명시적인 부재 표현 -> null
        + null : 객체가 없음
        + undefined :  값이 대입되지 않은 변수 혹은 속성
+ 유지보수하기 어려운 코드
+ 테스트 코드 X
