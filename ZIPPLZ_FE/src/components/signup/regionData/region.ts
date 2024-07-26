type RegionData = {
  sido_name: string;
  gugun_name: string;
};

type RegionResult = {
  sido: string;
  guguns: string[];
};
const data = [
  {
    sido_name: '서울',
    gugun_name: '강남구',
  },
  {
    sido_name: '서울',
    gugun_name: '강동구',
  },
  {
    sido_name: '서울',
    gugun_name: '강북구',
  },
  {
    sido_name: '서울',
    gugun_name: '강서구',
  },
  {
    sido_name: '서울',
    gugun_name: '관악구',
  },
  {
    sido_name: '서울',
    gugun_name: '광진구',
  },
  {
    sido_name: '서울',
    gugun_name: '구로구',
  },
  {
    sido_name: '서울',
    gugun_name: '금천구',
  },
  {
    sido_name: '서울',
    gugun_name: '노원구',
  },
  {
    sido_name: '서울',
    gugun_name: '도봉구',
  },
  {
    sido_name: '서울',
    gugun_name: '동대문구',
  },
  {
    sido_name: '서울',
    gugun_name: '동작구',
  },
  {
    sido_name: '서울',
    gugun_name: '마포구',
  },
  {
    sido_name: '서울',
    gugun_name: '서대문구',
  },
  {
    sido_name: '서울',
    gugun_name: '서초구',
  },
  {
    sido_name: '서울',
    gugun_name: '성동구',
  },
  {
    sido_name: '서울',
    gugun_name: '성북구',
  },
  {
    sido_name: '서울',
    gugun_name: '송파구',
  },
  {
    sido_name: '서울',
    gugun_name: '양천구',
  },
  {
    sido_name: '서울',
    gugun_name: '영등포구',
  },
  {
    sido_name: '서울',
    gugun_name: '용산구',
  },
  {
    sido_name: '서울',
    gugun_name: '은평구',
  },
  {
    sido_name: '서울',
    gugun_name: '종로구',
  },
  {
    sido_name: '서울',
    gugun_name: '중구',
  },
  {
    sido_name: '서울',
    gugun_name: '중랑구',
  },
  {
    sido_name: '인천',
    gugun_name: '강화군',
  },
  {
    sido_name: '인천',
    gugun_name: '계양구',
  },
  {
    sido_name: '인천',
    gugun_name: '미추홀구',
  },
  {
    sido_name: '인천',
    gugun_name: '남동구',
  },
  {
    sido_name: '인천',
    gugun_name: '동구',
  },
  {
    sido_name: '인천',
    gugun_name: '부평구',
  },
  {
    sido_name: '인천',
    gugun_name: '서구',
  },
  {
    sido_name: '인천',
    gugun_name: '연수구',
  },
  {
    sido_name: '인천',
    gugun_name: '옹진군',
  },
  {
    sido_name: '인천',
    gugun_name: '중구',
  },
  {
    sido_name: '대전',
    gugun_name: '대덕구',
  },
  {
    sido_name: '대전',
    gugun_name: '동구',
  },
  {
    sido_name: '대전',
    gugun_name: '서구',
  },
  {
    sido_name: '대전',
    gugun_name: '유성구',
  },
  {
    sido_name: '대전',
    gugun_name: '중구',
  },
  {
    sido_name: '대구',
    gugun_name: '남구',
  },
  {
    sido_name: '대구',
    gugun_name: '달서구',
  },
  {
    sido_name: '대구',
    gugun_name: '달성군',
  },
  {
    sido_name: '대구',
    gugun_name: '동구',
  },
  {
    sido_name: '대구',
    gugun_name: '북구',
  },
  {
    sido_name: '대구',
    gugun_name: '서구',
  },
  {
    sido_name: '대구',
    gugun_name: '수성구',
  },
  {
    sido_name: '대구',
    gugun_name: '중구',
  },
  {
    sido_name: '광주',
    gugun_name: '광산구',
  },
  {
    sido_name: '광주',
    gugun_name: '남구',
  },
  {
    sido_name: '광주',
    gugun_name: '동구',
  },
  {
    sido_name: '광주',
    gugun_name: '북구',
  },
  {
    sido_name: '광주',
    gugun_name: '서구',
  },
  {
    sido_name: '부산',
    gugun_name: '강서구',
  },
  {
    sido_name: '부산',
    gugun_name: '금정구',
  },
  {
    sido_name: '부산',
    gugun_name: '기장군',
  },
  {
    sido_name: '부산',
    gugun_name: '남구',
  },
  {
    sido_name: '부산',
    gugun_name: '동구',
  },
  {
    sido_name: '부산',
    gugun_name: '동래구',
  },
  {
    sido_name: '부산',
    gugun_name: '부산진구',
  },
  {
    sido_name: '부산',
    gugun_name: '북구',
  },
  {
    sido_name: '부산',
    gugun_name: '사상구',
  },
  {
    sido_name: '부산',
    gugun_name: '사하구',
  },
  {
    sido_name: '부산',
    gugun_name: '서구',
  },
  {
    sido_name: '부산',
    gugun_name: '수영구',
  },
  {
    sido_name: '부산',
    gugun_name: '연제구',
  },
  {
    sido_name: '부산',
    gugun_name: '영도구',
  },
  {
    sido_name: '부산',
    gugun_name: '중구',
  },
  {
    sido_name: '부산',
    gugun_name: '해운대구',
  },
  {
    sido_name: '울산',
    gugun_name: '중구',
  },
  {
    sido_name: '울산',
    gugun_name: '남구',
  },
  {
    sido_name: '울산',
    gugun_name: '동구',
  },
  {
    sido_name: '울산',
    gugun_name: '북구',
  },
  {
    sido_name: '울산',
    gugun_name: '울주군',
  },
  {
    sido_name: '세종',
    gugun_name: '세종시',
  },
  {
    sido_name: '경기',
    gugun_name: '가평군',
  },
  {
    sido_name: '경기',
    gugun_name: '고양시',
  },
  {
    sido_name: '경기',
    gugun_name: '과천시',
  },
  {
    sido_name: '경기',
    gugun_name: '광명시',
  },
  {
    sido_name: '경기',
    gugun_name: '광주시',
  },
  {
    sido_name: '경기',
    gugun_name: '구리시',
  },
  {
    sido_name: '경기',
    gugun_name: '군포시',
  },
  {
    sido_name: '경기',
    gugun_name: '김포시',
  },
  {
    sido_name: '경기',
    gugun_name: '남양주시',
  },
  {
    sido_name: '경기',
    gugun_name: '동두천시',
  },
  {
    sido_name: '경기',
    gugun_name: '부천시',
  },
  {
    sido_name: '경기',
    gugun_name: '성남시',
  },
  {
    sido_name: '경기',
    gugun_name: '수원시',
  },
  {
    sido_name: '경기',
    gugun_name: '시흥시',
  },
  {
    sido_name: '경기',
    gugun_name: '안산시',
  },
  {
    sido_name: '경기',
    gugun_name: '안성시',
  },
  {
    sido_name: '경기',
    gugun_name: '안양시',
  },
  {
    sido_name: '경기',
    gugun_name: '양주시',
  },
  {
    sido_name: '경기',
    gugun_name: '양평군',
  },
  {
    sido_name: '경기',
    gugun_name: '여주시',
  },
  {
    sido_name: '경기',
    gugun_name: '연천군',
  },
  {
    sido_name: '경기',
    gugun_name: '오산시',
  },
  {
    sido_name: '경기',
    gugun_name: '용인시',
  },
  {
    sido_name: '경기',
    gugun_name: '의왕시',
  },
  {
    sido_name: '경기',
    gugun_name: '의정부시',
  },
  {
    sido_name: '경기',
    gugun_name: '이천시',
  },
  {
    sido_name: '경기',
    gugun_name: '파주시',
  },
  {
    sido_name: '경기',
    gugun_name: '평택시',
  },
  {
    sido_name: '경기',
    gugun_name: '포천시',
  },
  {
    sido_name: '경기',
    gugun_name: '하남시',
  },
  {
    sido_name: '경기',
    gugun_name: '화성시',
  },
  {
    sido_name: '강원',
    gugun_name: '강릉시',
  },
  {
    sido_name: '강원',
    gugun_name: '고성군',
  },
  {
    sido_name: '강원',
    gugun_name: '동해시',
  },
  {
    sido_name: '강원',
    gugun_name: '삼척시',
  },
  {
    sido_name: '강원',
    gugun_name: '속초시',
  },
  {
    sido_name: '강원',
    gugun_name: '양구군',
  },
  {
    sido_name: '강원',
    gugun_name: '양양군',
  },
  {
    sido_name: '강원',
    gugun_name: '영월군',
  },
  {
    sido_name: '강원',
    gugun_name: '원주시',
  },
  {
    sido_name: '강원',
    gugun_name: '인제군',
  },
  {
    sido_name: '강원',
    gugun_name: '정선군',
  },
  {
    sido_name: '강원',
    gugun_name: '철원군',
  },
  {
    sido_name: '강원',
    gugun_name: '춘천시',
  },
  {
    sido_name: '강원',
    gugun_name: '태백시',
  },
  {
    sido_name: '강원',
    gugun_name: '평창군',
  },
  {
    sido_name: '강원',
    gugun_name: '홍천군',
  },
  {
    sido_name: '강원',
    gugun_name: '화천군',
  },
  {
    sido_name: '강원',
    gugun_name: '횡성군',
  },
  {
    sido_name: '충북',
    gugun_name: '괴산군',
  },
  {
    sido_name: '충북',
    gugun_name: '단양군',
  },
  {
    sido_name: '충북',
    gugun_name: '보은군',
  },
  {
    sido_name: '충북',
    gugun_name: '영동군',
  },
  {
    sido_name: '충북',
    gugun_name: '옥천군',
  },
  {
    sido_name: '충북',
    gugun_name: '음성군',
  },
  {
    sido_name: '충북',
    gugun_name: '제천시',
  },
  {
    sido_name: '충북',
    gugun_name: '진천군',
  },
  {
    sido_name: '충북',
    gugun_name: '청원군',
  },
  {
    sido_name: '충북',
    gugun_name: '청주시',
  },
  {
    sido_name: '충북',
    gugun_name: '충주시',
  },
  {
    sido_name: '충북',
    gugun_name: '증평군',
  },
  {
    sido_name: '충남',
    gugun_name: '공주시',
  },
  {
    sido_name: '충남',
    gugun_name: '금산군',
  },
  {
    sido_name: '충남',
    gugun_name: '논산시',
  },
  {
    sido_name: '충남',
    gugun_name: '당진시',
  },
  {
    sido_name: '충남',
    gugun_name: '보령시',
  },
  {
    sido_name: '충남',
    gugun_name: '부여군',
  },
  {
    sido_name: '충남',
    gugun_name: '서산시',
  },
  {
    sido_name: '충남',
    gugun_name: '서천군',
  },
  {
    sido_name: '충남',
    gugun_name: '아산시',
  },
  {
    sido_name: '충남',
    gugun_name: '예산군',
  },
  {
    sido_name: '충남',
    gugun_name: '천안시',
  },
  {
    sido_name: '충남',
    gugun_name: '청양군',
  },
  {
    sido_name: '충남',
    gugun_name: '태안군',
  },
  {
    sido_name: '충남',
    gugun_name: '홍성군',
  },
  {
    sido_name: '충남',
    gugun_name: '계룡시',
  },
  {
    sido_name: '경북',
    gugun_name: '경산시',
  },
  {
    sido_name: '경북',
    gugun_name: '경주시',
  },
  {
    sido_name: '경북',
    gugun_name: '고령군',
  },
  {
    sido_name: '경북',
    gugun_name: '구미시',
  },
  {
    sido_name: '경북',
    gugun_name: '군위군',
  },
  {
    sido_name: '경북',
    gugun_name: '김천시',
  },
  {
    sido_name: '경북',
    gugun_name: '문경시',
  },
  {
    sido_name: '경북',
    gugun_name: '봉화군',
  },
  {
    sido_name: '경북',
    gugun_name: '상주시',
  },
  {
    sido_name: '경북',
    gugun_name: '성주군',
  },
  {
    sido_name: '경북',
    gugun_name: '안동시',
  },
  {
    sido_name: '경북',
    gugun_name: '영덕군',
  },
  {
    sido_name: '경북',
    gugun_name: '영양군',
  },
  {
    sido_name: '경북',
    gugun_name: '영주시',
  },
  {
    sido_name: '경북',
    gugun_name: '영천시',
  },
  {
    sido_name: '경북',
    gugun_name: '예천군',
  },
  {
    sido_name: '경북',
    gugun_name: '울릉군',
  },
  {
    sido_name: '경북',
    gugun_name: '울진군',
  },
  {
    sido_name: '경북',
    gugun_name: '의성군',
  },
  {
    sido_name: '경북',
    gugun_name: '청도군',
  },
  {
    sido_name: '경북',
    gugun_name: '청송군',
  },
  {
    sido_name: '경북',
    gugun_name: '칠곡군',
  },
  {
    sido_name: '경북',
    gugun_name: '포항시',
  },
  {
    sido_name: '경남',
    gugun_name: '거제시',
  },
  {
    sido_name: '경남',
    gugun_name: '거창군',
  },
  {
    sido_name: '경남',
    gugun_name: '고성군',
  },
  {
    sido_name: '경남',
    gugun_name: '김해시',
  },
  {
    sido_name: '경남',
    gugun_name: '남해군',
  },
  {
    sido_name: '경남',
    gugun_name: '마산시',
  },
  {
    sido_name: '경남',
    gugun_name: '밀양시',
  },
  {
    sido_name: '경남',
    gugun_name: '사천시',
  },
  {
    sido_name: '경남',
    gugun_name: '산청군',
  },
  {
    sido_name: '경남',
    gugun_name: '양산시',
  },
  {
    sido_name: '경남',
    gugun_name: '의령군',
  },
  {
    sido_name: '경남',
    gugun_name: '진주시',
  },
  {
    sido_name: '경남',
    gugun_name: '진해시',
  },
  {
    sido_name: '경남',
    gugun_name: '창녕군',
  },
  {
    sido_name: '경남',
    gugun_name: '창원시',
  },
  {
    sido_name: '경남',
    gugun_name: '통영시',
  },
  {
    sido_name: '경남',
    gugun_name: '하동군',
  },
  {
    sido_name: '경남',
    gugun_name: '함안군',
  },
  {
    sido_name: '경남',
    gugun_name: '함양군',
  },
  {
    sido_name: '경남',
    gugun_name: '합천군',
  },
  {
    sido_name: '전북',
    gugun_name: '고창군',
  },
  {
    sido_name: '전북',
    gugun_name: '군산시',
  },
  {
    sido_name: '전북',
    gugun_name: '김제시',
  },
  {
    sido_name: '전북',
    gugun_name: '남원시',
  },
  {
    sido_name: '전북',
    gugun_name: '무주군',
  },
  {
    sido_name: '전북',
    gugun_name: '부안군',
  },
  {
    sido_name: '전북',
    gugun_name: '순창군',
  },
  {
    sido_name: '전북',
    gugun_name: '완주군',
  },
  {
    sido_name: '전북',
    gugun_name: '익산시',
  },
  {
    sido_name: '전북',
    gugun_name: '임실군',
  },
  {
    sido_name: '전북',
    gugun_name: '장수군',
  },
  {
    sido_name: '전북',
    gugun_name: '전주시',
  },
  {
    sido_name: '전북',
    gugun_name: '정읍시',
  },
  {
    sido_name: '전북',
    gugun_name: '진안군',
  },
  {
    sido_name: '전남',
    gugun_name: '강진군',
  },
  {
    sido_name: '전남',
    gugun_name: '고흥군',
  },
  {
    sido_name: '전남',
    gugun_name: '곡성군',
  },
  {
    sido_name: '전남',
    gugun_name: '광양시',
  },
  {
    sido_name: '전남',
    gugun_name: '구례군',
  },
  {
    sido_name: '전남',
    gugun_name: '나주시',
  },
  {
    sido_name: '전남',
    gugun_name: '담양군',
  },
  {
    sido_name: '전남',
    gugun_name: '목포시',
  },
  {
    sido_name: '전남',
    gugun_name: '무안군',
  },
  {
    sido_name: '전남',
    gugun_name: '보성군',
  },
  {
    sido_name: '전남',
    gugun_name: '순천시',
  },
  {
    sido_name: '전남',
    gugun_name: '신안군',
  },
  {
    sido_name: '전남',
    gugun_name: '여수시',
  },
  {
    sido_name: '전남',
    gugun_name: '영광군',
  },
  {
    sido_name: '전남',
    gugun_name: '영암군',
  },
  {
    sido_name: '전남',
    gugun_name: '완도군',
  },
  {
    sido_name: '전남',
    gugun_name: '장성군',
  },
  {
    sido_name: '전남',
    gugun_name: '장흥군',
  },
  {
    sido_name: '전남',
    gugun_name: '진도군',
  },
  {
    sido_name: '전남',
    gugun_name: '함평군',
  },
  {
    sido_name: '전남',
    gugun_name: '해남군',
  },
  {
    sido_name: '전남',
    gugun_name: '화순군',
  },
  {
    sido_name: '제주',
    gugun_name: '남제주군',
  },
  {
    sido_name: '제주',
    gugun_name: '북제주군',
  },
  {
    sido_name: '제주',
    gugun_name: '서귀포시',
  },
  {
    sido_name: '제주',
    gugun_name: '제주시',
  },
];

const result: { [key: string]: RegionResult } = {};

data.forEach((item: RegionData) => {
  const sido: string = item.sido_name;
  const gugun: string = item.gugun_name;
  if (!result[sido]) {
    result[sido] = {
      sido: sido,
      guguns: [],
    };
  }
  result[sido].guguns.push(gugun);
});

export const regionList = Object.values(result);

console.log(regionList);
