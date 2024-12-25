## Project Frontend KSDB

- Source code:
  - Repository: https://tfs.stg-sav.vn/bhtg/ksdb-fe
  - Ngôn ngữ: Typescript
  - Framework: ReactJs
  - Thông tin môi trường phát triển :
    - node : v16.18.101
    - khuyến khích cài nvm để quản lý version nodejs
- Cách thức
  - Pull code mới nhất của project về máy local.
  - Check file môi trường, chọn môi trường để build .

## Các script dùng cho dự án .

- Sau khi clone xong dự án, chạy câu lệnh install để cài đặt các thư viện và dependencies của dự án
  - npm install
- Câu lệnh run ở môi trường local:
  - npm start

Build code với 1 file biến môi trường chi định

- npm run build-dev : môi trường dev

- Các file môi trường hiện có trong project :
  - .env.dev : dùng cho môi trường local , run code và build code với biến môi trường local
  - .env.development : dùng cho môi trường dev .
  - .env.test : đây là môi trường stable giành cho BA và Tester
  - .env.production : Môi trường production
