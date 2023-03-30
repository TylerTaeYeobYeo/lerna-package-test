import { ConfigEnv, UserConfigExport, loadEnv } from 'vite'
import { resolve } from 'path'
// import typescript from '@rollup/plugin-typescript'

const ROOT_PATH = resolve(__dirname, '../')

const getValueFromNpmScriptArgs = (args: string[] = [], flag: string = '') => {
  return args.find(arg => arg.includes(`${flag}=`))?.split('=')[1] ?? ''
}

const ENV_BUILD_CONFIG = {
  dev: {
    build: {
      outDir: 'dist',
      sourcemap: true,
    },
  },
  build: {
    build: {
      outDir: 'dist',
      sourcemap: false,
      rollupOptions: {
        output: {
          exports: 'named',
        },
      },
    },
  },
  'build:dev': {
    build: {
      outDir: 'dist',
      sourcemap: true,
      minify: false,
    },
  },
}

export interface LiveconnectSDKViteBaseConfig {
  config: UserConfigExport
  params: { rootPath: string }
}

export default (
  params: ConfigEnv,
  name: string,
  entry: string,
): LiveconnectSDKViteBaseConfig => {
  const { mode } = params
  const buildMode = getValueFromNpmScriptArgs(process.argv, 'BUILD_MODE')
  const targetConfig = ENV_BUILD_CONFIG[buildMode].build ?? {}

  console.info(`@@ Build mode is ${buildMode}`)

  process.env = { ...process.env, ...loadEnv(mode, ROOT_PATH) }

  return {
    config: {
      envDir: `${ROOT_PATH}/.env.${mode}`,
      build: {
        ...targetConfig,
        lib: {
          name: process.env.npm_package_name,
          formats: ['es', 'cjs', 'umd'],
          fileName: `liveconnect.${name}`,
          entry,
        },
      },
      resolve: {
        alias: [
          {
            find: '@common',
            replacement: `${ROOT_PATH}/packages/common`,
          },
        ],
      },
    },
    params: {
      rootPath: ROOT_PATH,
    },
  }
}
