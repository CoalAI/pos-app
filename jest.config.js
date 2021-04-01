module.exports = {
  preset: 'ts-jest',
  moduleFileExtensions: [
    'ts',
    'js',
    'vue',
  ],
  transform: {
    '^.+\\.js$': 'babel-jest',
    '.*\\.vue$': 'vue-jest',
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^tests/(.*)$': '<rootDir>/tests/$1',
    "^.+\\.tsx?$": "ts-jest",
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/assetsTransformer.js',
    '\\.(css|less)$': '<rootDir>/assetsTransformer.js'
  },
};
