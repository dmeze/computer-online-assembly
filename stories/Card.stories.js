import Card from '@/components/CardContainer/Card'

export default {
  title: 'Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    image: 'pcBuild1.jpeg',
    description: 'Test description',
    price: 1000,
    actionFooter: <></>,
    isAvailable: true
  }
}

export const UnAvailable = {
  args: {
    image: 'pcBuild1.jpeg',
    description: 'Test description',
    price: 1000,
    actionFooter: <></>,
    isAvailable: false
  },
}
