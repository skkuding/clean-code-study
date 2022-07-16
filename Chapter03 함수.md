# Chapter03. 함수

> [@cranemont](https://github.com/cranemont), 2022-07-16
>

이번 장에서는 함수를 만드는 규칙들에 대해 소개합니다


## 작게 만들어라

- 4 ~ 5줄 정도면 충분하다

### if, else, while문 등에 들어가는 블록은 한 줄로 표현할 것

- 이름을 적절히 짓자
- 중첩 구조가 생길만큼 함수가 커져서는 안 된다
- 들여쓰기 수준은 1단이나 2단을 넘어서면 안 된다

## 한 가지만 해라

> **함수는 한 가지를 해야 한다. 그 한 가지를 잘 해야 한다. 그 한 가지만을 해야 한다**
> 
- 한 가지 작업만 한다는 것은 함수에서 추상화 수준이 하나인 단계만 수행한다는 것
- 의미 있는 이름으로 다른 함수를 추출할 수 있다면 그 함수는 여러 작업을 한다
- 한 가지 작업만 하는 함수는 섹션으로 나누기 어렵다. 이걸 판단 기준으로 삼아도 된다

## 함수 당 추상화 수준은 하나로

- 함수가 확실히 ‘한 가지’ 작업만 하려면 함수 내 모든 문장의 추상화 수준이 동일해야 한다
    - 예를 들어 **.append(”\n”)는** 추상화 수준이 아주 낮은 반면, **getHtml()**같은 함수는 추상화 수준이 아주 높다
    - 근본 개념과 세부사항을 뒤섞지 말자
- **내려가기** 규칙
    - 코드는 위에서 아래로 이야기처럼 읽혀야 좋다. 한 함수 다음에는 추상화 수준이 한 단계 낮은 함수가 온다

## Switch문

- switch문은 작게 만들기 어렵다. 본질적으로 N가지를 처리한다
- 저차원 클래스에 숨기고 반복하지 않는 방법을 사용하자

## 서술적인 이름을 사용하라

> 코드를 읽으면서 짐작했던 기능을 각 루틴이 그대로 수행한다면 깨끗한 코드이다
> 
- 함수가 작고 단순할수록 서술적인 이름을 고르기 쉽다
- 일관성 있게 이름을 붙인다.
    - 모듈 내에서 함수 이름은 같은 문구, 명사, 동사를 사용한다

## 함수 인수

- 가장 이상적인 함수 인수는 0개이다. 적을수록 좋다
- 인수는 개념을 이해하기 어렵게 만든다. 함수를 이해할 때 인수가 무엇인지도 같이 해석해야 하기 때문이다
- 테스트 관점에서 봐도 인수는 적을수록 좋다. 유효한 값으로 조합을 구성해 테스트해야 하기 때문
- 출력 인수는 가급적이면 사용하지 않는 것이 좋다

### 단항 형식

- 단항 형식은 주로 인수에 질문을 던지거나, 인수를 변환해 결과를 반환하는 경우에 사용된다
- 이벤트 형식의 함수는 단항 함수가 적절하다
  - 이벤트 함수는 입력 인수만 있고, 출력 인수는 없다. 프로그램은 함수 호출을 이벤트로 해석해 입력 인수로 시스템 상태를 바꾼다
  - 이벤트 함수는 이벤트라는 사실이 코드에 명확히 드러나야 한다
- 위의 예시들이 아니라면 가급적이면 사용하지 않는다

### 플래그 인수

- 쓰지 마라. 플래그가 필요하면 함수를 나눠라

### 이항 함수

- 단항 함수보다 이해하기 어렵다
- 한 값을 표현하는 데 두 요소가 필요하다면 사용해도 괜찮다
- 가능하다면 단항 함수로 바꾸자
  - 클래스로 분리한다

### 삼항 함수

- 이항 함수보다 더 이해하기 어렵다

  <aside>
  💡 인수가 너무 많다면 object로 묶어서 전달할 것. 명확하게 하려면 class의 변수로 사용한다

  </aside>

### 동사와 키워드

- 단항 함수는 함수와 인수가 동사/명사 쌍을 이뤄야 한다. `ex) writeField(name)`
- 함수 이름에 키워드를 추가하는 형식도 있다. 함수 이름에 인수 이름을 넣으면 된다. 순서가 헷갈리는 것을 방지할 수 있다. `ex) assertExpectedEquealsActual(expected, actual)`

## 부수 효과를 일으키지 마라

- 함수 이름에 명시된 일만 하자
- 부수 효과는 시간적인 결합을 초래한다. 특정 상황에서만 호출이 가능하게 된다
- 정말 필요하다면 함수 이름에 명시하자. 한 가지 일만 하지는 않겠지만

### 출력 인수

- 인수는 함수 입력으로 주로 해석된다. 상태 변경이 필요하다면 출력 인수가 아니라 객체 상태를 변경하는 방법을 쓰자

## 명령과 조회를 분리하라

- 함수는 뭔가를 수행하거나 / 뭔가에 답하거나 둘 중 하나만 해야 한다
    - 객체 상태를 변경하거나, 객체 정보를 반환하거나

## 오류 코드보다 예외를 사용하라

- 오류 코드를 반환하면 그걸 조건문으로 처리해야 한다
- 대신 예외를 던지자

### Try/Catch블록 뽑아내기

- try/catch블록은 정상 동작과 오류처리 동작을 뒤섞는다. try/catch 블록은 별도 함수로 뽑아내는 편이 좋다

### 오류 처리도 한 가지 작업이다

- 함수와 마찬가지로 오류 처리를 처리하는 함수는 오류만을 처리한다

## 반복하지 마라

- 코드 중복이 생기면 길이가 늘어날 뿐 아니라 알고리즘이 변하면 중복되는 모든 곳을 수정해야 한다
  - 오류 발생 확률도 크게 증가한다. 하나라도 빠뜨리면 안 되니까
- 객체지향 프로그래밍에서는 코드를 부모 클래스로 몰아 중복을 없애고, RDBMS에서는 중복을 없애기 위해 정규 형식이 만들어졌다. AOP나 COP 모두 어떤 면에서는 중복 제거 전략이다. 어떤 면에서 중복은 소프트웨어에서 모든 악의 근원이다. 소프트웨어 개발에서 지금까지 일어난 혁신은 소스 코드에서 중복을 제거하려는 지속적인 노력이다
  
## 구조적 프로그래밍

- 다익스트라의 구조적 프로그래밍 원칙에 따르면 모든 함수와 함수 내 모든 블록에 입구와 출구가 하나만 존재해야 한다. 그러나 함수가 작다면 별 도움이 되지 않는다. 함수가 아주 클 때만 상당한 이익을 제공한다. 그러므로 함수를 작게 만든다면 간혹 return, break, continue를 여러 차례 사용해도 괜찮다. 이게 더 나을 때도 있다. 반면 goto는 큰 함수에서만 의미가 있으므로, 작은 함수에서는 피해야만 한다

## 함수를 짜는 방법

- 소프트웨어를 짜는 행위는 글짓기와 비슷하다. 먼저 기록한 후에 정리한다. 함수도 마찬가지다. 
- 처음에는 길고, 더럽고, 복잡하고 중복되지만 일단 그 모든 코드를 빠짐없이 테스트하는 단위 테스트 케이스를 만든다. 그리고 함수를 만들고, 이름을 바꾸고, 중복을 제거하며 코드를 정리한다. 그 과정에서도 코드는 항상 단위 테스트를 통과해야 한다

## 발제 💡
코드를 정리해 봅시다
```tsx
async issueJwtTokens(loginUserDto: LoginUserDto): Promise<JwtTokens> {
  const user = await this.validateUser(loginUserDto)
  return await this.createJwtTokens(user.id, user.username)
}

async validateUser(loginUserDto: LoginUserDto): Promise<User> {
  const user = await this.userService.getUserCredential(loginUserDto.username)
  if (!user || !(await validate(user.password, loginUserDto.password))) {
    throw new PasswordNotMatchException('Password does not match')
  }
  return user
}
```
1. `validateUser()` 의 목적은 loginUserDto의 username과 password로 사용자를 검증하는 것입니다. user 객체보다는 boolean 값을 반환하는 것이 더 적절해 보입니다. 
    ```tsx
    async issueJwtTokens(loginUserDto: LoginUserDto): Promise<JwtTokens> {
      if(!(await this.isValidadUser(loginUserDto)) {
        throw new PasswordNotMatchException('Password does not match')
      }
      return await this.createJwtTokens(user.id, user.username)
    }

    async validateUser(loginUserDto: LoginUserDto): Promise<boolean> {
      const user = await this.userService.getUserCredential(loginUserDto.username)
      if (!user || !(await validate(user.password, loginUserDto.password))) {
        return false
      }
      return true
    }
    ```
2. `issueJwtTokens`는 controller에서 호출하는 비즈니스 로직의 시작점입니다. 테스트가 불가능한 영역들은 이 최상위 메소드로 옮기고 내부의 메소드들은 최대한 외부 의존성 없이 동작하도록 수정합니다
    ```tsx
    async issueJwtTokens(loginUserDto: LoginUserDto): Promise<JwtTokens> {
      const user = await this.userService.getUserCredential(loginUserDto.username)
      if(!(await this.isValidadUser(user, loginUserDto.password)) {
        throw new PasswordNotMatchException('Password does not match')
      }
      return await this.createJwtTokens(user.id, user.username)
    }

    async validateUser(user: User, password: string): Promise<boolean> {
      if (!user || !(await validate(user.password, password))) {
        return false
      }
      return true
    }
    ```
    
3. `validateUser()`는 boolean값을 반환합니다. 메소드 이름만으로 유추가 가능하도록 `isValidUser()`로 수정합니다
4. 상황에 더 적합한 exception을 throw합니다
---
### 결과
```tsx
async issueJwtTokens(loginUserDto: LoginUserDto): Promise<JwtTokens> {
  const user = await this.userService.getUserCredential(loginUserDto.username)
  if (!(await this.isValidUser(user, loginUserDto.password))) {
    throw new InvalidUserException('Incorrect username or password')
  }
  return await this.createJwtTokens(user.id, user.username)
}

async isValidUser(user: User, password: string): Promise<boolean> {
  if (!user || !(await validate(user.password, password))) {
    return false
  }
  return true
}
```
### 더 생각해볼 부분 🤔
- user을 가져오기 위한 외부 모듈의 메소드인 `getUserCredential()`의 호출부(`issueJwtTokens()`)와 검증부(`isValidUser()`)가 달라졌는데 괜찮은 방법일까요?
- `isValidUser()`에서 사용되는 `validate()`또한 외부 라이브러리를 추상화한 함수입니다. 외부 라이브러리는 unit test에서 테스트하지 않는 영역이기 때문에 어차피 mocking이 필요한 부분이 남게 되는데, `getUserCredential()`만 밖으로 빼는 것이 의미가 있을까요?