// @vitest-environment happy-dom
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import KStepper from '../src/ui/KStepper.vue'

describe('KStepper', () => {
  it('puts the clamped value back in the box when the model does not change', async () => {
    const w = mount(KStepper, { props: { modelValue: 10, max: 10, min: 0 } })
    const input = w.get('input')
    await input.setValue('50')
    await input.trigger('change')
    expect((input.element as HTMLInputElement).value).toBe('10')
    await input.setValue('')
    await input.trigger('change')
    expect((input.element as HTMLInputElement).value).toBe('10')
  })
})
