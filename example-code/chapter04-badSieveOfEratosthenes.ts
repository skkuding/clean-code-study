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