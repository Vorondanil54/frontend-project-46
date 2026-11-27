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
				lines: 85,
				functions: 90,
				branches: 80,
				statements: 85
			}
		}
	}
})
