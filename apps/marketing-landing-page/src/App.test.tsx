import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from './App'
import React from 'react'

describe('App', () => {
  it('renders the landing page title', () => {
    render(<App />)
    expect(screen.getByText(/Enterprise Standard/)).toBeDefined()
  })
})
