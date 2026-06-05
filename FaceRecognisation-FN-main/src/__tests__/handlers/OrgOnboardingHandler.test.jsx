import { describe, it, expect, vi } from 'vitest'
import OrgOnboardingHandler from '@/handlers/OrgOnboardingHandler'
import ApiService from '@/lib/ApiServiceFunctions'

vi.mock('@/lib/ApiServiceFunctions', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  },
}))

describe('OrgOnboardingHandler', () => {
  it('should return empty array if list api fails', async () => {
    ApiService.get.mockResolvedValueOnce({ data: { data: null } })
    const result = await OrgOnboardingHandler.list()
    expect(result).toEqual([])
  })

  it('should return array of data if list api succeeds', async () => {
    const mockData = [{ id: 1, name: 'Org 1' }]
    ApiService.get.mockResolvedValueOnce({ data: { data: mockData } })
    const result = await OrgOnboardingHandler.list()
    expect(result).toEqual(mockData)
  })

  it('should call post with correct payload on submit', async () => {
    const payload = { name: 'Test Org' }
    ApiService.post.mockResolvedValueOnce({ data: { success: true } })
    await OrgOnboardingHandler.submit(payload)
    expect(ApiService.post).toHaveBeenCalledWith(expect.any(String), payload)
  })
})
