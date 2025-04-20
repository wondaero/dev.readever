module.exports = {
    presets: [
      'next/babel',
    ],
    plugins: [
      [
        'babel-plugin-styled-components',
        {
          displayName: true, // 컴포넌트 이름을 표시
          fileName: false,   // 파일 이름을 표시 (옵션)
          minify: true,      // 코드 압축 (배포용)
        }
      ]
    ],
  };
  