import { defineConfig } from 'vitest/config'

export default defineConfig({
	test: {
		coverage: {
			enabled: false,
			provider: 'v8',
			include: ['src/**/*.js'],
			exclude: ['__tests__/**', 'bin/**', 'index.js'],
			reporter: ['text', 'lcov'],
			thresholds: {
				lines: 80,
				functions: 80,
				branches: 80,
				statements: 80
			}
		}
	}
})
