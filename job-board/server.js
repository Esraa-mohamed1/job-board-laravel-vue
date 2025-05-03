import { create, router as _router, defaults, bodyParser } from 'json-server'
const server = create()
const router = _router('db.json')
const middlewares = defaults()

server.use(middlewares)
server.use(bodyParser)

// Custom middleware to handle missing employers
server.use((req, res, next) => {
  if (req.method === 'PUT' && req.path.includes('/employers/')) {
    const db = router.db
    const id = parseInt(req.path.split('/').pop())
    const exists = db.get('employers').find({ id }).value()
    
    if (!exists) {
      // Create new employer if doesn't exist
      db.get('employers')
        .push({ id, ...req.body })
        .write()
      return res.status(201).json({ id })
    }
  }
  next()
})

server.use(router)
server.listen(3000, () => {
  console.log('JSON Server is running on port 3000')
})