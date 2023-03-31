import { ConfigEnv, defineConfig } from 'vite'
import baseConfig from '../../config/vite.base.config'
import { resolve } from 'path'

export default (props: ConfigEnv) => {
  // windows에서는 '/'로 path를 구분하지 않고 '\\'로 구분해서 호환성 추가
  const name: string =
    __dirname.replaceAll('\\', '/').split('/').pop() ?? 'temp'
  const { config } = baseConfig(
    props,
    name,
    resolve(__dirname, './src/index.ts'),
  )
  console.log(`@@ Executed vite config file path is ${process.cwd()}`)
  return defineConfig(config)
}
