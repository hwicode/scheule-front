# schedule-front

Schedule 프로젝트의 프론트엔드를 구현한 저장소입니다.

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

+ 생활 코딩님의 HTML, CSS, JS 강의 정도만 본 상태였습니다.
+ 프론트를 빠르게 구현해야 했습니다.

<br><br>

## 학습 과정

+ vue의 기능을 전체적으로 훑어보고 어떤 기능 있는지 파악했습니다.
+ 부트스트랩도 전체적으로 훑어봤습니다.
+ 바로 프로젝트를 시작했습니다.
+ 기능을 구현할 때, 필요한 기능을 적용해보면서 진행했습니다.

<br><br>

## 주요 문제

+ [access token이 만료됐을 때, 재발급 요청이 여러 개 날라가는 문제를 async-mutex 라이브러리를 통해 해결했습니다.](https://github.com/hwicode/scheule-front/issues/1)
+ [검색어 자동완성 기능을 구현할 때, debounce를 사용했습니다.](https://github.com/hwicode/scheule-front/issues/2)
+ [axios에서 공통으로 적용해야 하는 로직을 인터셉터를 통해 해결했습니다.](https://github.com/hwicode/scheule-front/issues/3)
+ 디바이스에 따라 반응형으로 크기가 조절되도록 만들었습니다.

<br><br>

## 결과

+ 25일 동안 프론트를 학습하고 구현했습니다.
+ 마냥 프론트가 어려울 것이라고 생각해서 구현을 미루기도 했는데, 직접 경험해보면서 프론트에 대한 거부감이 줄어들었습니다.
+ 프론트와 백엔드의 상호작용에 대해 이해할 수 있는 경험이였습니다.
+ 프론트 입장에서 백엔드가 해줬으면 하는 일을 직접 경험했습니다.
    + 내가 불편하다고 생각하는 것보다 사용자가 직접 느낀 불편함을 해결하는게 더 중요하다고 느꼈습니다. 
+ 서로가 이해하지 못하는 상황이 발생한다는 것을 이해하고, 커뮤니케이션을 해야 겠다는 생각이 들었습니다.    

<br><br>

## 아쉬운점

+ 예외 코드가 없어서 프론트에서 예외 처리할 때, 예외 메시지를 통해 진행했습니다.
+ 기본적인 자바스크립트와 CSS에 대한 이해가 부족했습니다. 
    + null과  undefined를 구분하지 못했습니다.
        + 명시적으로 부재를 나타내고 싶다면 항상 null을 사용
        + null : 객체가 없음
        + undefined :  값이 대입되지 않은 변수 혹은 속성
+ 빠르게 구현하기 위해 문제 발생 시 큰 고민없이 즉각적으로 문제해결을 해서 아쉬운 부분이 생겼습니다.
+ 유지보수하기 어려운 코드가 됐습니다.
+ 테스트 코드가 없습니다.
