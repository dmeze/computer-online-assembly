import Modal from '@/components/Modal'

export default {
  title: 'Modal',
  component: Modal,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    title: 'Modal Title',
    body: <>Modal Body</>,
    onSubmit: () => {},
    onClose: () => {},
    disableSubmitBtn: false
  }
}

export const DefaultModal = {
  args: {
    title: 'Modal Title',
    body: <>Modal Body</>,
    onSubmit: () => {},
    onClose: () => {},
    disableSubmitBtn: false
  },
}
