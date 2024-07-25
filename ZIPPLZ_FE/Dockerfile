# 베이스 이미지 설정
FROM node:14

# 작업 디렉토리 설정
WORKDIR /usr/src/app

# 의존성 설치
COPY package*.json ./
RUN npm install

# 애플리케이션 소스 코드 복사
COPY . .

# 애플리케이션이 사용하는 포트 공개
EXPOSE 3000

# 애플리케이션 시작 명령어
CMD ["npm", "start"]

