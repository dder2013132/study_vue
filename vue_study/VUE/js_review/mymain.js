//import {myfunc,myfunc1} from './mymodule.js'
//import my from './mymodule.js'//-> 객체 전체가 my에 들어옴
// import {myfunc} from './mymodule.js'
import * as my from './mymodule.js'
//my.myfunc~ 식으로 사용
my.myfunc('모듈 테스트~~~');
my.myfunc1('모듈 테스트2~~~');
// myfunc1('모듈 테스트~~~');
//my('디폴트 함수');