import createApp from './create-app'

import index from '../routes/index.route'
import taskRouter from '../routes/tasks/tasks.index'
import configureOpenApi from './configure-openapi'

const app = createApp()
const routes = [index, taskRouter]

configureOpenApi(app)

routes.forEach((route) => {
    app.route('/', route)
})
export default app
