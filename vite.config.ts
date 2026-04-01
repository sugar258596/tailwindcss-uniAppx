import { defineConfig } from 'vite';
import uni from '@dcloudio/vite-plugin-uni';
import { UnifiedViteWeappTailwindcssPlugin as uvtw } from 'weapp-tailwindcss/vite';
import { spawn, execSync } from 'child_process';
import path from 'path';

let isWatcherStarted = false;

function TailwindCliAutoRun() {
  return {
    name: 'tailwind-cli-auto-run',
    buildStart() {
      if (isWatcherStarted) return;
      isWatcherStarted = true;

      const isDev = process.env.NODE_ENV === 'development';
      
      try {
        console.log('[Tailwind] 初始化构建物理 css...');
        execSync('npx tailwindcss -i ./tailwind.css -o ./static/tailwind.css', {
          cwd: __dirname, stdio: 'inherit'
        });
      } catch(e) {
        console.error('[Tailwind] 最初初始化构建可能遭遇警告，跳过...');
      }

      if (isDev) {
        console.log('[Tailwind] 启动后台热更新(Watch)机制...');
        const tw = spawn('npx', ['tailwindcss', '-i', './tailwind.css', '-o', './static/tailwind.css', '--watch'], {
          cwd: __dirname,
          shell: true,
          stdio: 'inherit'
        });
        
        tw.on('error', (err) => {
          console.error('[Tailwind] 自动挂载失败:', err);
        });
      }
    }
  };
}

export default defineConfig({
  plugins: [
    TailwindCliAutoRun(),
    uni(),
    // 添加转义插件，使任何平台运行都统一经过小程序级的不识别类名转义处理
    uvtw()
  ]
});
