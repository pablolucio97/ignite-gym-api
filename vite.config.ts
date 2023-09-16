import {defineConfig} from 'vitest/config'
import tsconfigpaths from 'vite-tsconfig-paths'

export default defineConfig({
    plugins: [tsconfigpaths()],
    test:{
        //execute all tests that are inside controllers folder using the envinronment
        //vitest-environment-prisma
        environmentMatchGlobs: [['src/http/controllers/**', 'prisma']],
        dir: 'src'
    }
})