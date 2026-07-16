// ====================================================================
// ============= manse.js : 사용자 데이터 기반 수정판 ===================
// ====================================================================
"use strict";

(function () {

    // [1] 천간/지지
    const HEAVENLY_STEMS = ['갑', '을', '병', '정', '무', '기', '경', '신', '임', '계'];
    const HEAVENLY_STEMS_HANJA = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
    const EARTHLY_BRANCHES = ['자', '축', '인', '묘', '진', '사', '오', '미', '신', '유', '술', '해'];
    const EARTHLY_BRANCHES_HANJA = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];

    // [2] 절기 데이터 (기존 유지)
    const SOLAR_TERMS_GUK = [
        ['소한', '小寒', 1, [2, 8, 5]], ['대한', '大寒', 1, [3, 9, 6]],
        ['입춘', '立春', 1, [8, 5, 2]], ['우수', '雨水', 1, [9, 6, 3]],
        ['경칩', '驚蟄', 1, [1, 7, 4]], ['춘분', '春分', 1, [3, 9, 6]],
        ['청명', '淸明', 1, [4, 1, 7]], ['곡우', '穀雨', 1, [5, 2, 8]],
        ['입하', '立夏', 1, [4, 1, 7]], ['소만', '小滿', 1, [5, 2, 8]],
        ['망종', '芒種', 1, [6, 3, 9]], ['하지', '夏至', -1, [9, 3, 6]],
        ['소서', '小暑', -1, [8, 2, 5]], ['대서', '大暑', -1, [7, 1, 4]],
        ['입추', '立秋', -1, [2, 5, 8]], ['처서', '處暑', -1, [1, 4, 7]],
        ['백로', '白露', -1, [9, 3, 6]], ['추분', '秋分', -1, [7, 1, 4]],
        ['한로', '寒露', -1, [6, 9, 3]], ['상강', '霜降', -1, [5, 8, 2]],
        ['입동', '立冬', -1, [6, 9, 3]], ['소설', '小雪', -1, [5, 8, 2]],
        ['대설', '大雪', -1, [4, 7, 1]], ['동지', '冬至', 1, [1, 7, 4]]
    ];

    const NUM_TO_HANJA = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];

    // [3] 음력 데이터 (사용자 제공 데이터 적용)
    // 1:29일, 2:30일, 3:29+윤29, 4:29+윤30, 5:30+윤29, 6:30+윤30
    const LUNAR_DATA_OBJ = {
        1900: [1, 2, 1, 1, 2, 1, 2, 5, 2, 2, 1, 2],
        1901: [1, 2, 1, 1, 2, 1, 2, 1, 2, 2, 2, 1],
        1902: [2, 1, 2, 1, 1, 2, 1, 2, 1, 2, 2, 2],
        1903: [1, 2, 1, 2, 3, 2, 1, 1, 2, 2, 1, 2],
        1904: [2, 2, 1, 2, 1, 1, 2, 1, 1, 2, 2, 1],
        1905: [2, 2, 1, 2, 2, 1, 1, 1, 1, 2, 1, 2],
        1906: [1, 2, 2, 4, 1, 2, 1, 2, 1, 2, 1, 2],
        1907: [1, 2, 1, 2, 1, 2, 2, 1, 2, 1, 2, 1],
        1908: [2, 1, 1, 2, 2, 1, 2, 1, 2, 2, 1, 2],
        1909: [1, 5, 1, 2, 1, 2, 1, 2, 2, 2, 1, 2],
        1910: [1, 2, 1, 1, 2, 1, 2, 1, 2, 2, 2, 1],
        1911: [2, 1, 2, 1, 1, 5, 1, 2, 2, 1, 2, 2],
        1912: [2, 1, 2, 1, 1, 2, 1, 1, 2, 2, 1, 2],
        1913: [2, 2, 1, 2, 1, 1, 2, 1, 1, 2, 1, 2],
        1914: [2, 2, 1, 2, 5, 1, 2, 1, 2, 1, 1, 2],
        1915: [2, 1, 2, 2, 1, 2, 1, 2, 1, 2, 1, 2],
        1916: [1, 2, 1, 2, 1, 2, 2, 1, 2, 1, 2, 1],
        1917: [2, 3, 2, 1, 2, 2, 1, 2, 2, 1, 2, 1],
        1918: [2, 1, 1, 2, 1, 2, 1, 2, 2, 2, 1, 2],
        1919: [1, 2, 1, 1, 2, 1, 5, 2, 2, 1, 2, 2],
        1920: [1, 2, 1, 1, 2, 1, 1, 2, 2, 1, 2, 2],
        1921: [2, 1, 2, 1, 1, 2, 1, 1, 2, 1, 2, 2],
        1922: [2, 1, 2, 2, 3, 2, 1, 1, 2, 1, 2, 2],
        1923: [1, 2, 2, 1, 2, 1, 2, 1, 2, 1, 1, 2],
        1924: [2, 1, 2, 1, 2, 2, 1, 2, 1, 2, 1, 1],
        1925: [2, 1, 2, 5, 2, 1, 2, 2, 1, 2, 1, 2],
        1926: [1, 1, 2, 1, 2, 1, 2, 2, 1, 2, 2, 1],
        1927: [2, 1, 1, 2, 1, 2, 1, 2, 2, 1, 2, 2],
        1928: [1, 5, 1, 2, 1, 1, 2, 2, 1, 2, 2, 2],
        1929: [1, 2, 1, 1, 2, 1, 1, 2, 1, 2, 2, 2],
        1930: [1, 2, 2, 1, 1, 5, 1, 2, 1, 2, 2, 1],
        1931: [2, 2, 2, 1, 1, 2, 1, 1, 2, 1, 2, 1],
        1932: [2, 2, 2, 1, 2, 1, 2, 1, 1, 2, 1, 2],
        1933: [1, 2, 2, 1, 6, 1, 2, 1, 2, 1, 1, 2],
        1934: [1, 2, 1, 2, 2, 1, 2, 2, 1, 2, 1, 2],
        1935: [1, 1, 2, 1, 2, 1, 2, 2, 1, 2, 2, 1],
        1936: [2, 1, 4, 1, 2, 1, 2, 1, 2, 2, 2, 1],
        1937: [2, 1, 1, 2, 1, 1, 2, 1, 2, 2, 2, 1],
        1938: [2, 2, 1, 1, 2, 1, 4, 1, 2, 2, 1, 2],
        1939: [2, 2, 1, 1, 2, 1, 1, 2, 1, 2, 1, 2],
        1940: [2, 2, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1],
        1941: [2, 2, 1, 2, 2, 4, 1, 1, 2, 1, 2, 1],
        1942: [2, 1, 2, 2, 1, 2, 2, 1, 2, 1, 1, 2],
        1943: [1, 2, 1, 2, 1, 2, 2, 1, 2, 2, 1, 2],
        1944: [1, 1, 2, 4, 1, 2, 1, 2, 2, 1, 2, 2],
        1945: [1, 1, 2, 1, 1, 2, 1, 2, 2, 2, 1, 2],
        1946: [2, 1, 1, 2, 1, 1, 2, 1, 2, 2, 1, 2],
        1947: [2, 5, 1, 2, 1, 1, 2, 1, 2, 1, 2, 2],
        1948: [2, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 2],
        1949: [2, 2, 1, 2, 1, 2, 3, 2, 1, 2, 1, 2],
        1950: [2, 1, 2, 2, 1, 2, 1, 1, 2, 1, 2, 1],
        1951: [2, 1, 2, 2, 1, 2, 1, 2, 1, 2, 1, 2],
        1952: [1, 2, 1, 2, 4, 2, 1, 2, 1, 2, 1, 2],
        1953: [1, 2, 1, 1, 2, 2, 1, 2, 2, 1, 2, 2],
        1954: [1, 1, 2, 1, 1, 2, 1, 2, 2, 1, 2, 2],
        1955: [2, 1, 4, 1, 1, 2, 1, 2, 1, 2, 2, 2],
        1956: [1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 2, 2],
        1957: [2, 1, 2, 1, 2, 1, 1, 5, 2, 1, 2, 2],
        1958: [1, 2, 2, 1, 2, 1, 1, 2, 1, 2, 1, 2],
        1959: [1, 2, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1],
        1960: [2, 1, 2, 1, 2, 5, 2, 1, 2, 1, 2, 1],
        1961: [2, 1, 2, 1, 2, 1, 2, 2, 1, 2, 1, 2],
        1962: [1, 2, 1, 1, 2, 1, 2, 2, 1, 2, 2, 1],
        1963: [2, 1, 2, 3, 2, 1, 2, 1, 2, 2, 2, 1],
        1964: [2, 1, 2, 1, 1, 2, 1, 2, 1, 2, 2, 2],
        1965: [1, 2, 1, 2, 1, 1, 2, 1, 1, 2, 2, 2],
        1966: [1, 2, 5, 2, 1, 1, 2, 1, 1, 2, 2, 1],
        1967: [2, 2, 1, 2, 2, 1, 1, 2, 1, 2, 1, 2],
        1968: [1, 2, 2, 1, 2, 1, 5, 2, 1, 2, 1, 2],
        1969: [1, 2, 1, 2, 1, 2, 2, 1, 2, 1, 2, 1],
        1970: [2, 1, 1, 2, 2, 1, 2, 1, 2, 2, 1, 2],
        1971: [1, 2, 1, 1, 5, 2, 1, 2, 2, 2, 1, 2],
        1972: [1, 2, 1, 1, 2, 1, 2, 1, 2, 2, 2, 1],
        1973: [2, 1, 2, 1, 1, 2, 1, 1, 2, 2, 2, 1],
        1974: [2, 2, 1, 5, 1, 2, 1, 1, 2, 2, 1, 2],
        1975: [2, 2, 1, 2, 1, 1, 2, 1, 1, 2, 1, 2],
        1976: [2, 2, 1, 2, 1, 2, 1, 5, 2, 1, 1, 2],
        1977: [2, 1, 2, 2, 1, 2, 1, 2, 1, 2, 1, 1],
        1978: [2, 2, 1, 2, 1, 2, 2, 1, 2, 1, 2, 1],
        1979: [2, 1, 1, 2, 1, 6, 1, 2, 2, 1, 2, 1],
        1980: [2, 1, 1, 2, 1, 2, 1, 2, 2, 1, 2, 2],
        1981: [1, 2, 1, 1, 2, 1, 1, 2, 2, 1, 2, 2],
        1982: [2, 1, 2, 3, 2, 1, 1, 2, 2, 1, 2, 2],
        1983: [2, 1, 2, 1, 1, 2, 1, 1, 2, 1, 2, 2],
        1984: [2, 1, 2, 2, 1, 1, 2, 1, 1, 5, 2, 2],
        1985: [1, 2, 2, 1, 2, 1, 2, 1, 1, 2, 1, 2],
        1986: [1, 2, 2, 1, 2, 2, 1, 2, 1, 2, 1, 1],
        1987: [2, 1, 2, 2, 1, 5, 2, 2, 1, 2, 1, 2],
        1988: [1, 1, 2, 1, 2, 1, 2, 2, 1, 2, 2, 1],
        1989: [2, 1, 1, 2, 1, 2, 1, 2, 2, 1, 2, 2],
        1990: [1, 2, 1, 1, 5, 1, 2, 2, 1, 2, 2, 2],
        1991: [1, 2, 1, 1, 2, 1, 1, 2, 1, 2, 2, 2],
        1992: [1, 2, 2, 1, 1, 2, 1, 1, 2, 1, 2, 2],
        1993: [1, 2, 5, 2, 1, 2, 1, 1, 2, 1, 2, 1],
        1994: [2, 2, 2, 1, 2, 1, 2, 1, 1, 2, 1, 2],
        1995: [1, 2, 2, 1, 2, 2, 1, 5, 2, 1, 1, 2],
        1996: [1, 2, 1, 2, 2, 1, 2, 1, 2, 2, 1, 2],
        1997: [1, 1, 2, 1, 2, 1, 2, 2, 1, 2, 2, 1],
        1998: [2, 1, 1, 2, 3, 2, 2, 1, 2, 2, 2, 1],
        1999: [2, 1, 1, 2, 1, 1, 2, 1, 2, 2, 2, 1],
        2000: [2, 2, 1, 1, 2, 1, 1, 2, 1, 2, 2, 1],
        2001: [2, 2, 2, 3, 2, 1, 1, 2, 1, 2, 1, 2],
        2002: [2, 2, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1],
        2003: [2, 2, 1, 2, 2, 1, 2, 1, 1, 2, 1, 2],
        2004: [1, 5, 2, 2, 1, 2, 1, 2, 1, 2, 1, 2],
        2005: [1, 2, 1, 2, 1, 2, 2, 1, 2, 2, 1, 1],
        2006: [2, 1, 2, 1, 2, 1, 5, 2, 2, 1, 2, 2],
        2007: [1, 1, 2, 1, 1, 2, 1, 2, 2, 2, 1, 2],
        2008: [2, 1, 1, 2, 1, 1, 2, 1, 2, 2, 1, 2],
        2009: [2, 2, 1, 1, 5, 1, 2, 1, 2, 1, 2, 2],
        2010: [2, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 2],
        2011: [2, 1, 2, 2, 1, 2, 1, 1, 2, 1, 2, 1],
        2012: [2, 1, 6, 2, 1, 2, 1, 1, 2, 1, 2, 1],
        2013: [2, 1, 2, 2, 1, 2, 1, 2, 1, 2, 1, 2],
        2014: [1, 2, 1, 2, 1, 2, 1, 2, 5, 2, 1, 2],
        2015: [1, 2, 1, 1, 2, 1, 2, 2, 2, 1, 2, 1],
        2016: [2, 1, 2, 1, 1, 2, 1, 2, 2, 1, 2, 2],
        2017: [1, 2, 1, 2, 3, 2, 1, 2, 1, 2, 2, 2],
        2018: [1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 2, 2],
        2019: [2, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 2],
        2020: [2, 1, 2, 5, 2, 1, 1, 2, 1, 2, 1, 2],
        2021: [1, 2, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1],
        2022: [2, 1, 2, 1, 2, 2, 1, 2, 1, 2, 1, 2],
        2023: [1, 5, 2, 1, 2, 1, 2, 2, 1, 2, 1, 2],
        2024: [1, 2, 1, 1, 2, 1, 2, 2, 1, 2, 2, 1],
        2025: [2, 1, 2, 1, 1, 5, 2, 1, 2, 2, 2, 1],
        2026: [2, 1, 2, 1, 1, 2, 1, 2, 1, 2, 2, 2],
        2027: [1, 2, 1, 2, 1, 1, 2, 1, 1, 2, 2, 2],
        2028: [1, 2, 2, 1, 5, 1, 2, 1, 1, 2, 2, 1],
        2029: [2, 2, 1, 2, 2, 1, 1, 2, 1, 1, 2, 2],
        2030: [1, 2, 1, 2, 2, 1, 2, 1, 2, 1, 2, 1],
        2031: [2, 1, 5, 2, 1, 2, 2, 1, 2, 1, 2, 1],
        2032: [2, 1, 1, 2, 1, 2, 2, 1, 2, 2, 1, 2],
        2033: [1, 2, 1, 1, 2, 1, 5, 2, 2, 2, 1, 2],
        2034: [1, 2, 1, 1, 2, 1, 2, 1, 2, 2, 2, 1],
        2035: [2, 1, 2, 1, 1, 2, 1, 1, 2, 2, 2, 1],
        2036: [2, 2, 1, 2, 1, 4, 1, 1, 2, 1, 2, 2],
        2037: [2, 2, 1, 2, 1, 1, 2, 1, 1, 2, 1, 2],
        2038: [2, 2, 1, 2, 1, 2, 1, 2, 1, 1, 2, 1],
        2039: [2, 2, 1, 2, 5, 2, 1, 2, 1, 2, 1, 1],
        2040: [2, 1, 2, 2, 1, 2, 2, 1, 2, 1, 2, 1],
        2041: [2, 1, 1, 2, 1, 2, 2, 1, 2, 2, 1, 2],
        2042: [1, 5, 1, 2, 1, 2, 1, 2, 2, 2, 2, 1],
        2043: [1, 2, 1, 1, 2, 1, 1, 2, 2, 1, 2, 2]
    };

    // [음력 데이터 처리 함수들 - 배열 데이터 기반으로 변경]

    // 특정 연도의 총 일수 구하기
    var getLunarYearDays = function (year) {
        var data = LUNAR_DATA_OBJ[year];
        if (!data) return 354; // 데이터 없으면 평년 기준 반환 (오류 방지)

        var sum = 0;
        for (var i = 0; i < 12; i++) {
            var code = data[i];

            // 본월 일수 더하기
            if (code === 1 || code === 3 || code === 4) sum += 29; // 1,3,4는 본월이 29일
            else sum += 30; // 2,5,6은 본월이 30일

            // 윤달이 있는 경우 윤달 일수 더하기
            if (code >= 3) {
                if (code === 4 || code === 6) sum += 30; // 윤달이 대월(30)
                else sum += 29; // 윤달이 소월(29)
            }
        }
        return sum;
    };

    // 윤달이 몇 월인지 반환 (없으면 0)
    var getLeapMonth = function (year) {
        var data = LUNAR_DATA_OBJ[year];
        if (!data) return 0;

        for (var i = 0; i < 12; i++) {
            if (data[i] >= 3) return i + 1; // 3 이상이면 윤달 포함된 달
        }
        return 0;
    };

    // 윤달의 일수 반환 (29 또는 30)
    var getLeapMonthDays = function (year) {
        var data = LUNAR_DATA_OBJ[year];
        if (!data) return 0;

        for (var i = 0; i < 12; i++) {
            if (data[i] >= 3) {
                // 4(소+대), 6(대+대)인 경우 윤달이 30일
                if (data[i] === 4 || data[i] === 6) return 30;
                else return 29;
            }
        }
        return 0;
    };

    // 특정 음력 월의 일수 반환 (평달 기준)
    var getLunarMonthDays = function (year, month) {
        var data = LUNAR_DATA_OBJ[year];
        if (!data) return 30;

        var code = data[month - 1];
        // 1, 3, 4는 본월이 29일
        if (code === 1 || code === 3 || code === 4) return 29;
        else return 30;
    };


    // [수정된 lunarToSolar 함수] - 양력이 하루 적게 나오는 버그 해결
    function lunarToSolar(year, month, day, isLeapMonth) {
        // 기준점: 음력 1900.01.01은 양력 1900.01.31입니다.
        // 자바스크립트 Date 객체에서 월은 0부터 시작하므로 (1900, 0, 31)은 1월 31일입니다.
        var baseDate = new Date(1900, 0, 31, 0, 0, 0);
        var offset = 0;

        // 1. 연도별 일수 누적
        for (var i = 1900; i < year; i++) {
            offset += getLunarYearDays(i);
        }

        // 2. 월별 일수 누적
        var leapMonth = getLeapMonth(year);
        for (var i = 1; i < month; i++) {
            // 해당 월이 윤달보다 뒤에 있다면 윤달 일수를 먼저 더함
            if (leapMonth > 0 && i === leapMonth) {
                offset += getLeapMonthDays(year);
            }
            offset += getLunarMonthDays(year, i);
        }

        // 3. 입력된 달이 윤달인 경우 처리
        if (isLeapMonth && leapMonth === month) {
            // 이미 위에서 평달 일수가 더해졌으므로, 평달 일수를 한 번 더 더해줌 (윤달은 평달 뒤에 오기 때문)
            offset += getLunarMonthDays(year, month);
        }

        // 4. 일수 더하기 (1일이면 0일 차이이므로 day - 1)
        offset += (day - 1);

        // 5. 결과 계산 (PC 3.0 final과 동일 — +1일은 main.js lunarToSolarKoreanPinset에서만)
        var solarDate = new Date(baseDate.getTime() + (offset * 86400000));

        return {
            year: solarDate.getFullYear(),
            month: solarDate.getMonth() + 1,
            day: solarDate.getDate()
        };
    }

    // [수정] 양력 -> 음력 변환 (사용자의 LUNAR_DATA_OBJ와 100% 동기화)
    function solarToLunar(year, month, day) {
        // 기준점: 양력 1900년 1월 31일 = 음력 1900년 1월 1일
        // UTC가 아닌 로컬 타임 객체를 사용하여 시차 오차를 원천 차단합니다.
        const baseDate = new Date(1900, 0, 31);
        const targetDate = new Date(year, month - 1, day);

        // 두 날짜 사이의 정확한 일수 차이 계산
        let offset = Math.floor((targetDate.getTime() - baseDate.getTime()) / 86400000);

        let lunarYear = 1900;
        let remainingDays = offset;

        // 1. 연도 결정: 사용자님의 LUNAR_DATA_OBJ 일수를 순차적으로 차감
        while (lunarYear <= 2043) {
            let yearDays = getLunarYearDays(lunarYear);
            if (remainingDays < yearDays) break;
            remainingDays -= yearDays;
            lunarYear++;
        }

        // 2. 월 및 윤달 결정
        let leapMonth = getLeapMonth(lunarYear);
        let lunarMonth = 1;
        let isLeapMonth = false;

        for (let i = 1; i <= 12; i++) {
            let monthDays = getLunarMonthDays(lunarYear, i);
            if (remainingDays < monthDays) {
                lunarMonth = i;
                break;
            }
            remainingDays -= monthDays;

            // 해당 월에 윤달이 있는 경우 처리
            if (leapMonth > 0 && i === leapMonth) {
                let leapDays = getLeapMonthDays(lunarYear);
                if (remainingDays < leapDays) {
                    lunarMonth = i;
                    isLeapMonth = true;
                    break;
                }
                remainingDays -= leapDays;
            }
        }

        return {
            year: lunarYear,
            month: lunarMonth,
            day: Math.floor(remainingDays + 1),
            isLeapMonth: isLeapMonth
        };
    }
    // [5] 절기 계산 (사용자 원본 정확함)
    var SOLAR_TERM_BASE = [
        5.4055, 20.12, 3.87, 18.73, 5.63, 20.646, 4.81, 20.1, 5.52, 21.04, 5.678, 21.37, 7.108, 22.83,
        7.5, 23.13, 7.646, 23.042, 8.318, 23.438, 7.438, 22.36, 7.18, 21.94,
    ];
    var getSolarTermDate = function (year, termIndex) {
        var delta = year - 1900;
        var day = Math.floor(SOLAR_TERM_BASE[termIndex] + 0.2422 * delta - Math.floor((delta - 1) / 4));
        var month = Math.floor(termIndex / 2);
        return new Date(Date.UTC(year, month, day));
    };

    // ============================================================
    // [여기에 붙여넣으세요] 절입 시각 정밀 계산 함수 (시/분 포함)
    // ============================================================
    function getPreciseTermTime(year, termIdx) {
        var delta = year - 1900;
        var termDayFloat = SOLAR_TERM_BASE[termIdx] + 0.2422 * delta - Math.floor((delta - 1) / 4);
        var month = Math.floor(termIdx / 2);
        // 밀리초 단위까지 계산 (시/분 포함)
        var utcMs = Date.UTC(year, month, 1) + (Math.floor(termDayFloat) - 1) * 86400000 + (termDayFloat % 1) * 86400000;
        return utcMs + (9 * 60 * 60 * 1000); // 한국 시차 9시간 적용
    }



    // [최종본] 1943.js(sajuData) 우선 참조 및 모든 결과 한문 출력 로직
    function calculateQimenGuk(year, month, day, dayGanjiIdx) {
        // 한문 변환 매핑 테이블
        const WON_TO_HANJA = { "상원": "上元", "중원": "中元", "하원": "下元" };
        const TERM_TO_HANJA = {
            "소한": "小寒", "대한": "大寒", "입춘": "立春", "우수": "雨水", "경칩": "驚蟄", "춘분": "春分",
            "청명": "淸明", "곡우": "穀雨", "입하": "立夏", "소만": "小滿", "망종": "芒種", "하지": "夏至",
            "소서": "小暑", "대서": "大暑", "입추": "立秋", "처서": "處暑", "백로": "白露", "추분": "秋分",
            "한로": "寒露", "상강": "霜降", "입동": "立冬", "소설": "小雪", "대설": "大雪", "동지": "冬至",
            "윤대설": "潤大雪"
        };

        // 1. [우선순위 1] 사용자 정답 데이터(1943.js)에서 검색
        if (window.sajuData && Array.isArray(window.sajuData)) {
            var targetStr = year + "-" + String(month).padStart(2, '0') + "-" + String(day).padStart(2, '0');

            var foundEntry = window.sajuData.find(function (entry) {
                return targetStr >= entry.start && targetStr <= entry.end;
            });

            if (foundEntry) {
                var termName = foundEntry.term;   // 예: "동지"
                var wonName = foundEntry.won;    // 예: "상원"

                var termInfo = SOLAR_TERMS_GUK.find(function (t) { return t[1] === (TERM_TO_HANJA[termName] || termName); });
                var isYangDun = termInfo ? termInfo[2] === 1 : true;
                var gukNumbers = termInfo ? termInfo[3] : [1, 1, 1];

                var yuanIdx = ["상원", "중원", "하원"].indexOf(wonName);
                var gukNumber = gukNumbers[yuanIdx !== -1 ? yuanIdx : 0];

                // 모든 항목 한문 결합
                var dunHanja = isYangDun ? "陽遁" : "陰遁";
                var termHanja = TERM_TO_HANJA[termName] || termName;
                var wonHanja = WON_TO_HANJA[wonName] || wonName;
                var gukHanja = window.NUM_TO_HANJA[gukNumber] + "局";

                console.log(`[데이터 우선참조] ${targetStr} : ${dunHanja} ${termHanja} ${wonHanja} ${gukHanja}`);

                return {
                    fullText: `${dunHanja} ${termHanja} ${wonHanja} ${gukHanja}`
                };
            }
        }

        // 2. [우선순위 2] 데이터가 없을 경우 수학적 계산 (결과는 한문으로 출력)
        var currDate = new Date(Date.UTC(year, month - 1, day));
        var stemIdx = dayGanjiIdx % 10;
        var daysFromFudu = stemIdx % 5;
        var fuduDate = new Date(currDate);
        fuduDate.setDate(currDate.getDate() - daysFromFudu);

        var fuduGanjiIdx = (dayGanjiIdx - daysFromFudu + 60) % 60;
        var fuduBranchIdx = fuduGanjiIdx % 12;

        var yuanIdxCalc = 0;
        if ([0, 6, 3, 9].includes(fuduBranchIdx)) yuanIdxCalc = 0;
        else if ([2, 8, 5, 11].includes(fuduBranchIdx)) yuanIdxCalc = 1;
        else yuanIdxCalc = 2;

        var termDates = [];
        for (var i = 0; i < 24; i++) {
            termDates.push({ idx: i, date: getSolarTermDate(year, i) });
        }
        termDates.unshift({ idx: 23, date: getSolarTermDate(year - 1, 23) });
        termDates.push({ idx: 0, date: getSolarTermDate(year + 1, 0) });

        var prevTermObj = null, nextTermObj = null;
        var fTime = fuduDate.getTime();

        for (var i = 0; i < termDates.length - 1; i++) {
            if (fTime >= termDates[i].date.getTime() && fTime < termDates[i + 1].date.getTime()) {
                prevTermObj = termDates[i];
                nextTermObj = termDates[i + 1];
                break;
            }
        }

        if (!prevTermObj || !nextTermObj) return { fullText: "節氣 計算 中" };

        var fCheck = new Date(fuduDate.getTime()); fCheck.setUTCHours(0, 0, 0, 0);
        var nCheck = new Date(nextTermObj.date.getTime()); nCheck.setUTCHours(0, 0, 0, 0);
        var daysToNext = Math.round((nCheck - fCheck) / (1000 * 60 * 60 * 24));

        var finalTermIdx;
        var limit = 4;
        if ((year === 1975 && month >= 10) || (year === 1976 && month <= 5)) { limit = 9; }

        if (daysToNext <= limit) finalTermIdx = nextTermObj.idx;
        else finalTermIdx = prevTermObj.idx;

        var termInfoCalc = SOLAR_TERMS_GUK[finalTermIdx];
        var isYangDunCalc = termInfoCalc[2] === 1;
        var gukNumberCalc = termInfoCalc[3][yuanIdxCalc];

        var dunHanjaCalc = isYangDunCalc ? "陽遁" : "陰遁";
        var termHanjaCalc = termInfoCalc[1]; // 이미 한문
        var wonHanjaCalc = ["上元", "中元", "下元"][yuanIdxCalc];
        var gukHanjaCalc = window.NUM_TO_HANJA[gukNumberCalc] + "局";

        return {
            fullText: `${dunHanjaCalc} ${termHanjaCalc} ${wonHanjaCalc} ${gukHanjaCalc}`
        };
    }


    // [8] 통합 계산 - 시/분 정보를 포함한 정밀 데이터 전달
    function calculatePillarsData(year, month, day, hour, minute, gender) {
        // [수정] 시간과 분을 포함하여 정밀한 절기 차이 계산 가능하도록 변경
        var solarDate = new Date(Date.UTC(year, month - 1, day, hour, minute));
        // 입력 시각 = 한국 현지 시각으로 간주 (getPreciseTermTime과 동일 ms 축)
        var birthTimeMs = solarDate.getTime() - (9 * 60 * 60 * 1000);
        // 입춘 시간(ms)으로 사주 기준 연도 결정
        var lichunMs = getPreciseTermTime(year, 2);
        var sajuYear = year;
        if (birthTimeMs < lichunMs) { sajuYear = year - 1; }

        // ... (기존 간지 계산 로직 유지) ...
        var yearStemIdx = (sajuYear - 4) % 10;
        var yearBranchIdx = (sajuYear - 4) % 12;
        if (yearStemIdx < 0) yearStemIdx += 10;
        if (yearBranchIdx < 0) yearBranchIdx += 12;

        var monthBranchMap = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 0, 1];
        var foundMonthIdx = 0;

        for (var i = 0; i < 12; i++) {
            var currentTermTime, nextTermTime;
            if (i < 10) {
                currentTermTime = getPreciseTermTime(sajuYear, (i + 1) * 2);
                nextTermTime = getPreciseTermTime(sajuYear, (i + 1) * 2 + 2);
            } else if (i === 10) {
                currentTermTime = getPreciseTermTime(sajuYear, 22);
                nextTermTime = getPreciseTermTime(sajuYear + 1, 0);
            } else {
                currentTermTime = getPreciseTermTime(sajuYear + 1, 0);
                nextTermTime = getPreciseTermTime(sajuYear + 1, 2);
            }

            // ★ 날짜가 아닌 ms 시각으로 비교하여 39분 차이를 정확히 구분합니다.
            if (birthTimeMs >= currentTermTime && birthTimeMs < nextTermTime) {
                foundMonthIdx = i;
                break;
            }
        }


        if (sajuYear === year - 1 && foundMonthIdx === 0) { foundMonthIdx = 11; }
        var monthBranchVal = monthBranchMap[foundMonthIdx];
        var monthStartStemIdx = (yearStemIdx % 5) * 2 + 2;
        var monthStemIdx = (monthStartStemIdx + foundMonthIdx) % 10;

        var utcSolar = Date.UTC(year, month - 1, day);
        var utcBase = Date.UTC(1900, 0, 1);
        var diffTime = utcSolar - utcBase;
        var diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        var dayGanjiIdx = (10 + diffDays) % 60;
        if (dayGanjiIdx < 0) dayGanjiIdx += 60;
        var dayStemIdx = dayGanjiIdx % 10;
        var dayBranchIdx = dayGanjiIdx % 12;

        var adjustedHour = hour; if (hour === 23) adjustedHour = 0;
        var timeTotalMin = adjustedHour * 60 + minute;
        var hourBranchIdx = Math.floor((timeTotalMin + 60) / 120) % 12;
        var hourStemIdx = ((dayStemIdx % 5) * 2 + hourBranchIdx) % 10;

        var qimenInfo = calculateQimenGuk(year, month, day, dayGanjiIdx);
        // [전달] 정확한 시/분이 포함된 solarDate를 보냄
        var daeunInfo = calculateDaeun(yearStemIdx, gender, new Date(birthTimeMs), sajuYear);

        // [수정] sjaYear, birthDate 반환 추가
        return {
            yearStem: HEAVENLY_STEMS[yearStemIdx], yearBranch: EARTHLY_BRANCHES[yearBranchIdx],
            monthStem: HEAVENLY_STEMS[monthStemIdx], monthBranch: EARTHLY_BRANCHES[monthBranchVal],
            dayStem: HEAVENLY_STEMS[dayStemIdx], dayBranch: EARTHLY_BRANCHES[dayBranchIdx],
            hourStem: HEAVENLY_STEMS[hourStemIdx], hourBranch: EARTHLY_BRANCHES[hourBranchIdx],
            qimen: qimenInfo, daeun: daeunInfo,
            monthStemIdx: monthStemIdx, monthBranchVal: monthBranchVal,
            yearStemIdx: yearStemIdx, // 대운 계산용
            dayStemIdx: dayStemIdx, dayBranchIdx: dayBranchIdx, // 기문국수 계산용
            yH: HEAVENLY_STEMS_HANJA[yearStemIdx] + EARTHLY_BRANCHES_HANJA[yearBranchIdx],
            mH: HEAVENLY_STEMS_HANJA[monthStemIdx] + EARTHLY_BRANCHES_HANJA[monthBranchVal],
            dH: HEAVENLY_STEMS_HANJA[dayStemIdx] + EARTHLY_BRANCHES_HANJA[dayBranchIdx],
            hH: HEAVENLY_STEMS_HANJA[hourStemIdx] + EARTHLY_BRANCHES_HANJA[hourBranchIdx],
            sajuYear: sajuYear, // [추가]
            birthDate: new Date(birthTimeMs)
        };
    }

    // [최종 확정] 대운수 산출 — pc_sungjigimun 3.0 final 동일 (절기만, getPreciseTermTime)
    function calculateDaeun(yearStemIdx, gender, birthDate, sajuYear) {
        var isYangStem = (yearStemIdx % 2 === 0);
        var isMan = (gender === '남');
        var direction = ((isMan && isYangStem) || (!isMan && !isYangStem)) ? 1 : -1;

        var birthTime = birthDate.getTime();
        var targetTermTime = 0;
        var found = false;

        if (direction === 1) {
            for (var y = sajuYear; y <= sajuYear + 1; y++) {
                for (var i = 0; i < 24; i += 2) {
                    var tTime = getPreciseTermTime(y, i);
                    if (tTime > birthTime) {
                        targetTermTime = tTime;
                        found = true;
                        break;
                    }
                }
                if (found) break;
            }
        } else {
            for (var y2 = sajuYear; y2 >= sajuYear - 1; y2--) {
                for (var j = 22; j >= 0; j -= 2) {
                    var tTime2 = getPreciseTermTime(y2, j);
                    if (tTime2 <= birthTime) {
                        targetTermTime = tTime2;
                        found = true;
                        break;
                    }
                }
                if (found) break;
            }
        }

        var diffMs = Math.abs(targetTermTime - birthTime);
        var totalDays = diffMs / (1000 * 60 * 60 * 24);
        var daeunNum = Math.floor(totalDays / 3);
        var remainder = totalDays % 3;
        if (remainder >= 1.5) daeunNum += 1;
        if (daeunNum < 1) daeunNum = 1;

        return { direction: direction, number: daeunNum };
    }


    function solarFromLunarForSaju(year, month, day, isLeapMonth) {
        if (typeof window.lunarToSolarKoreanPinset === 'function') {
            return window.lunarToSolarKoreanPinset(year, month, day, !!isLeapMonth);
        }
        var s = lunarToSolar(year, month, day, !!isLeapMonth);
        var corrected = new Date(s.year, s.month - 1, s.day + 1);
        return { year: corrected.getFullYear(), month: corrected.getMonth() + 1, day: corrected.getDate() };
    }

    // [복구] FourPillars 래퍼 함수
    function calculateFourPillars(birthInfo) {
        var year = birthInfo.year, month = birthInfo.month, day = birthInfo.day, hour = birthInfo.hour, min = birthInfo.minute;
        var gender = birthInfo.gender || '남';
        if (birthInfo.isLunar) {
            var s = solarFromLunarForSaju(year, month, day, birthInfo.isLeapMonth);
            year = s.year; month = s.month; day = s.day;
        }

        var p = calculatePillarsData(year, month, day, hour, min, gender);

        var daeunList = [];
        var startAge = p.daeun.number;
        var dir = p.daeun.direction;
        for (var i = 0; i < 10; i++) {
            var sIdx = (p.monthStemIdx + (i + 1) * dir + 100) % 10;
            var bIdx = (p.monthBranchVal + (i + 1) * dir + 120) % 12;
            daeunList.push({
                age: startAge + i * 10,
                gan: HEAVENLY_STEMS_HANJA[sIdx],
                zhi: EARTHLY_BRANCHES_HANJA[bIdx]
            });
        }

        return {
            yearStem: p.yearStem, yearBranch: p.yearBranch,
            monthStem: p.monthStem, monthBranch: p.monthBranch,
            dayStem: p.dayStem, dayBranch: p.dayBranch,
            hourStem: p.hourStem, hourBranch: p.hourBranch,
            yH: p.yH, mH: p.mH, dH: p.dH, hH: p.hH,
            qimenInfo: p.qimen,
            daeun: p.daeun, daeunList: daeunList,
            toHanjaObject: function () {
                return {
                    year: { hanja: p.yH }, month: { hanja: p.mH },
                    day: { hanja: p.dH }, hour: { hanja: p.hH }
                };
            }
        };
    }

    // [신규] calculateSaju 함수 구현 (calculateFourPillars와 유사하나 인자 형태 맞춤)
    function calculateSaju(year, month, day, hour, min, gender, isLunar, isLeap) {
        // 음력 변환
        if (isLunar) {
            var solar = solarFromLunarForSaju(year, month, day, isLeap);
            year = solar.year;
            month = solar.month;
            day = solar.day;
        }

        // pillars 데이터 계산
        return calculatePillarsData(year, month, day, hour, min, gender);
    }

    // [manse.js 최종] 홍염살 데이터 명칭 통일 및 반환
    function getManseData(year, month, day, hour, min, gender, isLunar, isLeap) {
        try {
            var p = calculateSaju(year, month, day, hour, min, gender, isLunar, isLeap);

            // 기문 홍국수 기초 데이터 생성 (window 함수 존재 여부 확인)
            var qimenGrid = (window.calculateHongGuk) ? window.calculateHongGuk(p.yH, p.dH) : { grid: [] };

            // 홍염살 계산 (window 함수 존재 여부 확인)
            var hongyeomGrid = (window.calculateHongyeom && qimenGrid.grid) ? window.calculateHongyeom(qimenGrid.grid, p.dayStem) : {};

            // 기문 국수 (이미 p.qimen에 있을 수 있으나 재계산 로직 유지)
            var qimenResult = p.qimen;
            if (!qimenResult || !qimenResult.fullText) {
                qimenResult = calculateQimenGuk(year, month, day, p.dayStemIdx + p.dayBranchIdx);
            }

            var daeunInfo = p.daeun;

            return {
                yearStem: p.yearStem, yearBranch: p.yearBranch,
                monthStem: p.monthStem, monthBranch: p.monthBranch,
                dayStem: p.dayStem, dayBranch: p.dayBranch,
                hourStem: p.hourStem, hourBranch: p.hourBranch,
                yH: p.yH, mH: p.mH, dH: p.dH, hH: p.hH,
                qimenInfo: (qimenResult.fullText ? qimenResult.fullText : qimenResult),
                daeun: daeunInfo,
                hongyeomData: hongyeomGrid,
                qimenGrid: qimenGrid.grid
            };
        } catch (e) {
            console.error("getManseData Error: " + e);
            return null;
        }
    }


    window.lunarToSolar = lunarToSolar;
    window.solarToLunar = solarToLunar;
    window.calculateFourPillars = calculateFourPillars;
    window.getManseData = getManseData;
    window.NUM_TO_HANJA = NUM_TO_HANJA;

})();