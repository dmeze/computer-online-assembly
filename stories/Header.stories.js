import Header from '@/components/Header'

export default {
  title: 'Header',
  component: Header,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ margin: '4em' }}>
        <Story />
      </div>
    ),
  ],
}

export const DefaultHeader = {
  args: {},
}
