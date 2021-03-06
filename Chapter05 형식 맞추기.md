# chapter5. 형식 맞추기

생성일: 2022년 7월 16일 오후 12:45
> [@SOLBI1028](https://github.com/SOLBI1028), 2022-07-16
>

# 목적

- 앞으로 기능을 추가하거나, 기능을 바꿔야 할 때 기존의 코드가 큰 영향을 미친다
- 일관된 구현 스타일과 가독성은 **유지 보수의 용이성과 확장성**을 크게 향상시킨다

# 적절한 코드 길이 유지

- 일반적으로 코드의 길이가 짧은 파일보다 이해하기 쉽다
- 200줄 정도인 파일로도 충분히 큰 시스템을 구축할 수 있다

## 1. 신문 기사처럼 작성하기 : general → detail

- 독자는 표제를 보고 기사를 읽을지 말지 판단하고, 첫 문단은 기사의 전체 내용을 요약한다.
    
    → **고차원의 개념을 먼저 설명하고, 아래로 내려가면서 세부내용을 설명하자**
    
- 한 면을 채우는 기사는 거의 없고, 신문이 사실, 날짜, 이름 등을 무작위로 뒤섞은 긴 기사는 아무도 읽지 않는다.
    
    → **코드를 짧게, 하나의 파일에서 하나의 내용만을 설명하자**
    

## 2. 개념은 빈 행으로 분리하기

- 일련의 행 묶음은 **완결된 생각 하나**를 표현한다.
- 빈 행은 새로운 개념을 시작한다는 시각적 단서이다.

## 3. 수직 거리

- 연관된 코드는 세로로 가까이 놓기
- **코드의 거리**는 **연관성을 표현**한다
- 코드 사이의 의미 없는 주석은 지우고, 연관이 없는 코드는 따로 위치시키자

### 변수 선언

- **사용하는 위치에 최대한 가까이 선언**한다
- 짧은 함수 :  각 함수의 맨 처음에 선언
    
    ```ts
    private static void readPreferences() {
    	let is: InputStream = null;
    	try {
    		is = new FileInputStream(getPreferencesFile());
    		~~
    }
    ```
    
- 루프를 제어하는 변수 : 루프문 내부에 선언
    
    ```ts
    public countTestCase(): number {
    	let count = 0;
    	for (Test each: tests)
    		count += each.countTestCases();
    	return count;
    }
    ```
    
- 긴 함수 : 블록 상단이나 루프 직전에 선언
    
    ```ts
    ~~
    for (XMLTest test : m_suite.getTests()) {
    	const tr: TestRunner = m_runnerFactory.newTestRunner(this,test);
    	tr.addListener(m_textReporter);
    	~~
    }
    ```
    

### 인스턴스 변수

- java : 클래스 맨 처음에 선언
- c++ : 클래스의 맨 마지막에 선언

→ 팀에서 규칙을 정해서 변수를 어디에 선언할 지 통일하자

### 종속 함수

- 한 함수가 다른 함수를 호출한다면 두 함수를 가까이 배치한다.
- 호출 하는 함수 → 호출 되는 함수 순으로 배치
    - 고차원 → 저차원, 중요한 개념을 먼저 설명한다

### 개념적 유사성

- 개념적 친화도가 높은 코드는 가까이 배치한다
    - 직접적인 종속성
    - 동일한 변수 이용
    - 제공하는 기능의 유사성

# 가로 형식 맞추기

- 한줄에 작성된 코드가 짧은게 바람직하다
- 필자는 한 줄의 길이가 120자 정도로 제한하는게 적합하다고 말한다

## 1. 가로 공백

- 공백으로 밀접한 개념과 느슨한 개념을 표현한다
- 연산자의 우선순위를 강조하기 위해서도 사용한다

```ts
public class Quadratic {
	public static root1:number (a:number, b:number, c:number) {
		const determinant:number = determinant(a, b, c);
		return (-b + Math.sqrt(determinant)) / (2*a));
	}
	~~
}
```

## 2. 가로 정렬

- 가로 정렬은 하지 않는게 바람직하다
    - 정렬을 하면 엉뚱한 부분을 강조하여 진짜 의도가 가려진다
- 정렬을 해야할 만큼 긴 목록이라면 문제는 목록의 길이이지, 정렬이 아니다

## 3. 들여쓰기

- 들여쓰기를 이용해서 **이름을 선언하는 범위 및 선언문과 실행문을 해석하는 범위를 표시**한다
- 짧은 if, while문도 들여쓰기를 넣자

## 4. 가짜 범위

- 빈 while문이나 for문을 사용할 경우에는 세미콜론(;)을 새로운 행에 제대로 넣어준다.

```ts
while (dis.read(buf, 0, readBufferSize)) != -1)
;
```

# 팀 규칙

팀 규칙을 정해서 모든 파일들의 코드들을 일관성있게 작성하자

코드를 읽는 개발자가 보다 쉽게 읽을 수 있으며, 다른 파일에서도 같은 형식이 반복될것이라는 신뢰성을 줄 수 있다

# ✏️ Discussion

- 어떤 함수가 다른 함수를 호출 할 때,
    - 호출한 함수 → 호출되는 함수
    - 호출되는 함수 → 호출한 함수
    
    어떤 코드를 배치 더 선호하는 지 (이 두 함수를 고차원 → 저차원이라고 말 할수있나??)
    
- 코드를 작성할 때 특히 고려하는 형식이 있는지