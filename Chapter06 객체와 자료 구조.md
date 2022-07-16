# Chapter06. 객체와 자료구조

> [@goo314](https://github.com/goo314), 2022-07-16

## 자료 추상화

- 자료를 세세하게 공개하기보다는 추상적인 개념으로 표현하는 편이 더 좋다.

```typescript
// 6-2와 6-4가 더 좋다.

// [6-1] 구현을 노출한다.
class Point {
  x: number;
  y: number;
}

// [6-2] 클래스 메서드가 접근 정책을 강제한다.
interface Point {
    getX(void): number;
    getY(void): number;
    setCartesian(x: number, y: number): void;
    getR(void): number;
    getTheta(void): number;
    setPolar(r: number, theta: number): void;
}

// [6-3] 두 함수가 변수값을 읽어 반환할 뿐이라는 사실이 거의 확실하다.
interface Vehicle {
    getFuelTankCapacityInCallons(void): number;
    getCallonsOfGasoline(voie): number;
}

// [6-4] 정보가 어디서 오는지 전혀 드러나지 않는다.
interface Vehicle {
    getPercentFuelRemaining(void): number;
}
```

## 자료/객체 비대칭

- 객체는 추상화 뒤로 자료를 숨긴 채 자료를 다루는 함수만 공개한다.
- 자료 구조는 자료를 그대로 공개하며 별다른 함수는 제공하지 않는다.
- 객체 지향 코드에서 어려운 변경은 절차적인 코드에서 쉬우며, 절차적인 코드에서 어려운 변경은 객체 지향 코드에서 쉽다.
  > 절차적인 코드는 기존 자료 구조를 변경하지 않으면서 새 함수를 추가하기 쉽다. 반면, 객체 지향 코드는 기존 함수를 변경하지 않으면서 새 클래스를 추가하기 쉽다.

```typescript
// [6-5] 절차적인 도형
// 각 도형 클래스는 간단한 자료 구조이고 도형이 동작하는 방식은 Geometry 클래스에서 구현한다.
class Square {
    public topLeft: Point;
    public side: number;
}

...

class Geometry {
    public PI: number = 3.141592653589793;
    public area(shape : object) {
        if(shape instanceof Square) {
            s: Square = shape;
            return s.side * s.side
        }
        ...
    }
}


// [6-6] 다형적인 도형
class Square implements Shape {
    private topLeft: Point;
    private side: number;

    public area(): number {
        return side * side
    }
}
```

## 디미터 법칙

- 디미너 법칙은 잘 알려진 heuristic으로, 모듈은 자신이 조작하는 객체의 속사정을 몰라야 한다는 법칙이다.
- 객체는 조회 함수로 내부 구조를 공개하면 안된다는 의미이다.
- 클래스 C의 메서드 f는 다음과 같은 객체의 메서드만 호출해야 한다.
  - 클래스 C
  - f가 생성한 객체
  - f 인수로 넘어온 객체
  - C 인스턴스 변수에 저장된 객체
- _기차 충돌_
  - 여러 객차가 한 줄로 이어진 기차처럼 보이기 때문에 조잡하다.
    - `outputDir: string = ctxt.getOptions().getScratchDir().getAbsolutePath();` 👎
    - `opts: Options = ctxt.getOptions(); scratchDir: File = opts.getScratchDir(); outputDir: string = scratchDir.getAbsolutePath();`
    - 위 예제가 객체라면 내부 구조를 숨겨야 하므로 디미터 법칙을 위반하지만, 자료 구조라면 내부 구조를 노출하므로 디미터 법칙이 적용되지 않는다.
    - `outputDir: string = ctxt.options.scratchDir.absolutPath; `
- _잡종 구조_
  - 절반은 객체, 절반은 자료 구조인 잡종구조
  - 되도록 피하는 편이 좋다.
- _구조체 감추기_
  - ctxt가 객체라면 뭔가를 하라고 말해야지 속을 드러내라고 말하면 안된다.
  - `bos: BufferedOutputStream = ctxt.createScratchFileStream(classFileName);`

## 자료 전달 객체

- 자료 구조체의 전형적인 형태는 공개 변수만 있고 함수가 없는 클래스다.
- 자료 구조체를 때로는 자료 전달 객체 Data Transfer Object, DTO라고 한다.

```typescript
// [6-7] bean 구조
// 비공개 변수를 조회/설정 함수로 조작한다.
class Address {
  private street: string;
  private streetExtra: string;
  private city: string;
  private state: string;
  private zip: string;

  public Address(
    street: string,
    streetExtra: string,
    city: string,
    state: string,
    zip: string
  ) {
    this.street = street;
    this.streetExtra = streetExtra;
    this.city = city;
    this.state = state;
    this.zip = zip;
  }

  public getStreet(void) {
      return street
  }
  ...
}
```

- _활성 레코드_
  - 공개 변수가 있거나 비공개 변수에 조회/설정함수가 있는 자료구조지만, 대게 save나 find와 같은 탐색 함수도 제공한다.
  - 데이터베이스 테이블이나 다른 소스에서 자료를 직접 변환하는 결과다.
  - 활성 레코드는 자료 구조로 취급해 비즈니스 규칙을 담으면서 내부 자료를 숨기는 객체는 따로 생성한다.

## 결론

- 객체는 동작을 공개하고 자료를 숨긴다.
- 자료 구조는 별다른 동작 없이 자료를 노출한다.
