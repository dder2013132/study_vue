const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const session = require('express-session');
const fileStore = require('session-file-store')(session);
const fs = require('fs');
const multer = require('multer');
const path = require('path');

require("dotenv").config({path: "./mysql/.env"});

// express 인스턴스 생성
const app = express();
const port = 3000;
const url = `http://localhost:${port}`;

// 백엔드 폴더 내 폴더 생성
if (!fs.existsSync('sessions')) {
  fs.mkdirSync('sessions');
}
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}
// 이미지 업로드를 위한 폴더 생성
if (!fs.existsSync('uploads/books')) {
  fs.mkdirSync('uploads/books', { recursive: true });
}

app.use(session({
  secret: '1234',             // 암호화하는 데 쓰일 키
  resave: false,              // 세션에 변경사항이 없어도 항상 다시 저장할지 여부
  saveUninitialized: true,    // 초기화되지 않은 세션을 스토어(저장소)에 강제로 저장할지 여부
  cookie: {                   // 세션 쿠키 설정 (세션 관리 시 클라이언트에 보내는 쿠키)
    httpOnly: true,           // true 이면 클라이언트 자바스크립트에서 document.cookie로 쿠키 정보를 볼 수 없음
    secure: false,            // true 이면 https 환경에서만 쿠키 정보를 주고 받도록 처리,
    maxAge: 60000             // 쿠키가 유지되는 시간 (밀리세컨드 단위)
  },
  store: new fileStore()      // 세션 저장소로 fileStore 사용
}));

// cors 설정 - Vue와 연동한다면 주석 해제하세요
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

// body parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// morgan log
app.use(morgan('dev')); // 개발용으로 간단하게 변경 (원하면 원래 포맷으로 되돌려도 됨)

// 정적 파일 제공 (이미지 업로드 기능을 위해)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Multer 스토리지 설정
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'uploads/books')); // 절대 경로 사용
  },
  filename: (req, file, cb) => {
    // 파일명 충돌 방지를 위해 타임스탬프 추가
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, 'book-' + uniqueSuffix + ext);
  }
});

// 업로드 미들웨어 설정
const upload = multer({ 
  storage: storage,
  limits: { 
    fileSize: 5 * 1024 * 1024 // 5MB 크기 제한
  },
  fileFilter: (req, file, cb) => {
    // 이미지 파일만 허용
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('이미지 파일만 업로드 가능합니다.'), false);
    }
  }
});

// route
app.get("/", (req, res) => {
  const ip = req.ip;
  res.send(`안녕하세요. Your IP Adress: >> ${ip} <<`);
})

// 이미지 업로드 API 엔드포인트
app.post('/api/upload', upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: '업로드된 파일이 없습니다.' });
    }
    
    // 저장된 파일의 URL 생성 - 프론트엔드에서 접근할 수 있는 상대 경로로 반환
    const imageUrl = `/uploads/books/${req.file.filename}`;
    
    console.log('이미지 업로드 성공:', imageUrl);
    
    // 클라이언트에 응답
    res.json({ 
      imageUrl: imageUrl,
      message: '이미지가 성공적으로 업로드되었습니다.'
    });
  } catch (error) {
    console.error('이미지 업로드 오류:', error);
    res.status(500).json({ error: '서버 오류' });
  }
});

// routers 대신 router인지 확인하세요!
app.use('/api/books', require('./routers/books'));

// 이미지 업로드 오류 처리 미들웨어 (선택사항)
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    // Multer 오류 처리
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: '파일 크기는 5MB를 초과할 수 없습니다.' });
    }
    return res.status(400).json({ error: '파일 업로드 오류: ' + err.message });
  } else if (err) {
    // 그 외 오류 처리
    console.error('서버 오류:', err);
    return res.status(500).json({ error: err.message });
  }
  next();
});

app.listen(port, () => {
  console.log(`${url}에서 서버가 실행됨`);
  console.log(`이미지 업로드 폴더: ${path.join(__dirname, 'uploads/books')}`);
});