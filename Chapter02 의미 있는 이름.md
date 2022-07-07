# Chapter02. 의미 있는 이름

> [@minseo999](https://github.com/minseo999), 2022-07-02
>

이번 장에서는 이름을 잘 짓는 간단한 규칙을 소개한다.


## 의도를 분명히 밝혀라

- 변수, 함수, 클래스 이름은 주석 없이 다음의 질문에 답할 수 있어야한다.
    - 존재 이유는?
    - 수행 기능은?
    - 사용 방법은?
- 의도가 드러나는 이름을 사용하면 코드 이해와 변경이 쉬워진다.
    - 코드 맥락이 코드 자체에 명시적으로 드러나지 않는다.

    ```tsx
    function getThem(): Array<number[]> {
    	var list1: Array<number[]>;
    	for (let x of theList){
    		if(x[0] === 4){
    			list1.push(x);
    		}
    	}
    	return list1;
    }
    ```

    - 각 개념에 이름만 붙여도 코드가 나아진다.

    ```tsx
    function getFlaggedCells(): Array<number[]>{
    	var flaggedCells: Array<number[]>;
    	for (let cell of gameBoard){
    		if(cell[STATUS_VALUE] === FLAGGED){
    			flaggedCells.push(cell);
    		}
    	}
    	return flaggedCells;
    }

    ```

    - 배열대신 클래스를 사용하고 명시적인 함수를 사용해 상수를 감춰보자.

    ```tsx
    function getFlaggedCells(): Array<Cell>{
    	var flaggedCells: Array<Cell>;
    	for (let cell of gameBoard) {
    		if(cell.isFlagged())
    			flaggedCells.push(cell);
    	}
    	return flaggedCells;
    }
    ```


## 그릇된 정보를 피하라

- 널리 쓰이는 의미가 있는 단어를 다른 의미로 사용하면 안된다.
    - cnt, idx를 count나 index를 의미하지않는 변수 이름으로 적합하지 않다.
    - 실제 변수 타입이 List가 아니라면 `accountList` 등으로 명명하지 않는다.
        - 대신 `accountGroup`, `Accounts` 등으로 명명하는 것이 좋다.
- 서로 흡사한 이름을 사용하지 않도록 주의한다.
    - ex) `ControllerForHandlingOfStrings` vs `ControllerForStorageOfStrings`
- 대문자 O와 숫자 0, 소문자 L과 숫자 1은 이름으로 혼란을 준다.

## 의미 있게 구분하라

- 컴파일러를 통과할지라도 숫자를 덧붙이거나 noise word를 추가하는 방식은 부적절하다.
    - 숫자를 덧붙이는 경우

    ```tsx
    function copyNums(a1: number[], a2: number[]){
    	for(let i=0; i<a1.length; i++{
    		a2[i] = a1[i];
    	}
    }
    ```

    - 인수 이름을 변경한다면 코드가 훨씬 더 읽기 쉬워진다.

    ```tsx
    function copyNums(source: number[], destination: number[]){
    	for(let i=0; i<source.length; i++{
    		destination[i] = source[i];
    	}
    }
    ```

    ---

    - noise word를 사용하는 경우
        - 클래스 이름 `Product` vs `ProductInfo` vs `ProductData`

            Info나 Data는 a, an, the와 마찬가지로 의미가 불분명한 noise word이다.


## 발음하기 쉬운 이름을 사용하라

- 프로그래밍은 사회 활동이다. 발음하기 어려운 이름은 토론하기도 어렵다.
    - `private Date genymdhms;`
    - `private Date generationTimestamp;`

## 검색하기 쉬운 이름을 사용하라

- 문자 하나를 사용하는 이름과 상수는 텍스트 코드에서 쉽게 눈에 띄지 않는다.
- 이런 관점에서 긴 이름이 짧은 이름보다 좋다.
    - 변수나 상수를 코드 여러 곳에서 사용한다면, 검색하기 쉬운 이름이 바람직하다.
- 아래 예시의 경우, `s`가 별로 유용하지 않지만 `s`를 `sum`으로 바꾸면 최소한 검색이 가능하다.

```tsx
for (let j=0; i<34; j++){
	s += (t[j]*4)/5;
}
```

## 클래스, 객체 이름

- 명사나 명사구가 적합하다.
- 동사는 사용하지 않는다.
- 좋은 예
    - Customer
    - Account
    - AddressParser

## 메서드 이름

- 동사나 동사구가 적합하다.
- 좋은 예
    - postOOO, deleteOOO, saveOOO
    - getOOO, setOOO, isOOO

## 한 개념에 한 단어를 사용하라

- 추상적인 개념 하나에 단어 하나를 선택해 이를 고수한다.
    - 여러가지 get 메서드들에 다음의 용어들을 섞어서 사용하지 않아야한다.
        - get, fetch, retrieve, search

## 의미 있는 맥락을 추가하라

- 맥락이 불분명한 변수
    - 독자가 함수를 끝까지 읽고 함수의 역할을 추측해야한다.

    ```tsx
    function printGuessStatistics(candidate: string, count: number) {
    	var num: string;
    	var verb: string;
    	var pluralModifier: string;

    	if(count===0) {
    		num="no";
    		verb = "are";
    		pluralModifier="s";
    	} else if(count===1) {
    		num="1";
    		verb = "is";
    		pluralModifier="";
    	} else {
    		num = count.toString();
    		verb = "are";
    		pluralModifier = "s";
    	}

    	let guessMessage: string = "There "+verb+" "+num+" "+candidate+pluralModifier;
    	console.log(guessMessage);
    }
    ```

- 맥락이 분명한 함수
    - `GuessStatisticsMessage` 클래스를 만들어 변수에 맥락을 부여한다.

    ```tsx
    class GuessStaitsticsMessage {
    	private num: string;
    	private verb: string;
    	private pluralModifier: string;

    	make(candidate: string, count: number): string{
    		createPluralDependentMessageParts(count);
    		return "There "+verb+" "+num+" "+candidate+pluralModifier;
    	}

    	private createPluralDependentMessageParts(count: number) {
    		if(count===0) {
    			num ="no";
    			verb = "are";
    			pluralModifier="s";
    		} else if(count===1) {
    			num ="1";
    			verb = "is";
    			pluralModifier="";
    		} else {
    			num = count.toString();
    			verb = "are";
    			pluralModifier = "s";
    		}
    	}

    	...
    }
    ```


## 발제

- 팀에서 정한 네이밍 컨벤션을 따라 축약어 등을 사용해 코드(변수, 메서드 이름)의 길이를 줄이기 vs 그래도 축약어는 사용하지 않는 것이 좋겠다.