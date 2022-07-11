# 주석

주석을 최소화하는 방향으로 코드를 짜는 것이 우선되어야 한다.

→ 주석을 달지 않아도 동작이나 의도가 명백한 코드; clean code

# 주석은 나쁜 코드를 보완하지 못한다,
코드로 의도를 표현하라!

코드에 주석 추가? 코드 품질이 나쁘니까.

> *자신이 저지른 난장판을 주석으로 설명하려 애쓰는 대신에 그 난장판을 깨끗이 치우는 데 시간을 보내라!*
> 

### 비교해봅시다

```tsx
//복지 혜택 자격이 있는 직원인지 검사
if((employee.flags & HOURLY_FLAG) 
    && (employee.age > 65))
```

```tsx
if(employee.isEligibleForFullBenefits())
```

주석을 달 필요가 없는 코드!!

# 좋은 주석

## 법적인 주석

저작권 && 소유권

ex) 표준 라이선스

## 정보를 제공하는 주석

함수 이름을 더 명시적인 방향으로 변경하거나, 클래스를 사용하여 표현하는게 베스트!

```tsx
// kk:mm:ss EEE, MMM dd, yyyy 형식이다.
const timeMatcher: Pattern = new RegExp('\\d*:\\d*:\\d* \\w*, \\w* \\d*, \\d*')
```

## 의도를 설명하는 주석

단순히 코드의 구조와 동작을 이해하는 것을 넘어서, 결정에 깔린 의도를 설명한다면?

```tsx
function compareTo(o: Object): number {
    if (typeof o === typeof WikiPagePath){
        const p: WikiPagePath = WikiPagePath(o)
        compressedName: string = names.join("")
        compressedArgumentName: string = p.names.join("")
        return compressedName.compareTo(compressedArgumentName)
    }
    return 1; // 오른쪽 유형이므로 정렬 순위가 더 높다
}
```

## 의미를 명료하게 밝히는 주석

모호한 인수나 반환값은 그 의미를 읽기 좋게 표현하면 이해하기 쉬워진다.

특히, 모호한 인수나 반환값이 내가 변경하지 못하는 다른 라이브러리에서 오는 경우!

```tsx
assertTrue(a.compareTo(b) < 0); // a < b
```

## 결과를 경고하는 주석

특정 테스트 케이스를 꺼야 하는 경우, 함수 반환값 등의 사용에 제한이 필요한 경우

```tsx
static makeStandardHttpDateFormat(): SimpleDateFormat {
    // SimpleDateFormat은 스레드에 안전하지 못하다.
    // 따라서 각 인스턴스를 독립적으로 생성해야 한다.
    const df: SimpleDateFormat = new SimpleDateFormat('EEE, dd MMM YYYY HH:mm:ss z')
    df.setTimeZone(TimeZone.getTimeZone('GMT'))
    return df
}
```

## Todo 주석

앞으로 해야 할 것, 고민 사항 등을 남기는 용도.

주기적인 점검 및 삭제가 필요하다.

```tsx
//Todo-MdM 현재 필요하지 않다.
// 체크아웃 모델을 도입하면 함수가 필요 없다.
makeVersion(): VersionInfo | null {
	return null;
}
```

## 중요성을 강조하는 주석

자칫 대수롭지 않다고 여겨질 무언가의 중요성을 강조하기 위해서

```tsx
const listItemContent: string = match.group(3).trim()
// 여기서 trim은 정말 중요하다. trim 함수는 문자열에서 시작 공백을 제거한다.
// 문자열에 시작 공백이 있으면 다른 문자열로 인식되기 때문이다.
new ListItemWidget(this, listItemContent, this.level + 1)
return buildList(text.substring(match.end()))
```

## 공개 API

주석이 그릇된 정보를 전달하지 않도록 조심해야 한다.

javadocs, swagger, index.d.ts

# 나쁜 주석

- 버전 관리 도구 사용 가능한 경우
    - 저자 표시용 주석
    - 이력 기록용 주석
- 별 의미가 없는 주석
    - 주절주절 주석: 정보 부정확
    - 같은 이야기 중복: 이미 코드만으로 충분
    - 의무적으로 다는 주석: 모든 함수 및 변수에 주석을 달아야 한다는 규칙
    - 있으나 마나 주석: 너무 당연한 사실을 언급
    - 위치 표시용 주석: 가독성 침해
- 수정 or 삭제가 필요한 주석
    - 오해할 여지가 있는 주석: 로직을 엄밀하게 기술하지 않아 차후 실수를 유발할 수 있는 경우
    - 함수나 변수로 표현 가능한 주석: 고치자.
    - 닫는 괄호에 다는 주석: 반복문의 깊이가 깊다면 다른 함수로 빼자.
    - 코드 주석 처리: 혼란을 야기하므로 제때 지우자.
    - 너무 많은 정보: 핵심적인 것만
    - 모호한 관계
    
    ```tsx
    // 모든 픽셀을 담을 만큼 충분한 배열로 시작한다(여기에 필터 바이트를 더한다).
    // 그리고 헤더 정보를 위해 200바이트를 더한다.
    this.pngBytes = new byte[(this.width + 1) * this.height * 3 + 200]
    ```
    
    ⬇️
    
    ```tsx
    // 모든 픽셀을 담을 만큼 충분한 배열로 시작한다(필터 바이트 추가를 위해 width에 1을 더한다).
    // R,G,B 필터를 위해 필터 사이즈에 3을 곱한다.
    // 헤더 정보를 위해 200바이트를 더한다.
    this.pngBytes = new byte[(this.width + 1) * this.height * 3 + 200]
    ```
    
    - 전역 정보: 코드 일부에 주석을 달면서 그 내용이 시스템의 전반적인 정보인 경우

# 에라스토테네스의 체

```tsx
// 이 클래스는 영국으로부터 시작하여 27년간 어쩌구저쩌구
// 에라스토테네스의 삶은 참으로 기구하였는데 어쩌구저쩌구
// 알고리즘은 이러하다. ~~~

//@author SeHwan
//@version 13 Feb 2022 atp

export class GeneratePrimes {
		// maxValue는 소수를 찾아낼 최댓값
    static generatePrimes(maxValue: number): number[] {
        if (maxValue >= 2) { // 유일하게 유효한 경우
						// 선언
            const s: number = maxValue + 1
            const f: boolean[] = new Array(s).fill(true) // 배열 참으로 초기화
            let i: number
            let j: number
				
						// 소수가 아닌 알려진 숫자 제거
            f[0] = false
            f[1] = false

						// 체
            for (i = 2; i < Math.sqrt(s) + 1; i++) {
                if (f[i]) {
                    for (j = 2 * i; j < s; j += i) {
                        f[j] = false
                    }
                }
            }

						// 소수 개수는?
            let count: number = 0
            for (i = 0; i < s; i++) {
                f[i] && (count++)
            }

            const primes: number[] = new Array(count)

						// 소수를 결과 배열로 이동한다.
            for (i = 0, j = 0; i < s; i++) {
                f[i] && (primes[j++] = i) // 소수인 경우
            }

            return primes // 소수 반환
        }

        else { // maxValue < 2
            return [] // 입력이 잘못되면 비어 있는 배열을 반환한다
        }
    }
}
```

⬇️

```tsx
/**
 * 이 클래스는 사용자가 지정한 최댓값까지 소수를 구한다.
 * 알고리즘은 에라스토테네스의 체다.
 * 2에서 시작하는 정수 배열을 대상으로 작업한다.
 * 처음으로 남아 있는 정수를 찾아 배수를 모두 제거한다.
 * 배열에 더 이상 배수가 없을 때까지 반복한다.
 */

export class PrimeGenerator {
    private static crossedOut: boolean[]
    private static result: number[]

    static generatePrimes(maxValue: number): number[] {
        if (maxValue < 2) {
            return []
        }
        else {
            this.uncrossIntegersUpTo(maxValue);
            this.crossOutMultiples();
            this.putUncrossedIntegersIntoResult();
            return this.result
        }
    }

    private static uncrossIntegersUpTo(maxValue: number): void {
        this.crossedOut = new Array(maxValue + 1).fill(false)
        this.crossedOut[0] = true
        this.crossedOut[1] = true
    }

    private static crossOutMultiples(): void {
        const limit: number = this.determineIterationLimit();
        for (let i = 2; i <= limit; i++) {
            if (this.notCrossed(i)) {
                this.crossOutMultiplesOf(i);
            }
        }
    }

    private static determineIterationLimit(): number {
        // 배열에 있는 모든 배수는 배열 크기의 제곱근보다 작은 소수의 인수다.
        // 따라서 이 제곱근보다 더 큰 숫자의 배수는 제거할 필요가 없다.
        const iterationLimit: number = Math.sqrt(this.crossedOut.length)
        return iterationLimit + 1
    }

    private static crossOutMultiplesOf(i: number): void {
        for (let multiple = 2 * i; multiple < this.crossedOut.length; multiple += i){
            this.crossedOut[multiple] = true
        }
    }

    private static notCrossed(i: number): boolean {
        return this.crossedOut[i] === false
    }

    private static putUncrossedIntegersIntoResult(): void {
        for (let j = 0, i = 2; i < this.crossedOut.length; i++) {
            if (this.notCrossed(i)) {
                this.result[j++] = i
            }
        }
    }
}
```

# Discussion

<aside>
💡 TODO 주석이 필요할까? TODO 주석의 대안은?
+주석을 달아야 하는 경우를 논의해서 프로젝트에 적용해보는건 어떨까요?

</aside>