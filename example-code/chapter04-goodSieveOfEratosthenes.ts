/**
 * 이 클래스는 사용자가 지정한 최댓값까지 소수를 구한다.
 * 알고리즘은 에라스토테네스의 체다.
 * 2에서 시작하는 정수 배열을 대상으로 작업한다.
 * 처음으로 남아 있는 정수를 찾아 배수를 모두 제거한다.
 * 배열에 더 이상 배수가 없을 때까지 반복한다.
 */

export class PrimeGenerator {
    private static crossedOut: boolean[]
    private static result: number[] = []

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
        this.crossedOut = Array(maxValue + 1).fill(false)
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
        for (let i = 2; i < this.crossedOut.length; i++) {
            if (this.notCrossed(i)) {
                this.result = [...this.result, i]
            }
        }
    }
}

console.log(PrimeGenerator.generatePrimes(10000))
