# React로 만들어보는 Slack클론코딩

> 🙋‍♂본 프로젝트는 제로초의 [Slack 클론 코딩[실시간 채팅 with React!]](https://www.inflearn.com/course/%ED%81%B4%EB%A1%A0%EC%BD%94%EB%94%A9-%EC%8B%A4%EC%8B%9C%EA%B0%84%EC%B1%84%ED%8C%85)을 보고 만든 프로젝트 입니다.

## 프로젝트 실사용 모습 🎬

- DM(Direct Message) 1:1 채팅
  ![실시간 채팅](https://images.velog.io/images/hjh040302/post/389f5d1f-34cc-4ba6-8a12-0841973dd591/2021-06-20%2001.03.48.gif)

- Channel 1 : N 채팅
  ![실시간 채팅](https://images.velog.io/images/hjh040302/post/53cb619d-63ba-47d5-96b5-088d358ab475/2021-06-20%2001.08.23.gif)

- 워크스페이스 생성
  ![](https://images.velog.io/images/hjh040302/post/85822575-9998-451a-998f-a86cf6a63c6e/image.png)
  ![](https://images.velog.io/images/hjh040302/post/ce6fd74e-86d0-416d-8b1c-4842a92550fc/image.png)

- 워크스페이스에 채널 추가
  ![](https://images.velog.io/images/hjh040302/post/4e542c8b-4361-4196-82be-61744d494f2a/image.png)

- useSWRInfinite를 이용한 리버스 무한 스크롤링
  ![](https://images.velog.io/images/hjh040302/post/569e90b0-5640-40c5-a1f9-0b3bd042d520/2021-06-20%2001.32.16.gif)

**Socket.io통신을 통한, 실시간 데이터 전달 구현.**

- 멤버 온라인/오프라인
- DM/Channel 채팅 시 실시간 데이터 전달

**CRA를 사용하지 않고 Webpack설정을 하여 프로젝트를 제작.**

BundleAnalyzerPlugin을 사용하여 데이터 용량 시각화.

- Development State (2.31MB)

  ![image](https://images.velog.io/images/hjh040302/post/1b866cfc-3f8e-454c-b0b0-e715201ff5e7/image.png)

- Production State (404.78KB)

  ![image](https://images.velog.io/images/hjh040302/post/eaf3eed3-3b5f-449a-be4c-5a8d3a60de8e/image.png)

## 기술 스택 ⚙️

```json
//front - package.json
"dependencies": {
    "@emotion/babel-plugin": "^11.3.0",
    "@emotion/react": "^11.4.0",
    "@emotion/styled": "^11.3.0",
    "@loadable/component": "^5.15.0",
    "@types/autosize": "^4.0.0",
    "@types/gravatar": "^1.8.1",
    "@types/react": "^17.0.2",
    "@types/react-custom-scrollbars": "^4.0.7",
    "@types/react-dom": "^17.0.1",
    "@types/react-router-dom": "^5.1.7",
    "autosize": "^5.0.0",
    "axios": "^0.21.1",
    "cross-env": "^7.0.3",
    "dayjs": "^1.10.5",
    "gravatar": "^1.8.1",
    "react": "^17.0.1",
    "react-custom-scrollbars": "^4.2.1",
    "react-dom": "^17.0.1",
    "react-mentions": "^4.3.0",
    "react-router-dom": "^5.2.0",
    "react-toastify": "^7.0.4",
    "regexify-string": "^1.0.16",
    "socket.io-client": "^2.4.0",
    "swr": "^0.5.6",
    "typescript": "^4.2.2",
    "webpack-bundle-analyzer": "^4.4.0"
  },
  "devDependencies": {
    "@babel/core": "^7.13.8",
    "@babel/preset-env": "^7.13.8",
    "@babel/preset-react": "^7.12.13",
    "@babel/preset-typescript": "^7.13.0",
    "@pmmmwh/react-refresh-webpack-plugin": "^0.4.3",
    "@types/fork-ts-checker-webpack-plugin": "^0.4.5",
    "@types/loadable__component": "^5.13.3",
    "@types/node": "^14.14.31",
    "@types/react-mentions": "^4.1.1",
    "@types/socket.io-client": "^1.4.35",
    "@types/webpack": "^4.41.26",
    "@types/webpack-bundle-analyzer": "^3.9.1",
    "@types/webpack-dev-server": "^3.11.1",
    "babel-loader": "^8.2.2",
    "css-loader": "^5.1.0",
    "eslint": "^7.20.0",
    "eslint-config-prettier": "^8.1.0",
    "eslint-config-react-app": "^6.0.0",
    "eslint-plugin-flowtype": "^5.3.1",
    "eslint-plugin-import": "^2.22.1",
    "eslint-plugin-jsx-a11y": "^6.4.1",
    "eslint-plugin-prettier": "^3.3.1",
    "eslint-plugin-react": "^7.22.0",
    "fork-ts-checker-webpack-plugin": "^6.1.0",
    "prettier": "^2.2.1",
    "react-refresh": "^0.9.0",
    "style-loader": "^2.0.0",
    "ts-node": "^9.1.1",
    "webpack": "^5.24.2",
    "webpack-cli": "^4.5.0",
    "webpack-dev-server": "^3.11.2"
  }
```

```json
// back package.json

  "dependencies": {
    "bcrypt": "^5.0.0",
    "cookie-parser": "^1.4.5",
    "cors": "^2.8.5",
    "cross-env": "^7.0.3",
    "dotenv": "^8.2.0",
    "express": "^4.17.1",
    "express-session": "^1.17.1",
    "helmet": "^4.4.1",
    "hpp": "^0.2.3",
    "morgan": "^1.10.0",
    "multer": "^1.4.2",
    "mysql2": "^2.2.5",
    "nodemon": "^2.0.7",
    "passport": "^0.4.1",
    "passport-local": "^1.0.0",
    "pm2": "^4.5.4",
    "sequelize": "^6.5.0",
    "sequelize-cli": "^6.2.0",
    "socket.io": "^2.4.1"
  }

```
