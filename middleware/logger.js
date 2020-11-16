export default function (req, res, next) {
    // req is the Node.js http request object
    //console.log(req.url)
  
    // res.setHeader(
    //     'cache-control',
    //     // 'public, max-age=3600, must-revalidate, s-maxage=3600, stale-while-revalidate'
    //     'public, max-age=3600, s-maxage=3600'
    // )

    // res is the Node.js http response object
  
    // next is a function to call to invoke the next middleware
    // Don't forget to call next at the end if your middleware is not an endpoint!
    next()
  }