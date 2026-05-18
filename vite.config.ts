import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import { UnifiedViteWeappTailwindcssPlugin as uvtw } from 'weapp-tailwindcss/vite'
import { execSync, spawn } from 'child_process'

let isWatcherStarted = false

function TailwindCliAutoRun() {
  return {
    name: 'tailwind-cli-auto-run',
    buildStart() {
      if (isWatcherStarted) return
      isWatcherStarted = true

      const isDev = process.env.NODE_ENV === 'development'

      try {
        console.log('[Tailwind] 初始化构建 static/tailwind.css...')
        execSync('pnpm run tailwind:build', {
          cwd: __dirname,
          stdio: 'inherit',
        })
      } catch (error) {
        console.error('[Tailwind] 初始化构建失败，已跳过:', error)
      }

      if (isDev) {
        console.log('[Tailwind] 启动后台 watch...')
        const tw = spawn(
          'pnpm',
          ['run', 'tailwind:watch'],
          {
            cwd: __dirname,
            shell: true,
            stdio: 'inherit',
          }
        )

        tw.on('error', (error) => {
          console.error('[Tailwind] watch 启动失败:', error)
        })
      }
    },
  }
}

export default defineConfig({
  plugins: [
    TailwindCliAutoRun(),
    uni(),
    uvtw(),
  ],
})
