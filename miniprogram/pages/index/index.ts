import { sayHello } from "../../api/hello"

Page({
  data: {
      message: 'Hello World'
  },
  hi() {
      sayHello().then(res=>(
          console.log(res)
      ))
  }

})
